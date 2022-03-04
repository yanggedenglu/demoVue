<template>
  <div>
    <el-upload :auto-upload="false" :file-list="fileList" :on-change="fileChangeHandle" :multiple="false" accept=".zip,.theme" drag action="">
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip">只能上传.zip 或 .theme文件</div>
    </el-upload>
    <img :src="url" class="theme-preview-img">
  </div>
</template>

<script>
import ZipAdapter from './zip_adapter'
import packageMap from './packageMap'
import Canvas from './canvas'
export default {
  data() {
    return {
      fileList: [],
      url: '',
      previewThirdAppData: {},
      previewThirdApp: {
        duck: ['电话', '通讯录', '短信', '相机'],
        desk: ['QQ', '微信', '支付宝', '微博', '淘宝', '京东', '拼多多', '美团', '抖音', '快手', '腾讯视频', '哔哩哔哩']
      },
      imageData: {}
    }
  },
  methods: {
    fileChangeHandle(file) {
      console.log(file)
      const zipFile = file.raw
      ZipAdapter.parseZip(zipFile, 'oppo', packageMap, (result, msg, data) => {
        if (!result) {
          this.loading = false
          this.$message.error(msg)
        } else {
          this.loading = false
          this.$message({
            message: '解析成功',
            type: 'success',
            duration: 800
          })
          this.draw(data)
        }
      }, (progressRate) => {
        this.loadingText = '已解析:' + progressRate + '%'
      })
    },
    draw(themeData) {
      this.buildPreviewThirdApp(themeData.icons)
      Canvas.drawthirdPreview(themeData.wallpaper[0].url, this.previewThirdAppData, '#000').then(thirdData => {
        console.log('--', thirdData)
        themeData.preview.push(thirdData)
        if (this.themeData.preview.length > 2) {
          themeData.preview.push(this.themeData.preview[2])
        } else {
          themeData.preview.push({ file: null, fileName: 'preview_widgets.jpg', url: '' })
        }
        console.log(themeData)
        this.imageData = themeData
      }).catch(e => {
        this.$message.error('生成主屏幕预览图异常')
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
        if (missIcons.length <= 6) {
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
    }
  }
}
</script>

<style scoped>
.theme-preview-img{
  width: auto;
  height: 260px;
  /* margin-right: 45px; */
  cursor: pointer;
}
</style>
