<template>
  <div style="margin: 10px 10px">
    <div v-loading="loading" element-loading-text="加载中...">
      <el-card v-if="themeDataVisible" style="margin: 20px 10px 0 10px">
        <div>
          <div class="theme-form-title">主题内容</div>
          <el-divider/>
          <el-row >
            <el-col :span="8">
              <div class="theme-form-label">主题名称</div>
              <el-input :disabled="readonly" v-model="themeData.summary" show-word-limit maxlength="30" style="width: 70%" placeholder="主题名称"/>
            </el-col>
            <el-col :span="8">
              <div class="theme-form-label">设计师名称</div>
              <el-input :disabled="readonly" v-model="themeData.author" show-word-limit maxlength="30" style="width: 70%" placeholder="设计师名称"/>
            </el-col>
            <el-col :span="8">
              <div class="theme-form-label">字体颜色</div>
              <el-select :disabled="themeData.id > 0" v-model="themeData.fontColor" placeholder="字体颜色" style="width: 70%" @change="fontColorChange">
                <el-option
                  v-for="item in fontColorOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-col>
          </el-row>
          <el-row v-if="themeData.id" style="margin-top: 25px">
            <el-col :span="8">
              <div class="theme-form-label">状态</div>
              <el-select :disabled="true" v-model="themeData.status" placeholder="字体颜色" style="width: 70%">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-col>
            <el-col :span="8">
              <div class="theme-form-label">上架时间</div>
              <el-input :disabled="true" v-model="themeData.publishTime" style="width: 70%" placeholder="上架时间"/>
            </el-col>
            <el-col :span="8">
              <div class="theme-form-label">创建时间</div>
              <el-input :disabled="true" v-model="themeData.createTime" style="width: 70%" placeholder="创建时间"/>
            </el-col>
          </el-row>
          <el-row style="margin-top: 25px">
            <el-col :span="16">
              <div class="theme-form-label">主题详情</div>
              <el-input :disabled="readonly" v-model="themeData.description" rows="4" show-word-limit maxlength="800" type="textarea" clearable style="width: 85%" placeholder="主题详情"/>
            </el-col>
          </el-row>
        </div>

        <div style="margin-top: 25px">
          <div class="theme-form-title">效果图</div>
          <el-divider/>
          <el-row >
            <div v-for="(item, index) in themeData.preview" :key="index" style="float:left;">
              <div class="theme-preview-img-container">
                <img v-if="!addAndDelImgDisabled && themeData.preview.length > 1 && !themeData.id" src="../../../static/img/delete.png" class="theme-preview-img-del-icon" @click="previewDeleteHandle(index)" >
                <img :src="item.url" :alt="item.fileName" class="theme-preview-img">
              </div>
            </div>
            <div v-if="!addAndDelImgDisabled && !themeData.id" class="theme-img-upload-container" style="float:left">
              <el-upload :auto-upload="false" :file-list="previewFileList" :on-change="previewChangeHandle" :multiple="false" accept="image/png, image/jpeg" action="" class="theme-img-upload-btn" >
                <i class="el-icon-plus theme-img-upload-btn-icon"/>
              </el-upload>
            </div>
          </el-row >
        </div>

        <div style="margin-top: 25px">
          <div class="theme-form-title">壁纸</div>
          <el-divider/>
          <el-row>
            <div v-for="(item, index) in themeData.wallpaper" :key="index" style="float:left">
              <div class="theme-preview-img-container">
                <img v-if="!addAndDelImgDisabled && themeData.wallpaper.length > 1 && !themeData.id" src="../../../static/img/delete.png" class="theme-preview-img-del-icon" @click="wallpaperDeleteHandle(index)" >
                <img :src="item.url" :alt="item.fileName" class="theme-preview-img">
              </div>
            </div>
            <div v-if="!addAndDelImgDisabled && !themeData.id" class="theme-img-upload-container" style="float:left">
              <el-upload :auto-upload="false" :file-list="wallpaperFileList" :on-change="wallpaperChangeHandle" :multiple="false" accept="image/png, image/jpeg" action="" class="theme-img-upload-btn" >
                <i class="el-icon-plus theme-img-upload-btn-icon"/>
              </el-upload>
            </div>
          </el-row>
        </div>

        <div style="margin-top: 25px">
          <div class="theme-form-title">ICON {{ themeData.icons.length }}个</div>
          <el-divider/>
          <div v-if="iconInfoList.length > 0" style="margin: 0 40px 0 40px">
            <el-row v-for="(iconInfoRow, index) in iconInfoList" :key="index">
              <el-col v-for="item in iconInfoRow" :key="item.url" :span="2" style="margin-bottom: 15px">
                <div class="theme-icon-container">
                  <img :src="item.url" class="theme-icon-img">
                  <div class="theme_icon_text">{{ item.appName }} </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="theme-footer">
          <el-button class="theme-footer-btn" style="margin-right: 20px" @click="cancelHandle">取消</el-button>
          <el-button v-if="!readonly" class="theme-footer-btn" style="margin-left: 20px" type="primary" @click="submitHandle">确定</el-button>
        </div>
      </el-card>
      <br>
      <br>
    </div>
  </div>
</template>

<script>
import Canvas from './canvas'
import ThemeDataApi from '@/api/theme/theme_data'

export default {
  name: 'ThemeUpload',
  data() {
    return {
      addAndDelImgDisabled: true,
      readonly: false,
      loading: false,
      packageMap: {},
      iconInfoList: [],
      previewFileList: [],
      wallpaperFileList: [],
      uploadZipVisible: false,
      imgReg: /^(\s|\S)+(jpg|png|JPG|PNG)+$/,
      themeDataVisible: true,
      previewThirdApp: {
        duck: ['电话', '通讯录', '短信', '相机'],
        desk: ['照片', '日历', '备忘录', '计算器', 'QQ', '微信', '支付宝', '微博', '淘宝', '京东', '拼多多', '美团', '抖音', '快手', '腾讯视频', '哔哩哔哩']
      },
      previewThirdAppData: {},
      fontColorOptions: [{ label: '白色', value: 'ffffff' }, { label: '黑色', value: '000000' }],
      statusOptions: [{ label: '已发布', value: 100 }, { label: '未发布', value: 0 }, { label: '已下架', value: -1 }],
      themeData: {
        id: '',
        status: 0,
        createTime: 0,
        publishTime: 0,
        summary: '',
        author: '',
        fontColor: 'ffffff',
        description: '',
        preview: [],
        wallpaper: [],
        icons: []
      }
    }
  },
  methods: {
    init(id, readonly) {
      this.loading = true
      this.readonly = readonly || false
      if (id) {
        ThemeDataApi.getDetailById(id).then(data => {
          this.themeData.id = data.id
          this.themeData.status = data.status
          this.themeData.createTime = this.$rbac.f(data.createTime)
          this.themeData.summary = data.name
          this.themeData.author = data.authorName
          this.themeData.publishTime = this.$rbac.f(data.publishTime)
          this.themeData.description = data.description
          this.themeData.fontColor = data.fontColor
          this.themeData.preview = this.buildImgList(data.previewImgList)
          this.themeData.wallpaper = this.buildImgList(data.wallpaperImgList)
          this.themeData.icons = this.buildIconImgList(data.iconImgList)
          this.iconInfoList = this.buildIconRowList(this.themeData.icons)
          this.loading = false
        }).catch(e => {
          console.error(e.message)
          this.loading = false
          this.$message.error(e.message)
        })
      } else {
        this.loading = false
      }
    },
    buildImgList(imgList) {
      if (!imgList) {
        return []
      }
      const tempImgList = []
      imgList.forEach(item => {
        tempImgList.push({
          url: item
        })
      })
      return tempImgList
    },
    buildIconImgList(imgList) {
      if (!imgList) {
        return []
      }
      const tempImgList = []
      imgList.forEach(item => {
        tempImgList.push({
          url: item.iconUrl,
          appName: item.appName
        })
      })
      return tempImgList
    },
    fontColorChange(value) {
      this.loading = true
      console.log(value)
      const tempPreviewList = []
      Canvas.drawLockPreview(this.themeData.wallpaper[0].url, value).then(lockData => {
        tempPreviewList.push(lockData)
        Canvas.drawthirdPreview(this.themeData.wallpaper[0].url, this.previewThirdAppData, value).then(thirdData => {
          tempPreviewList.push(thirdData)
          this.themeData.preview = tempPreviewList
          this.loading = false
        }).catch(e => {
          this.$message.error('生成主屏幕预览图异常')
          this.loading = false
          console.error(e)
        })
      }).catch(e => {
        this.$message.error('生成锁屏预览图异常')
        this.loading = false
        console.error(e)
      })
    },
    uploadZipHandle(themeData) {
      this.loading = true
      themeData.preview = []
      const result = this.buildPreviewThirdApp(themeData.icons)
      if (!result) {
        this.$emit('close')
        this.loading = false
      }
      Canvas.drawLockPreview(themeData.wallpaper[0].url, this.themeData.fontColor).then(lockData => {
        themeData.preview.push(lockData)
        Canvas.drawthirdPreview(themeData.wallpaper[0].url, this.previewThirdAppData, this.themeData.fontColor).then(thirdData => {
          themeData.preview.push(thirdData)
          this.themeData.summary = themeData.summary
          this.themeData.description = themeData.description
          this.themeData.author = themeData.author
          this.themeData.preview = themeData.preview
          this.themeData.wallpaper = themeData.wallpaper
          this.themeData.icons = themeData.icons
          console.log(this.themeData)
          const iconHasNameList = themeData.icons || []
          this.iconInfoList = this.buildIconRowList(iconHasNameList)
          this.themeDataVisible = true
          this.loading = false
        }).catch(e => {
          this.$message.error('生成主屏幕预览图异常')
          this.loading = false
          console.error(e)
        })
      }).catch(e => {
        this.$message.error('生成锁屏预览图异常')
        this.loading = false
        console.error(e)
      })
    },
    buildPreviewThirdApp(iconList) {
      const appMap = {}
      iconList.forEach(item => {
        appMap[item.appName] = item
      })
      const duck = []
      for (let index = 0; index < this.previewThirdApp.duck.length; index++) {
        const app = this.previewThirdApp.duck[index]
        const iconItem = appMap[app]
        if (!iconItem) {
          this.$message.error('生成桌面效果图失败，缺少 ' + app + ' 图标')
          return false
        }
        duck.push(iconItem)
      }
      const desk = []
      const tempDesk = []
      const missIcons = []
      for (let index = 0; index < this.previewThirdApp.desk.length; index++) {
        const app = this.previewThirdApp.desk[index]
        const iconItem = appMap[app]
        if (!iconItem) {
          missIcons.push(app)
        } else {
          tempDesk.push(iconItem)
        }
      }
      if (missIcons.length > 0) {
        let missIconMessage = ''
        for (let i = 0; i < missIcons.length; i++) {
          missIconMessage += missIcons[i] + '图标'
          if (i < missIcons.length - 1) {
            missIconMessage += '、'
          }
        }
        if (missIcons.length <= 8) {
          this.$message.warning('生成桌面效果图，缺少' + missIconMessage)
        } else {
          this.$message.error('生成桌面效果图失败，缺少' + missIconMessage)
          return false
        }
      }
      for (var j = 0; j < tempDesk.length; j += 4) {
        desk.push(tempDesk.slice(j, j + 4))
      }
      this.previewThirdAppData = {
        duck: duck,
        desk: desk
      }
      return true
    },
    buildIconRowList(iconList) {
      const tempIconInfoList = []
      for (var j = 0; j < iconList.length; j += 12) {
        tempIconInfoList.push(iconList.slice(j, j + 12))
      }
      return tempIconInfoList
    },
    previewDeleteHandle(index) {
      this.themeData.preview.splice(index, 1)
    },
    wallpaperDeleteHandle(index) {
      this.themeData.wallpaper.splice(index, 1)
    },
    previewChangeHandle(file) {
      // 防止组件出现文件列表 影响展示效果
      this.previewFileList = []
      if (!this.imgReg.test(file.name)) {
        this.$message.error('文件格式必须为.png/.jpg格式')
        return
      }
      const tempPreview = this.themeData.preview || []
      tempPreview.push({
        file: file.raw,
        url: window.URL.createObjectURL(file.raw)
      })
      this.themeData.preview = tempPreview
      console.log(this.themeData.preview)
    },
    wallpaperChangeHandle(file) {
      // 防止组件出现文件列表 影响展示效果
      this.wallpaperFileList = []
      if (!this.imgReg.test(file.name)) {
        this.$message.error('文件格式必须为.png/.jpg格式')
        return
      }
      const tempWallpaper = this.themeData.wallpaper || []
      tempWallpaper.push({
        file: file.raw,
        url: window.URL.createObjectURL(file.raw)
      })
      this.themeData.wallpaper = tempWallpaper
    },
    cancelHandle() {
      this.$emit('close')
      this.initParams()
    },
    initParams() {
      this.themeData = {
        id: '',
        status: 0,
        createTime: 0,
        publishTime: 0,
        summary: '',
        fontColor: 'ffffff',
        author: '',
        description: '',
        preview: [],
        wallpaper: [],
        icons: []
      }
    },
    submitHandle() {
      this.loading = true
      if (this.themeData.id) {
        const updateForm = {
          id: this.themeData.id,
          name: this.themeData.summary,
          description: this.themeData.description,
          authorName: this.themeData.author,
          fontColor: this.themeData.fontColor
        }
        console.log(updateForm)
        ThemeDataApi.updateTheme(updateForm).then((result) => {
          if (result) {
            this.$message({
              message: '主题更新成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.$emit('close')
                this.$emit('refresh')
                this.initParams()
              }
            })
          }
        }).catch(e => {
          this.$message.error(e.message)
        }).finally(() => {
          this.loading = false
        })
      } else {
        const form = new FormData()
        const iconPackages = {}
        this.themeData.preview.forEach(item => {
          form.append('previewFileList', item.file)
        })
        this.themeData.wallpaper.forEach(item => {
          form.append('wallpaperFileList', item.file)
        })
        this.themeData.icons.forEach(item => {
          form.append('iconFileList', item.file)
          iconPackages[item.fileName] = item.appName
        })
        form.append('summary', this.themeData.summary)
        form.append('author', this.themeData.author)
        form.append('fontColor', this.themeData.fontColor)
        form.append('description', this.themeData.description)
        form.append('iconPackages', JSON.stringify(iconPackages))
        ThemeDataApi.upload(form).then((result) => {
          if (result) {
            this.$message({
              message: '主题上传成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.$emit('close')
                this.$emit('refresh')
                this.initParams()
              }
            })
          }
        }).catch(e => {
          this.$message.error(e.message)
        }).finally(() => {
          this.loading = false
        })
      }
    }
  }
}
</script>

<style scoped>
.theme-preview-img-del-icon{
  width:26px;
  height:26px;
  position:absolute;
  cursor: pointer;
  top: -13px;
  right: 32px;
}
.theme-preview-img-container{
  position:relative;
}
.theme-img-upload-container{
  height: 260px;
  display:flex;
  justify-content:center;
  align-items:center;
}
.theme-img-upload-btn {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.theme-img-upload-btn:hover {
  border-color: #409EFF;
}
.theme-img-upload-btn-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.theme_icon_text{
  font-size: 14px;
  color: #919090;
}
.theme-footer-btn{
  width: 180px;
  height: 50px;
  font-size: 17px;
}
.theme-footer {
  margin-top: 35px;
  text-align: center;
}
.theme-icon-container{
  text-align: center;
}
.theme-icon-img{
  border-radius: 20%;
  width: 80%;
}
.el-divider--horizontal{
  margin: 18px 0 !important;
}
.theme-preview-img{
  width: auto;
  height: 260px;
  margin-right: 45px;
}
.theme-form-title{
  margin-left: 25px;
  font-size: 16px;
  color: #606266;
  font-weight: bold;
}
.theme-form-label{
  font-size: 15px;
  margin-bottom: 10px;
  color: #606266;
}
</style>
