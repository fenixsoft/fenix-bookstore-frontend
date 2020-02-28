import axios from 'axios'
import warehouse from './remote/warehouse-api'
import option from './local/option-api'
import encrypt from './local/encrypt-api'
import auth from './remote/authorization-api'
import account from './remote/account-api'
import constants from './remote/constants'

// 设置默认的请求时常为10s
axios.defaults.timeout = 10000

/**
 * 响应拦截器
 * 将返回非200状态的HTTP CODE和无响应均调用promise reject
 */
axios.interceptors.response.use((res) => {
  if (res.status !== 200) {
    console.error('远程服务请求失败：', res)
    return Promise.reject(res)
  }
  return res
}, (error) => {
  console.error('远程服务请求失败：', error)
  return Promise.reject(error)
})

export default {
  constants,
  // remote
  warehouse,
  account,
  auth,
  // local
  option,
  encrypt
}
