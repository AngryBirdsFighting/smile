<!--  -->
<template>
  <div class=''>
      <swiper class="swiper" :options="swiperOption">
          <swiper-slide class="swiper-slide" v-for="(item, index) in slide" :key="index">
              Slide{{item}}
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
  </div>
</template>

<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper' // 轮播组件 局部引入
import 'swiper/dist/css/swiper.css'
export default {
    
  data () {
    return {
        slide:[1,2,3,4,5,6,7,8,9],
        swiperOption:{
            pagination:{
              el:".swiper-pagination"
            },
            direction:"vertical"
        }
    };
  },

  components: {
      swiper,
      swiperSlide
  },

  computed: {},

  methods: {}
}

</script>
<style scoped>
.swiper{
    height: 7rem;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
}
.swiper-slide{
    height: 4rem;
    text-align: center;
    line-height: 4rem
}
</style>