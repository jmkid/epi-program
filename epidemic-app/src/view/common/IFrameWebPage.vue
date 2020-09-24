<template>
  <!--该页面通过iframe来显示url-->
  <div class="page-con">
    <van-nav-bar left-arrow @click-left="_routerBack" :title="title" fixed :z-index="10"></van-nav-bar>
    <div v-html="htmlText" class="web-con"></div>
  </div>
</template>

<script>
  export default {
    name: "iframe-web-page",
    data() {
      return {
        title: '',
        htmlText: '',
      }
    },
    mounted() {
      let url = this.$route.params.url;
      this.title = this.$route.params.title;
      if (url) {
        this.htmlText = '<iframe width="100%" height="100%" frameborder="no" allowtransparency="yes" ' +
          'src="' + url + '"></iframe>';
      } else {
        this._routerBack();
      }
    }
  }
</script>

<style scoped>
  .web-con {
    padding-top: 46px;
    height: 100%;
  }

  .page-con {
    height: 100%;
  }
</style>
