<template>
 <div>
<div class="navbar-div">
   <van-nav-bar   title="购物车" /> 
</div>
 <!--清空购物车-->
<div class="card-title">
    <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
</div>
<!--显示购物车中的商品-->
<div class="cart-list">
    <div class="pang-row" v-for="(item,index) in cartList" :key="index">
        <div class="pang-img"><img :src="item.image" width="100%" /></div>
        <div class="pang-text">
            <div class="pang-goods-name">{{item.Name}}</div>
            
                <div class="pang-control">
                <van-stepper v-model="item.count" />
            </div>
        </div>
        <div class="pang-goods-price">￥{{item.price}}</div>
    </div>
</div>
 
 </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
 export default {
   data () {
     return {

     }
   },
   computed :{
     // 获取本次存储购物车信息
      ...mapState({
          cartList: state => state.shopCart.cartList
        })
   },
   components: {

   },
   methods:{
     ...mapActions('shopCart', ['deleteGoods']),
      //清空购物车的商品
      clearCart(){
          this.deleteGoods()
      }
   },
   created(){
     debugger
     console.log(this.cartList)
   }
  
 }
</script>

<style scoped>
.card-title{
    height: 2rem;
    line-height:2rem;
    background-color: #fff;
    border-bottom:1px solid #E4E7ED;
    padding:5px;
    text-align: right;
}
 
 
</style>
