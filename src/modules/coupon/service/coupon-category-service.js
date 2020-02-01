import BaseCRUDService from '@/modules/common/base-crud-service'
import couponCategoryApi from '../api/coupon-category-api'

class CouponCategoryService extends BaseCRUDService {
  constructor() {
    super(couponCategoryApi)
  }

  // 查询全部优惠券分类信息
  queryAllCategory() {
    return new Promise((resolve, reject) => {
      couponCategoryApi
        .queryAllCategory()
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  changeCategoryStatus(data) {
    return new Promise((resolve, reject) => {
      couponCategoryApi
        .changeCategoryStatus(data)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 更新优惠券类型数据
  updateCouponInfo(data) {
    return new Promise((resolve, reject) => {
      couponCategoryApi
        .updateCouponInfo(data)
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

export default new CouponCategoryService()
