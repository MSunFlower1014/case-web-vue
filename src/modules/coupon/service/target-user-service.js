import BaseCRUDService from '@/modules/common/base-crud-service'
import targetUserApi from '../api/target-user-api'

class TargetUserService extends BaseCRUDService {
  constructor() {
    super(targetUserApi)
  }

  // 查看下载文件
  viewFile(fileName) {
    return new Promise((resolve, reject) => {
      targetUserApi
        .viewFile(fileName)
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

export default new TargetUserService()
