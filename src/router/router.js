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
          title: '优惠券详情',
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
      }
    ]
  }
]

// 异步获取的用户菜单所对应的路由
export const asyncRouter = [
  { path: '*', redirect: '/404', hidden: true },
  {
    path: '/coupon',
    name: 'coupon',
    component: Main,
    redirect: '/coupon/coupon_type',
    meta: {
      title: '优惠券'
    },
    children: [
      {
        path: 'coupon_type',
        component: _import('modules/coupon/views/type/index'),
        name: 'coupon_type',
        meta: {
          title: '优惠券类型管理',
          icon: '',
          roles: [] // or you can only set roles in sub nav
        }
      },
      {
        path: 'coupon_setup',
        component: _import('modules/coupon/views/setup/index'),
        name: 'coupon_setup',
        redirect: '/coupon/coupon_setup/setup_list',
        meta: {
          title: '优惠券制券',
          icon: '',
          roles: [] // or you can only set roles in sub nav
        },
        children: [
          {
            path: 'setup_list',
            component: _import('modules/coupon/views/setup/couponSetup'),
            name: 'setup_list'
          }
        ]
      },
      {
        path: 'coupon_shop',
        component: _import('modules/coupon/views/shop/index'),
        name: 'coupon_shop',
        redirect: '/coupon/coupon_shop/shop_list',
        meta: {
          title: '优惠券铺货',
          icon: '',
          roles: [] // or you can only set roles in sub nav
        },
        children: [
          {
            path: 'shop_list',
            component: _import('modules/coupon/views/shop/couponShop'),
            name: 'shop_list'
          },
          {
            path: 'shop_history',
            component: _import('modules/coupon/views/shop/index'),
            name: 'shop_history',
            redirect: '/coupon/coupon_shop/shop_history/history_list',
            meta: {
              title: '优惠券铺货记录',
              icon: '',
              roles: [] // or you can only set roles in sub nav
            },
            children: [
              {
                path: 'history_list',
                component: _import('modules/coupon/views/shop/shopHistory'),
                name: 'history_list'
              },
              {
                path: 'shop_add',
                component: _import('modules/coupon/views/shop/shopAdd'),
                name: 'shop_add',
                meta: {
                  title: '新增优惠券铺货',
                  icon: '',
                  roles: [] // or you can only set roles in sub nav
                }
              }
            ]
          }
        ]
      },
      {
        path: 'coupon_grant',
        component: _import('modules/coupon/views/grant/index'),
        name: 'coupon_grant',
        redirect: '/coupon/coupon_grant/grant_list',
        meta: {
          title: '优惠券发放',
          icon: '',
          roles: [] // or you can only set roles in sub nav
        },
        children: [
          {
            path: 'grant_list',
            component: _import('modules/coupon/views/grant/couponGrant'),
            name: 'grant_list'
          },
          {
            path: 'coupon_grant_batch',
            component: _import('modules/coupon/views/grant/grantBatch'),
            name: 'coupon_grant_batch',
            meta: {
              title: '优惠券批量发放',
              icon: '',
              roles: [] // or you can only set roles in sub nav
            }
          },
          {
            path: 'coupon_grant_personal',
            component: _import('modules/coupon/views/grant/grantPersonal'),
            name: 'coupon_grant_personal',
            meta: {
              title: '优惠券个人发放',
              icon: '',
              roles: [] // or you can only set roles in sub nav
            }
          },
          {
            path: 'record_list',
            component: _import('modules/coupon/views/grant/recordList'),
            name: 'record_list',
            meta: {
              title: '发放记录',
              icon: '',
              roles: [] // or you can only set roles in sub nav
            }
          }
        ]
      },
      {
        path: 'coupon_auth',
        component: _import('modules/coupon/views/auth/index'),
        name: 'coupon_auth',
        redirect: '/coupon/coupon_auth/auth_list',
        meta: {
          title: '优惠券激活/核销',
          icon: '',
          roles: [] // or you can only set roles in sub nav
        },
        children: [
          {
            path: 'auth_list',
            component: _import('modules/coupon/views/auth/couponAuthList'),
            name: 'auth_list'
          },
          {
            path: 'coupon_detail',
            component: _import('modules/coupon/views/auth/couponDetail'),
            name: 'coupon_detail',
            meta: {
              title: '优惠券操作',
              icon: '',
              roles: [] // or you can only set roles in sub nav
            }
          }
        ]
      }
    ]
  },
  {
    path: '/analysis',
    name: 'analysis',
    component: Main,
    redirect: '',
    meta: {
      title: '统计分析'
    },
    children: [
      {
        path: 'platform_analysis',
        component: _import('modules/analysis/views/platform_analysis/index'),
        name: 'platform_analysis',
        meta: {
          title: '平台分析',
          icon: '',
          roles: [] // or you can only set roles in sub nav
        }
      },
      {
        path: 'coupon_analysis',
        component: _import('modules/analysis/views/coupon_analysis/index'),
        name: 'coupon_analysis',
        redirect: '/analysis/coupon_analysis/analy_list',
        meta: {
          title: '优惠券分析',
          icon: '',
          roles: [] // or you can only set roles in sub nav
        },
        children: [
          {
            path: 'analy_list',
            component: _import('modules/analysis/views/coupon_analysis/CouponList'),
            name: 'analy_list'
          },
          {
            path: 'analysis_detail',
            component: _import(
              'modules/analysis/views/coupon_analysis/AnalysisDetail'
            ),
            name: 'analysis_detail',
            meta: {
              title: '分析详情',
              icon: '',
              roles: [] // or you can only set roles in sub nav
            }
          }
        ]
      }
    ]
  },
  {
    path: '/roles_auth',
    name: 'roles_auth',
    component: Main,
    redirect: '',
    meta: {
      title: '角色权限'
    },
    children: [
      {
        path: 'account',
        component: _import('modules/roles/views/account/index'),
        name: 'account',
        meta: {
          title: '账号管理',
          icon: '',
          roles: [] // or you can only set roles in sub nav
        }
      },
      {
        path: 'roles',
        component: _import('modules/roles/views/roles/index'),
        name: 'roles',
        meta: {
          title: '角色管理',
          icon: '',
          roles: [] // or you can only set roles in sub nav
        },
        children: [
          {
            path: 'role_edit',
            component: _import('modules/roles/views/roles/RoleEdit'),
            name: 'role_edit',
            meta: {
              title: '编辑角色',
              icon: '',
              roles: [] // or you can only set roles in sub nav
            }
          }
        ]
      },
      {
        path: 'menu',
        component: _import('modules/roles/views/menu/index'),
        name: 'menu',
        meta: {
          title: '菜单管理',
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
  ...constantRouter,
  ...asyncRouter
]
