import BaseCRUDService from '@/modules/common/base-crud-service'
import menuApi from '../api/menu-api'

class MenuService extends BaseCRUDService {
  constructor() {
    super(menuApi)
  }
  queryTreeList(queryParam, nodeId, async) {
    return new Promise((resolve, reject) => {
      menuApi
        .queryTreeList(queryParam, nodeId, true)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  queryTreePage(queryParam, nodeId, async) {
    return new Promise((resolve, reject) => {
      menuApi
        .queryTreePage(queryParam, nodeId, true)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  bootstrapNavTreeData(queryParam, nodeId, async, sort) {
    return new Promise((resolve, reject) => {
      menuApi
        .bootstrapNavTreeData(queryParam, nodeId, async, sort)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 获取当前用户拥有的菜单树
  getUserMenus() {
    return new Promise((resolve, reject) => {
      menuApi
        .getUserMenus()
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

export default new MenuService()
