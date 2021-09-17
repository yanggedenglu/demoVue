<template>
  <div>
    <countTo ref="countTo" :start-val="startVal" :end-val="endVal" :duration="2000" />
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
      startVal: 0,
      endVal: 3000
    }
  },
  methods: {
    startCount() {
      this.$refs.countTo.start()
    },
    endCount() {
      this.$refs.countTo.pause()
    },
    resetCount() {
      this.$refs.countTo.reset()
    }
  }
}
</script>

<style>

</style>
