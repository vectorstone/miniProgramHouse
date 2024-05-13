// pages/goods/detail/index.js
import { getHouseDetail } from '@/api/goods'
import { reqAddCart, reqCartList } from '@/api/cart'
// 导入behaviros
import { userBehavior } from '@/behaviors/userBehavior'
Page({
  behaviors: [userBehavior],
  // 页面的初始数据
  data: {
    house: {}, // 商品详情
    show: false, // 控制加入购物车和立即购买弹框的显示
    count: 1, // 商品购买数量，默认是 1
    blessing: '', // 祝福语
    buyNow: '', // 是否立即购买, 加入购物车0,立即购买1
    allCount: ''
  },

  // 点击大图可以预览的功能
  previewImg() {
    // 调用预览图片的 API
    const houseAttachments = this.data.house.houseAttachment
    console.log(houseAttachments)
    const medias = houseAttachments
      .filter((item) => item.contentType === 0)
      .map((item) => item.url)
    console.log(medias)
    wx.previewImage({
      urls: medias
    })
  },

  onLoad(options) {
    // 获取传递过来的商品的id
    console.log(options)
    this.houseId = options.houseId
    // 查询获取商品详细的数据
    this.houseDetail()

    // 计算购物车里面商品的数量
    // this.getCartCount()
  },
  async houseDetail() {
    // const res = await getHouseDetail(this.houseId)
    // 1777925917874634753 wendy 横板视频
    // const res = await getHouseDetail('1777925917874634753')
    // 1780103377428987905 竖版视频
    const res = await getHouseDetail('1780103377428987905')
    console.log(res)
    const { item: house } = res.data
    console.log(house)
    this.setData({ house })
  },

  // 加入购物车
  // handleAddcart() {
  //   this.setData({
  //     show: true,
  //     buyNow: 0
  //   })
  // },

  // 立即购买
  // handeGotoBuy() {
  //   this.setData({
  //     show: true,
  //     buyNow: 1
  //   })
  // },

  // 点击关闭弹框时触发的回调
  // onClose() {
  //   this.setData({ show: false })
  // },

  // 监听是否更改了购买数量
  // onChangeGoodsCount(event) {
  //   console.log(event.detail)
  //   // const { detail: count } = event
  //   this.setData({ count: Number(event.detail) })
  // },

  // 弹框的确定按钮
  // async handleSubmit() {
  //   // 解构获取数据
  //   const { token, count, blessing, buyNow } = this.data
  //   const goodsId = this.goodsId

  //   // 如果没有 token ，让用户新登录
  //   if (!this.data.token) {
  //     wx.navigateTo({
  //       url: '/pages/login/login'
  //     })

  //     return
  //   }

  //   // vant的step步进器里面已经验证过了
  //   // // 将用户输入的值转成 Number 类型
  //   // const count = Number(event.detail)
  //   // // 验证购买数量的正则
  //   // const reg = /^([1-9]|[1-9]\d|1\d{2}|200)$/
  //   // // 使用正则验证
  //   // const res = reg.test(count)
  //   // // 如果验证没有通过，直接返回，不执行后续的逻辑
  //   // if (!res) return

  //   // 加入购物车
  //   if (buyNow === 0) {
  //     // 加入购物车
  //     const res = await reqAddCart({ goodsId, count, blessing })

  //     if (res.code === 200) {
  //       wx.showToast({
  //         title: '加入购物车成功'
  //       })

  //       // 在加入购物车成功以后,需要重新计算购物车商品的购买数量
  //       this.getCartCount()

  //       this.setData({
  //         show: false
  //       })
  //     }
  //   } else {
  //     // 立即购买
  //     wx.navigateTo({
  //       url: `/modules/orderPayModule/pages/order/detail/detail?goodsId=${goodsId}&blessing=${blessing}`
  //     })
  //   }
  // },

  // 计算购买数量
  // async getCartCount() {
  //   // 如果没有 token ，说明用户是第一次访问小程序，没有进行登录过
  //   if (!this.data.token) return

  //   // 获取购物的商品
  //   const res = await reqCartList()

  //   if (res.data.length !== 0) {
  //     // 购物车商品累加
  //     let allCount = 0

  //     // 获取购物车商品数量
  //     res.data.forEach((item) => {
  //       allCount += item.count
  //     })

  //     // 将购物车购买数量赋值
  //     this.setData({
  //       // 展示的数据要求是字符串
  //       allCount: (allCount > 99 ? '99+' : allCount) + ''
  //     })
  //   }
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
