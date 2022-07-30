import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getCookie } from '@/utils/auth'
// 封装axios
// create an axios instance 创建一个axios实例
const BASE_URL = 'http://localhost:8000/'
const service = axios.create({
  baseURL: BASE_URL, // url = base url + request url
  timeout: 500000 // request timeout
})

// request interceptor 请求拦截
service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   config.headers['CToken'] = getCookie()
    // }
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['CToken'] = getCookie()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// // response interceptor
// service.interceptors.response.use(
//   response => {
//     const res = response.data
//     if (res.code !== 20000 && res.code !== 50000) {
//       Message({
//         message: res.message || 'Error',
//         type: 'error',
//         duration: 5 * 1000
//       })

//       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//         // to re-login
//         MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
//           confirmButtonText: 'Re-Login',
//           cancelButtonText: 'Cancel',
//           type: 'warning'
//         }).then(() => {
//           store.dispatch('user/resetToken').then(() => {
//             location.reload()
//           })
//         })
//       }
//       return Promise.reject(new Error(res.message || 'Error'))
//     } else {
//       return res
//     }
//   },
//   error => {
//     console.log('err' + error) // for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

function get(url) {
  return service({
    url: BASE_URL + url,
    method: 'get'
  })
}

function post(url, data) {
  return service({
    url: BASE_URL + url,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

function del(url) {
  return service({
    url: BASE_URL + url,
    method: 'delete'
  })
}

function put(url, data) {
  return service({
    url: BASE_URL + url,
    method: 'put',
    data
  })
}

export default {
  get, post, del, put
}
