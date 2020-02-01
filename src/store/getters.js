import systemGetters from '@/modules/system/store/getters'

const getters = {
  // 公共getters
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  // 各个模块暴露自己的getter展开到这里
  ...systemGetters
}
export default getters
