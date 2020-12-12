# Vuex知识点

## State

状态数据，响应式。

定义：

```
state: {
  msg: 'Hello World',
  count: 0,
}
```

调用：

```
$store.state.msg
```

mapState

```
computed: {
  ...mapState({
    message: 'msg',
    num: 'count'
  })
}
```

## Getter

在state的基础上做数据转换

定义：

```
getters: {
  reverseMsg(state) {
    return state.msg.split('').reverse().join('')
  }
}
```

调用：

```
$store.getters.reverseMsg
```

mapGetters

```
computed: {
  ..mapGetters('demo', ['reverseMsg1'])
}
```

## Mutation

同步更新state的操作，原子操作

定义

```
mutations: {
  increment(state, payload) {
    state.count += payload
  }
}
```

使用：

```
$store.commit('namespace.mutation', payload)
```

mapMutations

```
methods: {
  ...mapMutations('namespace', ['mutation'])
}
```

## Action

异步，提交mutation

定义：

```
actions: {
  // context 含 state, commit, dispatch等
  incrementAsync(context, payload) {
    setTimeout(() => {
      context.commit('increment', payload)
    }, 2000)
  }
}
```

调用：

```
$store.dispatch('namespace.action')
```

mapAction

```
methods: {
  ...mapAction('namespace', []'increateAsync'])
}
```

## Module

拆分子状态树，在Vuex.Store实例导入modules选项

`namespaced: boolean` **注意不要写成namespace了**

## 严格模式

`strict`字段，深度检查state是否直接被变更，在开发环境开启，生产环境关闭。

## VueX 插件使用

使用订阅每次mutation且判断具体的type，在购物车状态的切面做保存的工作。

```
const interceptorPlugin = store => {
  store.subscribe((mutation, state) => {
​    // 记录每次变动后的数据
​    if (mutation.type.startsWith('cart/')) {
​      window.localStorage.setItem('cart-products', JSON.stringify(state.cart.cartProducts))
​    }
  })
}
```

在store中注册插件

```
new Vuex.Store({
  // ... 
  plugins: [
​    interceptorPlugin
  ]
})
```

即可实现每次变动数据，都能保存到localstorage中

## 实现最小Vuex

```js
// myvuex.js
let _Vue = null

class Store {
  constructor(options) {
    const {
      state = {},
      getters = {},
      mutations = {},
      actions = {},
    } = options
    this.state = _Vue.observable(state)  // 响应式处理
    this.getters = Object.create(null)
    // 初始化getters
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => getters[key](state)
      })
    })
    this._mutations = mutations
    this._actions = actions
  }

  commit (type, payload) {
    this._mutations[type](this.state, payload) // state, payload
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
```

