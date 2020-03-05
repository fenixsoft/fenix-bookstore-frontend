<template>
  <el-card class="box-card" :body-style="{ padding: '0 10px 0 10px' }">
    <div slot="header" class="header">
      <span>讨论</span>
      <span class="comment">本功能通过Gitalk使用GitHub的Issues提供服务，请使用GitHub账号登录</span>
    </div>
    <div>
      <iframe src="/static/board/gitalk.html" style="width: 1300px; height: 1000px" frameborder="0"></iframe>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'CommentPage'
}
</script>

<style scoped>
  .body {
    padding: 0;
  }
</style>
