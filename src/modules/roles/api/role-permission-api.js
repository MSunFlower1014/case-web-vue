import BaseCRUDApi from '@/modules/common/base-crud-api'

const API_BASE_URL = '/api/sys/rolePermission'

class RolePermissionApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }
}

export default new RolePermissionApi()
