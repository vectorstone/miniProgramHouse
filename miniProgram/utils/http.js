import WxRequest from './request'
import { getStorage, clearStorage } from './storage'
import { modal, toast } from './extendApi'
import { env } from './env'
// ===========一下是实例化的代码
// 目前写到同一个文件中,是为了方便进行测试,以后会提取成多个文件

// 对WxRequest 进行实例化
const instance = new WxRequest({
  // baseURL: 'https://gmall-prod.atguigu.cn/mall-api',
  // baseURL: env.baseURL, // 先不用这个env的配置,方便自己本地和线上进行调试
  baseURL: 'http://39.100.105.236:8888',
  // baseURL: 'http://localhost:8888',
  timeout: 15000
  // 如果整个项目里面都不希望使用loading的效果,可以在进行实例化的时候传入isLoading为false
  // isLoading: false
})

// 下面这个地方配置完对应的请求拦截器和响应拦截器之后会覆盖类里面定义的默认的请求和响应拦截器
// 配置请求拦截器
instance.interceptors.request = (config) => {
  // 在请求发送之前可以对请求做点什么

  // 在发送请求之前,需要先判断本地是否存在token
  const token = getStorage('token')
  // 如果存在token,就需要在请求头中添加token字段
  if (token) {
    config.header['token'] = token
  } else {
    config.header['token'] = 'c0ab721460d340fbb12a28cd2de6b3f7'
  }
  return config
}

// 配置响应拦截器
instance.interceptors.response = async (response) => {
  // 对服务响应的数据做点什么
  const { isSuccess, data } = response
  // 如果isSuccess 为false,说明执行了fail回调函数
  // 这时候就说明网络异常,需要给用户提示网络异常
  if (!isSuccess) {
    wx.showToast({
      title: '网络异常,请重试',
      icon: 'error'
    })
    return Promise.reject(response)
  }
  // 如果后端返回的业务状态码等于200,说明请求成功,服务器成功响应了数据
  switch (data.code) {
    case 200:
      return data
    case 208:
      const res = await modal({
        content: '鉴权失败,请重新登录',
        showCancel: false // 不显示取消按钮
      })
      // 用户点击确认按钮之后
      if (res) {
        // 清除之前失效的token,同时要清除本地存储的全部信息
        clearStorage()
        wx.navigateTo({
          url: '/pages/login/login'
        })
      }
      return Promise.reject(response)

    default:
      toast({
        title: '程序出现异常,请联系客服或稍后重试'
      })
      return Promise.reject(response)
  }
}

// 将WxRequest 实例进行暴露出去,方便在其他文件中进行使用
export default instance
