import loginApi from '../api/login-api'
import omoLoginApi from '../api/omo-login-api'
import { getToken, removeToken } from '@/utils/auth'
import Cookies from 'js-cookie'

const login = {
  namespaced: true,
  state: {
    sid: getToken(),
    username: '',
    realname: '',
    issuerCode: '',
    role: [],
    currentUser: null
  },

  mutations: {
    setSid: (state, sid) => {
      state.sid = sid
    },
    setCurrentUser: (state, data) => {
      // {"username":"admin","password":"123456","rememberMe":true,"mobileLogin":false,"captcha":""}
      state.currentUser = data.user
      state.username = data.user && data.user.userName
      state.realname = data.user && data.user.userName
    },
    setIssuserCode: (state, issuerCode) => {
      state.issuerCode = issuerCode
    }
  },

  actions: {
    // omo 登录
    omoLogin({ commit }, params) {
      return new Promise((resolve, reject) => {
        omoLoginApi.omoLogin(params)
          .then(response => {
            const data = response && response.data || {}
            const sid = data.data || ''
            // session id
            commit('setSid', sid)
            resolve(data)
            Cookies.set('issuerCode', data.data.issueCode)
            Cookies.set('channelCode', data.data.channelCode)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 用户登录
    async login({ commit }, loginParam) {
      let fun = function() {
        return new Promise((resolve, reject) => {
          loginApi
            .login(loginParam)
            .then(response => {
              console.log(response.data)
              const data = response.data
              const sid = data.data
              commit('setSid', sid)
              // setToken(sid)
              resolve(data)
            })
            .catch(error => {
              reject(error)
            })
        })
      }
      await fun()
    },
    // 获取当前登录用户信息
    getLoginUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        loginApi
          .getLoginUserInfo()
          .then(response => {
            console.log(response.data)
            const data = response.data
            commit('setCurrentUser', data)
            Cookies.set('userType', 1)
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 后端登出
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        loginApi
          .logout()
          .then(() => {
            commit('setSid', '')
            removeToken()
            Cookies.remove('issuerCode')
            Cookies.remove('channelCode')
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 前端登出
    frontLogout({ commit }) {
      return new Promise(resolve => {
        commit('setSid', '')
        removeToken()
        Cookies.remove('issuerCode')
        Cookies.remove('channelCode')
        resolve()
      })
    },
    // 获取验证码
    getCaptcha({ commit }, uuid) {
      return new Promise((resolve, reject) => {
        loginApi
          .getCaptcha(uuid)
          .then(response => {
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // ECOP用户登录
    async ecopLogin({ commit }, loginParam) {
      let fun = function() {
        return new Promise((resolve, reject) => {
          loginApi
            .ecopLogin(loginParam)
            .then(response => {
              const data = response.data
              const sid = data.data
              commit('setSid', sid)
              resolve(data)
            })
            .catch(error => {
              reject(error)
            })
        })
      }
      await fun()
    }
  }
}
export default login
