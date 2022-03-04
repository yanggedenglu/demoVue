<template>
  <div>
    <p>grandson  ----</p>
  </div>
</template>

<script>
export default {
  created() {
    console.log('孙子组件', this.$attrs, this.grandSon)
    // $attrs获取非props属性
  },
  // 跨组件级接收父组件以上的属性 provide-inject
  inject: ['grandSon']
}
</script>

<style scoped>

</style>
