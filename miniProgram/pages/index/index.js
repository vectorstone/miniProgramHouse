import { houseAttachment } from '@/api/mockData'

import { userStore } from '@/stores/userstore'
import { ComponentWithStore } from 'mobx-miniprogram-bindings'

const subwayDetail = [
  {
    text: '12号线',
    badge: 3,
    dot: false,
    disabled: false,
    children: [
      {
        text: '东陆路',
        id: 1,
        disabled: false
      },
      {
        text: '巨峰路',
        id: 2
      },
      {
        text: '杨高北路',
        id: 3
      }
    ]
  },
  {
    text: '6号线',
    badge: 3,
    dot: false,
    disabled: false,
    children: [
      {
        text: '东靖路',
        id: 10,
        disabled: false
      },
      {
        text: '五洲大道',
        id: 11
      },
      {
        text: '巨峰路',
        id: 12
      }
    ]
  },
  {
    text: '9号线',
    badge: 3,
    dot: false,
    disabled: false,
    children: [
      {
        text: '台儿庄路',
        id: 20,
        disabled: false
      },
      {
        text: '金桥',
        id: 21
      },
      {
        text: '蓝天路',
        id: 22
      }
    ]
  },
  {
    text: '10号线',
    badge: 4,
    dot: false,
    disabled: false,
    children: [
      {
        text: '双江路',
        id: 30,
        disabled: false
      },
      {
        text: '高桥',
        id: 31
      },
      {
        text: '高桥西',
        id: 32
      },
      {
        text: '港城路',
        id: 33
      }
    ]
  }
]

const rentRange = [
  { text: '0-1000元', value: 0 },
  { text: '1000-1500元', value: 1 },
  { text: '1500-2000元', value: 2 },
  { text: '2000-2500元', value: 3 },
  { text: '2500-3000元', value: 4 },
  { text: '3000-3500元', value: 5 },
  { text: '3500-4000元', value: 6 },
  { text: '4000-10000元', value: 7 }
]
const computedBehavior = require('miniprogram-computed').behavior
import {
  reqIndexData,
  getHouseList,
  getHouseDetail,
  getSharedHouse,
  getHouseInfoUnLogin
} from '@/api/index'

ComponentWithStore({
  storeBindings: {
    store: userStore,
    fields: ['token', 'userPermsList', 'roleList']
  },

  computed: {
    // 判断是否全选
    // computed 函数中不能访问 this ，只有 data 对象可供访问
    // 这个函数的返回值会被设置到 this.data.selectAllStatus 字段中,也就是挂在到 data 对象中
    isAdmin(data) {
      // 计算属性,用来判断是否是管理员
      // return data.userPermsList.includes('bnt.house.list')
      return data.roleList.find((item) => item.roleCode === 'SYSTEM')
    }
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
    show: false,

    // 搜索的对象构建
    searchVo: {
      community: '',
      endRent: 0,
      fileType: 0,
      houseStatus: 0,
      id: '',
      landlordName: '',
      orientation: '',
      remark: '',
      // 2000-2500元
      rentRange: '',
      roomNumber: '',
      startRent: 0,
      subway: '',
      subways: []
    },

    // 自己的数据
    keyword: '',
    houseId: '',

    // treeSelect的数据
    mainActiveIndex: 0,
    activeId: [],
    max: 2,
    subwayDetail,
    // treeSelect的数据

    // 下拉菜单
    itemTitleSubway: '地铁线路',
    itemTitleRent: '租金范围',
    rentRange,
    value1: 0
    // 下拉菜单
  },
  methods: {
    clickHouse(event) {
      console.log(event)
      const { id: houseId } = event.currentTarget.dataset
      console.log('token', this.data.token)
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

    // 下面是从search.js页面过来的数据
    // DropdownMenu下拉菜单
    // 对应的wxml里面应该这样写 bind:change="change" 不是bind:tap="change"
    change(options) {
      const { detail } = options
      // options里面的detail是对应的子选项的value
      // console.log(options)

      // 根据获取到的 value 方向的来获取对应的项目的 text
      const rent = this.data.rentRange.find((item) => item.value === detail)
      this.setData({
        searchVo: { ...this.data.searchVo, rentRange: rent.text }
      })
    },

    onConfirm() {
      this.selectComponent('#item').toggle()
    },

    // DropdownMenu下拉菜单

    // TreeSelect分类选择
    onClickNav({ detail = {} }) {
      // console.log(detail)
      this.setData({
        mainActiveIndex: detail.index || 0
      })
    },

    onClickItem({ detail = {} }) {
      // {text: "巨峰路", id: 12}
      // console.log(detail)
      this.data.searchVo.subways.push(detail.text)

      const { activeId } = this.data

      const index = activeId.indexOf(detail.id)
      if (index > -1) {
        activeId.splice(index, 1)
      } else {
        activeId.push(detail.id)
      }

      this.setData({
        activeId,
        searchVo: { ...this.data.searchVo, ...this.data.searchVo.subways }
      })
    },
    // TreeSelect分类选择

    // 搜索的组件
    onSearch(e) {
      console.log('用户搜索   ' + e.detail)
    },

    onChange(event) {
      const { detail: community } = event
      this.setData({
        searchVo: { ...this.data.searchVo, community }
      })
    },

    onClick(options) {
      console.log(options)
      if (!this.data.token) {
        this.setData({
          show: true
        })
        return
      }
      this.setData({
        houseList: []
      })
      this.getHouseListData()
    },

    onClose() {
      this.setData({
        show: false
      })
    },

    // 下面是从search.js页面过来的数据

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

    async getHouseListData() {
      // 数据真正的请求中
      this.data.isLoading = true

      if (!this.data.token) {
        // 如果没有登录的话,只查询6条数据(后端的分页查询接口需m要添加白名单,感觉不安全)
        const res = await getHouseInfoUnLogin()
        const houseList = res.data.houses.filter((item) => item.houseStatus === 0)
        this.data.isLoading = false
        this.setData({
          total: res.data.houses.length,
          houseList,
          bannerList: houseAttachment
        })
      } else {
        const res = await getHouseList(
          this.data.page,
          this.data.limit,
          this.data.searchVo
        )
        // 数据加载完毕
        const houseList = res.data.items.records.filter((item) => item.houseStatus === 0)
        this.data.isLoading = false
        this.setData({
          total: res.data.items.total,
          // houseList: [...this.data.houseList, ...res.data.items.records],
          houseList: [...this.data.houseList, ...houseList],
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
