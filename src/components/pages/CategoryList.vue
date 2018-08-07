
<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别列表" />
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li v-for="(item,index) in category" @click="clickCategory(index,item)" :key="index" :class="{categoryActive:categoryIndex==index}">
                {{item.MALL_CATEGORY_NAME}}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active" @click="onClickCategorySub">
              <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME" >
              </van-tab>
            </van-tabs>
          </div>
          <div id="list-div">
             <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list
                  v-model="loading"
                  :finished="finished"
                  @load="onLoad"
                  >
                  <div class="list-item" v-for="(item, index) in list" :key="index" @click="goGoodsInfo(item.ID)">
                     <div class="list-item-img"><img :src="item.IMAGE1" width="100%" :onerror="errorImg"/></div>
                      <div class="list-item-text">
                          <div>{{item.NAME}}</div>
                          <div class="">￥{{item.ORI_PRICE | moneyFilter}}</div>
                      </div>
                  </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
 
<script>
import { toMoney } from "@/filter/filter.js";
export default {
    data() {
        return {
            category: [], //商品大类
            categoryIndex: 0,
            categorySub: [], // 商品小类
            list:[],
            active:0,
            page:1,
            categorySubId:'',
            loading:false,   //上拉加载使用
            finished:false,  //下拉加载是否没有数据了
            isRefresh:false, //下拉加载
            errorImg:'this.src="' + require('@/assets/error.png') + '"'   ,  //错误图片显示路径
        };
    },
    created() {
        this.getCategory();      
    },
    filters: {
        moneyFilter(money) {
            return toMoney(money);
        }
    },
    mounted() {
        let winHeight = document.documentElement.clientHeight;
        document.getElementById("leftNav").style.height = winHeight - 46 + "px"; 
        document.getElementById('list-div').style.height=winHeight-90 +'px'     
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        // 点击大类切换小类
        clickCategory(index, item) {
            this.categoryIndex=index
            this.page=1
            this.finished = false
            this.list=[]
            this.getCategorySubById(item.ID);
        },
        // 下拉刷新方法
        onRefresh(){
            setTimeout(() => {         
                  this.isRefresh = false;
                  this.finished = false;
                  this.list=[];
                  this.page=1
                  this.onLoad()
            }, 500);
        },
       //上拉加载方法
        onLoad(){
            setTimeout(()=>{
                this.categorySubId=this.categorySubId?this.categorySubId:this.categorySub[0].ID
                this.getGoodsListById()
            },1000)
        },
        // 跳转详情
        goGoodsInfo(id){
          // params传参，路径不能使用path，只能使用name，不然取不到传的数据。
            this.$router.push({name:'Goods',params:{goodsId:id}})
        },
        // 获取商品大类 成功后默认获取第一个大类对应的小类
        getCategory() {
            let vm = this;
            vm.$axios
                .post("goods/getCategoryList", {})
                .then(response => {
                    if (response.status == 200) {
                        if (response.data.success) {
                            vm.category = response.data.data;
                            vm.getCategorySubById(this.category[0].ID);
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
        // 根据大类ID 获取小类
        getCategorySubById(categoryId) {         
            let vm = this;
            vm.$axios
                .post("goods/getCategorySubList", {
                    categoryId: categoryId
                })
                .then(response => {
                    if (response.status == 200) {
                        if (response.data.success) {
                            vm.categorySub = response.data.data;
                            vm.active=0
                            vm.categorySubId = vm.categorySub[0].ID
                            vm.onLoad()
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
        // 点击小类切换商品列表
        onClickCategorySub(index, title){
            this.categorySubId= this.categorySub[index].ID   
            this.list=[]
            this.finished = false
            this.page=1
            this.onLoad()
        },
        // 根据小类ID获取商品列表
        getGoodsListById() {
            let vm = this;
            vm.$axios
                .post("goods/getGoodsListByCategorySubId", {
                    categorySubId: vm.categorySubId,
                    page: vm.page
                })
                .then(response => {
                    if (response.status == 200) {
                        if (response.data.success && response.data.data.length > 0) {
                          console.log(response.data.data)
                            vm.list = vm.list.concat(response.data.data)
                            vm.page++                          
                        } else {
                            vm.finished = true
                        }                            
                    } else {
                        vm.$toast.fail("获取详细失败");
                    }
                    vm.loading = false;
                })
                .catch(error => {
                    vm.$toast.fail("获取详细失败" + error);
                });
        }
    }
};
</script>
 
<style scoped>
    #leftNav{
        background-color: aliceblue;
    }
    #leftNav ul li {
        line-height: 2rem;
        border-bottom: 1px solid #E4E7ED;
        padding:3px;
        font-size:0.8rem;
        text-align: center;
    }
    .categoryActice{
        background-color: #fff;
    }
    .list-item{
        display: flex;
        flex-direction: row;
        font-size:0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding:5px;
    }
    #list-div{
        overflow: scroll;
    }
    .list-item-img{
        flex:8;
    }
    .categoryActive{
    background-color: #fff;
}
    .list-item-text{
        flex:16;
        margin-top:10px;
        margin-left:10px;
    }
</style>