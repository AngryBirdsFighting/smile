// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import Vant from 'vant'
// import 'vant/lib/vant-css/index.css'
// Vue.use(Vant) // 全局引入  不提倡
// import vueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'

import {Button, Row, Col, Swipe, SwipeItem, Lazyload, List, Field, NavBar , Toast} from 'vant' // 按需引入
import '@/assets/icon/iconfont.css'
import instance from './util/http.js'


Vue.prototype.$axios = instance;
Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(NavBar).use(Field).use(Toast) //.use(vueAwesomeSwiper)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
