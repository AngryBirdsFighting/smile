<!--  -->
<template>
  <div class=''>
    <div class="search-bar">
      <van-row>
        <van-col class="icon-s-place" span="3"></van-col>
        <van-col span="16">
          <input class="search-input" type="text">
        </van-col>
        <van-col span="5">
          <van-button size="mini"> 查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- 轮播组件 -->
    <div class="swipe" v-if="list.slides">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in list.slides" :key="index">
         <img width="100%" v-lazy="image.image" />
       </van-swipe-item>
      </van-swipe>
    </div>
    <!-- type bar -->
    <div class="type-bar" v-if="list.category">
        <div v-for="(cate, index) in list.category" :key="index">
          <img v-lazy="cate.image" alt="" width="90%">
          <span>{{cate.mallCategoryName}}</span>
        </div>
    </div>
    <!-- add -->
    <div v-if="list.advertesPicture">
      <img width="100%" v-lazy="list.advertesPicture.PICTURE_ADDRESS" alt="">
    </div>
    <!-- goods -->
    <div class="recommend" v-if="list.recommend">
      <div class="recommend-title">
         商品推荐
      </div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in list.recommend" :key="index">
            <div class="recommend-item">
              <img v-lazy="item.image" width="80%" alt="">
              <div>{{item.goodsName}}</div>
              <div>${{item.price}}(${{item.mallPrice}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
<!--floor one area-->
<div class="floor">
    <div class="floor-anomaly">
        <div class="floor-one"><img :src="floor1_0.image" width="100%" /></div>
        <div>
            <div class="floor-two"><img :src="floor1_1.image" width="100%" /></div>
            <div><img :src="floor1_2.image" width="100%" /></div>
        </div>
    </div>
    <div class="floor-rule">
    <div v-for="(item ,index) in floor1.slice(3)" :key="index">
        <img :src="item.image" width="100%"/>
    </div>
</div>
</div>

 
        <!-- <swiper-default1></swiper-default1>
    <swiper-default></swiper-default> -->

  </div>
</template>

<script>
import Axios from "axios"
import {swiper, swiperSlide} from 'vue-awesome-swiper' // 轮播组件 局部引入
import 'swiper/dist/css/swiper.css'
// import swiperDefault from "../swiper/swiperDefault.vue"
// import swiperDefault1 from "../swiper/swiperDefault1.vue"
export default {
  data () {
    return {
       list: [],
       swiperOption:{
         slidesPerView: 3
       },
       floor1:{},
       floor1_0:{},
       floor1_1:{},
       floor1_2:{},
    };
  },

  components: {
    swiper,swiperSlide
    // ,swiperDefault,swiperDefault1
  },

  computed: {},

  methods: {},

  created(){
    Axios({
      url:'https://www.easy-mock.com/mock/5b573c0e9a5ff532038078dd/smile/getList',
      method:'get',     
    })
    .then( res => {
      if(res.status == 200){
          this.list = res.data.data;
          this.floor1 = res.data.data.floor1              //楼层1数据
          this.floor1_0 =this.floor1[0]
          this.floor1_1 =this.floor1[1]
          this.floor1_2 =this.floor1[2]
      }     
    })
    .catch( err => {
      alert(err)
    })
  }
}

</script>
<style scoped>
.search-bar{
  text-align: center;
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
}
.icon-s-place{
  color: white;
  font-size: 1.6rem;
}
.search-input{
    width: 100%;
    height: 1.3rem;
    border:0px;
    border-bottom: 1px solid #fff!important;
    background: #e5017d;
    color: white;
}
.swipe{
  max-height: 10rem;
  overflow: hidden;
}
.type-bar{
  background: #fff;
  margin: 0 .3rem .3rem .3rem;
  border-radius: .3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div{
  padding: .3rem;
  font-size: 12px;
  text-align: center;
}
.recommend{
  background: #fff;
  margin-top: .3rem;
}
.recommend-title{
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: .2rem;
  color: pink;
}
.recommend-body{
  border-bottom: 1px solid #eee;
}
.recommend-item{
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
.floor-anomaly{
      display: flex;
      flex-direction:row;
      background-color: #fff;
      border-bottom:1px solid #ddd;
  }
  .floor-anomaly div{
     width:10rem;
     box-sizing: border-box;
     -webkit-box-sizing: border-box;
  }
  .floor-one{
      border-right:1px solid #ddd;
  }
  .floor-two{
      border-bottom:1px solid #ddd;
  }
 .floor-rule{
      display: flex;
      flex-direction: row;
      flex-wrap:wrap;
      background-color: #fff;
 
  }
  .floor-rule div{
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width:10rem;
      border-bottom:1px solid #ddd;
  }
  .floor-rule div:nth-child(odd){
      border-right:1px solid #ddd;
  }
</style>