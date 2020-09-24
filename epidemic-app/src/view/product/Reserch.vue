<template>
  <div>
    <!--头部导航，搜索之类的东西-->
    <div class="head-item">
      <van-icon name="arrow-left" size="2em" color="white" @click="goBack"/>
      <van-search background="#cc33ff" v-model="value" shape="round" placeholder="请输入搜索关键词"/>
    </div>
    <div class="ser-history">
      <span>历史记录</span>
      <van-icon name="delete"/>
      <van-divider :style="{ borderColor: 'gray', padding: '0 16px'}"></van-divider>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: ''
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      }
    }
  };
</script>
<style lang='less' scoped>
  .head-item {
    width: 100%;
    background-color: #cc33ff;
    height: 55px;
    display: flex;
    margin-bottom: 10px;

    .van-icon {
      margin-top: 10px;
      margin-left: 10px;
    }

    .van-search {
      width: 85%;
    }
  }

  .ser-history {
    span {
      margin: 20px;
      margin-bottom: 0;
    }

    .van-icon {
      float: right;
      margin-right: 8%;
    }

    .van-divider {
      margin: 5px;
    }
  }
</style>
