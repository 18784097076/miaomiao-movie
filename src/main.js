import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.filter('formatImgUrl', (value, w, h)=>{
  return value.replace('w.h', w + '.' + h)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
