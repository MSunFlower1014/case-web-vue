import BaseCRUDService from '@/modules/common/base-crud-service'
import sendRuleApi from '../api/send-rule-api'

class SendRuleService extends BaseCRUDService {
  constructor() {
    super(sendRuleApi)
  }

  // 根据id查询批量发放规则
  querySendRuleById(id) {
    return new Promise((resolve, reject) => {
      sendRuleApi
        .querySendRuleById(id)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 查询批量发放记录
  queryBatchRecord(queryParams) {
    return new Promise((resolve, reject) => {
      sendRuleApi
        .queryBatchRecord(queryParams)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // id
  refreshCacheById(id) {
    return new Promise((resolve, reject) => {
      sendRuleApi
        .refreshCacheById(id)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 开始批量发放（更改状态）
  changeBatchStatus(data) {
    return new Promise((resolve, reject) => {
      sendRuleApi
        .changeBatchStatus(data)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 保存批量发放规则
  saveBatchRules(data) {
    return new Promise((resolve, reject) => {
      sendRuleApi
        .saveBatchRules(data)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 查询个人发放记录
  querySingleRecord(queryParams) {
    return new Promise((resolve, reject) => {
      sendRuleApi
        .querySingleRecord(queryParams)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 开始个人发放（更改状态）
  changeSingleStatus(code) {
    return new Promise((resolve, reject) => {
      sendRuleApi
        .changeSingleStatus(code)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 添加个人发放
  addSingleSend(data) {
    return new Promise((resolve, reject) => {
      sendRuleApi
        .addSingleSend(data)
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

export default new SendRuleService()
