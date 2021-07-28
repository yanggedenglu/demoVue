<template>
  <!--
    vue-simple-uploader文档
    https://github.com/simple-uploader/vue-uploader/blob/master/README_zh-CN.md
    simple-uploader.js文档
    https://github.com/simple-uploader/Uploader/blob/develop/README_zh-CN.md
  -->
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
      <!-- <uploader-list /> -->
      <uploader-list v-show="panelShow">
        <div slot-scope="props" class="file-panel">
          <div class="file-title">
            <span>文件列表</span>
          </div>

          <ul class="file-list">
            <li v-for="file in props.fileList" :key="file.id">
              <uploader-file ref="files" :class="'file_' + file.id" :file="file" :list="true" />
            </li>
            <div v-if="!props.fileList.length" class="no-file"><i class="iconfont icon-empty-file" /> 暂无待上传文件</div>
          </ul>
        </div>
      </uploader-list>
      <span v-if="file_total > 0">已选择{{ file_total }}张壁纸，待上传...
        <el-button size="mini" @click="clearFileList">清空所选</el-button>
        <el-button size="mini" @click="upload">上传</el-button>
      </span>
    </uploader>
  </div>
</template>

<script>
import ElUploadDragger from 'element-ui/packages/upload/src/upload-dragger'
export default {
  components: {
    ElUploadDragger
  },
  data() {
    return {
      fileList: [],
      file_total: 0,
      panelShow: false
    }
  },
  methods: {
    onFileAdded(val) {
      this.panelShow = true
      this.fileList.push(val.file)
      this.$nextTick(() => {
        this.file_total = this.$refs.uploader.files.length
      })
    },
    // 父组件调用获得上传文件
    getFileList() {
      return this.fileList
    },
    // 清空所选
    clearFileList() {
      this.fileList = []
      this.file_total = 0
      this.$refs.uploader.uploader.cancel()
      // this.$refs.uploader.files = []
    },
    // test上传 可删
    upload() {
      // console.log(this.$refs.uploader.uploader.upload())
      this.$refs.uploader.uploader.resume()
    }
  }
}
</script>

<style scoped lang="scss">
.uploader .uploader-btn{
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  background-color: #fff;
  color: #409EFF;
  border: 0px;
}
.uploader span{
  font-size: 14px;
  font-style: normal;
}
.file-panel {
  background-color: #fff;
  border: 1px solid #e2e2e2;
  border-radius: 7px 7px 0 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  .file-title {
    display: flex;
    border-bottom: 1px solid #ddd;
    .operate {
      flex: 1;
      text-align: right;
    }
  }
  .file-list{
    list-style: none;
    padding: 0px;
    li{
      text-align: left;
      .uploader-file-name i{
        display: none;
      }
    }

  }

}
</style>
