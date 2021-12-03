import Vue from 'vue'
import App from './App.vue'
import VueGapi from 'vue-gapi'

Vue.config.productionTip = false
Vue.use(VueGapi, {
  apiKey: 'AIzaSyAjICwMw6ppKxv1qUbK4bD-oTcwD5q-tLI',
  discoveryDocs: ['https://factchecktools.googleapis.com/$discovery/rest?version=v1alpha1']
})

new Vue({
  render: h => h(App),
}).$mount('#app')
