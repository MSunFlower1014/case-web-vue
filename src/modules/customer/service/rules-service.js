import BaseCRUDService from '@/modules/common/base-crud-service'
import rulesApi from '../api/rules-api'

class RuleService extends BaseCRUDService {
  constructor() {
    super(rulesApi)
  }

  // 下载
  downloadFile(fileName) {
    return new Promise((resolve, reject) => {
      rulesApi
        .downloadFile(fileName)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  // 更新实体
  updateRuleData(data, ruleId, ruleName, targetType) {
    return new Promise((resolve, reject) => {
      rulesApi
        .updateRuleData(data, ruleId, ruleName, targetType)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 创建实体
  createRuleData(data, ruleName, targetType) {
    return new Promise((resolve, reject) => {
      rulesApi
        .createRuleData(data, ruleName, targetType)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 更新缓存数据
  updateRuleCache(params) {
    return new Promise((resolve, reject) => {
      rulesApi
        .updateRuleCache(params)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  // 更新状态数据
  updateRuleStatus(params) {
    return new Promise((resolve, reject) => {
      rulesApi
        .updateRuleStatus(params)
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

export default new RuleService()
