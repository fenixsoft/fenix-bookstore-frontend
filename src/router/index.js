import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/pages/home/index'),
      children: [
        {
          path: '/',
          component: () => import('@/pages/home/MainPage')
        }, {
          path: '/detail/:id',
          component: () => import('@/pages/home/DetailPage'),
          props: true
        }
      ]
    }, {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/Login')
    }
  ]
})
