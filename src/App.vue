<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
    <slider></slider>
  </div>
</template>

<script>
import slider from './components/slider.vue'

export default {
  name: 'app',
  components: {
    slider
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
