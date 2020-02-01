import staticApi from '../api/static-api'

const statics = {
  namespaced: true,
  state: {
    platCategoryCodes: [], // 平台下优惠券
    shopCategoryCodes: [] // 店铺下优惠券
  },

  mutations: {
    SET_CATEGORY_CODE: (state, codes) => {
      state.platCategoryCodes = codes.slice(0, 3)
      state.shopCategoryCodes = codes.slice(3, 11)

      // let platArr = codes.slice(0, 3)
      // let shopArr = codes.slice(3, 11)
      // for (let i = 0; i < platArr.length; i++) {
      //   let obj = {
      //     id: '',
      //     label: '',
      //     value: '',
      //     status: ''
      //   }
      //   obj.id = platArr[i].id
      //   obj.label = platArr[i].dataName
      //   obj.value = platArr[i].dataValue
      //   obj.status = platArr[i].status
      //   state.platCategoryCodes.push(obj)
      // }

      // for (let i = 0; i < shopArr.length; i++) {
      //   let obj = {
      //     id: '',
      //     label: '',
      //     value: '',
      //     status: ''
      //   }
      //   obj.id = shopArr[i].id
      //   obj.label = shopArr[i].dataName
      //   obj.value = shopArr[i].dataValue
      //   obj.status = shopArr[i].status
      //   state.shopCategoryCodes.push(obj)
      // }
    }
  },

  actions: {
    // 获取优惠券类型
    getCategoryCode({ commit }, type) {
      return new Promise((resolve, reject) => {
        staticApi
          .getStaticByType(type)
          .then(response => {
            const data = response.data
            commit('SET_CATEGORY_CODE', data.data)
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
export default statics
