import { reqIndexData, getHouseList, getHouseDetail } from '@/api/index'
import { houseAttachment } from '@/api/mockData'
Page({
  // 初始化数据
  data: {
    bannerList: [], // 轮播图数据
    categoryList: [], // 商品导航区域
    activeList: [], // 活动渲染区域
    hotList: [], // 人气推荐
    guessList: [], // 猜你喜欢
    loading: true,
    houseList: [],
    total: 0
  },

  // 监听页面的加载
  onLoad() {
    // 在页面加载以后,调用获取首页数据的方法
    // this.getIndexData()
    this.getHouseListData()
  },

  async getHouseDetail() {
    const res = await getHouseDetail('1777925917874634753')
  },
  async getHouseListData() {
    const res = await getHouseList(1, 10)
    console.log(res)
    // const houseAttachment = JSON.parse(indexHouseJson)
    this.setData({
      title: res.data.items.total,
      houseList: res.data.items.records,
      bannerList: houseAttachment
    })
  },
  async getIndexData() {
    const res = await reqIndexData()
    // console.log(res)
    this.setData({
      houseList: res[0].data.items.records,
      bannerList: res[1].data.item,
      categoryList: res[1].data,
      activeList: res[2].data,
      guessList: res[3].data,
      hotList: res[4].data,
      loading: false
    })
  },

  // async getIndexData() {
  //   // 调用接口API函数,获取数据
  //   // reqIndexData 内部使用的 all 或者 Promise.all
  //   // 返回的是一个数组,是按照接口的调用顺序返回的
  //   const res = await reqIndexData()
  //   console.log(res)

  //   // 需要对数据进行赋值,在赋值的时候,一定要注意索引
  //   this.setData({
  //     bannerList: res[0].data,
  //     categoryList: res[1].data,
  //     activeList: res[2].data,
  //     guessList: res[3].data,
  //     hotList: res[4].data,
  //     loading: false
  //   })
  // },

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
})
