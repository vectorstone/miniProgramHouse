// pages/cart/component/cart.js
import { ComponentWithStore } from 'mobx-miniprogram-bindings'
import { userStore } from '@/stores/userstore'
import {
  reqCartList,
  reqUpdateChecked,
  reqCheckAllCart,
  reqAddCart,
  reqDelCart
} from '@/api/cart'
const computedBehavior = require('miniprogram-computed').behavior
// 导入让删除滑块自动弹回的 behavior
import { swipeCellBehavior } from '@/behaviors/swipCell'

// 从 miniprogram-licia 导入防抖函数
import { debounce } from 'miniprogram-licia'

// 购物车页面的功能比较的复杂,所以建议使用Component来进行构建,简单一点的页面就使用Page进行构建即可
ComponentWithStore({
  // 注册计算属性
  behaviors: [computedBehavior, swipeCellBehavior],

  storeBindings: {
    store: userStore,
    fields: ['token']
  },

  computed: {
    // 判断是否全选
    // computed 函数中不能访问 this ，只有 data 对象可供访问
    // 这个函数的返回值会被设置到 this.data.selectAllStatus 字段中,也就是挂在到 data 对象中
    selectAllStatus(data) {
      return (
        data.cartList.length !== 0 && data.cartList.every((item) => item.isChecked === 1)
      )
    },

    // 计算商品价格总和
    totalPrice(data) {
      // 用来对订单总金额进行累加
      let totalPrice = 0

      data.cartList.forEach((item) => {
        // 如果商品的 isChecked 属性等于，说明该商品被选中的
        if (item.isChecked === 1) {
          totalPrice += item.count * item.price
        }
      })

      return totalPrice
    }
  },

  // 组件的属性列表
  properties: {},

  // 组件的初始数据
  data: {
    cartList: [],
    emptyDes: '还没有添加商品，快去添加吧～'
  },

  // 组件的方法列表
  methods: {
    // 如果使用Component 方法来构建页面
    // 生命周期钩子函数需要写到 methods 中才可以
    onShow() {
      console.log(this.data.token)
      this.showTipGetList()
    },

    // 跳转到订单结算页面
    toOrder() {
      if (this.data.totalPrice === 0) {
        wx.toast({
          title: '请选择需要购买的商品'
        })

        return
      }

      // 跳转到订单的结算页面
      wx.navigateTo({
        url: '/modules/orderPayModule/pages/order/detail/detail'
      })
    },

    // 删除购物车中的商品
    async delCartGoods(event) {
      // 获取需要删除商品的 id
      const { id } = event.currentTarget.dataset

      // 询问用户是否删除该商品
      const modalRes = await wx.modal({
        content: '您确认删除该商品吗 ?'
      })

      if (modalRes) {
        await reqDelCart(id)

        this.showTipGetList()
      }
    },

    onHide() {
      // 在页面隐藏的时候，需要让删除滑块自动弹回
      this.onSwipeCellCommonClick()
    },

    // 更新商品的数量,防抖,并不是每次更新数量都要向后端服务器发送请求,当停顿的事件超过500ms的时候才会向后端服务器发送请求,更新商品的数量
    changeBuyNum: debounce(async function (event) {
      // 获取最新的购买数量，
      // 如果用户输入的值大于 200，购买数量需要重置为 200
      // 如果不大于 200，直接返回用户输入的值
      let buynum = event.detail > 200 ? 200 : event.detail
      const { id: goodsId, index, oldbuynum } = event.target.dataset

      // 验证用户输入的值，是否是 1 ~ 200 直接的正整数
      const reg = /^([1-9]|[1-9]\d|1\d{2}|200)$/

      // 对用户输入的值进行验证
      const regRes = reg.test(buynum)

      // 如果验证没有通过，需要重置为之前的购买数量
      if (!regRes) {
        this.setData({
          [`cartList[${index}].count`]: oldbuynum
        })

        return
      }

      // detail是最新的购买的数量,oldbuynum是之前的旧的购买的数量
      // 如果通过，需要计算差值，然后将差值发送给服务器，让服务器进行逻辑处理
      const disCount = buynum - oldbuynum

      // 如果购买数量没有发生改变，不发送请求
      if (disCount === 0) return

      // 发送请求：购买的数量 和 差值
      const res = await reqAddCart({ goodsId, count: disCount })

      // 服务器更新购买数量成功以后，更新本地的数据
      if (res.code === 200) {
        this.setData({
          [`cartList[${index}].count`]: buynum
        })
      }
    }, 500),

    // 全选或者全不选
    // 全选和全不选功能
    async updateAllStatus(event) {
      // 获取全选和全不选的状态
      const isChecked = event.detail ? 1 : 0
      // 调用接口，更新服务器中商品的状态
      const res = await reqCheckAllCart(isChecked)

      // 如果更新成功，需要将本地的数据一同改变
      if (res.code === 200) {
        // 将数据进行拷贝 这个地方为什么要先转为json,然后再反序列化呢

        // 错误的示范 下面这种写法会频繁的调用setData方法,会有性能的影响
        // this.data.cartList.forEach(item => {
        //   this.setData({...})
        // })

        // 对购物车列表数据进行深拷贝
        const newCart = JSON.parse(JSON.stringify(this.data.cartList))
        // 将数据进行更改
        newCart.forEach((item) => (item.isChecked = isChecked))

        // 进行赋值
        this.setData({
          cartList: newCart
        })
      }
    },

    // 切换商品的选中状态
    async updateChecked(event) {
      // 获取最新的选中状态
      const { detail } = event
      // 获取商品的索引和 id
      const { id, index } = event.target.dataset
      // 将最新的状态格式化成后端所需要的数据格式
      const isChecked = detail ? 1 : 0

      // 调用接口，传入参数，更新商品的状态
      const res = await reqUpdateChecked(id, isChecked)

      // 如果数据更新成功，需要将本地的数据一同改变
      if (res.code === 200) {
        // 更新方法1 重新查询对应的数据
        // this.showTipGetList()

        // 更新方法2 直接修改本地的数据即可
        this.setData({
          [`cartList[${index}].isChecked`]: isChecked
        })
      }
    },

    // 获取购物车列表数据 + 处理页面的展示
    async showTipGetList() {
      // 将 token 进行解构
      const { token } = this.data

      // 1. 如果没有登录，购物车列表，展示文案：您尚未登录，点击登录获取更多权益
      if (!token) {
        this.setData({
          emptyDes: '您尚未登录，点击登录获取更多权益',
          cartList: []
        })

        return
      }

      // 获取商品列表数据
      const { data: cartList, code } = await reqCartList()

      if (code === 200) {
        // 2. 如果用户登录，购物车列表为空，展示文案： 还没有添加商品，快去添加吧～
        this.setData({
          cartList,
          emptyDes: cartList === 0 && '还没有添加商品，快去添加吧～'
        })
      }
    }
  }
})
