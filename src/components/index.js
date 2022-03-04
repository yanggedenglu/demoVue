import uploadAndProgress from './uploadAndProgress'

const component = {
  install: function(Vue) {
    Vue.component('upliad', uploadAndProgress)
  }
}

export default component
