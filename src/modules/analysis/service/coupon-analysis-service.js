import BaseCRUDService from '@/modules/common/base-crud-service'
import couponAnalyApi from '../api/coupon-analysis-api'

class PlatAnalyService extends BaseCRUDService {
  constructor() {
    super(couponAnalyApi)
  }

  // 查询优惠券基本信息
  queryBasicInfo(couponId) {
    return new Promise((resolve, reject) => {
      couponAnalyApi
        .queryBasicInfo(couponId)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 查询领取记录
  queryDoleList(queryParams) {
    return new Promise((resolve, reject) => {
      couponAnalyApi
        .queryDoleList(queryParams)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 查询使用记录
  queryUseList(queryParams) {
    return new Promise((resolve, reject) => {
      couponAnalyApi
        .queryUseList(queryParams)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 领取分析
  queryDoleAnalysisData(queryParams) {
    return new Promise((resolve, reject) => {
      couponAnalyApi
        .queryDoleAnalysisData(queryParams)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 领取分析
  queryUseAnalysisData(queryParams) {
    return new Promise((resolve, reject) => {
      couponAnalyApi
        .queryUseAnalysisData(queryParams)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 领取记录导出
  exportDoleAnalysisData(queryParams) {
    return new Promise((resolve, reject) => {
      couponAnalyApi
        .exportDoleAnalysisData(queryParams)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 使用记录导出
  exportUseCouponRecord(queryParams) {
    return new Promise((resolve, reject) => {
      couponAnalyApi
        .exportUseCouponRecord(queryParams)
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

export default new PlatAnalyService()
