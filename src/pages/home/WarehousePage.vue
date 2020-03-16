<template>
  <el-card class="box-card">
    <div slot="header" class="header">
      <span>商品及库存管理</span>
      <span style="float: right;">
        <el-button type="primary" size="mini"
                   @click="stockMode=false; createMode=dialogFormVisible=true">新增商品</el-button>
      </span>
    </div>
    <div class="content">
      <el-table :data="products" ref="productTable" style="width: 100%">
        <el-table-column label="图片" width="150">
          <template slot-scope="scope">
            <img :src="scope.row.cover" style="width: 120px"/>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="商品名称" sortable width="250"></el-table-column>
        <el-table-column prop="rate" label="评分" width="80" sortable></el-table-column>
        <el-table-column label="商品简介" sortable>
          <template slot-scope="scope">
            <span class="description">{{ pureText(scope.row.description) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价" width="80" sortable></el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-link type="primary" @click="manageProduct(scope.row)">修改</el-link>
            <el-link type="primary" @click="manageStock(scope.row)">库存</el-link>
            <el-popconfirm confirmButtonText='确定' cancelButtonText='我手抖了' icon="el-icon-info" iconColor="red"
                           title="确定删除这个商品吗？" @onConfirm="removeProduct(scope.row.id)">
              <el-link slot="reference" type="danger">删除</el-link>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="商品信息" :visible.sync="dialogFormVisible">
        <ProductManage :product="product" :create-mode="createMode" v-show="!stockMode"
                       @dismiss="dialogFormVisible = false"
                       @updated="loadProducts"></ProductManage>
        <StockManage :product="product" :stock="stock" v-show="stockMode"
                     @dismiss="dialogFormVisible = false"></StockManage>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
import api from '@/api'
import {mapMutations} from 'vuex'
import ProductManage from '@/components/home/warehouse/ProductManage'
import StockManage from '@/components/home/warehouse/StockManage'

export default {
  name: 'WarehousePage',
  components: {
    ProductManage,
    StockManage
  },
  data () {
    return {
      products: [],
      product: {
        title: '',
        price: 0,
        rate: 0,
        cover: '',
        desc: '',
        description: '',
        specifications: []
      },
      stock: {
        amount: 0,
        frozen: 0
      },
      createMode: false,
      stockMode: false,
      dialogFormVisible: false
    }
  },
  created () {
    this.loadProducts()
  },
  methods: {
    ...mapMutations('cart', ['removeCartItem']),
    /**
     * 去除HTML标签
     */
    pureText (text) {
      return api.stringUtil.pureText(text)
    },
    /**
     * 加载全部商品信息
     */
    async loadProducts () {
      this.dialogFormVisible = false
      this.products = (await api.warehouse.getAllProducts()).data
    },
    /**
     * 修改特定商品
     */
    manageProduct (product) {
      // 属性都是单层的原始数据，做一次浅拷贝就够用了
      this.product = Object.assign(this.product, product)
      this.product.description = api.stringUtil.transToReturn(product.description)
      this.createMode = false
      this.stockMode = false
      this.dialogFormVisible = true
    },
    /**
     * 调整库存
     */
    async manageStock (product) {
      // 每次打开都实时请求一次库存
      let {data} = await api.warehouse.queryStock(product.id)
      this.stock = data
      this.product = product
      this.stockMode = true
      this.dialogFormVisible = true
    },
    /**
     *删除选定产品
     */
    async removeProduct (id) {
      try {
        await api.warehouse.removeProduct(id)
        // 如果购物车上有这个商品，也删除掉
        // 购物车是存储在客户端本地的，如果其他客户端保存了被删除的商品，需要在购物车页面处理，暂时没有做
        this.removeCartItem(id)
        this.loadProducts()
        this.$notify({title: '操作成功', message: '商品已删除', type: 'success'})
      } catch (e) {
        this.$notify({title: '操作失败', message: e.message, type: 'error'})
      }
    }
  }
}
</script>

<style scoped>
  .description {
    font-size: 12px;
    color: #999;
    text-align: left;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
</style>
