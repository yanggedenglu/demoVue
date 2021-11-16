<template>
  <div class="two-row-page">
    <el-row>
      <el-col :span="24" class="block_col">
        <div id="main" style="width:100%;height:300px;line-height:20px;background-color:#fff;" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      myChart: null
    }
  },
  watch: {
    data: {
      // 需要监听的数据的深度，一般用来监听对象中某个属性的变化,数组字符串一般不需要
      deep: true,
      // watch中需要具体执行的方法
      handler() {
        this.createChart()
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.myChart = echarts.init(document.getElementById('main'))
      this.createChart()
    },
    changeChart(data) {
      this.data.actualData = data.actualData
    },
    createChart() {
      console.log(this.data)
      // 绘制图表
      this.myChart.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: this.data.actualData
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
.block_col{
  padding: 5px;
}
</style>
