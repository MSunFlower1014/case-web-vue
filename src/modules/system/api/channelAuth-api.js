import BaseCRUDApi from '@/modules/common/base-crud-api'
import request from '@/utils/request'
const API_BASE_URL = '/api/platform/channelAuth'

class ChannelAuthApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }

  addChannelAuthData(data) {
    return request({
      url: `${API_BASE_URL}/saveChannelAuth`,
      method: 'post',
      data: data
    })
  }
}

export default new ChannelAuthApi()
