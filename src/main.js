import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import './icons/svg/friend-fields.svg'
// import './icons/svg/search.svg'
// import './icons/svg/save.svg'

import './icons' // 代替单个 icons里的 svg 文件导入

import './style/global.css'
// 作为测试,直接引入全部组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
