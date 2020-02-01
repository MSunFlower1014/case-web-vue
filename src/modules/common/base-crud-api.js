import request from '@/utils/request'

/**
 * Base CRUD Api
 */
class BaseCRUDApi {
  constructor(apiBaseUrl) {
    this.apiBaseUrl = apiBaseUrl
  }
  // 根据ID获取数据
  getDataById(id) {
    return request({
      url: `${this.apiBaseUrl}/${id}`,
      method: 'get'
    })
  }

  // 根据条件查询分页数据
  queryPageData(queryParam) {
    let url = `${this.apiBaseUrl}/list`
    if (queryParam.queryString) {
      url += queryParam.queryString
      delete queryParam.queryString
    }
    return request({
      url: url,
      method: 'post',
      data: queryParam
    })
  }

  // 添加数据
  addData(data) {
    return request({
      url: this.apiBaseUrl,
      method: 'post',
      data: data
    })
  }

  // 根据ID更新数据
  updateDataById(data) {
    return request({
      url: `${this.apiBaseUrl}/${data.id}`,
      method: 'post',
      data: data
    })
  }

  // 根据ID删除数据
  deleteDataById(id) {
    return request({
      url: `${this.apiBaseUrl}/${id}/deletion`,
      method: 'post'
    })
  }

  // 保存数据，添加或者更新
  storeData(data) {
    return request({
      url: `${this.apiBaseUrl}/store`,
      method: 'post',
      data: data
    })
  }

  // 批量创建实体
  batchInsert(objArray) {
    return request({
      url: `${this.apiBaseUrl}/batch`,
      method: 'post',
      data: objArray
    })
  }

  // 批量删除实体
  batchDelete(idArray) {
    return request({
      url: `${this.apiBaseUrl}/batch/deletion`,
      method: 'post',
      data: idArray
    })
  }

  // 树表通用API
  // 根据条件查询列表树
  queryTreeList(queryParam, nodeId = '', async = true) {
    return request({
      url: `${this.apiBaseUrl}/treeList?nodeId=${nodeId}&async=${async}`,
      method: 'post',
      data: queryParam
    })
  }

  // 根据页码、每页记录数和条件，查询分页树
  queryTreePage(queryParam, nodeId = '', async = true) {
    return request({
      url: `${this.apiBaseUrl}/treePage?nodeId=${nodeId}&async=${async}`,
      method: 'post',
      data: queryParam
    })
  }

  // 查询BootstrapNavTreeData
  bootstrapNavTreeData(queryParam, nodeId = '', async = false, sort = '') {
    return request({
      url: `${this.apiBaseUrl}/bootstrapNavTreeData?nodeId=${nodeId}&async=${async}&sort=${sort}`,
      method: 'post',
      data: queryParam
    })
  }
}
export default BaseCRUDApi
