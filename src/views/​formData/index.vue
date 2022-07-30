<template>
  <div id="app">
    <!-- formData的主要用处
    1. 网络请求中处理表单数据
    2. 网络请求中处理用来异步的上传文件 -->

    <div class="upload">
      <el-upload
        class="upload-demo"
        drag
        action="#"
        :multiple="false"
        :auto-upload="false"
        :on-change="onChange"
        :on-remove="onRemove"
        :file-list="fileList"
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <el-button size="medium" @click="upload">push</el-button>
    </div>
  </div>
</template>

<script>
import UploadApi from '@/api/upload.js'
export default {
  name: 'FormData',
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    onChange(file, fileList) {
      this.fileList = []
      this.fileList.push(file.raw)
    },
    onRemove() {
      this.fileList = []
    },
    upload() {
      console.log(this.fileList)
      const formData = new FormData()
      formData.append('file', this.fileList[0])
      formData.append('time', 20220730)
      for (var i = 0; i < 3; i++) {
        formData.append('bean[' + i + '].year', 2022 + i)
        formData.append('bean[' + i + '].month', 7 + i)
        formData.append('bean[' + i + '].day', 30 + i)
      }

      UploadApi.formData(formData).then(res => {
        this.$message.success(res)
      }).catch(err => {
        this.$message.error(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
