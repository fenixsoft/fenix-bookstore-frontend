import * as types from '../constant' // types目录下的mutations函数的常量名
const state = {
  recommendList: []
}

const getters = {}

const mutations = {
  [types.PRODUCTS_SET_PRODUCT] (state, products) { // 第一个参数是state 可以修改state 将请求回来的数据保存在state中
    state.recommendList = products
  }
}

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
