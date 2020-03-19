const crypto = require('crypto')
const bcrypt = require('bcryptjs')

const CLIENT_SALT = '$2a$10$o5L.dWYEjZjaejOmN3x4Qu'

export default {

  /**
   * 默认编码
   * 采用MD5加密，HEX编码，加盐，Bcrypt加密，返回
   *
   * @param source 待加密的字符串原文
   */
  defaultEncode (source) {
    return bcrypt.hashSync(crypto.createHash('md5').update(source).digest('hex'), CLIENT_SALT).substring(CLIENT_SALT.length)
  },

  /**
   * gravatar头像服务中要求的编码
   */
  gravatarEncode (email) {
    const lower = (email || 'default_avatar').toLowerCase()
    const hash = crypto.createHash('md5').update(lower).digest('hex')
    return `https://www.gravatar.com/avatar/${hash}?d=mp`
  }
}
