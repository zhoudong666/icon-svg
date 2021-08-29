import Vue from 'vue'
// import IconSvg from './IconSvg.vue'
import '@/icons'
// 默认引入icons时，直接全局注册IconSvg组件
// Vue.component(IconSvg.name, IconSvg)

// 直接全局 自动注册 globals 文件夹下所有组件
const req = require.context('./', true, /\.vue$/)
function importAll(request) {
  request.keys().forEach(fileName => {
    const comp = request(fileName)
    Vue.component(comp.default.name, comp.default)
  })
}
importAll(req)
