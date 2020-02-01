import BaseCRUDService from '@/modules/common/base-crud-service'
import cacheLogApi from '../api/cache-log-api'

class CacheLogService extends BaseCRUDService {
  constructor() {
    super(cacheLogApi)
  }
}

export default new CacheLogService()
