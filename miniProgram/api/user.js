// 导入封装的网络请求模块实例
import http from '../utils/http'

/**
 * 专门为微信小程序登录准备的接口
 * @param {*} code 
 */
export const wxLogin = (code) => http.get('/admin/user/wxLogin?code=' + code)

export const myLogin = (data) => {
  return http.post('/admin/user/login',data)
}

// ====================================================================
/**
 * @description 进行登录操作
 * @param {*} code 获取到的临时登录凭证
 * @returns Promise
 */
export const reqLogin = (code) => http.get(`/weixin/wxLogin/${code}`)

/**
 * @description 获取用户信息
 * @returns Promise
 */
export const reqUserInfo = () => {
  return http.get('/weixin/getuserInfo')
}

/**
 * @description 实现本地资源上传
 * @param {*} filePath 要上传的文件资源路径,可以是本地的文件也可以是一个网络资源
 * @param {*} name 文件对应的key
 * @returns Promise
 */
export const reqUploadFile = (filePath, name) => {
  return http.upload('/fileUpload', filePath, name)
}

/**
 * @description 更新用户信息
 * @param {*} userInfo 最新的头像和昵称
 * @returns Promise
 */
export const reqUpdateUserInfo = (userInfo) => {
  return http.post('/weixin/updateUser', userInfo)
}
