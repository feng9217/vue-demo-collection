# vue-demo-collection

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

<h2>first demo: slider by betterscroll</h2>

之前用到的一个 slider组件 由better-scroll实现  
这次轮播用到的data是来自锤子手机的官网后台数据  
  
轮播的实现, 用的就是better-scroll每次滚动完成以后派发的一个事件: scrollEnd  
对该事件进行监听, 并在回调中执行滚动到下一个页面index的函数, 即完成了轮播:  
`this.slider.on('scrollEnd', () => {`
  `// 利用 better-scroll 封装好的事件 获取index(第几个子元素)`
  `let pageIndex = this.slider.getCurrentPage().pageX`
  `if (this.loop) {`
    `// 循环模式 第一个子元素是copy来的`
    `pageIndex -= 1`
  `}`
  `this.currentPageIndex = pageIndex`
 ` // 因为用的是setTimeout 所以每次滚动结束`
  `// 都要清除timer 并再滚动下一次达到轮播效果`
  `if (this.autoPlay) {`
    `clearTimeout(this.timer)`
    `this._play()`
 ` }`
`})`  
---
当然, 最最需要注意的还是获取数据后, initSlider的时间, 必须要在确保获得了宽/高后, 否则不能滚动。  
better-scroll的git-hub: 'https://github.com/ustbhuangyi/better-scroll'  
参考API: 'http://ustbhuangyi.github.io/better-scroll/doc/zh-hans/#better-scroll 是什么'  
对应的slider开源代码: 'https://github.com/ustbhuangyi/better-scroll/blob/master/example/components/slide/slide.vue'  
  
***
