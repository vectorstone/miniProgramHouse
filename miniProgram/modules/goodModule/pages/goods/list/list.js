// pages/goods/list/index.js
import { ComponentWithStore } from 'mobx-miniprogram-bindings'
import { getSharedHouse } from '@/api/index'
import { userStore } from '@/stores/userstore'
ComponentWithStore({
  storeBindings: {
    store: userStore,
    fields: ['token', 'userPermsList', 'roleList']
  },
  /**
   * 页面的初始数据
   */
  data: {
    isFinish: false, // 判断数据是否加载完毕
    // 商品列表请求参数
    requestData: {
      total: 0,
      page: 1, // 页码
      limit: 10, // 每页请求的条数
      category1Id: '', // 一级分类 id
      category2Id: '' // 二级分类 id
    },
    isLoading: false, // 用来判断数据是否加载完毕
    houseList: [],
    show: false
  },
  methods: {
    onLoad(options) {
      // options长这样 {category1Id: "1"}
      this.shareId = options.shareId

      this.getShareHouseInfo()
    },
    async getShareHouseInfo() {
      // 没有登录的话就调用另外一个接口
      const res = await getSharedHouse(this.shareId)

      this.setData({
        houseList: res.data.houses
      })
    },
    clickHouse(event) {
      console.log(event)
      const { id: houseId } = event.currentTarget.dataset
      // console.log('token', this.data.token)
      if (!this.data.token) {
        // 如果没有登录,那么就阻止跳转
        this.setData({
          show: true
        })
      } else {
        wx.navigateTo({
          url: '/modules/goodModule/pages/goods/detail/detail?houseId=' + houseId
        })
      }
    },
    onClose() {
      this.setData({ show: false })
    },
    navigationToLogin() {
      this.setData({
        show: false
      })
      wx.navigateTo({
        url: '/pages/login/login'
      })
    },

    // 监听页面的下拉刷新
    onPullDownRefresh() {
      // 将数据进行重置
      this.setData({
        houseList: [],
      })

      // 重新获取数据
      this.getShareHouseInfo()
      // 解决小程序下拉刷新以后不回弹的问题
      wx.stopPullDownRefresh()
    },
    // 转发功能
    onShareAppMessage() {
      return {
        title: '对方向你丢来了一堆房子,请及时查看',
        path: '/modules/goodModule/pages/goods/list/list?shareId=' + this.shareId,
        imageUrl: '../../assets/images/love.jpg'
      }
    },

    // 转发到朋友圈功能
    // onShareTimeline() {}
  }
})
