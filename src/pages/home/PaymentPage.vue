<template>
  <div>
    <el-card class="box-card" style="margin-top: 20px">
      <div slot="header" class="header">
        <span>我的购物车</span>
        <span v-if="isPaymentReady" class="comment">订单已提交成功，请尽快付款！</span>
      </div>
      <div class="content">
        <div v-if="isPaymentReady">
          <span class="sub-title">购买成功！</span>
          <div style="text-align: center">
            <div>{{message}}</div>
            <qrcode :value="payment.paymentLink" :options="qrcode_options"></qrcode>
            <div>支付总额：<span class="price">{{payment.totalPrice.toFixed(2)}}</span></div>
            <div>提示：本程序为演示，扫描以上二维码并不会实际触发支付<br/>
              <el-link type="primary" @click="accomplishPayment">点击模拟扫描</el-link>
              或也可以
              <el-link type="danger" @click="cancelPayment">点击取消购买</el-link>
            </div>
          </div>
        </div>
        <div v-else>
          <span class="sub-title">购买失败！</span>
          <span>失败原因：{{payment.message || '没有收到服务端的支付结算数据'}}</span>
        </div>
      </div>
    </el-card>
    <PayStepIndicator :step="3"/>
  </div>
</template>

<script>
import PayStepIndicator from '@/components/home/cart/PayStepIndicator'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import {mapState} from 'vuex'
import api from '@/api'

export default {
  name: 'PaymentPage',
  components: {
    PayStepIndicator,
    [VueQrcode.name]: VueQrcode
  },
  data () {
    return {
      countdown: {
        min: 0,
        sec: 0,
        timeout: false
      },
      isPaymentFinish: false,
      qrcode_options: {
        width: 300,
        color: {dark: '#666'}
      }
    }
  },
  computed: {
    ...mapState('cart', ['payment']),
    /**
     * 是否成功生成支付单
     **/
    isPaymentReady () {
      return !!this.payment.payId
    },
    message () {
      if (this.isPaymentFinish) {
        return '恭喜，你已经成功付款！'
      } else {
        if (!this.countdown.timeout) {
          return `商品已准备完成，请在 ${this.countdown.min} 分钟${this.countdown.sec}秒内完成支付，订单号码：${this.payment.payId}`
        } else {
          return '你的订单已经取消，如仍需要，请重新购买商品。'
        }
      }
    }
  },
  mounted: function () {
    this.countDown()
  },
  methods: {
    /**
     * 商品支付超期的倒计时
     */
    countDown: function () {
      const msec = this.payment.expires - new Date().getTime()
      if (msec > 0) {
        this.countdown.min = parseInt(msec / 1000 / 60 % 60)
        this.countdown.sec = parseInt(msec / 1000 % 60)
        setTimeout(() => {
          this.countDown()
        }, 1000)
      } else {
        this.countdown.timeout = true
      }
    },
    /**
     * 取消商品支付
     */
    async cancelPayment () {
      try {
        await api.payment.cancelPayment(this.payment.payId)
        this.countdown.timeout = true
        this.$notify({title: '操作成功', message: '订单已被取消', type: 'info'})
      } catch (e) {
        this.$notify({title: '操作失败', message: e.message, type: 'error'})
      }
    },
    /**
     * 完成商品支付
     */
    async accomplishPayment () {
      try {
        await api.payment.accomplishPayment(this.payment.payId)
        this.isPaymentFinish = true
        this.$notify({title: '操作成功', message: '订单已完成支付', type: 'success'})
      } catch (e) {
        this.$notify({title: '操作失败', message: e.message, type: 'error'})
      }
    }
  }
}
</script>

<style scoped>
  .price {
    color: red;
    font-size: 18px;
    font-weight: bold;
    line-height: 32px;
  }
</style>
