<template>
  <div id="app">
    <FoodGuide v-show="$route.meta.showFooter" /><router-view />
  </div>
</template>

<script>
import FoodGuide from './components/FoodGuide/FoodGuide.vue';
export default {
  name: 'App',
  components: {
    FoodGuide
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
}
</style>
