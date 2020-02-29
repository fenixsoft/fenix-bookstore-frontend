<template>
  <div style="display: block">
    <el-row :gutter="20">
      <el-col :span="6">
        <div>
          <h1>版权信息</h1>
          <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
            <img src="@/assets/cc-logo.png" style="height: 45px"/>
          </a>
          <span>
          本作品采用<a rel="license" href="http://creativecommons.org/licenses/by/4.0/">知识共享署名 4.0 国际许可协议</a>进行许可。
          <br/>
          <br/>
          您可以自由地：
          <ul>
            <li>共享 — 在任何媒介上以任何形式复制、发行本作品</li>
            <li>演绎 — 修改、转换或以本作品为基础进行二次创作</li>
          </ul>
          只要您遵守许可协议条款中署名、非商业性使用、相同方式共享的条件，许可人就无法收回您的这些权利。
        </span>
        </div>
      </el-col>

      <el-col :span="6">
        <div>
          <h1>社区与帮助</h1>
          <ul>
            <li><a href="">更新日志</a></li>
            <li><a href="">在GitHub网站上获取源码</a></li>
            <li><a href="">关于Fenix's Project</a></li>
            <li><a href="">在Gitter.im上在线讨论</a></li>
          </ul>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <h1>程序资源</h1>
          <span>
          Fenix's BookStore前端部分基于以下开源组件和免费资源构建：
        </span>
          <ul>
            <li><a href="https://cn.vuejs.org/">Vue.js</a><br/>渐进式JavaScript框架</li>
            <li><a href="https://element.eleme.cn/#/zh-CN">Element</a><br/>一套为开发者、设计师和产品经理准备的基于Vue 2.0的桌面端组件库</li>
            <li><a href="https://github.com/axios/axios">Axios</a><br/>Promise based HTTP client for the browser and
              node.js
            </li>
            <li><a href="http://mockjs.com/">Mock.js</a><br/>生成随机数据，拦截 Ajax 请求</li>
            <li><a href="https://www.designevo.com/cn">DesignEvo</a><br/>一款由PearlMountain有限公司设计研发的logo设计软件</li>
          </ul>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <h1>支持作者</h1>
          <span>
          如果本作品对您有帮助，可扫描以下二维码捐助作者：
        </span>
          <!--          <img src="@/assets/qrcode.png" style="height: 150px">-->
          <qrcode value="https://qr.alipay.com/a6x03678v3npzomlyvtcif5" :options="qrcode_options"></qrcode>
          <span>
          在微信、微博、GitHub网站上关注、点赞亦是对作者的支持：
        </span>
          <ul class="contact_icons">
            <li><a href="#" target="_blank"><img src="@/assets/icons/weixin.png"></a></li>
            <li><a href="https://weibo.com/icyfenix" target="_blank"><img src="@/assets/icons/weibo.png"></a></li>
            <li><a href="https://github.com/fenixsoft" target="_blank"><img src="@/assets/icons/github.png"></a></li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" type="flex" justify="center">
        <hr>
        <span style="text-align: center">
          Copyright © 2020 网站备案信息：<a href="http://beian.miit.gov.cn">粤ICP备18088957号-1</a>
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode'

export default {
  name: 'Copyright',
  components: {
    [VueQrcode.name]: VueQrcode
  },
  data () {
    return {
      qrcode_options: {
        width: 150,
        margin: 1,
        color: {
          dark: '#eee',
          light: '#292A2D'
        }
      }
    }
  }
}
</script>

<style scoped>
  a {
    color: #fff;
    text-decoration: none;
  }

  h1 {
    font-size: 12px;
    font-weight: bold;
  }

  span {
    display: block;
    padding: 10px 0;
  }

  ul {
    padding-inline-start: 20px;
  }

  li {
    padding: 4px 0;
  }

  hr {
    height: 0;
    width: 90%;
    border: 1px solid #666;
    border-bottom: 0px;
  }

  .contact_icons {
    padding-inline-start: 0;
  }

  .contact_icons > li {
    display: inline-block;
    padding: 0 5px;
  }

  .contact_icons > li > a > img {
    width: 30px;
    height: 30px;
  }

  .el-row {
    padding: 20px;
    background-color: #292A2D;
    color: #fff;
    font-size: 12px;
  }

</style>
