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

  checkReferral(param) {
    return request({
      url: `/api/referral/checkReferral`,
      method: 'post',
      data: param
    })
  }

  getReferralInfo(param) {
    return request({
      url: `/api/referral/getReferralInfo`,
      method: 'post',
      data: param
    })
  }

  changeCaseStatus(param) {
    return request({
      url: `/api/case/changeCaseStatus`,
      method: 'post',
      data: param
    })
  }
}

export default new ProductsApi()
