const directives = {
  point: {
    update: function(el, binding, vnode) {
      // 监听点击事件
      el.addEventListener('click', () => {
        if (!el.disabled) {
          el.disabled = true
          setTimeout(() => {
            el.disabled = false
          }, 30000)
        }
      })
    }
  }
}
export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  }
}
