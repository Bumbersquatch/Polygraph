<template>
    <section ref='vantaRef' id="banner" class="w-full h-screen overflow-hidden">
      <div class="container m-auto h-full flex justify-center items-center">
        <div class="text-white p-10 absolute left-0 top-0 px-0 w-full text-center">
          <h1 class="text-5xl text-white font-bold italic uppercase tracking-tight">Polygraph</h1>
        </div>

        <div v-if="trendingKeyWords.length > 0" class="flex">
            <div class="w-1/2 flex items-center justify-center h-full p-6">
            <TagCloud @tagClick="handleTagClick" :trendingKeyWords="trendingKeyWords" />
            </div>

            <div class="w-1/2 flex flex-col justify-center h-full p-6 text-white">
                <div class="inner">
                <h2 class="text-3xl mb-6 uppercase font-bold">The <span class="htext text-red italic">Mis-</span><span class="vtext">Information Age</span></h2>
                <p class="pb-3">orem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec quam sed dui commodo sagittis blandit non erat. Nunc venenatis nulla nec fermentum suscipit. Morbi fringilla, tellus a posuere volutpat, elit lectus finibus diam, sed iaculis mi nunc vitae sapien. Pellentesque quis magna sit amet nulla maximus mollis. Phasellus sem urna, maximus ut ex nec, ultrices convallis turpis.</p>
                <p>Morbi tristique purus vitae turpis tempus ultrices. Ut sit amet tempus tortor. Ut congue aliquam lectus, eu maximus nibh aliquam vel. Nulla non mauris sit amet ante mollis efficitur. Pellentesque auctor erat eu pharetra posuere.</p>
                </div>
            </div>
            <BannerLoading :loading="loading" :claims="claims" />
        </div>
        <div v-else class="w-full text-center text-4xl">
            <font-awesome-icon icon="cog" class="fa-spin"></font-awesome-icon>
        </div>

        

      </div>
    </section>
</template>

<script>
import TagCloud from './TagCloud.vue'
import BannerLoading from './BannerLoading.vue'
import NET from 'vanta/src/vanta.net'
import  TrendingJs  from  'trendingjs'

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
          trendingKeyWords: []
      }
    },
    created() {
      this.$gapi.getGapiClient().then((res) => {
          res.client.factchecktools.claims.search({ 
              query: 'a OR e OR s',
              languageCode: 'en',
              maxAgeDays: '30',
              pageSize: 50
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
                commonWords: ['shows', 'named', 'released', 'people', 'found', 'suggests', 'picture', 'photo', 'video', 'child', "doesnt"]
              })

              this.trendingKeyWords = trending.map((obj, index) => ({ ...obj, weight: trending.length - index })).sort(() => Math.random() - 0.5)
              console.log(this.trendingKeyWords)
            }
          })
      })
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
        showDots: true
        })
    },
    methods: {
        handleTagClick(keyword) {
            this.$emit('tagClick', keyword)
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
    margin-left:-65px;
    transition: all .3s .1s ease-in-out;
  }
</style>