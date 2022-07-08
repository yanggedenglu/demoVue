import { login as apiLogin, logout, getInfo, register, sendEmail, exit } from '@/api/user'
import { getToken, setToken, removeToken, setCookie, removeCookie } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

// 对state数据的操作；新增，编辑，删除
const mutations = {
  RESET_STATE: (state) => {
    // Object.assign 对象合并 浅拷贝
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

// 异步操作
const actions = {
  // user login
  login({ commit }, userInfo) {
    // console.log("============================ store login")
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      apiLogin({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        if (data.delFlag === true) {
          console.log('账户被冻结')
        } else {
          // commit 提交 mutations 中的方法
          // commit 同步操作，数据提交至 mutations ，可用于读取用户信息写到缓存里
          commit('SET_NAME', data.username)
          commit('SET_TOKEN', data.id)

          // 插入到测试cookie中
          setToken(data.id)
          setCookie(data.token)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    // console.log("============================ store getinfo"+state.token)
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        // must remove  token  first 清楚cookie
        removeToken()
        removeCookie()
        resetRouter()
        commit('RESET_STATE')
        // 后端方法
        exit()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  // store register
  register({ commit }, ruleForm) {
    // console.log("============================ store register")
    const { username, password, email, code, sessionId } = ruleForm
    return new Promise((resolve, reject) => {
      register({ username: username, password: password, email: email, code: code, sessionId: sessionId }).then(response => {
        resolve(response)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },

  // store email
  email({ commit }, ruleForm) {
    const { email } = ruleForm
    return new Promise((resolve, reject) => {
      sendEmail({ email: email }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

