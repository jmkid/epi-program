exports.install = function (Vue, options) {
  Vue.prototype.getCookie = function (name) {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
      return unescape(arr[2]);
    } else
      return null;
  }
  Vue.prototype.clearCookie = function (name) {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "studentId=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.localStorage.clear()
  }
};
