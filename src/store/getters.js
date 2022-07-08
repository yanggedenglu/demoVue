const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
/**
 * getters函数相当于Vue中的computed计算属性，getter的返回值会根据它的依赖被缓存起来，
 * 且只有当它的依赖发生了改变才会被重新计算，getters可以用于监听state中值的变化，返回计算后的结果。
 */
export default getters
