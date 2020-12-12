# Vuex 购物车案例

## 组件概览

- 商品列表组件
- 购物车列表组件
- 我的购物车组件（弹出窗口）

###  商品列表组件

- 展示商品列表
- 添加购物车

## 功能

- 购物车列表
- 全选列表
- 数字文本框加减功能
- 删除（省略）
- 统计选中商品的数量和总价

## VueX 插件使用

使用订阅每次mutation且判断具体的type，在购物车状态的切面做保存的工作。

```js
const interceptorPlugin = store => {
  store.subscribe((mutation, state) => {
    // 记录每次变动后的数据
    if (mutation.type.startsWith('cart/')) {
      window.localStorage.setItem('cart-products', JSON.stringify(state.cart.cartProducts))
    }
  })
}
```

在store中注册插件

```
new Vuex.Store({
  // ... 
  plugins: [
    interceptorPlugin
  ]
})
```

即可实现每次变动数据，都能保存到localstorage中