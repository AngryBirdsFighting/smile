import Vue from 'vue';
import Vuex from 'vuex';
import shopCart from './modules/shopCart'
import user from './modules/user'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
    modules: {
        shopCart,
        user
    },
    strict: debug,
  })