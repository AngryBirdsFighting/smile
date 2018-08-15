<template>
 <div>
        <div class="navbar-div">
            <van-nav-bar title="个人中心"
             right-text="注销"
            @click-right="onClickRight"
             />
        </div>
        <div class="user">
          
        </div>
        <div class="manage">
          <ul>
            <li @click="toAddress">
              <van-icon name="location" />
              <span>我的地址</span>
              <van-icon name="arrow" />
            </li>
          </ul>
        </div>

 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   components: {

   },
   methods:{
       onClickRight(){
        localStorage.removeItem("userInfo")
        this.$router.push({name:'Login'})  //进行跳转
       },
       toAddress(){
         this.$router.push({name:"Address"})
       }
   }
 }
 
</script>

<style  scoped>
.user{
  width: 100%;
  height: 6rem;
  background: #e5017d;
 
}
.manage{
  width: 100%;
  padding-top: 5rem;

}
.manage li{
   background: white;
   height: 2rem;
   line-height: 2rem;
   border-top: 1px solid darkgray;
   border-bottom: 1px solid darkgray;
   font-size: 1rem
}
.manage li i{
  
}
</style>
