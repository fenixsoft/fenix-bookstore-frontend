import axios from 'axios'

export default {

  /**
   * 根据ID查询用户信息
   */
  getAccountById (id) {
    return axios.get(`/account/${id}`)
  },

  /**
   * 注册的新用户
   */
  registerAccount (account) {
    return axios.post('/account')
  },

  /**
   * 更新用户信息
   */
  updateAccount (account) {
    return axios.put('/account')
  }
}
