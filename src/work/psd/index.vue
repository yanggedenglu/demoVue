<template>
  <!-- npm install psd.js --save  //注意浏览器要使用psd.js  -->
  <div>
    <div class="upload">
      <input type="file" class="file" name="" @change="parsePSD">
      点击添加或拖放PSD文件
    </div>
    <input type="button" value="111" @click="clickbutton">
    <div id="image" />
    <pre id="data" />
  </div>
</template>

<script>
import PSD from 'psd.js'
export default {
  data() {
    return {
      form: {
        width: '',
        height: '',
        x: '',
        y: '',
        name: '',
        align: '',
        colors: []
      },
      e_mkdirs: [],
      child_map: new Map()
    }
  },
  mounted() {
  },
  methods: {
    parsePSD(e) {
      // psd文件
      const file = e.target.files[0]
      var url = URL.createObjectURL(file)
      var mkdirs = []
      const child_map = new Map()
      PSD.fromURL(url).then(psd => {
        var data = JSON.stringify(psd.tree().export(), undefined, 2)
        document.getElementById('data').innerHTML = data
        document.getElementById('image').appendChild(psd.image.toPng())

        // 字间距
        const childrens = psd.tree().children()
        childrens.forEach(item => {
          if (item._children.length > 0) {
            console.log(item)
            const _child = item._children
            _child.forEach(i => {
              console.log(i)
              const typeTool = i.get('typeTool')
              if (typeof typeTool !== 'undefined') {
                if (typeof (typeTool.styles().Tracking) !== 'undefined') {
                  console.log(typeTool.styles().Tracking[0])
                  child_map.set(i.name, typeTool.styles().Tracking[0])
                } else {
                  child_map.set(i.name, 0)
                }
              }
            })
          }
        })

        console.log(child_map.get('date'))
        this.child_map = child_map
        var exportData = psd.tree().export()
        exportData.children.forEach(item => {
          mkdirs.push(item)
        })
      })
      this.e_mkdirs = mkdirs
    },

    clickbutton() {
      console.log(this.e_mkdirs)
      // 所有图层
      var children = this.e_mkdirs
      for (var i = 0; i < children.length; i++) {
        // 自定义图片文件夹图层
        var i_child = children[i].children
        if (typeof (i_child) !== 'undefined') {
          for (var j = 0; j < i_child.length; j++) {
            const { width, height, top, left, name } = i_child[j]
            const text = i_child[j].text
            // 宽 高 据左 据上
            console.log('width:' + width, 'height:' + height, 'x:' + left, 'y:' + top)
            if (typeof (text) !== 'undefined') {
              const { alignment, colors, sizes, names } = text.font
              const fontColor = colors && colors.length ? this.rgbToHex(colors[0]) : '#000000'
              const { yy } = text.transform
              const fontSize = Math.round(sizes[0] * yy)
              console.log('样式value:' + text.value, '对齐方式:' + alignment[0], '字体颜色:' + fontColor, '字号:' + fontSize, '字间距:' + this.child_map.get(name),
                '字体类型：' + names[0], '字重： ', '类型:' + name)
            } else {
              console.log('样式value:', '对齐方式:', '字体颜色:', '字号:', '字间距:',
                '字体类型：', '字重： ', '类型:' + name)
            }
          }
        }
      }
    },
    // 转换颜色
    rgbToHex([r, g, b, h]) {
      const bin = (r << 16 | g << 8 | b).toString(16)
      return `#${bin.padStart(6, '0')}`
    }
  }
}
</script>

<style scoped>

</style>
