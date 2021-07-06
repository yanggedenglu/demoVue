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
        lockMaskImg.src = 'static/img/third_mask.png'
        lockMaskImg.crossOrigin = 'Anonymous'
        lockMaskImg.onload = () => {
          context.drawImage(lockMaskImg, 0, 0, TARGET_WIDTH, TARGET_HEIGHT)

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
                  context.drawImage(iconImg, 40 + (j * 300), 160 + (i * 320), 300, 300)
                  context.font = '35px Courier New'
                  context.fillStyle = '#' + fontColor
                  context.textAlign = 'center'
                  context.fillText(iconItem.appName, 190 + (j * 300), 475 + (i * 320))
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
                context.drawImage(iconImg, 40 + (i * 300), 2438, 300, 300)
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

export default {
  drawLockPreview, drawthirdPreview
}
