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

  // 根据优惠券id + ststus查询优惠券详情信息
  getBasicByIdStatus(data) {
    return new Promise((resolve, reject) => {
      couponApi
        .getBasicByIdStatus(data)
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

  // 更新优惠券其他规则
  updateOtherRuleById(data) {
    return new Promise((resolve, reject) => {
      couponApi
        .updateOtherRuleById(data)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 更新优惠券状态
  updateStatusById(params) {
    return new Promise((resolve, reject) => {
      couponApi
        .updateStatusById(params)
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
