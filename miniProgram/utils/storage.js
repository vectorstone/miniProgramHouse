/**
 * @description 存储本地的数据
 * @param {*} key 本地缓存中指定的key
 * @param {*} value 需要缓存的数据
 */
export const setStorage = (key, value) => {
  try {
    wx.setStorageSync(key, value)
  } catch (error) {
    console.error(`存储指定${key} 数据发生了异常`, error)
  }
}

/**
 * @description 读取本地的数据
 * @param {*} key
 */
export const getStorage = (key) => {
  try {
    const value = wx.getStorageSync(key)
    if (value) {
      return value
    }
  } catch (error) {
    console.error(`读取指定${key} 数据发生了异常`, error)
  }
}

/**
 * @description 移除指定key的数据
 * @param {*} key
 */
export const removeStorage = (key) => {
  try {
    wx.removeStorageSync(key)
  } catch (error) {
    console.error(`移除指定${key} 数据发生了异常`, error)
  }
}

/**
 * @description 清空本地数据的方法
 */
export const clearStorage = () => {
  try {
    wx.clearStorageSync()
  } catch (error) {
    console.error('清空本地数据时发生了异常', error)
  }
}

// ===========下面的是异步的几个方法

/**
 * @description 异步参与指定 key 到本地存储的数据中
 * @param {*} key 本地缓存中指定的key
 * @param {*} data 需要缓存的数据
 */
export const asyncSetStorage = (key, data) => {
  return new Promise((resolve) => {
    wx.setStorage({
      key,
      data,
      // 无论成功或者失败都会执行的方法
      complete(res) {
        resolve(res)
      }
    })
  })
}

/**
 * @description 异步从本地获取指定 key 的数据
 * @param {*} key 需要获取数据的key
 */
export const asyncGetStorage = (key) => {
  return new Promise((resolve) => {
    wx.getStorage({
      key,
      complete(res) {
        resolve(res)
      }
    })
  })
}

/**
 * @description 异步从本地移除指定 key 的数据
 * @param {*} key 需要获取数据的key
 */
export const asyncRemoveStorage = (key) => {
  return new Promise((resolve) => {
    wx.removeStorage({
      key,
      complete(res) {
        resolve(res)
      }
    })
  })
}

/**
 * @description 移除本地存储中的所有的数据
 */
export const asyncClearStorage = () => {
  return new Promise((resolve) => {
    wx.clearStorage({
      complete(res){
        resolve(res)
      }
    })
  })
}