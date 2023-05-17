import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    // state: () => {
    //     return {
    //         userinfo: JSON.parse(sessionStorage.getItem("userinfo")),
    //     }
    // },
    state: {
        userinfo: JSON.parse(sessionStorage.getItem("userinfo")),
        token: sessionStorage.getItem("token"),
        

    },
    // getters: {
    //     getuserinfo() {
    //         return this.userinfo
    //     }
    // },
    mutations: {
        setUserinfo(state, userinfo) {  //出发1mutatil
            if (userinfo == null) {
                sessionStorage.removeItem("userinfo")
            }
            sessionStorage.setItem("userinfo", JSON.stringify(userinfo))
            state.userinfo = userinfo //赋值
        },
        setToken(state, token) {
            state.token = token
            if (token == null) {
                sessionStorage.removeItem("token")
            }
            sessionStorage.setItem("token", token)
        },
        clear(state) { //退出登录
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("userinfo")
            state.userinfo = {}
            state.token = '';
        }
    }
    , actions: {
        // //异步登出
        // async logout({ commit }) {
        //     const result = await reqLogout()
        //     if (result.code == 0) {
        //         commit(RESET_USER_INFO)
        //     }
        // },
        // setUserInfo(userinfo) {
        //     this.userinfo = userinfo
        //     if (userinfo == null) {
        //         sessionStorage.removeItem("userinfo")
        //     }
        //     sessionStorage.setItem("userinfo", JSON.stringify(userinfo))
        // },
    }
})