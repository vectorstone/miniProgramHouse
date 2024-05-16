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
        text: '港城',
        id: 33
      }
    ]
  }
]

Page({
  data: {
    // 自己的数据
    keyword: '',

    // treeSelect的数据
    mainActiveIndex: 0,
    activeId: null,
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
      { text: '全部商品', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '活动商品', value: 2 }
    ],
    value1: 0
    // 下拉菜单
  },

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
    const activeId = this.data.activeId === detail.id ? null : detail.id

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
})
