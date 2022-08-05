import uploadAndProgress from './uploadAndProgress'
import buttonGroup from './buttonGroup'

const component = {
  install: function(Vue) {
    Vue.component('upliad', uploadAndProgress)
    Vue.component('buttonGroup', buttonGroup)
  }
}

export default component
