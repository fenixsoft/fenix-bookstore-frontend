const crypto = require('crypto')
const MD5 = crypto.createHash('md5')
const MD5_CLIENT_SALT = 'icyfenix.cn'

export default {

  /**
   * 默认采用MD5加密，HEX编码返回
   *
   * @param source 待加密的字符串原文
   * @returns {PromiseLike<ArrayBuffer>}
   */
  defaultEncode (source) {
    return MD5.update(source + MD5_CLIENT_SALT).digest('hex')
  }
}
