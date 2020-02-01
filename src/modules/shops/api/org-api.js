import BaseCRUDApi from '@/modules/common/base-crud-api'

const API_BASE_URL = '/api/platform/organization'

class OrgApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }
}

export default new OrgApi()
