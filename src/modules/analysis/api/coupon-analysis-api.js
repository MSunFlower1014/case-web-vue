import BaseCRUDApi from '@/modules/common/base-crud-api'
import request from '@/utils/request'
const API_BASE_URL = '/api/platform/countAnalysis'

class CouponAnalyApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }

  // 查询优惠券基本信息
  queryBasicInfo(couponId) {
    let url = `${this.apiBaseUrl}/Info?couponId=${couponId}`
    return request({
      url: url,
      method: 'post',
      data: couponId
    })
  }

  // 查询领取记录
  queryDoleList(queryParams) {
    let url = `${this.apiBaseUrl}/dole`
    return request({
      url: url,
      method: 'post',
      data: queryParams
    })
  }

  // 查询使用记录
  queryUseList(queryParams) {
    let url = `${this.apiBaseUrl}/use`
    return request({
      url: url,
      method: 'post',
      data: queryParams
    })
  }

  // 领取分析
  queryDoleAnalysisData(queryParams) {
    let url = `${this.apiBaseUrl}/doleAnalysisData`
    return request({
      url: url,
      method: 'post',
      data: queryParams
    })
  }

  // 使用分析
  queryUseAnalysisData(queryParams) {
    let url = `${this.apiBaseUrl}/useAnalysisData`
    return request({
      url: url,
      method: 'post',
      data: queryParams
    })
  }

  // 领取记录导出
  exportDoleAnalysisData(queryParams) {
    let url = `${this.apiBaseUrl}/exportDoleAnalysisData`
    return request({
      url: url,
      method: 'post',
      data: queryParams,
      responseType: 'blob'
    })
  }

  // 使用记录导出
  exportUseCouponRecord(queryParams) {
    let url = `${this.apiBaseUrl}/exportUseCouponRecord`
    return request({
      url: url,
      method: 'post',
      data: queryParams,
      responseType: 'blob'
    })
  }
}

export default new CouponAnalyApi()
