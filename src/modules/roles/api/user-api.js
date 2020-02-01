import BaseCRUDApi from '@/modules/common/base-crud-api'
import request from '@/utils/request'

const API_BASE_URL = '/api/sys/user'

class UserApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }
  // 根据id查询是公司下的用户detail
  getUserDetailById(id) {
    return request({
      url: `${API_BASE_URL}/${id}/detail`,
      method: 'get'
    })
  }
  // 查询渠道商用户
  getShopUsers(data) {
    return request({
      url: `${API_BASE_URL}/shopUser`,
      method: 'post',
      data: data
    })
  }
  // 查询渠道商用户详情
  getShopUserDetail(id) {
    return request({
      url: `${API_BASE_URL}/${id}/shopUser`,
      method: 'get'
    })
  }
  addUserInfo(data) {
    return request({
      url: `${API_BASE_URL}/addUser`,
      method: 'post',
      data: data
    })
  }
}

export default new UserApi()
