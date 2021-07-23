<template>
  <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="visible" title="壁纸导入" width="600px" @close="onClose">
    <div v-loading="loading">
      <div style="text-align: center;">
        <div style="margin-bottom: 20px">
          <el-form ref="form" :model="form" :rules="rules" label-width="150px">
            <el-form-item label="分类" prop="classificationId">
              <el-select
                v-model="form.classificationId"
                no-data-text="无分类数据，请添加分类"
                placeholder="请选择"
                style="width:360px"
                @visible-change="checkClass"
              >
                <el-option v-for="item in classList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="预计上架时间" prop="publishTime">
              <el-date-picker
                v-model="form.publishTime"
                :picker-options="beforeDate"
                format="yyyy-MM-dd HH:mm"
                value-format="timestamp"
                type="datetime"
                placeholder="选择日期时间"
                style="width:360px"
              />
            </el-form-item>
            <el-form-item label="上传壁纸" class="displayFile">
              <!-- auto-upload是否选取后自动上传  file-list上传的参数列表  accept接受上传的参数
              on-change	文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用 -->
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
              <span v-if="fileList.length > 0">已选择{{ fileList.length }}张壁纸，待上传...
                <el-button size="mini" @click="clearList">清空所选</el-button>
              </span>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button :disabled="loading" @click="visible = false">{{ $t('global.cancel') }}</el-button>
      <el-button :disabled="loading" type="primary" @click="dataFormSubmit()">{{ $t('global.confirm') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import WallPaperApi from '@/api/theme/wallpaper'
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
    init(data) {
      this.visible = true
      this.classList = data
    },
    // 新增壁纸
    // async + await
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
              WallPaperApi.insert(data).then((result) => {
                res({ result: result.result, name: item.name })
              }).catch(err => {
                console.log(err)
                res({ result: false, name: item.name })
              })
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
    },
    // 清空所选壁纸
    clearList() {
      this.fileList = []
    },
    checkClass(flag) {
      if (flag && this.classList.length === 0) {
        this.$message.error('无分类数据，请添加分类')
      }
    }
  }
}
</script>

<style>
.el-upload__tip{
  padding: 0px;
  line-height: 15px;
}
.el-upload-list__item-name{
  display: none;
}
</style>
