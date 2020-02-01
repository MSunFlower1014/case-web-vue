import BaseCRUDService from '@/modules/common/base-crud-service'
import areaApi from '../api/area-api'

class AreaService extends BaseCRUDService {
  constructor() {
    super(areaApi)
  }

  // 查询全部地市信息
  queryAllArea() {
    return new Promise((resolve, reject) => {
      areaApi
        .queryAllArea()
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

export default new AreaService()
