import BaseCRUDService from '@/modules/common/base-crud-service'
import orgApi from '../api/org-api'

class OrgService extends BaseCRUDService {
  constructor() {
    super(orgApi)
  }
}

export default new OrgService()
