import point from './point'

const directives = {
  point
}

/**
Vue.directive('mydir', {
 bind: function () {
  // 只调用一次，指令第一次绑定到元素时调用，用于在绑定元素时执行一次的初始化动作。
  },
 update: function () {
  // 第一次是紧跟在 bind 之后调用，获得的参数是绑定的初始值，
  // 之后被绑定元素所在的模板更新时调用，而不论绑定值是否变化，可以忽略不必要的模板更新。
  },
 inserted: function () {
  // 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
  },
 componentUpdated: function () {
  // 被绑定元素所在模板完成一次更新周期时调用。
  },
 unbind: function () {
  // 只调用一次， 指令与元素解绑时调用。
  }
})

以上每个钩子函数都有几个参数可用：
  el：指令所绑定的元素，可以用来直接操作 DOM；
  binding：包含指令信息的一个对象；
  vnode：Vue 编译的生成虚拟节点；
  oldVnode：上一次的虚拟节点，仅在update和componentUpdated钩子函数中可用。

 */

export default {
  install(Vue) {
    //  Vue.directive( id, [definition] ) 方式注册全局指令
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  }
}
