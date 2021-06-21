import request from '@/utils/request'

export function login(data) {
  // console.log("============================ api login")
  return request({
    // url: '/vue-admin-template/user/login',
    url: 'http://localhost:8000/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    // url: '/vue-admin-template/user/info',
    url: 'http://localhost:8000/user/' + token,
    method: 'get'
    // params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

// 注册方法
export function register(data) {
  // console.log("============================ api register")
  return request({
    // url: '/vue-admin-template/user/login',
    url: 'http://localhost:8000/user/' + data.code + '/' + data.sessionId,
    method: 'post',
    data
  })
}

// email 发送邮件
export function sendEmail(data) {
  return request({
    url: 'http://localhost:8000/user/sendMail?email=' + data.email,
    method: 'post'
  })
}