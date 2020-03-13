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
    <el-button :icon="isAuthorized ? 'el-icon-user-solid' : 'el-icon-user'" slot="reference" circle
               @click="changeUserStatue"></el-button>
  </el-popover>
</template>

<script>
import api from '@/api'
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

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
    if (this.isAuthorized) {
      // Session是具有有效期的，设置更新令牌的触发器
      this.refreshSessionTrigger()
      // Session中有用户，而账号中没有，说明是通过“保存当前登陆状态”得到的，从服务端获取一下用户信息
      if (!this.account.username) {
        this.refreshAccount()
      }
    }
  },
  computed: {
    ...mapGetters('user', ['isAuthorized']),
    ...mapState('user', ['account', 'session'])
  },
  methods: {
    ...mapMutations('user', ['updateAccount', 'clearSession']),
    ...mapActions('user', ['refreshSessionTrigger']),
    /**
     * 检查用户状态
     * 没有登陆的话，转向登陆页面
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
      let {data} = await api.account.getAccountByUsername(this.session.username)
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
      this.$refs['account_form'].validate(valid => valid ? this.submitModification() : false)
    },
    /**
     * 向服务端提交账户更新
     */
    async submitModification () {
      try {
        await api.account.updateAccount(this.account)
        this.$notify({title: '成功', message: '账号信息已成功更新', type: 'success'})
      } catch (e) {
        this.$notify({title: '失败', message: e.message, type: 'error'})
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
