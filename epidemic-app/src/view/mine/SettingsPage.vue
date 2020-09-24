<template>
  <div>
    <van-nav-bar left-arrow @click-left="_routerBack" :title="$t('settings')" fixed :z-index="10"></van-nav-bar>
    <!--内容区-->
    <div class="nav-con-16">
      <van-cell-group>
        <van-cell :title="$t('version')" icon="info-o" :value="versionName" size="large" @click="onVersionClick">
        </van-cell>
        <van-cell :title="$t('language')" icon="flag-o" :value="$t(langOptions[currentLang])" size="large"
                  @click="onLangClick" is-link>
        </van-cell>
        <van-cell title="手势密码设置" icon="eye-o" size="large" @click="_routePush('GestureCreate')" is-link>
        </van-cell>
        <van-cell title="修改手机" icon="flag-o" size="large" @click="_routePush('ChangePhone')" is-link>
        </van-cell>
        <van-cell title="修改密码" icon="flag-o" size="large" @click="_routePush('ChangePass')" is-link>
        </van-cell>
        <van-cell title="登出账户" icon="flag-o" size="large" @click="onLogout">
        </van-cell>
      </van-cell-group>
    </div>
    <!--语言弹窗-->
    <van-popup v-model="showLangPop" class="lang-pop">
      <van-radio-group v-model="currentLang" @change="onLangChange">
        <van-cell clickable @click="currentLang = 'en'">
          <van-radio name="en" @click="showLangPop=false">{{$t(langOptions.en)}}</van-radio>
        </van-cell>
        <van-cell clickable @click="currentLang = 'zh'">
          <van-radio name="zh" @click="showLangPop=false">{{$t(langOptions.zh)}}</van-radio>
        </van-cell>
      </van-radio-group>
    </van-popup>
  </div>
</template>

<script>
  import 'vant/lib/radio/index.less'
  import axios from 'axios'
  import instance from 'axios'
  /* 验证登陆 */

  export default {
    name: "settings-page",
    data() {
      return {
        versionName: 'V ' + pack.PACK_VERSION,
        currentLang: this.$i18n.locale,
        showLangPop: false,
        langOptions: {
          'en': 'english',
          'zh': 'chinese',
        },
        versionClickTime: 0,
      };
    },
    methods: {
      toChangePhone() {

      },
      toChangePw() {

      },
      onLangChange(val) {
        this.showLangPop = false;
        window.localStorage.setItem('language', val);
        this.$i18n.reload();
      },
      onLangClick() {
        this.showLangPop = true;
      },
      onVersionClick() {
        this._showToast(pack.PACK_DATE + ' ' + process.env.HOST_ENV);
        this.versionClickTime += 1;
        // 打开测试菜单
        if (this.versionClickTime == 4) {
          this._routePush('TestCasePage');
        }
      },
      onLogout() {
        this._showLoading();
        setTimeout(()=>{
          this._dismissLoading();
          axios.post('/api/logout', {}, {
            params: {
              token: this.getCookie('token')
            }
          }).then((res) => {
            this.$router.push('LoginPage')
            this.clearCookie('token')
            this.clearCookie('studentId')
          }).catch((err) => {

          })
        },1000)

      },
      getCookie(name) {
        let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
          return unescape(arr[2]);
        } else
          return null;
      },
    }
  }
</script>

<style scoped>
  .lang-pop {
    width: 80%;
    padding: 10px;
    border-radius: 8px;
  }
</style>
