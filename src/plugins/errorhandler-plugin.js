/**
 * 针对vue\vuex\vue-router中的同步、异步异常信息做全局处理
 */
import Router from 'vue-router'

function isPromise (ret) {
  return (ret && typeof ret.then === 'function' && typeof ret.catch === 'function')
}

/**
 * 默认的全局异常处理器
 */
const defaultErrorHandler = (error, vm, info) => {
  console.error('接收到未处理的全局异常：', error)
  console.error(vm)
  console.error(info)
}

/**
 * 用于处理Promise的异步异常
 */
function registerActionHandle (actions, errorHandler) {
  Object.keys(actions).forEach(key => {
    let fn = actions[key]
    actions[key] = function (...args) {
      let ret = fn.apply(this, args)
      if (isPromise(ret)) {
        return ret.catch(errorHandler)
      } else { // 默认错误处理
        return ret
      }
    }
  })
}

const registerVuex = (instance, errorHandler) => {
  if (instance.$options['store']) {
    let actions = instance.$options['store']['_actions'] || {}
    if (actions) {
      let tempActions = {}
      Object.keys(actions).forEach(key => {
        tempActions[key] = actions[key][0]
      })
      registerActionHandle(tempActions, errorHandler)
    }
  }
}
const registerVue = (instance, errorHandler) => {
  if (instance.$options.methods) {
    let actions = instance.$options.methods || {}
    if (actions) {
      registerActionHandle(actions, errorHandler)
    }
  }
}

export default {
  install: (Vue, options) => {
    let errorHandler
    if (options && typeof options.errorHandler === 'function') {
      errorHandler = options.errorHandler
    } else {
      errorHandler = defaultErrorHandler
    }
    Vue.config.errorHandler = errorHandler
    Vue.mixin({
      beforeCreate () {
        registerVue(this, errorHandler)
        registerVuex(this, errorHandler)
      }
    })
    Vue.prototype.$throw = errorHandler

    /**
     * vue-router 3.1.x的兼容性修正：
     * 由于前面全局路由拦截器会使得不合法的页面请求跳转到登录页，push该页面的方法会被认为是路由失败。
     * 3.1.x将router.push方法返回一个Promise，如果不在push后面使用catch方法处理异常，将会把异常抛出到global的处理器中，然后在控制台打印警告，3.0.x无此问题
     * 以下代码用于兼容性修正，避免强制性地要求push方法后添加catch()
     */
    const originalPush = Router.prototype.push
    Router.prototype.push = function push (location, onResolve, onReject) {
      if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
      return originalPush.call(this, location).catch(error => error && errorHandler(error))
    }
  }
}
