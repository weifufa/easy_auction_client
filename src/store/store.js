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
        userinfo: {},
        token: ''

    },
    // getters: {
    //     getuserinfo() {
    //         return this.userinfo
    //     }
    // },
    mutations: {
        setUserinfo(state, userinfo) {  //出发mutatil
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
    }
    , actions: {
        // setUserInfo(userinfo) {
        //     this.userinfo = userinfo
        //     if (userinfo == null) {
        //         sessionStorage.removeItem("userinfo")
        //     }
        //     sessionStorage.setItem("userinfo", JSON.stringify(userinfo))
        // },
    }
})