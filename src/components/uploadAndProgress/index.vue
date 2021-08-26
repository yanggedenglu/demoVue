<template>
  <div>
    <uploader
      ref="uploader"
      v-loading="loading"
      :options="{}"
      :auto-start="false"
      style="display: inline-block; text-align: center; cursor: pointer; outline: 0;"
      @file-added="onFileAdded"
    >
      <el-upload-dragger>
        <uploader-drop style="width:360px; height: 180px; border:0; background-color:transparent; cursor:default;">
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或点击<br>
            <uploader-btn :attrs="attrs">上传文件</uploader-btn>
            <!-- <uploader-btn :attrs="{accept: ['.xls', '.xlsx']}">上传文件</uploader-btn> -->
            <uploader-btn :directory="true">上传文件夹</uploader-btn>
          </div>
        </uploader-drop>
      </el-upload-dragger>
      <uploader-unsupport />
      <span v-if="per > 0">已选择{{ per }}张壁纸，待上传...
        <el-button size="mini" @click="clearFileList">清空所选</el-button>
      </span>
    </uploader>
    <el-progress v-if="count" :percentage="percent" :status="status" style="width:360px; margin-left:20px;" />
  </div>
</template>

<script>
import ElUploadDragger from 'element-ui/packages/upload/src/upload-dragger'
export default {
  components: {
    ElUploadDragger
  },
  props: {
    per: { type: Number, default() { return {} } },
    loading: { type: Boolean, default() { return {} } }
  },
  data() {
    return {
      percent: 0,
      count: 0,
      status: null,
      uploadResult: true,
      /**
        image: ['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'],
        video: ['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv'],
        audio: ['mp3', 'wav', 'wma', 'ogg', 'aac', 'flac'],
        document: ['doc', 'txt', 'docx', 'pages', 'epub', 'pdf', 'numbers', 'csv', 'xls', 'xlsx', 'keynote', 'ppt', 'pptx']包括上面三个分类
       */
      attrs: {
        accept: 'image/*'
      }
    }
  },
  methods: {
    // 选择上传文件
    onFileAdded(file) {
      const file_type = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase()
      // const extension = (file_type === 'xls' || file_type === 'xlsx')
      const extension = (file_type === 'png' || file_type === 'jpg' || file_type === 'jpeg')
      if (extension) {
        // 回调返回数据，不直接去访问获取组件中的数据
        this.$emit('fileChange', file)
      } else {
        // 不符合格式不加入
        file.ignored = true
      }
    },
    // 清空所选
    clearFileList() {
      this.percent = 0
      this.count = 0
      this.status = null
      this.$refs.uploader.uploader.cancel()
      // 回调清空外部文件列表
      this.$emit('fileClear')
    },
    // 进度条特效
    getData(data) {
      this.count++
      this.percent += Math.round((1 / this.per) * 100)
      if (!data) {
        this.uploadResult = false
      }
      if (this.count === this.per) {
        this.percent = 100
        if (this.uploadResult) {
          this.status = 'success'
        } else {
          this.status = 'exception'
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
.el-form-item__content{
  line-height: 20px;
}
</style>
