// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import "vant/lib/index.css"
import store from "./store/store"
// import Mint from 'mint-ui';//移动端UI
// Vue.use(Mint);
Vue.use(Vant);
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})

//路由守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiredLogin)) { //判断路由是否需要登录权限
    if (sessionStorage.getItem("userinfo")) {//判断当前用户的登录信息loginInfo是否存在
      next();
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next();
  }
})