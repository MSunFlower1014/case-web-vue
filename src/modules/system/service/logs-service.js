import BaseCRUDService from '@/modules/common/base-crud-service'
import operLogApi from '../api/logs-api'

class OperLogService extends BaseCRUDService {
  constructor() {
    super(operLogApi)
  }
}

export default new OperLogService()
