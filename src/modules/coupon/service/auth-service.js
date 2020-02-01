import BaseCRUDService from '@/modules/common/base-crud-service'
import authApi from '../api/auth-api'

class AuthService extends BaseCRUDService {
  constructor() {
    super(authApi)
  }

  // 获取用户优惠券领取记录
  getActivationCoupons(params) {
    return new Promise((resolve, reject) => {
      authApi
        .getActivationCoupons(params)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  getActivationDetail(params) {
    return new Promise((resolve, reject) => {
      authApi
        .getActivationDetail(params)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 激活核销
  verifyCoupon(params) {
    return new Promise((resolve, reject) => {
      authApi
        .verifyCoupon(params)
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

export default new AuthService()
