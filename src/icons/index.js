import Vue from 'vue'
import IconSvg from '@/components/IconSvg.vue'
// 默认引入icons时，直接全局注册IconSvg组件
Vue.component(IconSvg.name, IconSvg)

const req = require.context('./svg', false, /\.svg$/)

function importAll(request) {
  request.keys().forEach(fileName => {
    request(fileName)
  })
}
importAll(req)

// const requireAll = requireContext => requireContext.keys().map(requireContext) // 简写
// const req = require.context('./svg', false, /\.svg$/)
// requireAll(req)
// 作者：花裤衩
// 链接：https://juejin.cn/post/6844903517564436493
