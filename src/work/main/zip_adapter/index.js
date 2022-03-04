import OppoZipParser from './oppo'

/**
 * 解析zip
 * @param {*} zipFile
 * @param {*} themePlatform
 * @param {*} callback
 */
function parseZip(zipFile, themePlatform, packageMap, callback, progressCallback) {
  if (themePlatform === 'oppo') {
    OppoZipParser.parseZip(zipFile, packageMap, callback, progressCallback)
  } else {
    callback(false, '暂不支持的主题平台：' + themePlatform)
  }
}

export default {
  parseZip
}
