let _Vue = null

class Store {
  constructor(options) {
    const {
      state = {},
      getters = {},
      mutations = {},
      actions = {},
    } = options
    this.state = _Vue.observable(state)
    this.getters = Object.create(null)
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => getters[key](state)
      })
    })
    this._mutations = mutations
    this._actions = actions
  }

  commit (type, payload) {
    this._mutations[type](this.state, payload)
  }

  dispatch(type, payload) {
    this._actions[type](this, payload) //context, payload
  }
}

function install (Vue) {
  _Vue = Vue
  // 混入beforeCreate通过$options拿到实例对象,写入原型，共享store
  _Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        _Vue.prototype.$store = this.$options.store  // 将Vue实例化时传入的store注入原型上
      }
    }
  })
}

export default {
  Store,
  install
}