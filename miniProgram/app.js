// import {toast} from './utils/extendApi'
import {
  setStorage,
  getStorage,
  removeStorage,
  clearStorage,
  asyncSetStorage,
  asyncGetStorage,
  asyncRemoveStorage,
  asyncClearStorage
} from './utils/storage'
import './utils/extendApi'
App({
  // 定义全局共享的数据
  globalData: {
    address: {}
  },
  //四个异步的本地数据的api封装测试
  async onShow() {
    // 存储测试
    // const res = await asyncSetStorage('token', '111222333').then(() => {
    //   console.log(res)
    // })
    // 获取本地存储中指定 key 的数据
    // const res = await asyncGetStorage('token').then(() => {
    //   console.log(res)
    // })
    // 移除指定key的测试
    // const res = await asyncRemoveStorage('token').then(() => {
    //   console.log(res)
    // })
    // 移除本地存储中的所有的数据
    // const res = await asyncClearStorage().then(() => {
    //   console.log(res)
    // })
    // 获取当前小程序的账号信息
    // const accountInfo = wx.getAccountInfoSync()
    // console.log(accountInfo.miniProgram.envVersion)
  }

  // 四个同步的本地数据的api封装测试
  // onShow() {
  //   // 存储数据
  //   // setStorage('token2', '123434333')
  //   // 读取数据
  //   const res = getStorage('token')
  //   console.log(res)
  //   // 清空指定的数据
  //   removeStorage('token')
  //   // 清空所有的数据
  //   clearStorage()
  // }
  // // onShow() {
  // //   toast({title:'测试',icon:'none',duration:3000,mask:true})
  // // }
  // async onShow() {
  //   // .js挂载,传入对象的方式
  //   // toast({title:'测试',icon:'none',duration:3000,mask:true})
  //   // .js挂载,不传入对象的方式
  //   // toast()
  //   // wx挂载的方式,传入对象的方式
  //   // wx.toast({title:'测试',icon:'none',duration:3000,mask:true})
  //   // wx挂载的方式,不传入对象的方式
  //   // wx.toast()
  //   // 不传入参数的演示
  //   // const res = await wx.modal()
  //   // console.log(res)
  //   // 传入参数的演示
  //   const res = await wx.modal({
  //     title: '提示+++',
  //     showCancel: false
  //   })
  //   console.log(res)
  // }
})
