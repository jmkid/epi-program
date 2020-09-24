<template>
  <div>
    <div style="position: relative">
      <!--头部导航，搜索之类的东西-->
      <div class="head-item">
        <van-icon name="scan" class="head-img" color="white" size="2rem" @click="toTakePhoto"/>
        <van-search
          shape="round"
          placeholder="请输入搜索关键词"
          @click="toSearch"
          background=#00A0E9;
        />
        <!--消息按钮-->
        <div class="msg-con" @click="onMessageClick">
          <van-icon name="chat-o" size="2em" color="white"/>
          <div class="msg-text" v-show="showNum">{{ mesNum }}</div>
        </div>
      </div>
      <img :src=swipeImages alt="" class="swipe-img">
      <van-swipe :autoplay="6000" vertical :show-indicators="false" class="swipe-text-con">
        <van-swipe-item class="swipe-text-item" v-for="(it,idx) in textSwipes" :key="idx">
          <div class="swipe-text-txt">{{it.text}}</div>
        </van-swipe-item>
      </van-swipe>
    </div>

    <!--中部应用入口-->
    <div class="mid-app">
      <van-grid :column-num="3" class="mid-grid">
        <van-grid-item v-for="(it, idx) in middleApps" :key="idx" :icon="'static/img/home/'+it.icon" :text="it.title"
                       :to="{name:it.to}"/>
      </van-grid>
      <span>最新讯息</span>
    </div>
    <van-divider :style="{ borderColor: '#1989fa', padding: '0 16px',margin:'8px' }"/>
    <div class="news">
      <div v-for="(item, index) in news" :key="index" class="time-item" @click="toNewsPage(item.sourceUrl)">
        <p style="font-size: 15px;margin-bottom: 5px">
          <span class="latest" v-show="index==0">最新</span>
          {{ item.title }}
        </p>
        <p class="sum-txt">{{ item.summary }}</p>
        <span style="text-align: left;font-size: 10px;color:grey;margin-top: 5px">{{ item.pubDateStr }}</span>
        <span style="float: right;font-size: 10px;color: grey;margin-top: 5px">信息来源:{{item.infoSource}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "tab-home",
    components: {},
    data() {
      return {
        s_id: '',
        showNum: '',
        news: [],
        infoSource: '',
        sourceUrl: '',
        pubDateStr: '',
        title: '',
        summary: '',
        swipeImages: 'static/img/banner/banner.png',
        mesNum: 0,
        textSwipes: [
          {text: '欢迎使用校疫通手机APP'},
          {text: '戴口罩，常通风，勤洗手，少出门，少聚集'},
          {text: '齐心协力，战胜疫情'},
        ],
        middleApps: [
          {icon: 'line2_icon1.png', title: '信息上报', to: 'ProductDetail'},
          {icon: 'line2_icon2.png', title: '个人行程', to: 'TimeLine'},
          {icon: 'line2_icon3.png', title: '个人健康码', to: 'Greencode'},
          {icon: 'line2_icon4.png', title: '课堂通行证', to: 'Classroompass'},
          {icon: 'line2_icon4.png', title: '请假申请', to: 'Leaveform'},
        ],
      };
    },
    created() {
      this.s_id = this.getCookie('studentId')
      this.fetchMesNum()
    },
    mounted() {
      this.getNews()
    },
    methods: {
      // fetchInfo(){
      //   axios.get('newapi/studentInfo/getsatuesById',{
      //     params:{
      //       student_id:10086
      //     }
      //   }).then((res)=>{
      //
      //   }).catch((err)=>{
      //
      //   })
      // },
      toNewsPage(sUrl) {
        window.location.href = sUrl
      },
      getNews() {
        axios.get('https://api.tianapi.com/txapi/ncov/index', {
          transformRequest: (data, headers) => {
            delete headers.token
            return data
          },
          params: {
            key: '60ca1b8db1ac78adc31bf5a95c99506f'
          }
        }).then((res) => {
          for (let i = 0; i < res.data.newslist[0].news.length; i++) {
            this.news.push({
              pubDateStr: res.data.newslist[0].news[i].pubDateStr,
              title: res.data.newslist[0].news[i].title,
              summary: res.data.newslist[0].news[i].summary,
              infoSource: res.data.newslist[0].news[i].infoSource,
              sourceUrl: res.data.newslist[0].news[i].sourceUrl
            })
          }
        }).catch((err) => {
        })
      },
      fetchMesNum() {
        axios.get('api/getMailById', {
          params: {
            student_id: this.s_id
          }
        }).then((res) => {
			let rowNum = 0
			for (let i = 0;i < res.data.data.length;i++){
				if (res.data.data[i].situation == 0) {
					rowNum += 1
				}
			}
			
          this.mesNum = rowNum
		  
          if (this.mesNum != 0) {
            this.showNum = true
          } else {
            this.showNum = false
          }
        }).catch((err) => {
        })
      },
      onBuyClick() {
        this._routePushQ('ProductDetail', {id: 1});
      },
      onMessageClick() {
        this._routePush('MessagePage');
      },
      swipeImageClick(item) {
      },
      toSearch() {
        this._routePush('Reserch');
      },
      toMine() {
        this._routePush('mine');
      },
      toTakePhoto() {
        this.$router.push({path: '/TakePhoto', query: {showi: 'ture'}})
      }
    }
  }
</script>


<style scoped lang="scss">

  .head-item {
    position: sticky;
    top: 0;
    z-index: 99999;
    width: 100%;
    /*background: url("C:\Users\czj00\Desktop\防控\epidemic-app\static\img\banner\banner.png");*/
    height: 55px;
    display: flex;
    justify-content: center;
    background: #00A0E9;

    img {
      width: 100%;
      height: 150px;
    }

    .head-img {
      width: 35px;
      height: 35px;
      overflow: hidden;
      position: absolute;
      top: 13px;
      left: 20px;
      z-index: 999;
    }

    .msg-con {
      position: absolute;
      top: 10px;
      right: 20px;
      z-index: 999;

      .msg-text {
        position: absolute;
        top: -2px;
        right: 4px;
        box-sizing: border-box;
        min-width: 18px;
        padding: 1px 5px;
        color: #fff;
        font-size: 12px;
        text-align: center;
        background-color: #f44;
        border-radius: 30px;
        transform: translateX(50%);
        transform-origin: 100%;
      }
    }

    .van-search {
      width: 60%;
      margin-top: 5px;
      text-align: center;
    }
  }

  .swipe-text-con {
    height: 30px;

    .swipe-text-item {
      height: 30px;
      display: flex;
      background-color: #fff7cc;
      align-items: center;

      .swipe-text-txt {
        height: 30px;
        font-size: 14px;
        line-height: 30px;
        padding: 0 10px;
        color: #f60;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .money-all {
    background-color: white;
    margin-top: 10px;
    text-align: center;
    padding: 20px 0;
  }

  .bot-app {
    margin-top: 10px;
    margin-bottom: 20px;

    .bot-item {
      display: flex;
      padding: 6px 10px;
      align-items: center;
      background-color: white;
      border: 1px solid #f7f7f7;

      .bot-text {
        font-size: 12px;

        .bot-small {
          margin-top: 2px;
        }
      }

      .line4-icon {
        width: 40px;
        height: 40px;
        margin: 6px;
      }
    }
  }

  .swipe-img {
    vertical-align: bottom;
    width: 100%;
    height: 50vw;
    background: #00A0E9;
  }

  .mid-app {
    margin: 20px;
    margin-bottom: 0;

    .mid-grid {
      margin-bottom: 20px;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 3px 3px 3px #B4CDCD;
    }
  }


  .news {
    margin: 10px;
    height: auto;
    margin-left: 30px;
    margin-right: 30px;

    .time-item{
      padding: 10px;
      margin-bottom: 10px;
      background-color: white;
      border-radius: 20px 20px 0 0;
    }

    p {
      margin: 0;
      /*margin-bottom: 10px;*/
    }

  }

  .latest {
    background-color: red;
    border-radius: 3px;
    color: white;
    font-size: 10px;
    padding: 2px;
    margin-right: 2px;
  }


  .sum-txt {
    color: gray;
    font-size: 12px;
  }

  .video-item {

  }
</style>
