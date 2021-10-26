const bodyPaser = require('body-parser')
const Mock = require('mockjs')
const path = require('path')
const chokidar = require('chokidar') // 此模块用于监听文件内容更改

function registerRoutes(app) {
  let mockLastIndex

  const user = require('./user') // 引入模拟的各个模块
  const mocks = [...user] // 存放模拟接口的数组
  mocks.forEach(item => {
    item.url = new RegExp(`${item.url}`) // 对请求地址处理
    const isFn = item.response instanceof Function

    // webpack v4 官方例子
    // devServer: {
    //   before: function(app, server) {
    //
    //     app.get('/some/path', function(req, res) {   // 此时就可监听 '/some/path' 接口
    //       res.json({ custom: 'response' });
    //     });
    //   }
    // }
    app[item.type || 'get'](item.url, function(req, res) {
      console.log('request invoke 请求地址', req.path)
      res.json(Mock.mock(isFn ? item.response(req, res) : item.response))
    })

    mockLastIndex = app._router.stack.length
  })
  return {
    mockRoutesLength: mocks.length,
    mockStartIndex: mockLastIndex - mocks.length
  }
}

module.exports = app => {
  app.use(bodyPaser.json())
  app.use(bodyPaser.urlencoded({ extended: true }))
  const mockRoutes = registerRoutes(app)
  var mockRoutesLength = mockRoutes.mockRoutesLength
  var mockStartIndex = mockRoutes.mockStartIndex

  const mockDir = path.join(process.cwd(), 'mock') // mock文件夹
  function unregistRoutes() {
    // 取消注册过的地址路由
    Object.keys(require.cache).forEach(i => {
      if (i.includes(mockDir)) {
        delete require.cache[require.resolve(i)]
      }
    })
  }

  chokidar
    .watch(mockDir, {
      ignored: /server/,
      ignoreInitial: true
    })
    .on('all', (event, path) => {
      // 更改和新增文件 都执行
      if (event === 'change' || event === 'add') {
        try {
          app._router.stack.splice(mockStartIndex, mockRoutesLength)

          unregistRoutes()

          const mockRoutes = registerRoutes(app)
          mockRoutesLength = mockRoutes.mockRoutesLength
          mockStartIndex = mockRoutes.mockStartIndex
        } catch (err) {
          console.log(err)
        }
      }
    })
}

/**
 * 非实时监控接口文件的写法
 */
// function registerRoutes(app) {
//   const user = require('./user')  // 引入模拟的各个模块
//   let mocks = [...user] // 存放模拟接口的数组
//   mocks.forEach(item => {
//     item.url = new RegExp(`${item.url}`) // 对请求地址处理
//     let isFn = item.response instanceof Function
//     app[item.type || 'get'](item.url, function(req, res) {
//       console.log('request invoke 请求地址', req.path)
//       res.json(Mock.mock(isFn ? item.response(req, res) : item.response))
//     })
//   })
// }
// module.exports = app => {
//   app.use(bodyPaser.json())
//   app.use(bodyPaser.urlencoded({ extended: true }))
//    registerRoutes(app)
// }
