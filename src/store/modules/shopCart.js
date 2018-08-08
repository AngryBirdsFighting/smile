const state = {
    cartList:[]
}
const getters = {
    allMoney(state){
        debugger;
        let a = 0
        state.cartList.forEach(item => {
            a += (item.count * item.price)
        })
        return a
    }
}
const actions = {
    setGoods({commit}, goods){
        commit("setGoodsToCartList", goods)
    },
    addOrMinusGoods({commit}, {goodsId, add}){
        commit("addOrMinusCartList", {goodsId, add})
    },
    // 删除购物车商品 如果goodsId不存在 则为清空
    deleteGoods({commit}, goodsId){
        commit("deleteGoodsToCartList", goodsId)
    },
    getGoods({commit}){
        commit("getGoodsToCartList")
    }
}
const mutations = {
    setGoodsToCartList(state, goods){
        state.cartList.push(goods)
        localStorage.cart = JSON.stringify(state.cartList)
    },
    addOrMinusCartList(state,{goodsId, add}){
        let goods = state.cartList.find( cart => cart.goodsId == goodsId)
        add? goods.count++ :  goods.count--
        localStorage.cart = JSON.stringify(state.cartList)
    },
    deleteGoodsToCartList(state, goodsId){
        if(goodsId){
            state.cartList.push(goods)
        }else{
            localStorage.removeItem("cart")
            state.cartList = []
        }
       
    },
    getGoodsToCartList(state){
        Object.assign(state.cartList,JSON.parse(localStorage.cart))
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }