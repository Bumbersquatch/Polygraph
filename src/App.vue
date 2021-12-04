<template>
  <div id="app" class="bg-blue w-full h-full">
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

<style lang="scss">
html {
  scroll-behavior: smooth;
}

@keyframes fade {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
