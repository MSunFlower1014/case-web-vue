import BaseCRUDService from '@/modules/common/base-crud-service'
import staticApi from '../api/static-api'

class StaticService extends BaseCRUDService {
  constructor() {
    super(staticApi)
  }

  // 根据类型查询静态参数
  getStaticByType(type) {
    return new Promise((resolve, reject) => {
      staticApi
        .getStaticByType(type)
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

export default new StaticService()
