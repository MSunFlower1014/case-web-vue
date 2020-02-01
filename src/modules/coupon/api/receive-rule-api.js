import BaseCRUDApi from '@/modules/common/base-crud-api'
import request from '@/utils/request'
const API_BASE_URL = '/api/platform/receiveRule'

class ReceiveRuleApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }

  // 根据id查询领取规则
  getReceiveByIdStatus(data) {
    let url = `${this.apiBaseUrl}/coupon?couponId=${data.couponId}&status=${data.status}`
    return request({
      url: url,
      method: 'get'
    })
  }

  // 新增领取规则
  addReceiveRule(data) {
    let url = `${this.apiBaseUrl}/add`
    return request({
      url: url,
      method: 'post',
      data: data
    })
  }

  // 根据couponId更新数据
  updateRuleByCouponId(data) {
    return request({
      url: `${this.apiBaseUrl}/update`,
      method: 'post',
      data: data
    })
  }
}

export default new ReceiveRuleApi()
