import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'
import VueGapi from 'vue-gapi'
import './assets/tailwind.css'
import {VueMasonryPlugin} from 'vue-masonry';

Vue.config.productionTip = false
Vue.use(VueGapi, {
  apiKey: process.env.VUE_APP_GFCTAPIKEY,
  discoveryDocs: ['https://factchecktools.googleapis.com/$discovery/rest?version=v1alpha1']
})
Vue.use(VueMasonryPlugin)

new Vue({
  render: h => h(App),
}).$mount('#app')
