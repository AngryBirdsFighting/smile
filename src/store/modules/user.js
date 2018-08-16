import Vue from 'vue'
import Cookies from 'js-cookie';
const state = {
    routerPath:"",
    userInfo:{

    }
}
const getters = {
}
const actions = {
    setUser({commit}, user){
        commit("setUserM", user)
    },
    deleteUser({commit}){
        commit("deleteUserM")
    },
    getUser({commit}){
        commit("getUserM")
    }
}

const mutations = {
    setUserM(state, user){
        state.userInfo = user
        Cookies.set('userInfo', user, {expires: 14,path: ''});
    },
    deleteUserM(state){
        if(state.user){

        }  
    },
    getUserM(state){
        state.userInfo = JSON.parse(Cookies.get('userInfo'))
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }