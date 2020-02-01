import request from '@/utils/request'
import BaseCRUDApi from '@/modules/common/base-crud-api'

const API_BASE_URL = '/api/sys/dict'

class DictApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }

  // 根据代码查询字典列表
  queryDictByCode(code) {
    return request({
      url: `${API_BASE_URL}/code/${code}/list`,
      method: 'get'
    })
  }

  // 以Key-Value形式返回所有字典数据
  getAllDictMap(code) {
    return request({
      url: `${API_BASE_URL}/all/map`,
      method: 'get'
    })
  }
}

export default new DictApi()
