<template>
  <div>
    <div class="head">
      <van-icon name="arrow-left" size="2em" color="white" @click="goBack"/>
    </div>
    <div class="main">
      <div class="title">我的健康码</div>
      <hr size="3px" color="black" width="80%">
      <div class="time">
        <span>打卡日期：2020-7-13 14:00:34</span><br>
        <span>最后更新：2020-7-13 14:00:34</span>
      </div>
      <div class="code">
        <div id="qrcode" ref="qrcode"></div>
      </div>
      <div style="margin: 16px;">
        <van-button class="v-btn" round block type="info" native-type="submit">
          打卡
        </van-button>
      </div>
    </div>

  </div>
</template>
<script>
  import QRCode from 'qrcodejs2'

  export default {
    mounted() {
      this.qrCode()
    },
    methods: {
        qrCode (url) {
          let qrcode = new QRCode('qrcode', {
            width: 132,
            height: 132,
            text: 'https://www.baidu.com', // 二维码地址
            colorDark : "#000",
            colorLight : "#fff",
          })
        },
      goBack() {
        this.$router.go(-1);
      }
    }

  }
</script>
<style scoped lang="scss">
  .head {
    width: 100%;
    height: 250px;
    background-color: #0076F2;
    position: relative;

    .van-icon {
      position: absolute;
      top: 30px;
      left: 10px;
      z-index: 999;
    }
  }

  .main {
    background-color: white;
    width: 266px;
    height: 300px;
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

    #qrcode {
      width: 160px;
      height: 160px;
      margin-left: 65px;
    }
  }

  .v-btn {
    text-align: center;
    margin: auto;
    margin-top: 50px;
    width: 200px;
    background-color: #00A0EA;
    font-size: 20px;
  }
</style>
