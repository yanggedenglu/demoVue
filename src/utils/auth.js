import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 测试cookie
const TestCookie = 'yanggedenglu'

export function getCookie() {
  return Cookies.get(TestCookie)
}
export function setCookie(token) {
  return Cookies.set(TestCookie, token)
}
export function removeCookie() {
  return Cookies.remove(TestCookie)
}
