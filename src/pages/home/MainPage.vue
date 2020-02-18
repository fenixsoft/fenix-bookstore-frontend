<template>
  <div>
    <Carousel/>
    <Cabinet/>
  </div>
</template>

<script>
import Carousel from '@/components/home/main/Carousel'
import Cabinet from '@/components/home/main/Cabinet'

export default {
  name: 'MainPage',
  components: {
    Carousel,
    Cabinet
  }
}
</script>

<style scoped>

</style>
