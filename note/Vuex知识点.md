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

