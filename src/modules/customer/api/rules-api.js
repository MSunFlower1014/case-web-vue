import BaseCRUDApi from '@/modules/common/base-crud-api'
import request from '@/utils/request'

const API_BASE_URL = '/api/platform/targetUser'

class RuleApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }
  // 下载
  downloadFile(fileName) {
    return request({
      url: `${this.apiBaseUrl}/viewFile?fileName=${fileName}`,
      method: 'get',
      responseType: 'blob'
    })
  }

  // 更新数据
  updateRuleData(data, ruleId, ruleName, targetType) {
    return request({
      url: `${
        this.apiBaseUrl
      }/add?ruleId=${ruleId}&ruleName=${ruleName}&targetType=${targetType}`,
      method: 'post',
      headers: {
        'Content-Type': ' multipart/form-data'
      },
      data: data
    })
  }
  // 新增数据
  createRuleData(data, ruleName, targetType) {
    return request({
      url: `${
        this.apiBaseUrl
      }/add?ruleName=${ruleName}&targetType=${targetType}`,
      method: 'post',
      headers: {
        'Content-Type': ' multipart/form-data'
      },
      data: data
    })
  }
  // 刷新缓存数据
  updateRuleCache(data) {
    return request({
      url: `${API_BASE_URL}/cache/${data.id}`,
      method: 'post'
    })
  }
  // 更新上线线状态
  updateRuleStatus(data) {
    return request({
      url: `${API_BASE_URL}/status/${data.id}?status=${data.status}`,
      method: 'post'
    })
  }
}

export default new RuleApi()
