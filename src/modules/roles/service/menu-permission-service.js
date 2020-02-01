import BaseCRUDService from '@/modules/common/base-crud-service'
import menuPermissionApi from '../api/menu-permission-api'

class MenuPermissionService extends BaseCRUDService {
  constructor() {
    super(menuPermissionApi)
  }

  // 根据菜单获取所有菜单权限
  getPermissionsByMenuId(menuId) {
    return new Promise((resolve, reject) => {
      menuPermissionApi
        .getPermissionsByMenuId(menuId)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default new MenuPermissionService()
