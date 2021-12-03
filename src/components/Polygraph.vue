<template>
  <div>
    <h1>Polygraph</h1>
    <ul>
      <li v-for="keyword in trendingKeyWords" :key="keyword.word">{{keyword.word}}</li>
    </ul>
  </div>
</template>

<script>
import  TrendingJs  from  'trendingjs'

export default {
  name: 'Polygraph',
  data() {
      return {
          trendingKeyWords: []
      }
  },
  created() {
    this.$gapi.getGapiClient().then((res) => {
        res.client.factchecktools.claims.search({ 
            query: 'a OR e OR s',
            languageCode: 'en',
            maxAgeDays: '7',
            pageSize: 50
        }).then((data) => {
          let headlines = []
          if (data.result && data.status === 200) {
            data.result.claims.forEach((item) => {
              headlines.push(item.text.toLowerCase());
            })

            this.trendingKeyWords = TrendingJs(headlines, 10, {
              minWord:  2,
              wordChain:  1,
              allowSameSentenceDuplicate:  false,
              ignoreIrrelevantSingleWords:  true,
              commonWords: ['shows', 'named', 'released', 'people', 'found', 'suggests', 'picture', 'photo', 'video', 'child']
            })
          }
        })
    })
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
