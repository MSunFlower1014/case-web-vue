import menuService from '../service/menu-service'
const menu = {
  namespaced: true,
  state: {
    menuTree: null,
    subSystem: null
  },

  mutations: {
    SET_MENU_TREE(state, menuTree) {
      state.menuTree = menuTree
    },
    SET_SUB_SYSTEM(state, name) {
      state.subSystem = name
    }
  },

  actions: {
    setUserMenus({ commit }) {
      menuService
        .getUserMenus()
        .then(rspData => {
          let menus = rspData || []
          commit('SET_MENU_TREE', rspData)
          if (menus.length > 0) {
            commit('SET_SUB_SYSTEM', menus[0].url)
          }
        })
        .catch(e => {})
    },
    setSubSystem({ commit }, name) {
      commit('SET_SUB_SYSTEM', name)
    }
  }
}
export default menu
