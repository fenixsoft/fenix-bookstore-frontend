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
  if (to.meta.requireAuthentication && !store.getters['session/isAuthorized']) {
    next({name: 'Login', query: {redirect: to.fullPath}})
  } else {
    next()
  }
})

/**
 * vue-router 3.1.x的兼容性修正：
 * 由于前面全局路由拦截器会使得不合法的页面请求跳转到登录页，push该页面的方法会被认为是路由失败。
 * 3.1.x将router.push方法返回一个Promise，如果不在push后面使用catch方法处理异常，将会把异常抛出到global的处理器中，然后在控制台打印警告，3.0.x无此问题
 * 以下代码用于兼容性修正，避免强制性地要求push方法后添加catch()
 */
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default router
