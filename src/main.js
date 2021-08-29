import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入插件，放在此处引用是为了下面的router和store中可能会用到某些插件的功能
import './plugins/index'
import './style/global.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
