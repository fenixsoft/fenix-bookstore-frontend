<template>
  <div class="bg">
    <div class="dialog dialog-shadow">
      <LoginForm v-if="!registrationMode" v-on:changeMode="registrationMode = !registrationMode" @login="login"/>
      <RegistrationForm v-if="registrationMode" v-on:changeMode="registrationMode = !registrationMode"/>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import api from '@/api'
import LoginForm from '../components/login/LoginForm'
import RegistrationForm from '../components/login/RegistrationForm'

export default {
  name: 'Login',
  components: {
    LoginForm,
    RegistrationForm
  },
  data () {
    return {
      // 表示登陆还是注册状态
      registrationMode: false
    }
  },
  computed: {
    /**
     *  记录登陆成功后要转向的地址，该地址由全局路由拦截器自动设置，如果没设置，默认转向首页
     **/
    nextPath () {
      return this.$route.query.redirect ? this.$route.query.redirect : '/'
    }
  },
  methods: {
    ...mapMutations('session', ['setupSession']),
    async login (authorization) {
      try {
        let {data} = await api.auth.login(authorization)
        if (data.code === api.auth.constant.LOGIN_SUCCESS) {
          data.rememberMe = authorization.rememberMe
          data.location = authorization.location
          this.setupSession(data)
          this.$router.push(this.nextPath)
        } else {
          alert(data.message)
        }
      } catch (e) {
        alert(e.message)
      }
    },
    register () {
      this.registrationMode = true
    }
  }
}
</script>

<style scoped>
  .bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: url("../assets/bg.png");
    background-repeat: repeat;
  }

  .dialog {
    width: 450px;
    height: 642px;
    border: 1px solid #dadada;
    border-radius: 10px;
    top: 45%;
    left: 50%;
    margin-top: -371px;
    margin-left: -225px;
    position: absolute;
    background-image: url("../assets/bg2.png");
    background-repeat: repeat;
  }

  .dialog-shadow {
    -webkit-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, .2), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 10px 20px -10px rgba(0, 0, 0, .04);
    -moz-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, .2), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 10px 20px -10px rgba(0, 0, 0, .04);
    box-shadow: 0 9px 30px -6px rgba(0, 0, 0, .2), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 10px 20px -10px rgba(0, 0, 0, .04);
  }
</style>
