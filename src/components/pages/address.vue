<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar title="我的地址" left-text="返回"  left-arrow @click-left="onClickLeft" />
        </div>
        <div v-if="listShow">
            <van-address-list v-model="chosenAddressId" :list="list" @add="onAdd" @edit="onEdit" />
        </div>
        <div v-if="addShow" class="address">
            <van-address-edit :area-list="areaList" :address-info='editData' :show-postal=false :show-delete="isAdd" show-set-default show-search-result @delete="onDelete" @save="onSave" />
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
            list: [],
            addressData:[],
            editData:{},
            isAdd:false
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
            if(this.addShow){
                this.listShow = true;
                this.addShow = false;
            }else{
                this.$router.go(-1);
            }
           
        },
        getAddressList() {
            this.$axios
                .post("address/getList", {
                    ID: this.userInfo._id,
                })
                .then(response => {
                    if (response.status == 200) {
                        if (response.data.success) {
                             this.list = []
                             this.addressData = []
                             this.addressData =  response.data.data
                             response.data.data.forEach((item, index) => {
                                let a = {
                                    id:item._id,
                                    name:item.name,
                                    tel:item.tel,
                                    address: item.province + item.city + item.county + item.address_detail
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
        onEdit(item,index){
            this.editData = this.addressData[index]
            this.isAdd = true;
            this.listShow = false;
            this.addShow = true;
        },
        onAdd(){
             this.editData = {}
            this.listShow = false;
            this.addShow = true;
            this.isAdd = false;
        },
        onSave(content) {
            if(!this.isAdd){
                this.addHandler(content)
            }else{
                this.editHandler(content)
            }
            
        },
        onDelete(){
             this.$axios
                .post("address/remove", {
                   _id: this.editData._id,
                })
                .then(response => {
                    if (response.status == 200) {
                        if (response.data.success) {
                            this.listShow = true;
                            this.addShow = false;
                            this.getAddressList()
                            this.$toast.success("删除成功");
                        } else {
                            this.$toast.fail(response.data.message);
                        }
                    } else {
                        this.$toast.fail("删除失败");
                    }
                })
                .catch(error => {
                    this.$toast.fail("删除失败" + error);
                });
        },
        addHandler(content){
            this.$axios
                .post("address/add", {
                    userId: this.userInfo._id,
                    is_default: content.is_default,
                    area_code: content.area_code,
                    province: content.province,
                    county: content.county,
                    city: content.city,
                    tel: content.tel,
                    name: content.name,
                    address_detail: content.address_detail
                })
                .then(response => {
                    if (response.status == 200) {
                        if (response.data.success) {
                            this.listShow = true;
                            this.addShow = false;
                            this.getAddressList()
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
        },
         editHandler(content){
            this.$axios
                .post("address/edit", {
                    _id: this.editData._id,
                    userId: this.userInfo._id,
                    is_default: content.is_default,
                    area_code: content.area_code,
                    province: content.province,
                    county: content.county,
                    city: content.city,
                    tel: content.tel,
                    name: content.name,
                    address_detail: content.address_detail
                })
                .then(response => {
                    if (response.status == 200) {
                        if (response.data.success) {
                            this.listShow = true;
                            this.addShow = false;
                            this.getAddressList()
                            this.$toast.success("修改成功");
                        } else {
                            this.$toast.fail(response.data.message);
                        }
                    } else {
                        this.$toast.fail("修改失败");
                    }
                })
                .catch(error => {
                    this.$toast.fail("修改失败" + error);
                });
        }
    }
};
</script>

<style scoped>
</style>
