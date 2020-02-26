import api from '@/api'

const state = {
  id: '',
  username: '',
  authorities: [],
  expires: 0,
  token: '',
  rememberMe: false,
  location: ''
}

const getters = {
  /**
   * 检查授权是否有效
   * 生效要求：持有JWT令牌，且并未超出令牌期限
   */
  isAuthorized: state => {
    // 如果当前VUEX中存在Session，则使用当前的，否则尝试从本地存储中恢复
    let session
    if (state.token) {
      session = state
    } else if (api.option.hasSession()) {
      session = api.option.getSession()
    } else {
      return false
    }
    // 即使存在Session，还要判断是否已经超出JWT令牌的授权期限
    return session.expires > (new Date().getTime() / 1000)
  }
}

const mutations = {

  /**
   * 登陆成功，设置登录状态
   *
   * @param state
   * @param session 客户端的Session
   *
   * 服务端不存储状态，登陆成功后用户状态信息通过JWT返回浏览器，存储在客户端Session中，其结构为：
   * { id,username,authorities,expires,token }
   * 另，根据用户在客户端登陆时的选项，以下内容也被添加到客户端Session中：
   * { rememberMe, location }
   */
  setupSession (state, session) {
    Object.assign(state, session)
    session.rememberMe && api.option.setSession(session)
  },

  /**
   * 退出登陆状态，清理Session
   * 由于判断Session状态只判断JWT Token，所以清理也只清理这个即可
   *
   * @param state
   */
  clearSession (state) {
    state.token = null
    api.option.removeSession()
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
