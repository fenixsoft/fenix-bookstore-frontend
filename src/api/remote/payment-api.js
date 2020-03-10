import axios from 'axios'

export default {
  /**
   * 提交要购买的商品和配送信息到服务端
   * 服务端会进行库存检查、配种地址检查等校验，如果结果满足的话，会返回成功标志，返回订单号和支付二维码
   */
  submitSettlement (settlement) {
    return axios.post('/settlement', settlement)
  }
}
