// /modules/settingModule/pages/profile/profile.js
import { userBehavior } from './behavior'
import { reqUploadFile, reqUpdateUserInfo } from '../../../../api/user'
import { getStorage, setStorage } from '../../../../utils/storage'
import { toast } from '../../../../utils/extendApi'
Page({
  // 注册behavior
  behaviors: [userBehavior],
  // 页面的初始数据
  data: {
    isShowPopup: false // 控制更新用户昵称的弹框显示与否
  },

  async updateUserInfo() {
    const res = await reqUpdateUserInfo(
      this.data.userInfo.name,
      this.data.userInfo.headUrl
    )
    if (res.code === 200) {
      // 用户信息更新成功之后,需要将最新的用户信息存储到本地
      setStorage('userInfo', this.data.userInfo)

      // 用户信息更新成功以后,同时同步到 Store
      this.setUserInfo(this.data.userInfo)

      // 给用户提示
      toast({ title: '用户信息更新成功' })
      wx.navigateBack()
    }
  },

  // 显示修改昵称弹框
  onUpdateNickName() {
    this.setData({
      isShowPopup: true,
      'userInfo.name': this.data.userInfo.name
    })
  },

  // 弹框取消按钮
  cancelForm() {
    this.setData({
      isShowPopup: false
    })
  },
  async chooseAvatar(event) {
    // console.log(event)
    const { avatarUrl } = event.detail

    const res = await reqUploadFile(avatarUrl, 'file')

    // console.log(res)

    this.setData({
      // 更新的userstore里面的信息
      'userInfo.headUrl': res.data.filePath
    })
  },
  updateNickName(event) {
    // console.log(event)
    const { nickname: name } = event.detail.value
    this.setData({
      // 更新的userstore里面的信息
      'userInfo.name': name,
      // 隐藏弹窗
      isShowPopup: false
    })
  }
})
