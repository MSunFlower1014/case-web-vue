import BaseCRUDService from '@/modules/common/base-crud-service'
import productBrandApi from '../api/product-brand-api'

class ProductBrandService extends BaseCRUDService {
  constructor() {
    super(productBrandApi)
  }

  getGoodsBrandCoupon(param) {
    return new Promise((resolve, reject) => {
      productBrandApi
        .getGoodsBrandCoupon(param)
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

export default new ProductBrandService()
