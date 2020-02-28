<template>
  <div>
    <img src="../../assets/logo-color.png" class="logo">
    <span class="title">Fenix's Bookstore</span>
    <el-form :model="authorization" :rules="rules" ref="login-form" class="login-form">
      <el-form-item prop="name">
        <el-input placeholder="请输入用户" v-model="authorization.name">
          <template slot="prepend"><i class="el-icon-user"></i></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="请输入密码" show-password v-model="authorization.password">
          <template slot="prepend"><i class="el-icon-unlock"></i></template>
        </el-input>
      </el-form-item>
      <el-select placeholder="请选择语言" style="width: 370px" v-model="authorization.language">
        <el-option label="          中文" value="zhCN"/>
        <el-option label="          英文（无效，国际化预留）" value="enUS"/>
        <template slot="prefix">
          <div class="select-prefix"><i class="el-icon-map-location"></i></div>
        </template>
      </el-select>
      <template slot="prepend"><i class="el-icon-map-location"></i></template>
      <div class="actions">
        <el-checkbox v-model="authorization.rememberMe" class="check">
          自动登录
        </el-checkbox>
        <el-button type="text" style="float: right; display: inline-block; padding: 0 10px 0 0"
                   v-on:click="$emit('changeMode')">注册新用户
        </el-button>
        <el-button type="primary" style="width: 100%; display: block; margin: 50px 0 0 0" @click="login">登录</el-button>
      </div>
      <hr>
      <div style="text-align: center; ">
        登录代表你已同意
        <el-tooltip effect="dark" content="演示用途，并没有写" placement="bottom">
          <el-button type="text">用户协议</el-button>
        </el-tooltip>
        和
        <el-tooltip effect="dark" content="也是没有写" placement="bottom">
          <el-button type="text" style="margin-left: 0">隐私政策</el-button>
        </el-tooltip>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      authorization: {
        name: '',
        password: '',
        language: 'zhCN',
        rememberMe: false
      },
      rules: {
        name: [
          {required: true, message: '请输入用户名称', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs['login-form'].validate((valid) => {
        if (valid) {
          this.$emit('login', this.authorization)
        } else {
          return false
        }
      })
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

  .check {
    float: left;
    display: inline-block;
    padding-left: 10px
  }

  .select-prefix {
    /*border-right: 0;*/
    border: 1px solid #DCDFE6;
    background-color: #F5F7FA;
    color: #909399;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border-radius: 4px;
    padding: 0 20px;
    height: 38px;
    left: -5px;
  }

  i {
    font-size: 18px;
  }

</style>
