/* 
 ajax请求函数模块
 返回值：promise对象（异步返回的数据时：response.data）
*/
import axios from "axios";
export default function ajax(url, data = {}, type = 'GET') {
    return new Promise(function (resolve, reject) {
        let promise
        if (type === 'GET') {
            //准备url query参数
            let dataStr = ''//数据拼接字符串
            Object.keys(data).forEach(key => {
                dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
                url = url + "?" + dataStr
            })
            promise.axios.get(url)
        } else {
            //发送post请求
            promise = axios.post(url, data)
        }
        promise.then(respone => {
            resolve(resolve.data)//成功
        }).catch(error => {
            reject(error)//失败
        })
    })
}