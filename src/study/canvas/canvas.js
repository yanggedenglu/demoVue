// const TARGET_WIDTH = 100
// const TARGET_HEIGHT = 100
const THUMBNAIL_SCALE = 0.8

// 画布
function drawPicture() {
  const promise = new Promise((resolve, reject) => {
    try {
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
      drawRoundedRect(agectx, 0, 500, 300, 200, 30, 'fill')

      // 画布转为图片
      const saveImage = new Image()
      saveImage.crossOrigin = 'Anonymous'
      saveImage.src = agecanvas.toDataURL('image/png')
      // 第一张画布上画对应位置
      saveImage.onload = () => {
        roundRect(ctx, 0, 500, 300, 200, 30)
        ctx.drawImage(saveImage, 0, 0)
        ctx.restore()
      }

      // 第三张画布 模糊层上图片
      var threecanvas = document.getElementById('three')
      var threectx = threecanvas.getContext('2d')
      roundRect(threectx, 20, 520, 150, 150, 30)
      threectx.drawImage(image1, 20, 520, 150, 150)
      const threeImage = new Image()
      threeImage.crossOrigin = 'Anonymous'
      threeImage.src = threecanvas.toDataURL('image/png')
      threeImage.onload = () => {
        roundRect(ctx, 20, 520, 150, 150, 30)
        ctx.drawImage(threeImage, 0, 0)
        ctx.restore()
      }

      const blob = dataURLToBlob(canvas.toDataURL('image/png'), THUMBNAIL_SCALE)
      resolve({
        file: new window.File([blob], 'desktop.jpg'),
        url: window.URL.createObjectURL(blob),
        fileName: 'desktop.jpg'
      })
    } catch (error) {
      reject(error)
    }
  })
  return promise
}

// 画椭圆 填充底色
function drawRoundedRect(ctx, x, y, width, height, radius, type) {
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
}
// dataurl转blob
function dataURLToBlob(dataurl) {
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
}
// 剪切圆角矩形
function roundRect(ctx, x, y, w, h, r) {
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

export default {
  drawPicture
}
