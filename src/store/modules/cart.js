import * as types from '../constant'

const state = {
  items: [ // 购物车需要自己的状态 购物列表
    {productid: '11137', quantity: 1, checkoutStatus: false}, // 购买状态
    {productid: '8750', quantity: 1, checkoutStatus: false}
  ]
}

const getters = {
  // 返回购物车商品列表完整信息
  cartProducts: (state, getters, rootState) => {
    if (!state.items.length) return [] // map不会对空数组进行检测 map不会改变原始数组
    return state.items.map(({productid, quantity, checkoutStatus}) => { // map()方法返回一个新数组，数组中的元素为原始数组元素调用函数处理的后值。
      const product = rootState.products.recommendList.find(product => product.productid === productid) // 拿到items中的数据去查阅products中的数据, rootState(根节点状态)参数可以拿到别的模块的state状态
      if (!product) return {} // 如果此时的数据还没有请求回来 就返回空 不渲染
      return {
        src: product.image, // product的图片地址
        name: product.name, // product的名字
        price: product.price, // product的单价
        productid, // product的id
        quantity, // product的数量，默认为1
        simpleTotal: quantity * product.price, // 单项product的总价价
        checkoutStatus: checkoutStatus // product的选中状态
      }
    })
  },
  // 返回选中商品的总价
  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      if (product.checkoutStatus) {
        return total + product.simpleTotal
      }
      return total
    }, 0)
  },
  // 返回所有商品总价,不管有没有选中
  allPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.simpleTotal
    }, 0)
  },
  // 返回所有商品总数量,不管有没有选中
  allProducts: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.quantity
    }, 0)
  },
  // 返回所有选中的商品数量
  allSelectProducts: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      if (product.checkoutStatus) {
        return total + product.quantity
      }
      return total
    }, 0)
  },
  // 返回所有商品条数
  allProductsItem: (state) => {
    return state.items.length
  },
  // 返回商品是否全选 是返回true 否则false
  isSelectAll: (state) => {
    if (!state.items.length) return false
    return state.items.every(item => { // every() 不会对空数组进行检测
      return item.checkoutStatus === true
    })
  },
  // 返回是否有选中的商品 是返回true 否则false
  hasSelect: (state) => {
    if (!state.items.length) return false
    return state.items.some(item => { // some() 不会对空数组进行检测
      return item.checkoutStatus === true
    })
  }
}

const mutations = {
  // 添加一条商品的方法
  [types.CART_ADD_PRODUCT_TO_CART] (state, {productid}) {
    state.items.unshift({
      productid,
      quantity: 1,
      checkoutStatus: false
    })
  },
  // 删除一条商品的方法
  [types.CART_DEL_PRODUCT_TO_CART] (state, productid) {
    state.items.forEach((item, index) => {
      if (item.productid === productid) {
        state.items.splice(index, 1)
      }
    })
  },
  // 增加一条商品中商品数量的方法
  [types.CART_ADD_PRODUCT_QUANTITY] (state, productid) {
    const cartItem = state.items.find(item => item.productid === productid)
    cartItem.quantity++
  },
  // 减少一条商品中商品数量的方法
  [types.CART_DEL_PRODUCT_QUANTITY] (state, productid) {
    const cartItem = state.items.find(item => item.productid === productid)
    if (cartItem.quantity > 1) { // 商品数量大于1时才能减少
      cartItem.quantity--
    } else {
      cartItem.quantity = 1
    }
  },
  // 改变单条商品的选中不选中状态的方法(单选按钮)
  [types.CART_SET_CHECKOUT_STATUS] (state, productid) {
    const cartItem = state.items.find(item => item.productid === productid)
    cartItem.checkoutStatus = !cartItem.checkoutStatus
  },
  // 改变所有商品的选中不选中状态的方法(全选按钮)
  [types.CART_SET_CHECKOUT_STATUS_ALL] (state, status) {
    state.items.forEach(item => {
      if (!item.checkoutStatus === status) {
        item.checkoutStatus = status
      }
    })
  }
}

const actions = {
  // 添加购物车的方法,如果此时购物车内有该条商品,就添加商品数量,否则添加商品
  addProductToCart ({state, commit}, product) {
    const cartItem = state.items.find(item => item.productid === product.productid)
    if (!cartItem) {
      commit(types.CART_ADD_PRODUCT_TO_CART, {productid: product.productid})
    } else {
      commit(types.CART_ADD_PRODUCT_QUANTITY, cartItem.productid)
    }
  },
  // 购物车内删除一条商品的方法
  delProductToCart ({commit}, productid) {
    commit(types.CART_DEL_PRODUCT_TO_CART, productid)
  },
  // 添加商品数量的方法
  addProductQuantity ({commit}, productid) {
    commit(types.CART_ADD_PRODUCT_QUANTITY, productid)
  },
  // 减少商品数量的方法
  delProductQuantity ({commit}, productid) {
    commit(types.CART_DEL_PRODUCT_QUANTITY, productid)
  },
  // 切换一条商品的选中状态的方法
  setCheckoutStatus ({commit}, productid) {
    commit(types.CART_SET_CHECKOUT_STATUS, productid)
  },
  // 切换所有商品选中状态的方法
  setCheckoutStatusAll ({commit}, status) {
    commit(types.CART_SET_CHECKOUT_STATUS_ALL, status)
  }
}

export default {
  namespaced: true, // 添加命名空间
  state,
  getters,
  mutations,
  actions
}
