// pages/search/search.js
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
import { ComponentWithStore } from 'mobx-miniprogram-bindings'
const computedBehavior = require('miniprogram-computed').behavior
import { userStore } from '@/stores/userstore'
ComponentWithStore({
  // 注册计算属性
  behaviors: [computedBehavior],

  storeBindings: {
    store: userStore,
    fields: ['token', 'userPermsList']
  },

  computed: {
    // 判断是否全选
    // computed 函数中不能访问 this ，只有 data 对象可供访问
    // 这个函数的返回值会被设置到 this.data.selectAllStatus 字段中,也就是挂在到 data 对象中
    isAdmin(data) {
      // 计算属性,用来判断是否是管理员
      return data.userPermsList.includes('bnt.house.list')
    }
  },

  data: {
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
    landloardName: '',
    houseId: '',

    // treeSelect的数据
    mainActiveIndex: 0,
    activeId: [],
    max: 2,
    subwayDetail,
    // treeSelect的数据

    // castar的数据
    show: false,
    fieldValue: '',
    cascaderValue: '',
    // castar的数据

    // 下拉菜单
    switchTitle1: '包邮',
    switchTitle2: '团购',
    itemTitle: '筛选',
    itemTitleSubway: '地铁线路',
    itemTitleRent: '租金范围',
    rentRange,
    value1: 0
    // 下拉菜单
  },

  methods: {
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

    onClick() {
      this.setData({
        show: true
      })
    },

    onClose() {
      this.setData({
        show: false
      })
    },
    // 搜索的组件

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage() {}
  }
})
