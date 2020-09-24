import {Toast, Dialog} from 'vant';
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState(['userInfo']),
  },

  methods: {
    _showAlert(msg, confirm) {
      Dialog.alert({
        message: msg,
      }).then(confirm)
    },

    _showConfirm(msg, confirm, cancel) {
      Dialog.confirm({
        message: msg
      }).then(confirm)
        .catch(cancel);
    },

    _isLogin() {
      return (this.userInfo != null && this.userInfo.userName);
    },

    _loginOr(func) {
      if (this._isLogin()) {
        if (func) {
          func();
        }
      } else {
        this._routeLogin();
      }
    },

    /**
     * 统一跳转
     */
    _routeLogin() {
      this._routePush('LoginPage');
    },

    _routeReplace(toName, params) {
      this.$router.replace({
        name: toName,
        params: params,
      });
    },

    _routePush(toName, params) {
      this.$router.push({
        name: toName,
        params: params,
      });
    },

    /**
     * 路由跳转带有query参数
     */
    _routePushQ(toName, params) {
      this.$router.push({
        name: toName,
        query: params,
      });
    },

    /**
     * 显示Toast
     */
    _showToast(msg) {
      Toast(msg);
    },

    /**
     * 显示打钩消息
     */
    _showSuccess(msg) {
      Toast.success(msg);
    },

    /**
     * 路由回退或者历史回退
     */
    _routerBack() {
      this.$router ? this.$router.back() : window.history.back();
    },

    /**
     * 显示Loading
     */
    _showLoading() {
      Toast.loading({
        mask: true,
        duration: 0,
        loadingType: 'spinner',
        message: 'Loading...'
      });
    },

    /**
     * 不显示Loading
     */
    _dismissLoading() {
      Toast.clear();
    },

    // 将base64文件转换为二进制
    _dataURLtoBlob(dataUrl) {
      let arr = dataUrl.split(',');
      let mime = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type: mime});
    },
  }
}
