 
<template>
    <div>
        <van-nav-bar title="用户登录" />

        <div class="register-panel">
            <van-field v-model="username" label="用户名" icon="clear" placeholder="请输入用户名" required @click-icon="username = ''" :error-message="usernameErrorMsg" />

            <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" :error-message="passwordErrorMsg" required />
            <div class="register-button">
                <van-button type="primary" @click="LoginAction" :loading="openLoading" size="large">登录</van-button>
            </div>
            <a href="" @click.prevent="Register">去注册</a>
        </div>

    </div>
</template>
 
<script>
import { Toast } from "vant";
import { mapActions } from "vuex";
export default {
    data() {
        return {
            username: "",
            password: "",
            openLoading: false, //是否开启用户的Loading
            usernameErrorMsg: "", //当用户名出现错误的时候
            passwordErrorMsg: "" //当密码出现错误的时候
        };
    },
    created() {
        if (localStorage.userInfo) {
            this.$router.push("/");
        }
    },
    methods: {
        ...mapActions("user", ["setUser"]),
        goBack() {
            this.$router.go(-1);
        },

        //*****注册用户的实行方法*****
        LoginAction() {
            this.checkForm() && this.axiosLoginUser();
        },

        //*******axios注册用户方法*******
        axiosLoginUser() {
            //先把按钮进行loading状态，防止重复提交
            let vm = this;
            this.openLoading = true;
            vm.$axios
                .post("user/login", {
                    userName: vm.username,
                    password: vm.password
                })
                .then(response => {
                    if (response.status == 200) {                   
                        if (response.data.success) {
                            this.setUser(response.data.data.user)
                            localStorage.setItem('DON_BLOG_TOKEN', response.data.data.token);
                            Toast.success("登录成功");
                            vm.$router.push("/");
                        } else {
                            vm.$toast.fail(response.data.message);
                            vm.openLoading = false;
                        }
                    } else {
                        vm.$toast.fail("登录失败");
                        vm.openLoading = false;
                    }
                })
                .catch(error => {
                    vm.$toast.fail("登录失败" + error);
                    vm.openLoading = false;
                });
        },
        //**** 客户端验证
        checkForm() {
            let isOk = true;
            if (this.username.length < 5) {
                this.usernameErrorMsg = "用户名不能小于5位";
                isOk = false;
            } else {
                this.usernameErrorMsg = "";
            }
            if (this.password.length < 6) {
                this.passwordErrorMsg = "密码不能少于6位";
                isOk = false;
            } else {
                this.passwordErrorMsg = "";
            }
            return isOk;
        },
        Register() {
            this.$router.push({ name: "Register" });
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
a {
    font-size: 0.5rem;
}
</style>