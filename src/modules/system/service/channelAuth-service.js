import BaseCRUDService from '@/modules/common/base-crud-service'
import channelAuthApi from '../api/channelAuth-api'

class ChannelAuthService extends BaseCRUDService {
  constructor() {
    super(channelAuthApi)
  }

  addChannelAuthData(data) {
    return new Promise((resolve, reject) => {
      channelAuthApi
        .addChannelAuthData(data)
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

export default new ChannelAuthService()
