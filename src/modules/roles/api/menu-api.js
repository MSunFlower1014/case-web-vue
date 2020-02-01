import request from '@/utils/request'
import BaseCRUDApi from '@/modules/common/base-crud-api'

const API_BASE_URL = '/api/menu'
// const API_BASE_URL = '/api/menu'

class MenuApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }

  // 根据条件查询列表树
  queryTreeList(queryParam, nodeId = '', async = true) {
    return request({
      url: `${API_BASE_URL}` + `/treeList?nodeId=${nodeId}&async=${async}`,
      method: 'post',
      data: queryParam
    })
  }

  // 根据页码、每页记录数和条件，查询分页树
  queryTreePage(queryParam, nodeId = '', async = true) {
    return request({
      url: `${API_BASE_URL}/treePage?nodeId=${nodeId}&async=${async}`,
      method: 'post',
      data: queryParam
    })
  }

  // 查询BootstrapNavTreeData
  bootstrapNavTreeData(queryParam, nodeId = '', async = false, sort = '') {
    return request({
      url: `${API_BASE_URL}/bootstrapNavTreeData?nodeId=${nodeId}&async=${async}&sort=${sort}`,
      method: 'post',
      data: queryParam
    })
  }

  // 获取当前用户拥有的菜单
  getUserMenus() {
    return request({
      url: `${API_BASE_URL}/getMenus`,
      method: 'get'
    })
  }
}

export default new MenuApi()
