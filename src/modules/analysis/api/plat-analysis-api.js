import BaseCRUDApi from '@/modules/common/base-crud-api'
import request from '@/utils/request'
const API_BASE_URL = '/api/platform/pCountAnalysis'

class PlatAnalyApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }

  // 查询领取或者使用top10
  queryTopList(type) {
    let url = `${this.apiBaseUrl}/topList?type=${type}`
    return request({
      url: url,
      method: 'post',
      data: type
    })
  }

  // 优惠券数量统计：制作数，发放数，领取数，使用数
  queryCouponCount() {
    let url = `${this.apiBaseUrl}/couponCount`
    return request({
      url: url,
      method: 'post'
    })
  }

  // 平台百分比
  queryCouponPercent(params) {
    let url = `${this.apiBaseUrl}/couponPercent?type=${params.type}&countCycle=${params.countCycle}`
    return request({
      url: url,
      method: 'post',
      data: params
    })
  }

  // 图表数据
  queryGraphList(countCycle) {
    let url = `${this.apiBaseUrl}/graphList?countCycle=${countCycle}`
    return request({
      url: url,
      method: 'post',
      data: countCycle
    })
  }
}

export default new PlatAnalyApi()
