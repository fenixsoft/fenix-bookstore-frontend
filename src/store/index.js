import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import products from './modules/products'
import session from './modules/session'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    session,
    cart,
    products
  }
})
