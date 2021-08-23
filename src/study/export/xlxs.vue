<template>
  <div>
    <br>
    <br>
    <el-tooltip class="item" effect="dark" content="导出Excel" placement="top">
      <el-button type="success" size="mini" style="" @click="exportData">导出</el-button>
    </el-tooltip>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  data() {
    return {

    }
  },
  methods: {

    // 导出数据
    exportData() {
      const tableInfo = []
      this.thirdRemaindIconList.forEach(item => {
        tableInfo.push({
          'app名称': item.appName,
          '安卓包名': item.androidList[0].packageName
        })
      })
      var data = XLSX.utils.json_to_sheet(tableInfo)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, '安卓包名')
      const wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })

      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: 'application/octet-stream' }),
          `安卓包名.xlsx` // 文件名
        )
      } catch (e) {
        if (typeof console !== 'undefined') {
          this.$message.error('导出数据失败')
        }
      }
    }
  }
}
</script>

<style>

</style>
