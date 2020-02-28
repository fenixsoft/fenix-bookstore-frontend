const state = {
  // 没有被捕获，抛到全局的异常
  exception: null,
  // 服务端发来的通知消息
  notification: null
}

const getters = {}

const mutations = {
  /**
   * 设置全局异常，会在vue\vuex的异常处理中注册
   *
   * @param state
   * @param exception
   */
  setException (state, exception) {
    state.exception = exception
  },

  /**
   * 清理全局异常
   *
   * @param state
   */
  clearException (state) {
    state.exception = null
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
