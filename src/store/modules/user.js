import api from '@/api'

const EMPTY_SESSION = () => ({
  id: '',
  authorities: [],
  expires: 0,
  token: '',
  rememberMe: false,
  language: ''
})

const EMPTY_ACCOUNT = () => ({
  id: '',
  user: '',
  name: '',
  avatar: '',
  telephone: '',
  email: '',
  location: ''
})

// 如果本地存储有缓存的Session信息，启动时尝试从该信息中恢复
const state = {
  session: api.option.hasSession() ? Object.assign(EMPTY_SESSION(), api.option.getSession()) : EMPTY_SESSION(),
  account: EMPTY_ACCOUNT(),
  favorite: []
}

const getters = {
  /**
   * 检查授权是否有效
   * 生效要求：持有JWT令牌，且并未超出令牌期限
   */
  isAuthorized: state => state.session.token && state.session.expires > (new Date().getTime() / 1000)
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
    Object.assign(state.session, session)
    session.rememberMe && api.option.setSession(session)
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

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
