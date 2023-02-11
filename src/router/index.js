import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home/Home.vue"
//import Cart from "../pages/Cart/Cart.vue"
import Category from "../pages/Category/Category.vue"
import Profile from "../pages/Profile/Profile.vue"
import Login from "../pages/Login/Login.vue"
import Register from "../pages/Register/Register.vue"
//声明使用路由
Vue.use(VueRouter)
export default new VueRouter({
    //所有路由
    routes: [
        {
            path: '/home',
            component: Home,
            meta: {
                showFooter: true
            }
        }, {
            path: '/category',
            component: Category,
            meta: {
                showFooter: true
            }
        }
        , {
            path: '/profile',
            component: Profile,
            meta: {
                showFooter: true,
                requiredLogin: true
            }
        }, {
            path: '*',
            redirect: '/home'
        }, {
            path: '/login',
            component: Login
        }, {
            path: '/register',
            component: Register
        },
    ],
    mode: 'history'
})
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject)
        return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch((err) => err);
};