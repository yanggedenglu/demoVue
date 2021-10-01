<template>
  <div>
    <h1>1</h1>
    <div style="float:left;">
      <el-select v-model="log_pathId" placeholder="请选择" @change="logChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="primary" style="margin-left:10px;" @click="getBeforeLog">上一页</el-button>
    </div>
    <div style="float:right;">
      <el-select v-model="log_level" placeholder="请选择日志级别" clearable style="margin-left:10px;">
        <el-option
          v-for="item in logLevels"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input v-model="log_text" placeholder="请输入查找内容" clearable style="margin-left:10px;width:300px;" />
      <el-button type="primary" style="margin-left:10px;" @click="logQuery">查询</el-button>
    </div>
    <div class="log-viewer">
      <table />
    </div>
  </div>
</template>

<script>
import { getLog, Close, getBeforeLog } from '@/api/log'
export default {
  data() {
    return {
      myInterval: '',
      log: '',
      row: 200,
      log_pathId: 1,
      log_level: '',
      log_text: '',
      options: [
        { label: 'info', value: 1 },
        { label: 'error', value: 2 }
      ],
      logLevels: [
        { label: 'INFO', value: 'INFO' },
        { label: 'ERROR', value: 'ERROR' },
        { lebel: 'WARN', value: 'WRAN' }
      ]
    }
  },
  created() {
    // 后端重置读取日志信息位置
    Close()
    this.start()
  },
  destroyed() {
    this.logClose()
  },
  methods: {
    start() {
      // 实现轮询读取日志
      this.myInterval = window.setInterval(() => {
        setTimeout(this.getLogFile(), 0)
      }, 1000)
    },
    // 读取日志
    getLogFile() {
      const vm = this
      getLog({ 'pathId': this.log_pathId, 'row': this.row }).then(res => {
        if (res.data !== '') {
          this.log += res.data
          const split = res.data.split('\n')
          split.forEach(item => {
            const pre = this.createPre(item, 'pre')
            vm.$el.querySelector('.log-viewer > table').appendChild(pre)
          })
        }
      })
    },
    // 日志切换
    logChange() {
      this.logClose()
      // 开启轮询
      this.start()
    },
    // 日志查询
    logQuery() {
      const vm = this
      const split = this.log.split('\n')
      vm.$el.querySelector('.log-viewer > table').remove('pre')
      const table = this.createPre(null, 'table')
      vm.$el.querySelector('.log-viewer').appendChild(table)

      if (this.log_level.trim() === '' && this.log_text.trim() === '') {
        this.$message.success('请输入查询条件')
        split.forEach(item => {
          const pre = this.createPre(item, 'pre')
          vm.$el.querySelector('.log-viewer > table').appendChild(pre)
        })
      } else {
        split.forEach(item => {
          const pre = this.createPre(item, 'pre')

          if (this.log_level.trim() !== '' && this.log_text.trim() === '') {
            if (item.includes(this.log_level)) {
              vm.$el.querySelector('.log-viewer > table').appendChild(pre)
            }
          } else if (this.log_level.trim() === '' && this.log_text.trim() !== '') {
            if (item.includes(this.log_text)) {
              vm.$el.querySelector('.log-viewer > table').appendChild(pre)
            }
          } else {
            if (item.includes(this.log_level)) {
              if (item.includes(this.log_text)) {
                vm.$el.querySelector('.log-viewer > table').appendChild(pre)
              }
            }
          }
        })
      }
    },
    // 日志上一页
    getBeforeLog() {
      const vm = this
      const endPage = this.row + 200
      const startPage = this.row
      this.row += 200

      getBeforeLog({ 'pathId': this.log_pathId, 'startPage': startPage, 'endPage': endPage })
        .then(res => {
          console.log(res.data !== '')
          if (res.data !== '') {
            vm.$el.querySelector('.log-viewer > table').remove('pre')
            const table = this.createPre(null, 'table')
            vm.$el.querySelector('.log-viewer').appendChild(table)
            this.log = res.data + this.log
            const split = this.log.split('\n')
            split.forEach(item => {
              const pre = this.createPre(item, 'pre')
              vm.$el.querySelector('.log-viewer > table').appendChild(pre)
            })
          }
        })
    },
    logClose() {
      this.log = ''
      this.log_text = ''
      this.log_level = ''
      // 关闭轮询
      clearInterval(this.myInterval)
      // 重置日志读取位置
      Close()
      // 创建新table
      const vm = this
      vm.$el.querySelector('.log-viewer > table').remove('pre')
      const table = this.createPre(null, 'table')
      vm.$el.querySelector('.log-viewer').appendChild(table)
    },
    createPre(item, element) {
      const label = document.createElement(element)
      label.rel = 'stylesheet'
      label.type = 'text/css'
      if (item !== null) {
        label.innerHTML = item
      }
      return label
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

.log-viewer{
  height: 500px;
  width: 100%;
  overflow: auto;
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
