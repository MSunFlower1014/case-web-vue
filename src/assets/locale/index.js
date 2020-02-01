import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import enLocale from './lang/en'
import zhLocale from './lang/zh'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}
// todo 获取浏览器当前语言
let language = '';
if (navigator.language) {
  language = navigator.language;
}
else {
  language = navigator.browserLanguage;
}
language = (language === 'zh-CN' ? 'zh' : 'en');

const i18n = new VueI18n({
  locale: Cookies.get('language') || language, // set locale
  messages // set locale messages
})

export default i18n
