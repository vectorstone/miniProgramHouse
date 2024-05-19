// 在使用toast方法是,可以传参参数,也可以不传入参数
// 如果需要传入参数,需要传入对象作为参数

const toast = ({
  title = '数据加载中',
  icon = 'none',
  duration = 2000,
  mask = true
} = {}) => {
  wx.showToast({
    title,
    icon,
    duration,
    mask
  })
}

const modal = (options = {}) => {
  // 在方法内部需要通过 promise 返回用户的操作
  // 如果用户点击了确定,需要通过 resolve 返回 true
  // 如果用户点击了取消,需要通过 resolve 返回false
  return new Promise((reslove) => {
    // 默认的参数
    const defaulutOpt = {
      title: '提示',
      content: '您确定要执行该操作吗?',
      confirmColor: '#f3514f'
    }

    // 通过 Object.assign方法将参数进行合并
    const opts = Object.assign({}, defaulutOpt, options)

    wx.showModal({
      // 将合并以后的参数通过展开运算符赋值给 wx.showModal 对象
      ...opts,
      complete({ confirm, cancle }) {
        confirm && reslove(true)
        cancle && reslove(false)
      }
    })
  })
}

// 如果其他 .js 文件,需要使用toast方法,需要先导入toast,然后进行调用才行
export { toast, modal }

// 如果有很多的.js文件,都需要调用 toast 方法
// 每次使用都需要导入toast,然后进行调用太麻烦了
// 可以将 toast 方法挂载到wx全局对象身上
// 如果想挂载到wx全局对象上这种写法生效,需要让当前的文件执行一次
wx.toast = toast
wx.modal = modal
