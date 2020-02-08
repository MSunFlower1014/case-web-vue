import BaseCRUDService from '@/modules/common/base-crud-service'
import productsApi from '../api/products-api'

class ProductsService extends BaseCRUDService {
  constructor() {
    super(productsApi)
  }
  getGoodsCoupon(param) {
    return new Promise((resolve, reject) => {
      productsApi
        .getGoodsCoupon(param)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 操作转档单 接受or拒绝
  checkReferral(param) {
    return new Promise((resolve, reject) => {
      productsApi
        .checkReferral(param)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 获取转档单数据
  getReferralInfo(param) {
    return new Promise((resolve, reject) => {
      productsApi
        .getReferralInfo(param)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 根据档案id结档
  changeCaseStatus(param) {
    return new Promise((resolve, reject) => {
      productsApi
        .changeCaseStatus(param)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 获取转档结果通知数据
  getNoticePage(param) {
    return new Promise((resolve, reject) => {
      productsApi.getNoticePage(param).then(response => {
        const data = response.data
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }

  // 获取转档结果通知数据
  getNoticePageByCaseId(param, id) {
    return new Promise((resolve, reject) => {
      productsApi.getNoticePageByCaseId(param, id).then(response => {
        const data = response.data
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default new ProductsService()
