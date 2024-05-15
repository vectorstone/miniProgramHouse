// pages/info/info.js
import { ComponentWithStore } from 'mobx-miniprogram-bindings'
// 使用 ComponentWithStore 方法替换 Component 方法构造页面
// 导入 store 对象
import { userStore } from '../../stores/userstore'
import { debounce } from 'miniprogram-licia'
ComponentWithStore({
  // 让页面和 Store 对象建立关联
  storeBindings: {
    store: userStore,
    fields: ['token', 'userInfo'],
    actions: ['setToken', 'setUserInfo']
  },
  // 页面的初始数据
  data: {
    // 初始化第二个面板数据
    initpanel: [
      {
        id: 1,
        url: '/modules/orderPayModule/pages/order/list/list',
        title: '商品订单',
        iconfont: 'icon-dingdan'
      },
      {
        id: 2,
        url: '/modules/orderPayModule/pages/order/list/list',
        title: '礼品卡订单',
        iconfont: 'icon-lipinka'
      },
      {
        id: 3,
        url: '/modules/orderPayModule/pages/order/list/list',
        title: '退款/售后',
        iconfont: 'icon-tuikuan'
      }
    ]
  },
  methods: {
    // 跳转到登录页面
    toLoginPage() {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
  }
})
