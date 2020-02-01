import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'
import getters from './getters'
import system from '@/modules/system/store'
import coupon from '@/modules/coupon/store/coupon-store'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    app,
    system,
    coupon
  },
  getters
})

export default store
