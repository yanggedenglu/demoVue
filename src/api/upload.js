import request from '@/utils/request'

export function upload(data) {
  return request({
    url: 'http://localhost:8000/upload',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
