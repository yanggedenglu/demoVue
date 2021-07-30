<template>
  <div>
    <uploader
      ref="uploader"
      :options="{}"
      :auto-start="false"
      style="display: inline-block; text-align: center; cursor: pointer; outline: 0;"
      @file-added="onFileAdded"
    >
      <el-upload-dragger>
        <uploader-drop style="width:360px; height: 180px; border:0; background-color: transparent ">
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或点击<br>
            <uploader-btn :attrs="{accept: ['.png', '.jpg', '.jpeg']}">上传文件</uploader-btn>
            <uploader-btn :directory="true">上传文件夹</uploader-btn>
          </div>
        </uploader-drop>
      </el-upload-dragger>
      <uploader-unsupport />
      <span v-if="file_total > 0">已选择{{ file_total }}张壁纸，待上传...
        <el-button size="mini" @click="clearFileList">清空所选</el-button>
      </span>
    </uploader>
    <el-progress v-if="count" :percentage="percent" :status="status" />
  </div>
</template>

<script>
import ElUploadDragger from 'element-ui/packages/upload/src/upload-dragger'
export default {
  components: {
    ElUploadDragger
  },
  props: {
    per: { type: Number, default() { return {} } }
  },
  data() {
    return {
      fileList: [],
      file_total: 0,
      percent: 0,
      count: 0,
      status: null
    }
  },
  methods: {
    // 选择上传文件
    onFileAdded(file) {
      const file_type = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase()
      const extension = (file_type === 'png' || file_type === 'jpg' || file_type === 'jpeg')
      if (extension) {
        this.fileList.push(file.file)
      } else {
        // 不符合格式不加入
        file.ignored = true
      }
      this.$nextTick(() => {
        this.file_total = this.$refs.uploader.files.length
      })
      this.$emit('fileChange', file)
    },
    // 父组件调用获得上传文件
    getFileList() {
      return this.fileList
    },
    // 清空所选
    clearFileList() {
      this.fileList = []
      this.file_total = 0
      this.percent = 0
      this.count = 0
      this.status = null
      this.$refs.uploader.uploader.cancel()
    },
    // 进度条特效
    getData(data) {
      this.count++
      this.percent += Math.round((1 / this.per) * 100)
      if (data === false) {
        if (this.count === this.per) {
          this.percent = 100
          this.status = 'exception'
        }
      } else {
        if (this.count === this.per) {
          this.percent = 100
          this.status = 'success'
        }
      }
    }
  }
}
</script>

<style>
.uploader .uploader-btn{
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  background-color: #fff;
  color: #409EFF;
  border: 0px;
}
</style>
