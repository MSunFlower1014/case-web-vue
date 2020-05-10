import BaseCRUDApi from '@/modules/common/base-crud-api'
import request from '@/utils/request'
const API_BASE_URL = '/api/case'

class CouponApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }

  queryCouponDetailById(id) {
    return request({
      url: `${this.apiBaseUrl}/get/${id}`,
      method: 'get'
    })
  }

  getBasicById(data) {
    return request({
      url: `${this.apiBaseUrl}/get/${data.id}`,
      method: 'get'
    })
  }

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

  // 获取用户列表
  getUserList(data) {
    return request({
      url: `/api/platform/getUserList?name=` + data.name,
      method: 'post',
      data: data
    })
  }

  // 新增用户
  saveUser(data) {
    return request({
      url: `/api/platform/saveUser`,
      method: 'post',
      data: data,
      headers: {
        'Content-Type': ' multipart/form-data'
      }
    })
  }

  // 获取用户列表分页
  getUserListPage(data) {
    return request({
      url: `/api/platform/getUserListPage?name=` + data.name,
      method: 'post',
      data: data
    })
  }

   //
  getDepartList() {
    return request({
      url: `/api/depart/getAllDepart`,
      method: 'get'
    })
  }
}

export default new CouponApi()
