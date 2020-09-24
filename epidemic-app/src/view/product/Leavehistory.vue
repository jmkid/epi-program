<template>
  <div>
    <div class="head">
      <van-icon name="arrow-left" size="2em" color="white" @click="goBack"/>
      <span class="leave-title">请假申请</span>
    </div>
    <div class="formList" v-for="item in leaveinfo">
      <van-image id="img" lazy-load :src=imgCode class="head-img" fit="cover"></van-image>
      <div class="form-text">
        <div>{{item.name}}</div>
        <div>{{item.date}}</div>
        <div>重要程度：{{item.importance}}</div>
        <div>请假原因：{{item.reason}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Vue from 'vue';
  import {Toast} from 'vant';

  Vue.use(Toast);

  export default {
    data() {
      return {
        stuName: '',
        s_id: '',
        stuTemp: '',
        impo: '紧急',
        showImpo: false,
        reason: '',
        leaveinfo: [],
        imgCode: '',
      };
    },
    created() {
      this.s_id = this.getCookie('studentId')
      this.getInfo()
      this.getImg()
    },
    methods: {
      getImg() {
        axios.get('api/getProfileCode', {
          params: {
            student_id: this.s_id
          }
        }).then((res) => {
          this.imgCode += res.data.data
        }).catch((err) => {
        })
      },
      onSelect(item) {
        this.showImpo = false;
        this.impo = item.name
      },
      getInfo() {
        axios.get('/api/getLeaveById', {
          params: {
            student_id: this.s_id
          }
        }).then((res) => {
          this.leaveinfo = res.data.data
          for (let i in this.leaveinfo) {
            this.leaveinfo[i].date = this.leaveinfo[i].date.substring(0, 10)
          }
        }).catch((err) => {
        })

      },
      goBack() {
        this.$router.go(-1);
      }
    }
  };
</script>
<style lang='less' scoped>
  .head {
    background: url("https://s1.ax1x.com/2020/07/14/UNVN28.jpg") no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 100px;
    position: relative;

    .van-icon {
      top: 35px;
      left: 10%;
      z-index: 99999;
    }

    .leave-title {
      margin: auto;
      color: white;
      position: absolute;
      top: 35px;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 23px;
    }
  }

  .van-field {
    margin: 20px auto;
    width: 300px;
  }

  .formList {
    display: flex;
    margin: 20px 20px 0px 20px;
    width: auto;
    font-size: 12px;
    background-color: #ebedf0;
    height: auto;
    padding: 10px 0 10px 0;
    border-radius: 10px;
  }

  .v-btn {
    text-align: center;
    margin: auto;
    max-width: 230px;
    width: 80%;
    background-color: #00a0ea;
    font-size: 20px;
  }

  .head-img {
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    border-radius: 50px;
    overflow: hidden;
    margin-left: 16px;
    margin-right: 20px;
  }
  .form-text{

  }
</style>
