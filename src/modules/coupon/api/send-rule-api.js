import BaseCRUDApi from '@/modules/common/base-crud-api'
import request from '@/utils/request'
const API_BASE_URL = '/api/platform/couponSendRule'

class SendRuleApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }

  // 根据id查询批量发放规则
  querySendRuleById(id) {
    let url = `${this.apiBaseUrl}/sendRule?couponId=${id}`
    return request({
      url: url,
      method: 'get'
    })
  }

  // 查询批量发放记录
  queryBatchRecord(queryParams) {
    let url = `${this.apiBaseUrl}/batchRecord`
    return request({
      url: url,
      method: 'post',
      data: queryParams
    })
  }

  // 根据id刷新缓存
  refreshCacheById(id) {
    let url = `${this.apiBaseUrl}/cache?id=${id}`
    return request({
      url: url,
      method: 'post',
      data: id
    })
  }

  // 开始批量发放（更改状态）
  changeBatchStatus(data) {
    let url = `${this.apiBaseUrl}/batchStatus`
    return request({
      url: url,
      method: 'post',
      data: data
    })
  }

  // 保存批量发放规则
  saveBatchRules(data) {
    let url = `${this.apiBaseUrl}/save`
    return request({
      url: url,
      method: 'post',
      data: data
    })
  }

  // 查询个人发放记录
  querySingleRecord(queryParams) {
    let url = `${this.apiBaseUrl}/singleRecord`
    return request({
      url: url,
      method: 'post',
      data: queryParams
    })
  }

  // 开始个人发放（更改状态）
  changeSingleStatus(code) {
    let url = `${this.apiBaseUrl}/singleStatus?couponCode=${code}`
    return request({
      url: url,
      method: 'post',
      data: code
    })
  }

  // 添加个人发放
  addSingleSend(data) {
    let url = `${this.apiBaseUrl}/singleSend?couponId=${data.couponId}&oddNum=${data.oddNum}`
    return request({
      url: url,
      method: 'post',
      data: data.tels
    })
  }
}

export default new SendRuleApi()
