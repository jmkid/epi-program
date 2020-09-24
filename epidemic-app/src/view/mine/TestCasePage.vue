<template>
  <div>
    <van-nav-bar left-arrow @click-left="_routerBack" :title="$t('test_case')" fixed :z-index="10"></van-nav-bar>
    <div class="nav-con-16">
      <van-cell-group>
        <van-cell title="网络请求GET" size="large" @click="onHttpGetClick" is-link></van-cell>
        <van-cell title="网络请求POST" size="large" @click="onHttpPostClick" is-link></van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
  import {Dialog} from 'vant';

  export default {
    name: "test-case-page",
    methods: {
      // 测试Post请求
      onHttpPostClick() {
        this._showLoading();
        this.$http.post(this.$urls.HTTP_BIN_POST).then(res => {
          this._dismissLoading();
          console.log(res.data);
          Dialog({message: res.data.origin}).then();
        }).catch(err => {
          this._dismissLoading();
          this._showToast(err.message);
        });
      },
      // 测试Get请求
      onHttpGetClick() {
        this._showLoading();
        this.$http.get(this.$urls.HTTP_BIN_GET).then(res => {
          this._dismissLoading();
          console.log(res.data);
          Dialog({message: res.data.origin}).then();
        }).catch(err => {
          this._dismissLoading();
          this._showToast(err.message);
        });
      },
    },
  }
</script>

<style scoped>

</style>
