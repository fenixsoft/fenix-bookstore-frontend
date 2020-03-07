const LOCAL_SESSION_KEY = 'Client-Session'

/**
 * 本地选项
 * 可以持久存在在客户端本地或者Session的设置信息
 * 通过统一的API来对外部屏蔽掉localStorage和sessionStorage的差异
 */
export default {
  setSession (session) {
    if (session.rememberMe) {
      localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(session))
    } else {
      sessionStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(session))
    }
  },

  getSession () {
    // 如果本地缓存中的Session被破坏了（无法进行JSON反序列化），就返回空对象
    try {
      return JSON.parse(sessionStorage.getItem(LOCAL_SESSION_KEY) || localStorage.getItem(LOCAL_SESSION_KEY))
    } catch (e) {
      return {}
    }
  },

  removeSession () {
    sessionStorage.removeItem(LOCAL_SESSION_KEY)
    localStorage.removeItem(LOCAL_SESSION_KEY)
  },

  hasSession () {
    return !!(sessionStorage.getItem(LOCAL_SESSION_KEY) || localStorage.getItem(LOCAL_SESSION_KEY))
  },

  isSessionAvailable () {
    return this.hasSession() && this.getSession().expires > new Date().getTime()
  },

  isSessionRefreshable () {
    return !!this.getSession().refresh_token
  }
}
