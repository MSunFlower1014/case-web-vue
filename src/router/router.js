/* Main */
import Main from '../views/layout/main.vue'

const _import = require('./_import_' + process.env.NODE_ENV)
/**
 * note: submenu only apppear when children.length >= 1
 */
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only mmore than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
*/

// 不作为Main组件的子页面展示的页面单独写
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: _import('views/login/index'),
  hidden: true
}
export const loadRouter = {
  path: '/oauth',
  name: 'oauth',
  meta: {
    title: 'Oauth - 授权'
  },
  component: _import('views/oauth/index'),
  hidden: true
}

export const page404 = {
  path: '/404',
  name: 'error-404',
  meta: {
    title: '404-页面不存在'
  },
  component: _import('views/exception/404'),
  hidden: true
}

export const page401 = {
  path: '/401',
  meta: {
    title: '401-未授权访问该页面'
  },
  name: 'error-401',
  component: _import('views/exception/401'),
  hidden: true
}

export const page500 = {
  path: '/500',
  meta: {
    title: '500-服务端错误'
  },
  name: 'error-500',
  component: _import('views/exception/500'),
  hidden: true
}

// 静态定义的路由页面
export const constantRouter = []

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = [
  {
    path: '/',
    component: Main,
    name: 'Dashboard',
    redirect: '/dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: _import('views/dashboard/index')
      }
    ]
  },
  {
    path: '/case',
    component: Main,
    name: 'case',
    redirect: '',
    meta: {
      title: '病例'
    },
    children: [
      {
        path: 'case_list',
        component: _import('modules/coupon/views/common/CouponList'),
        name: 'coupon_list',
        meta: {
          title: '病例列表',
          icon: '',
          roles: [] // or you can only set roles in sub nav
        }
      },
      {
        path: 'case_details',
        component: _import('modules/coupon/views/common/CouponDetail'),
        name: 'coupon_details',
        meta: {
          title: '病例详情',
          icon: '',
          roles: [] // or you can only set roles in sub nav
        }
      },
      {
        path: 'case_add',
        component: _import('modules/coupon/views/work-flow/workFlow'),
        name: 'coupon_add',
        meta: {
          title: '编辑病例',
          icon: '',
          roles: [] // or you can only set roles in sub nav
        }
      }
    ]
  },
  {
    path: '/referral',
    component: Main,
    name: 'referral',
    redirect: '',
    meta: {
      title: '转诊'
    },
    children: [
      {
        path: 'referral_list',
        component: _import('modules/coupon/views/common/ReferralList'),
        name: 'referral_list',
        meta: {
          title: '转诊列表',
          icon: '',
          roles: [] // or you can only set roles in sub nav
        }
      },
      {
        path: 'referral_result',
        component: _import('modules/coupon/views/common/ReferralResult'),
        name: 'referral_result',
        meta: {
          title: '转诊结果',
          icon: '',
          roles: [] // or you can only set roles in sub nav
        }
      }
    ]
  },
  {
    path: '/user',
    component: Main,
    name: 'user',
    redirect: '',
    meta: {
      title: '用户'
    },
    children: [
      {
        path: 'user_list',
        component: _import('modules/coupon/views/account/index'),
        name: 'user_list',
        meta: {
          title: '用户列表',
          icon: '',
          roles: [] // or you can only set roles in sub nav
        }
      }
    ]
  }
]

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  loginRouter,
  loadRouter,
  page500,
  page401,
  page404,
  ...otherRouter,
  ...constantRouter
]
