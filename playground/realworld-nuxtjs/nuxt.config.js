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
            component: resolve(__dirname, "pages/layout/"),
            children: [
              {
                path: "",
                name: "home",
                exact: true,
                component: resolve(__dirname, "pages/home/"),
              },
              {
                path: "/login",
                name: "login",
                component: resolve(__dirname, "pages/login/"),
              },
              {
                path: "/register",
                name: "register",
                component: resolve(__dirname, "pages/register/"),
              },
              {
                path: "/profile/:username",
                name: "profile",
                component: resolve(__dirname, "pages/profile/"),
              },
              {
                path: "/settings",
                name: "settings",
                component: resolve(__dirname, "pages/settings/"),
              },
              {
                path: "/editor",
                name: "editor",
                component: resolve(__dirname, "pages/editor/"),
              },
              {
                path: "/article/:slug",
                name: "article",
                component: resolve(__dirname, "pages/article/"),
              },
            ],
          },
        ]
      );
    },
  },
};
