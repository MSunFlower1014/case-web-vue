import couponCategoryApi from '../api/coupon-category-api'
import areaApi from '../api/area-api'
// import couponApi from '../api/coupon-api'
// import targetUserApi from '../api/target-user-api'
const coupon = {
  namespaced: true,
  state: {
    couponID: '', // 对其操作的优惠券id
    categoryName: '', // 对其操作的优惠券类型
    couponCategories: [],
    areas: [],
    platCategoryCodes: [], // 平台下优惠券
    shopCategoryCodes: [] // 店铺下优惠券
  },

  mutations: {
    SET_CATEGORIES: (state, categories) => {
      state.platCategoryCodes = []
      state.shopCategoryCodes = []
      state.couponCategories = categories
      categories.forEach(item => {
        if (parseInt(item.categoryCode) < '5') state.platCategoryCodes.push(item)
        else state.shopCategoryCodes.push(item)
      })
    },
    SET_AREAS: (state, areas) => {
      state.areas = areas
    },
    SET_ID: (state, record) => {
      state.couponID = record.id
      state.categoryName = record.categoryName
    }
  },

  actions: {
    getCategory({ commit }, code) {
      return new Promise((resolve, reject) => {
        couponCategoryApi.queryAllCategory(code)
          .then(response => {
            const data = response.data
            commit('SET_CATEGORIES', data.data)
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    getArea({ commit }) {
      return new Promise((resolve, reject) => {
        areaApi.queryAllArea()
          .then(response => {
            const data = response.data
            commit('SET_AREAS', data.data)
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
export default coupon
