import BaseCRUDService from '@/modules/common/base-crud-service'
import receiveRuleApi from '../api/receive-rule-api'

class ReceiveRuleService extends BaseCRUDService {
  constructor() {
    super(receiveRuleApi)
  }

  // 根据id + status查询领取规则
  getReceiveByIdStatus(data) {
    return new Promise((resolve, reject) => {
      receiveRuleApi
        .getReceiveByIdStatus(data)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 新增领取规则
  addReceiveRule(data) {
    return new Promise((resolve, reject) => {
      receiveRuleApi
        .addReceiveRule(data)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 根据couponId更新数据
  updateRuleByCouponId(data) {
    return new Promise((resolve, reject) => {
      this.api
        .updateRuleByCouponId(data)
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

export default new ReceiveRuleService()
