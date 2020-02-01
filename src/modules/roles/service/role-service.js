import BaseCRUDService from '@/modules/common/base-crud-service'
import roleApi from '../api/role-api'

class RoleService extends BaseCRUDService {
  constructor() {
    super(roleApi)
  }

  // 获取角色菜单
  getAuthMenu(roleId) {
    return new Promise((resolve, reject) => {
      roleApi
        .getAuthMenu(roleId)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 获取所有角色
  getAllRoles() {
    return new Promise((resolve, reject) => {
      roleApi
        .getAllRoles()
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 获取指定用户拥有的角色列表
  getRolesByUserId(roleId) {
    return new Promise((resolve, reject) => {
      roleApi
        .getRolesByUserId(roleId)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 查询指定角色对指定菜单拥有的权限列表
  getRolePermissions(roleId, menuId) {
    return new Promise((resolve, reject) => {
      roleApi
        .getRolePermissions(roleId, menuId)
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

export default new RoleService()
