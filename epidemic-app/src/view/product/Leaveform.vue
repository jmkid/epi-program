<template>
  <div>
    <div class="head">
      <van-icon name="arrow-left" size="2em" color="white" @click="goBack"/>
      <span class="leave-title">请假申请</span>

      <span class="leave-history" @click="toLeaveHistory">申请记录</span>
    </div>
    <div>
      <!-- 通过 pattern 进行正则校验 -->
      <van-field
        v-model="stuName"
        name="pattern"
        placeholder="请输入您的真实姓名"
        label="姓名"
      />
      <!-- 通过 validator 进行函数校验 -->
      <van-field
        v-model="s_id"
        readonly
        name="validator"
        placeholder="请输入您的学号"
        label="学号"
      />
      <van-field
        v-model="stuTemp"
        name="asyncValidator"
        placeholder="请输入您的当日体温"
        label="体温"
      />
      <van-field label="重要程度" v-model="impo" is-link @focus="showImpo=true"/>
      <van-action-sheet v-model="showImpo" :round="false" :actions="important" @select="onSelect"></van-action-sheet>
      <van-field
        v-model="reason"
        name="asyncValidator"
        label="原因"
        placeholder="请输入请假原因"
      />
      <div style="margin: 16px;">
        <van-button class="v-btn" round block type="info" native-type="submit" @click="subInfo">提交</van-button>
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
        important: [
          {name: '紧急'},
          {name: '一般'},
          {name: '轻微'}
        ],
        showImpo: false,
        reason: '',
        pattern: /\d{6}/,
      };
    },
    created() {
      this.s_id = this.getCookie('studentId')
    },
    methods: {
      toLeaveHistory(){
        this.$router.push('Leavehistory')
      },
      onSelect(item) {
        this.showImpo = false;
        this.impo = item.name
      },
      subInfo() {
        var date = new Date();
        axios.post('/api/updateStudentLeave', {
          'student_id': this.s_id,
          'name': this.stuName,
          'temperature': parseInt(this.stuTemp),
          'date': date,
          'importance': this.impo,
          'reason': this.reason,
          "statues": "0",
          "approve_id": "",
          "approve_date": "",
        }).then((res) => {
          this.stuName = '',
            this.stuTemp = '',
            this.reason = ''
          Toast.success('提交成功');
        }).catch((err) => {
          Toast.fail('请勿重复提交或发送信息错误')
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

    .leave-history{
      color: white;
      top: 40px;
      text-align: right;
      position: absolute;
      right: 5%;
    }
  }

  .van-field {
    margin: 20px auto;
    width: 300px;
  }

  .formList {
    margin: auto;
    width: 300px;
  }

  .v-btn {
    text-align: center;
    margin: auto;
    max-width: 230px;
    width: 80%;
    background-color: #00a0ea;
    font-size: 20px;
  }
</style>
