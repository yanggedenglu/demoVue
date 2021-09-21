<template>
  <div>
    <h1>1</h1>
    <el-select v-model="pathId" placeholder="请选择" @change="change">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="row" placeholder="请选择" @change="change">
      <el-option
        v-for="item in rows"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <div class="log-viewer">
      <br>
      <!-- 定义的table作为存放日志数据标签的父类 -->
      <table />
    </div>
  </div>
</template>

<script>
import { getLog, Close } from '@/api/log'
export default {
  data() {
    return {
      myInterval: '',
      log: '',
      row: 200,
      pathId: 1,
      options: [
        { label: 'info', value: 1 },
        { label: 'error', value: 2 }
      ],
      rows: [
        { label: 100, value: 100 },
        { label: 200, value: 200 },
        { label: 300, value: 300 }
      ]
    }
  },
  created() {
    // 后端重置读取位置
    Close()
    this.start()
    // 实现轮询读取日志
    // this.myInterval = window.setInterval(() => {
    //   setTimeout(this.getLog(), 0)
    // }, 1000)
  },
  destroyed() {
    // 关闭轮询
    this.close()
    // clearInterval(this.myInterval)
  },
  methods: {
    // 实现轮询读取日志
    start() {
      this.myInterval = window.setInterval(() => {
        setTimeout(this.getLog(), 0)
      }, 1000)
    },
    // 关闭轮询
    close() {
      clearInterval(this.myInterval)
    },
    // 读取日志
    getLog() {
      const vm = this
      getLog({ 'pathId': this.pathId, 'row': this.row }).then(res => {
        if (res.data !== '') {
          this.log = res.data
          const split = this.log.split('\n')
          split.forEach(item => {
            // const row = document.createElement('tr')
            // const col = document.createElement('td')
            const pre = document.createElement('pre')
            pre.rel = 'stylesheet'
            pre.type = 'text/css'
            pre.innerHTML = item
            // col.appendChild(pre)
            // row.appendChild(col)
            vm.$el.querySelector('.log-viewer > table').appendChild(pre)
          })
        }
      })
    },
    change() {
      // 充值状态
      this.close()
      Close()
      this.log = ''
      // 创建新table
      const vm = this
      vm.$el.querySelector('.log-viewer > table').remove('pre')
      const table = document.createElement('table')
      table.rel = 'stylesheet'
      table.type = 'text/css'
      vm.$el.querySelector('.log-viewer').appendChild(table)
      // 开启轮询
      this.start()
    }
  }
}
</script>

<style lang="scss">
html{
  line-height: 1
}

table{
  width:90%;
  margin-left:10px;
  background-color: #f5f5f5;
}

pre {
  word-wrap: break-word;
  white-space: pre-wrap;
  margin: 5px 0px ;
  font-size: 0.875em;
  color: #4a4a4a;
}
pre:hover{
  background-color: #dbdbdb;
}
</style>
