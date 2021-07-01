
<template>
  <div>
    <button @click="getEnlarge()">点击放大</button>
    <h3>{{ titles }}</h3>
    <h3>{{ message }}</h3>
  </div>
</template>

<script>
export default {
  props: ['titles'],
  data() {
    return {
      message: 'nihao'
    }
  },
  methods: {
    getTitle() {
      if (this.message === 'hello') {
        this.message = 'nihao'
      } else {
        this.message = 'hello'
      }
    },
    getEnlarge() {
      // 触发父组件事件
      this.$emit('enlarge')
    }
  }
}
</script>

<style>

</style>
