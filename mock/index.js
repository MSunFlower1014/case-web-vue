import Mock from 'mockjs'
import loginAPI from './login'
// import noticeAPI from './notice'
// import channelAPI from './channel'
// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
// Mock.mock(/\/admin\/login/, 'post', loginAPI.loginByUsername)
// Mock.mock(/\/admin\/logout/, 'get', loginAPI.logout)
// Mock.mock(/\/api\/platform\/login/, 'get', loginAPI.getUserInfo)
Mock.mock(/\/api\/sys\/menu\/self/, 'get', loginAPI.getMenu)

// 消息通知相关
// Mock.mock(/\/notice\/list/, 'get', noticeAPI.getList)

// 系统相关
// Mock.mock(/\/api\/platform\/channelInfo/, 'post', channelAPI.getChannel)

export default Mock
