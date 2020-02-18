<template>

  <el-container>
    <el-header>
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
  }
</style>
