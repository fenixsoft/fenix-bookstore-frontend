<template>
  <el-popover placement="top" width="250" v-model="visible" trigger="click">
    <div class="container">
      <a href="http://cn.gravatar.com/" target="_blank">
        <el-avatar :size="64" fit="fill" :src="account.avatar"></el-avatar>
      </a>
      <span style="display: block">{{account.name}}</span>
      <el-form ref="account_form" :model="account" :rules="rules" size="mini" class="account_form">
        <el-form-item size="mini" prop="email">
          <el-input v-model="account.email">
            <template slot="prepend"><i class="el-icon-receiving"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item size="mini" prop="telephone">
          <el-input v-model="account.telephone">
            <template slot="prepend"><i class="el-icon-phone-outline"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item size="mini" prop="location">
          <el-input v-model="account.location">
            <template slot="prepend"><i class="el-icon-map-location"></i></template>
          </el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center; margin: 5px 0 5px 0">
        <el-button size="mini" type="primary" plain @click="modifyAccount">更新信息</el-button>
        <el-button size="mini" type="danger" plain @click="exitLogin">退出登录</el-button>
      </div>
    </div>
    <el-button icon="el-icon-user" slot="reference" circle @click="changeUserStatue"></el-button>
  </el-popover>
</template>

<script>
import api from '@/api'
import {mapState, mapGetters, mapMutations} from 'vuex'

export default {
  name: 'UserInformation',
  data () {
    return {
      trigger: 'manual',
      visible: false,
      rules: {
        email: [
          {required: true, message: '请填写邮箱', trigger: 'blur'},
          {type: 'email', message: '不符合邮箱格式', trigger: 'blur'}
        ],
        telephone: [
          {required: true, message: '请填写手机', trigger: 'blur'}
        ],
        location: [
          {required: true, message: '请填写地址', trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    if (!this.account.id) {
      this.refreshAccount()
    }
  },
  computed: {
    ...mapGetters('user', ['isAuthorized']),
    ...mapState('user', ['account', 'session'])
  },
  methods: {
    ...mapMutations('user', ['updateAccount', 'clearSession']),
    /**
     * 检查用户状态
     * 没有登陆的话，转向登陆页面
     * 没有获取过用户账号信息的话，
     */
    changeUserStatue () {
      if (!this.isAuthorized) {
        this.$router.push('/login')
      }
    },
    /**
     * 从服务端请求用户信息，更新到vuex中
     */
    async refreshAccount () {
      let {data} = await api.account.getAccountById(this.session.id)
      // 上传头像的功能不做了，直接用Gravatar的服务
      data.avatar = api.encrypt.gravatarEncode(data.email)
      this.updateAccount(data)
    },

    /**
     * 退出登陆
     */
    exitLogin () {
      this.clearSession()
      this.visible = false
    },

    /**
     * 更新账户信息
     */
    modifyAccount () {
      this.$refs['account_form'].validate((valid) => {
        if (valid) {
          this.submitModification()
        } else {
          return false
        }
      })
    },
    /**
     * 向服务端提交账户更新
     */
    async submitModification () {
      let res = (await api.account.updateAccount(this.account)).data
      if (res.code === api.constants.REMOTE_OPERATION_SUCCESS) {
        this.$notify({
          title: '成功',
          message: '账号信息已成功更新',
          type: 'success'
        })
      } else {
        this.$notify({
          title: '注意',
          message: res.message,
          type: 'error'
        })
      }
    }
  }
}
</script>

<style scoped>
  .container {
    display: block;
    text-align: center;
  }

  .account_form {
    padding-top: 15px;
  }
</style>
