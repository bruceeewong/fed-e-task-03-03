const state = {
  cartProducts: []
}
const getters = {
  totalCount (state) {
    return state.cartProducts.reduce((sum, prod) => sum + prod.count, 0)
  },
  totalPrice (state) {
    return state.cartProducts.reduce((sum, prod) => sum + prod.totalPrice, 0)
  }
}
const mutations = {
  addToCart (state, product) {
    // 1. cartProducts中没有商品，将该商品添加到数组中，添加count, isChecked, totalPrice 属性
    // 2. cartProducts中如果有该商品，该商品数量+1,选中，计算totalPrice
    const prod = state.cartProducts.find(item => item.id === product.id)
    if (prod) {
      prod.count++
      prod.isChecked++
      prod.totalPrice = prod.count * prod.price
    } else {
      state.cartProducts.push({
        ...product,
        isChecked: true,
        count: 1,
        totalPrice: product.price
      })
    }
  },
  deleteFromCart (state, prodId) {
    const index = state.cartProducts.findIndex(item => item.id === prodId)
    if (index !== -1) {
      state.cartProducts.splice(index, 1)
    }
  },
  updateAllProductChecked (state, isChecked) {
    state.cartProducts.forEach(prod => { prod.isChecked = isChecked })
  },
  updateProductChecked (state, { prodId, checked }) {
    const prod = state.cartProducts.find(item => item.id === prodId)
    if (!prod) return
    prod.isChecked = checked
  },
  updateProduct (state, { prodId, count }) {
    const prod = state.cartProducts.find(item => item.id === prodId)
    if (!prod) return
    if (count) {
      prod.count = count
    }
  }
}
const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
