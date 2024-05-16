// pages/search/search.js
const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [{ text: '杭州市', value: '330100' }]
  },
  {
    text: '江苏省',
    value: '320000',
    children: [{ text: '南京市', value: '320100' }]
  },
  {
    text: '12号线',
    value: '12',
    children: [
      { text: '巨峰路', value: '1210' },
      { text: '杨高北路', value: '1220' },
      { text: '东陆路', value: '1230' }
    ]
  }
]

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
    options,
    fieldValue: '',
    cascaderValue: '',
    // castar的数据

    // 下拉菜单
    switchTitle1: '包邮',
    switchTitle2: '团购',
    itemTitle: '筛选',
    itemTitleSubway: '地铁线路',
    itemTitleRent: '租金范围',
    option1: [
      { text: '0-1000', value: 0 },
      { text: '1000-1500', value: 1 },
      { text: '1500-2000', value: 2 },
      { text: '2000-2500', value: 3 },
      { text: '2500-3000', value: 4 },
      { text: '3000-3500', value: 5 },
      { text: '3500-4000', value: 6 },
      { text: '4000-10000', value: 7 }
    ],
    value1: 0
    // 下拉菜单
  },

  methods: {
    // DropdownMenu下拉菜单
    onConfirm() {
      this.selectComponent('#item').toggle()
    },

    onSwitch1Change({ detail }) {
      this.setData({ switch1: detail })
    },

    onSwitch2Change({ detail }) {
      this.setData({ switch2: detail })
    },
    // DropdownMenu下拉菜单

    // TreeSelect分类选择
    onClickNav({ detail = {} }) {
      this.setData({
        mainActiveIndex: detail.index || 0
      })
    },

    onClickItem({ detail = {} }) {
      const { activeId } = this.data

      const index = activeId.indexOf(detail.id)
      if (index > -1) {
        activeId.splice(index, 1)
      } else {
        activeId.push(detail.id)
      }

      this.setData({ activeId })
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
