<template>
    <div>
      <ul class="cloud">
        <li v-for="keyword in trendingKeyWords" :key="keyword.word">
          <TagButton @tagClick="tagClick" :word="keyword.word" :weight="keyword.weight" />
        </li>
      </ul>
    </div>
</template>

<script>
import TagButton from "./TagButton.vue";

export default {
  name: 'TagCloud',
  components:{
    TagButton
  },
  props: {
      trendingKeyWords: Array
  },
  
  methods:{
    tagClick(keyword) {
        this.$emit('tagClick', keyword)
    }
  }
}
</script>

<style lang="scss">
ul.cloud {
    list-style: none;
    padding-left: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    line-height: 2.75rem;
    width:100%;
  }

ul[data-show-value] a::after {
  content: " (" attr(data-weight) ")";
  font-size: 1rem;
}

@media (prefers-reduced-motion) {
  ul.cloud * {
    transition: none !important;
  }
}
</style>
