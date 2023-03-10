/* 
 ajax请求函数模块
 返回值：promise对象（异步返回的数据时：response.data）
*/

import axios from "axios";
import store from "../store/store";
export default function ajax(url, data = {}, type = 'GET', islogin = false) {
    return new Promise(function (resolve, reject) {
        let promise
        if (type === 'GET') {
            // 准备 url query 参数数据
            let dataStr = '' //数据拼接字符串
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&'
            })
            if (dataStr !== '') {
                dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
                url = url + '?' + dataStr
            }
            // 发送 get 请求
            promise = axios.get(url, {
                headers: {
                    "Authorization": sessionStorage.getItem("token")
                }
            })
        } else {
            //发送post请求
            promise = axios.post(url, data, {
                headers: {
                    "Authorization": sessionStorage.getItem("token")
                }
            })
        }
        promise.then(respone => {
            if (islogin) { //如果是登录，存储用户信息
                store.commit('setUserinfo', respone.data.data); //指定方法名称提交
                store.commit('setToken', respone.headers['authorization'])
            }
            resolve(respone.data)//成功
        }).catch(error => {
            reject(error)//失败
        })
    })
}