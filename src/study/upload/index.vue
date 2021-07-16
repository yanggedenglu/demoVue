<template>
  <div>
    <!-- 1.html上传文件夹 -->
    <el-form ref="form" label-width="80px" enctype="multipart/form-data">
      <el-form-item>
        <input ref="file" type="file" name="file" webkitdirectory @change.stop="selectFiles">
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { upload } from '@/api/upload'
export default {
  name: 'Upload',
  data() {
    return {
      form: {
        fileList: []
      }
    }
  },
  methods: {
    // 选择文件夹
    selectFiles() {
      this.fileList = this.$refs.file.files
      // console.log(this.fileList)
    },
    // 提交
    submit() {
      this.fileList.forEach(item => {
        const file = new FormData()
        file.append('file', item)

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

</style>
