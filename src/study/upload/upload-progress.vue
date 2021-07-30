<template>
  <div>
    <el-progress :percentage="percent" :status="status" />
  </div>
</template>

<script>
export default {
  props: {
    per: { type: Number, default() { return {} } }
  },
  data() {
    return {
      percent: 0,
      count: 0,
      status: null
    }
  },
  methods: {
    getData(data) {
      this.count++
      this.percent += Math.round((1 / this.per) * 100)
      if (data === false) {
        if (this.count === this.per) {
          this.percent = 100
          this.status = 'exception'
        }
      } else {
        if (this.count === this.per) {
          this.percent = 100
          this.status = 'success'
        }
      }
    },
    clear() {
      this.percent = 0
    }
  }
}
</script>

<style>

</style>
