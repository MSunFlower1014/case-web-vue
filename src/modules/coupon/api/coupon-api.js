import BaseCRUDApi from '@/modules/common/base-crud-api'
import request from '@/utils/request'
const API_BASE_URL = '/api/case'

class CouponApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }

  // 根据优惠券id查询优惠券详情信息
  queryCouponDetailById(id) {
    return request({
      url: `${this.apiBaseUrl}/get/${id}`,
      method: 'get'
    })
  }

  // 根据优惠券id + ststus查询优惠券详情信息
  getBasicByIdStatus(data) {
    return request({
      url: `${this.apiBaseUrl}/getById?id=${data.id}&status=${data.status}`,
      method: 'get'
    })
  }

  // 更新优惠券信息
  updateFormDataById(data) {
    let id = JSON.parse(data.get('coupon')).id
    return request({
      url: `${this.apiBaseUrl}/${id}`,
      method: 'post',
      data: data,
      headers: {
        'Content-Type': ' multipart/form-data'
      }
    })
  }

  // 新增优惠券信息
  addFormData(data) {
    return request({
      url: `${this.apiBaseUrl}/caseEntityAdd`,
      method: 'post',
      data: data,
      headers: {
        'Content-Type': ' multipart/form-data'
      }
    })
  }

  // 更新优惠券其他规则
  updateOtherRuleById(data) {
    return request({
      url: `${this.apiBaseUrl}/otherRule/${data.couponId}?isOpen=0&isPresent=${data.isPresent}&isReturn=0`,
      method: 'post',
      data: data
    })
  }

  // 更新优惠券状态
  updateStatusById(params) {
    return request({
      url: `${this.apiBaseUrl}/status?id=${params.id}&status=${params.status}`,
      method: 'post',
      data: params
    })
  }
}

export default new CouponApi()
