import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from "@/components/pages/ShoppingMall"
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'
import Main from '@/components/pages/Main'
import User from '@/components/pages/User'
import Address from '@/components/pages/address'


Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',redirect:to => {
      let paths = "";
      if(!localStorage.userInfo){
        debugger
        paths =  '/login';
      }else{
        paths = '/main';
      }
      return paths;
    }},
    {path: '/main',name: 'Main',component: Main,
      children:[
        {path: '/',name: 'ShoppingMall',component: ShoppingMall},
        {path: '/CategoryList',name: 'CategoryList',component: CategoryList},
        {path: '/Cart',name: 'Cart',component: Cart},
        {path: '/User',name: 'User',component: User}
      ]
    },  
    {path: '/register',name: 'Register',component: Register},
    {path: '/login',name: 'Login',component: Login},
    {path: '/Goods',name: 'Goods',component: Goods},
    {path: '/Address',name: 'Address',component: Address}
  ]
})
