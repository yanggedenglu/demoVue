<template>
  <div>
    <count-to ref="countTo" :start-val="startVal" :end-val="endVal" :duration="2000" />
    <el-button @click="startCount">start</el-button>
    <el-button @click="endCount">end</el-button>
    <el-button @click="resetCount">reset</el-button>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
export default {
  componets: {
    countTo
  },
  data() {
    return {
      startVal: 0, // 初始值
      endVal: 3000 // 结束值
    }
  },
  methods: {
    startCount() {
      // 开始
      this.$refs.countTo.start()
    },
    endCount() {
      // 暂停
      this.$refs.countTo.pause()
    },
    resetCount() {
      // 重置
      this.$refs.countTo.reset()
    }
  }
}
</script>

<style>

</style>
