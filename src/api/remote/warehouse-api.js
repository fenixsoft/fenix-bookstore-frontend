import axios from 'axios'

export default {

  /**
   * 无过滤条件，获取全部的产品
   * @returns {Promise<AxiosResponse<T>>}
   */
  getAllProducts () {
    return axios.get('/products')
  },

  /**
   * 根据ID查询指定的唯一产品
   * @param id
   * @returns {Promise<AxiosResponse<T>>}
   */
  getUniqueProductById (id) {
    return axios.get(`/product/${id}`)
  },

  /**
   * 取轮播广告
   * @returns {Promise<AxiosResponse<T>>}
   */
  getAdvertisements () {
    return axios.get('/advertisements')
  }

}
