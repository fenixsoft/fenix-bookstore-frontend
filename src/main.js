// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 渐进式JavaScript框架
import Vue from 'vue'
// 一套为开发者、设计师和产品经理准备的基于Vue 2.0的桌面端组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import {fetchGet} from '@/api'

process.env.MOCK && require('./api/mock')

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$http = fetchGet

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
