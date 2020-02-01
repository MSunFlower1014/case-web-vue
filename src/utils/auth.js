import Cookies from 'js-cookie'
import * as constants from '../constants'

export function getToken() {
  return Cookies.get(constants.TOKEN_KEY_NAME)
}

export function setToken(token) {
  let inThirtyMinutes = new Date(new Date().getTime() + 30 * 60 * 1000)
  return Cookies.set(constants.TOKEN_KEY_NAME, token, {
    expires: inThirtyMinutes
  })
}

export function removeToken() {
  return Cookies.remove(constants.TOKEN_KEY_NAME)
}
