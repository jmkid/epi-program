<template>
  <div>
    <div class="head-item">
      <van-icon name="arrow-left" size="29px" color="white" @click="goBack()"/>
      <span>课堂通行证</span>
      <br/>
    </div>
    <div class="main">
      <div class="title">我的通行码</div>
      <hr size="3px" color="black" width="80%"/>
      <div class="time">
        <span>今日日期：{{curDate}}</span>
        <br/>
        <span>最近更新：{{curDate}}</span>
      </div>
      <div class="code">
        <img src="/static/img/通行.png" alt="">
        <div class="code-txt">凭此图可进入教学楼，请主动出示配合检查，并做好自身防护工作，健康学习，齐心抗疫</div>
      </div>
    </div>
    <div style="text-align:center;margin-top:350px">
      <div>服务热线：<span style="font-weight:bold">800-820-8820</span></div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        curDate: ''
      }
    },
    mounted() {
      let date = new Date()
      this.curDate = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDay()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
    }
  };
</script>
<style scoped lang="scss">
  .head-item {
    background: url("https://s1.ax1x.com/2020/07/13/UYO9HJ.jpg") no-repeat;
    background-size: 100% 100%;
    height: 150px;
    width: 100%;
    text-align: center;
    position: relative;

    .van-icon {
      position: absolute;
      top: 50px;
      left: 20px;
      z-index: 999;
    }

    span {
      color: white;
      font-size: 20px;
      position: absolute;
      top: 50px;
      right: 0;
      left: 0;
    }
  }

  .main {
    background-color: white;
    width: 266px;
    height: 340px;
    z-index: 9999;
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 20px;
    padding: 10px;
    padding-top: 40px;
    /*text-align: center;*/

    .title {
      text-align: center;
      font-size: 25px;
      font-weight: bold;
      margin-bottom: 30px;
    }

    .time {
      text-align: left;
      margin: auto;
      font-size: 13px;

      span {
        margin-left: 20px;
      }
    }
  }

  .code {
    text-align: center;
    margin-top: 20px;

    img {
      width: 150px;
      height: 150px;
    }

    .code-txt {
      font-size: 10px;
      text-align: left;
      width: 200px;
      margin: auto;
      margin-top: 5px;
      background-color: #e5e5e591;
      color: rgb(128, 108, 108);
    }
  }

  .v-btn {
    text-align: center;
    margin: auto;
    margin-top: 50px;
    width: 200px;
    background-color: #00a0ea;
    font-size: 20px;
  }
</style>
