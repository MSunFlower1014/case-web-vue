import BaseCRUDService from '@/modules/common/base-crud-service'
import rolePermissionApi from '../api/role-permission-api'
import menuPermissionService from './menu-permission-service'
import roleService from './role-service'

class RolePermissionService extends BaseCRUDService {
  constructor() {
    super(rolePermissionApi)
  }

  // 获取菜单权限和角色权限并组装成穿梭框数据
  getRolePermissionTransferData(menuId, roleId) {
    const result = {
      data: [],
      selected: [],
      menuPermIdTorolePermId: {}
    }
    return new Promise((resolve, reject) => {
      menuPermissionService.getPermissionsByMenuId(menuId).then(rspData => {
        const menuPermData = rspData.data
        roleService.getRolePermissions(roleId, menuId)
          .then(rspData => {
            const rolePermData = rspData.data
            menuPermData.map(menuPerm => {
              // 添加到穿梭框的data数据
              result.data.push({
                key: menuPerm.id,
                label: `${menuPerm.name}(${menuPerm.permission})`
              })
              for (const rolePerm of rolePermData) {
                if (rolePerm.menuPermissionId === menuPerm.id) {
                  result.selected.push(menuPerm.id)
                  result.menuPermIdTorolePermId[menuPerm.id] = rolePerm.id
                  break
                }
              }
            })
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    })
  }
}

export default new RolePermissionService()
