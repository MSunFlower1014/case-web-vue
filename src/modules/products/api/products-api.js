import BaseCRUDApi from '@/modules/common/base-crud-api'
import request from '@/utils/request'

const API_BASE_URL = '/api/case'

class ProductsApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }

  getGoodsCoupon(param) {
    return request({
      url: `${API_BASE_URL}/getCaseInfoPage`,
      method: 'post',
      data: param
    })
  }
}

export default new ProductsApi()
