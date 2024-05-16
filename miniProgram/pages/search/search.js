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

Page({
  data: {
    // 自己的数据
    keyword: '',

    // treeSelect的数据
    mainActiveIndex: 0,
    activeId: null,
    items: [
      {
        text: '所有城市',
        badge: 3,
        dot: true,
        disabled: false,
        children: [
          {
            text: '温州',
            id: 1,
            disabled: false
          },
          {
            text: '杭州',
            id: 2
          }
        ]
      },
      {
        text: '租金',
        badge: 4,
        dot: true,
        disabled: false,
        children: [
          {
            text: '1000-2000',
            id: 3,
            disabled: false
          },
          {
            text: '2000-3000',
            id: 4
          },
          {
            text: '3000-4000',
            id: 5
          }
        ]
      },
      {
        text: '户型',
        badge: 5,
        dot: true,
        disabled: false,
        children: [
          {
            text: '一室户',
            id: 6,
            disabled: false
          },
          {
            text: '单间',
            id: 7
          },
          {
            text: '整租',
            id: 8
          }
        ]
      }
    ],

    // castar的数据
    show: false,
    options,
    fieldValue: '',
    cascaderValue: ''
  },
  onClickNav({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0
    })
  },

  onClickItem({ detail = {} }) {
    const activeId = this.data.activeId === detail.id ? null : detail.id

    this.setData({ activeId })
  },

  onSearch(e) {
    console.log('用户搜索   ' + e.detail)
  },
  // searchEvent(e) {
  //   console.log('用户搜索' + e.detail)
  //   setTimeout(() => {
  //     wx.hideLoading()
  //   }, 1000)
  // },
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

  onFinish(e) {
    const { selectedOptions, value } = e.detail
    const fieldValue = selectedOptions
      .map((option) => option.text || option.name)
      .join('/')
    this.setData({
      fieldValue,
      cascaderValue: value
    })
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {}
})
