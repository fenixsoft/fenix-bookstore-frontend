import axios from 'axios'
import warehouse from './services/WarehouseApi'

// 设置默认的请求时常为10s
axios.defaults.timeout = 10000

/**
 * 响应拦截器，将返回非200状态的HTTP CODE和无相应均调用reject
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

/**
 * 此方法会在main.js中注册至this.$http中
 * @param url
 * @param param
 * @returns {Promise<any>}
 */
export function fetchGet (url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: param
    }).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    }).catch((error) => {
      reject(error)
    })
  })
}

export default {
  warehouse
}
