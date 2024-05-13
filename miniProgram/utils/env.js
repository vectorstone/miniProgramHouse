// 配置当前小程序项目的环境变量

const { miniProgram } = wx.getAccountInfoSync()

// 获取小程序的版本
const { envVersion } = miniProgram

let env = {
  // baseURL: 'https://gmall-prod.atguigu.cn/mall-api'
  baseURL: 'http://39.100.105.236:8888'
}

switch (envVersion) {
  // 开发版
  case 'develop':
    // env.baseURL = 'https://gmall-prod.atguigu.cn/mall-api'
    env.baseURL = 'http://39.100.105.236:8888'
    break
  // 体验版
  case 'trial':
    // env.baseURL = 'https://gmall-prod.atguigu.cn/mall-api'
    env.baseURL = 'http://39.100.105.236:8888'
    break
  // 正式版
  case 'release':
    // env.baseURL = 'https://gmall-prod.atguigu.cn/mall-api'
    env.baseURL = 'http://39.100.105.236:8888'
    break
  // 默认
  default:
    // env.baseURL = 'https://gmall-prod.atguigu.cn/mall-api'
    env.baseURL = 'http://39.100.105.236:8888'
    break
}

export { env }
