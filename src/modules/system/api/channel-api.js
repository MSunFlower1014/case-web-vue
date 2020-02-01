import BaseCRUDApi from '@/modules/common/base-crud-api'
import request from '@/utils/request'

const API_BASE_URL = '/api/platform/channelInfo'

class ChannelApi extends BaseCRUDApi {
  constructor() {
    super(API_BASE_URL)
  }

  getLoginChannel() {
    return request({
      url: `${API_BASE_URL}/query`,
      method: 'post'
    })
  }

  getAllChannel() {
    return request({
      url: `${API_BASE_URL}/allChannelList`,
      method: 'post'
    })
  }
  getChannelByCode(channelCode) {
    return request({
      url: `${API_BASE_URL}/getChannelByCode`,
      method: 'post',
      data: channelCode
    })
  }
}

export default new ChannelApi()
