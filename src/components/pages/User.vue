<template>
 <div>
  <h1 @click="cancel">注销</h1>
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
       cancel(){
        localStorage.removeItem("userInfo")
        this.$router.push({name:'Login'})  //进行跳转
       }
   }
 }
 
</script>

<style  scoped>

 
</style>
