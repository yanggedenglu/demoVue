<template>
  <div>
    <el-dialog
      :loading="loading"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="上传PSD"
      width="25%"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="顺序" prop="sequence">
          <el-input v-model.number="form.sequence" />
        </el-form-item>
        <el-form-item label="banner图片">
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
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="exportData">上传</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import WidgetPsdApi from '@/api/theme/theme_psd'
import PSD from 'psd.js'
export default {
  data() {
    return {
      loading: false,
      dialogVisible: false,
      form: {
        themeId: '',
        name: '',
        sequence: 0
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        sequence: [{ required: true, message: '排序不能为空', trigger: 'blur' },
          { type: 'number', message: '排序只能为数字', trigger: 'blur' }]
      },
      fileList: [],
      textList: [],
      imageList: [], // image base64列表
      l_document: '',
      l_background: ''
    }
  },
  methods: {
    init(row) {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.form.themeId = row.id
      })
    },
    handleClose() {
      this.dialogVisible = false
      this.loading = false
      this.form.themeId = ''
      this.form.name = ''
      this.form.sequence = 0
    },
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
        this.background_width = exportData.width
        this.background_height = exportData.height
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
          }
        }
        this.l_document = exportData.document
      }).then(() => {
        console.log(this.imageList)
        this.canvasEffectImage(this.l_document.width, this.l_document.height).then(res => {
          console.log(res)
        })
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
      // console.log('组件', 'w: ' + m_mkdir_width, 'h: ' + m_mkdir_height, 'l: ' + m_mkdir_left, 't: ' + m_mkdir_top)
      // console.log('控件', 'w: ' + width, 'h: ' + height, 'l: ' + left, 't: ' + top, name, text)
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
    canvasEffectImage(width, height) {
      return new Promise((resolve, reject) => {
        try {
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')
          canvas.width = width
          canvas.height = height
          const iconImage = new Image()
          iconImage.crossOrigin = 'Anonymous'
          iconImage.src = this.l_background
          iconImage.onload = () => {
            context.drawImage(iconImage, 0, 0)
            context.rect(20, 20, 150, 100)
            context.stroke()
            context.clip()
            context.drawImage(canvas, 20, 20)
            console.log(canvas.toDataURL('image/jpeg', 0.8))
            const blob = this.dataURLToBlob(canvas.toDataURL('image/jpeg', 0.8))
            resolve({ blob: blob })
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

      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          const formData = new FormData()
          formData.append('name', this.form.name)
          formData.append('sequence', this.form.sequence)
          formData.append('themeId', this.form.themeId)
          // 客户端绘制顺序和图层顺序相反
          const data = this.textList.reverse()
          for (let i = 0; i < data.length; i++) {
            const text = data[i]
            formData.append('psdList[' + i + '].mkdirName', text.mkdirName)
            formData.append('psdList[' + i + '].x', text.x)
            formData.append('psdList[' + i + '].y', text.y)
            formData.append('psdList[' + i + '].w', text.w)
            formData.append('psdList[' + i + '].h', text.h)
            formData.append('psdList[' + i + '].fontAlign', text.fontAlign)
            formData.append('psdList[' + i + '].fontColor', text.fontColor)
            formData.append('psdList[' + i + '].fontSize', text.fontSize)
            formData.append('psdList[' + i + '].fontSpace', text.fontSpace)
            formData.append('psdList[' + i + '].fontFamily', text.fontFamily)
            formData.append('psdList[' + i + '].textType', text.textType)
            formData.append('psdList[' + i + '].textStyle', text.textStyle)
            formData.append('psdList[' + i + '].type', text.type)
          }

          this.imageList.forEach(item => {
            formData.append('imageList', item.file)
          })
          WidgetPsdApi.upload(formData).then(res => {
            if (res.result) {
              this.$message.success('上传成功')
              this.fileList = []
              this.removePSD()
              this.handleClose()
              this.$emit('refresh')
            }
          }).catch(err => {
            this.loading = false
            this.$message.error(err)
          })
        }
      })
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
     * dataurl转blob
     * @param {*} dataurl
     * @returns
     */
    dataURLToBlob(dataurl) {
      const arr = dataurl.split(',')
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
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-upload-dragger{
  width: 300px;
}
</style>
