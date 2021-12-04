<template>
    <div>
      <ul class="cloud">
        <li v-for="keyword in trendingKeyWords" :key="keyword.word">
          <a href="#" @click.prevent="handleTagClick(keyword.word)" :data-weight="keyword.weight">{{keyword.word}}</a>
        </li>
      </ul>
    </div>
</template>

<script>


export default {
  name: 'TagCloud',
  components: {
  },
  props: {
      trendingKeyWords: Array
  },
  
  methods:{
    handleTagClick(keyword) {
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
</style>
