<template>
  <!-- 自定义指令 -->
  <div style="margin:20px;">
    <hr>
    <el-input v-model="message" v-force:blue="message" type="text" />
    <el-button type="success" size="mini">自定义指令</el-button>
    <br>
    <el-tab-pane label="缓存管理" name="cache">
      <el-col>
        <el-col :span="1" align="left">
          <el-button style="margin-left:2.5%" type="success" icon="el-icon-refresh" circle plain @click="command()" />
        </el-col>
        <el-col :span="4" align="left">
          <el-form>
            <el-form-item label="数据更新时间">
              {{ responseDataLastTime === 0 ? "":$rbac.f(new Date(responseDataLastTime)) }}
            </el-form-item>
          </el-form>
        </el-col>
      </el-col>

      <el-table ref="pageTable" v-loading="loading" :data="responseCacheData" border>
        <el-table-column label="缓存名称" align="center" prop="cacheName" sortable />
        <el-table-column label="服务器更新时间" align="center" sortable>
          <template slot-scope="scope">{{ (scope.row.refreshTime && parseFloat(scope.row.refreshTime) !== 0) ? $rbac.f(parseFloat(scope.row.refreshTime )) : "" }} </template>
        </el-table-column>
        <el-table-column label="客户端更新时间" align="center" sortable>
          <template slot-scope="scope">{{ (scope.row.lastExecuteTime && parseFloat(scope.row.lastExecuteTime) !== 0) ? $rbac.f(parseFloat(scope.row.lastExecuteTime)) : "" }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" prop="lastTime" sortable>
          <template slot-scope="scope">
            <el-tag v-if="!scope.row.isConfig" type="danger">暂无缓存配置</el-tag>
            <el-tag v-if="!scope.row.isExist" type="danger">客户端无此缓存</el-tag>
            <el-button v-if="scope.row.isConfig && scope.row.isExist" type="warning" size="mini" @click="refreshCache(scope.row)">刷新</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <!-- <el-tab-pane label="日志文件" name="logfile">
        <div style="float:left;">
          <el-select v-model="log_pathId" placeholder="请选择" @change="logChange">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="log_level" placeholder="请选择日志级别" clearable style="margin-left:10px;" @change="logQuery">
            <el-option
              v-for="item in logLevels"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-popover
            placement="right"
            width="500"
            trigger="click">
            <el-form ref="log_form" :model="log_form" class="demo-dynamic">
              <el-form-item
                v-for="(domain, index) in log_form.op"
                :key="domain.key"
                :prop="'op.' + index"
                :rules="{
                required: true, message: '查询信息', trigger: 'blur' }">
                <el-input v-model="domain.log_txt" size="medium" placeholder="请输入查询条件" @change="logQuery"/>
                <el-radio v-model="domain.log_radio" label="1" size="medium" border @change="logQuery">正选</el-radio>
                <el-radio v-model="domain.log_radio" label="2" size="medium" border @change="logQuery">反选</el-radio>
                <el-button type="danger" size="medium" @click.prevent="removeDomain(domain)">删除</el-button>
              </el-form-item>
              <el-button size="medium" @click="addDomain">新增</el-button>
            </el-form>
            <el-button slot="reference">查询条件</el-button>
          </el-popover>
          <el-button type="primary" @click="getBeforeLogFile">上一页</el-button>
        </div>
        <div class="log-viewer">
          <table />
        </div>
      </el-tab-pane> -->

  </div>
</template>

<script>
export default {
  directives: {
    // 自定义指令
    force: {
      bind: function() {
        // alert('hhh')
      },
      update: function(el, binding, vnode) {
        console.log(binding.name)
        el.style.backgroundColor = binding.value
        el.style.color = binding.arg
      },
      inserted(el) {
        el.focus()
      }
    }
  },
  data() {
    return {
      message: 'red'
      //  myInterval: null,
      // log: '',
      // log_pathId: 1,
      // log_pageSize: 200,
      // options: [
      //   { label: 'info', value: 1 },
      //   { label: 'error', value: 2 }
      // ],
      // log_level: '',
      // logLevels: [
      //   { label: 'INFO', value: 'INFO' },
      //   { label: 'ERROR', value: 'ERROR' },
      //   { label: 'WARN', value: 'WARN' }
      // ],
      // log_form: {
      //   op: [{
      //     log_txt: '',
      //     log_radio: ''
      //   }]
      // }
    }
  },
  method: {
    //  handleLogfileResponseData() {
    //   // 实现轮询读取日志
    //   this.myInterval = window.setInterval(() => {
    //     setTimeout(this.getLogFile(), 0)
    //   }, 1000)
    // },
    // getLogFile() {
    //   // 读取日志
    //   InstanceApi.getLogFile(this.log_pathId, this.log_pageSize).then(res => {
    //     if (res.result !== '') {
    //       this.log += res.result
    //       const split = res.result.split('\n')
    //       split.forEach(item => {
    //         const pre = this.createPre(item, 'pre')
    //         const vm = this
    //         vm.$el.querySelector('.log-viewer > table').appendChild(pre)
    //       })
    //     }
    //   })
    // },
    // logChange() {
    //   this.logClose()
    //   // 开启轮询
    //   this.handleLogfileResponseData()
    // },
    // logQuery() {
    //   const vm = this
    //   const split = this.log.split('\n')
    //   vm.$el.querySelector('.log-viewer > table').remove('pre')
    //   const table = this.createPre(null, 'table')
    //   vm.$el.querySelector('.log-viewer').appendChild(table)

    //   const radio = []
    //   const txt = []
    //   this.log_form.op.forEach(item => {
    //     if (item.log_txt !== '' && txt.indexOf(item.log_txt) === -1) {
    //       txt.push(item.log_txt)
    //       radio.push(item.log_radio)
    //     }
    //   })
    //   if (this.log_level.trim() === '' && txt.length === 0) {
    //     this.$message.success('请输入查询条件')
    //     split.forEach(item => {
    //       const pre = this.createPre(item, 'pre')
    //       vm.$el.querySelector('.log-viewer > table').appendChild(pre)
    //     })
    //   } else {
    //     for (var v = 0; v < split.length; v++) {
    //       const pre = this.createPre(split[v], 'pre')

    //       if (this.log_level.trim() !== '') {
    //         if (split[v].includes(this.log_level)) {
    //           vm.$el.querySelector('.log-viewer > table').appendChild(pre)
    //           continue
    //         }
    //       }
    //       if (txt.length > 0) {
    //         for (var i = 0; i < txt.length; i++) {
    //           if (split[v].includes(txt[i]) && radio[i] === '1') {
    //             vm.$el.querySelector('.log-viewer > table').appendChild(pre)
    //             break
    //           } else if (!split[v].includes(txt[i]) && radio[i] === '2') {
    //             vm.$el.querySelector('.log-viewer > table').appendChild(pre)
    //             break
    //           }
    //         }
    //       }
    //     }
    //   }
    // },
    // getBeforeLogFile() {
    //   const vm = this
    //   vm.$el.querySelector('.log-viewer > table').remove('pre')
    //   const table = this.createPre(null, 'table')
    //   vm.$el.querySelector('.log-viewer').appendChild(table)
    //   const startPage = this.log_pageSize
    //   const endPage = this.log_pageSize + 200
    //   this.log_pageSize += 200
    //   InstanceApi.getBeforeLogFile(this.log_pathId, startPage, endPage).then(res => {
    //     if (res.result !== '') {
    //       this.log = res.result + this.log
    //       const split = this.log.split('\n')
    //       split.forEach(item => {
    //         const pre = this.createPre(item, 'pre')
    //         const vm = this
    //         vm.$el.querySelector('.log-viewer > table').appendChild(pre)
    //       })
    //     }
    //   })
    // },
    // logClose() {
    //   this.log = ''
    //   this.log_level = ''
    //   this.log_pageSize = 200
    //   this.log_form.op = []
    //   this.log_form.op.push({
    //     log_txt: '',
    //     log_radio: '',
    //     key: Date.now()
    //   })
    //   // 关闭轮询
    //   clearInterval(this.myInterval)
    //   // 重置日志读取位置
    //   InstanceApi.logClose().then(() => { })
    //   // 创建新table
    //   const vm = this
    //   vm.$el.querySelector('.log-viewer > table').remove('pre')
    //   const table = this.createPre(null, 'table')
    //   vm.$el.querySelector('.log-viewer').appendChild(table)
    // },
    // createPre(item, element) {
    //   const label = document.createElement(element)
    //   label.rel = 'stylesheet'
    //   label.type = 'text/css'
    //   if (item !== null) {
    //     label.innerHTML = item
    //   }
    //   return label
    // },
    // addDomain() {
    //   this.log_form.op.push({
    //     log_txt: '',
    //     log_radio: '',
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

<style>

</style>
