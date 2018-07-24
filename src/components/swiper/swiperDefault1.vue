<!--  -->
<template>
  <div class=''>
      <swiper :options="swiperOption">
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
        swiperOption:{ // swiper 配置参数
            pagination:{
                el:".swiper-pagination" // 小圆点
            }
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
.swiper-slide{
    height: 4rem;
    text-align: center;
    padding-top:3rem;
    border-bottom: 1px solid #ccc; 
}
</style>