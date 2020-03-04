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
// eslint-disable-next-line no-constant-condition
if (process.env.MOCK) {
  require('./api/mock')
}

Vue.use(ElementUI)
/**
 * 全局异常处理，将所有没有捕获的异常统一显示出来
 */
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
