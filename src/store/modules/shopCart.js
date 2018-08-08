const state = {
    cartList:[]
}
const getters = {
    num(state){
        return carList.length
    }
}
const actions = {
    setGoods({commit}, goods){
        debugger;
        commit("setGoodsToCartList", goods)
    },
    // 删除购物车商品 如果goodsId不存在 则为清空
    deleteGoods({commit}, goodsId){
        commit("deleteGoodsToCartList", goodsId)
    },
    getGoods({commit}){
        debugger
        commit("getGoodsToCartList")
    }
}
const mutations = {
    setGoodsToCartList(state, goods){
        debugger
        state.cartList.push(goods)
        localStorage.cart = JSON.stringify(state.cartList)
    },
    deleteGoodsToCartList(state, goodsId){
        debugger
        if(goodsId){
            state.cartList.push(goods)
        }else{
            localStorage.removeItem("cart")
            state.cartList = []
        }
       
    },
    getGoodsToCartList(state){
        debugger
        state.cartList = JSON.parse(localStorage.cart) || []
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }