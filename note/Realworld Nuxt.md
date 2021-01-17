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