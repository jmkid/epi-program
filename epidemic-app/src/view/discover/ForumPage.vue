<template>
  <div class="page-root">
    <van-nav-bar left-arrow @click-left="_routerBack" title="社区" fixed :z-index="10">
      <van-icon name="search" slot="right" size="20px"></van-icon>
    </van-nav-bar>
    <div class="nav-con">
      <van-tabs v-model="activeTab" line-width="33%" class="tabs-con" sticky>
        <van-tab title="推荐">
          <forum-suggest/>
        </van-tab>
        <van-tab title="版块">
          <forum-block/>
        </van-tab>
        <van-tab title="我的">
          <forum-mine/>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  import ForumBlock from './ForumBlock';
  import ForumSuggest from './ForumSuggest';
  import ForumMine from './ForumMine';

  export default {
    name: "forum-page",
    components: {
      ForumMine, ForumSuggest, ForumBlock,
    },
    data() {
      return {
        activeTab: 0,
      };
    },
  }
</script>

<style scoped>
  .page-root {
    background-color: #f7f7f7;
  }

  .tabs-con {
    padding-top: 0;
  }
</style>
