<template>
    <div v-if="!userinfo.username">
        {{ userinfo.name }}
        <div class="no-register"> <span>您还未登录易拍卖系统</span> </div>
        <div><router-link to="/login"> <van-button class="register-btn" type="danger">去登录</van-button></router-link>
        </div>
    </div>
</template>

<script>import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState(['userinfo'])
    },
    components: {
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
</style>