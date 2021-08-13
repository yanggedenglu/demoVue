<template>
  <!-- 解析xml  -->
  <div>
    <el-upload
      class="upload-demo"
      action=""
      multiple
      :limit="3"
      :file-list="fileList"
      :on-change="changeFile"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>

    <el-button type="warning" @click="clickzip">解析</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    changeFile() {
      console.log(this.fileList)
    },
    clickzip() {
      var xml = this.$x2js.xml2js(this.fileList[0])
      console.log(xml)
    }
  }
}
</script>

<style>

</style>
