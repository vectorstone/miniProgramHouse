import {
  reqIndexData,
  getHouseList,
  getHouseDetail,
  getSharedHouse,
  getHouseInfoUnLogin
} from '@/api/index'
import { houseAttachment } from '@/api/mockData'

import { userStore } from '@/stores/userstore'
import { ComponentWithStore } from 'mobx-miniprogram-bindings'

ComponentWithStore({
  storeBindings: {
    store: userStore,
    fields: ['token']
  },
  // 初始化数据
  data: {
    bannerList: [], // 轮播图数据
    categoryList: [], // 商品导航区域
    activeList: [], // 活动渲染区域
    hotList: [], // 人气推荐
    guessList: [], // 猜你喜欢
    loading: true,
    houseList: [],
    total: 0,
    isLoading: false, // 用来判断数据是否加载完毕
    isFinish: false, // 判断数据是否加载完毕
    // 房源列表请求参数
    page: 1, // 页码
    limit: 10, // 每页请求的条数
    show: false
  },
  methods: {
    navigationToLogin() {
      this.setData({
        show: false
      })
      wx.navigateTo({
        url: '/pages/login/login'
      })
    },
    // 点击关闭弹框时触发的回调
    onClose() {
      this.setData({ show: false })
    },
    onShow() {
      this.getHouseListData()
    },

    // 监听页面的加载
    onLoad() {
      // 在页面加载以后,调用获取首页数据的方法
      // this.getIndexData()
      this.getHouseListData()
    },

    // 上拉加载更多的功能
    onReachBottom() {
      // 如果没有登录的话提示登录
      if (!this.data.token) {
        this.setData({
          show: true
        })
        return
      }

      const { houseList, total, isLoading, page } = this.data

      // 判断是否加载完毕,如果isLoading 等于true
      // 说明数据还没有加载完毕,不加载下一页的数据
      if (isLoading) return

      // 判断数据是否加载完毕
      if (total === houseList.length) {
        // 如果相等,说明数据已经加载完毕
        // 如果数据加载完毕,需要给用户提示,同时不继续加载下一个数据
        this.setData({
          isFinish: true
        })
        return
      }

      // 对页码进行 + 1 的操作
      this.setData({
        page: page + 1
      })

      // 重新发送请求
      this.getHouseListData()
    },

    // 监听页面的下拉刷新
    onPullDownRefresh() {
      // 将数据进行重置
      this.setData({
        houseList: [],
        total: 0,
        isFinish: false,
        page: 1
      })

      // 重新获取数据
      this.getHouseListData()
    },

    async getHouseDetail() {
      const res = await getHouseDetail('1777925917874634753')
    },
    async getHouseListData() {
      // 数据真正的请求中
      this.data.isLoading = true

      if (!this.data.token) {
        // 如果没有登录的话,只查询6条数据(后端的分页查询接口需要添加白名单,感觉不安全)
        const res = await getHouseInfoUnLogin()
        this.data.isLoading = false
        this.setData({
          total: res.data.houses.length,
          houseList: res.data.houses,
          bannerList: houseAttachment
        })
      } else {
        const res = await getHouseList(this.data.page, this.data.limit)
        // 数据加载完毕
        this.data.isLoading = false
        this.setData({
          total: res.data.items.total,
          houseList: [...this.data.houseList, ...res.data.items.records],
          bannerList: houseAttachment
        })
      }
    },

    // 转发功能
    onShareAppMessage() {
      return {
        title: '所有的怦然心动，都是你',
        path: '/pages/index/index',
        imageUrl: '../../assets/images/love.jpg'
      }
    },

    // 转发到朋友圈功能
    onShareTimeline() {}
  }
})
