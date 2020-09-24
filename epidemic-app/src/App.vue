<template>
  <div id="app">
    <!--缓存的页面-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
      </router-view>
    </keep-alive>
    <!--不缓存的页面-->
    <router-view v-if="!$route.meta.keepAlive">
    </router-view>
  </div>
</template>

<script>
  import instance from 'axios'
  export function handleLogin (data) {
    return instance.post('@/view/login/LoginPage', data)
  }
  export default {
    name: "app",
    mounted() {
      this.loadUserInfo();
    },
    methods: {
      loadUserInfo() {
        try {
          // 读取用户信息
          let infoStr = localStorage.getItem('userInfo');
          if (infoStr) {
            let info = JSON.parse(infoStr);
            this.$store.commit('setUserInfo', info);
          }
        } catch (e) {
        }
      },
    },
  }
</script>


<style scoped lang="scss">
  #app {
    background-color: #f7f7f7;
    height: 100vh;
  }
</style>
