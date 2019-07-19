<template>
  <div class="wrap" :class="{skeleton:skeleton}">
    <header class="header" @click="isShowTips=true">
      可向多个商家咨询最低价，商家即时回复
      <img src="/img/icon-help.png" class="question" alt />
    </header>
    <main class="main" @scroll="mainScroll">
      <!-- 汽车详情 -->
      <div class="carInfo" @click="$router.push({name:'type',params:{carId}})">
        <img :src="carDetail.Picture" alt class="picture" />
        <div class="right">
          <p class="aliasName">
            <span>{{carDetail.AliasName}}</span>
          </p>
          <p class="title">
            <span>{{carDetail.title}}</span>
          </p>
        </div>
      </div>
      <!-- 个人信息 -->
      <div class="userInfo">
        <h3 class="title">个人信息</h3>
        <label for="userName">
          姓名
          <input
            id="userName"
            type="text"
            placeholder="输入你的真实中文姓名"
            class="info"
            v-model="userName"
          />
        </label>
        <label for="phone">
          手机
          <input id="phone" type="text" class="info" placeholder="输入你的真实手机号码" v-model="phone" />
        </label>
        <label @click="showSelectProvince">
          城市
          <span class="info fix">{{cityName}}</span>
        </label>
        <button class="buttonBlue hover" @click="request">询最低价</button>
      </div>
      <!-- 报价商信息 -->
      <div class="dealerList" ref="dealerList">
        <div class="title">选择报价经销商</div>
        <div
          v-for="(item,index) in dealerList"
          :key="item.dealerId"
          class="dealerInfo hover"
          :class="{active:item.isChecked}"
          @click="checkDearle(index)"
        >
          <p class="flexBetween">
            <span>{{item.dealerShortName}}</span>
            <span>{{item.vendorPrice}}万</span>
          </p>
          <p class="flexBetween">
            <span>{{item.address}}</span>
            <span>售{{item.saleRange}}</span>
          </p>
        </div>
      </div>
    </main>
    <!-- 悬浮底部提交按钮 -->
    <button class="buttonBlue fixedButton hover" v-if="isFixButtonShow" @click="request">询最低价</button>
    <!-- 顶部弹框 -->
    <transition name="fadeIn">
      <div class="tips mask" v-show="isShowTips" @click="isShowTips=false">
        <div class="content">
          <div class="flex-tab">
            <div>
              <img src="/img/q-l.png" alt />
              <p>安全高效</p>
            </div>
            <div>
              <img src="/img/q-m.png" alt />
              <p>省心省力</p>
            </div>
            <div>
              <img src="/img/q-r.png" alt />
              <p>贴心服务</p>
            </div>
          </div>
          <ul class="tiplist">
            <li>私人信息严格保密,最新报价立等可取</li>
            <li>足不出户,提交即可获得多家经销商的最低价格</li>
          </ul>
        </div>
      </div>
    </transition>
    <!-- 警示框 -->
    <div class="alertMask" :class="{maskHide:isMaskHiding}" v-show="isShowAlert">
      <div class="content">
        <div class="title">{{msg}}</div>
        <div class="ok" @click="maskHide">好</div>
      </div>
    </div>
    <!-- 选择省份 -->

    <transition name="slideUp">
      <div class="selectCity" v-if="isShowSelectProvince">
        <div class="wrap">
          <p class="title">自动定位</p>
          <p class="curCityName" @click="isShowSelectProvince=false">{{cityName}}</p>
          <p class="title">省市</p>
          <p
            class="cityName"
            v-for="(item) in provinceList"
            :key="item.CityID"
            @click="showCityList(item.CityID)"
          >{{item.CityName}}</p>
        </div>
        <transition name="slideLeft">
          <div class="mask" v-if="isShowSelectCity" @click="isShowSelectCity=false">
            <div class="content">
              <p
                class="cityName"
                v-for="(item,index) in cityList"
                :key="item.CityID"
                @click="changeCity(index)"
              >{{item.CityName}}</p>
            </div>
          </div>
        </transition>
      </div>
    </transition>

    <!-- 提交结果弹框遮罩 -->

    <div class="result mask alertMask" v-show="isShowResult">
      <div class="content">
        <div class="icon">
          <img src="/img/q-icon.png" alt />
          <p>询价成功</p>
        </div>
        <p class="message">稍后有专业汽车顾问为你服务</p>
        <p class="message">请保持手机畅通</p>
        <p class="ok" @click="isShowResult=false">确定</p>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { mapState, mapActions, mapMutations } from "vuex";
import { sleep } from "@/utils";
export default {
  name: "quotation",
  data() {
    return {
      userName: "",
      phone: "",
      isFixButtonShow: false,
      msg: "喵",
      isShowAlert: false,
      isMaskHiding: false,
      isShowSelectProvince: false,
      isShowSelectCity: false,
      isShowTips: false,
      isShowResult: false,
      skeleton: true
    };
  },
  computed: {
    ...mapState({
      cityID: (state: any) => state.quotation.cityID,
      cityName: (state: any) => state.quotation.cityName,
      provinceList: (state: any) => state.quotation.provinceList,
      cityList: (state: any) => state.quotation.cityList,
      dealerList: (state: any) => state.quotation.dealerList,
      carDetail: (state: any) => state.quotation.carDetail,
      carId: (state: any) => state.quotation.carId
    }),
    offsetTop(): number {
      const that : any=this;
      return that.$refs.dealerList.offsetTop;
    }
  },
  methods: {
    ...mapActions({
      getDetail: "quotation/getDetail",
      getCityList: "quotation/getCityList",
      getProvinceList: "quotation/getProvinceList",
      getDealerList: "quotation/getDealerList",
      submitLowPrice: "quotation/submitLowPrice"
    }),
    ...mapMutations({
      checkDearle: "quotation/checkDearle",
      updateCityInfo: "quotation/updateCityInfo"
    }),
    mainScroll(e: any) {
      const that : any=this;
      const flag = e.target.scrollTop > that.offsetTop;
      if (flag !== that.isFixButtonShow) {
        that.isFixButtonShow = flag;
      }
    },
    async request() {
      const that : any=this;
      that.msg = "";
      if (!/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(that.userName)) {
        that.msg = that.msg || "请输入真实的中文姓名";
      }
      if (!/^1[3456789]\d{9}$/.test(that.phone)) {
        that.msg = that.msg || "请输入正确的手机号";
      }
      const dealers = (that as any).dealerList.filter(
        (val: any) => val.isChecked
      );
      if (dealers.length === 0) {
        that.msg = that.msg || "请先选择报价经销商";
      }
      if (that.msg) {
        that.isShowAlert = true;
      } else {
        const { code } = await (that as any).submitLowPrice({
          name: that.userName,
          mobile: that.phone
        });
        if (code === 1) {
          that.isShowResult = true;
        }
      }
    },
    async maskHide() {
      const that : any=this;
      that.isMaskHiding = true;
      await sleep(300);
      that.isMaskHiding = false;
      that.isShowAlert = false;
    },
    async showSelectProvince() {
      const that : any=this;
      await that.getProvinceList();
      that.isShowSelectProvince = true;
    },
    async showCityList(cityId: string) {
      const that : any=this;

      await that.getCityList(cityId);
      that.isShowSelectCity = true;
    },
    async changeCity(index: number) {
      const that : any=this;
      that.isShowSelectProvince = false;
      await that.updateCityInfo(index);
      await that.getDealerList();
    }
  },
  async created() {
     const myThis: any = this
    await myThis.getDetail(
      myThis.$route.params.car_id || "130772"
    );
    myThis.skeleton = false;
  },
  mounted() {
    console.log("quotation-mounted");
  }
};
</script>
<style scoped  lang="scss">
@import "../scss/global.scss";

.skeleton {
  img,
  p {
    background-color: #eee;
    color: #eee;
    margin: 1px;
    padding: 1px;
    span {
      background-color: #999;
      color: #999 !important;
      margin: 1px;
      padding: 1px;
      display: inline;
    }
  }
}
.wrap {
  height: 100%;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
  left: 0;
  top: 0;
}
.header {
  width: 100%;
  background-color: #79cd92;
  color: #fff;
  text-align: center;
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.3rem;
  z-index: 9;
  .question {
    height: 0.3rem;
    width: 0.3rem;
    vertical-align: text-bottom;
  }
}
.main {
  flex: 1;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 1rem;
  .carInfo {
    display: flex;
    padding: 0.32rem 0.24rem;
    position: relative;
    &::after {
      content: "";
      display: inline-block;
      padding-top: 0.16rem;
      padding-right: 0.16rem;
      border-top: 2px solid #ccc;
      border-right: 2px solid #ccc;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
      position: absolute;
      right: 0.26rem;
      top: 0.9rem;
    }
    .picture {
      width: 2.3rem;
      height: 1.41rem;
      border: 1px solid #eee;
      box-sizing: border-box;
      border-radius: 5px;
    }
    .right {
      margin-left: 0.2rem;
      width: 4.3rem;
      line-height: 0.4rem;
      .aliasName {
        font-size: 0.36rem;
      }
      .title {
        margin-top: 0.26rem;
        font-size: 0.32rem;
        line-height: 1.2;
        color: #333;
      }
    }
  }
  .userInfo {
    .title {
      background-color: #eee;
      color: #666;
      padding: 0.1rem 0.2rem;
    }
    label {
      display: block;
      font-size: 0.32rem;
      height: 0.88rem;
      line-height: 0.88rem;
      border-bottom: 1px solid #eee;
      box-sizing: border-box;
      color: #000;
      margin: 0 0.2rem;
      display: flex;
      .info {
        text-align: right;
        border: 0;
        outline: 0;
        flex: 1;
        color: #555;
        font-size: 0.32rem;
        padding-right: 0.2rem;
        &.fix {
          padding-right: 0;
          &::after {
            content: "";
            display: inline-block;
            padding-top: 0.16rem;
            padding-right: 0.16rem;
            border-top: 1px solid silver;
            border-right: 1px solid silver;
            transform: rotate(45deg);
          }
        }
      }
    }
    .buttonBlue {
      font-size: 0.34rem;
      width: 6rem;
      height: 0.7rem;
      margin: 0.3rem 10%;
    }
  }
  .dealerList {
    .title {
      background-color: #eee;
      color: #666;
      padding: 0.1rem 0.2rem;
    }
    .dealerInfo {
      margin: 0 0.2rem;
      padding: 0.2rem 0 0.2rem 0.5rem;
      border-bottom: 1px solid #eee;
      box-sizing: border-box;
      height: 1.65rem;
      position: relative;
      .flexBetween {
        padding: 0.1rem 0;
        &:first-child {
          span:first-child {
            font-size: 0.3rem;
          }
          span:last-child {
            color: #f00;
          }
        }
        &:nth-child(2) {
          color: #999;
          span:first-child {
            width: 75%;
          }
          span:last-child {
            flex-shrink: 0;
          }
        }
      }
      &:before {
        content: "";
        display: inline-block;
        width: 0.32rem;
        height: 0.32rem;
        border-radius: 50%;
        border: 2px solid #ccc;
        box-sizing: border-box;
        position: absolute;
        left: 0.05rem;
        top: 50%;
        -webkit-transform: translate3d(0, -50%, 0);
        transform: translate3d(0, -50%, 0);
      }
      &.active {
        &:before {
          background: #3aacff;
          border: none;
        }
        &:after {
          content: "";
          display: inline-block;
          padding-top: 0.17rem;
          padding-right: 0.1rem;
          border: 2px solid #fff;
          -webkit-transform: rotate(40deg) translate3d(0, -50%, 0);
          transform: rotate(40deg) translate3d(0, -50%, 0);
          position: absolute;
          left: 0.07rem;
          border-left: none;
          border-top: none;
          top: 47%;
        }
      }
    }
  }
}

.fixedButton {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1rem;
  font-size: 0.34rem;
  border-radius: 0;
}

.alertMask {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.4);
  animation: a 0.3s ease forwards;
  &.maskHide {
    animation: b 0.3s ease forwards;
  }
  .content {
    position: fixed;
    z-index: 9999;
    background: #f6f6f6;
    border-radius: 7px;
    width: 72%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transform-origin: 50% 50%;
    text-align: center;
    font-size: 0;
    padding: 0.48rem 0.4rem 0;
    box-sizing: border-box;
    .title {
      display: block;
      padding: 0 0 8px;
      line-height: 16px;
      font-size: 13px;
    }
    .ok {
      position: relative;
      display: block;
      width: 100%;
      padding: 14px 0;
      border-radius: 0 0 7px 7px;
      line-height: 0.4rem;
      font-size: 0.3rem;
      color: #007aff;
      transition: background-color 0.1s;
      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        border-bottom: 1px solid #c8c7cc;
        transform: scaleY(0.5);
        transform-origin: 0 0;
        margin: 0 -0.4rem;
      }
    }
  }
}
.selectCity {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background: #fff;
  transform: translate3d(0, 0, 0);
  .wrap {
    height: 100%;
    overflow-y: auto;
    .cityName::after {
      content: "";
      display: inline-block;
      padding-top: 0.36rem;
      padding-right: 0.36rem;
      border-top: 1px solid #999;
      border-right: 1px solid #999;
      transform: rotate(45deg) scale(0.5);
      position: absolute;
      right: 0.25rem;
      top: 0.2rem;
    }
  }
  .title {
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.24rem;
    padding-left: 0.2rem;
    background: #f4f4f4;
  }
  .curCityName {
    padding-left: 0.4rem;
    font-size: 0.28rem;
    height: 0.8rem;
    line-height: 0.8rem;
    background: #fff;
  }
  .cityName {
    padding-left: 0.3rem;
    font-size: 0.28rem;
    height: 0.8rem;
    line-height: 0.8rem;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    margin-left: 0.1rem;
    position: relative;
  }
  .content {
    height: 100%;
    overflow-y: scroll;
    background-color: #fff;
    transform: translate3d(30%, 0, 0);
  }
}
.tips {
  background-color: #0000001a;
  .content {
    // animation: c 0.3s ease;
    position: relative;
    width: 86%;
    margin-left: 7%;
    background: #fff;
    border-radius: 0.15rem;
    margin-top: 0.8rem;

    &::before {
      position: absolute;
      content: "";
      display: inline-block;
      width: 0;
      height: 0;
      border-left: 0.3rem solid transparent;
      border-right: 0.3rem solid transparent;
      border-bottom: 0.3rem solid #fff;
      right: 0.16rem;
      top: -0.15rem;
    }
    .flex-tab {
      display: flex;
      text-align: center;
      padding: 0.2rem 0;
      > div {
        flex: 1;
        img {
          width: 0.6rem;
        }
      }
    }
    .tiplist {
      border-radius: 0 0 0.15rem 0.15rem;
      padding: 0.1rem 0;
      background-color: #f4f4f4;
      font-size: 0.2rem;
      color: silver;
      > li {
        list-style-type: disc;
        margin-left: 0.4rem;
        padding: 0.05rem 0;
      }
    }
  }
}
.result {
  .content {
    font-size: 0.2rem;
    text-align: center;
    width: 6.3rem;
    padding-top: 0.3rem;
    background-color: #fff;

    .icon {
      font-size: 0.4rem;
      color: #3cc144;
      img {
        width: 0.8rem;
        margin-bottom: 0.3rem;
      }
      p {
        margin: 0.1rem;
      }
    }
    .message {
      font-size: 0.24rem;
      color: silver;
      margin: 0.15rem;
    }
  }
}
@keyframes a {
  from {
    opacity: 0.3;
    transform: scale(1.1);
  }
}
@keyframes b {
  to {
    opacity: 0;
  }
}

@keyframes c {
  from {
    opacity: 0.6;
    transform: scale(0.8);
  }
}
// 淡入 内容从小变大
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: all 0.3s ease;
  .content {
    transition: all 0.3s ease;
  }
}
.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
  .content {
    transform: scale(0.8);
  }
}

// 上滑
.slideUp-enter-active,
.slideUp-leave-active {
  transition: all 0.3s ease;
}
.slideUp-enter,
.slideUp-leave-to {
  transform: translate3d(0, 100%, 0);
}
// 内容左滑
.slideLeft-enter-active,
.slideLeft-leave-active {
  transition: all 0.3s ease;
  .content {
    transition: all 0.3s ease;
  }
}
.slideLeft-enter,
.slideLeft-leave-to {
  opacity: 0;
  .content {
    transform: translate3d(100%, 0, 0);
  }
}
</style>