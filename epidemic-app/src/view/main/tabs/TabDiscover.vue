<template>
  <div>
    <van-nav-bar :title="$t('tab_discovery')" fixed :z-index="10"></van-nav-bar>
    <div class="nav-con">
      <!--顶部图片-->
      <van-image src="static/img/discovery/discovery_banner.jpg" class="banner-img"></van-image>
      <!--中部内容-->
      <div style="padding: 10px">
        <div class="align-center commu-all"
             :style="{'background-image':'url(static/img/home/fresher_ticket_back.png)'}">
          <div class="commu-top">
            <div class="commu-left">好帖推荐</div>
            <div class="commu-right">2个活动奖励</div>
          </div>
          <div class="commu-mid">
            <div class="commu-title">外交部：台湾同胞可在中国驻外使领馆寻求保护协助</div>
            <div class="light-txt commu-txt">
              外交部领保中心常务副主任杨舒介绍了“26条措施”的第14条，台湾同胞可在中国驻外使领馆寻求领事保护与协助的途径...
            </div>
          </div>
          <van-button type="danger" round class="commu-btn" @click="onCommuClick">进入社区</van-button>
        </div>
      </div>
      <!--下部应用入口-->
      <van-row class="line2-all">
        <van-col span="12" v-for="(it, idx) in middleApps" :key="idx" class="line2-item click-box">
          <img :src="'static/img/discovery/'+it.icon" class="line2-icon"/>
          <div>
            <div class="line2-title">{{it.title}}</div>
            <div class="line2-text light-txt">{{it.text}}</div>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tab-discover",
    data() {
      return {
        middleApps: [
          {icon: 'discovery_app_icon4.png', title: '积分商城', 'text': '绝不让每一个积分落空'},
          {icon: 'discovery_app_icon2.png', title: '融金公益', 'text': '时间有爱，融金有益'},
          {icon: 'discovery_app_icon3.png', title: '红包广场', 'text': '福利大派送，一起来抢钱'},
          {icon: 'discovery_app_icon1.png', title: '任务大厅', 'text': 'VIP进阶之路'},
          {icon: 'discovery_app_icon5.png', title: '理财小公举', 'text': '算一算我的第一桶金'},
        ],
      };
    },
    methods: {
      onCommuClick() {
        this._loginOr(() => {
          this._routePush('ForumPage');
        })
      }
    },
  }
</script>

<style scoped lang="scss">
  .commu-all {
    background-size: 100% 100%;
    padding: 6px 16px 20px 16px;
    .commu-mid {
      padding: 10px;
      text-align: left;
      .commu-title {
        font-size: 16px;
        margin-top: 14px;
      }
      .commu-txt {
        font-size: 14px;
        margin-top: 10px;
      }
    }
    .commu-btn {
      margin-top: 10px;
      width: 70%;
      font-size: 16px;
      height: 36px;
      line-height: 30px;
    }
    .commu-top {
      display: flex;
      justify-content: space-between;
      color: #FE7846;
      .commu-right {
        font-size: 14px;
        border-radius: 20px;
        padding: 0 6px;
        border: 1px solid #FE7846;
      }
    }
  }

  .banner-img {
    width: 100%;
    height: 35vw;
  }

  .line2-all {
    margin-bottom: 20px;
    .line2-item {
      display: flex;
      border: 1px solid #f7f7f7;
      align-items: center;
      padding: 10px;
      .line2-icon {
        width: 60px;
        height: 60px;
      }
      .line2-title {
        font-size: 14px;
      }
      .line2-text {
        font-size: 12px;
        margin-top: 2px;
      }
    }
  }
</style>
