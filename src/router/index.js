import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      // 首页框架容器
      path: '/',
      component: () => import('@/pages/home/index'),
      children: [
        {
          // 书店首页
          path: '/',
          component: () => import('@/pages/home/MainPage')
        }, {
          // 商品详情页
          path: '/detail/:id',
          component: () => import('@/pages/home/DetailPage'),
          props: true
        }, {
          // 购物车
          path: '/cart',
          meta: {requireAuthentication: true},
          component: () => import('@/pages/home/CartPage')
        }, {
          // 商品结算页
          path: '/settle',
          meta: {requireAuthentication: true},
          component: () => import('@/pages/home/SettlementPage')
        }, {
          // 商品付款页
          path: '/pay',
          meta: {requireAuthentication: true},
          component: () => import('@/pages/home/PaymentPage')
        }, {
          // 库存管理页
          path: '/warehouse',
          meta: {requireAuthentication: true, requireAdministrator: true},
          component: () => import('@/pages/home/WarehousePage')
        }, {
          // 评论页
          path: '/comment',
          component: () => import('@/pages/home/CommentPage')
        }
      ]
    }, {
      // 登录页
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
    // 未登陆，则直接转到登陆
    next({name: 'Login', query: {redirect: to.fullPath}})
  } else {
    // 已登陆，但不是管理员，则转到首页
    if (to.meta.requireAdministrator && !store.getters['user/isAdministrator']) {
      next({path: '/'})
    } else {
      next()
    }
  }
})

export default router
