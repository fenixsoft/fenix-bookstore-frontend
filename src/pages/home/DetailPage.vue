<template>
  <div id="information">
    <el-card class="box-card">
      <div slot="header" class="header">
        <span>{{book.title}}</span>
      </div>
      <el-row class="content">
        <el-col :span="6"><img id="cover" :src="book.image"></el-col>
        <el-col :span="6">
          <div style="padding-top: 30px">
            <span v-for="key in Object.keys(book.spec)" :key="key" class="spec">{{key}}：{{book.spec[key]}}</span>
            <span class="spec" style="display: inline-block;">豆瓣评分：</span>
            <el-rate :value="book.rate/2" disabled style="display: inline-block;"/>
            <span style="color:#ff9900; font-size: 14px">{{book.rate}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <el-divider direction="vertical" class="devider"></el-divider>
          <Checkstand :purchase="purchase" :product="book"></Checkstand>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card" style="margin-top: 20px">
      <div slot="header" class="header">
        <span>内容简介</span>
      </div>
      <div class="content description" v-html="book.description">
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 20px">
      <div slot="header" class="header">
        <span>详情介绍</span>
      </div>
      <img v-if="book.desc" :src="book.desc"/>
      <span v-else class="content">本书暂无详细介绍</span>
    </el-card>
  </div>
</template>

<script>
import api from '@/api'
import Checkstand from '@/components/home/detail/Checkstand'

export default {
  name: 'DetailPage',
  components: {
    Checkstand
  },
  props: {
    id: String
  },
  data () {
    return {
      purchase: {
        delivery: true,
        address: {province: '广东省', city: '广州市', area: '海珠区'}
      },
      book: {
        price: 0,
        amount: 1,
        spec: {}
      }
    }
  },
  async created () {
    Object.assign(this.book, (await api.warehouse.getUniqueProductById(this.id)).data)
  },
  methods: {
    placeOrder (purchase) {
      console.log(purchase)
    }
  }
}
</script>

<style scoped>
  .bg {
    width: 100%;
    background-color: #fff;
  }

  #cover {
    width: 250px;
    height: 250px;
    float: left;
    padding: 20px;
    display: inline-block;
  }

  .spec {
    display: block;
    font-size: 14px;
    line-height: 25px;
    color: #666;
  }

  .devider {
    display: inline-block;
    height: 345px;
    vertical-align: top;
  }

  .description {
    font-size: 14px;
    line-height: 24px;
    text-indent: 2em;
  }
</style>
