import axios from 'axios'

export default {

  /**
   * 无过滤条件，获取全部的产品
   */
  getAllProducts () {
    return axios.get('/products')
  },

  /**
   * 根据ID查询指定的唯一产品
   */
  getUniqueProductById (id) {
    return axios.get(`/products/${id}`)
  },

  /**
   * 取轮播广告
   */
  getAdvertisements () {
    return axios.get('/advertisements')
  },

  /**
   * 更新指定商品
   */
  updateProduct (product) {
    return axios.put(`/products`, product)
  },

  /**
   * 新建指定的商品
   */
  createProduct (product) {
    return axios.post(`/products`, product)
  },

  /**
   * 删除指定商品
   */
  removeProduct (productId) {
    return axios.delete(`/products/${productId}`)
  },

  /**
   * 获取指定商品的库存情况
   */
  queryStock (productId) {
    return axios.get(`/products/stockpile/${productId}`)
  },

  /**
   * 修改商品库存
   */
  updateStock (productId, amount) {
    return axios.patch(`/products/stockpile/${productId}?amount=${amount}`)
  }

}
