import request from '@/utils/request'
import BaseCRUDApi from '@/modules/common/base-crud-api'

const API_BASE_URL = '/api/sys/role'

class RoleApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }

  // 获取角色菜单
  getAuthMenu(roleId) {
    let url = `${API_BASE_URL}/authMenu`
    if (roleId) {
      url += `?roleId=${roleId}`
    }
    return request({
      url: url,
      method: 'get'
    })
  }

  // 获取所有角色
  getAllRoles() {
    return request({
      url: `${API_BASE_URL}/list/all`,
      method: 'get'
    })
  }

  // 获取指定用户拥有的角色列表
  getRolesByUserId(userId) {
    return request({
      url: `${API_BASE_URL}/user/${userId}`,
      method: 'get'
    })
  }

  // 查询指定角色对指定菜单拥有的权限列表
  getRolePermissions(roleId, menuId) {
    return request({
      url: `${API_BASE_URL}/rolePermissions/${roleId}/${menuId}`,
      method: 'get'
    })
  }
}

export default new RoleApi()
