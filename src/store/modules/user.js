import api from '@/api'

const EMPTY_SESSION = () => ({
  username: null,
  scope: '',
  expires: 0,
  access_token: '',
  refresh_token: '',
  authorities: [],
  token_type: 'bearer',
  jti: '',
  // 以下为客户端自定义信息
  rememberMe: false,
  language: ''
})

const EMPTY_ACCOUNT = () => ({
  id: null,
  username: null,
  name: '',
  avatar: '',
  telephone: '',
  email: '',
  location: ''
})

// 如果本地存储有缓存的Session信息，启动时尝试从该信息中恢复
// 这里采用Object.assign主要是为了对服务端做一个容错，以便客户端依赖的所有属性都至少会有一个默认值，而不会出现服务端未返回时的undefined
// 注意，将JWT存储在sessionStorage或localStorage中是存在XSS风险的，专门写一篇文章来分析JWT这方面的内容
const state = {
  session: api.option.hasSession() ? Object.assign(EMPTY_SESSION(), api.option.getSession()) : EMPTY_SESSION(),
  account: EMPTY_ACCOUNT(),
  // 收藏夹，只存在本地，暂时没有什么用
  favorite: []
}

const getters = {
  /**
   * 检查授权是否有效
   * 生效要求：持有JWT令牌，且并未超出令牌期限
   */
  isAuthorized: state => !!state.session.access_token && (state.session.expires > new Date().getTime()),
  /**
   * 检查是否管理员
   * 生效要求：已获得登录授权，并且角色中存在ROLE_ADMIN
   */
  isAdministrator: (state, getters) => getters.isAuthorized && state.session.authorities.includes('ROLE_ADMIN')
}

const mutations = {

  /**
   * 登陆成功，设置登录状态
   *
   * @param state
   * @param session 客户端的Session
   *
   * 服务端不存储状态，登陆成功后用户状态信息通过JWT返回浏览器，存储在客户端Session中，其结构为：
   * { username, scope, expires, access_token, refresh_token, token_type, jti }
   * 另，根据用户在客户端登陆时的选项，以下内容也被添加到客户端Session中：
   * { rememberMe, location }
   */
  setupSession (state, session) {
    // 服务端传来的session过期时间是相对时间（因为服务端、客户端的时间可能不一致），存储到本地时，转为绝对时间戳
    // 注意服务端返回的时间单位是秒，客户端的时间戳是毫秒
    session.expires = new Date().getTime() + (session.expires_in * 1000)
    Object.assign(state.session, session)
    api.option.setSession(session)
  },

  /**
   * 退出登陆状态
   * 清理vuex中的所有状态（Session、Account），以及本地存储中的Session
   */
  clearSession (state) {
    state.session = EMPTY_SESSION()
    state.account = EMPTY_ACCOUNT()
    api.option.removeSession()
  },

  /**
   * 更新用户账号资料
   */
  updateAccount (state, account) {
    Object.assign(state.account, account)
  },

  /**
   * 增加一项收藏
   */
  addFavorite (state, id) {
    state.favorite = [...state.favorite, id]
  },

  /**
   * 删除一项收藏
   */
  removeFavorite (state, id) {
    state.favorite = state.favorite.filter(x => x !== id)
  }
}

const actions = {
  /**
   * 根据过期时间刷新OAuth令牌的触发器
   */
  refreshSessionTrigger ({dispatch, commit, state}) {
    // Session是具有有效期的，设置更新令牌的触发器
    let timeout = state.session.expires - new Date().getTime()
    if (timeout > 0) {
      console.log(`Session将在：${timeout}毫秒后过期，届时会重刷新令牌`)
      setTimeout(() => {
        dispatch('refreshSession', {commit, state}).then(() => {
          dispatch('refreshSessionTrigger', {commit, state})
        })
      }, timeout)
    }
  },

  /**
   * 向服务端请求新的访问令牌
   */
  async refreshSession ({commit, state}) {
    try {
      let {data} = await api.auth.refresh(state.session.refresh_token)
      commit('setupSession', data)
    } catch (e) {
      // 刷新失败，就清理掉当前的用户
      commit('clearSession')
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
