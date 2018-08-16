<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar title="我的地址" left-text="返回" right-text="添加" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
        </div>
        <div v-if="listShow">
            <van-address-list v-model="chosenAddressId" :list="list" @add="onAdd" @edit="onEdit" />
        </div>
        <div v-if="addShow" class="address">
            <van-address-edit :area-list="areaList" :show-postal=f alse show-delete show-set-default show-search-result @save="onSave" />
        </div>
    </div>
</template>

<script>
import area from "@/components/pages/area.js";
import { mapState } from "vuex";
export default {
    data() {
        return {
            listShow: true,
            addShow: false,
            areaList: area,
            chosenAddressId: "1",
            list: []
        };
    },
    computed: {
        ...mapState("user", ["userInfo"])
    },
    created(){
       this.getAddressList()
    },
    components: {},
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        onClickRight() {
            this.listShow = false;
            this.addShow = true;
        },
        getAddressList() {
            this.$axios
                .post("address/getList", {
                    ID: this.userInfo._id,
                })
                .then(response => {
                    if (response.status == 200) {
                        if (response.data.success) {
                            response.data.data.forEach((item, index) => {
                                let a = {
                                    id:item._id,
                                    name:item.contacts,
                                    tel:item.phone,
                                    address: item.province + item.city + item.county + item.path
                                }
                                this.list.push(a)
                            });
                        } else {
                            this.$toast.fail(response.data.message);
                        }
                    } else {
                        this.$toast.fail("请求失败");
                    }
                })
                .catch(error => {
                    this.$toast.fail("请求失败" + error);
                });
        },
        onSave(content) {
            this.$axios
                .post("address/add", {
                    userId: this.userInfo._id,
                    default: content.is_default,
                    areaCode: content.address_detail,
                    province: content.province,
                    county: content.county,
                    city: content.city,
                    tel: content.tel,
                    contacts: content.name,
                    path: content.address_detail
                })
                .then(response => {
                    if (response.status == 200) {
                        if (response.data.success) {
                            this.$toast.success("保存成功");
                        } else {
                            this.$toast.fail(response.data.message);
                        }
                    } else {
                        this.$toast.fail("保存失败");
                    }
                })
                .catch(error => {
                    this.$toast.fail("保存失败" + error);
                });
        }
    }
};
</script>

<style scoped>
</style>
