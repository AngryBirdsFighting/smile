<template>
    <div>
        <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack" />

        <div class="register-panel">
            <van-field v-model="username" label="用户名" icon="clear" placeholder="请输入用户名" required @click-icon="username = ''" @blur="validateUsername" :error-message="usernameError" />

            <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" :error-message="passwordError" required />
            <div class="register-button">
                <van-button type="primary" :loading="openLoading" @click="registerAction" size="large">马上注册</van-button>
            </div>
        </div>
    </div>
</template>
 
<script>
export default {
    data() {
        return {
            username: "",
            password: "",
            usernameError: "",
            passwordError: "",
            openLoading: false //是否开启用户的Loading 防止 重复提交
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        registerAction() {
           this.checkForm() && this.registerUser()
        },
        validateUsername(){
        if(this.username.length > 5){
             this.$axios
                .post("user/validate", {
                    userName: this.username,
                })
                .then(response => {
                    if (response.status == 200) {
                        if (response.data.success) {
                            this.usernameError = "";
                        } else {
                            this.usernameError = response.data.message;
                        }
                    } else {
                        this.$toast.fail("验证接口错误");
                    }
                })
                .catch(error => {
                    this.$toast.fail("验证接口错误" + error);
                });
        }
       
        },
        checkForm() {
            let isOk = true;
            if (this.username.length < 5) {
                this.usernameError = "用户名不能小于5位";
                isOk = false;
            } else {
                this.usernameError = "";
            }
            if (this.password.length < 6) {
                this.passwordError = "密码不能少于6位";
                isOk = false;
            } else {
                this.passwordError = "";
            }
            return isOk;
        },
        registerUser() {
            let vm = this;
            this.openLoading = true;
            vm.$axios
                .post("user/register", {
                    userName: vm.username,
                    password: vm.password
                })
                .then(response => {
                    if (response.status == 200) {
                        if (response.data.success) {
                            vm.$toast.success(response.data.message);
                            vm.$router.push({ path: '/login' })
                            vm.openLoading = false;
                        } else {
                            vm.$toast.fail(response.data.message);
                            vm.openLoading = false;
                        }
                    } else {
                        vm.$toast.fail("注册失败");
                        vm.openLoading = false;
                    }
                })
                .catch(error => {
                    vm.$toast.fail("注册失败" + error);
                    vm.openLoading = false;
                });
        }
    }
};
</script>
 
<style scoped>
.register-panel {
    width: 96%;
    border-radius: 5px;
    margin: 20px auto;
    padding-bottom: 50px;
}
.register-button {
    padding-top: 10px;
}
</style>