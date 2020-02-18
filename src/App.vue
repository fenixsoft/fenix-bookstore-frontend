<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  body {
    margin: 0px;
    background-color: #ededed;
    overflow-x: hidden;
    /* 解决el-images为了预览模式设置hidden导致滚动条消失的问题 */
    overflow-y: auto !important;
  }

  /* 以下为对Element-UI部分样式的调整 */

  .el-main, .el-header, .el-footer {
    padding: 0;
  }

  .el-main {
    display: flex;
    justify-content: center;
  }

  .el-card__header {
    background-color: #FAFAFA;
  }

  .el-input-number.is-controls-right[class*=small] [class*=decrease], .el-input-number.is-controls-right[class*=small] [class*=increase] {
    line-height: 18px;
  }

  .el-input--small .el-input__inner {
    height: 39px;
    line-height: 39px;
  }
</style>
