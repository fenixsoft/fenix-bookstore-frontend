<template>
  <el-carousel :interval="5000" type="card" height="400px">
    <el-carousel-item v-for="item in advertisements" :key="item.id">
      <el-image :src="item.image" class="image" @click="loadDetail(item.productId)"/>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import api from '@/api'

export default {
  name: 'Carousel',
  data () {
    return {
      advertisements: []
    }
  },
  async created () {
    this.advertisements = (await api.warehouse.getAdvertisements()).data
  },
  methods: {
    loadDetail (productId) {
      this.$router.push(`/detail/${productId}`)
    }
  }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .image {
    border: 1px solid #ddd;
    border-radius: 15px;
  }
</style>
