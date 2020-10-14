import Vue from 'vue'
import Vuex from 'vuex'
// 导入city的store
import cityStore from '@/stores/city'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    city: cityStore
  }
})
