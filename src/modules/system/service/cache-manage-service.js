import BaseCRUDService from '@/modules/common/base-crud-service'
import cacheManageApi from '../api/cache-manage-api'

class CacheManageService extends BaseCRUDService {
  constructor() {
    super(cacheManageApi)
  }
}

export default new CacheManageService()
