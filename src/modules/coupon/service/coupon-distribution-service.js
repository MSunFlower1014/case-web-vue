import BaseCRUDService from '@/modules/common/base-crud-service'
import couponDistributionApi from '../api/coupon-distribution-api'

class CouponService extends BaseCRUDService {
  constructor() {
    super(couponDistributionApi)
  }

  getAllOddCoupon(data) {
    return new Promise((resolve, reject) => {
      couponDistributionApi
        .getAllOddCoupon(data)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  getCouponHistory(data) {
    return new Promise((resolve, reject) => {
      couponDistributionApi
        .getCouponHistory(data)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  // 新增铺货记录列表
  getNewCouponOrgList(data) {
    return new Promise((resolve, reject) => {
      couponDistributionApi
        .getNewCouponOrgList(data)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  saveCouponList(data) {
    return new Promise((resolve, reject) => {
      couponDistributionApi
        .saveCouponList(data)
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
