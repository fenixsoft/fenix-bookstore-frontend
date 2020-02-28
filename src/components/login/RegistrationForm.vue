<template>
  <div>
    <img src="../../assets/logo-color.png" class="logo">
    <span class="title">新用户注册</span>
    <el-form ref="account_form" :model="account" :rules="rules" label-position="left" class="account_form">
      <el-form-item prop="user">
        <el-input placeholder="请输入用户名" v-model="account.user">
          <template slot="prepend"><i class="el-icon-user"></i></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="请输入密码" show-password v-model="account.password">
          <template slot="prepend"><i class="el-icon-unlock"></i></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input placeholder="请输入真实姓名" v-model="account.name">
          <template slot="prepend"><i class="el-icon-user"></i></template>
        </el-input>
      </el-form-item>
      <el-form-item  prop="email">
        <el-input placeholder="请输入邮箱" v-model="account.email">
          <template slot="prepend"><i class="el-icon-receiving"></i></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="telephone">
        <el-input placeholder="请输入手机" v-model="account.telephone">
          <template slot="prepend"><i class="el-icon-phone-outline"></i></template>
        </el-input>
      </el-form-item>
      <div class="actions">
        <el-button type="primary" class="action_button" @click="registerAccount">注册</el-button>
        <el-button class="action_button" @click="$emit('changeMode')">返回
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import api from '@/api'
import {mapMutations} from 'vuex'

export default {
  name: 'RegistrationForm',
  data () {
    return {
      account: {
        name: '',
        email: '',
        password: '',
        telephone: ''
      },
      rules: {
        user: [
          {required: true, message: '请填写用户名', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请填写真实姓名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请填写密码', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请填写邮箱', trigger: 'blur'},
          {type: 'email', message: '不符合邮箱格式', trigger: 'blur'}
        ],
        telephone: [
          {required: true, message: '请填写手机', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    ...mapMutations('user', ['setupSession']),
    /**
     * 用户注册
     */
    registerAccount () {
      this.$refs['account_form'].validate((valid) => {
        if (valid) {
          this.submitRegistration()
        } else {
          return false
        }
      })
    },
    /**
     * 向服务端提交注册信息
     */
    async submitRegistration () {
      let {data} = await api.account.registerAccount(this.account)
      if (data.code === api.constants.REMOTE_OPERATION_SUCCESS) {
        // 注册成功后自动登陆该用户，并转向首页
        data = (await api.auth.login(this.account.name, this.account.password)).data
        if (data.code === api.constants.REMOTE_OPERATION_SUCCESS) {
          data.rememberMe = false
          data.language = 'zhCN'
          this.setupSession(data)
          this.$router.push('/')
          return
        }
      }
      // 注册或者登录任一请求未返回成功标志，均显示错误信息告知用户
      this.$message.error(data.message)
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

  .account_form {
    padding: 50px 40px 50px 40px;
  }

  .actions {
    width: 100%;
    display: block;
    text-align: center;
  }

  .action_button {
    width: 150px;
  }

  hr {
    height: 0;
    width: 90%;
    border: 1px solid #BBB;
    border-bottom: 0;
  }

  i {
    font-size: 18px;
  }

</style>
