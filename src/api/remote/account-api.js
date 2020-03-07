import axios from 'axios'

export default {

  /**
   * 根据用户名查询用户信息
   */
  getAccountByUsername (username) {
    return axios.get(`/account/${username}`)
  },

  /**
   * 注册的新用户
   */
  registerAccount (account) {
    return axios.post('/account', {account})
  },

  /**
   * 更新用户信息
   */
  updateAccount (account) {
    return axios.put('/account', {account})
  }
}
