import BaseCRUDApi from '@/modules/common/base-crud-api'

const API_BASE_URL = '/api/sys/user'

class AccountApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }
}

export default new AccountApi()
