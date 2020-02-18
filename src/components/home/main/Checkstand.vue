<template>
  <div class="sale">
    <ul class="sale_ul">
      <li>
        <label>零&nbsp;&nbsp;售&nbsp;&nbsp;价：</label>
        <div class="sale_content price">￥{{product.price}}</div>
      </li>
      <li>
        <label>促销信息：</label>
        <div class="sale_content">
          <div style="padding-bottom: 5px;">
            <el-tag type="danger" effect="plain">加价购</el-tag>
            &nbsp;或满15元另加5.90元，即可换购热销商品
          </div>
          <div>
            <el-tag type="danger" effect="plain">送赠品</el-tag>
            &nbsp;购满两本，送限量赠彩虹数据线1条
          </div>
        </div>
      </li>
      <li>
        <label>即刻配送：</label>
        <div class="sale_content" style="padding-top: 8px;">
          <el-switch v-model="purchase.delivery"/>
        </div>
      </li>
      <li>
        <label>配&nbsp;&nbsp;送&nbsp;&nbsp;至：</label>
        <div class="sale_content">
          <v-distpicker :province="purchase.address.province" :city="purchase.address.city"
                        :area="purchase.address.area"></v-distpicker>
          <span class="address_info"><b>有货</b> 由京东发货, 并提供售后服务. 18:00前下单，预计明天送达</span>
        </div>
      </li>
    </ul>
    <div style="padding: 0 10px 0 18px; display: inline">
      <el-input-number v-model="purchase.number" controls-position="right" :min="1" :max="10" size="small"
                       style="height: 39px; line-height: 39px;"/>
    </div>
    <el-button type="danger" icon="el-icon-shopping-cart-full" @click="addCart">加入购物车</el-button>
    <el-button type="danger" plain icon="el-icon-goods" @click="paying">立即购买</el-button>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'

export default {
  name: 'Checkstand',
  components: {
    VDistpicker
  },
  model: {
    prop: 'purchase',
    event: 'place-order'
  },
  props: {
    purchase: Object,
    product: Object
  },
  methods: {
    addCart () {
      this.purchase.type = 'addCart'
      this.$emit('place-order', this.purchase)
    },
    paying () {
      this.purchase.type = 'paying'
      this.$emit('place-order', this.purchase)
    }
  }
}
</script>

<style scoped>
  .sale {
    padding-top: 10px;
    font-size: 14px;
    display: inline-block;
    max-width: 610px;
  }

  .sale_ul {
    list-style-type: none;
    padding-inline-start: 20px;
  }

  .sale_content {
    display: inline-block;
    padding-bottom: 20px;
    font-size: 14px;
    max-width: 465px;
  }

  label {
    display: inline-table;
    vertical-align: top;
    width: 85px;
    padding: 10px 0;
  }

  .price {
    color: red;
    font-size: 24px;
  }

  .address_info {
    display: block;
    padding: 5px;
    font-size: 12px;
    color: #666;
  }
</style>
