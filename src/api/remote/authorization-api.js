import axios from 'axios'
import api from '@/api'

const constant = {
  LOGIN_SUCCESS: 0
}

export default {

  constant,

  /**
   * 通过用户名、密码进行登陆验证
   *
   * 加密/校验的过程为：明文 <-> 客户端MD5（客户端加盐） <--Over TLS--> 服务端MD5（服务端加盐） <-> 数据库存储
   * 注意，即使使用HTTPS保证信道安全，客户端加密也是必要的，能有效抑制服务端滥用（明文存储、输出日志）或者服务端程序被攻破而获取客户端传输过来的明文密码的风险
   */
  login (authorization) {
    authorization.password = api.encrypt.defaultEncode(authorization.password)
    return axios.post('/auth', {params: authorization})
  }
}
