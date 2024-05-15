// pages/goods/list/index.js
import { reqGetGoodsList, reqGetGoodsDetail } from '@/api/goods'
import { getSharedHouse } from '@/api/index'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [], // 商品列表数据
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
    houseList: []
  },
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

  async getGoodsList() {
    // 数据真正的请求中
    this.data.isLoading = true

    const { data } = await reqGetGoodsList(this.data.requestData)

    // 数据加载完毕
    this.data.isLoading = false

    this.setData({
      // 这个地方需要合并之前的数据和新查询出来的数据,不然的话只能看到最新查询出来的数据,无法看到总的加载出来的商品的数据
      goodsList: [...this.data.goodsList, ...data.records],
      total: data.total
    })
  },

  // 上拉加载更多的功能
  onReachBottom() {
    const { requestData, total, goodsList, isLoading } = this.data
    const { page } = requestData

    // 判断是否加载完毕,如果isLoading 等于true
    // 说明数据还没有加载完毕,不加载下一页的数据
    if (isLoading) return

    // 判断数据是否加载完毕
    if (total === goodsList.length) {
      // 如果相等,说明数据已经加载完毕
      // 如果数据加载完毕,需要给用户提示,同时不继续加载下一个数据
      this.setData({
        isFinish: true
      })
      return
    }

    // 对页码进行 + 1 的操作
    this.setData({
      requestData: { ...this.data.requestData, page: page + 1 }
    })

    // 重新发送请求
    this.getGoodsList()
  },

  // 监听页面的下拉刷新
  onPullDownRefresh() {
    // 将数据进行重置
    this.setData({
      goodsList: [],
      total: 0,
      isFinish: false,
      requestData: { ...this.data.requestData, page: 1 }
    })

    // 重新获取数据
    this.getGoodsList()
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
  onShareTimeline() {}
})
