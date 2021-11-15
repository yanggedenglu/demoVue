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
    <!-- <el-form ref="log_form" :model="log_form" class="demo-dynamic">
            <el-form-item
              v-for="(domain, index) in log_form.op"
              :key="domain.key"
              :prop="'op.' + index"
              :rules="{ required: true, message: '查询信息', trigger: 'blur' }"
              style="float:left;">
              <el-input v-model="domain.log_txt" placeholder="请输入查询条件" clearable @change="logQuery" />
              <el-checkbox v-model="domain.log_checkbox" label="反选" border @change="logQuery"/>
              <el-button v-if="index > 0" type="danger" icon="el-icon-delete" @click.prevent="removeDomain(domain)"/>
              <el-button icon="el-icon-plus" @click="addDomain"/>
            </el-form-item>
          </el-form>
          <el-button type="primary" style="float:left" @click="getBeforeLogFile">上一页</el-button> -->
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

      // log_pathId: 1,
      // log_pageSize: 200,
      // options: [
      //   { label: 'info', value: 1 },
      //   { label: 'error', value: 2 }
      // ],
      // log_level: '',
      // logLevels: [
      //   { label: 'TRACE', value: 'TRACE' },
      //   { label: 'DEBUG', value: 'DEBUG' },
      //   { label: 'INFO', value: 'INFO' },
      //   { label: 'WARN', value: 'WARN' },
      //   { label: 'ERROR', value: 'ERROR' },
      //   { label: 'OFF', value: 'OFF' }
      // ],
      // log_form: {
      //   op: [{
      //     log_txt: '',
      //     log_checkbox: false
      //   }]
      // }
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
      this.createLabel(null, 'table')
      // 开启轮询
      this.start()
    },
    createLabel(data, element) {
      const vm = this
      if (element === 'pre') {
        const pre = document.createElement(element)
        pre.rel = 'stylesheet'
        pre.type = 'text/css'
        pre.innerHTML = data
        vm.$el.querySelector('.log-viewer > table').appendChild(pre)
      } else if (element === 'table') {
        vm.el.querySelector('.log-viewer').remove('table')
        const table = document.createElement('table')
        table.rel = 'stylesheet'
        table.type = 'text/css'
        vm.$el.querySelector('.log-viewer').appendChild(table)
      }
    }

    // addDomain() {
    //   this.log_form.op.push({
    //     log_txt: '',
    //     log_checkbox: false,
    //     key: Date.now()
    //   })
    // },
    // removeDomain(item) {
    //   var index = this.log_form.op.indexOf(item)
    //   if (index !== -1) {
    //     this.log_form.op.splice(index, 1)
    //   }
    //   this.logQuery()
    // },
  }
}
</script>

<style lang="scss">
html{
  line-height: 1
}

.log-viewer{
  overflow-x: auto;
  overflow-y: auto;
  width: 100%;
  height: 700px;
}

table{
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
