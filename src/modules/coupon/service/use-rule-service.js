import BaseCRUDService from '@/modules/common/base-crud-service'
import useRuleApi from '../api/use-rule-api'

class UseRuleService extends BaseCRUDService {
  constructor() {
    super(useRuleApi)
  }

  // 根据id查询使用规则
  getUseByIdStatus(data) {
    return new Promise((resolve, reject) => {
      useRuleApi
        .getUseByIdStatus(data)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 根据id新增/编辑使用规则
  storeUseRuleById(data) {
    return new Promise((resolve, reject) => {
      useRuleApi
        .storeUseRuleById(data)
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

export default new UseRuleService()
