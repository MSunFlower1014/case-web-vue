import BaseCRUDApi from '@/modules/common/base-crud-api'
import request from '@/utils/request'

const API_BASE_URL = '/api/platform/userCoupon'

class HistoryApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }

  getUserReceivedCoupons(data) {
    return request({
      url: `${this.apiBaseUrl}/phoneList`,
      method: 'post',
      data: data
    })
  }
  getUserCouponDetailList(data) {
    return request({
      url: `${this.apiBaseUrl}/couponDetailList`,
      method: 'post',
      data: data
    })
  }
}

export default new HistoryApi()
