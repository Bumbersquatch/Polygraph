<template>
    <section ref='vantaRef' id="banner" class="w-full min-h-screen h-auto md:h-screen overflow-hidden">
      <div class="pt-20 md:pt-0 container m-auto h-full flex justify-center items-center">
        <div class="text-white p-10 absolute left-0 top-0 px-0 w-full text-center z-10">
          <h1 class="text-5xl text-white font-bold italic uppercase tracking-tight">Polygraph</h1>
        </div>

        <div v-if="trendingKeyWords.length > 0" class="flex flex-wrap flex-col md:flex-row">
            <div class="w-full md:w-1/2 flex items-center justify-center h-full p-6 order-2">
              <TagCloud @tagClick="handleTagClick" :trendingKeyWords="trendingKeyWords" />
            </div>

            <div class="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center p-6 text-white order-3">
                <div class="inner">
                <h2 class="text-2xl lg:text-3xl mb-6 uppercase font-bold">The <span class="htext text-red italic">Mis-</span><span class="vtext">Information Age</span></h2>
                <p class="pb-3">We are living in the mis-information age. With the rise of the internet, information is now easier to access than it has ever been. Information can be published at an alarming rate, but how do we ensure the information we consume is accurate, unbiased and reliable?</p>
                <p>This website demonstrates the spread of mis-information on the internet. Please select one of the current trending topics from the last month to visualise the accuracy of the claims being made in news reports and social media about that topic. </p>
                </div>
            </div>
            <BannerLoading :loading="loading" :claims="claims" />
        </div>
        <div v-else class="w-full min-h-screen text-center text-4xl flex items-center justify-center">
            <template v-if="initLoad">
                <p class="text-lg">There seems to be an error connecting to our servers. Please refresh and try again.</p>
            </template>
            <template v-else>
                <font-awesome-icon icon="cog" class="fa-spin"></font-awesome-icon>
            </template>
        </div>
      </div>
    </section>
</template>

<script>
import TagCloud from './TagCloud.vue'
import BannerLoading from './BannerLoading.vue'
import * as THREE from 'three'
import NET from 'vanta/dist/vanta.net.min'
import TrendingJs from 'trendingjs'

export default {
    name: 'Banner',
    props: {
        loading: Boolean,
        claims: Array
    },
    components: {
        TagCloud,
        BannerLoading
    },
    data() {
      return {
          trendingKeyWords: [],
          initLoad: false
      }
    },
    created() {
      this.getRecentData()
    },
    mounted() {
        this.vantaEffect = NET({
        el: this.$refs.vantaRef,
        mouseControls: false,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x6793b8,
        backgroundColor: 0x030726,
        points: 22.00,
        maxDistance: 23.00,
        spacing: 20.00,
        showDots: true,
        THREE: THREE
        })
    },
    methods: {
        handleTagClick(keyword) {
            this.$emit('tagClick', keyword)
        },
        getRecentData() {
          this.$gapi.getGapiClient().then((res) => {
          this.initLoad = false
          res.client.factchecktools.claims.search({ 
              query: 'a OR e OR s',
              languageCode: 'en',
              maxAgeDays: '30',
              pageSize: 200
          }).then((data) => {
            let headlines = []
            if (data.result && data.status === 200) {
              data.result.claims.forEach((item) => {
                headlines.push(item.text.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " "))
              })

              const trending = TrendingJs(headlines, 11, {
                minWord:  2,
                wordChain:  1,
                allowSameSentenceDuplicate:  false,
                ignoreIrrelevantSingleWords:  true,
                commonWords: ['shows', 'named', 'released', 'people', 'found', 'suggests', 'picture', 'photo', 'video', 'child', "doesnt", 'image', 'photograph']
              })

              this.trendingKeyWords = trending.map((obj, index) => ({ ...obj, weight: trending.length - index })).sort(() => Math.random() - 0.5)
            } else {
                this.$emit('setError')
                this.initLoad = true
            }
          }).catch((err) => {
              console.warn(err)
              this.$emit('setError')
              this.initLoad = true
          })
        })
        }
    }
}
</script>

<style lang="scss">
  #banner::before{
    content: '';
    position:absolute;
    height:100%;
    width:100%;
    box-shadow: inset 0px 0 150px 150px #030726;
    z-index:1;
  }

  h2{
    display: block;
    span{
      transition: all .3s;
    }
  }

  .inner{
    animation-fill-mode: forwards;
    animation-name: fade;
    animation-duration: 2s;
    background: #030726;
    box-shadow: 0px 0 30px 30px #030726;
    &:hover{
      .htext{
        visibility: visible;
        opacity: 1;
        transition: all .3s .2s ease-in-out;
      }
      .vtext{
        margin-left:0;
        transition: all .3s ease-in-out;
      }
    }
  }

  .htext{
    visibility: hidden;
    opacity: 0;
    
  }
  .vtext{
    margin-left:-2.1em;
    transition: all .3s .1s ease-in-out;
  }
</style>