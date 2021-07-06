<template>
  <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="visible" title="主题包导入" width="480px" >
    <div v-loading="loading" :element-loading-text="loadingText">
      <div style="text-align: center;">
        <div style="margin-bottom: 20px">
          <el-select v-model="themePlatform" placeholder="应用类型" filterable style="width:360px" >
            <el-option
              v-for="item in themePlatformTypeOptions"
              :label="item.label"
              :key="item.value"
              :value="item.value"/>
          </el-select>
        </div>
        <el-upload :auto-upload="false" :file-list="fileList" :on-change="fileChangeHandle" :multiple="false" accept=".zip,.theme" drag action="">
          <i class="el-icon-upload"/>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip">只能上传.zip 或 .theme文件</div>
        </el-upload>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button :disabled="loading" @click="visible = false; fileList = []">{{ $t('global.cancel') }}</el-button>
      <el-button :disabled="loading" type="primary" @click="dataFormSubmit()">{{ $t('global.confirm') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>

import ZipAdapter from './zip_adapter'
import AppApi from '@/api/manage/app'

export default {
  data() {
    return {
      loadingText: '解析中...',
      loading: false,
      themePlatform: 'oppo',
      fileList: [],
      eventFile: null,
      visible: false,
      themePlatformTypeOptions: [{
        label: 'OPPO',
        value: 'oppo'
      }, {
        label: 'VIVO',
        value: 'vivo'
      }]
    }
  },
  watch: {
    visible(value) {
      if (!value) {
        this.loadingText = '解析中...'
        this.loading = false
        this.fileList = []
        this.eventFile = null
      }
    }
  },
  methods: {
    init() {
      this.loading = false
      this.fileList = []
      this.eventFile = null
      this.visible = true
    },
    fileChangeHandle(file) {
      this.fileList = []
      this.fileList.push(file)
      this.eventFile = file
    },
    dataFormSubmit() {
      if (!this.eventFile || this.fileList.length === 0) {
        this.$message.error('请选择文件')
        return
      }
      var fileReg = /\.(zip|theme)$/
      if (!fileReg.test(this.eventFile.name)) {
        this.$message.error('文件格式必须为.zip或.theme格式')
        return
      }
      this.loading = true
      const zipFile = this.eventFile.raw
      AppApi.queryPackages().then(packageMap => {
        ZipAdapter.parseZip(zipFile, this.themePlatform, packageMap, (result, msg, data) => {
          if (!result) {
            this.loading = false
            this.$message.error(msg)
          } else {
            this.loading = false
            this.$message({
              message: '解析成功',
              type: 'success',
              duration: 800,
              onClose: () => {
                this.$emit('uploadFinished', data)
                this.visible = false
              }
            })
          }
        }, (progressRate) => {
          this.loadingText = '已解析:' + progressRate + '%'
        })
      }).catch(e => {
        this.loading = false
        this.$message.error(e.message)
      })
    }
  }
}
</script>
