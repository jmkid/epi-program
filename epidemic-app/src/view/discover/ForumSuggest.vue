<template>
  <div>
    <!--顶部图片-->
    <van-image src="static/img/forum/forum_banner.jpg" class="banner-img"></van-image>
    <!--顶部入口-->
    <div class="top-app">
      <van-row>
        <van-col span="6" v-for="(it, idx) in topApps" :key="idx" class="app-item click-box">
          <van-image :src="'static/img/forum/'+it.icon" class="app-icon"></van-image>
          <div class="app-title">{{it.title}}</div>
        </van-col>
      </van-row>
    </div>
    <!--帖子列表-->
    <div>
      <div class="post-item click-box" v-for="(it,idx) in suggestPosts" :key="idx">
        <div class="post-title">{{it.title}}
          <van-icon name="static/img/forum/icon_best.png" size="16" class="post-icon"></van-icon>
        </div>
        <!--中部图片-->
        <van-grid :border="false" :column-num="3" v-if="it.images&&it.images.length>0">
          <van-grid-item v-for="(im, idx1) in it.images" :key="idx1">
            <van-image :src="im" lazy-load fit="cover" height="70px"></van-image>
          </van-grid-item>
        </van-grid>
        <!--底部信息-->
        <div class="post-user">
          <div class="user-flex">
            <van-image lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" class="head-img" fit="cover"></van-image>
            <div class="post-user-con">
              <div>{{it.user}}</div>
              <div class="user-time">{{it.time}}</div>
            </div>
          </div>
          <div class="user-flex">
            <van-icon name="eye-o" class="browse-icon" size="16"></van-icon>
            <div class="browse-txt">{{it.browse}}</div>
            <van-icon name="chat-o" class="browse-icon" size="16"></van-icon>
            <div class="browse-txt">{{it.comment}}</div>
          </div>
        </div>
      </div>
      <!--没有更多内容了-->
      <div class="no-more-post">我也是有底线的~</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "forum-suggest",
    data() {
      return {
        suggestPosts: [
          {title: '除夕火车票明起开售，送你一份春运抢票指南', user: '小小猫咪', time: '5分钟前', browse: 45678, comment: 45},
          {
            title: '担心朝鲜“圣诞礼物”，美军4架间谍飞机同时飞越半岛', user: '小小猫咪', time: '3小时前', browse: '11.2万', comment: 455,
            images: [
              'static/img/forum/posts/post01.jpg', 'static/img/forum/posts/post02.jpg', 'static/img/forum/posts/post03.jpg',
            ],
          },
          {title: '新一代国产芯片发布 打造产业生态链', user: '国际在线', time: '昨天', browse: 45674, comment: 789},
          {
            title: '无法供货华为14nm？台积电回应：美国目前没有改变规则', user: '第一财金', time: '前天', browse: '11.2万', comment: 455,
            images: [
              'static/img/forum/posts/post03.jpg', 'static/img/forum/posts/post01.jpg', 'static/img/forum/posts/post02.jpg',
            ],
          },
        ],
        topApps: [
          {icon: 'forum_app_icon2.png', title: '签到',},
          {icon: 'forum_app_icon3.png', title: '社区活动',},
          {icon: 'forum_app_icon4.png', title: '活动攻略',},
          {icon: 'forum_app_icon1.png', title: '新手报到',},
        ],
      };
    },
  }
</script>

<style scoped lang="less">
  .no-more-post {
    padding: 30px 0;
    color: #999999;
    font-size: 14px;
    text-align: center;
  }

  .post-item {
    margin-top: 10px;
    padding: 12px;
    .post-user {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
      .head-img {
        width: 32px;
        height: 32px;
        border-radius: 40px;
        overflow: hidden;
      }
      .user-flex {
        display: flex;
        align-items: center;
        color: #666666;
        .browse-txt {
          margin-left: 2px;
          font-size: 12px;
        }
        .browse-icon {
          margin-left: 6px;
          vertical-align: text-bottom;
        }
        .post-user-con {
          margin-left: 10px;
          font-size: 12px;
          color: #666666;
          .user-time {
            color: #999999;
          }
        }
      }
    }
    .post-title {
      font-size: 15px;
      color: #333333;
      .post-icon {
        vertical-align: text-bottom;
      }
    }
  }

  .top-app {
    margin-top: 10px;
    .app-item {
      text-align: center;
      position: relative;
      padding: 14px 0;
      .app-title {
        font-size: 14px;
        color: #999999;
      }
    }
    .app-icon {
      width: 36px;
      height: 36px;
    }
  }

  .banner-img {
    width: 100%;
    height: 33vw;
  }
</style>
