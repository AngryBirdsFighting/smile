
<template>
    <div>
        <div class="navbar-div">
             <van-nav-bar   title="类别列表" /> 
        </div>
        <div>
    <van-row>
        <van-col span="6">
            <div id="leftNav">
                左侧导航
            </div>
        </van-col>
        <van-col span="18">右侧列表</van-col>
    </van-row>
</div>
    </div>
</template>
 
<script>
export default {
  data() {
    return {
      category: [] //商品大类
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
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getCategory() {
      let vm = this;
      vm.$axios
        .post("goods/getCategoryList", {
        })
        .then(response => {
          if (response.status == 200) {
            if (response.data.success) {
              vm.category = response.data.data;
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
    }
  }
};
</script>
 
<style scoped>
 
</style>