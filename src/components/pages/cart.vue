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
                <van-stepper @plus = "editCount(item.goodsId, 1)" @minus = "editCount(item.goodsId, 0)" v-model="item.count" />
            </div>
        </div>
<div class="pang-goods-price">
    <div>
            ￥{{item.price |moneyFilter}}
    </div>
    <div>
        x{{item.count}}
    </div>
    <div class="allPrice">
        ￥{{item.price*item.count | moneyFilter}}
    </div>
 
</div>
 
    </div>
</div>
<!--显示总金额-->
<div class="totalMoney">
 
    商品总价：￥ {{allMoney | moneyFilter}}
 
</div>
 
 </div>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex'
import { toMoney } from "@/filter/filter.js";
 export default {
   data () {
     return {

     }
   },
   computed :{
     // 获取本次存储购物车信息
      ...mapState({
          cartList: state => state.shopCart.cartList
        }),
      ...mapGetters('shopCart', ['allMoney'])
   },
   components: {

   },
    filters: {
        moneyFilter(money) {
            return toMoney(money);
        }
    },
   methods:{
     ...mapActions('shopCart', ['deleteGoods','getGoods', "addOrMinusGoods"]),
      //清空购物车的商品
      clearCart(){
          this.deleteGoods()
      },
      editCount(goodsId, add){
          let a = {
              goodsId: goodsId,
              add: add
          }
          this.addOrMinusGoods(a)
      }
     
   },
   created(){
    this.cartList.length || this.getGoods()
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
.cart-list{
    background-color: #fff;
}
.pang-row{
    display: flex;
    flex-direction: row;
    flex-wrap:nowrap;
    padding:0.5rem;
    font-size:0.85rem;
    border-bottom:1px solid #E4E7ED;
 
 
}
.pang-img{
    flex:6;
}
.pang-text{
    flex:14;
    padding-left:10px;
}
.pang-control{
    padding-top: 10px;
}
.pang-goods-price{
    flex:4;
    text-align: right;
}
.totalMoney{
    text-align: right;
    background-color: #fff;
     border-bottom:1px solid #E4E7ED;
     padding: 5px;
}
 
</style>
