import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const router = new Router({
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
          meta: {requireAuthentication: true},
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

/**
 * 全局路由拦截器
 * 用于实现在路由元数据中配置了需要认证的页面，如未检测到授权信息（默认为JWT令牌），或授权超时，着转向到登陆页面，登陆后跳转回原路由页面继续操作
 */
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuthentication && !store.getters['user/isAuthorized']) {
    next({name: 'Login', query: {redirect: to.fullPath}})
  } else {
    next()
  }
})

export default router
