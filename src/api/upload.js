import request from '@/utils/request'
import http from './http'

function upload(data) {
  return request({
    url: 'http://localhost:8000/upload',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

function upload2(data) {
  return request({
    url: 'http://localhost:8000/upload2',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

function formData(data) {
  return http.post('formData', data)
}

export default {
  upload, upload2, formData
}
