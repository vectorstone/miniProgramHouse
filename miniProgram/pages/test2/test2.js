// // pages/test2/test2.js
// // 从async-validator 中引入构造函数
// import Schema from 'async-validator'
// Page({
//   data: {
//     name: ''
//   },

//   // 对数据进行验证
//   onValidator() {
//     // 定义验证规则
//     const rules = {
//       // key 验证规则的名字,名字需要和验证的数据保持一致
//       name: [
//         // required 是否是必填项
//         // message 如果验证失败,提示错误的内容
//         { required: true, message: 'name不能为空' },

//         // type 验证数据的类型
//         { type: 'string', message: 'name不是字符串' },

//         // min最少位置,max最大位置
//         { min: 2, max: 3, message: '名字最少 2个字,最多3个字' }

//         // pattern 使用正则对数据进行验证
//         // { pattern: '', message: '' }

//         // validator 自定义验证规则
//         // { validator: () => {} }
//       ]
//     }

//     const validator = new Schema(rules)

//     // 需要调用validate 实例方法,对数据进行验证
//     // 第一个参数: 需要验证的数据,要求数据是一个对象
//     // validate 方法只会验证和验证规则同名的字段
//     // 第二个参数: 是一个回调眼熟
//     validator.validate(this.data, (errors, fields) => {
//       // 如果验证成功, errors 是一个 null
//       // 如果验证失败, errors 是一个数组,数组每一项是错误信息
//       // fields 是需要验证的属性,属性值是一个数组,数组中也包含着错误信息
//       if (errors) {
//         console.log('验证失败')
//         console.log(errors)
//         console.log(fields)
//       } else {
//         console.log('验证成功')
//       }
//     })
//   }
// })


function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length === 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  onShareAppMessage() {
    return {
      title: 'video',
      path: 'page/component/pages/video/video'
    }
  },

  onReady() {
    this.videoContext = wx.createVideoContext('myVideo')
  },

  onHide() {

  },

  inputValue: '',
  data: {
    src: '',
    danmuList:
    [{
      text: '第 1s 出现的弹幕',
      color: '#ff0000',
      time: 1
    }, {
      text: '第 3s 出现的弹幕',
      color: '#ff00ff',
      time: 3
    }],
  },

  bindInputBlur(e) {
    this.inputValue = e.detail.value
  },

  bindButtonTap() {
    const that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success(res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },

  bindVideoEnterPictureInPicture() {
    console.log('进入小窗模式')
  },

  bindVideoLeavePictureInPicture() {
    console.log('退出小窗模式')
  },

  bindPlayVideo() {
    console.log('1')
    this.videoContext.play()
  },
  bindSendDanmu() {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },

  videoErrorCallback(e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  }
})