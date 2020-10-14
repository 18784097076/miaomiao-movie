import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.filter('formatImgUrl', (value, w, h)=>{
  return value.replace(/w\.h/, w + '.' + h)
})

// 全局注册 Scroller 组件
import Scroller from '@/components/Scroller'
Vue.component('Scroller',Scroller)

// 全局注册Loading组件
import Loading from '@/components/Loading'
Vue.component('Loading', Loading)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
