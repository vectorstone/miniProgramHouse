// pages/goods/detail/index.js
import { getHouseDetail } from '@/modules/goodModule/api/house'
// 导入behaviros
import { userBehavior } from '@/modules/goodModule/behaviors/userBehavior'
import { userStore } from '@/stores/userstore'
import { ComponentWithStore } from 'mobx-miniprogram-bindings'
ComponentWithStore({
  storeBindings: {
    store: userStore,
    fields: ['token', 'userPermsList', 'roleList']
  },
  // behaviors: [userBehavior],
  // 页面的初始数据
  data: {
    house: {}, // 商品详情
    show: false, // 控制加入购物车和立即购买弹框的显示
    count: 1, // 商品购买数量，默认是 1
    blessing: '', // 祝福语
    buyNow: '', // 是否立即购买, 加入购物车0,立即购买1
    allCount: '',
    loginShow: false
  },
  methods: {
    handleVideoTap: function (e) {
      console.log(e)
      const { id } = e.currentTarget
      // console.log(id)
      const videoContext = wx.createVideoContext(id + '', this)
      console.log(videoContext)
      videoContext.requestFullScreen()
      videoContext.play()
    },

    handleFullScreenChange: function (e) {
      console.log('Full screen change:', e)
      const { id } = e.currentTarget
      if (!e.detail.fullScreen) {
        // 当退出全屏时
        const videoContext = wx.createVideoContext(id + '', this)
        videoContext.pause()
      }
    },
    // 监听页面的下拉刷新
    onPullDownRefresh() {
      if (!this.data.token) {
        // 如果没有登录,那么就阻止跳转
        this.setData({
          loginShow: true
        })
        wx.stopPullDownRefresh()
        return
      }
      this.houseDetail()

      // 解决小程序下拉刷新以后不回弹的问题
      wx.stopPullDownRefresh()
    },
    navigationToLogin() {
      this.setData({
        loginShow: false
      })
      wx.navigateTo({
        url: '/pages/login/login'
      })
    },

    // 点击关闭弹框时触发的回调
    onClose() {
      this.setData({ show: false })
    },
    onCloseLogin() {
      this.setData({ loginShow: false })
    },
    addContact() {
      this.setData({
        show: true
      })
      // wx.navigateTo({
      //   url: '/pages/contact/contact'
      // })
    },

    // 点击大图可以预览的功能
    previewImg() {
      // 调用预览图片的 API
      const houseAttachments = this.data.house.houseAttachment
      // console.log(houseAttachments)
      const medias = houseAttachments
        .filter((item) => item.contentType === 0)
        .map((item) => item.url)
      // console.log(medias)
      wx.previewImage({
        urls: medias
      })
    },
    checkLoginAndGetData() {
      if (!this.data.token) {
        // 如果没有登录,那么就阻止跳转
        this.setData({
          loginShow: true
        })
        return
      }
      this.houseDetail()
    },
    onShow() {
      this.checkLoginAndGetData()
      // if (!this.data.token) {
      //   // 如果没有登录,那么就阻止跳转
      //   this.setData({
      //     loginShow: true
      //   })
      //   return
      // }
      // this.houseDetail()
    },

    onLoad(options) {
      // 获取传递过来的houseId
      console.log(options)
      this.houseId = options.houseId
      // this.houseId = '1761669842944925714'

      this.checkLoginAndGetData()

      // if (!this.data.token) {
      //   // 如果没有登录,那么就阻止跳转
      //   this.setData({
      //     loginShow: true
      //   })
      //   return
      // }

      // // 查询获取商品详细的数据
      // this.houseDetail()

      // 计算购物车里面商品的数量
      // this.getCartCount()
    },
    async houseDetail() {
      // const res = await getHouseDetail(this.houseId)
      // 1777925917874634753 wendy 横板视频
      // const res = await getHouseDetail('1777925917874634753')
      // 1780103377428987905 竖版视频
      const res = await getHouseDetail(this.houseId)
      // console.log(res)
      const { item: house } = res.data
      // console.log(house)
      this.setData({ house })
    },

    // 转发功能
    onShareAppMessage() {
      // return {
      //   title: '所有的怦然心动，都是你',
      //   path: '/pages/index/index',
      //   imageUrl: '../../assets/images/love.jpg'
      // }
    },

    // 转发到朋友圈功能
    onShareTimeline() {}
  }
})
