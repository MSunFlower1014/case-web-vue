import BaseCRUDService from '@/modules/common/base-crud-service'
import couponApi from '../api/coupon-api'

class CouponService extends BaseCRUDService {
  constructor() {
    super(couponApi)
  }

  queryCouponDetailById(id) {
    return new Promise((resolve, reject) => {
      couponApi
        .queryCouponDetailById(id)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  getBasicById(data) {
    return new Promise((resolve, reject) => {
      couponApi
        .getBasicById(data)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  updateFormDataById(data) {
    return new Promise((resolve, reject) => {
      couponApi
        .updateFormDataById(data)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  addFormData(data) {
    return new Promise((resolve, reject) => {
      couponApi
        .addFormData(data)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  queryUserList(data) {
    return new Promise((resolve, reject) => {
      couponApi
        .queryUserList()
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 新增转派流程
  addReferralFromData(data) {
    return new Promise((resolve, reject) => {
      couponApi
        .addReferralFromData(data)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 登录
  loginByUser(data) {
    return new Promise((resolve, reject) => {
      couponApi
        .addReferralFromData(data)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 获取用户列表
  getUserList(data) {
    return new Promise((resolve, reject) => {
      couponApi
        .getUserList(data)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }


  saveUser(data) {
    return new Promise((resolve, reject) => {
      couponApi
        .saveUser(data)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 获取用户列表分页
  getUserListPage(data) {
    return new Promise((resolve, reject) => {
      couponApi
        .getUserListPage(data)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  //
   getDepartList() {
      return new Promise((resolve, reject) => {
        couponApi
          .getDepartList()
          .then(response => {
            const data = response.data
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
}

export default new CouponService()
