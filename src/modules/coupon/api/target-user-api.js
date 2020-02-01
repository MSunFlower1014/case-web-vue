import BaseCRUDApi from '@/modules/common/base-crud-api'
import request from '@/utils/request'
const API_BASE_URL = '/api/platform/targetUser'

class TargetUserApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }

  // 查看下载文件
  viewFile(fileName) {
    let url = `${this.apiBaseUrl}/viewFile?fileName=${fileName}`
    return request({
      url: url,
      method: 'get'
    })
  }
}

export default new TargetUserApi()
