<template>
  <div>
    <span class="title">{{this.product.title}}</span>
    <el-form :model="product" label-position="right" :inline="true">
      <el-form-item label="可用库存" label-width="135px">
        <el-input-number v-model="stock.amount"></el-input-number>
      </el-form-item>
      <el-form-item label="冻结库存" label-width="135px">
        <el-input-number v-model="stock.frozen" disabled></el-input-number>
      </el-form-item>
    </el-form>
    <div style="text-align: right; padding-right: 40px">
      <el-button @click="$emit('dismiss')">取 消</el-button>
      <el-button type="primary" @click="submitStock">确 定</el-button>
    </div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'StockManage',
  props: {
    product: Object,
    stock: Object
  },
  data () {
    return {}
  },
  methods: {
    /**
     * 修改指定商品的库存数量
     */
    async submitStock () {
      try {
        await api.warehouse.updateStock(this.product.id, this.stock.amount)
        this.$notify({title: '操作成功', message: (this.createMode ? '商品已成功创建' : '商品信息已修改'), type: 'success'})
        this.$emit('dismiss')
      } catch (e) {
        this.$notify({title: '操作失败', message: e.message, type: 'error'})
      }
    }
  }
}
</script>

<style scoped>
  .title {
    font-size: 20px;
    padding-bottom: 30px;
    display: block;
  }
</style>
