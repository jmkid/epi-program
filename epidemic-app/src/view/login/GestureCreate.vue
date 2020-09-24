<template>
  <div>
    <van-nav-bar left-arrow @click-left="_routerBack" title="设置手势密码" fixed :z-index="10"></van-nav-bar>
    <div class="align-center navbar-con-16">
      <!--上方小框-->
      <div class="top-small-con">
        <div class="top-small">
          <div v-for="i in 9" :key="i" class="top-dot" :class="{'high-dot':isHighlight(i)}"></div>
        </div>
      </div>
      <!--提示语-->
      <div class="info-tip" :class="{'error-tips': isTipsError}">{{infoTips}}</div>
      <!--密码输入-->
      <gesture-lock @input="onLockInput" ref="inputLock" class="main-lock">
      </gesture-lock>
      <div class="reinput-entry" @click="onResetInput" v-if="lastInput.length">
        重新设置手势密码
      </div>
    </div>
  </div>
</template>

<script>
  import GestureLock from "../common/GestureLock";

  export default {
    components: {GestureLock},
    name: "gesture-create",
    data() {
      return {
        isTipsError: false,
        infoTips: '',
        lastInput: [],
      };
    },
    computed: {
      isHighlight() {
        return (idx) => {
          if (this.lastInput) {
            for (let ii in this.lastInput) {
              if (this.lastInput[ii] == idx - 1) {
                return true;
              }
            }
          }
        }
      }
    },
    mounted() {
      this.showMessage('请输入手势密码')
    },
    methods: {
      onResetInput() {
        this.lastInput = [];
        this.showMessage('请输入手势密码')
      },
      requestSetGesturePwd(pwd) {
        this._showLoading();
        // 持久化修改
        localStorage.setItem('gesturePassword', pwd);
        setTimeout(() => {
          this._dismissLoading();
          this._showToast('手势密码设置成功！');
          this._routeReplace('home');
        }, 1000);
      },
      checkPwdAndUpdate(code) {
        let lastPwd = this.lastInput.join('');
        let pwd = code.join('');
        if (pwd && pwd == lastPwd) {
          this.showMessage('请输入手势密码')
          this.$refs.inputLock.clear();
          this.requestSetGesturePwd(pwd);
        } else {
          this.showLockError('两次输入不一致，请重新输入');
        }
      },
      onLockInput(res) {
        if (res.length < 4) {
          this.showLockError('至少需要连接四个点');
          return
        }
        // 第二次输入
        if (this.lastInput.length) {
          this.checkPwdAndUpdate(res)
        } else {
          this.lastInput = res;
          this.showMessage('请再重复一遍');
          this.$refs.inputLock.clear();
        }
      },
      showMessage(msg) {
        this.isTipsError = false;
        this.infoTips = msg;
      },
      showLockError(msg) {
        this.isTipsError = true;
        this.infoTips = msg;
        this.$refs.inputLock.showError()
      }
    }
  }
</script>

<style scoped lang="less">
  .reinput-entry {
    color: @blue;
    margin-top: 40px;
    text-decoration: underline;
  }

  .top-small-con {
    display: flex;
    justify-content: center;
    .top-small {
      width: 42px;
      display: flex;
      flex-wrap: wrap;
      .top-dot {
        margin: 2px;
        width: 10px;
        height: 10px;
        background-color: #aaaaaa;
        border-radius: 20px;
        display: block;
      }
      .high-dot {
        background-color: @blue;
      }
    }
  }

  .info-tip {
    margin-top: 20px;
    font-size: 14px;
  }

  .error-tips {
    color: red;
  }

  .main-lock {
    margin: 20px 0;
  }
</style>
