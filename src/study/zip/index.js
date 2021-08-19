const TARGET_WIDTH = 1284
const TARGET_HEIGHT = 2778
const THUMBNAIL_SCALE = 0.8

/**
 * 画锁屏预览图
 * @param {*} wallpaperSrc
 * @param {*} fontColor
 */
function drawLockPreview(wallpaperSrc, fontColor) {
  const promise = new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      const wallpaperImg = new Image()
      wallpaperImg.crossOrigin = 'Anonymous'
      wallpaperImg.src = wallpaperSrc
      wallpaperImg.onload = () => {
        canvas.width = TARGET_WIDTH
        canvas.height = TARGET_HEIGHT
        // 计算比例 如果目标高/宽比 小于 所给壁纸 说明壁纸的 高度更高 所以宽自适应 高需要裁减 反之同理
        if (TARGET_HEIGHT / TARGET_WIDTH <= wallpaperImg.height / wallpaperImg.width) {
          const cjHeight = wallpaperImg.width * TARGET_HEIGHT / TARGET_WIDTH
          context.drawImage(wallpaperImg, 0, (wallpaperImg.height - cjHeight) / 2, wallpaperImg.width, cjHeight, 0, 0, TARGET_WIDTH, TARGET_HEIGHT)
        } else {
          const cjWidth = wallpaperImg.height * TARGET_WIDTH / TARGET_HEIGHT
          context.drawImage(wallpaperImg, (wallpaperImg.width - cjWidth) / 2, 0, cjWidth, wallpaperImg.height, 0, 0, TARGET_WIDTH, TARGET_HEIGHT)
        }

        const lockMaskImg = new Image()
        lockMaskImg.crossOrigin = 'Anonymous'
        lockMaskImg.src = fontColor === '000000' ? 'static/img/lock_mask_black.png' : 'static/img/lock_mask_white.png'
        lockMaskImg.onload = () => {
          context.drawImage(lockMaskImg, 0, 0, TARGET_WIDTH, TARGET_HEIGHT)
          const blob = dataURLToBlob(canvas.toDataURL('image/jpeg', THUMBNAIL_SCALE))
          resolve({
            file: new window.File([blob], 'lockscreen.jpg'),
            url: window.URL.createObjectURL(blob),
            fileName: 'lockscreen.jpg'
          })
        }
      }
    } catch (error) {
      reject(error)
    }
  })
  return promise
}

/**
 * 画桌面预览图
 * @param {*} wallpaperSrc
 * @param {*} previewThirdIcon
 * @param {*} fontColor
 */
function drawthirdPreview(wallpaperSrc, previewThirdIcon, fontColor) {
  const promise = new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      const wallpaperImg = new Image()
      wallpaperImg.src = wallpaperSrc
      wallpaperImg.crossOrigin = 'Anonymous'
      wallpaperImg.onload = () => {
        canvas.width = TARGET_WIDTH
        canvas.height = TARGET_HEIGHT
        if (TARGET_HEIGHT / TARGET_WIDTH <= wallpaperImg.height / wallpaperImg.width) {
          const cjHeight = wallpaperImg.width * TARGET_HEIGHT / TARGET_WIDTH
          context.drawImage(wallpaperImg, 0, (wallpaperImg.height - cjHeight) / 2, wallpaperImg.width, cjHeight, 0, 0, TARGET_WIDTH, TARGET_HEIGHT)
        } else {
          const cjWidth = wallpaperImg.height * TARGET_WIDTH / TARGET_HEIGHT
          context.drawImage(wallpaperImg, (wallpaperImg.width - cjWidth) / 2, 0, cjWidth, wallpaperImg.height, 0, 0, TARGET_WIDTH, TARGET_HEIGHT)
        }
        const lockMaskImg = new Image()
        lockMaskImg.src = fontColor === '000000' ? 'static/img/home_mask_black.png' : 'static/img/home_mask_white.png'
        lockMaskImg.crossOrigin = 'Anonymous'
        lockMaskImg.onload = () => {
          context.drawImage(lockMaskImg, 0, 0, TARGET_WIDTH, TARGET_HEIGHT)

          const saveImage = new Image()
          saveImage.crossOrigin = 'Anonymous'
          saveImage.src = canvas.toDataURL('image/png')

          var half = context.getImageData(37, 2416, 1213, 320)
          // 高斯模糊
          var halfImg = gaussBlur(half)
          context.putImageData(halfImg, 37, 2416)

          roundRect(context, 37, 2416, 1213, 320, 46)

          saveImage.onload = () => {
            context.drawImage(saveImage, 0, 0, 37, 2416, 1213, 320)
          }

          context.restore()

          const promiseList = []

          for (let i = 0; i < previewThirdIcon.desk.length; i++) {
            const rowIconList = previewThirdIcon.desk[i]
            for (let j = 0; j < rowIconList.length; j++) {
              const iconItem = rowIconList[j]
              const pm = new Promise((res, rej) => {
                var iconImg = new Image()
                iconImg.src = iconItem.url
                iconImg.crossOrigin = 'Anonymous'
                iconImg.onload = function() {
                  roundRect(context, 100 + (j * 295), 248 + (i * 345), 200, 200, 46)
                  context.drawImage(iconImg, 100 + (j * 295), 248 + (i * 345), 200, 200)
                  context.restore()
                  context.font = '39px Arial'
                  context.fillStyle = '#' + fontColor
                  context.textAlign = 'center'
                  context.fillText(iconItem.appName, 200 + (j * 295), 468 + 30 + (i * 345))
                  res()
                }
              })
              promiseList.push(pm)
            }
          }

          for (let i = 0; i < previewThirdIcon.duck.length; i++) {
            const iconItem = previewThirdIcon.duck[i]
            const pm = new Promise((res, rej) => {
              var iconImg = new Image()
              iconImg.src = iconItem.url
              iconImg.crossOrigin = 'Anonymous'
              iconImg.onload = function() {
                roundRect(context, 100 + (i * 295), 2476, 200, 200, 46)
                context.drawImage(iconImg, 100 + (i * 295), 2476, 200, 200)
                context.restore()
                res()
              }
            })
            promiseList.push(pm)
          }
          Promise.all(promiseList).then(() => {
            const blob = dataURLToBlob(canvas.toDataURL('image/jpeg', THUMBNAIL_SCALE))
            resolve({
              file: new window.File([blob], 'desktop.jpg'),
              url: window.URL.createObjectURL(blob),
              fileName: 'desktop.jpg'
            })
          })
        }
      }
    } catch (error) {
      reject(error)
    }
  })
  return promise
}

/**
 * 画圆角
 * @param {*} ctx
 * @param {*} x
 * @param {*} y
 * @param {*} w
 * @param {*} h
 * @param {*} r
 */
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

/**
 * dataurl转blob
 * @param {*} dataurl
 * @returns
 */
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

// 高斯模糊
function gaussBlur(imgData) {
  var pixes = imgData.data
  var width = imgData.width
  var height = imgData.height
  // eslint-disable-next-line one-var
  var gaussMatrix = [],
    gaussSum = 0,
    x, y,
    r, g, b, a,
    i, j, k, len

  var radius = 46
  var sigma = 5

  a = 1 / (Math.sqrt(2 * Math.PI) * sigma)
  b = -1 / (2 * sigma * sigma)
  // 生成高斯矩阵
  for (i = 0, x = -radius; x <= radius; x++, i++) {
    g = a * Math.exp(b * x * x)
    gaussMatrix[i] = g
    gaussSum += g
  }

  // 归一化, 保证高斯矩阵的值在[0,1]之间
  for (i = 0, len = gaussMatrix.length; i < len; i++) {
    gaussMatrix[i] /= gaussSum
  }
  // x 方向一维高斯运算
  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      r = g = b = a = 0
      gaussSum = 0
      for (j = -radius; j <= radius; j++) {
        k = x + j
        if (k >= 0 && k < width) { // 确保 k 没超出 x 的范围
          // r,g,b,a 四个一组
          i = (y * width + k) * 4
          r += pixes[i] * gaussMatrix[j + radius]
          g += pixes[i + 1] * gaussMatrix[j + radius]
          b += pixes[i + 2] * gaussMatrix[j + radius]
          // a += pixes[i + 3] * gaussMatrix[j];
          gaussSum += gaussMatrix[j + radius]
        }
      }
      i = (y * width + x) * 4
      // 除以 gaussSum 是为了消除处于边缘的像素, 高斯运算不足的问题
      // console.log(gaussSum)
      pixes[i] = r / gaussSum
      pixes[i + 1] = g / gaussSum
      pixes[i + 2] = b / gaussSum
      // pixes[i + 3] = a ;
    }
  }
  // y 方向一维高斯运算
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      r = g = b = a = 0
      gaussSum = 0
      for (j = -radius; j <= radius; j++) {
        k = y + j
        if (k >= 0 && k < height) { // 确保 k 没超出 y 的范围
          i = (k * width + x) * 4
          r += pixes[i] * gaussMatrix[j + radius]
          g += pixes[i + 1] * gaussMatrix[j + radius]
          b += pixes[i + 2] * gaussMatrix[j + radius]
          // a += pixes[i + 3] * gaussMatrix[j];
          gaussSum += gaussMatrix[j + radius]
        }
      }
      i = (y * width + x) * 4
      pixes[i] = r / gaussSum
      pixes[i + 1] = g / gaussSum
      pixes[i + 2] = b / gaussSum
    }
  }
  return imgData
}

export default {
  drawLockPreview, drawthirdPreview
}
