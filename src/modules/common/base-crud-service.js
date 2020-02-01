/**
 * CRUD服务基类
 */
class BaseCRUDService {
  constructor(api) {
    this.api = api
  }

  // 分页查询数据
  queryPageData(queryParam) {
    // if (!queryParam.sort) {
    //   queryParam.sort = 'createDate'
    //   queryParam.order = 'desc'
    // }
    return new Promise((resolve, reject) => {
      this.api
        .queryPageData(queryParam)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 根据主键ID获取数据
  getDataById(id) {
    return new Promise((resolve, reject) => {
      this.api
        .getDataById(id)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 添加数据
  addData(data) {
    return new Promise((resolve, reject) => {
      this.api
        .addData(data)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 保存数据，添加或者更新
  storeData(data) {
    return new Promise((resolve, reject) => {
      this.api
        .storeData(data)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 根据主键更新数据
  updateDataById(data) {
    return new Promise((resolve, reject) => {
      this.api
        .updateDataById(data)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 根据主键ID删除数据
  deleteDataById(id) {
    return new Promise((resolve, reject) => {
      this.api
        .deleteDataById(id)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 批量创建实体
  batchInsert(id) {
    return new Promise((resolve, reject) => {
      this.api
        .batchInsert(id)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 批量删除实体
  batchDelete(id) {
    return new Promise((resolve, reject) => {
      this.api
        .batchDelete(id)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  queryTreeList(queryParam, nodeId) {
    return new Promise((resolve, reject) => {
      this.api
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

  queryTreePage(queryParam, nodeId) {
    return new Promise((resolve, reject) => {
      this.api
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
      this.api
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
}

export default BaseCRUDService
