// 创建WxRequest 类
// 通过类的方式来进行封装,会让代码更加具有复用性
// 也可以方便添加新的属性和方法
class WxRequest {
  // 定义实例属性,用来设置默认请求参数
  defaults = {
    baseURL: '', // 请求基准地址
    url: '', // 接口的请求路径
    data: null, //请求参数
    method: 'GET',
    // 请求头
    header: {
      'Content-type': 'application/json' // 设置数据的交互格式
    },
    timeout: 60000, //默认的超时时间,小程序默认的超时时长是 1 分钟
    isLoading: true // 是否显示loading的效果
  }

  // 定义默认的拦截器对象,默认的不需要对请求和响应做任何的拦截的动作
  interceptors = {
    // 请求拦截器
    request: (config) => config,
    // 响应拦截器
    response: (response) => response
  }

  // 定义数组队列
  // 初始值需要是一个空数组,用来存储请求队列,存储请求标识
  queue = []

  // 通过Object.assign 方法合并请求参数
  // 注意: 需要传入的参数,覆盖默认的参数,因此传入的参数需要放到最后
  constructor(params = {}) {
    this.defaults = Object.assign({}, this.defaults, params)
  }
  // request 实例方法接收一个对象类型的参数
  // 属性值 wx.request 方法调用时传递的参数保持一致

  request(options) {
    // 如果有 timerId就清楚
    this.timerId && clearTimeout(this.timerId)

    // 注意: 需要先合并完整的请求地址 (baseURL + url)
    options.url = this.defaults.baseURL + options.url
    // 合并请求参数
    options = { ...this.defaults, ...options }

    // upload自带了一个loading的效果,所以就不需要我们自己封装的loading的效果了
    if (options.isLoading && options.method !== 'UPLOAD') {
      // 显示loading的效果
      // wx.showLoading()
      // 判断 queue 队列是否为空,如果是空,就显示loading
      // 如果不是空,就不显示loading,不调用wx.showLoading()
      this.queue.length === 0 && wx.showLoading()
      // 然后立即向queue数组队列中添加请求标识
      // 每个标识代表是一个请求,标识是自定义的
      this.queue.push('request')
    }

    // 在请求发送之前,调用请求拦截器,新增或者修改请求参数
    options = this.interceptors.request(options)

    return new Promise((resolve, reject) => {
      if (options.method === 'UPLOAD') {
        wx.uploadFile({
          ...options,
          success: (res) => {
            // 需要将服务器返回的JSON字符串通过JSON.parse转成对象
            res.data = JSON.parse(res.data)
            // 合并参数
            const mergeRes = Object.assign({}, res, {
              config: options,
              isSuccess: true
            })
            resolve(this.interceptors.response(mergeRes))
          },
          fail: (err) => {
            const mergeErr = Object.assign({}, err, {
              config: options,
              isSuccess: false
            })
            resolve(this.interceptors.response(mergeErr))
          }
        })
      } else {
        wx.request({
          ...options,
          // 当接口调用成功时会触发 success 回调函数
          success: (res) => {
            // 在给响应拦截器传递参数时,需要将请求参数也一起传递
            // 方便进行代码的调试和进行其他的逻辑处理,需要先合并参数
            // 然后将合并的参数传递给响应拦截器
            // 不管是请求成功还是失败,都已经将响应的数据传递给了响应拦截器
            // 这时候在合并参数的时候,追加一个属性: isSuccess
            // 如果属性值为true,说明执行了 success 回调函数
            // 如果属性值为false,说明执行了 fail 回调函数
            const mergeRes = Object.assign({}, res, {
              config: options,
              isSuccess: true
            })
            resolve(this.interceptors.response(mergeRes))
          },

          // 当接口调用失败时会触发 fail 回调函数
          fail: (err) => {
            // 在给响应拦截器传递参数时,需要将请求参数也一起传递
            // 方便进行代码的调试和进行其他的逻辑处理,需要先合并参数
            // 然后将合并的参数传递给响应拦截器
            const mergeErr = Object.assign({}, err, {
              config: options,
              isSuccess: false
            })
            resolve(this.interceptors.response(mergeErr))
          },

          // 接口调用结束的回调函数（调用成功、失败都会执行）,里面需要隐藏loading
          complete: () => {
            if (options.isLoading && options.method !== 'UPLOAD') {
              // wx.hideLoading()
              // 在每一个请求结束之后,都会执行 complete 回调函数,每次从queue 队列中删除一个标识
              this.queue.pop()

              this.queue.length === 0 && this.queue.push('request')
              this.timerId = setTimeout(() => {
                this.queue.pop()
                // 在删除标识以后,需要判断目前的queue数组是否为空
                // 如果为空,说明并发请求完成了,就需要隐藏loading,调用对应的wx.hideLoading()方法
                this.queue.length === 0 && wx.hideLoading()
                clearTimeout(this.timerId)
              }, 1)
            }
          }
        })
      }
    })
  }

  // 封装get方法
  get(url, data = {}, config = {}) {
    return this.request(Object.assign({ url, data, method: 'GET' }, config))
  }

  // 封装post方法
  post(url, data = {}, config = {}) {
    return this.request(Object.assign({ url, data, method: 'POST' }, config))
  }

  // 封装put方法
  put(url, data = {}, config = {}) {
    return this.request(Object.assign({ url, data, method: 'PUT' }, config))
  }

  // 封装delete方法
  delete(url, data = {}, config = {}) {
    return this.request(Object.assign({ url, data, method: 'DELETE' }, config))
  }

  // 封装处理并发请求的方法
  all(...promise) {
    console.log(promise)
    // 通过展开运算符接受传递的参数
    // 那么展开运算符会将传入的参数转成数组
    return Promise.all(promise)
  }

  // upload实例方法,用来对 wx.uploadFile进行封装
  upload(url, filePath, name = 'file', config = {}) {
    return this.request(
      Object.assign({ url, filePath, name, method: 'UPLOAD' }, config)
    )
  }
}

export default WxRequest
