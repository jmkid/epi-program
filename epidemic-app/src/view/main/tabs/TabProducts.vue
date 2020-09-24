<template>
  <div>
    <div class="top-fixed">
      <van-nav-bar :title="$t('tab_products')" fixed :z-index="10"></van-nav-bar>
      <div class="nav-con navbar-con">
        <van-tabs v-model="activeSort" class="sort-all" sticky @change="onTabChange" line-width="33%" type="card">
          <van-tab :title="it_so.title" v-for="(it_so, idx) in sortItems" :key="idx">
            <div class="prod-item click-box" v-for="(it_po,idx_p) in getProductList(idx)"
                 :key="idx_p" @click="onProductClick(it_po)">
              <van-row>
                <van-col span="12" class="prod-rate">
                  <div class="red-txt rate-txt"><span class="rate-big">{{it_po.rate}}</span>%+{{it_po.add}}%</div>
                  <div class="light-txt rate-ins">预期年化收益率</div>
                </van-col>
                <van-col span="12" class="prod-ins">
                  <div class="prod-title">{{it_po.name}}</div>
                  <div class="prod-tag">期限{{it_po.days}}天</div>
                </van-col>
              </van-row>
              <!--进度条-->
              <van-progress :percentage="it_po.percent" color="#ff6611" class="prod-progress" :show-pivot="false">
              </van-progress>
              <div class="pro-amount">
                <div>项目总额180万</div>
                <div>剩余可投<span class="red-txt">75万</span></div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tab-products",
    data() {
      return {
        activeSort: 0,
        sortItems: [
          {title: '推荐'},
          {title: '收益率'},
          {title: '期限'},
        ],
        allProducts: [
          {id: 5, rate: 4.5, add: 0.5, name: 'A计划064512544', days: 365, percent: 65},
          {id: 6, rate: 4.0, add: 0.5, name: 'B计划064512542', days: 60, percent: 95},
          {id: 7, rate: 2.5, add: 0.1, name: 'C计划064512546', days: 30, percent: 23},
          {id: 8, rate: 4.5, add: 0.5, name: 'A计划064512544', days: 365, percent: 65},
          {id: 9, rate: 4.0, add: 0.5, name: 'B计划064512542', days: 60, percent: 95},
          {id: 22, rate: 2.5, add: 0.1, name: 'C计划064512546', days: 30, percent: 23},
          {id: 34, rate: 4.5, add: 0.5, name: 'A计划064512544', days: 365, percent: 65},
          {id: 21, rate: 4.0, add: 0.5, name: 'B计划064512542', days: 60, percent: 95},
          {id: 12, rate: 2.5, add: 0.1, name: 'C计划064512546', days: 30, percent: 23},
          {id: 13, rate: 6.0, add: 0.1, name: 'C计划064512546(售罄)', days: 10, percent: 100},
          {id: 14, rate: 5.0, add: 0.1, name: 'C计划064512543(售罄)', days: 120, percent: 100},
          {id: 15, rate: 6.0, add: 0.1, name: 'C计划064512546(售罄)', days: 10, percent: 100},
          {id: 16, rate: 5.0, add: 0.1, name: 'C计划064512543(售罄)', days: 120, percent: 100},
          {id: 17, rate: 6.0, add: 0.1, name: 'C计划064512546(售罄)', days: 10, percent: 100},
          {id: 18, rate: 5.0, add: 0.1, name: 'C计划064512543(售罄)', days: 120, percent: 100},
        ],
      };
    },
    computed: {
      getProductList() {
        let newList = this.allProducts.slice(0);
        return (index) => {
          if (index == 0) {
            return this.allProducts;
          } else if (index == 1) {
            return newList.sort((a, b) => {
              return a.rate - b.rate;
            });
          } else if (index == 2) {
            return newList.sort((a, b) => {
              return a.days - b.days;
            });
          }
        }
      }
    },
    methods: {
      onProductClick(item) {
        this._routePushQ('ProductDetail', {id: item.id});
      },
      onTabChange() {
      },
    },
  }
</script>

<style scoped lang="scss">
  .prod-item {
    padding: 12px;
    margin-top: 12px;
    .pro-amount {
      display: flex;
      justify-content: space-between;
      margin-top: 4px;
      font-size: 14px;
      color: #999999;
    }
    .prod-progress {
      margin-top: 20px;
      height: 6px;
    }
    .prod-rate {
      text-align: center;
      padding: 2px 10px;
      .rate-txt {
        font-size: 14px;
        .rate-big {
          font-size: 24px;
        }
      }
      .rate-ins {
        font-size: 12px;
        margin-top: 4px;
      }
    }
    .prod-ins {
      border-left: 1px solid #aaaaaa;
      padding: 2px 10px;
      .prod-title {
        font-size: 14px;
      }
      .prod-tag {
        display: table;
        font-size: 12px;
        margin-top: 16px;
        border: 1px solid #ff6c6c;
        border-radius: 20px;
        color: #ff6c6c;
        padding: 0 6px;
      }
    }
  }

  .navbar-con {
    .sort-all {
      padding-top: 0;
    }
  }
</style>
