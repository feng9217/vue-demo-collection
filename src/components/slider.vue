<template>
  <div class="slider" ref="slider" v-if="sliderData.length">
    <div class="slider-group" ref="sliderGroup">
      <div v-for="item in sliderData">
        <a :href="item.linkUrl">
          <img :src="item.src">
        </a>
      </div>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots"
      :class="{active: currentPageIndex === index}">
      </span>
    </div>
  </div>
</template>

<script type="text/javascript">
import {getSliderData} from '../api/slider.js'
import {addClass} from '../common/dom.js'
import BScroll from 'better-scroll'

export default {
  name: 'slider',
  data() {
    return {
      sliderData: [],
      dots: [],
      currentPageIndex: 0
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    },
    click: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    // 异步获取之后还要渲染
    // 所以要加个刷新延时
    // 不然 get 不到 dom
    this._getSliderData()
    setTimeout(() => {
      // 注意这里的调用顺序
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    }, 20)

    // 监听视窗大小改变 给better-scroll更新宽度
    // 因为用的都是 $refs.dom.clientWidth 的操作 是能够读取最新的宽度值的
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      // 刷新宽度 但是不能再 width += 2 * sliderWidth
      // 所以要增加标志位 isResize
      // 确保只有初始化 loop 时左右加宽度 resize不会增加
      this._setSliderWidth(true)
      // better-scroll的api 让其重新计算
      this.slider.refresh()
    })
  },
  methods: {
    _getSliderData() {
      getSliderData().then((res) => {
        this.sliderData = res.banner.dataList
        // console.log(this.sliderData)
      })
    },
    _setSliderWidth(isResize) {
      let width = 0
      // console.log(this.$refs.slider.clientWidth)
      let sliderWidth = this.$refs.slider.clientWidth
      this.children = this.$refs.sliderGroup.children
      for (let i = 0; i < this.children.length; i++) {
        // 每个子元素都加上 float:left 的样式
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
      // console.log(this.$refs.slider.clientWidth)
      // console.log(this.$refs.sliderGroup.clientWidth)
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        // 惯性
        momentum: false,
        // 和之前版本不同 snap要做成一个对象
        // 然后loop成为其参数
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        },
        click: this.click
      })
      // better-scroll 在滚动的时候会派发一个事件
      this.slider.on('scrollEnd', () => {
        // 利用 better-scroll 封装好的事件 获取index(第几个子元素)
        let pageIndex = this.slider.getCurrentPage().pageX
        if (this.loop) {
          // 循环模式 第一个子元素是copy来的
          pageIndex -= 1
        }
        this.currentPageIndex = pageIndex
        // 因为用的是setTimeout 所以每次滚动结束
        // 都要清除timer 并再滚动下一次达到轮播效果
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    _play() {
      // 原理就是划到下一张幻灯片 就是修改currentPageIndex
      let pageIndex = this.currentPageIndex + 1
      if (this.loop) {
        pageIndex += 1
      }
      // 因为是setTimeout 只会执行一次
      this.timer = setTimeout(() => {
        // betterscroll的api goToPage()
        this.slider.goToPage(pageIndex, 0, 400)
        // console.log(this.slider)
      }, this.interval)
    }
  }
}
</script>

<style scoped>
  .slider{
    min-height: 1px;
    position: relative;
  }
  .slider .slider-group{
    overflow: hidden;
    position: relative;
    white-space: nowrap;
  }
  .slider-group .slider-item{
    float: left;
    box-sizing: border-box;
    overflow: hidden;
    text-align: center;
  }
  .slider-item a{
    display:block;
    width: 100%;
    overflow: hidden;
    text-decoration: none;
  }
  .slider-item a img{
    display: block;
    width: 100%;
  }
  .dots{
    position: absolute;
    text-align: center;
    font-size: 0;
    left: 0;
    right: 0;
    bottom: 15px;
  }
  .dots .dot{
    display: inline-block;
    margin: 0 4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #eee;
  }
  .dots .dot .active{
    width: 20px;
    border-radius: 5px;
    background: #eee;
  }
</style>