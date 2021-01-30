# Realworld Nuxt

> 项目改造：https://github.com/gothinkster/realworld-starter-kit

使用 Nuxt.js 实现 realworld-starter 项目

## 搭建框架、创建模板

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

## 获取文章列表

`/api/articles`

考虑到首屏渲染，需要在Home页面的 asyncData 属性发送请求获取数据。

```js
import { getArticles } from "@/api/article";

export default {
  name: "HomeIndex",
  async asyncData() {
    const { data } = await getArticles();
    return {
      articles: data.articles,
      articlesCount: data.articlesCount,
    };
  },
};
```

## 文章列表数据绑定视图

还是一样的思路，a标签替换为 nuxt-link，通过 for 循环和文本插值生成批量数据

```vue
<div
  v-for="article in articles"
  :key="article.slug"
  class="article-preview"
>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username,
        },
      }"
    >
      <img :src="article.author.image"
    /></nuxt-link>
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username,
        },
      }"
    >
      <div class="info">
        <a href="" class="author"> {{ article.author.username }}</a>
        <span class="date">{{ article.createdAt }}</span>
      </div>
    </nuxt-link>

    <button
      class="btn btn-outline-primary btn-sm pull-xs-right"
      :class="{ active: article.favorited }"
    >
      <i class="ion-heart"></i> {{ article.favoritesCount }}
    </button>
  </div>
  <nuxt-link
    :to="{
      name: 'article',
      params: {
        slug: article.slug,
      },
    }"
    class="preview-link"
  >
    <h1>{{ article.title }}</h1>
    <p>{{ article.description }}</p>
    <span>Read more...</span>
  </nuxt-link>
</div>
```

## 处理分页逻辑

通过路径查询参数`?page=1`传递分页页码，再通过指定的 `limit` 分页大小算出 `offset`, 在页面初始化时，计算好传给后端：

```js
async asyncData({ query }) {
    const page = Number.parseInt(query.page || 1);
    const limit = 10;

    const { data } = await getArticles({
      limit,
      offset: (page - 1) * limit,
    });
    return {
      articles: data.articles,
      articlesCount: data.articlesCount,
      limit,
      page,
    };
  }
```

分页总数通过公式算出，存到computed中

```js
{  
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
}
```

给`pagination`的视图节点绑上数据

```vue
<nav>
  <ul class="pagination">
    <li
      v-for="pageIndex in totalPage"
      :key="pageIndex"
      class="page-item"
      :class="{
        active: page === pageIndex,
      }"
    >
      <nuxt-link
        class="page-link"
        :to="{
          name: 'home',
          query: {
            page: pageIndex,
          },
        }"
        >{{ pageIndex }}</nuxt-link
      >
    </li>
  </ul>
</nav>
```

注意此时的跳转，并不会刷新页面，因为 page 并不是一个响应式数据。通过 Nuxt 提供的 `watchQuery` 属性，监听查询参数，如果设置为 true，则全部监听，指定数组则为按需监听。

```js
watchQuery: ['page']
```

此时热更新不生效，刷新页面即可。

## 使用并发请求替代串行请求

如果首屏请求相互无依赖，可以使用`Promise.all`将异步任务包裹，异步执行

串行请求（优化前），请求时间平均为2.1s

```js
const { data } = await getArticles({
      limit,
      offset: (page - 1) * limit,
    });

    const { data: tagData } = await getTags();
```

使用Promise.all并行请求（优化后），请求时间平均为1.3s

```js
const [articleRes, tagRes] = await Promise.all([
      getArticles({
        limit,
        offset: (page - 1) * limit,
      }),
      getTags(),
    ]);
```

## 首页

### 标签查询

在参数路由添加 `tag`，注意分页时也要带上`tag`

### 导航栏

分析：

- 未登录时，展示 `Global Feed`，`Your Feed`禁用。登录后，`Your Feed`可选。

- 点击标签，新增一个Tab，展示该标签下的动态;离开后，tab消失。

### Tab高亮实现

Tab的高亮需要匹配路由查询参数`tab`，需要做四件事情：

1. 在asyncData中获取query.tab，并设置首页默认值，返回data: `tab`
2. 在watchQuery中设置监听: `watchQuery: ['tab']`
3. 在视图模板中，设置对应`nuxt-link`的动态class: `active`与`tab`关联
4. 设置`nuxt-link`的`exact`属性为true,精确匹配路由才能避免重复高亮。

## Axios

### 统一设置header token

使用axios的请求拦截器`interceptors.request`

```js
// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 请求发送前执行
    config.headers.Authorization = `Token your_token`;
    return config;
  },
  (error) => {
    // 请求未发出
    return Promise.reject(error);
  }
);
```

那么如何获取到token呢？

我们的用户信息存储在`vuex.store`中，且是在`vue`app运行时才会发请求获取用户数据，如果直接导入`store`那么拿到的`user`信息必然为`null`。是不是没有办法了呢，其实[Nuxt的`插件`机制](https://nuxtjs.org/docs/2.x/directory-structure/plugins)可以帮忙。

> The `plugins` directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to `plugins` in `nuxt.config.js`.

我们将注册一个自定插件，并借助插件的上下文参数，在vue客户端代码运行时，拿到用户信息。

在根目录创建`plugins/`目录，添加`request.js`文件，写入：

```js
import axios from "axios";

export const request = axios.create({
  baseURL: "https://conduit.productionready.io",
});

// 插件导出函数必须作为default成员。
// 借助插件机制，获取上下文（含app, store, req, param ...）
export default ({ store }) => {
  // 请求拦截器
  request.interceptors.request.use(
    (config) => {
      // 请求发送前执行
      const { user } = store.state;
      if (user && user.token) {
        config.headers.Authorization = `Token ${user.token}`;  // 统一设置token
      }
      return config;
    },
    (error) => {
      // 请求未发出
      return Promise.reject(error);
    }
  );
};
```

然后在`nuxt.config.js`配置文件，注册插件：

```js
module.exports = {
  // ...
  plugins: ["~/plugins/request.js"],
};
```

重启服务，即可享受统一的token设置（如果有的话）

## 日期格式化

> 使用 [dayjs](https://day.js.org/): Moment.js 的 2kB 轻量化方案，拥有同样强大的 API

对日期时间做特定格式，做成过滤器 filter。在nuxt中需要做成plugin，这里支持自定义格式化，模板会视图的值作为第一项参数传入，预留第二项参数来指定自定义格式。

```js
import Vue from "vue";
import dayjs from "dayjs";

// {{ 表达式 | 过滤器 }}
Vue.filter("date", (value, format = "YYYY-MM-DD HH:mm:ss") => {
  return dayjs(value).format(format);
});
```

在config中导入插件

```js
module.exports = {
  // ...
  plugins: ["~/plugins/request.js", "~/plugins/dayjs.js"],
};
```

模板中使用（默认情况）

```vue
<span class="date">{{article.createdAt | date}}</span>
```

模板中使用（自定义日期格式）

```vue
<span class="date">{{article.createdAt | date("MMM DD,YYYY")}}</span>
```

## 点赞逻辑

接入点赞、取消点赞的接口

```js
export const favoriteArticle = (slug) => {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method: "POST",
  });
};

export const unfavoriteArticle = (slug) => {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method: "DELETE",
  });
};
```

点赞的途中，禁用该按钮的点击态，需要给每条数据加一个disabled状态。

```js
return {
	articles: articles.map((item) => ({
        ...item,
        favoriteDisabled: false,  // 给源数据增加状态
      }));
}
```

在发出请求前置为`true`，发出请求后置为`false`，防止因网络原因让用户点击多次。

```js
async onFavorite(article) {
      article.favoriteDisabled = true; // 点赞禁用态
      if (article.favorited) {
        await unfavoriteArticle(article.slug);
        article.favorited = false;
        article.favoritesCount -= 1;
      } else {
        await favoriteArticle(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      article.favoriteDisabled = false; // 解除点赞禁用态
    },
```

在视图上绑定禁用状态

```vue
<button
  class="btn btn-outline-primary btn-sm pull-xs-right"
  :class="{ active: article.favorited }"
  :disabled="article.favoriteDisabled"
  @click="onFavorite(article)"
>
  <i class="ion-heart"></i> {{ article.favoritesCount }}
</button>
```

则完成点赞的功能。

## 文章详情页

此模块很需要SEO，所以获取文章详情的操作要放到服务端做，即在 `asyncData` 中完成。

### Markdown 格式支持

> 第三方包：[markdown-it](https://github.com/markdown-it/markdown-it)

直接使用markdown-it的API将文本内容解析成`html`文本，然后在模板使用 `v-html` 指令渲染文本。

```js
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();
article.body = md.render(article.body);
```

> 问题：文本需做转义处理，如何避免XSS攻击？

### SEO设置

> Nuxt的SEO设置文档：https://nuxtjs.org/docs/2.x/features/meta-tags-seo

 通过nuxt在vue模板中设置`head`方法，即可修改当前文章页的head里的`title`与`meta`标签，将文章标题设为`title`，文章内容设为`meta description`即可。

```js
export default {
  name: "ArticleMeta",
  // ...
  // SEO
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.article.description,
        },
      ],
    };
  },
};
```

## 评论区设置

将发送评论的表单与评论列表放在一起。

考虑评论对于SEO的必要性不大，可以使用客户端请求的方式拉取数据。

## 打包 Nuxt.js 应用

> 官方文档：https://nuxtjs.org/docs/2.x/get-started/commands

官网提到有两种打包模式：`Server Deployment` & `Static Deployment (Pre-rendered)`，这里的程序需要服务端渲染，所以只考虑 `Server Deployment`。

对应的`package.json`设置如下：

```json
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate"
}
```

其中`generate`是用于静态模式打包的，在这里可以忽略。执行`npm run build`，nuxt脚手架会自动将应用打包

到`.nuxt`目录下的`dist`路径; 再接着运行`npm run start`即可以生产模式启动服务。

## 踩过的坑

### nuxt-link嵌套不正确，导致build之后页面报错 

写完页面后打包Build,看到报错

```
Failed to execute 'appendChild' on 'Node': This node type does not support this method. 
```

问题分析：

提示有匹配不上的`VNode`，可能是html模板嵌套不正确导致的。debug了半天，发现`nuxt-link`里面又嵌套了一层`<a>`，导致渲染报错。。。我猜因为`nuxt-link`渲染成html后nuxt这个提示也太难找问题了。

解决办法：

移除nuxt-link内部的a标签，调整结构/换成别的元素。