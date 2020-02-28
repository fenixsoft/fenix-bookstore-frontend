<template>
  <div>
    <div class="nav-bar-container">
      <div class="left-action-bar">
        <img src="@/assets/logo-gray-light.png" class="icon" @click="navigateIndex">
      </div>
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleMenuSelect" :router="true" class="nav-bar"
               text-color="#CCCCCC" background-color="#292A2D" active-text-color="#FFFFFF">
        <el-menu-item index="/">凤凰书社</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-menu-item index="/detail/1">购物车</el-menu-item>
      </el-menu>
      <div class="right-action-bar">
        <div class="right-action">
          <UserInformation/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserInformation from './UserInformation'

export default {
  components: {
    UserInformation
  },
  data () {
    return {
      activeIndex: '/'
    }
  },
  methods: {
    handleMenuSelect (key, keyPath) {
      // this.$router.push(key)
    },
    navigateIndex () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  .icon {
    height: 40px;
    padding: 7px 0 0 20px;
    cursor: pointer;
  }

  .nav-bar-container {
    background-color: #292A2D;
    text-align: center;
    height: 60px;
  }

  .nav-bar {
    display: inline-block;
  }

  .left-action-bar {
    display: inline-block;
    float: left;
    height: 100%;
  }

  .right-action-bar {
    display: inline-block;
    float: right;
    height: 100%;
  }

  .right-action {
    padding: 9px 15px;
  }

  .right-action > i {
    margin-right: 10px;
    color: #ccc;
    font-size: 20px;
    line-height: 60px;
  }

  .right-action > i:hover {
    color: #fff;
  }
</style>
