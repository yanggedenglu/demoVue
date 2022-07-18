<template>
  <div class="hello">
    <img id="imgs" class="image" src="../../../static/img/12-oppo_default_wallpaper.jpg">
    <el-button style="float:left;" @click="clickButton">canvas</el-button>
    <canvas id="three" width="500" height="1000" style="border: solid 1px #000" />
    <p><br></p>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    clickButton() {
      // 创建canvas喜爱那个
      var canvas = document.createElement('canvas')
      var ctx = canvas.getContext('2d')
      ctx.fillStyle = 'rgba(255, 255, 255, 0)'
      canvas.width = 500
      canvas.height = 1000
      // 获取图片对象
      var img = document.getElementById('imgs')
      ctx.drawImage(img, 0, 0)

      var three = document.getElementById('three')
      var threectx = three.getContext('2d')

      // 画布转为图片
      const saveImage = new Image()
      saveImage.crossOrigin = 'Anonymous'
      saveImage.src = canvas.toDataURL('image/png')
      saveImage.onload = () => {
        threectx.drawImage(canvas, 0, 0)
        console.log(canvas.toDataURL('image/png'))
      }
    }
  }
}
</script>

<style scoped>
.image{
  width: 400px;
  height: 800px;
  margin: 0px 0px 0px 20px;
  border: 1px solid #000;
}
</style>
