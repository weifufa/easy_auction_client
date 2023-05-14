<template>
    <div>
        <div v-if="!userinfo">
            <div class="no-register"> <span>您还未登录易拍卖系统</span> </div>
            <div><router-link to="/login"> <van-button class="register-btn" type="danger">去登录</van-button></router-link>
            </div>

        </div>
        <div v-if="userinfo != null">
            <section class="profile">
                <HeaderTop title="我的"></HeaderTop>
                <section class="profile-number">
                    <router-link :to="userinfo.username ? '/userInfo' : '/login'" class="profile-link">
                        <div class="profile_image">
                            <i class="iconfont icon-person"></i>
                        </div>
                        <div class="user-info">
                            <p class="user-info-top" v-if="!userinfo.phone">{{ userinfo.username || '登录/注册' }}</p>
                            <p>
                                <span class="user-icon">
                                    <i class="iconfont icon-shouji icon-mobile"></i>
                                </span>
                                <span class="icon-mobile-number">{{ userinfo.phone || '暂无绑定手机号' }}</span>
                            </p>
                        </div>
                        <span class="arrow">
                            <i class="iconfont icon-jiantou1"></i>
                        </span>
                    </router-link>

                </section>
                <section class="profile_info_data border-1px">
                    <ul class="info_data_list">
                        <a href="javascript:" class="info_data_link">
                            <span class="info_data_top"><span>0.00</span>元</span>
                            <span class="info_data_bottom">我的余额</span>
                        </a>
                        <a href="javascript:" class="info_data_link">
                            <span class="info_data_top"><span>0</span>个</span>
                            <span class="info_data_bottom">我的优惠</span>
                        </a>
                        <a href="javascript:" class="info_data_link">
                            <span class="info_data_top"><span>0</span>分</span>
                            <span class="info_data_bottom">我的积分</span>
                        </a>
                    </ul>
                </section>
                <section class="profile_my_order border-1px">
                    <!-- 我的订单 -->
                    <a href='javascript:' class="my_order">
                        <span>
                            <i class="iconfont icon-order-s"></i>
                        </span>
                        <div class="my_order_div">
                            <span>我的订单</span>
                            <span class="my_order_icon">
                                <i class="iconfont icon-jiantou1"></i>
                            </span>
                        </div>
                    </a>
                    <!-- 积分商城 -->
                    <a href='javascript:' class="my_order">
                        <span>
                            <i class="iconfont icon-jifen"></i>
                        </span>
                        <div class="my_order_div">
                            <span>积分商城</span>
                            <span class="my_order_icon">
                                <i class="iconfont icon-jiantou1"></i>
                            </span>
                        </div>
                    </a>
                    <!-- 会员卡 -->
                    <a href="javascript:" class="my_order">
                        <span>
                            <i class="iconfont icon-vip"></i>
                        </span>
                        <div class="my_order_div">
                            <span>会员卡</span>
                            <span class="my_order_icon">
                                <i class="iconfont icon-jiantou1"></i>
                            </span>
                        </div>
                    </a>
                </section>
                <section class="profile_my_order border-1px">
                    <!-- 服务中心 -->
                    <a href="javascript:" class="my_order">
                        <span>
                            <i class="iconfont icon-fuwu"></i>
                        </span>
                        <div class="my_order_div">
                            <span>服务中心</span>
                            <span class="my_order_icon">
                                <i class="iconfont icon-jiantou1"></i>
                            </span>
                        </div>
                    </a>
                </section>
                <section class="profile_my_order border-1px">
                    <van-button class="register-btn" @click="logout" style="width:90%;display:block;margin:0 auto"
                        v-if="userinfo.id" type="danger">退出登录</van-button>
                </section>
            </section>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { Dialog } from 'vant';
import { reqLogout } from '../../api'
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
export default {
    computed: {
        ...mapState(['userinfo'])
    },
    components: {
        HeaderTop
    },
    methods: {

        logout() {
            let result
            Dialog.confirm({
                title: '退出',
                message: '确认退出吗',
            })
                .then(() => {
                    // // on confirm
                    // this.axios.get("/member/logout", {
                    //     headers: {
                    //         "Authorization": sessionStorage.getItem("token")
                    //     }
                    // }).then(response => {
                    //     // this.$userStore.setUserInfo(null)
                    //     // this.$userStore.setToken(null)
                    //     // this.$message.success("退出成功")
                    //     // this.$router.push("/article")
                    // })
                    //退出登录
                    result = reqLogout();
                    this.$store.commit('clear'); //指定方法名称提交//清楚用户信息

                })
                .catch(() => {
                    // on cancel
                });
        }
    }
}
</script>


<style >
.no-register {
    margin-top: 200px;
}

.register-btn {
    width: 35%;
    height: 35px;
    margin-top: 20px;
}

.profile {
    width: 100%;
    overflow: hidden;
}

.profile .header {
    background-color: #EE1111;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 45px;
}

.profile .header .header_search {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 10%;
    height: 50%;
}

.profile .header .header_search .icon-sousuo {
    font-size: 25px;
    color: #fff;
}

.profile .header .header_title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    color: #fff;
    text-align: center;
}

.profile .header .header_title .header_title_text {
    font-size: 20px;
    color: #fff;
    display: block;
}

.profile .header .header_login {
    font-size: 14px;
    color: #fff;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
}

.profile .header .header_login .header_login_text {
    color: #fff;
}

.profile .msite_nav {
    margin-top: 45px;
    height: 200px;
    background: #fff;
}

.profile .msite_nav .swiper-container {
    width: 100%;
    height: 100%;
}

.profile .msite_nav .swiper-container .swiper-wrapper {
    width: 100%;
    height: 100%;
}

.profile .msite_nav .swiper-container .swiper-wrapper .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
}

.profile .msite_nav .swiper-container .swiper-wrapper .swiper-slide .link_to_food {
    width: 25%;
}

.profile .msite_nav .swiper-container .swiper-wrapper .swiper-slide .link_to_food .food_container {
    display: block;
    width: 100%;
    text-align: center;
    padding-bottom: 10px;
    font-size: 0;
}

.profile .msite_nav .swiper-container .swiper-wrapper .swiper-slide .link_to_food .food_container img {
    display: inline-block;
    width: 50px;
    height: 50px;
}

.profile .msite_nav .swiper-container .swiper-wrapper .swiper-slide .link_to_food span {
    display: block;
    width: 100%;
    text-align: center;
    font-size: 13px;
    color: #666;
}

.profile .msite_nav .swiper-container .swiper-pagination>span.swiper-pagination-bullet-active {
    background: #EE1111;
}

.profile .profile-number {
    margin-top: 45.5px;
}

.profile .profile-number .profile-link {
    position: relative;
    display: block;
    background: #EE1111;
    padding: 20px 10px;
}

.profile .profile-number .profile-link .profile_image {
    float: left;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    vertical-align: top;
}

.profile .profile-number .profile-link .profile_image .icon-person {
    background: #e4e4e4;
    font-size: 62px;
}

.profile .profile-number .profile-link .user-info {
    float: left;
    margin-top: -12px;
    margin-left: 15px;
}

.profile .profile-number .profile-link .user-info p {
    font-weight: 700;
    font-size: 18px;
    color: #fff;
}

.profile .profile-number .profile-link .user-info p.user-info-top {
    padding-bottom: 8px;
}

.profile .profile-number .profile-link .user-info p .user-icon {
    display: inline-block;
    margin-left: -15px;
    margin-right: 5px;
    width: 20px;
    height: 20px;
}

.profile .profile-number .profile-link .user-info p .user-icon .icon-mobile {
    font-size: 30px;
    vertical-align: text-top;
}

.profile .profile-number .profile-link .user-info p .icon-mobile-number {
    font-size: 14px;
    color: #fff;
}

.profile .profile-number .profile-link .arrow {
    width: 12px;
    height: 12px;
    position: absolute;
    right: 15px;
    top: 40%;
}

.profile .profile-number .profile-link .arrow .icon-jiantou1 {
    color: #fff;
    font-size: 5px;
}

.profile .profile_info_data {
    width: 100%;
    background: #fff;
    overflow: hidden;
}

.profile .profile_info_data .info_data_list .info_data_link {
    float: left;
    width: 33%;
    text-align: center;
    border-right: 1px solid #f1f1f1;
}

.profile .profile_info_data .info_data_list .info_data_link .info_data_top {
    display: block;
    width: 100%;
    font-size: 14px;
    color: #333;
    padding: 15px 5px 10px;
}

.profile .profile_info_data .info_data_list .info_data_link .info_data_top span {
    display: inline-block;
    font-size: 30px;
    color: #f90;
    font-weight: 700;
    line-height: 30px;
}

.profile .profile_info_data .info_data_list .info_data_link .info_data_bottom {
    display: inline-block;
    font-size: 14px;
    color: #666;
    font-weight: 400;
    padding-bottom: 10px;
}

.profile .profile_info_data .info_data_list .info_data_link:nth-of-type(2) .info_data_top span {
    color: #ff5f3e;
}

.profile .profile_info_data .info_data_list .info_data_link:nth-of-type(3) {
    border: 0;
}

.profile .profile_info_data .info_data_list .info_data_link:nth-of-type(3) .info_data_top span {
    color: #6ac20b;
}

.profile .profile_my_order {
    margin-top: 10px;
    background: #fff;
}

.profile .profile_my_order .my_order {
    display: flex;
    align-items: center;
    padding-left: 15px;
}

.profile .profile_my_order .my_order>span {
    display: flex;
    align-items: center;
    width: 20px;
    height: 20px;
}

.profile .profile_my_order .my_order>span>.iconfont {
    margin-left: -10px;
    font-size: 30px;
}

.profile .profile_my_order .my_order>span .icon-order-s {
    color: #EE1111;
}

.profile .profile_my_order .my_order>span .icon-jifen {
    color: #ff5f3e;
}

.profile .profile_my_order .my_order>span .icon-vip {
    color: #f90;
}

.profile .profile_my_order .my_order>span .icon-fuwu {
    color: #EE1111;
}

.profile .profile_my_order .my_order .my_order_div {
    width: 100%;
    border-bottom: 1px solid #f1f1f1;
    padding: 18px 10px 18px 0;
    font-size: 16px;
    color: #333;
    display: flex;
    justify-content: space-between;
}

.profile .profile_my_order .my_order .my_order_div span {
    display: block;
}

.profile .profile_my_order .my_order .my_order_div .my_order_icon {
    width: 10px;
    height: 10px;
}

.profile .profile_my_order .my_order .my_order_div .my_order_icon .icon-jiantou1 {
    color: #bbb;
    font-size: 10px;
}
</style>