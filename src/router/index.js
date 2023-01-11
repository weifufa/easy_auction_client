import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home/Home.vue"
//import Cart from "../pages/Cart/Cart.vue"
import Category from "../pages/Category/Category.vue"
import Profile from "../pages/Profile/Profile.vue"
//声明使用路由
Vue.use(VueRouter)
export default new VueRouter({
    //所有路由
    routes: [
        {
            path: '/home',
            component: Home
        }, {
            path: '/category',
            component: Category
        }
        , {
            path: '/profile',
            component: Profile
        }, {
            path: '/',
            redirect: '/home'
        }
    ]
})