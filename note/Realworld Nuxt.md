# Realworld Nuxt

> 项目改造：https://github.com/gothinkster/realworld-starter-kit

使用 Nuxt.js 实现 realworld-starter 项目

## Step 1 -  搭建框架、创建模板

### 搭建NuxtJS框架

搭建NuxtJS框架，写基础html模板 引入 ionicon 等样式依赖

```html
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    <!-- Import Ionicon icons & Google Fonts our Bootstrap theme relies on -->
    <link
      href="https://cdn.jsdelivr.net/npm/ionicons@2.0.1/css/ionicons.min.css"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
      rel="stylesheet"
      type="text/css"
    />
    <!-- Import the custom Bootstrap 4 theme from our hosted CDN -->
    <link rel="stylesheet" href="//demo.productionready.io/main.css" />
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>

```

### 编写 layout 骨架&改写默认路由表

```vue
<template>
  <div>
    <nav class="navbar navbar-light">
      <div class="container">
        <a class="navbar-brand" href="index.html">conduit</a>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <a class="nav-link active" href="">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="">
              <i class="ion-compose"></i>&nbsp;New Post
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="">Sign up</a>
          </li>
        </ul>
      </div>
    </nav>

    <nuxt-child />  

    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from
          <a href="https://thinkster.io">Thinkster</a>.Code &amp; design
          licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "layoutIndex",
};
</script>

<style>
</style>
```

由于Nuxt默认根据目录结构生成路由表，需要自定义控制，创建 `nuxt.config.js`

```js
/**
 * Nuxt.js 配置文件
 */
module.exports = {
  router: {
    extendRoutes(routes, resolve) {
      // 清除　Nuxt.js　基于　pages　目录默认生成的路由表规则
      routes.splice(0);

      routes.push(
        ...[
          {
            path: "/",
            component: resolve(__dirname, "pages/layout/index.vue"),
            children: [
              {
                path: "",
                name: "home",
                component: resolve(__dirname, "pages/home/index.vue"),
              },
            ],
          },
        ]
      );
    },
  },
};
```

这样就可以自定义路由与组件了。

### 登录/注册模板

包含表单、登录/注册跳转link，错误信息提示。`a`标签改造为`nuxt-link`标签。

```html
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <nuxt-link to="/register">Need an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <li>That email is already taken</li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
```

### 导入设置、文章页

代码详情见：https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md#loginregister

### 调整所有的超链接标签

改所有的站内跳转的`a`标签为`nuxt-link`标签，切为nuxt路由。

## 同构渲染的用户登录态处理

前后端共享方案，官网示例：跨域身份验证（JWT）

服务端需要调用 Vuex 的全局模块的 `nuxtServerInit` action（通过中间件的形式），通过判断 client 端的请求头是否有 cookie `auth`，来将登录态存储到 vuex 中。

### 第一步，client端将接口的数据存到vuex中

请求登录接口后，client 端需要把用户数据存到 vuex 中。此时如果刷新页面，状态就会丢失，所以我们需要做更多处理。

> 这里的vuex写法与常规vue项目不同，无需导入vuex，直接按需export state / mutation ...由nuxt服务端调用; state要写成函数形式， 如
>
> ```
> export const state = () => {
>   return {
>     user: null,
>   };
> };
> ```

### 第二步，client端还需将用户token存储在cookie中

此处需区分环境（client）端，我们可以使用 `process.client` / `process.server` 来区分，并决定是否加载cookie的库。

```js
const Cookie = process.client ? require("js-cookie") : undefined;
```

### 第三步，server端借助 vuex 的 action: `nuxtServerInit`  方法初始化登录态

借助请求头的cookie，初始化项目的vuex状态。

## 处理页面访问权限

使用`路由中间件`来解决

这里有两种场景：

1. 页面未登录不允许访问（个人主页...）
2. 页面已登录不允许访问（登录页...)

在根目录创建 `middleware` 中间件目录，导出鉴权中间件

```js
// 验证是否登录的中间件
export default function({ store, redirect }) {
  if (!store.state.user) {
    return redirect("/login");
  }
}
```

```js
// 已登录，跳转首页
export default function({ store, redirect }) {
  if (store.state.user) {
    return redirect("/");
  }
}
```

然后在页面组件的`middleware`参数，传入定义的中间件文件名，nuxt会自动检索根目录下`middleware`路径下的中间件（约定式），并在路由匹配到之后，组件加载前执行中间件。

```vue
// profile.vue
<script>
export default {
	name: 'profile',
	middleware: 'authenticated'
}
</script>
```

```vue
// login.vue
<script>
export default {
	name: 'login',
	middleware: 'notAuthenticated'
}
</script>
```



