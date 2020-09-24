<template>
  <div>
    <div class="container">
      <div class="txt">
        <div class="txt1"><span style="color:#48A0FA">校疫通</span>APP</div>
        <div class="txt2">携手同心 <span style="color:#48A0FA">共战疫情</span></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {}
};
</script>
<style scoped lang="scss">
.container {
  width: 100%;
  height: 620px;
  background: url("../../../static/img/infoup/cover.png") no-repeat;
  background-size: 100% 100%;

  .txt {
    position: absolute;
    top: 20%;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    font-size: 30px;
    color:#48A0FA;

    .txt1 {
      margin-bottom: 15px;
    }
  }
}
</style>
