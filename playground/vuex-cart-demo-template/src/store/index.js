import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import product from './modules/product'

Vue.use(Vuex)

const interceptorPlugin = store => {
  store.subscribe((mutation, state) => {
    // 记录每次变动后的数据
    if (mutation.type.startsWith('cart/')) {
      window.localStorage.setItem('cart-products', JSON.stringify(state.cart.cartProducts))
    }
  })
}

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
  },
  plugins: [
    interceptorPlugin
  ]
})
