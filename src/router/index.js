import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home/Home.vue"
//import Cart from "../pages/Cart/Cart.vue"
import Category from "../pages/Category/Category.vue"
import Profile from "../pages/Profile/Profile.vue"
import Login from "../pages/Login/Login.vue"
//声明使用路由
Vue.use(VueRouter)
export default new VueRouter({
    //所有路由
    routes: [
        {
            path: '/home',
            component: Home,
            meta:{
                showFooter:true
            }
        }, {
            path: '/category',
            component: Category,
            meta:{
                showFooter:true
            }
        }
        , {
            path: '/profile',
            component: Profile,
            meta:{
                showFooter:true
            }
        }, {
            path: '*',
            redirect: '/home'
        }, {
            path: '/login',
            component: Login
        },
    ],
    mode: 'history'
})