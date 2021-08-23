import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './icons/svg/friend-fields.svg'
import './icons/svg/search.svg'
import './icons/svg/save.svg'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
