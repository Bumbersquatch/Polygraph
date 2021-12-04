<template>
  <div ref='vantaRef' id="banner" class="w-screen h-screen">
    <div class="container m-auto h-full flex">
      <div class="text-white p-10 absolute pin-left px-0">
        <h1 class="text-4xl text-white font-bold italic uppercase tracking-tight">Polygraph</h1>
      </div>
      <div class="w-1/2 flex items-center justify-center h-full p-6">
        <div>
          <ul class="cloud">
            <li v-for="keyword in trendingKeyWords" :key="keyword.word">
              <a href="#" @click="handleTagClick(keyword.word)" :data-weight="keyword.weight">{{keyword.word}}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="w-1/2 flex flex-col justify-center h-full p-6 text-white">
          <div class="inner">
            <h2 class="text-3xl mb-6 uppercase font-bold">The <span class="htext text-red italic">Mis-</span><span class="vtext">Information Age</span></h2>
            <p class="pb-3">orem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec quam sed dui commodo sagittis blandit non erat. Nunc venenatis nulla nec fermentum suscipit. Morbi fringilla, tellus a posuere volutpat, elit lectus finibus diam, sed iaculis mi nunc vitae sapien. Pellentesque quis magna sit amet nulla maximus mollis. Phasellus sem urna, maximus ut ex nec, ultrices convallis turpis.</p>
            <p>Morbi tristique purus vitae turpis tempus ultrices. Ut sit amet tempus tortor. Ut congue aliquam lectus, eu maximus nibh aliquam vel. Nulla non mauris sit amet ante mollis efficitur. Pellentesque auctor erat eu pharetra posuere.</p>
          </div>
      </div>

    </div>
  </div>
</template>

<script>
import  TrendingJs  from  'trendingjs'
import NET from 'vanta/src/vanta.net'

export default {
  name: 'Polygraph',
  data() {
      return {
          trendingKeyWords: [],
          claims: [],
          claimsStats: {}
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
            // this.trendingKeyWords = this.trendingKeyWords
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
  methods:{
    handleTagClick(tag) {
      this.$gapi.getGapiClient().then((res) => {
        res.client.factchecktools.claims.search({ 
            query: tag,
            languageCode: 'en',
            maxAgeDays: '30',
            pageSize: 100
        }).then((data) => {
            console.log(data)
            if (data?.result?.claims) {
              const claims = data.result.claims;
              this.claimsStats.total = claims.length
              this.claimsStats.days = 30
              this.claimsStats.falseClaims = claims.filter((item) => {
                return item.claimReview[0].textualRating.toLowerCase() === 'false'
              }).length
              this.claimsStats.trueClaims = claims.filter((item) => {
                return item.claimReview[0].textualRating.toLowerCase() === 'true'
              }).length

              this.claimsStats.misleading = this.claimsStats.total - (this.claimsStats.trueClaims + this.claimsStats.falseClaims)
              this.claimsStats.truePercentage = Math.round((100 * this.claimsStats.trueClaims) / this.claimsStats.total);
              this.claimsStats.misninformationPercentage = 100 - this.claimsStats.truePercentage;
              
              console.log('claims stats', this.claimsStats)
            }
        })
    })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

  ul.cloud a {
  --size: 4;
  font-size: calc(var(--size) * 0.095rem + 0.5rem);
  display: block;
  padding: 0.125rem 1em;
  margin: 10px;
  text-decoration: none;
  line-height:20px;
  text-transform: uppercase;
  transform: translatey(0px);
  height: auto;
  background: linear-gradient(45deg, transparent 5%, #FF013C 5%);
  border: 0;
  color: #f7f2e1;
  letter-spacing: 2px;
  box-shadow: 6px 0px 0px #00E6F6;
  outline: transparent;
  position: relative;
  opacity: 0;
  animation-fill-mode: forwards;
  animation-name: fade;
  animation-duration: .7s;
}

ul.cloud a:hover{
  left:3px;
  background: linear-gradient(45deg, transparent 5%, #db0033 5%);
}

ul.cloud a::after {
  --slice-0: inset(50% 50% 50% 50%);
  --slice-1: inset(80% -6px 0 0);
  --slice-2: inset(50% -6px 30% 0);
  --slice-3: inset(10% -6px 85% 0);
  --slice-4: inset(40% -6px 43% 0);
  --slice-5: inset(80% -6px 5% 0);
  Content: 'join now';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 3%, #00E6F6 3%, #00E6F6 5%, #FF013C 5%);
  text-shadow: -3px -3px 0px #F8F005, 3px 3px 0px #00E6F6;
  clip-path: var(--slice-0);
}

ul.cloud a:hover::after {
  animation: 1s glitch;
  animation-timing-function: steps(2, end);
}

ul.cloud a[data-weight="1"] { --size: 4; line-height:1.3em; animation-delay: .1s;}
ul.cloud a[data-weight="2"] { --size: 4; line-height:1.4em; animation-delay: .2s;}
ul.cloud a[data-weight="3"] { --size: 8; line-height:1.4em; animation-delay: .3s;}
ul.cloud a[data-weight="4"] { --size: 9; line-height:1.4em; animation-delay: .4s;}
ul.cloud a[data-weight="5"] { --size: 10; line-height:1.6em; animation-delay: .5s;}
ul.cloud a[data-weight="6"] { --size: 11; line-height:1.7em; animation-delay: .6s;}
ul.cloud a[data-weight="7"] { --size: 11; line-height:1.7em; animation-delay: .7s;}
ul.cloud a[data-weight="8"] { --size: 12; line-height:1.8em; animation-delay: .8s;}
ul.cloud a[data-weight="9"] { --size: 12; line-height:1.8em; animation-delay: .9s;}
ul.cloud a[data-weight="10"] { --size: 13; line-height:1.85em; animation-delay: .8s;}
ul.cloud a[data-weight="11"] { --size: 14; line-height:2.2em; animation-delay: 1s;}

ul[data-show-value] a::after {
  content: " (" attr(data-weight) ")";
  font-size: 1rem;
}

@media (prefers-reduced-motion) {
  ul.cloud * {
    transition: none !important;
  }
}

@keyframes glitch {
  0% { clip-path: var(--slice-1); transform: translate(-20px, -10px); }
  10% { clip-path: var(--slice-3); transform: translate(10px, 10px); }
  20% { clip-path: var(--slice-1); transform: translate(-10px, 10px); }
  30% { clip-path: var(--slice-3); transform: translate(0px, 5px); }
  40% { clip-path: var(--slice-2); transform: translate(-5px, 0px); }
  50% { clip-path: var(--slice-3); transform: translate(5px, 0px); }
  60% { clip-path: var(--slice-4); transform: translate(5px, 10px); }
  70% { clip-path: var(--slice-2); transform: translate(-10px, 10px); }
  80% { clip-path: var(--slice-5); transform: translate(20px, -10px); }
  90% { clip-path: var(--slice-1); transform: translate(-10px, 0px); }
  100% { clip-path: var(--slice-1); transform: translate(0); }
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
