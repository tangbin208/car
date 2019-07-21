<template>
  <div class="carPage" :class="{skeleton:skeleton}">
    <div class="photoBox hover" @click.passive="toImg()">
      <img :src="car.CoverPhoto" class="photo" alt />
      <span class="photoCount">{{car.pic_group_count}}张照片</span>
    </div>
    <div class="info">
      <div class="left">
        <p>
          <span>{{market_attribute.dealer_price}}</span>
        </p>
        <p>
          指导价
          <span>{{market_attribute.official_refer_price}}</span>
        </p>
      </div>
      <div class="right">
        <button class="buttonBlue hover" @click.passive="toQuestion(car.list[0].car_id)">询问低价</button>
      </div>
    </div>
    <div class="carList">
      <div class="carType">
        <span :class="{active:yearTypeIndex===-1}" @click.passive="changeYearType(-1)">全部</span>
        <span
          :class="{active:yearTypeIndex===index}"
          v-for="(item, index) in yearType"
          :key="index"
          @click.passive="changeYearType(index)"
        >{{item}}</span>
      </div>

      <div v-for="(value,key) in sortArr" :key="key" class="sortArr">
        <p class="title">
          <span>{{value.title}}</span>
        </p>
        <div v-for="item in value.list" :key="item.car_id" class="carCard">
          <p>
            <span>{{item.market_attribute.year}}款 {{item.car_name}}</span>
          </p>
          <p>
            <span>{{item.horse_power}}马力{{item.gear_num}}档{{item.trans_type}}</span>
          </p>
          <p>
            <span>指导价{{item.market_attribute.dealer_price_max}}</span>
            <span>{{item.market_attribute.dealer_price_min}}起</span>
          </p>
          <button class="carCardButton hover" @click.passive="toQuestion(item.car_id)">询问底价</button>
        </div>
      </div>
    </div>
    <div class="bottom hover" @click.passive="toQuestion(car.list[0].car_id)">
      <p>询问底价</p>
      <p>本地经销商为你报价</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default Vue.extend({
  name: "car",
  data() {
    return {
      year: "全部",
      SerialID: "2616",
      skeleton: true
    };
  },
  computed: {
    ...mapState({
      car: (state: any): any[] => state.car.car,
      yearTypeIndex: (state: any): any[] => state.car.yearTypeIndex
    }),
    ...mapGetters({
      yearType: "car/yearType",
      curYearType: "car/curYearType",
      yearList: "car/yearList",
      sortArr: "car/sortArr"
    }),
    market_attribute(): any {
      const that: any = this;
      return that.car.market_attribute || {};
    }
  },
  methods: {
    ...mapActions({
      getCarData: "car/getCarData"
    }),
    ...mapMutations({
      updateState: "car/updateState",
      updateSerialID: "car/updateSerialID"
    }),
    changeYearType(value: number) {
      const that: any = this;
      that.updateState({
        key: "yearTypeIndex",
        value
      });
    },
    toQuestion(car_id: string) {
      const that: any = this;
      that.$router.push({ name: "quotation", params: { car_id } });
    },
    toImg() {
      const that: any = this;

      that.$router.push({ name: "picture" });
    },
    async init() {
      const that: any = this;
      that.SerialID = (that.$route.params.id as string) || "2593";
      console.log("SerialID", that.SerialID);
      await that.getCarData(that.SerialID);
      that.skeleton = false;
      document.title = that.car.AliasName;
    }
  },
  activated() {
    this.init()
  }
});
</script>
<style lang="scss">
@function px($px) {
  //$px为需要转换的字号
  @return $px / 100 * 1rem;
}

.skeleton {
  img,
  p {
    background-color: #eee;
    color: #eee;
    margin: 1px;
  }
  span {
    padding: 1px;
    margin: 1px;
    display: inline-block;
    background-color: #999;
    color: #999 !important;
  }
  button,
  .bottom,
  .bottom p {
    pointer-events: none;
    background-color: #aaa !important;
    color: #aaa !important;
  }
}

.carPage {
  font-size: px(14);
  min-height: 100%;
  padding-bottom: 1rem;
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
  left: 0;
  top: 0;
  overflow-y: auto;
  .photoBox {
    position: relative;
    height: 3.09rem;
    overflow: hidden;
    .photo {
      width: 100%;
      min-height: 100%;
      top: 50%;
      transform: translateY(-50%);
      position: absolute;
    }
    .photoCount {
      color: #fff;
      background-color: #0009;
      border-radius: px(20);
      position: absolute;
      right: px(20);
      bottom: 0.3rem;
      padding: 3px px(10);
      font-size: 0.24rem;
    }
  }
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: px(36) px(20) px(20);
    border-bottom: px(15) solid #f4f4f4;
    .left {
      text-align: left;
      flex: 1;
      p:first-child {
        color: #f00;
        font-size: px(38);
        padding: px(5);
      }
      p:nth-child(2) {
        color: #aaa;
        font-size: px(26);
      }
    }
    .right {
      flex: 1;
      .buttonBlue {
        width: 100%;
      }
    }
  }

  .carList {
    .carType {
      font-size: px(36);
      padding: px(20);
      span {
        padding-right: 0.46rem;
        &.active {
          color: #3aacff;
        }
      }
    }
    .sortArr {
      .title {
        background-color: #f4f4f4;
        padding: px(15) px(20);
        font-size: px(26);
        color: #999;
      }
      .carCard {
        padding: 0 0.2rem;
        overflow: hidden;
        &:last-child {
          border-bottom: 0;
        }
        p {
          &:first-child {
            padding: 0.26rem 0 0.18rem;
            font-size: 0.3rem;
            line-height: 1;
            color: #3d3d3d;
          }
          &:nth-child(2) {
            color: #bdbdbd;
            font-size: 0.26rem;
          }
          &:nth-child(3) {
            text-align: right;
            padding-bottom: 0.1rem;
            font-size: 0.24rem;
            color: #818181;
            span:nth-child(2) {
              font-size: 0.3rem;
              color: #ff2336;
              margin-left: 0.1rem;
            }
          }
        }
        .carCardButton {
          border: none;
          border-top: 1px solid #eee;
          width: 110%;
          height: 0.8rem;
          font-size: 0.32rem;
          color: #00afff;
          background: #fff;
          font-weight: 500;
          margin-left: -0.3rem;
        }
      }
    }
  }
  .buttonBlue {
    background: #00afff;
    color: #fff;
    border-radius: 0.1rem;
    font-size: 0.32rem;
    height: 0.7rem;
    width: 3.45rem;
    border: none;
    box-sizing: border-box;
  }
  .bottom {
    text-align: center;
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 99;
    background: #3aacff;
    height: 1rem;
    color: #fff;
    font-size: px(24);
    padding-top: px(20);
    box-sizing: border-box;
    p {
      background-color: transparent;
      &:first-child {
        font-size: px(32);
        margin-bottom: px(8);
      }
    }
  }
}
</style>