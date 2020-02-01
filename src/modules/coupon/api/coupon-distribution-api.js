import BaseCRUDApi from '@/modules/common/base-crud-api'
import request from '@/utils/request'
const API_BASE_URL = '/api/platform/couponDistribution'

class CouponDistributionApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }

  getAllOddCoupon(param) {
    return request({
      url: `${this.apiBaseUrl}/allList`,
      method: 'post',
      data: param
    })
  }

  getCouponHistory(param) {
    return request({
      url: `${this.apiBaseUrl}/distributionList`,
      method: 'post',
      data: param
    })
  }
  getNewCouponOrgList(param) {
    return request({
      url: `${this.apiBaseUrl}/distribution`,
      method: 'post',
      data: param
    })
  }
  saveCouponList(param) {
    return request({
      url: `${this.apiBaseUrl}/save`,
      method: 'post',
      data: param
    })
  }
}

export default new CouponDistributionApi()
