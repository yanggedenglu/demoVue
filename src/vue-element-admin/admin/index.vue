<template>
  <div class="admin-page">
    <!-- 第一行标签 -->
    <one-rows ref="oneRow" @changeChart="changeChart" />
    <two-rows ref="twoRow" :data="data" />
    <three-rows ref="threeRow" :data="data" />

    <!-- css样式 毛玻璃特效 -->
    <!-- <div>
      <div class="img-blur" />
      <img src="../../assets/404_images/111.jpg" width="1284" height="2778">
    </div> -->

  </div>
</template>

<script>
import oneRows from './rows/oneRow.vue'
import twoRows from './rows/towRow.vue'
import threeRows from './rows/threeRow.vue'

const lineChartData = {
  one1: {
    actualData: [120, 82, 91, 154, 162, 140]
  },
  one2: {
    actualData: [180, 160, 151, 106, 145, 150]
  },
  one3: {
    actualData: [120, 90, 100, 138, 142, 130]
  },
  one4: {
    actualData: [120, 82, 91, 154, 162, 140]
  }
}
export default {
  components: {
    oneRows, twoRows, threeRows
  },
  data() {
    return {
      data: lineChartData.one1
    }
  },
  methods: {
    changeChart(value) {
      this.$refs.twoRow.changeChart(lineChartData[value])
    }
  }
}
</script>

<style scoped>
.admin-page{
  display: block;
  background-color: #f0f2f5;
  padding: 10px;
}
.img-blur{
  border-radius: 107px;
  border: 0px solid #fff;
  margin: 2000px 0px 0px 37px;
  width: 1213px;
  height: 320px;
  background-color: rgba(163, 163, 163, 0.3);
  position: absolute;
  display: inline-block;
  backdrop-filter: blur(10px);
}
</style>
