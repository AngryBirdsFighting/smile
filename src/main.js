// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vant/lib/vant-css/icon-local.css';
// import Vant from 'vant'
// import 'vant/lib/vant-css/index.css'
// Vue.use(Vant) // 全局引入  不提倡
// import vueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
import {Button, Row, Col,AddressEdit, Swipe, SwipeItem,Icon, Stepper, Tabbar, TabbarItem ,PullRefresh, Lazyload, List, Field , Tab,Tabs, Toast, NavBar} from 'vant' // 按需引入
import '@/assets/icon/iconfont.css'
import instance from './util/http.js'
import store from './store'
Vue.prototype.$axios = instance;
Vue.use(Button).use(Row).use(Col).use(Swipe).use(PullRefresh)
.use(Tab).use(Tabs).use(SwipeItem).use(Lazyload).use(Icon).use(AddressEdit)
.use(List).use(NavBar).use(Field).use(Toast).use(Stepper).use(Tabbar).use(TabbarItem) //.use(vueAwesomeSwiper)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
	console.log(from, '路由---->', to);
  if(localStorage.cart){
    store.dispatch('shopCart/getGoods')
  }
  next();
})
	

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
