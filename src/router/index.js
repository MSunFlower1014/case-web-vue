import Vue from 'vue'
import VueRouter from 'vue-router'
import { routers } from './router'
import store from '../store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

Vue.use(VueRouter)

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 路由配置
const RouterConfig = {
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: routers
}
export const router = new VueRouter(RouterConfig)

const whiteList = ['/login', '/oauth', '/ecop', '/404', '/401', '/500'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (whiteList.indexOf(to.path) !== -1) {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (!store.getters.currentUser) { // judge if has got current user_info
        store.dispatch('system/login/getLoginUserInfo').then(() => {
          console.log('获取用户数据 ---   开始')
          next({ ...to, replace: true })
        }).catch(() => {
          store.dispatch('system/login/frontLogout').then(() => {
            Message.error('获取用户信息失败，请重新登录')
            next({ path: '/login' })
            // next({
            //   path: '/401'
            // })
          })
        })
      } else {
        next()
      }
    }
  } else {
    console.log('route:' + to.path)
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      // next('/401') // 否则全部重定向到401
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
