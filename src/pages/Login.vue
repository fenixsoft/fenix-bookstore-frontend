<template>
  <div class="bg">
    <div class="dialog dialog-shadow">
        <LoginForm v-if="!registration" v-on:changeMode="registration = !registration"/>
        <RegistrationForm v-if="registration" v-on:changeMode="registration = !registration"/>
    </div>
  </div>
</template>

<script>
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
      registration: false
    }
  },
  methods: {
    register () {
      this.registration = true
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
