// observable 创建被检测的对象,对象中的属性会被转换为响应式数据
// action 函数用来显示的定义 action 方法
import { observable, action } from 'mobx-miniprogram'
import { getStorage } from '../utils/storage'

export const userStore = observable({
  // 定义响应式数据
  // token 身份令牌
  token: getStorage('token') || '',

  // 用户信息
  userInfo: getStorage('userInfo') || {},

  userPermsList: getStorage('userPermsList') || [],

  // 定义action
  // setToken 用来修改,更新token
  setToken: action(function (token) {
    // 在调用 setToken 方法时,需要传入 token 数据进行赋值
    this.token = token
  }),

  // 对用户信息进行赋值
  setUserInfo: action(function (userInfo) {
    this.userInfo = userInfo
  }),

  setUserPermsList: action(function (userPermsList) {
    this.userPermsList = userPermsList
  })
  
})
