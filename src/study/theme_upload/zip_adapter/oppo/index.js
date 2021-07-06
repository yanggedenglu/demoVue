import JsZip from 'jszip'
import X2js from 'x2js'

const THEME_FIXED_PATH = {
  themeInfo: 'themeInfo.xml',
  previewLock: 'picture/res/drawable-xxhdpi-3168x1440/preview_lock.jpg',
  previewThird: 'picture/res/drawable-xxhdpi-3168x1440/preview_third.jpg',
  wallpaper: 'wallpaper',
  wallpaperDeatil: 'res/drawable-xxhdpi-3168x1440/oppo_default_wallpaper.jpg',
  icons: 'icons',
  iconInfo: 'allApps.xml'
}

/**
 * 解析文件
 * @param {*} zipFile
 * @param {*} packageMap
 * @param {*} callback 解析结果回调
 * @param {*} progressCallback 解析进度回调
 */
function parseZip(zipFile, packageMap, callback, progressCallback) {
  // 解压zip
  JsZip.loadAsync(zipFile).then((zip) => {
    const filePromise = [themeInfoDataParse(zip.files), wallpaperDataParse(zip.files), iconsDataParse(zip.files, packageMap)]
    Promise.all(filePromise).then(res => {
      const themeData = {}
      if (res && res.length > 0) {
        res.forEach(item => {
          if (item.type === 'themeInfo') {
            themeData.author = item.author
            themeData.description = item.description
            themeData.summary = item.summary
          } else if (item.type === 'wallpaper') {
            themeData.wallpaper = item.imgs
          } else if (item.type === 'icon') {
            themeData.icons = item.imgs
          }
        })
        callback(true, '解析成功', themeData)
      }
    }).catch(e => {
      console.error(e)
      callback(false, '解析异常')
    })
  }).catch(err => {
    console.error(err)
    callback(false, '解压zip异常')
  })
}

/**
 * 主题信息解析
 * @param {*} zipFiles
 */
function themeInfoDataParse(zipFiles) {
  const promise = new Promise((res, rej) => {
    zipFiles[THEME_FIXED_PATH.themeInfo].async('blob').then(blobFile => {
      var reader = new FileReader()
      reader.onload = () => {
        const themeInfoXml = new X2js().xml2js(reader.result)
        if (themeInfoXml) {
          const oppoThemeInfo = themeInfoXml.OppoSmartPhoneThemeInfo
          res({
            type: 'themeInfo',
            author: oppoThemeInfo.Author,
            summary: oppoThemeInfo.Summary,
            description: oppoThemeInfo.Description
          })
        } else {
          rej('parse theme info null')
        }
      }
      reader.readAsText(blobFile)
    }).catch(e => {
      rej(e)
    })
  })
  return promise
}

/**
 * 解析壁纸
 * @param {*} zipFiles
 */
function wallpaperDataParse(zipFiles) {
  const promise = new Promise((res, rej) => {
    zipFiles[THEME_FIXED_PATH.wallpaper].async('blob').then(blobFile => {
      JsZip.loadAsync(blobFile).then((wallpaperZip) => {
        imgParse(wallpaperZip.files[THEME_FIXED_PATH.wallpaperDeatil]).then(imgRes => {
          res({
            type: 'wallpaper',
            imgs: [imgRes]
          })
        }).catch(e => {
          rej(e)
        })
      }).catch(e => {
        rej(e)
      })
    }).catch(e => {
      rej(e)
    })
  })
  return promise
}

/**
 * icon解析
 * @param {*} file
 */
function iconsDataParse(zipFiles, packageMap) {
  const promise = new Promise((resolve, reject) => {
    zipFiles[THEME_FIXED_PATH.icons].async('blob').then(blobFile => {
      JsZip.loadAsync(blobFile).then((iconZip) => {
        iconInfoParse(iconZip.files[THEME_FIXED_PATH.iconInfo]).then(iconXmlInfo => {
          const iconPackageInfo = {}
          iconXmlInfo.iconinfo.icon.forEach(item => {
            if (iconPackageInfo[item._name]) {
              iconPackageInfo[item._name].push(item._package)
            } else {
              iconPackageInfo[item._name] = [item._package]
            }
          })
          const iconPathList = []
          for (const path in iconZip.files) {
            const iconFileName = path.substring(path.lastIndexOf('/') + 1)
            const packageNames = iconPackageInfo[iconFileName]
            if (path.indexOf('res/drawable-xxhdpi/') > -1 && path.indexOf('.png') > -1 && packageNames && packageNames.length > 0) {
              packageNames.forEach(packageName => {
                const appName = packageMap[packageName]
                if (appName) {
                  iconPathList.push({
                    path: path,
                    package: packageName,
                    appName: appName
                  })
                }
              })
            }
          }
          const iconPromiseList = []
          iconPathList.forEach(item => {
            const iconPromise = iconParse(iconZip.files[item.path], item.package, item.appName)
            iconPromiseList.push(iconPromise)
          })
          Promise.all(iconPromiseList).then(imgs => {
            resolve({
              type: 'icon',
              imgs: imgs
            })
          }).catch(e => {
            reject(e)
          })
        }).catch(e => {
          reject(e)
        })
      })
    })
  })
  return promise
}

/**
 *
 * @param {*} file
 * @param {*} packageName
 * @param {*} appName
 */
function iconParse(file, packageName, appName) {
  const promise = new Promise((resolve, reject) => {
    imgParse(file).then(imgRes => {
      imgRes.package = packageName
      imgRes.appName = appName
      resolve(imgRes)
    }).catch(e => {
      reject(e)
    })
  })
  return promise
}

/**
 * 解析icon xml 文件
 * @param {*} file
 * @returns
 */
function iconInfoParse(file) {
  const promise = new Promise((resolve, reject) => {
    try {
      file.async('blob').then(blobFile => {
        var reader = new FileReader()
        reader.onload = () => {
          const iconInfoXml = new X2js().xml2js(reader.result)
          resolve(iconInfoXml)
        }
        reader.readAsText(blobFile)
      })
    } catch (error) {
      reject(error)
    }
  })
  return promise
}

/**
 * 解析图片
 * @param {*} file
 * @returns
 */
function imgParse(file) {
  const promise = new Promise((res, rej) => {
    file.async('blob').then(blobFile => {
      const fileName = file.name.substring(file.name.lastIndexOf('/') + 1)
      res({
        file: new window.File([blobFile], fileName),
        url: window.URL.createObjectURL(blobFile),
        fileName: fileName
      })
    }).catch(e => {
      rej(e)
    })
  })
  return promise
}

export default {
  parseZip
}
