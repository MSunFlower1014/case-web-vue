import BaseCRUDService from '@/modules/common/base-crud-service'
import platAnalyApi from '../api/plat-analysis-api'

class PlatAnalyService extends BaseCRUDService {
  constructor() {
    super(platAnalyApi)
  }

  // 查询领取或者使用top10
  queryTopList(type) {
    return new Promise((resolve, reject) => {
      platAnalyApi
        .queryTopList(type)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 优惠券数量统计：制作数，发放数，领取数，使用数
  queryCouponCount() {
    return new Promise((resolve, reject) => {
      platAnalyApi
        .queryCouponCount()
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 平台百分比
  queryCouponPercent(params) {
    return new Promise((resolve, reject) => {
      platAnalyApi
        .queryCouponPercent(params)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 查询图表数据
  queryGraphList(countCycle) {
    return new Promise((resolve, reject) => {
      platAnalyApi
        .queryGraphList(countCycle)
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
