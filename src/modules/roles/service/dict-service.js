import BaseCRUDService from '@/modules/common/base-crud-service'
import dictApi from '../api/dict-api'
import store from '@/store'

class DictService extends BaseCRUDService {
  constructor() {
    super(dictApi)
  }
  // 根据编码查询字典数据
  queryDictByCode(code) {
    return new Promise((resolve, reject) => {
      dictApi
        .queryDictByCode(code)
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 以Key-Value形式返回所有字典数据
  getAllDictMap() {
    return new Promise((resolve, reject) => {
      dictApi
        .getAllDictMap()
        .then(response => {
          const data = response.data
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // ↓↓↓↓↓ 从store缓存中获取字段数据 ↓↓↓↓↓
  /**
   * 以Map形式返回静态参数数据
   * Key: 字典数据的值 - value
   * Value： 字典数据
   */
  getDictMap(dataType) {
    let dictMap = store.getters.dictMap || {}
    return dictMap[dataType] || {}
  }

  /**
   * 以数组方式返回字典数据
   * @param {*} dataType
   */
  getDictArray(dataType) {
    let dictMap = this.getDictMap(dataType)
    let dataTypes = []
    for (const key in dictMap) {
      dataTypes.push(dictMap[key])
    }
    return dataTypes
  }

  /**
   * 根据类型和key返回底字典数据
   * @param {*} dataType
   * @param {*} dataValue
   */
  getDictObject(dataType, dataValue) {
    return this.getDictMap(dataType)[dataValue] || {}
  }

  /**
   * 清除store中的字典数据
   */
  clearDictMap() {
    store.commit('system/dict/CLEAR_DICT_MAP')
  }
  // ↑↑↑↑↑ 从store缓存中获取字段数据 ↑↑↑↑↑
}

export default new DictService()
