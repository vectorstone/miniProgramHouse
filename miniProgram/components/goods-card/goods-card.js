// components/goods-card/index.js
import { userStore } from '@/stores/userstore'
Component({
  storeBindings: {
    store: userStore,
    fields: ['token', 'userPermsList', 'roleList']
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 每一项商品的数据
    goodItem: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    clickHouse(event) {
      console.log(event)
      const { houseid } = event.currentTarget
      console.log('token', this.data.token)
      if (this.data.token) {
        // 如果没有登录的话,那么就阻止跳转
        wx.toast({ title: '登录以查看更多' })
      } else {
        wx.navigateTo({
          url: '/modules/goodModule/pages/goods/detail/detail?houseId=' + houseid
        })
      }
    }
  }
})
