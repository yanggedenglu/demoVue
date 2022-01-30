import uploadAndProgress from './uploadAndProgress'

const componet = {
  install: function(Vue) {
    Vue.componet('upliad', uploadAndProgress)
  }
}

export default componet
