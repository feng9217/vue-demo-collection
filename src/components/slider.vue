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
      <span class="dot" v-for="(item, index) in dots" :class="{active: currentPageIndex === index}"></span>
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
    }, 50)
  },
  methods: {
    _getSliderData() {
      getSliderData().then((res) => {
        this.sliderData = res.banner.dataList
        // console.log(this.sliderData)
      })
    },
    _setSliderWidth() {
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
      if (this.loop) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
      console.log(this.$refs.slider.clientWidth)
      console.log(this.$refs.sliderGroup.clientWidth)
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
    },
    _initDots() {
      this.dots = new Array(this.children.length)
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
  .dot .active{
    width: 20px;
    border-radius: 5px;
    background: #eee;
  }
</style>