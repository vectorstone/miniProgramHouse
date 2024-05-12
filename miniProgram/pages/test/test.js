// pages/test/test.js
import instance from '../../utils/http'
import { reqSwiperData } from '../../api/index'
Page({
  // 调用方式1
  async handler() {
    // instance
    //   .request({
    //     // url: 'https://gmall-prod.atguigu.cn/mall-api/index/findBanner',
    //     url: '/index/findBanner',
    //     method: 'GET'
    //   })
    //   .then((res) => {
    //     console.log(res)
    //   })

    // 用来测试状态码为208的情况
    // const res = await instance.get('/cart/getCartList').catch((err) => {
    //   console.log(err)
    // })
    // console.log(res)

    // 用来测试状态码为除200和208以外的情况
    // const res = await instance.get('/cart/getCartList111222').catch((err) => {
    //   console.log(err)
    // })
    // console.log(res)

    // 真机测试loading闪烁的代码
    // instance.get('/index/findBanner').then(() => {
    //   instance.get('/index/findBanner').then(() => {})
    // })

    // 测试不显示loading的情况
    // const res = await instance.get('/index/findBanner', null, {
    //   isLoading: false
    // })
    // console.log(res)

    const res = await reqSwiperData()
    console.log(res)
  },

  // 测试并发请求
  async allHandler() {
    // 可以使用Promise.all的方式来进行并发请求的发送
    // await Promise.all([instance.get('/index/findBanner'),instance.get('/index/findCategory1')])

    // 或者也可以使用我们自己封装的并发请求的方法来进行并发请求的发送
    // 这个地方传入的就是一个个的异步的任务了,不用像上面一样传入一个数组即可
    const res = await instance.all(
      instance.get('/index/findBanner'),
      instance.get('/index/findCategory1')
    )
    // 下面返回的结果也是一个个的数组,就是不知道和上面的异步任务的对应关系是什么样子的
    console.log(res)
  },

  // 调用方式2
  // async handler() {
  //   const res = await instance.request({
  //     // request里面已经定义了baseUrl了,所以这个地方只需要定义接口的路径即可
  //     url: '/index/findBanner',
  //     method: 'GET'
  //   })
  //   console.log(res)
  // },

  /**
   * Page initial data
   */
  data: {
    avatarUrl: '../../assets/images/avatar.png'
  },

  // 获取微信头像
  async chooseavatar(event) {
    const { avatarUrl } = event.detail
    // this.setData({
    //   avatarUrl
    // })

    // wx.uploadFile({
    //   // 开发者的服务器地址,接口地址
    //   url: 'https://gmall-prod.atguigu.cn/mall-api/fileUpload',
    //   // 要上传的文件路径
    //   filePath: avatarUrl,
    //   // 文件对应的 key, 服务器需要根据 key 来获取文件的二进制信息
    //   name: 'file',
    //   success: (res) => {
    //     // 服务器返回的数据是JSON字符串,在使用的时候,需要进行转换 JSON.parse进行转换
    //     res.data = JSON.parse(res.data)

    //     this.setData({
    //       avatarUrl: res.data.data
    //     })
    //   }
    // })

    // 测试我们自己封装的实例方法
    // const res = await instance.upload('/fileUpload', avatarUrl, 'file')
    // console.log(res)

    // 响应里面的data就是上传后的头像的url地址,通过下面的解构和重命名之后,变成了avatar
    const { data: avatar } = await instance.upload(
      '/fileUpload',
      avatarUrl,
      'file'
    )

    // 将数据里面的头像的地址更新为对应的刚刚的url路径地址
    this.setData({
      avatarUrl: avatar
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {},

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {},

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {},

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {},

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {},

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {},

  /**
   * Called when page reach bottom
   */
  onReachBottom() {},

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {}
})
