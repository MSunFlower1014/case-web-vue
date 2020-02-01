import BaseCRUDApi from '@/modules/common/base-crud-api'
import request from '@/utils/request'
const API_BASE_URL = '/api/platform/areaDictionary'

class AreaApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }

  // 查询全部地市信息
  queryAllArea() {
    let url = `${this.apiBaseUrl}/listAll`
    return request({
      url: url,
      method: 'get'
    })
  }
}

export default new AreaApi()
