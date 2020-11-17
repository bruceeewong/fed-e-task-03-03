import axios from 'axios'

const state = {
  products: []
}
const getters = {}
const mutations = {
  setProducts (state, payload) {
    state.products = payload
  }
}
const actions = {
  async getProducts (context, payload) {
    const { data } = await axios({
      url: 'http://127.0.0.1:3000/products',
      method: 'get'
    })
    context.commit('setProducts', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
