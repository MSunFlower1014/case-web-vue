import BaseCRUDApi from '@/modules/common/base-crud-api'
import request from '@/utils/request'

const API_BASE_URL = '/api/platform/goodsCategory'

class ProductCategoryApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }

  getGoodsCategoryCoupon(param) {
    return request({
      url: `${API_BASE_URL}/couponInfoList`,
      method: 'post',
      data: param
    })
  }
}

export default new ProductCategoryApi()
