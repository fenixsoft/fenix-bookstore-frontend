<template>
  <div>
    <img src="../../assets/logo-color.png" class="logo">
    <span class="title">新用户注册</span>
    <div class="login-form">
      <el-input placeholder="请输入用户" v-model="name">
        <template slot="prepend"><i class="el-icon-user"></i></template>
      </el-input>
      <el-input placeholder="请输入密码" style="padding-top: 15px" show-password v-model="password">
        <template slot="prepend"><i class="el-icon-unlock"></i></template>
      </el-input>
      <el-input placeholder="请再次输入密码" style="padding-top: 15px" show-password v-model="password">
        <template slot="prepend"><i class="el-icon-unlock"></i></template>
      </el-input>
      <el-input placeholder="请输入手机号码" style="padding-top: 15px" show-password v-model="password">
        <template slot="prepend"><i class="el-icon-phone-outline"></i></template>
      </el-input>
      <div class="actions">
        <el-button type="primary" style="width: 100%; display: block; margin: 20px 0 0 0">注册</el-button>
        <el-button style="width: 100%; display: block; margin: 10px 0 0 0" v-on:click="$emit('changeMode')">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegistrationForm'
}
</script>

<style scoped>
  .logo {
    width: 120px;
    height: 120px;
    display: block;
    padding: 70px 0 0 165px;
  }

  .title {
    width: 100%;
    display: block;
    text-align: center;
    padding-top: 20px;
    line-height: 1em;
    color: #333;
    font-size: 20px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
  }

  .login-form {
    padding: 50px 40px;
  }

  .actions {
    padding: 20px 0;
    width: 100%;
    display: block;
  }

  hr {
    height: 0;
    width: 90%;
    border: 1px solid #BBB;
    border-bottom: 0px;
  }

</style>
