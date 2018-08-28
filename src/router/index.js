import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import Cookies from 'js-cookie';
import ShoppingMall from "@/components/pages/ShoppingMall"
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'
import Main from '@/components/pages/Main'
import User from '@/components/pages/User'
import Address from '@/components/pages/address'
import NotFoundComponent from '@/components/pages/404'


Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {path: '/',redirect:to => {
      let paths = "";
      if(!Cookies.get('userInfo')){      
        paths =  '/login';
      }else{
        paths = '/main/User';
      }
      return paths;
    }},
    {path: '/main',name: 'Main',component: Main,
      children:[
        {path: 'ShoppingMall',name: 'ShoppingMall',component: ShoppingMall},
        {path: 'CategoryList',name: 'CategoryList',component: CategoryList},
        {path: 'Cart',name: 'Cart',component: Cart},
        {path: 'User',name: 'User',component: User}
      ]
    },  
    {path: '/register',name: 'Register',component: Register},
    {path: '/login',name: 'Login',component: Login},
    {path: '/Goods',name: 'Goods',component: Goods},
    {path: '/Address',name: 'Address',component: Address},
    { path: '*', component: NotFoundComponent }
  ]
})
