<template>
  <!-- 安卓包名导出文件 -->
  <div>
    <el-tooltip class="item" effect="dark" content="导出Excel" placement="top">
      <el-button type="success" size="mini" style="" @click="exportData">导出</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="导入Excel" placement="bottom">
      <el-button type="warning" size="mini" style="" @click="importData">导入</el-button>
    </el-tooltip>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      @close="close"
    >
      <uploadAndProgress ref="uploader" :loading="loading" :per="per" @fileChange="fileChange" @fileClear="fileClear" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 导入依赖包
// npm install --save file-saver
// npm install xlsx --save
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { getList } from '@/api/table'
import uploadAndProgress from '@/components/uploadAndProgress'

export default {
  components: { uploadAndProgress },
  data() {
    return {
      userList: [],
      fileList: [],
      dialogVisible: false,
      loading: false,
      per: 0
    }
  },
  methods: {
    // ************************************* 导出数据 **************************
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
    },
    // *************************************************************************
    // ************************************* 导入数据 **************************
    importData() {
      this.dialogVisible = true
    },
    // 回调-获取文件列表
    fileChange(data) {
      console.log(data)
      this.fileList.push(data.file)
      this.per = this.fileList.length
    },
    // 回调-清空文件
    fileClear() {
      this.fileList = []
      this.per = 0
    },
    // *************************************************************************
    // 关闭对话框事件
    close() {
      this.dialogVisible = false
      this.fileClear()
    },
    // 上传
    submit() {
      const list = []
      this.fileList.forEach(item => {
        const pro = new Promise(res => {
          // console.log(item)
          this.$refs.uploader.getData(true)
          res({ result: true })
        })
        list.push(pro)
      })
      Promise.all(list).then(res => {
        this.dialogVisible = false
      })
    }
  }
}
</script>

<style>

</style>
