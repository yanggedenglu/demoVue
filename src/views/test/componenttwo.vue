<template>
  <div>
    <button @click="reduce()">点击第二个方法缩小</button>
    <p>{{ buttonw }}</p>
  </div>
</template>

<script>
export default {
  props: ['buttonw'],
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
