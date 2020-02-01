import SessionStorage from '@/utils/sessionStorage'
import * as constants from '@/constants'

class SessionStorageService {
  constructor() {
    this.sessionStorage = new SessionStorage()
  }

  /**
   * 以Map形式返回静态参数数据
   * Key: 字典数据的值 - value
   * Value： 字典数据
   */
  getDictMap(dataType) {
    let dictStorage =
      this.sessionStorage.get(constants.STORAGE_KEY_SYSTEM_DICT_MAP) || {}
    return dictStorage[dataType] || {}
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
}
export default new SessionStorageService()
