import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import product from './modules/product'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    cart,
    product
  }
})
