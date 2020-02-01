import BaseCRUDService from '@/modules/common/base-crud-service'
import accountApi from '../api/account-api'

class AccountService extends BaseCRUDService {
  constructor() {
    super(accountApi)
  }
}

export default new AccountService()
