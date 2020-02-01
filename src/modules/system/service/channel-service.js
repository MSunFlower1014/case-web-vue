import BaseCRUDService from '@/modules/common/base-crud-service'
import channelApi from '../api/channel-api'

class ChannelService extends BaseCRUDService {
  constructor() {
    super(channelApi)
  }
  getLoginChannel() {
    return new Promise((resolve, reject) => {
      channelApi
        .getLoginChannel()
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  getAllChannel() {
    return new Promise((resolve, reject) => {
      channelApi
        .getAllChannel()
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  getChannelByCode(channelCode) {
    return new Promise((resolve, reject) => {
      channelApi
        .getChannelByCode(channelCode)
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

export default new ChannelService()
