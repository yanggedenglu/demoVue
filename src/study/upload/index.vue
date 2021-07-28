<template>
  <div>
    <!-- 1.html上传文件夹 -->
    <el-form ref="form" label-width="80px" enctype="multipart/form-data">
      <el-form-item>
        <input ref="file" type="file" name="file" webkitdirectory @change.stop="selectFiles">
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
    <br>
    <br>
    <br>
    <!-- 2.vue-simple-uploader -->
    <uploader
      ref="uploader"
      :options="options"
      :auto-start="false"
      class="uploader-example"
      @file-added="onFileAdded"
    >
      <uploader-unsupport />
      <uploader-drop>
        <uploader-btn :attrs="attrs" style="background-color: #67C13B">上传文件</uploader-btn>
        <uploader-btn :directory="true" style="background-color: #79BBFF">上传文件夹</uploader-btn>
      </uploader-drop>
      <uploader-list />
    </uploader>
    <div slot="footer" class="dialog-footer">
      <span class="filetotal">共计: {{ file_total }}</span>
      <el-button @click="cancelUpload">取消上传</el-button>
      <el-button type="primary" @click="submitUpload">开始上传</el-button>
    </div>
  </div>
</template>

<script>
import { upload } from '@/api/upload'
import { getCookie } from '@/utils/auth'
export default {
  name: 'Upload',
  data() {
    return {
      // el-upload
      form: {
        fileList: []
      },
      // vue-simple-uploader
      options: {
        target: 'http://localhost:8000/upload2', // 上传URL
        testChunks: false, // 是否开启服务器分片校验
        fileParameterName: 'file', // 上传文件时文件的参数名，默认 file
        headers: {
          'CToken': getCookie()
        }
      },
      attrs: {
        accept: ['.png', '.jpg', '.jpeg']
      },
      file_total: 0 // 本次文件上传的总数
    }
  },
  computed: {
    computeds: function() {
      return 1 + 4
    }
  },
  methods: {
    // 选择文件夹
    selectFiles() {
      this.form.fileList = []
      this.$refs.file.files.forEach(item => {
        const file_type = item.name.substring(item.name.lastIndexOf('.') + 1)
        const extension = (file_type === 'png' || file_type === 'jpg' || file_type === 'jpeg')
        if (extension) { // 不符合格式不加入
          this.form.fileList.push(item)
        }
      })
      console.log(this.$refs.file.files.length)
      console.log(this.form.fileList)
    },
    // 提交
    submit() {
      this.form.fileList.forEach(item => {
        const file = new FormData()
        file.append('file', item)
        upload(file).then(() => {
        }).catch(err => {
          this.$message.error(err)
        })
      })
    },
    // 添加文件到列表还未上传,每添加一个文件，就会调用一次,在这里过滤并收集文件夹中文件格式不正确信息
    onFileAdded(file) {
      console.log(file)
      const file_type = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase()
      const extension = (file_type === 'png' || file_type === 'jpg' || file_type === 'jpeg')
      if (!extension) { // 不符合格式不加入
        file.ignored = true
      }
      this.$nextTick(() => {
        this.file_total = this.$refs['uploader'].files.length
      })
    },
    // 取消上传
    cancelUpload() {
      this.file_total = 0
      this.$refs.uploader.uploader.cancel()
    },
    // 点击开始上传按钮
    submitUpload() {
      var list = this.$refs['uploader'].files
      list.forEach(item => {
        const file = new FormData()
        file.append('file', item.file)
        upload(file).then(() => {
        }).catch(err => {
          this.$message.error(err)
        })
      })
    }
  }
}
</script>

<style>
 .uploader-example {
    width: 250px;
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }
  .uploader-example .uploader-btn {
    margin-left: 15px;
  }
  .uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
    display: none;
  }
</style>
