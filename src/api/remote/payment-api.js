import axios from 'axios'

export default {
  /**
   * 提交要购买的商品和配送信息到服务端
   * 服务端会进行库存检查、配种地址检查等校验，如果结果满足的话，会执行该结算单，返回订单号和支付二维码
   */
  submitSettlement (settlement) {
    return axios.post('/settlement', settlement)
  },

  /**
   * 将支付单据的状态变为完成
   * 其实就是付款了，因为没有此演示项目实际支付的过程
   */
  accomplishPayment (id) {
    return axios.patch(`/pay/${id}?state=PAYED`)
  },

  /**
   * 将支付单据状态变为取消
   */
  cancelPayment (id) {
    return axios.patch(`/pay/${id}?state=CANCEL`)
  }

}
