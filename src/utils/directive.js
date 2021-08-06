const directives = {
  point: {
    update: function(el, binding, vnode) {
      // 监听点击事件
      el.addEventListener('click', () => {
        console.log('begin', binding.value)
        console.log('begin', el.disabled)
        if (!el.disabled) {
          el.disabled = true

          // if (binding.arg === false) {
          //   setTimeout(() => {
          //     el.disabled = false
          //   }, 3000)
          // }
        } else {
          if (!binding.value) {
            el.disabled = false
          }
        }
        console.log('after', binding.value)
        console.log('after', el.disabled)
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
