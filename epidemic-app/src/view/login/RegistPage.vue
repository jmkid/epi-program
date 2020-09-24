<template>
  <div>
    <van-nav-bar left-arrow @click-left="_routerBack" title="注册" fixed :z-index="10"></van-nav-bar>
    <div class="nav-con align-center login-con"
         :style="{'background-image':'url(static/img/login/login_back.png)'}">
      <div class="top-area">
        <div style="color: cornflowerblue;font-size: 30px">欢迎使用校疫通</div>
        <van-image src="static/img/login/vant_logo.png" class="top-logo"></van-image>
      </div>
      <!--用户名密码登录-->
      <div v-if="loginWay==1">
        <van-cell-group>
          <!--输入账号-->
          <van-field v-model="userName" left-icon="static/img/login/login_user.png" required clearable label="学号"
                     placeholder="请输入学号" label-align="left" size="large" maxlength="20"></van-field>
          <!--输入密码-->
          <van-field v-model="passWord" left-icon="static/img/login/login_pass.png" label="密　码"
                     placeholder="请输入密码" size="large" required clearable
                     :type="showPassword?'text':'password'" maxlength="20"
                     :right-icon="'static/img/login/eye_'+(showPassword?'open':'close')+'.png'"
                     @click-right-icon="showPassword=!showPassword"></van-field>
          <van-field v-model="phone" left-icon="static/img/login/login_user.png" required clearable label="手机号"
                     placeholder="请输入手机号" label-align="left" size="large" maxlength="11"></van-field>
          <!--填写验证码-->
          <van-field v-model="smsCode" clearable label="验证码" placeholder="请输入短信验证码" size="large"
                     left-icon="envelop-o" maxlength="6" required>
            <van-button slot="button" size="small" plain type="danger" class="send-btn" @click="onSMSSend" v-bind:disabled="smssable"
            >
              {{getSendBtnText}}
            </van-button>
          </van-field>
        </van-cell-group>
        <div class="text-item">
          <div class="regist"><router-link :to="{name:'LoginPage'}">已有账号？去登录</router-link></div>
        </div>
        <!--账密登录按钮-->
        <div class="button-con">
          <van-button type="danger" round class="login-btn" @click="onRegisterClick">立即注册
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "login-page",
    data() {
      return {
        smssable:false,
        userName: '',
        passWord: '',
        phone:'',
        smsCode: '',
        showPassword: false, //是否显示明文
        loginWay: 1, //1: 账密，2：验证码
        smsCountDown: 0,
        smsCountInterval: null,
      };
    },
    computed: {
      isSendSMSEnable() {
        return this.smsCountDown <= 0 && this.userName.length > 4;
      },
      getSendBtnText() {
        if (this.smsCountDown > 0) {
          return this.smsCountDown + '秒后发送';
        } else {
          return '发送验证码';
        }
      },
    },
    beforeDestroy() {
      if (this.smsCountInterval) {
        clearInterval(this.smsCountInterval);
      }
    },
    methods: {
      onSMSSend() {
        this._showLoading();
        if (this.phone!=''){
          setTimeout(() => {
            this._dismissLoading();
            axios.post('api/sendRegisterCode', {}, {
              params: {
                "phone": this.phone
              }
            }).then((res) => {
              this._showToast('已发送');
              this.smssable = true
              this.smsCountDown = 60;
              this.startSMSTimer();
            }).catch((err) => {
            })
          }, 300);
        } else {
          this._dismissLoading();
          this._showConfirm('请输入正确的手机号')
        }
      },
      startSMSTimer() {
        this.smsCountInterval = setInterval(() => {
          this.smsCountDown--;
          if (this.smsCountDown <= 0) {
            clearInterval(this.smsCountInterval);
            this.smssable = false
          }
        }, 1000);
      },
      onSMSLogin() {
        this.onLoginClick();
      },
      onRegisterClick() {
        this._showLoading();
        setTimeout(() => {
          this._dismissLoading();
          axios.post('/api/register', {
            student_id: this.username,
            password: this.password,
            phone:this.phone
          }).then((res) => {
            this.saveUserInfo();
            this._showConfirm('注册成功, 去设置手势密码？', () => {
              this._routeReplace('GestureCreate');
            }, this._routerBack);
          }).catch((err) => {
          })
        }, 1000);
      }
    },

  }
</script>

<style scoped>
  .send-btn {
    height: 26px;
    line-height: 24px;
  }

  .button-con {
    margin-top: 36px;
  }

  .top-area {
    margin: 30px 0;
  }

  .login-con {
    background-size: 100% 100%;
    height: calc(100vh - 46px);
  }

  .login-btn {
    width: 60%;
    margin: 12px;
    background-color: #1887FA;
    color: white;
  }

  .top-logo {
    width: 100px;
    margin: 16px 0;
  }

  .text-item {
    margin-top: 10px;
    font-size: 13px;
    color: grey;
  }

  .forget {
    float: left;
    margin-left: 40px;
    text-decoration: underline;
  }

  .regist {
    float: right;
    margin-right: 40px;
    text-decoration: underline;
  }
</style>
