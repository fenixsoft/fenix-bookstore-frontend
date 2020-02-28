<template>
  <div id="app">
    <transition name="slide-fade">
      <el-alert title="接收到未处理的异常：" type="error" :description="exception.message" show-icon v-if="exception"
                @close="clearMessage">
      </el-alert>
    </transition>
    <router-view/>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState({
      exception: state => state.notification.exception
    })
  },
  methods: {
    ...mapMutations('notification', ['clearException']),
    clearMessage () {
      this.clearException()
    }
  }
}
</script>

<style>
  @import url('./assets/css/global.css');

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
