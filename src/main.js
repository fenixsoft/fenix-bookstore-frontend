import Vue from 'vue'
import 'default-passive-events'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import store from './store'
import router from './router'
import errorPlugin from './plugins/errorhandler-plugin'

/**
 * 默认在开发模式中启用mock.js代替服务端请求
 * 如需要同时调试服务端，请修改此处判断条件
 */
if (process.env.NODE_ENV === 'development') {
  require('./api/mock')
}

Vue.use(ElementUI)
Vue.use(errorPlugin, {
  errorHandler: (error, vm, info) => {
    console.error(error)
    store.commit('notification/setException', error)
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
})
