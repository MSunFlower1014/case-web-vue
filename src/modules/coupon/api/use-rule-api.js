import BaseCRUDApi from '@/modules/common/base-crud-api'
import request from '@/utils/request'
const API_BASE_URL = '/api/platform/couponRuleRef'

class UseRuleApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }

  // 根据id + status查询使用规则
  getUseByIdStatus(data) {
    let url = `${this.apiBaseUrl}/list?couponId=${data.couponId}&status=${data.status}`
    return request({
      url: url,
      method: 'get'
    })
  }

  // 根据id新增/编辑使用规则
  storeUseRuleById(data) {
    let url = `${this.apiBaseUrl}`
    return request({
      url: url,
      method: 'post',
      data: data,
      headers: {
        'Content-Type': ' multipart/form-data'
      }
    })
  }
}

export default new UseRuleApi()
