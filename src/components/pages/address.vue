<template>
 <div>
    <div class="navbar-div">
        <van-nav-bar
            title="我的地址"
            left-text="返回"
            right-text="添加"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
        />
    </div>
    <div v-if="listShow">
        列表数据
    </div>
        <div v-if="addShow" class="address">
       <van-address-edit
  :show-postal = false
  show-delete
  show-set-default
  show-search-result
  :search-result="searchResult"
  @save="onSave"
  @delete="onDelete"
  @change-detail="onChangeDetail"
/>
    </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         listShow:false,
         addShow:true
     }
   },
   components: {

   },
   methods: {
       onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight(){
      this.listShow = false
       this.addShow = true
    }
   }
 }
</script>

<style scoped>

 
</style>
