<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="header">
        <span>我的结算单</span>
        <span class="comment">温馨提示：产品是否购买成功，以最终支付为准哦，请尽快完成结算</span>
      </div>
      <div class="content">
        <span class="sub-title">收件人信息：</span>
        <el-form label-width="80px" :model="purchase" style="display: inline-block; width: 700px">
          <el-form-item label="姓名">
            <el-input v-model="purchase.name"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="purchase.telephone"></el-input>
          </el-form-item>
          <el-form-item label="城市">
            <v-distpicker @selected="onAddressSelected" :province="purchase.address.province"
                          :city="purchase.address.city" :area="purchase.address.area">
            </v-distpicker>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="purchase.location"></el-input>
          </el-form-item>
        </el-form>
        <div class="cover">
          <el-carousel height="350px">
            <el-carousel-item v-for="item in settlement.items" :key="item.id">
              <img :src="item.image"/>
            </el-carousel-item>
          </el-carousel>
        </div>
        <span class="sub-title">支付方式：</span>
        <div style="padding: 0 0 20px 80px;">
          <el-radio v-model="purchase.pay" label="wechat" style="width: 130px" border> 微信支付</el-radio>
          <el-radio v-model="purchase.pay" label="alipay" style="width: 130px" border> 支付宝</el-radio>
        </div>
        <span class="sub-title">结算金额：</span>
        <div style="width: 100%">
          <span class="label">{{settlement.items.length}} 件商品，总商品金额：</span><span class="value"> {{totalAmount.toFixed(2)}} 元</span>
          <span class="label">运费：</span><span class="value"> 12.00 元</span>
          <span class="label">折扣：</span><span class="value"> 0.00 元</span>
          <div class="total">
            <span class="label" style="line-height: 40px">应付总额：</span><span class="value-large"> {{(totalAmount+12).toFixed(2)}}</span>
            <span class="value value-small">寄送至：{{fullAddress}}， 收件人：{{this.purchase.name}}， 电话：{{this.purchase.telephone}}</span>
          </div>
        </div>
        <el-button type="primary" class="submit-button" @click="prepareSettlement">提交订单</el-button>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 20px">
      <div slot="header" class="header">
        <span>送货清单</span>
      </div>
      <div class="content">
        <el-table :data="settlement.items" ref="settlementTable" style="width: 100%">
          <el-table-column prop="title" label="商品名称" sortable></el-table-column>
          <el-table-column prop="price" label="单价" width="100" sortable></el-table-column>
          <el-table-column prop="amount" label="数量" width="100" sortable></el-table-column>
          <el-table-column label="小计" width="100" sortable>
            <template slot-scope="scope">
              <span class="sub-total">{{scope.row.price * scope.row.amount}} 元</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <PayStepIndicator :step="2"/>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
import PayStepIndicator from '@/components/home/cart/PayStepIndicator'
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
  name: 'SettlementPage',
  components: {
    VDistpicker,
    PayStepIndicator
  },
  data () {
    return {
      // 为了便于页面修改，而不直接改变VUEX状态，最后统一提交，使用一个结构相同的中间对象
      purchase: {
        name: '',
        telephone: '',
        delivery: true,
        pay: 'wechat',
        address: {province: '广东省', city: '广州市', area: '海珠区'},
        location: ''
      }
    }
  },
  /**
   * 页面初始化时，从登陆用户中取默认值
   */
  created () {
    // 两层默认值：首先取登录信息中的用户数据，然后取页面转向之前设置的购买人数据。
    // 当用户以游客（未登录）身份购买时，当时无法获取默认购买人，需要转向登录页面，以登陆信息为默认值
    Object.assign(this.purchase, this.account)
    Object.assign(this.purchase, this.settlement.purchase)
  },
  computed: {
    ...mapState('user', ['account']),
    ...mapState('cart', ['settlement']),
    /**
     * 邮寄地址全称
     */
    fullAddress () {
      return `${this.purchase.address.province}  ${this.purchase.address.city} ${this.purchase.address.area} ${this.purchase.location}`
    },
    /**
     * 总金额（不含运费）
     */
    totalAmount () {
      return this.settlement.items.reduce((sum, product) => sum + (product.price * product.amount), 0)
    }
  },
  methods: {
    ...mapMutations('cart', ['setupSettlementBill']),
    ...mapActions('cart', ['submitSettlement', 'setupSettlementBillWithDefaultValue']),
    /**
     * 地址选择控件的绑定事件，该控件未支持v-model
     */
    onAddressSelected (address) {
      this.purchase.address.province = address.province.value
      this.purchase.address.city = address.city.value
      this.purchase.address.area = address.area.value
    },
    /**
     * 将当前结算单据发送到服务端，并从服务端返回支付信息
     */
    async prepareSettlement () {
      this.setupSettlementBillWithDefaultValue({
        purchase: this.purchase
      })
      await this.submitSettlement()
      this.$router.push('/pay')
    }
  }
}
</script>

<style scoped>
  .sub-total {
    color: red;
    font-weight: bold;
    font-size: 16px;
  }

  .cover {
    display: inline-block;
    float: right;
    width: 350px;
    position: relative;
    top: -30px;
    left: -100px;
  }

  .label, .value {
    color: #666;
    line-height: 24px;
  }

  .label {
    display: inline-block;
    width: 1100px;
    text-align: right;
  }

  .value {
    float: right;
    padding-right: 20px;
  }

  .value-large {
    color: red;
    font-size: 32px;
    font-weight: bold;
    float: right;
    padding-right: 20px;
  }

  .value-small {
    clear: both;
    font-size: 12px;
    color: #999;
    display: block;
  }

  .total {
    width: 100%;
    height: 70px;
    margin-top: 10px;
    padding-top: 10px;
    background-color: #f5f5f5;
    border: 1px;
    border-radius: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }

  .submit-button {
    float: right;
    margin: 20px;
    width: 200px;
    font-size: 24px;
    line-height: 32px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
