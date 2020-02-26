const LOCAL_JWT_KEY = 'Authorization'
const LOCAL_SESSION_KEY = 'Client-Session'

/**
 * 可以持久存在在客户端本地的设置信息
 */
export default {

  setToken (token) {
    localStorage.setItem(LOCAL_JWT_KEY, token)
  },

  getToken () {
    return localStorage.getItem(LOCAL_JWT_KEY)
  },

  removeToken () {
    localStorage.removeItem(LOCAL_JWT_KEY)
  },

  hasToken () {
    return !!this.getToken()
  },

  setSession (session) {
    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(session))
  },

  getSession () {
    return JSON.parse(LOCAL_SESSION_KEY)
  },

  removeSession () {
    localStorage.removeItem(LOCAL_SESSION_KEY)
  },

  hasSession () {
    return !!localStorage.getItem(LOCAL_SESSION_KEY)
  }
}
