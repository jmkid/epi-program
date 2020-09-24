<template>
  <div>
    <div class="head-item">
      <van-icon name="arrow-left" size="29px" color="white" @click="goBack()"/>
      <span>信息上报</span><br>
    </div>
    <div style="font-size: 17px;margin-bottom: 20px;margin-top: 5px;font-weight: bold" align="center">防控新型冠状病毒传播
      信息采集平台
    </div>
    <div class="formList" style="padding: 10px">
      <van-field
        v-model="stuName"
        name="pattern"
        placeholder="请输入您的姓名"
        label="姓名"
        :rules="[{ pattern, message: '请输入正确内容' }]"
      />
      <!-- 通过 validator 进行函数校验 -->
      <van-field
        v-model="s_id"
        readonly
        name="validator"
        placeholder="请输入您的学号"
        label="学号"
      />
      <van-field label="身体状况" v-model="stuStatues" is-link @focus="showImpo=true"/>
      <van-action-sheet v-model="showImpo" :round="false" :actions="status" @select="onSelect"></van-action-sheet>
      <van-field
        v-model="temp"
        name="asyncValidator"
        placeholder="请输入您的体温"
        :rules="[{ validator: asyncValidator, message: '请输入正确内容' }]"
        label="体温"
      />
      <div style="margin: 16px;">
        <van-button class="v-btn" round block type="info" native-type="submit" @click="subInfo">
          提交
        </van-button>
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
    name: "product-detail",
    data() {
      return {
        stuName: '',
        s_id: '',
        stuStatues: '健康',
        status: [
          {name: '健康'},
          {name: '异常'},
          {name: '其他'}
        ],
        showImpo: false,
        temp: '',
        pattern: /\d{6}/,
      };
    },
    created() {
      this.s_id = this.getCookie('studentId')
    },
    methods: {
      onSelect(item) {
        this.showImpo = false;
        this.stuStatues = item.name
      },
      subInfo() {
        var date = new Date();
        axios.post('/api/updateStudentStatues', {
          'student_id': this.s_id,
          'name': this.stuName,
          'statues': this.stuStatues,
          'temperature': this.temp,
          'date': date,
        }).then((res) => {
          this.stuName = ''
            this.temp = '',
            Toast.success('上传成功')
        }).catch((err) => {
          Toast.fail('上传失败')
        })
      },
      goBack() {
        this.$router.go(-1);
      },
      // 校验函数返回 true 表示校验通过，false 表示不通过
      validator(val) {
        return /1\d{10}/.test(val);
      },
      // 异步校验函数返回 Promise
      asyncValidator(val) {
        return new Promise((resolve) => {
          Toast.loading('验证中...');

          setTimeout(() => {
            Toast.clear();
            resolve(/\d{6}/.test(val));
          }, 1000);
        });
      },
    }
  }
</script>

<style scoped lang="scss">
  .head-item {
    background: url("https://s1.ax1x.com/2020/07/13/UYO9HJ.jpg") no-repeat;
    background-size: 100% 100%;
    height: 100px;
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

  .van-field {
    margin: auto;
    margin-bottom: 10px;
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
    background-color: #00A0EA;
    font-size: 20px;
  }
</style>
