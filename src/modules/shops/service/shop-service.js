import BaseCRUDService from '@/modules/common/base-crud-service'
import shopApi from '../api/shop-api'

class ShopService extends BaseCRUDService {
  constructor() {
    super(shopApi)
  }

  // 查询店铺信息
  queryShopList(data) {
    return new Promise((resolve, reject) => {
      shopApi
        .queryShopList(data)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 根据shopId查询店铺下所属优惠券
  queryShopCouponList(data) {
    return new Promise((resolve, reject) => {
      shopApi
        .queryShopCouponList(data)
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

export default new ShopService()
