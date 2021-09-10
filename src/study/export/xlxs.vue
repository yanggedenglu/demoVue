<template>
  <!-- 安卓包名导出文件 -->
  <div>
    <div style="margin: 20px 20px;">
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
    <div style="margin: 20px 20px;">
      <hr>
      <img id="image1" src="../../../static/img/image1.jpg" width="200" height="200">
      <el-button type="success" size="mini" style="" @click="exportTxt">导出文件</el-button>
    </div>
  </div>
</template>

<script>
// 导入依赖包
// npm install --save file-saver
// npm install xlsx --save
import { saveAs } from 'file-saver'
import XLSX from 'xlsx'
import { getList } from '@/api/table'
import uploadAndProgress from '@/components/uploadAndProgress'
import { upload } from '@/api/upload'

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
          // console.log(item)
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
          saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `用户列表.xlsx`)
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
        const form = new FormData()
        form.append('file', item)
        const pro = new Promise(res => {
          upload(form).then(response => {
            res(response)
          })
        })
        list.push(pro)
      })

      Promise.all(list).then(res => {
        console.log(res)
        this.$message({ message: '成功',
          type: 'success', duration: 1500 })
      }).catch(err => {
        console.error(err)
      })
    },

    // *************************************************************************
    // 导出文件
    exportTxt() {
      // txt
      // var blob = new Blob(['hello'], { type: 'text/plain;charset=utf-8' })
      // FileSaver.saveAs(blob, 'hello.txt')

      // canvas画布  savaAs保存空白画布
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = 200
      canvas.height = 200
      const image1 = document.getElementById('image1')
      ctx.drawImage(image1, 0, 0, 200, 200)
      canvas.toBlob(function(blob) {
        saveAs(blob, 'desktop.png')
      })
    }
  }
}
</script>

<style>
 h1{
  text-shadow: 3px 3px 3px black;

}
img{
  display: block;
  margin: 0px auto;
}
</style>
