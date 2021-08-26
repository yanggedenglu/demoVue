<template>
  <!-- 安卓包名导出文件 -->
  <div>
    <br>
    <br>
    <el-tooltip class="item" effect="dark" content="导出Excel" placement="top">
      <el-button type="success" size="mini" style="" @click="exportData">导出</el-button>
    </el-tooltip>
  </div>
</template>

<script>
// 导入依赖包
// npm install --save file-saver
// npm install xlsx --save
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { getList } from '@/api/table'

export default {
  data() {
    return {
      userList: []
    }
  },
  methods: {
    // 导出数据
    exportData() {
      const tableInfo = []
      getList({ pageSize: 10, pageCount: 1 }).then(res => {
        this.userList = res.data
        res.data.forEach(item => {
          console.log(item)
          tableInfo.push({
            'name': item.username,
            'id': item.id,
            'createTime': item.createTime
          })
        })

        // json数据转换为xls文件
        var data = XLSX.utils.json_to_sheet(tableInfo)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, data, '用户列表')
        const wbout = XLSX.write(wb, {
          bookType: 'xlsx',
          bookSST: true,
          type: 'array'
        })

        try {
        // 下载xls文件
          FileSaver.saveAs(
            new Blob([wbout], { type: 'application/octet-stream' }),
            `用户列表.xlsx` // 文件名
          )
        } catch (e) {
          if (typeof console !== 'undefined') {
            this.$message.error('导出数据失败')
          }
        }
      })
    }
  }
}
</script>

<style>

</style>
