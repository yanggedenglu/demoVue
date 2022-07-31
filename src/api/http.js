import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getCookie } from '@/utils/auth'
// 封装axios
// create an axios instance 创建一个axios实例
const BASE_URL = 'http://localhost:8000/'
const http = axios.create({
  timeout: 500000 // request timeout
})

// request拦截器
http.interceptors.request.use(
  config => {
    if (!config.headers) {
      config.headers = {}
    }
    if (store.getters.token) {
      config.headers['CToken'] = getCookie()
    }
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    return config
  },
  error => {
    console.log('http interceptors error : {}', error)
    return Promise.reject(error)
  }
)

// response拦截器
http.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

/**
 * 发送请求
 * @param {string} url 请求的URL
 * @param {string} method 请求的方法
 * @param {data} data 请求的数据
 * @param {string} responseType 响应数据的格式
 */
function request(url, method, data, headers, responseType = 'json') {
  // 因为下面的ENV是在外面初始化的，所以这里做URL的拼接
  url = BASE_URL + url
  return http({
    url: url,
    method: method,
    headers: headers,
    data: data,
    responseType: responseType
  })
}

/**
 * 发送GET请求
 * @param {string} url 请求的URL
 * @param {array} headers 请求的头信息
 * @param {string} responseType 响应的数据格式
 */
function get(url, headers, responseType) {
  return request(url, 'get', null, headers, responseType)
}

/**
 * 发送POST请求
 * @param {string} url 请求的URL
 * @param {data} data 请求的数据
 * @param {array} headers 请求的头信息
 * @param {string} responseType 响应数据的格式
 */
function post(url, data, headers, responseType) {
  return request(url, 'post', data, headers, responseType)
}

/**
 * 发送PUT请求
 * @param {string} url 请求的URL
 * @param {data} data 请求的数据
 * @param {array} headers 请求的头信息
 * @param {string} responseType 响应数据的格式
 * @returns
 */
function put(url, data, headers, responseType) {
  return request(url, 'put', data, headers, responseType)
}

/**
 * 发送DELETE请求
 * @param {string} url 请求的URL
 */
function del(url, headers) {
  return request(url, 'delete', null, headers, null)
}

export default {
  get, post, put, del
}
