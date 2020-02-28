const crypto = require('crypto')

const MD5_CLIENT_SALT = 'icyfenix.cn'

export default {

  /**
   * 默认编码
   * 采用MD5加密，HEX编码返回
   *
   * @param source 待加密的字符串原文
   * @returns {PromiseLike<ArrayBuffer>}
   */
  defaultEncode (source) {
    return crypto.createHash('md5').update(source + MD5_CLIENT_SALT).digest('hex')
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
