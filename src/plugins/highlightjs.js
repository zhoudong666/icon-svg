import Vue from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

var vueHighlightJS = {}
vueHighlightJS.install = function install(Vue) {
  Vue.directive('highlightjs', {
    deep: true,
    inserted: function bind(el, binding) {
      // 此处 通过 nextick 来处理页面所有代码块的 行坐标
      Vue.nextTick(() => {
        var codeEle = document.querySelectorAll('code')
        for (let i = 0; i < codeEle.length; i++) {
          const line = codeEle[i].innerHTML.replace(/\n/g, '</li><li>').slice(5)
          codeEle[i].innerHTML = `<ul><li>${line}</li></ul>`
        }
      })

      // on first bind, highlight all targets
      var targets = el.querySelectorAll('code')
      for (let i = 0; i < targets.length; i += 1) {
        // 处理指令后面 直接跟的是需要渲染的代码块
        if (typeof binding.value === 'string') {
          targets[i].textContent = binding.value
        }
        // hljs.highlightElement(targets[i])  // highlight旧的api
      }
      hljs.highlightAll() // highlight新的api
    },
    componentUpdated: function componentUpdated(el, binding) {
      // after an update, re-fill the content and then highlight
      var targets = el.querySelectorAll('code')
      for (let i = 0; i < targets.length; i += 1) {
        if (typeof binding.value === 'string') {
          targets[i].textContent = binding.value
        }
      }
      hljs.highlightAll() // highlight新的api
    }
  })
}

// 自动注册 方式 一
// if (typeof window !== 'undefined' && window.Vue) {
//   // 挂载在window上的自动安装，也就是通过script标签引入时不需要手动调用Vue.use()
//   vueHighlightJS.install(window.Vue)
// }

// 自动注册插件 方式 二
// if (typeof window !== 'undefined' && window.Vue) {
//   window.Vue.use(vueHighlightJS)
// }

Vue.use(vueHighlightJS)
// vueHighlightJS.install(Vue)   // 二选一

export default vueHighlightJS
