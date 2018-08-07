<template>
    <div class="goods-info"  @click="goGoodsPage()">
        <div class="goods-image">
            <img v-lazy="goodsImage" width="90%" />
        </div>
        <div class="goods-name">{{goodsName}}</div>
        <div class="goods-price">￥{{goodsPrice | moneyFilter }}</div>
    </div>
</template>
 
<script>
import { toMoney } from "@/filter/filter.js";
export default {
    data() {
        return {};
    },
    props: ["goodsImage", "goodsName", "goodsPrice", 'goodsId'],
    filters: {
        moneyFilter(money) {
            return toMoney(money);
        }
    },
    methods:{
        goGoodsPage() {
            // query传参，用的是path，而不是name,否则也会出错。
                this.$router.push({name:'Goods',query:{goodsId:this.goodsId}})
            }
    }
};
</script>
 
<style scoped>
.goods-name {
    padding: 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>