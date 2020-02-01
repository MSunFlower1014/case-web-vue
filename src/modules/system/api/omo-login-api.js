import BaseCRUDApi from '@/modules/common/base-crud-api'
import request from '@/utils/request'
const API_BASE_URL = '/api/omoLogin'

class OMOLoginApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }

  omoLogin(loginParam) {
    return request({
      url: API_BASE_URL,
      method: 'post',
      data: loginParam
    })
  }
}
export default new OMOLoginApi()
