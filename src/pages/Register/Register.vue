
<template>
  <section class="registerContainer">
    <div class="registerInner">
      <div class="register_header">
        <h2 class="register_logo">会员注册</h2>
      </div>
      <div class="register_content">
        <van-form @submit="onRegister" :model="registerForm">
          <!-- <van-field v-model="registerForm.username" name="用户名" label="用户名" placeholder="用户名" />
          <van-field v-model="registerForm.email" name="邮箱" label="邮箱" placeholder="邮箱" />
          <van-field v-model="registerForm.password" type="password" name="密码" label="密码" placeholder="密码" />
          <van-field v-model="repassword" type="password" name="确认密码" label="确认密码" placeholder="确认密码" /> -->
          <van-field v-model="registerForm.username" name="用户名" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }, {
            validator: value => {
              return /\d{3}/.test(value);
            }, message: '用户名长度大于3位'
          }]" />
          <van-field v-model="registerForm.email" name="邮箱" label="邮箱" placeholder="邮箱" :rules="[{ required: true, message: '请填写正确的邮箱' }, {
            validator: value => {
              return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
            }, message: '请填写正确的邮箱'
          }]" />
          <van-field v-model="registerForm.password" type="password" name="密码" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }, {
            validator: value => {
              return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
            }, message: '至少8个字符，，至少有1个小写字母和1个数字,不能包含特殊字符（非数字字母）'
          }]" />
          <van-field v-model="repassword" type="password" name="确认密码" label="确认密码" placeholder="确认密码" :rules="[{ required: true, message: '请填写确认密码' }, {
            validator: value => {
              return registerForm.password === value;
            }, message: '两次密码输入不一致'
          }]" />
          <div class="van-cell van-field">
            <div class="van-cell__title van-field__label"><span>手机号</span></div>
            <div class="van-cell__value van-field__value">
              <div class="van-field__body register_message"> <input type="tel" class="register_phone" maxlength="11"
                  placeholder="手机号" v-model="registerForm.phone">
                <button :disabled="!rightPhone" class="get_verification" :class="{ right_phone: rightPhone }"
                  @click.prevent="getCode">{{ computeTime > 0 ? `已发送(${computeTime}s)` : '获取验证码' }}</button>
              </div>
            </div>
          </div>
          <van-field v-model="registerForm.code" name="验证码" label="验证码" placeholder="验证码" :rules="[{ required: true, message: '请填写确认密码' }, {
            validator: value => {
              return /^[0-9]{6}$/.test(value);
            }, message: '请输入6位数字验证码'
          }]" />
          <!-- <van-field v-model="registerForm.code" name="验证码" label="验证码" placeholder="验证码" /> -->
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit" class="register">注册</van-button>
          </div>
        </van-form>
      </div>
    </div>
  </section>
</template>
<script>
import { Dialog } from 'vant';
import { reqSendCode, reqIsExitPhone, reqRegister } from '../../api'
export default {
  data() {
    return {
      registerForm: {
        username: '', //确认
        password: '',//密码
        email: '', //邮箱
        code: '', //验证码
        phone: '', //手机号
      },
      repassword: '',//确认密码
      computeTime: 0,//计时时间
      intervalId: 0,//设置间隔
    };
  },
  methods: {
    async onRegister(values) {
      let result;
      if (/0?(13|14|15|18)[0-9]{9}/.test(this.registerForm.phone)) {
        result = await reqRegister(this.registerForm)
        console.log(result.getCode)
        if (result.code == 0) {
          this.$router.replace('/profile')
        } else {
          this.showAlert(result.msg);
        }
      } else {
        this.showAlert("请输入手机号码!");
      }
    },
    //异步获取短信验证码
    async getCode() {
      // //先去查询号码是否已注册
      const result = await reqIsExitPhone(this.registerForm.phone);
      console.log(result)
      if (result.code == 15004) { //如果手机号码不存在，可以获取验证码，进行注册
        //如果当前没有即是
        if (!this.computeTime) {
          //倒计时
          this.computeTime = 30
          this.intervalId = setInterval(() => {
            this.computeTime--
            if (this.computeTime <= 0) {
              //停止记时
              clearInterval(this.intervalId)
            }
          }, 1000)
          //发送ajax请求
          this.result = await reqSendCode(this.registerForm.phone)
          if (this.result.code != 0) {
            //显示提示
            this.showAlert(this.result.msg)
            //停止倒计时
            if (this.computeTime) {
              this.computeTime = 0
              clearInterval(this.intervalId)
              this.intervalId = undefined
            }
          }
        }
      } else {
        this.showAlert('当前手机号已存在，请直接进行登录!')
      }
    },
    showAlert(alertText) {
      // this.alertShow = true
      // this.alertText = alertText
      Dialog.alert({
        message: alertText,
        theme: 'round-button',
      })
    },

  }, computed: {
    rightPhone() {
      return /0?(13|14|15|18)[0-9]{9}/.test(this.registerForm.phone);
    }
  }
}
</script>
<style scoped>
.registerContainer {
  width: 100%;
  height: 100%;
  background: #fff;
}

.registerContainer .registerInner {
  padding-top: 60px;
  width: 80%;
  margin: 0 auto;
}

.registerContainer .registerInner {
  padding-top: 60px;
  width: 90%;
  margin: 0 auto;
}

.registerContainer .registerInner .register_header {
  padding-bottom: 40px;
}

.registerContainer .registerInner .register_header .register_logo {
  font-size: 30px;
  font-weight: bold;
  color: #EE1111;
  text-align: center;
}

.registerContainer .registerInner .register {
  background: #EE1111;
  border: #EE1111;
}

.register_content .register_message>input {
  display: block;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: 0;
  color: #323233;
  line-height: inherit;
  text-align: left;
  background-color: transparent;
  border: 0;
  resize: none;
}

.get_verification {
  position: absolute;
  top: 50%;
  right: 10px;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  border: 0;
  color: #ccc;
  font-size: 14px;
  background: transparent;
}

.get_verification.right_phone {
  color: #000;
}
</style> 