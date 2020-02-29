<template>
  <el-card class="box-card" style="margin-top: 20px">
    <div slot="header" class="header">
      <span>购买流程</span>
    </div>
    <div class="content" style="padding: 0 100px">
      <el-steps :active="step" align-center>
        <el-step title="我的购物车" description="在购物车中确认每件商品的价格、数量"></el-step>
        <el-step title="我的结算单" description="在结算单中确认配送地址、支付信息"></el-step>
        <el-step title="支付" description="通过微信、支付宝完成付款，等待收货"></el-step>
      </el-steps>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'PayStepIndicator',
  props: {
    step: Number
  }
}
</script>

<style scoped>

</style>
