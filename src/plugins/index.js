import '@/components/globals' // 全局组件 自动导入

// import './element' // elementui的组件引入文件
// import './highlightjs' // 代码块高亮的 插件引入文件

// 二次改造 自动引入 plugins 下的各个组件插件 引入入口
const req = require.context('./', false, /\.js$/)
function importAll(request) {
  request.keys().forEach(fileName => {
    if (fileName !== './index.js') request(fileName)
  })
}
importAll(req)
