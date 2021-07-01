<template>
    <button @click="reduce()">点击第二个方法缩小</button>
</template>

<script>
export default {
  data() {
    return {
        message: 'dajihao'
    }
  },
  methods: {
    reduce() {
      this.$emit('enlargetwo', 1)
    }
  }
}
</script>

<style>

</style>