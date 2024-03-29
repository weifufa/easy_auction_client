import ajax from "./ajax";
const BASE_URL = '/api'


//会员模块
const MEMBER = '/member'


//1.用户名密码登录
export const reqPwdLogin = ({ username, password, uuid, captcha }) => ajax(`${BASE_URL + MEMBER}/login`, { username, password, uuid, captcha }, 'POST', true)
//2.查询手机号是否已经注册
export const reqIsExitPhone = (phone) => ajax(`${BASE_URL + MEMBER}/isexitphone`, { phone })
//3.发送短信验证码
export const reqSendCode = (phone) => ajax(`${BASE_URL + MEMBER}/sms/sendcode`, { phone })
//4.短信登录
export const reqSmsLogin = (phone, code) => ajax(`${BASE_URL + MEMBER}/smslogin`, { phone, code }, 'POST', true)
//5.用户注册
export const reqRegister = (data) => ajax(`${BASE_URL + MEMBER}/register`, data, 'POST', true)
// [10、用户登出]
export const reqLogout = () => ajax(`${BASE_URL + MEMBER}/logout`)

// [11、获取图片验证码]
export const reqAptcha = (uuid) => ajax(`${BASE_URL + MEMBER}/captcha.jpg`, { uuid })

//商品模块============================================================================================
//商品模块
const PRODUCT = '/product'

//获取拍品信息
export const getAuctionNotStart = () => ajax(`${BASE_URL + PRODUCT}/auction/getAuctionNotStart`, {}, 'get')

//获取拍品详情
export const getAuctionDetail = (auctionId) => ajax(`${BASE_URL + PRODUCT}/auction/info`, { auctionId })

//提交竞拍
export const submitAuction = (data) => ajax(`${BASE_URL + PRODUCT}/auction/submitAuction`, data, 'POST')

//获取竞拍最高价
export const getMaxPrice = (auctionId) => ajax(`${BASE_URL + PRODUCT}/auction/getMaxPrice`, { auctionId })

//获取用于已经竞拍的拍品价格
export const getAlreadyBid = (auctionId) => ajax(`${BASE_URL + PRODUCT}/auction/getAlreadyBid`, { auctionId })

//获取订单信息
export const getOrderMessage = () => ajax(`${BASE_URL + PRODUCT}/auction/getOrderMessage`)


