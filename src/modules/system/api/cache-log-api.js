import BaseCRUDApi from '@/modules/common/base-crud-api'

const API_BASE_URL = '/api/platform/cacheLog'

class CacheLogApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }
}

export default new CacheLogApi()
