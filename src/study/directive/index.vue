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
    }
  },
  method: {
  }
}
</script>

<style>

</style>
