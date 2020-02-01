import BaseCRUDApi from '@/modules/common/base-crud-api'
import request from '@/utils/request'
const API_BASE_URL = '/api/case'

class CouponCategoryApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }

  // 查询全部优惠券分类信息
  queryAllCategory() {
    let url = `${this.apiBaseUrl}/listCategory`
    return request({
      url: url,
      method: 'get'
    })
  }
  // 改变优惠券类型状态
  changeCategoryStatus(data) {
    let url = `${this.apiBaseUrl}/status?id=${data.id}&status=${data.status}`
    return request({
      url: url,
      method: 'post'
    })
  }
  // 更新优惠券类型数据
  updateCouponInfo(data) {
    let url = `${this.apiBaseUrl}/${data.id}`
    return request({
      url: url,
      method: 'post',
      data: data
    })
  }
}

export default new CouponCategoryApi()
