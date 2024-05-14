// pages/login/login.js
// 导入封装通用模块方法
import { toast } from '../../utils/extendApi'
// 导入接口 API 函数
import { reqLogin, reqUserInfo, myLogin } from '@/api/user'
// 导入本地存储 api
import { setStorage } from '../../utils/storage'
// 导入ComponentWithStore方法
import { ComponentWithStore } from 'mobx-miniprogram-bindings'
// 使用 ComponentWithStore 方法替换 Component 方法构造页面
// 导入 store 对象
import { userStore } from '../../stores/userstore'

import { debounce } from 'miniprogram-licia'

ComponentWithStore({
  // 让页面和 Store 对象建立关联
  storeBindings: {
    store: userStore,
    fields: ['token', 'userInfo', 'userPermsList'],
    actions: ['setToken', 'setUserInfo', 'setUserPermsList']
  },
  methods: {
    login: debounce(async function () {
      // 先执行自己的登录的接口
      const res = await myLogin({
        password: 'wxg741852',
        username: 'gavin'
      })
      console.log(res)
      const { token } = res.data
      setStorage('token', token)
      // 将自定义登录态token 存储到Store对象
      this.setToken(token)
      // 获取用户信息
      // 将用户信息存储到本地
      setStorage('userInfo', data.sysUser)
      setStorage('userPermsList', data.userPermsList)
      // 将用户信息存储到Store对象中
      this.setUserInfo(data.sysUser)
      this.setUserPermsList(data.userPermsList)

      // 登录成功并获取用户的信息成功之后,需要返回上一级的页面
      wx.navigateBack()

      // wx.login({
      //   success: async ({ code }) => {
      //     if (code) {
      //       // 在获取到临时登录凭证 code 以后,需要传递给开发者服务器
      //       const res = await reqLogin(code)
      //       console.log(res)
      //       const { token } = res.data
      //       setStorage('token', token)
      //       // 将自定义登录态token 存储到Store对象
      //       this.setToken(token)
      //       // 获取用户信息
      //       this.getUserInfo()

      //       // 登录成功并获取用户的信息成功之后,需要返回上一级的页面
      //       wx.navigateBack()
      //     } else {
      //       toast({ title: '授权失败,请重新登录' })
      //     }
      //   }
      // })
    }, 500),

    // 获取用户信息
    async getUserInfo() {
      // 调用接口,获取用户信息
      const { data } = await reqUserInfo()
      // 将用户信息存储到本地
      setStorage('userInfo', data)
      // 将用户信息存储到Store对象中
      this.setUserInfo(data)
    }
  }
})
