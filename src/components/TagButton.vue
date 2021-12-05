<template>
    <a class="tagButton" href="#" @click.prevent="handleTagClick(word)" :data-weight="weight">{{word}}</a>
</template>

<script>
export default {
    name: 'TagButton',
    props: {
        weight: Number,
        word: String
    },
    methods: {
       handleTagClick(keyword) {
           this.$emit('tagClick', keyword)
       }
    }
}
</script>

<style lang="scss" scoped>
a {
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

a:hover{
  left:3px;
  background: linear-gradient(45deg, transparent 5%, #db0033 5%);
}

a::after {
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

a:hover::after {
  animation: 1s glitch;
  animation-timing-function: steps(2, end);
}

a[data-weight="1"] { --size: 4; line-height:1.3em; animation-delay: .1s;}
a[data-weight="2"] { --size: 4; line-height:1.4em; animation-delay: .2s;}
a[data-weight="3"] { --size: 8; line-height:1.4em; animation-delay: .3s;}
a[data-weight="4"] { --size: 9; line-height:1.4em; animation-delay: .4s;}
a[data-weight="5"] { --size: 10; line-height:1.6em; animation-delay: .5s;}
a[data-weight="6"] { --size: 11; line-height:1.7em; animation-delay: .6s;}
a[data-weight="7"] { --size: 11; line-height:1.7em; animation-delay: .7s;}
a[data-weight="8"] { --size: 12; line-height:1.8em; animation-delay: .8s;}
a[data-weight="9"] { --size: 12; line-height:1.8em; animation-delay: .9s;}
a[data-weight="10"] { --size: 13; line-height:1.85em; animation-delay: .8s;}
a[data-weight="11"] { --size: 14; line-height:2.2em; animation-delay: 1s;}

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