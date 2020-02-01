import dictService from '../service/dict-service'
const dict = {
  namespaced: true,
  state: {
    dictMap: null
  },

  mutations: {
    SET_DICT_MAP: (state, dictMap) => {
      state.dictMap = dictMap
    },
    CLEAR_DICT_MAP: state => {
      state.dictMap = null
    }
  },

  actions: {
    getAllDictMap({ commit }) {
      dictService
        .getAllDictMap()
        .then(rspData => {
          commit('SET_DICT_MAP', rspData.data)
        })
        .catch(e => {})
    }
  }
}
export default dict
