<template>
  <div>
    <h3>MockData开发模拟数据的server简单创建</h3>
    <div>请求结果见控制台</div>
    <pre>
       <code v-text='aaa'>
       </code>
     </pre>
    <pre>
        <code class="javascript" style="text-align:left;">
    const bodyPaser = require('body-parser')
    const Mock = require('mockjs')
    const path = require('path')
    const chokidar = require('chokidar') //此模块用于监听文件内容更改

    function registerRoutes(app) {
      let mockLastIndex

      const user = require('./user') // 引入模拟的各个模块
      let mocks = [...user] // 存放模拟接口的数组
      mocks.forEach(item => {
        item.url = new RegExp(`${item.url}`) // 对请求地址处理
        let isFn = item.response instanceof Function

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
      let mockRoutes = registerRoutes(app)
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

              let mockRoutes = registerRoutes(app)
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
        </code>
    </pre>
  </div>
</template>

<script>
import axios from 'axios'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
export default {
  name: 'MockData',
  async mounted() {
    hljs.highlightAll()
    const info = await axios.get('/user/info?id=12', { params: { height: 11 } })
    console.log('/user/info', info.data)

    const age = await axios.post('/user/age', { data: 111 })
    console.log('/user/age', age.data)

    const date = await axios.post('/user/date', { someday: '2021/8/28' })
    console.log('/user/date', `11`, date.data)

    this.$nextTick(() => {
      var codeEle = document.querySelectorAll('code')
      for (let i = 0; i < codeEle.length; i++) {
        const line = codeEle[i].innerHTML.replace(/\n/g, '</li><li>').slice(5)
        codeEle[i].innerHTML = `<ul>${line}</li></ul>`
      }
    })
  },
  data() {
    return {
      aaa: `
<div>highlight.js使用 测试</div>
<button>
  <i>123</i>
</button>
设置行号样式
/* 语法高亮的行号样式 */
.hljs ul {
  list-style: decimal;
  margin: 0 0 0 40px !important;
  padding: 0;
}
.hljs li {
  list-style: decimal-leading-zero;
  border-left: 1px solid #ddd !important;
  padding: 2px 5px !important;
  margin: 0 !important;
  line-height: 14px;
  width: 100%;
  box-sizing: border-box;
}
.hljs li:nth-of-type(even) {
  background-color: rgba(255, 255, 255, 0.015);
  color: inherit;
}

`
    }
  }
}
</script>

<style lang="scss" scoped></style>
