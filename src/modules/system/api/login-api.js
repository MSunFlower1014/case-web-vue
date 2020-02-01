import request from '@/utils/request'

class LoginApi {
  /**
   * 用户登录
   * @param {*} loginParam
   */
  login(loginParam) {
    return request({
      url: '/api/platform/login',
      method: 'post',
      data: loginParam
      // encrypted: true
    })
  }

  /**
   * 用户登出
   */
  logout() {
    return request({
      url: '/api/platform/logout',
      method: 'get'
    })
  }

  /**
   * 获取当前登录用户信息
   */
  getLoginUserInfo() {
    return request({
      url: '/api/platform/self',
      method: 'get'
    })
  }

  /**
   * 获取验证码 arraybuffer
   */
  getCaptcha(uuid) {
    return request({
      url: `/api/platform/validateCode?${uuid}`,
      method: 'get'
    })
  }
}
export default new LoginApi()
