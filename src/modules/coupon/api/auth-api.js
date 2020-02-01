import BaseCRUDApi from '@/modules/common/base-crud-api'
import request from '@/utils/request'

const API_BASE_URL = '/api/platform/userCoupon'

class AuthApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }

  getActivationCoupons(data) {
    return request({
      url: `${this.apiBaseUrl}/list`,
      method: 'post',
      data: data
    })
  }
  // 根据优惠券id获取优惠券信息
  getActivationDetail(data) {
    return request({
      url: `${this.apiBaseUrl}/detail/${data.couponCode}`,
      method: 'get'
    })
  }
  // 激活核销
  verifyCoupon(data) {
    return request({
      url: `${this.apiBaseUrl}/verify?couponCode=${
        data.couponCode
      }&userCouponStatus=${data.status}`,
      method: 'post'
    })
  }
}

export default new AuthApi()
