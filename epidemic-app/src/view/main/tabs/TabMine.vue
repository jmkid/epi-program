<template>
  <div>
    <img src="static/img/banner/banner0.png" class="nav-image">
    <!--顶部导航-->
    <div class="top-nav">
      <van-image id="img" @click.stop="uploadHeadImg" lazy-load :src=imgCode class="head-img" fit="cover"></van-image>
      <div class="nav-txt">学号：{{s_id}}<br>姓名：云</div>
      <input type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="main-item">
      <van-cell class="main-cell" v-for="(it, idx) in bottomApps " :key="idx" :title="it.title" :to="{name:it.to}"
                icon="location-o" is-link/>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue';
  import {ActionSheet} from 'vant';

  Vue.use(ActionSheet);
  import axios from 'axios'

  export default {
    name: "tab-mine",
    data() {
      return {
        s_id:'',
        bottomApps: [
          {title: '课堂通行证', to: 'Classroompass'},
          {title: '个人健康码', to: 'Greencode'},
          {title: '我的消息', to: 'MessagePage'},
          {title: '设置', to: 'SettingsPage'},
        ],
        imgCode: 'data:image/png;base64,',
      };
    },
    created() {
      this.s_id = this.getCookie('studentId')
      this.imgCode = window.localStorage.getItem('img_code')
    },
    methods: {
      uploadHeadImg() {
        this.$el.querySelector('.hiddenInput').click()
      },
      handleFile: function (e) {
        var that = this;
        var file = e.target.files[0];
        var imgSize = file.size / 1024;
        if (imgSize > 200) {
          alert('请上传大小不要超过200KB的图片')
        } else {
          var reader = new FileReader();
          reader.readAsDataURL(file); // 读出 base64
          reader.onloadend = function () {
            // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
            var dataURL = reader.result;
            axios.put('api/setProfile', {}, {
              params: {
                imgCode: dataURL,
                student_id: this.s_id
              }
            }).then((res) => {
              location.reload();
            }).catch((err) => {
            })
          }
        }

      }
    }
  }
</script>

<style scoped lang="scss">
  .nav-image {
    vertical-align: bottom;
    width: 100%;
    height: 50vw;
  }

  .top-nav {
    height: 50px;
    z-index: 10;
    border-bottom: 1px solid #f7f7f7;
    width: 100%;
    align-items: center;
    margin-top: -30px;
    display: flex;

    .head-img {
      width: 90px;
      height: 90px;
      border-radius: 50px;
      overflow: hidden;
      margin-left: 16px;
    }

    .nav-txt {
      margin-top: 50px;
      margin-left: 20px;
      color: #666666;
      font-size: 12px;
    }
  }

  .hiddenInput {
    display: none;
  }

  .main-item {
    margin-top: 50px;
    height: 100px;

    .main-cell {

    }
  }
</style>
