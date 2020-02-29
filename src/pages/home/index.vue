<template>
<!--  <div class="home-box">-->
    <el-container>
      <el-header direction-="vertical">
        <NavigationBar/>
      </el-header>
      <el-main>
        <div class="container">
          <router-view></router-view>
        </div>
      </el-main>
      <el-footer>
        <Copyright/>
      </el-footer>
    </el-container>
<!--  </div>-->
</template>

<script>
import NavigationBar from '@/components/home/NavigationBar'
import Copyright from '@/components/home/Copyright'

export default {
  name: 'index.vue',
  components: {
    Copyright,
    NavigationBar
  }
}
</script>

<style scoped>
  .container {
    display: block;
    text-align: center;
    margin: 40px;
    width: 1320px;
    height: 100%;
  }
</style>
