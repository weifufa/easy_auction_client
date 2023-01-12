import ajax from "./ajax";
const BASE_URL = '/api'
//会员模块
const MEMBER = '/member'
//1.用户名密码登录
export const reqPwdLogin = ({ username, password, captcha }) => ajax(`${BASE_URL + MEMBER}/login`, { username, password, captcha }, 'POST')
//2.查询手机号是否已经注册
export const reqIsExitPhone = (phone) => ajax(`${BASE_URL + MEMBER}/isexitphone`, { phone })
//3.发送短信验证码
export const reqSendCode = (phone) => ajax(`${BASE_URL + MEMBER}/sendcode`, { phone })