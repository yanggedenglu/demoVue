<template>
  <div>
    <el-upload
      :auto-upload="false"
      :file-list="fileList"
      :on-change="fileChangeHandle"
      :on-remove="fileRemoveHandle"
      :on-exceed="fileExceed"
      :limit="limit"
      class="upload-demo"
      accept=".jpg,.png,.jpeg"
      drag
      action=""
      multiple
      style="width:360px; margin-left:25px"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip">只能上传.png，.jpg，.jpeg文件</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      loading: false,
      limit: 50,
      classList: [],
      form: {
        classificationId: null,
        publishTime: null
      },
      fileList: [],
      rules: {
        classificationId: [{ required: true, message: '请选择分类', trigger: 'blur' }],
        publishTime: [{ required: true, message: '请选择预计上传时间', trigger: 'blur' }]
      },
      beforeDate: {
        disabledDate(date) {
          return date.getTime() <= Date.now() - 24 * 60 * 60 * 1000
        }
      }
    }
  },
  methods: {
    // 新增壁纸  暂不使用
    dataFormSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.fileList.length === 0) {
            this.$message.error('请选择上传壁纸')
            return
          }

          this.loading = true
          var failTip = ''
          var failCount = 0
          const promiseList = []

          this.fileList.forEach(item => {
            const data = new FormData()
            data.append('file', item.raw)
            data.append('classificationId', this.form.classificationId)
            data.append('publishTime', this.form.publishTime)

            const pm = new Promise((res, rej) => {
              // 请求上传图片
              // WallPaperApi.insert(data).then((result) => {
              //   res({ result: result.result, name: item.name })
              // }).catch(err => {
              //   console.log(err)
              //   res({ result: false, name: item.name })
              // })
            })
            promiseList.push(pm)
          })

          // 校验Promise结果
          Promise.all(promiseList).then(res => {
            res.forEach(item => {
              if (item.result === false) {
                failTip += item.name + '，'
                failCount++
              }
            })
            if (failTip !== '') {
              this.$message({ message: '共导入' + promiseList.length + '张壁纸，成功' + (promiseList.length - failCount) +
              '张，失败' + failCount + '张<br>导入失败的壁纸名称为：' + failTip.substring(0, failTip.length - 1),
              type: 'error', dangerouslyUseHTMLString: true, duration: 0, showClose: true, onClose: () => { this.$emit('refreshDataList') } })
            } else {
              this.$message({ message: '共导入' + promiseList.length + '张壁纸，成功' + promiseList.length + '张',
                type: 'success', duration: 1500, onClose: () => { this.$emit('refreshDataList') } })
            }
            this.visible = false
            this.loading = false
          }).catch(err => {
            this.$message.error(err)
          })
        }
      })
    },
    // 添加上传图片
    fileChangeHandle(file) {
      this.fileList.push(file)
    },
    // 移除上传图片
    fileRemoveHandle(file, fileList) {
      this.fileList = fileList.slice(file)
    },
    // 上传图片超出
    fileExceed() {
      this.$message.error('上传文件超过最大数，最多上传50张')
    },
    // 关闭的回调
    onClose() {
      this.fileList = []
      this.$refs['form'].resetFields()
      this.file_total = 0
      this.$refs.uploader.uploader.cancel()
    }
  }
}
</script>

<style>

</style>
