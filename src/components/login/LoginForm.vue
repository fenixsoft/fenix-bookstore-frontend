<template>
  <div>
    <img src="../../assets/logo-color.png" class="logo">
    <span class="title">Fenix's Bookstore</span>
    <div class="login-form">
      <el-input placeholder="请输入用户" v-model="name">
        <template slot="prepend"><i class="el-icon-user"></i></template>
      </el-input>
      <el-input placeholder="请输入密码" style="padding-top: 15px" show-password v-model="password">
        <template slot="prepend"><i class="el-icon-unlock"></i></template>
      </el-input>
      <el-input placeholder="请输入地区（未来做国际化预留）" pass style="padding-top: 15px" v-model="location">
        <template slot="prepend"><i class="el-icon-map-location"></i></template>
      </el-input>
      <div class="actions">
        <el-checkbox v-model="checked" style="float: left; display: inline-block; padding-left: 10px">自动登录</el-checkbox>
        <el-button type="text" style="float: right; display: inline-block; padding: 0 10px 0 0" v-on:click="$emit('changeMode')">注册新用户</el-button>
        <el-button type="primary" style="width: 100%; display: block; margin: 50px 0 0 0">登录</el-button>
      </div>
      <hr>
      <div style="text-align: center; ">
        登录代表你已同意
        <el-tooltip effect="dark" content="演示程序，并没有写" placement="bottom">
          <el-button type="text">用户协议</el-button>
        </el-tooltip>
        和
        <el-tooltip effect="dark" content="也是没有写" placement="bottom">
          <el-button type="text" style="margin-left: 0">隐私政策</el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      name: '',
      password: '',
      location: '',
      checked: true
    }
  }
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
