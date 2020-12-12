import Vue from 'vue'
import Vuex from '../myvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    msg: 'Hello World',
    count: 0,
  },
  getters: {
    reverseMsg(state) {
      return state.msg.split('').reverse().join('')
    }
  },
  mutations: {
    increment(state, payload) {
      state.count += payload
    }
  },
  actions: {
    incrementAsync(context, payload) {
      setTimeout(() => {
        context.commit('increment', payload)
      }, 2000)
    }
  },
})