import { login as apiLogin, logout, getInfo, register, sendEmail } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
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

const actions = {
  // user login
  login({ commit }, userInfo) {
    // console.log("============================ store login")
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      apiLogin({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        // commit('SET_TOKEN', data.token)
        // setToken(data.token)
        // console.log("============================ data"+data.id)
        commit('SET_TOKEN', data.id)
        setToken(data.id)
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
        console.log(response)
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
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
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
    // console.log(ruleForm)
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

