<template>
  <el-card class="box-card">
    <div slot="header" class="header">
      <span>热销书籍</span>
    </div>
    <el-row :gutter="0">
      <el-col :span="6" v-for="book in books" :key="book.id" class="book-container">
        <el-image :src="book.image" class="image" @click="loadDetail(book.id)"/>
        <div style="padding: 14px;">
          <span id="price">￥ {{book.price}}</span>
          <span id="title">{{book.title}}</span>
          <span id="description">{{pureText(book.description)}}</span>
          <div id="actions">
            <el-button icon="el-icon-goods" circle></el-button>
            <el-button icon="el-icon-shopping-cart-full" circle></el-button>
            <el-button icon="el-icon-star-off" circle></el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import api from '@/api'

export default {
  name: 'Cabinet',
  data () {
    return {
      books: []
    }
  },
  async created () {
    this.books = (await api.warehouse.getAllProducts()).data
  },
  methods: {
    loadDetail (id) {
      this.$router.push(`/detail/${id}`)
    },
    pureText (text) {
      return text.replace(/<\/?[^>]*>/g, '')
    }
  }
}
</script>

<style scoped>
  .header {
    text-align: left;
    font-weight: bolder;
    font-size: 18px;
    color: #666;
    background-color: #FAFAFA;
  }

  .box-card {
    width: 100%;
    font-family: Helvetica Neue, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
  }

  .image {
    width: 300px;
    height: 300px;
  }

  #price {
    font-family: Arial;
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
