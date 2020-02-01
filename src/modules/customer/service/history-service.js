import BaseCRUDService from '@/modules/common/base-crud-service'
import historyApi from '../api/history-api'

class HistoryService extends BaseCRUDService {
  constructor() {
    super(historyApi)
  }

  // 获取用户优惠券领取记录
  getUserReceivedCoupons(params) {
    return new Promise((resolve, reject) => {
      historyApi
        .getUserReceivedCoupons(params)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  // 获取某个用户号码优惠券列表
  getUserCouponDetailList(params) {
    return new Promise((resolve, reject) => {
      historyApi
        .getUserCouponDetailList(params)
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

export default new HistoryService()
