import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { tripleDESEncrypt, rsaEncrypt, getRandom } from '@/utils/security'

const axiosService = createAxios()
let pending = []
// 封装axios的request方法
export default config => {
  return axiosService.request(config)
}

/**
 * 创建axios实例对象
 */
function createAxios() {
  let axiosService = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 30000,
    withCredentials: true // 通过这个设定可以让发送跨域请求是携带cookies等凭证信息，但是，但是，这时要求服务的Access-Control-Allow-Origin不能为*，必须是具体的domain
  })
  // 配置请求拦截器
  axiosService.interceptors.request.use(...configRequestInterceptor())
  // 配置响应拦截器
  axiosService.interceptors.response.use(...configResponseInterceptor())

  /**
   * 请求拦截器
   */
  function configRequestInterceptor() {
    return [
      config => {
        // 设定公共请求头
        configCommonHeaders(config)
        // 配置防重复提交
        configPreventRepeatRequest(config)
        // 配置请求加密
        configEncryptedRequest(config)
        return config
      },
      error => {
        Promise.reject(error)
      }
    ]
  }

  /**
   * 响应拦截器
   */
  function configResponseInterceptor() {
    return [
      response => {
        if (response.config.method === 'post') {
          removeRepeatRequest(response.config)
        }
        return response
      },
      error => {
        pending = []
        // 获取状态码
        const status = error.response ? error.response.status : ''
        // 获取错误信息
        let errorMsg = error.message
        const jsonResult = error.response ? error.response.data : {}
        if (jsonResult.respCode && jsonResult.respDesc) {
          errorMsg = `${jsonResult.respCode}:${jsonResult.respDesc}`
        }
        if (status === 401) {
          if (jsonResult.respCode === '1100') {
            // // 请登录
            // MessageBox.confirm(
            //   '你已被登出，可以取消继续留在该页面，或者重新登录',
            //   '确定登出',
            //   {
            //     confirmButtonText: '重新登录',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            //   }
            // )
            //   .then(() => {
            //     store.dispatch('system/login/frontLogout').then(() => {
            //       location.reload()
            //     })
            //   })
            //   .catch(() => { })
            store.dispatch('system/login/frontLogout').then(() => {
              location.reload()
            })
          } else {
            if (jsonResult.respCode === '1112' || jsonResult.respCode === '1114') {
              // 需要输入验证码进行认证
              store.commit('system/login/setShowCaptcha', true)
            }
            Message({
              message: jsonResult.respDesc,
              type: 'error',
              duration: 5 * 1000
            })
          }
        } else {
          if (status === 500) {
            if (process.env.NODE_ENV === 'development') {
              console.log('response with error : ' + errorMsg) // for debug
            }
            errorMsg = '系统内部错误'
          }
          Message({
            message: errorMsg || '未知错误',
            type: 'error',
            duration: 5 * 1000
          })
        }
        return Promise.reject(error)
      }
    ]
  }

  /**
   * 配置请求头
   * @param {*} config
   */
  function configCommonHeaders(config) {
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json'
    }
    // config.headers[constants.TOKEN_KEY_NAME] = getToken()
    return config
  }

  /**
   * 配置防重复提交
   * @param {*} config
   */
  function configPreventRepeatRequest(config) {
    // 设定每个请求的取消令牌
    if (config.method === 'post') {
      config.cancelToken = new axios.CancelToken(cancel => {
        removeRepeatRequest(config, cancel)
      })
    }
    return config
  }

  /**
   * 阻止重复请求
   * @param {*} config
   * @param {*} cancel
   */
  function removeRepeatRequest(config, cancel) {
    let flagUrl = config.url.replace(config.baseURL, '') + '&' + config.method
    if (pending.indexOf(flagUrl) !== -1) {
      if (cancel) {
        cancel('请勿频繁操作') // 执行取消操作
      } else {
        // 把这条记录从数组中移除
        pending.splice(pending.indexOf(flagUrl), 1)
      }
    } else {
      if (cancel) {
        pending.push(flagUrl)
      }
    }
  }

  /**
   * 配置请求加密
   * @param {*} config
   */
  function configEncryptedRequest(config) {
    // 请求指定了需要加密，则开启加密功能
    if (process.env.ENCRYPTED_REQUEST && config.encrypted) {
      // 生产随机密码
      var random = getRandom(8)
      // 密码RSA加密
      var encryptedRandom = rsaEncrypt(process.env.RSA_PUB_KEY(), random)
      config.headers['ES-Naughty'] = encryptedRandom

      // 数据加密
      var encryptedData = tripleDESEncrypt(random, JSON.stringify(config.data))
      config.data = encryptedData
    }
    return config
  }

  return axiosService
}
