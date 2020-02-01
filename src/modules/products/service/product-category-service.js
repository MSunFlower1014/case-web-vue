import BaseCRUDService from '@/modules/common/base-crud-service'
import productCategoryApi from '../api/product-category-api'

class ProductCategoryService extends BaseCRUDService {
  constructor() {
    super(productCategoryApi)
  }

  getGoodsCategoryCoupon(param) {
    return new Promise((resolve, reject) => {
      productCategoryApi
        .getGoodsCategoryCoupon(param)
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

export default new ProductCategoryService()
