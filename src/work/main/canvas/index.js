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
      wallpaperImg.crossOrigin = 'Anonymous'
      wallpaperImg.src = wallpaperSrc
      wallpaperImg.onload = () => {
        canvas.width = TARGET_WIDTH
        canvas.height = TARGET_HEIGHT

        // 新建模糊画布 用作裁剪毛玻璃效果
        const agacanvas = document.createElement('canvas')
        const agactx = agacanvas.getContext('2d')
        agacanvas.width = TARGET_WIDTH
        agacanvas.height = TARGET_HEIGHT
        // 新建图标画布
        const iconcanvas = document.createElement('canvas')
        const iconctx = iconcanvas.getContext('2d')
        iconcanvas.width = TARGET_WIDTH
        iconcanvas.height = TARGET_HEIGHT

        if (TARGET_HEIGHT / TARGET_WIDTH <= wallpaperImg.height / wallpaperImg.width) {
          const cjHeight = wallpaperImg.width * TARGET_HEIGHT / TARGET_WIDTH
          context.drawImage(wallpaperImg, 0, (wallpaperImg.height - cjHeight) / 2, wallpaperImg.width, cjHeight, 0, 0, TARGET_WIDTH, TARGET_HEIGHT)
          agactx.drawImage(wallpaperImg, 0, (wallpaperImg.height - cjHeight) / 2, wallpaperImg.width, cjHeight, 0, 0, TARGET_WIDTH, TARGET_HEIGHT)
        } else {
          const cjWidth = wallpaperImg.height * TARGET_WIDTH / TARGET_HEIGHT
          context.drawImage(wallpaperImg, (wallpaperImg.width - cjWidth) / 2, 0, cjWidth, wallpaperImg.height, 0, 0, TARGET_WIDTH, TARGET_HEIGHT)
          agactx.drawImage(wallpaperImg, (wallpaperImg.width - cjWidth) / 2, 0, cjWidth, wallpaperImg.height, 0, 0, TARGET_WIDTH, TARGET_HEIGHT)
        }

        // 模糊，填充效果
        // npm install --save stackblur-canvas
        const StackBlur = require('stackblur-canvas')
        StackBlur.canvasRGBA(agacanvas, 37, 2416, 1213, 320, 30)
        agactx.fillStyle = '#D2D2D2'
        agactx.globalAlpha = 0.3
        drawRoundedRect(agactx, 37, 2416, 1213, 320, 107, 'fill')
        // 模糊画布转图片
        const saveImage = new Image()
        saveImage.crossOrigin = 'Anonymous'
        saveImage.src = agacanvas.toDataURL('image/png')
        // 在原画布上画对应位置
        saveImage.onload = () => {
          roundRect(context, 37, 2416, 1213, 320, 107)
          context.drawImage(saveImage, 0, 0)
          context.restore()
        }

        // 下方图标填充
        const ImageList = []
        for (let i = 0; i < previewThirdIcon.duck.length; i++) {
          const iconItem = previewThirdIcon.duck[i]
          const pm = new Promise((res, rej) => {
            var iconImg = new Image()
            iconImg.crossOrigin = 'Anonymous'
            iconImg.src = iconItem.url || iconItem.iconUrl
            iconImg.onload = function() {
              roundRect(iconctx, 100 + (i * 295), 2476, 200, 200, 46)
              iconctx.drawImage(iconImg, 100 + (i * 295), 2476, 200, 200)
              iconctx.restore()
              res()
            }
          })
          ImageList.push(pm)
        }

        Promise.all(ImageList).then(() => {
          // 图标画布转图片
          const icon = new Image()
          icon.crossOrigin = 'Anonymous'
          icon.src = iconcanvas.toDataURL('image/png')
          // 在原画布上画对应位置
          icon.onload = () => {
            context.drawImage(icon, 0, 0)
          }
        }).then(() => {
          // 调整结构,防止出现下方图标未画上

          const lockMaskImg = new Image()
          lockMaskImg.crossOrigin = 'Anonymous'
          lockMaskImg.src = fontColor === '000000' ? 'static/img/mask_black.png' : 'static/img/mask_white.png'
          lockMaskImg.onload = () => {
            context.drawImage(lockMaskImg, 0, 0, TARGET_WIDTH, TARGET_HEIGHT)

            // 上方图标填充
            const promiseList = []
            for (let i = 0; i < previewThirdIcon.desk.length; i++) {
              const rowIconList = previewThirdIcon.desk[i]
              for (let j = 0; j < rowIconList.length; j++) {
                const iconItem = rowIconList[j]
                const pm = new Promise((res, rej) => {
                  var iconImg = new Image()
                  iconImg.src = iconItem.url || iconItem.iconUrl
                  iconImg.crossOrigin = 'Anonymous'
                  iconImg.onload = function() {
                    roundRect(context, 100 + (j * 295), 248 + (i * 345), 200, 200, 46)
                    context.drawImage(iconImg, 100 + (j * 295), 248 + (i * 345), 200, 200)
                    context.restore()
                    if (process.env.RUN_ENV !== 'dev') {
                      context.font = '39px Arial'
                      context.fillStyle = '#' + fontColor
                      context.textAlign = 'center'
                      context.fillText(iconItem.appName, 200 + (j * 295), 468 + 30 + (i * 345))
                    }
                    res()
                  }
                })
                promiseList.push(pm)
              }
            }

            Promise.all(promiseList).then(() => {
              console.log('ok')
              const blob = dataURLToBlob(canvas.toDataURL('image/jpeg', THUMBNAIL_SCALE))
              resolve({
                file: new window.File([blob], 'desktop.jpg'),
                url: window.URL.createObjectURL(blob),
                fileName: 'desktop.jpg'
              })
            })
          }
        })
      }
    } catch (error) {
      reject(error)
    }
  })
  return promise
}

function drawPreviewWidget(preview_widget) {
  const promise = new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      const wallpaperImg = new Image()
      wallpaperImg.crossOrigin = 'Anonymous'
      wallpaperImg.src = preview_widget
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
        const blob = dataURLToBlob(canvas.toDataURL('image/jpeg', THUMBNAIL_SCALE))
        resolve({
          file: new window.File([blob], 'preview_widgets.jpg'),
          url: window.URL.createObjectURL(blob),
          fileName: 'preview_widgets.jpg'
        })
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

// 画椭圆 填充
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

export default {
  drawLockPreview, drawthirdPreview, dataURLToBlob, drawPreviewWidget
}
