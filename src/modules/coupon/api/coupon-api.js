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
  getBasicById(data) {
    return request({
      url: `${this.apiBaseUrl}/get/${data.id}`,
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

  // 获取转派列表
  queryUserList(data) {
    return request({
      url: `/api/platform/getUserList`,
      method: 'get'
    })
  }

  // 新增转派流程
  addReferralFromData(data) {
    return request({
      url: `/api/referral/referralEntityAdd`,
      method: 'post',
      data: data,
      headers: {
        'Content-Type': ' multipart/form-data'
      }
    })
  }

  // 登录
  loginByUser(data) {
    return request({
      url: `/api/platform/login`,
      method: 'post',
      data: data
    })
  }
}

export default new CouponApi()
