// pages/share/share.js
import Schema from 'async-validator'
Page({
  /**
   * Page initial data
   */
  data: {
    shareId: ''
  },

  async navigateToShare() {
    const { valid } = await this.validatorAddress(this.data)

    // 如果 valid 等于 false,说明验证失败,就不执行后续的逻辑
    if (!valid) return

    // 验证通过后再跳转
    wx.navigateTo({
      url: '/modules/goodModule/pages/goods/list/list?shareId=' + this.data.shareId
    })
  },

  validatorAddress(params) {
    // 包含大小写字母,或数字,或中文字符
    const nameRegExp = '^[a-zA-Z\\d\\u4e00-\u9fa5]+$'
    // 验证手机号需要符合中国大陆手机号码的格式
    const phoneReg = '^1(?:3\\d|4[4-9]|5[0-35-9]|6[67]|7[0-8]|8\\d|9\\d)\\d{8}$'

    const numberReg = '^[1-9]d*$'
    const nubmerReg2 = '\\d+'
    // 创建验证规则
    // 定义验证规则
    const rules = {
      // key 验证规则的名字,名字需要和验证的数据保持一致
      shareId: [
        { required: true, message: 'shareId不能为空' },
        // { type: 'number', message: 'shareId必须是数字' }
        { pattern: nubmerReg2, message: 'shareId必须是数字' }
      ]
    }

    const validator = new Schema(rules)

    // 我们希望将验证结果通过 Promise 的形式返回给函数的调用者
    return new Promise((resolve) => {
      validator.validate(params, (errors) => {
        if (errors) {
          wx.toast({ title: errors[0].message })
          // 如果验证失败,则返回valid属性,值为 false
          resolve({ valid: false })
        } else {
          // 如果验证成功,则返回valid属性,值为 true
          resolve({ valid: true })
        }
      })
    })
  },

  // 转发功能
  onShareAppMessage() {
    // return {
    //   title: '对方向你丢来了一堆房子',
    //   path: '/pages/index/index',
    //   imageUrl: '../../assets/images/love.jpg'
    // }
  },

  // 转发到朋友圈功能
  onShareTimeline() {}
})
