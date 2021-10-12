<template>
  <!--
    “HTML5画布” 的知识点
    https://blog.csdn.net/azl397985856/article/details/108138528?ops_request_misc=%257B%2522request%255Fid%2522%253A
    %2522162919247916780264025674%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=162919247916780264025674
    &biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_v2~rank_v29-1-108138528
    .pc_search_result_control_group&utm_term=js+canva%E9%AB%98%E6%96%AF%E6%A8%A1%E7%B3%8A&spm=1018.2226.3001.4187

    canvas模糊特效
    https://www.npmjs.com/package/stackblur-canvas
   -->
  <div class="hello">
    <img id="imgs" src="../../../static/img/12-oppo_default_wallpaper.jpg">
    <img id="image1" src="../../../static/img/image1.jpg">
    <p><br></p>
    <el-button type="success" @click="drawPicture3">成功按钮</el-button>
    <canvas id="canvas" width="500" height="1000" style="border: solid 1px #000" />
    <canvas id="agacanvas" width="500" height="1000" style="border: solid 1px #000" />
    <canvas id="three" width="500" height="1000" style="border: solid 1px #000" />
  </div>
</template>

<script>
import exportCanvas from './canvas.js'
export default {
  data() {
    return {
      msg: 'Welcome'
    }
  },
  methods: {
    drawPicture() {
      var canvas = document.getElementById('canvas')
      var ctx = canvas.getContext('2d')
      var imgs = document.getElementById('imgs')
      // 普通画图
      ctx.drawImage(imgs, 0, 0, 400, 1000)

      // 第二张画布
      var agecanvas = document.getElementById('agacanvas')
      var agectx = agecanvas.getContext('2d')
      agectx.drawImage(imgs, 0, 0, 400, 1000)
      // 模糊 + 填充
      const StackBlur = require('stackblur-canvas')
      StackBlur.canvasRGBA(agecanvas, 0, 500, 300, 200, 30)
      agectx.fillStyle = '#D2D2D2'
      agectx.globalAlpha = 0.3
      this.drawRoundedRect(agectx, 0, 500, 300, 200, 30, 'fill')
      // 画布转为图片
      const saveImage = new Image()
      saveImage.crossOrigin = 'Anonymous'
      saveImage.src = agecanvas.toDataURL('image/png')

      // 第一张画布上画对应位置
      saveImage.onload = () => {
        this.roundRect(ctx, 0, 500, 300, 200, 30)
        ctx.drawImage(saveImage, 0, 0)
        ctx.restore()
      }

      // 第三张图标画布
      var three = document.getElementById('three')
      var threectx = three.getContext('2d')
      for (let index = 0; index < 4; index++) {
        // 裁剪圆角
        this.roundRect(threectx, 20 + (index * 100), 500, 100, 100, 30)
        threectx.drawImage(imgs, 20 + (index * 100), 500, 100, 100)
        threectx.restore()
      }
      // 图标画布转图片
      const icon = new Image()
      icon.crossOrigin = 'Anonymous'
      icon.src = three.toDataURL('image/png')
      // 第一张画布上画对应位置
      icon.onload = () => {
        // for (let index = 0; index < 4; index++) {
        //   this.roundRect(ctx, 20 + (index * 100), 500, 100, 100, 30)
        //   ctx.drawImage(icon, 0, 0)
        //   ctx.restore()
        // }
        ctx.drawImage(icon, 0, 0)
      }
    },
    // 新建第三张画布，存储模糊层上的图片
    drawPicture2() {
      var imgs = document.getElementById('imgs')
      var image1 = document.getElementById('image1')

      var canvas = document.getElementById('canvas')
      var ctx = canvas.getContext('2d')
      // 普通画图
      ctx.drawImage(imgs, 0, 0, 400, 1000)

      // 第二张画布 模糊层
      var agecanvas = document.getElementById('agacanvas')
      var agectx = agecanvas.getContext('2d')
      agectx.drawImage(imgs, 0, 0, 400, 1000)
      // 模糊 + 填充
      const StackBlur = require('stackblur-canvas')
      StackBlur.canvasRGBA(agecanvas, 0, 500, 300, 200, 30)
      agectx.fillStyle = '#D2D2D2'
      agectx.globalAlpha = 0.3
      this.drawRoundedRect(agectx, 0, 500, 300, 200, 30, 'fill')

      // 画布转为图片
      const saveImage = new Image()
      saveImage.crossOrigin = 'Anonymous'
      saveImage.src = agecanvas.toDataURL('image/png')
      // 第一张画布上画对应位置
      saveImage.onload = () => {
        this.roundRect(ctx, 0, 500, 300, 200, 30)
        ctx.drawImage(saveImage, 0, 0)
        ctx.restore()
      }

      // 第三张画布 模糊层上图片
      var threecanvas = document.getElementById('three')
      var threectx = threecanvas.getContext('2d')
      this.roundRect(threectx, 20, 520, 150, 150, 30)
      threectx.drawImage(image1, 20, 520, 150, 150)
      const threeImage = new Image()
      threeImage.crossOrigin = 'Anonymous'
      threeImage.src = threecanvas.toDataURL('image/png')
      threeImage.onload = () => {
        this.roundRect(ctx, 20, 520, 150, 150, 30)
        ctx.drawImage(threeImage, 0, 0)
        ctx.restore()
      }
    },
    // 测试引入js方法
    drawPicture3() {
      const list = []
      exportCanvas.drawPicture(data => {
        list.push(data)
        console.log(list)
      })
    },

    // 画椭圆 填充底色
    drawRoundedRect(ctx, x, y, width, height, radius, type) {
      ctx.get
      ctx.moveTo(x, y + radius)
      ctx.beginPath()
      ctx.arc(x + radius, y + radius, radius, Math.PI, 1.5 * Math.PI)
      ctx.arc(x + width - radius, y + radius, radius, 1.5 * Math.PI, 2 * Math.PI)
      ctx.arc(x + width - radius, y + height - radius, radius, 0, 0.5 * Math.PI)
      ctx.arc(x + radius, y + height - radius, radius, 0.5 * Math.PI, Math.PI)
      ctx.closePath()
      const method = type || 'stroke' // 默认描边，传入fill即可填充矩形
      ctx[method]()
    },
    // dataurl转blob
    dataURLToBlob(dataurl) {
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], {
        type: mime
      })
    },
    // 剪切圆角矩形
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img{
  width: 500px;
  height: 1000px;
}
</style>
