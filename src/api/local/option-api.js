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
    // 如果本地缓存中的Session被破坏了，就返回空对象
    try {
      return JSON.parse(localStorage.getItem(LOCAL_SESSION_KEY))
    } catch (e) {
      return {}
    }
  },

  removeSession () {
    localStorage.removeItem(LOCAL_SESSION_KEY)
  },

  hasSession () {
    return !!localStorage.getItem(LOCAL_SESSION_KEY)
  }
}
