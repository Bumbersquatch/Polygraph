<template>
  <div id="app">
    <Polygraph />
  </div>
</template>

<script>
import Polygraph from './components/Polygraph.vue'

export default {
  name: 'App',
  components: {
    Polygraph
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
