import CryptoJS from 'crypto-js/crypto-js'
import JSEncrypt from 'jsencrypt/bin/jsencrypt'

/**
 * 3DES加密
 * @param {*} password
 * @param {*} data
 */
export function tripleDESEncrypt(password, data) {
  var encrypted = CryptoJS.TripleDES.encrypt(data, CryptoJS.enc.Utf8.parse(password), {
    iv: CryptoJS.enc.Utf8.parse('01234567'),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}
export function encryptByDES(message) {
  const keyHex = CryptoJS.enc.Utf8.parse('01234567')
  const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}
/**
 * RSA公钥加密
 * @param {*} pupblicKey
 * @param {*} data
 */
export function rsaEncrypt(pupblicKey, data) {
  var jse = new JSEncrypt()
  jse.setPublicKey(pupblicKey)
  return jse.encrypt(data)
}

/**
 * 获取随机数
 * @param {*} length
 */
export function getRandom(length) {
  return CryptoJS.lib.WordArray.random(length)
}
export function md5encode(password) {
  return CryptoJS.MD5(password).toString()
}
