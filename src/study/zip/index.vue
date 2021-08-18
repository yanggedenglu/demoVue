<template>
  <!-- 解析xml  -->
  <div>
    <div>
      <h1>图像背景模糊处理</h1>
      <canvas id="canvasaaa" width="600" height="300" />
      <div>
        <label>背景模糊半径</label> <input id="slider" type="range" min="0" max="50" value="0">
        <br><br>
        <label>叠加图层透明度</label>
        <input id="alpha" type="range" step="0.1" min="0" max="1" value="1">
        <br><br>
        <button id="add" onclick="getcan()">合并</button>
        <br><br>
        <button onclick="exportCanvasAsPNG('canvas','mohu')">保存</button>
      </div>
    </div>
  </div>
  <!--  src="./wallpaper.jpg"
  http://localhost:9528/static/img/wallpaper.3118bcb0.jpg -->
</template>

<script>
// 引入StackBlur.js
import * as StackBlur from '/js/stackblur.js'
export default {
  data() {
    return {
      fileList: [],
      // url: 'http://localhost:9528/static/img/wallpaper.3118bcb0.jpg'
      url: '',
      TARGET_WIDTH: 1284,
      TARGET_HEIGHT: 2778
    }
  },
  created() {
  },
  methods: {
    getcan() {
      this.canvas()
    },
    canvas() {
      // 获取预览的convas对象
      const canvas = document.getElementById('#canvasaaa')
      const cctx = canvas.getContext('2d')

      // 创建一个待处理的convas对象
      const buff = document.createElement('canvas')
      buff.width = cctx.width
      buff.height = cctx.height
      const bctx = buff.getContext('2d')

      // 加载图片
      var img = new Image()
      img.src = '/static/img/image2.jpg'
      img.onload = function() {
        bctx.drawImage(img, 0, 0, 600, 300)
        console.log('img is loaded')
        bctx.drawImage(buff, 0, 0)
      }
    }
  }
}
</script>

<style>
img{
  width: 1284px;
  height: 2778px;
  margin: 0px 50px;
}
</style>
