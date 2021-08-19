<template>
  <div class="hello">
    <img id="imgs" src="../../../static/img/12-oppo_default_wallpaper.jpg">
    <p><br></p>
    <el-button type="success" @click="getClick">成功按钮</el-button>
    <canvas id="canvas" width="500" height="1000" style="border: solid 1px #000" />
    <canvas id="agacanvas" width="500" height="1000" style="border: solid 1px #000" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Welcome'
    }
  },
  methods: {
    // 保存 先模糊，填充
    getClick() {
      console.log('click')
      var canvas = document.getElementById('canvas')
      var ctx = canvas.getContext('2d')
      var imgs = document.getElementById('imgs')
      // 普通画图
      ctx.drawImage(imgs, 20, 20, 400, 1000)

      // 使用stackblur-canvas
      // const StackBlur = require('stackblur-canvas')
      const imageData = ctx.getImageData(20, 500, 300, 200)

      var blurImage = this.getClick2(imageData)
      console.log(blurImage)
      blurImage.onload = () => {
        ctx.drawImage(blurImage, 0, 0)
      }
      this.roundRect(ctx, 0, 0)
      // StackBlur.canvasRGB(canvas, 20, 500, 300, 200, 30)
      // 画部分图 设置背景色 透明度
      // ctx.fillStyle = '#D2D2D2'
      // ctx.globalAlpha = 0.3
      // this.roundRect(blurImage, 0, 500, 300, 200, 30)
      // ctx.drawImage(blurImage, 20, 20, 400, 1000)
    },
    // getImageData  put贴到 新的canvas上  模糊 填充 切圆角  贴回来
    getClick2(imageData) {
      var canvas = document.getElementById('agacanvas')
      var ctx = canvas.getContext('2d')
      ctx.putImageData(imageData, 0, 0)

      // 使用stackblur-canvas
      const StackBlur = require('stackblur-canvas')
      StackBlur.canvasRGB(canvas, 0, 0, 300, 200, 30)
      // 画部分图 设置背景色 透明度
      ctx.fillStyle = '#D2D2D2'
      ctx.globalAlpha = 0.3
      this.drawRoundedRect(ctx, 0, 0, 300, 200, 30, 'fill')
      this.roundRect(ctx, 0, 0, 300, 200, 30)

      const saveImage = new Image()
      saveImage.crossOrigin = 'Anonymous'
      saveImage.src = canvas.toDataURL('image/png')

      return saveImage

      // ctx.fillRect(100,100,50,50)
      // StackBlur.canvasRGB(canvas,100,100,50,50, 46);
      // StackBlur.image(imgs, canvas, 40);
    },
    // 画椭圆
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
