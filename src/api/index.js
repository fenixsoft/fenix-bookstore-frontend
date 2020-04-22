import axios from 'axios'
import constants from './remote/constants'
import warehouse from './remote/warehouse-api'
import option from './local/option-api'
import encrypt from './local/encrypt-api'
import auth from './remote/authorization-api'
import account from './remote/account-api'
import payment from './remote/payment-api'
import stringUtil from './local/string-api'

// 设置默认的HTTP访问参数
axios.defaults.timeout = constants.REMOTE_TIMEOUT
axios.defaults.baseURL = constants.REMOTE_BASE_URL

/**
 * HTTP请求拦截器
 * 如果当前Session持有JWT Token，每次请求时服务端时自动带上该令牌
 */
axios.interceptors.request.use(config => {
  // 如果访问的不是OAuth授权服务Endpoint
  // TODO 这里应该做一些更细致的检查，譬如是否跨域，不应将Token发送到域外地址
  if (config.baseURL !== constants.AUTH_BASE_URL) {
    // 并且Session有效，就自动在请求Header中带上JWT令牌
    if (option.isSessionAvailable()) {
      config.headers = {
        'Authorization': constants.AUTH_TOKEN_TYPE + option.getSession().access_token
      }
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * HTTP响应拦截器
 * 将返回非200状态的HTTP CODE和无响应均调用promise reject
 */
axios.interceptors.response.use(res => {
  if (res.data && res.data.code && res.data.code !== 0) {
    return Promise.reject(Error(res.data.message))
  } else {
    return Promise.resolve(res)
  }
}, error => {
  console.error('远程服务未能成功发送：', error)
  // 尝试提取服务端错误
  const res = error.response
  if (res && res.data) {
    console.error(res.data)
    if (res.data.error && res.data.error_description) {
      // OAuth令牌Endpoint的错误格式：{error:"",error_description:""}
      const message = `HTTP Code:${res.status}, 信息:[${res.data.error}] ${res.data.error_description}`
      return Promise.reject(Error(message))
    } else if (res.data.code && res.data.message) {
      // 服务端CommonResponse的错误格式：{code:xx,message:""}
      return Promise.reject(Error(res.data.message))
    } else if (res.data.error && res.data.message) {
      // Jersey的默认错误格式：{status:xx,timestamp:"",error:"",message:xx}
      const message = `HTTP Code:${res.status}, 信息:[${res.data.error}] ${res.data.message}`
      return Promise.reject(Error(message))
    }
  }
  return Promise.reject(error)
})

export default {
  constants,
  // remote
  warehouse,
  account,
  auth,
  payment,
  // local
  option,
  encrypt,
  stringUtil
}
