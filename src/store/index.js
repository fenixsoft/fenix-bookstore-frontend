import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import products from './modules/products'
import user from './modules/user'
import notification from './modules/notification'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    notification,
    cart,
    products
  }
})
