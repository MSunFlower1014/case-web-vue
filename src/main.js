import 'babel-polyfill'
import Vue from 'vue'

import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import 'font-awesome/scss/font-awesome.scss'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/assets/styles/index.scss' // global css
import 'swiper/dist/css/swiper.css' // 引入swiper样式

import App from './App'
import { router } from './router'
import store from './store'

import i18n from '@/assets/locale' // Internationalization
import '@/icons' // icon
import '@/router' // permission control
// import '../mock' // simulation data，会引起文件下载问题，生产环境注释此行
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

import geturlpara from '@/utils/getUrlParam'
Vue.prototype.$geturlpara = geturlpara

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
