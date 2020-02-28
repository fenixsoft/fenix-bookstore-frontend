const state = {
  favorite: []
}

const getters = {}

const mutations = {}

const actions = {
  // vuex 给actions 的 commit 提交到 mutations => state
  // getAllProducts ({commit}) { // 所有的api请求都放在actions中
  //   fetchGet('/cart').then(res => {
  //     let allProducts = res.data.list.list
  //     commit(types.PRODUCTS_SET_PRODUCT, allProducts)
  //   })
  // }
}

export default {
  namespaced: true, // 添加命名空间
  state,
  getters,
  mutations,
  actions
}
