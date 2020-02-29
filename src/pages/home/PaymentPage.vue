<template>
  <div>
    <el-card class="box-card" style="margin-top: 20px">
      <div slot="header" class="header">
        <span>我的购物车</span>
        <span v-if="isSuccess" class="comment">订单已提交成功，请尽快付款！</span>
      </div>
      <div class="content">
        <div v-if="isSuccess">
          <span class="sub-title">购买成功！</span>
          <div style="text-align: center">
            <div v-if="!countdown.timeout">商品已准备备齐，请在 {{this.countdown.min}} 分钟 {{this.countdown.sec}}
              秒内完成支付，订单号码：{{payment.id}}
            </div>
            <div v-else>你的支付已超时，如仍需要，请重新购买商品。</div>
            <qrcode :value="payment.qrcode" :options="qrcode_options"></qrcode>
            <div>提示：本程序为演示，扫描以上二维码并不会实际触发支付</div>
          </div>
        </div>
        <div v-else>
          <span class="sub-title">购买失败！</span>
          <span>失败原因：{{payment.message || '没有收到服务端的支付结算数据，是直接通过地址进来的？'}}</span>
        </div>
      </div>
    </el-card>
    <PayStepIndicator :step="3"/>
  </div>
</template>

<script>
import PayStepIndicator from '@/components/home/cart/PayStepIndicator'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import api from '@/api'
import {mapState} from 'vuex'

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
      qrcode_options: {
        width: 300,
        color: {dark: '#666'}
      }
    }
  },
  computed: {
    ...mapState('cart', ['payment']),
    /**
     * 是否支付成功
     **/
    isSuccess () {
      return this.payment.code === api.constants.REMOTE_OPERATION_SUCCESS
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
    }
  }
}
</script>

<style scoped>

</style>
