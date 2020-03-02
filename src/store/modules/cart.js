import api from '@/api'

/**
 * 购物车状态数据
 * 一共存有三类状态：
 *  - 购物车元素（items）
 *  - 结算单（settlement），即本次打算购买的内容，以及派送信息
 *  - 支付单（payment），将结算单发送到服务端后，服务端返回有货物、可派送，此时包含支付二维码等付款信息
 * 购物车与结算账单中存储的数组元素，内容上与商品对象相同，唯一只是多了一个表示数量的amount字段
 */
const state = {
  // 购物车里的商品
  // 在购物车中的与在结算账单中含义并不相同，毕竟不是所有人都能随意清空购物车
  items: [],
  // 结算账单，这个是进入结算页面之前设置好的
  settlement: {
    // 账单配送地址
    purchase: {
      name: '',
      telephone: '',
      delivery: true,
      address: {province: '广东省', city: '广州市', area: '海珠区'},
      location: ''
    },
    // 账单内容
    items: []
  },
  // 支付信息，由服务端返回，包括支付结果Code，支付单ID和用于付款的二维码
  payment: {
    code: -1,
    id: '',
    qrcode: '',
    expires: 0
  }
}

const getters = {}

const mutations = {
  /**
   * 调整在购物车中指定产品的数量
   * 如购物车中已有该产品则直接修改数量，如果没有，将对象的浅拷贝存入购物车
   * 数量可为负数，用于对购物车中产品的调减，如产品调减后结果小于零，则直接将数量归零，同时最大值也不允许超过10
   */
  adjustCartItems (state, product) {
    let item = state.items.find(item => item.id === product.id)
    if (item) {
      item.amount = Math.min(10, (item.amount + product.amount) || 0)
    } else {
      product.amount = Math.min(10, product.amount || 0)
      state.items.push({...product})
    }
  },

  /**
   * 添加一个商品到购物车之中
   * 如果购物车中已经有了这个商品，就把数量加1
   */
  addCartItem (state, product) {
    let item = state.items.find(i => i.id === product.id)
    if (item) {
      item.amount++
    } else {
      state.items.push({...product, amount: 1})
    }
  },

  /**
   * 删除购物车中指定产品
   * 购物车可以存在数量为0的产品，并不会删除，如需彻底从购物车移除产品，应使用本方法
   * 如果购物车中原本就没有该产品，则不会有任何效果
   */
  removeCartItem (state, id) {
    state.items = state.items.filter(i => i.id !== id)
  },

  /**
   * 设置结算单
   * 外部一般不调用该方法，而是使用Actions中的setupSettlementBillWithDefaultValue
   */
  setupSettlementBill (state, settlement) {
    state.settlement = settlement
  },

  /**
   * 设置支付信息
   * 外部一般不调用该方法，而是使用Actions中的submitSettlement
   */
  receivePayment (state, payment) {
    state.payment = payment
  }
}

const actions = {
  /**
   * 设置结算账单
   * 为了便于使用，配送人、地址等信息，如果对应字段没有被设置，会取用户账号的信息信息作为默认值（即默认收件人是用户自己）
   */
  setupSettlementBillWithDefaultValue ({state, rootState, commit}, settlement) {
    // 设置结算单的默认值，传入的结算单就不需要包括所有的字段
    const defaultPurchase = {
      name: rootState.user.account.name,
      telephone: rootState.user.account.telephone,
      delivery: true,
      address: {province: '广东省', city: '广州市', area: '海珠区'},
      location: rootState.user.account.location
    }
    settlement.purchase = Object.assign(defaultPurchase, settlement.purchase || {})
    commit('setupSettlementBill', Object.assign(state.settlement, settlement))
  },

  /**
   * 提交要购买的商品和配送信息到服务端
   * 在调用此方法之前，通常应该调用setupSettlementBillWithDefaultValue来设置VUEX中的结算单据信息
   */
  async submitSettlement ({state, commit}) {
    // TODO 这里提交的数据（items数组）可以清理一下，只提交id即可
    let {data} = await api.payment.submitSettlement(state.settlement)
    commit('receivePayment', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
