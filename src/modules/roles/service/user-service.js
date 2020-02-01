import BaseCRUDService from '@/modules/common/base-crud-service'
import userApi from '../api/user-api'

class UserService extends BaseCRUDService {
  constructor() {
    super(userApi)
  }
  // 根据id查询是公司下的用户detail
  getUserDetailById(id) {
    return new Promise((resolve, reject) => {
      userApi
        .getUserDetailById(id)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 查询渠道商用户
  getShopUsers(data) {
    return new Promise((resolve, reject) => {
      userApi
        .getShopUsers(data)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  getShopUserDetail(id) {
    return new Promise((resolve, reject) => {
      userApi
        .getShopUserDetail(id)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  addUserInfo(data) {
    return new Promise((resolve, reject) => {
      userApi
        .addUserInfo(data)
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

export default new UserService()
