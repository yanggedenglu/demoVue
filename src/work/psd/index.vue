<template>
  <div>
    <el-upload
      :auto-upload="false"
      :on-change="parsePSD"
      :on-remove="removePSD"
      :multiple="false"
      :file-list="fileList"
      class="upload-demo"
      drag
      action=""
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">点击添加或拖放PSD文件</div>
    </el-upload>
    <img :src="src">
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="exportData">上传</el-button>
    </span>
    <canvas id="three" width="500" height="1000" style="border: solid 1px #000" />
  </div>
</template>

<script>
import PSD from 'psd.js'
export default {
  data() {
    return {
      fileList: [],
      textList: [],
      imageList: [], // image base64列表
      l_background: '',
      src: ''
    }
  },
  methods: {
    parsePSD(file) {
      this.removePSD()
      this.fileList = [file]
      // psd文件
      var url = URL.createObjectURL(file.raw)
      const _mkdirs_tracking = [] // 图层文件夹对应字间距列表

      PSD.fromURL(url).then(psd => {
        // 背景图片
        const blob = this.dataURLToBlob(psd.image.toBase64())
        this.l_background = psd.image.toBase64()
        this.imageList.push({ file: new window.File([blob], 'background') })
        // 获取图层数据
        const childrens = psd.tree().children()

        childrens.forEach(item => {
          if (item._children.length > 0) {
            // 图层文件夹
            const _child = item._children
            const _tracking = []
            _child.forEach(i => {
              // 图层
              const typeTool = i.get('typeTool')
              if (typeof typeTool !== 'undefined') {
                // 获取字间距
                if (typeof (typeTool.styles().Tracking) !== 'undefined') {
                  _tracking.push(typeTool.styles().Tracking[0])
                } else {
                  _tracking.push(0)
                }
              }
              // 获取图层图片
              const blob = this.dataURLToBlob(i.layer.image.toBase64())
              this.imageList.push({ file: new window.File([blob], i.name) })
            })
            _mkdirs_tracking.push(_tracking)
          }
        })

        // 导出图层数据
        var exportData = psd.tree().export()
        const _export_childrens = exportData.children
        for (var i = 0; i < _export_childrens.length; i++) {
          // 顶级图层/文件夹
          const name = _export_childrens[i].name
          var i_child = _export_childrens[i].children

          if (typeof (i_child) !== 'undefined') {
            for (var j = 0; j < i_child.length; j++) {
              const { text } = i_child[j]
              // 顶级文件夹下子图层
              if (typeof (text) !== 'undefined') {
                const font_tracking = _mkdirs_tracking[i][j] != null ? _mkdirs_tracking[i][j] : 0
                // 文字图层
                this.textList.push(this.setImageData(true, _export_childrens[i], i_child[j], font_tracking, name))
              } else {
                // 图片图层
                this.textList.push(this.setImageData(false, _export_childrens[i], i_child[j], '', name))
              }
            }

            // 裁剪预览图，默认图层文件夹中最后一个图层
            const lastImg = i_child[i_child.length - 1]
            this.canvasEffectImage(this.l_background, lastImg, i)
          }
        }
      })
    },
    /**
     * @isText 图层是否为文字
     * @mkdir 组件信息
     * @child 控件信息
     * @font_tracking 字间距
     * @mkdirName 图层文件夹名称
     */
    setImageData(isText, mkdir, child, font_tracking, mkdirName) {
      // 组件
      const m_mkdir_width = mkdir.width
      const m_mkdir_height = mkdir.height
      const m_mkdir_left = mkdir.left
      const m_mkdir_top = mkdir.top
      // 控件
      const { width, height, top, left, name, text } = child
      const x = ((left - m_mkdir_left) / m_mkdir_width).toFixed(3)
      const y = ((top - m_mkdir_top) / m_mkdir_height).toFixed(3)
      const w = (width / m_mkdir_width).toFixed(3)
      const h = (height / m_mkdir_height).toFixed(3)
      if (isText) {
        const { alignment, colors, sizes, names } = text.font
        const { yy } = text.transform

        const font_color = colors && colors.length ? this.rgbToHex(colors[0]) : '#000000'
        const font_size = Math.round(sizes[0] * yy)
        const _tracking = Math.round((font_size / 1000) * font_tracking)
        return { 'w': w, 'h': h, 'x': x, 'y': y, 'mkdirName': mkdirName, 'type': 2,
          'fontAlign': alignment[0], 'fontColor': font_color, 'fontSize': font_size, 'fontSpace': _tracking, 'fontFamily': names[0], 'fontWidget': '', 'textType': name, 'textStyle': text.value }
      } else {
        return { 'w': w, 'h': h, 'x': x, 'y': y, 'mkdirName': mkdirName, 'type': 1,
          'fontAlign': '', 'fontColor': '', 'fontSize': '', 'fontSpace': '', 'fontFamily': '', 'fontWidget': '', 'textType': name, 'textStyle': '' }
      }
    },

    // 裁剪图片
    canvasEffectImage(url, lastImg) {
      return new Promise((resolve, reject) => {
        try {
          // 新建模糊画布 用作裁剪
          // const agacanvas = document.createElement('canvas')
          // const agactx = agacanvas.getContext('2d')
          // agacanvas.width = lastImg.width
          // agacanvas.height = lastImg.height

          const file = []
          const canvas = document.createElement('canvas')
          // const canvas = document.getElementById('three')
          const context = canvas.getContext('2d')
          canvas.width = lastImg.width
          canvas.height = lastImg.height
          const iconImage = new Image()
          iconImage.crossOrigin = 'Anonymous'
          iconImage.src = url
          iconImage.onload = () => {
            this.roundRect(context, 0, 0, lastImg.width, lastImg.height, 22)
            context.drawImage(iconImage, lastImg.left, lastImg.top, lastImg.width, lastImg.height, 0, 0, lastImg.width, lastImg.height)
            console.log(canvas.toDataURL('image/jpeg', 0.8))
            const blob = this.dataURLToBlob(canvas.toDataURL('image/jpeg', 0.8))
            file.push({ file: new window.File([blob], 'effectImg') })

            // this.src = URL.createObjectURL(file[0].file)
            // const image = new Image()
            // image.crossOrigin = 'Anonymous'
            // image.src = URL.createObjectURL(file[0].file)
            // image.onload = () => {
            //   this.roundRect(agactx, 0, 0, lastImg.width, lastImg.height, 22)
            //   agactx.drawImage(image, 0, 0)
            //   console.log(agacanvas.toDataURL('image/jpeg', 0.8))
            // }
          }
        } catch (error) {
          reject(error)
        }
      })
    },
    // 导出文件夹
    exportData() {
      console.log(this.textList)
      console.log(this.imageList)
      if (this.textList.length === 0) {
        this.$message.warning('没有读取到文本信息')
        return
      }
      if (this.imageList.length === 0) {
        this.$message.warning('没有读取到图片信息')
        return
      }

      // this.$refs.form.validate((valid) => {
      //   if (valid) {
      //     this.loading = true
      //     const formData = new FormData()
      //     formData.append('name', this.form.name)
      //     formData.append('sequence', this.form.sequence)
      //     formData.append('themeId', this.form.themeId)
      //     // 客户端绘制顺序和图层顺序相反
      //     const data = this.textList.reverse()
      //     for (let i = 0; i < data.length; i++) {
      //       const text = data[i]
      //       formData.append('psdList[' + i + '].mkdirName', text.mkdirName)
      //       formData.append('psdList[' + i + '].x', text.x)
      //       formData.append('psdList[' + i + '].y', text.y)
      //       formData.append('psdList[' + i + '].w', text.w)
      //       formData.append('psdList[' + i + '].h', text.h)
      //       formData.append('psdList[' + i + '].fontAlign', text.fontAlign)
      //       formData.append('psdList[' + i + '].fontColor', text.fontColor)
      //       formData.append('psdList[' + i + '].fontSize', text.fontSize)
      //       formData.append('psdList[' + i + '].fontSpace', text.fontSpace)
      //       formData.append('psdList[' + i + '].fontFamily', text.fontFamily)
      //       formData.append('psdList[' + i + '].textType', text.textType)
      //       formData.append('psdList[' + i + '].textStyle', text.textStyle)
      //       formData.append('psdList[' + i + '].type', text.type)
      //     }

      //     this.imageList.forEach(item => {
      //       formData.append('imageList', item.file)
      //     })
      // WidgetPsdApi.upload(formData).then(res => {
      //   if (res.result) {
      //     this.$message.success('上传成功')
      //     this.fileList = []
      //     this.removePSD()
      //     this.handleClose()
      //     this.$emit('refresh')
      //   }
      // }).catch(err => {
      //   this.loading = false
      //   this.$message.error(err)
      // })
      // }
      // })
    },
    removePSD() {
      this.textList = []
      this.imageList = []
    },

    // 转换颜色
    rgbToHex([r, g, b, h]) {
      const bin = (r << 16 | g << 8 | b).toString(16)
      return `#${bin.padStart(6, '0')}`
    },
    /**
     * dataUrl转blob
     * @param {*} dataUrl
     * @returns
     */
    dataURLToBlob(dataUrl) {
      const arr = dataUrl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = window.atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], {
        type: mime
      })
    },
    roundRect(ctx, x, y, w, h, r) {
      ctx.save()
      if (w < 2 * r) r = w / 2
      if (h < 2 * r) r = h / 2
      ctx.moveTo(x + r, y)
      ctx.arcTo(x + w, y, x + w, y + h, r)
      ctx.arcTo(x + w, y + h, x, y + h, r)
      ctx.arcTo(x, y + h, x, y, r)
      ctx.arcTo(x, y, x + w, y, r)
      ctx.clip()
    }
  }
}
</script>

<style scoped>
.el-upload-dragger{
  width: 300px;
}
</style>

