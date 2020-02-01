import BaseCRUDApi from '@/modules/common/base-crud-api'
import request from '@/utils/request'

const API_BASE_URL = '/api/platform/sStatic'

class StaticApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }

  // 根据类型查询静态参数
  getStaticByType(type) {
    return request({
      url: `${API_BASE_URL}/type/${type}`,
      method: 'get',
      data: type
    })
  }
}

export default new StaticApi()
