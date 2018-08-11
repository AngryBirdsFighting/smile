<template>
<div>
    <div class="navbar-div">
        <van-nav-bar
            title="商品详情"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
    </div>
<div class="topimage-div">
    <img :src="goodsInfo.IMAGE1" width="100%"/>
</div>
<div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">价格：${{goodsInfo.PRESENT_PRICE | moneyFilter}}</div>
    <div>
        <van-tabs swipeable  stickys> <!-- 滑动切换 和吸顶效果  -->
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL">            
          </div>
        </van-tab>
        <van-tab title="评价">
            正在制作中
        </van-tab>
        </van-tabs>
    </div>
<div class="goods-bottom">
    
    <div>
       <van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
    </div>
    <div>
       <van-button size="large" type="danger">直接购买</van-button>
    </div>
    
</div>
</div>
</template>
 
<script>
import { toMoney } from "@/filter/filter.js";
import {mapActions, mapState, mapGetters} from 'vuex'
export default {
  data() {
    return {
      goodsId: "",
      goodsInfo: {} //商品详细数据
    };
  },
  computed:{
    ...mapState({
        cartList: state => state.shopCart.cartList
    })
  },
  created() {
    this.goodsId= this.$route.query.goodsId ? this.$route.query.goodsId:this.$route.params.goodsId
    this.getInfo();
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  methods: {
    ...mapActions('shopCart', ['setGoods', 'getGoods']),
    onClickLeft() {
      this.$router.go(-1);
    },

    getInfo() {
      let vm = this;
      vm.$axios
        .post("goods/goodsInfo", {
          goodsId: vm.goodsId
        })
        .then(response => {
          if (response.status == 200) {
            if (response.data.success) {
              vm.goodsInfo = response.data.data;
            } else {
              vm.$toast.fail(response.data.message);
            }
          } else {
            vm.$toast.fail("获取详细失败");
          }
        })
        .catch(error => {
          vm.$toast.fail("获取详细失败" + error);
        });
    },
    addGoodsToCart(){
        let isHave = this.cartList.find( cart => cart.goodsId == this.goodsId)
        if(isHave){
             this.$toast.fail("该商品已存在");
        }else{
            let newGoods = {
              goodsId : this.goodsId,
              Name:this.goodsInfo.NAME,
              price:this.goodsInfo.PRESENT_PRICE,
              image:this.goodsInfo.IMAGE1,
              count:1
            }
            this.setGoods(newGoods)
        }
       this.$router.push({name:'Cart'})  //进行跳转
    }
  }
};
</script>
 
<style scoped>
.detail {
  font-size: 0px;
}
.goods-name {
  background-color: #fff;
}
.goods-price {
  background-color: #fff;
}
.goods-bottom {
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: #fff;
  width: 100%;

  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
}
.goods-bottom > div {
  flex: 1;
  padding: 5px;
}
</style>
 