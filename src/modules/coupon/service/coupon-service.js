import BaseCRUDService from '@/modules/common/base-crud-service'
import couponApi from '../api/coupon-api'

class CouponService extends BaseCRUDService {
  constructor() {
    super(couponApi)
  }

  // 根据优惠券id查询优惠券详情信息
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

  // 根据优惠券id 查询优惠券详情信息
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

  // 更新优惠券基本信息
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

  // 新增优惠券信息
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

  // 获取转派列表
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

  // 获取用户列表
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
}

export default new CouponService()
