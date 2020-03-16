<template>
  <div>
    <div class="nav-bar-container">
      <div class="left-action-bar">
        <img src="@/assets/logo-gray-light.png" class="icon">
      </div>
      <el-menu :default-active="activeIndex" mode="horizontal" :router="true" class="nav-bar"
               text-color="#CCCCCC" background-color="#292A2D" active-text-color="#FFFFFF">
        <el-menu-item index="/">凤凰书社</el-menu-item>
        <el-menu-item index="/cart">购物车</el-menu-item>
        <el-menu-item index="/warehouse" :disabled="!isAdministrator">商品库存</el-menu-item>
        <el-menu-item index="/comment">留言板</el-menu-item>
        <el-submenu index="2">
          <template slot="title">相关信息</template>
          <el-menu-item index="#">
            <a href="http://icyfenix.cn/introduction/about-the-fenix-project.html" target="_blank">Fenix？这是什么？</a>
          </el-menu-item>
          <el-submenu index="#">
            <template slot="title">选择一种服务端</template>
            <el-menu-item index="#1">
              <a href="http://icyfenix.pub/architecture/monolithic-architecture/springboot-base-arch.html"
                 target="_blank">单体架构 By
                SpringBoot</a>
            </el-menu-item>
            <el-menu-item index="#">
              <a href="http://icyfenix.pub/architecture/microservices-architecture/springcloud-base-arch.html"
                 target="_blank">微服务架构 By
                SpringCloud</a>
            </el-menu-item>
            <el-menu-item index="#">
              <a href="http://icyfenix.pub/architecture/microservices-architecture/kubernetes-base-arch.html"
                 target="_blank">微服务架构 By
                Kubernetes</a>
            </el-menu-item>
            <el-menu-item index="#">
              <a href="http://icyfenix.cn/architecture/serverless-architecture/serverless-arch-knative.html"
                 target="_blank">无服务架构 By Knative</a>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="#2">
            <template slot="title">真想买一本书？</template>
            <el-menu-item index="#">
              <a href="https://item.jd.com/63246908517.html" target="_blank">《深入理解Java虚拟机（第三版）》 @ 京东</a>
            </el-menu-item>
            <el-menu-item index="#">
              <a href="https://item.jd.com/34377092907.html" target="_blank">《智慧的疆界》 @ 京东</a>
            </el-menu-item>
            <el-menu-item index="#">
              <a href="https://item.jd.com/17021405508.html" target="_blank">《Java虚拟机规范（Java SE 7）》 @ 京东</a>
            </el-menu-item>
            <el-menu-item index="#">其他几本别买了，不推荐</el-menu-item>
          </el-submenu>
        </el-submenu>
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
import {mapGetters} from 'vuex'

export default {
  components: {
    UserInformation
  },
  data () {
    return {
      activeIndex: '/'
    }
  },
  computed: {
    ...mapGetters('user', ['isAdministrator'])
  },
  methods: {}
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

  a {
    color: rgb(204, 204, 204);
    text-decoration: none;
  }
</style>
