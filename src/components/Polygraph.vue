<template>
  <div class="text-white">
    <div v-if="error" class="error-message bg-red text-white text-center fixed top-0 z-10 w-full p-2">
      <font-awesome-icon  icon="exclamation-triangle"></font-awesome-icon> {{error}}
    </div>
    <Banner @tagClick="handleTagClick" :loading="loading" :claims="claims" @setError="setError" />
    <Results ref="results" :claimsStats="claimsStats" :claims="claims" :loading="loading" />
    <a v-if="claims" href="#" class="fixed block bottom-0 right-0 px-4 py-2 bg-red cursor-pointer z-10">
      <font-awesome-icon  icon="chevron-up"></font-awesome-icon>
    </a>
  </div>
</template>

<script>
import Banner from './Banner.vue'
import Results from './Results.vue'

export default {
  name: 'Polygraph',
  components: {
    Banner,
    Results
  },
  data() {
      return {
          trendingKeyWords: [],
          claims: null,
          claimsStats: {},
          initLoad: false,
          loading: false,
          error: ''
      }
  },
  methods:{
    handleTagClick(tag) {
      if(this.loading) {
        return
      }
        
      this.loading = true
      this.$gapi.getGapiClient().then((res) => {
        res.client.factchecktools.claims.search({ 
            query: tag,
            languageCode: 'en',
            maxAgeDays: '30',
            pageSize: 100
        }).then((data) => {
            if (data?.result?.claims) {
              const claims = data.result.claims
              const falseClaims = claims.filter((item) => {
                return item.claimReview[0].textualRating.toLowerCase() === 'false'
              }).length
              const trueClaims = claims.filter((item) => {
                return item.claimReview[0].textualRating.toLowerCase() === 'true'
              }).length
              const truePercent = Math.round((100 * trueClaims) / claims.length)

              Object.assign(this.claimsStats, {search: tag})
              Object.assign(this.claimsStats, {total: claims.length})
              Object.assign(this.claimsStats, {days: 30})
              Object.assign(this.claimsStats, {falseClaims: falseClaims})
              Object.assign(this.claimsStats, {trueClaims: trueClaims})
              Object.assign(this.claimsStats, {misleading: claims.length - (trueClaims + falseClaims)})
              Object.assign(this.claimsStats, {truePercentage: truePercent})
              Object.assign(this.claimsStats, {trueClaims: 100 - truePercent})
              
              this.claims = claims.sort((a,b) => {
                var c = new Date(a.claimReview[0].reviewDate)
                var d = new Date(b.claimReview[0].reviewDate)
                return d-c;
              })

              window.setTimeout(() => {
                this.$refs.results.$refs.resultsRef.scrollIntoView({ behaviour: 'smooth', block: 'start'}) 
              }, 100)
            } else {
              // error
              this.setError()
            }
            this.loading = false
        }).catch((err) => {
            console.warn(err)
            this.setError()
            this.loading = false
        })
    })
    },
    setError(msg = 'Oops! There seems to have been an error accessing our servers. Please try again later.') {
      this.error = msg;
      window.setTimeout(() => {
        this.error = ''
      }, 5000)
    }
  }
}
</script>
