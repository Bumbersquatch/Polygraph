<template>
    <section ref="resultsRef" v-if="claims" id="main" class="w-full min-h-screen">
      <div v-if="!loading" class="container m-auto">
        
        <ResultsStats :claimsStats="claimsStats" />
        
        <div v-if="!loading" id="articles" class="py-6 flex flex-wrap" v-masonry transition-duration="0.3s" item-selector=".article">
            <article v-masonry-tile v-for="claim in claims" :key="claim.id" class="article py-6 w-1/3 p-6" :class="isTruth(claim.claimReview[0].textualRating.toLowerCase())">
              <Post :claim="claim" :textualRating="isTruth(claim.claimReview[0].textualRating.toLowerCase())" />
            </article>
        </div>

      </div>
    </section>
</template>

<script>
import ResultsStats from './ResultsStats.vue'
import Post from './Post.vue'

export default {
    name: 'Results',
    props: {
        claims: Array,
        claimsStats: Object,
        loading: Boolean
    },
    components: {
        ResultsStats,
        Post
    },
    methods: {
        isTruth(textualRating) {
            switch (textualRating) {
                case 'true':
                    return 'true'
                case 'false':
                    return 'false'
                default:
                    return 'misleading'
            }
        }
    }
}
</script>

<style lang="scss">
  #main{
      animation-fill-mode: forwards;
      animation-name: fade;
      animation-duration: 2s;
  }
  #articles { 
    .article { 
      > .article-inner{
        background:linear-gradient(45deg, transparent 5%, #f7f2e1 5%)
      }

      .article-inner{
        &:hover {
          left:3px;
        }
      }

      &.true{
        .article-status{
          background: rgb(77, 124, 77);;
        }
        .article-inner{
          border-color: rgb(77, 124, 77);
        }
      }
      &.false{
        .article-status{
          background: #FF013C;
        }
        .article-inner{
          border-color: #FF013C;
        }
      }
      &.misleading{
        .article-status{
          background: rgb(238, 186, 88);
        }
        .article-inner{
          border-color: rgb(238, 186, 88);
        }
      }
    }
  }

</style>