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
}

export default new ProductsService()
