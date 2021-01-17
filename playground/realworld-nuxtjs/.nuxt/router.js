import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _86f0d09c = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _44eb1367 = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _58afa1e1 = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _46586daa = () => interopDefault(import('../pages/register' /* webpackChunkName: "" */))
const _771503be = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _5b7a56ab = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _9e8e8416 = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _a9807d24 = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _86f0d09c,
    children: [{
      path: "",
      component: _44eb1367,
      name: "home"
    }, {
      path: "/login",
      component: _58afa1e1,
      name: "login"
    }, {
      path: "/register",
      component: _46586daa,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _771503be,
      name: "profile"
    }, {
      path: "/settings",
      component: _5b7a56ab,
      name: "settings"
    }, {
      path: "/editor",
      component: _9e8e8416,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _a9807d24,
      name: "article"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
