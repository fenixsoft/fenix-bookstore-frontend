import axios from 'axios'
import api from '@/api'
import constants from '@/api/remote/constants'

export default {

  /**
   * 通过OAuth2的密码模式，使用用户名、密码进行登陆，完成认证与授权
   *
   * 加密/校验的过程为：明文 <-> 客户端MD5（客户端加盐） <--Over TLS--> 服务端BCrypt <-> 数据库存储
   * 注意，即使使用HTTPS保证信道安全，客户端加密也是必要的，能有效抑制服务端滥用（明文存储、输出日志）或者服务端程序被攻破而获取客户端传输过来的明文密码的风险
   */
  login (username, password) {
    return axios.get('/token', {
      // 认证、授权的API均以/oauth开头，而不是默认的/restful
      baseURL: '/oauth',
      params: {
        username,
        password: api.encrypt.defaultEncode(password),
        grant_type: constants.AUTH_GRANT_TYPE,
        client_id: constants.AUTH_CLIENT_ID,
        client_secret: constants.AUTH_CLIENT_SECRET
      }
    })
  },

  /**
   * OAuth2的令牌刷新
   *
   * 在access_token过期时调用，通过refresh_token换取新的refresh_token
   */
  refresh (refreshToken) {
    return axios.get('/token', {
      // 认证、授权的API均以/oauth开头，而不是默认的/restful
      baseURL: '/oauth',
      params: {
        refresh_token: refreshToken,
        grant_type: constants.AUTH_REFRESH_TYPE,
        client_id: constants.AUTH_CLIENT_ID,
        client_secret: constants.AUTH_CLIENT_SECRET
      }
    })
  }
}
