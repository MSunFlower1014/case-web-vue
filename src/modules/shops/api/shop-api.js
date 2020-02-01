import BaseCRUDApi from '@/modules/common/base-crud-api'
import request from '@/utils/request'
const API_BASE_URL = '/api/platform/shop'

class ShopApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }

  // 查询店铺信息
  queryShopList(data) {
    let url = `${this.apiBaseUrl}/query`
    return request({
      url: url,
      method: 'post',
      data: data
    })
  }

  // 根据shopId查询店铺下所属优惠券
  queryShopCouponList(data) {
    let url = `${this.apiBaseUrl}/shopCouponList`
    return request({
      url: url,
      method: 'post',
      data: data
    })
  }
}

export default new ShopApi()
