<template>
  <el-card class="box-card">
    <div slot="header" class="header">
      <span>热销书籍</span>
    </div>
    <el-row :gutter="0">
      <el-col :span="6" v-for="book in books" :key="book.id" class="book-container">
        <el-image :src="book.cover" class="image" @click="loadDetail(book.id)"/>
        <div style="padding: 14px;">
          <span id="price">￥ {{book.price.toFixed(2)}}</span>
          <span id="title">{{book.title}}</span>
          <span id="description">{{pureText(book.description)}}</span>
          <div id="actions">
            <el-button icon="el-icon-money" @click="goDirectSettlement(book)" circle></el-button>
            <el-button :icon="isInCart(book.id) ? 'el-icon-s-goods' : 'el-icon-goods'" circle
                       @click="updateCart(book.id)"></el-button>
            <el-button :icon="isFavorite(book.id) ? 'el-icon-star-on' : 'el-icon-star-off'" circle
                       @click="updateFavorite(book.id)"></el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import api from '@/api'
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
  name: 'Cabinet',
  data () {
    return {
      books: []
    }
  },
  computed: {
    ...mapState('user', ['favorite', 'account']),
    ...mapState('cart', ['items'])
  },
  async created () {
    this.books = (await api.warehouse.getAllProducts()).data
  },
  methods: {
    ...mapMutations('user', ['addFavorite', 'removeFavorite']),
    ...mapMutations('cart', ['addCartItem', 'removeCartItem']),
    ...mapActions('cart', ['setupSettlementBillWithDefaultValue']),
    /**
     * 判断是否在收藏夹中
     **/
    isFavorite (id) {
      return this.favorite.includes(id)
    },
    /**
     * 判断是否在购物车中
     **/
    isInCart (id) {
      return this.items.find(item => item.id === id)
    },
    /**
     *快捷添加收藏夹，点一下加入，再点移除
     **/
    updateFavorite (id) {
      this.isFavorite(id) ? this.removeFavorite(id) : this.addFavorite(id)
      this.$notify({
        title: '成功',
        message: '恭喜你，已成功更新收藏夹',
        iconClass: 'el-icon-star-on',
        type: 'success'
      })
    },
    /**
     * 快捷添加购物车，点一下加入，再点移除（哪怕有多件）
     */
    updateCart (id) {
      this.isInCart(id) ? this.removeCartItem(id) : this.addCartItem({...this.books.find(i => i.id === id)})
      this.$notify({
        title: '成功',
        message: '恭喜你，已成功更新购物车',
        iconClass: 'el-icon-s-goods',
        type: 'success'
      })
    },
    /**
     * 转到商品详情页面
     */
    loadDetail (id) {
      this.$router.push(`/detail/${id}`)
    },
    /**
     * 去除HTML标签
     */
    pureText (text) {
      return api.stringUtil.pureText(text)
    },
    /**
     * 直接支付购买
     */
    goDirectSettlement (product) {
      let item = {...product, amount: 1}
      this.setupSettlementBillWithDefaultValue({items: [item]})
      this.$router.push('/settle')
    }
  }
}
</script>

<style scoped>
  .image {
    width: 300px;
    height: 300px;
  }

  #price {
    font-family: Arial, serif;
    font-size: 18px;
    font-weight: bolder;
    color: #d44d44;
    display: block;
  }

  #title {
    font-size: 14px;
    font-weight: 700;
    line-height: 1.2;
    margin: 0 8px;
    color: #333;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 5px 0 10px 0;
    display: block;
  }

  #description {
    font-size: 12px;
    color: #999;
    text-align: left;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  #actions {
    padding: 10px 10px 0 0;
  }

  .book-container {
    padding: 20px 0;
    border: 1px solid #fff;
    transition: .2s;
  }

  .book-container:hover {
    border: 1px solid #ddd;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    cursor: pointer;
  }

</style>
