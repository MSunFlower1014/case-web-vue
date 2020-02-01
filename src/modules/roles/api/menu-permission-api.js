import request from '@/utils/request'
import BaseCRUDApi from '@/modules/common/base-crud-api'

const API_BASE_URL = '/api/sys/menuPermission'

class MenuPermisionApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }

  // 根据菜单获取所有菜单权限
  getPermissionsByMenuId(menuId) {
    return request({
      url: `${API_BASE_URL}/menu/${menuId}/permissions`,
      method: 'get'
    })
  }
}

export default new MenuPermisionApi()
