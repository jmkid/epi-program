<template>
  <div>
    <van-nav-bar left-arrow @click-left="_routerBack" title="修改手机" fixed :z-index="10"></van-nav-bar>
    <div class="nav-con align-center login-con"
         :style="{'background-image':'url(static/img/login/login_back.png)'}">

      <div>
        <van-cell-group>
          <!--输入账号-->
          <span style="float:left;margin-top: 20px;margin-bottom:20px;margin-left: 5px">账号验证</span>
          <van-field v-model="phone" left-icon="static/img/login/login_user.png" required clearable label="手机号"
                     placeholder="请输入新的手机号" label-align="left" size="large" maxlength="11"></van-field>
          <!--填写验证码-->
          <van-field v-model="smsCode" clearable label="验证码" placeholder="请输入短信验证码" size="large"
                     left-icon="envelop-o" maxlength="6" required>
            <van-button slot="button" size="small" plain type="danger" class="send-btn" @click="onSMSSend"
                        v-bind:disabled="smssable"
            >
              {{getSendBtnText}}
            </van-button>
          </van-field>
          <van-field v-model="student_id" left-icon="static/img/login/login_user.png" required clearable label="学号"
                     placeholder="请输入你的学号" label-align="left" size="large" maxlength="11"></van-field>
        </van-cell-group>

        <!--账密登录按钮-->
        <div class="button-con">
          <van-button type="danger" plain round class="login-btn" @click="loginWay=3-loginWay">确认设置</van-button>
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
        smssable: false,
        student_id:'',
        phone: '',
        password: '',
        code:'',
        smsCode: '',
        showPassword: false, //是否显示明文
        loginWay: 1, //1: 账密，2：验证码
        smsCountDown: 0,
        smsCountInterval: null,
      };
    },
    computed: {
      isSendSMSEnable() {
        return this.smsCountDown <= 0 && this.student_id.length > 4;
      },
      getSendBtnText() {
        if (this.smsCountDown > 0) {
          return this.smsCountDown + '秒后发送';
        } else {
          return '发送验证码';
        }
      },
    },
    mounted() {
      this.student_id = this.getCookie('studentId')
    },
    beforeDestroy() {
      if (this.smsCountInterval) {
        clearInterval(this.smsCountInterval);
      }
    },
    methods: {
      onSMSSend() {
        this._showLoading();
        if (this.phone != '') {
          setTimeout(() => {
            this._dismissLoading();
            axios.post('api/sendRegisterCode', {}, {
              params: {
                "phone": this.phone
              }
            }).then((res) => {
              this.code = res.data
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
      onLoginClick() {
        this._showLoading();
        setTimeout(() => {
          this._dismissLoading();
          axios.post('/api/restPhone', {
            phone:this.phone,
            codeInput:this.smsCode,
            code:this.code,
            student_id: this.student_id,
          }).then((res) => {
            this.saveUserInfo();
            this._showConfirm('登陆成功, 去设置手势密码？', () => {
              this._routeReplace('GestureCreate');
            }, this._routerBack);
          }).catch((err) => {
          })


        }, 1000);
      },
      //保存用户信息
      saveUserInfo() {
        let info = {student_id: this.student_id};
        // 全局修改
        this.$store.commit('setUserInfo', info);
        // 持久化修改
        localStorage.setItem('userInfo', JSON.stringify(info));
      },
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
