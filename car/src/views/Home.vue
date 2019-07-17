<template>
<div class="wrap">
  <div class="main" ref="wrap">
    <ul>
      <li v-for="(item,index) in Object.keys(list)" :key="index">
        <h4 ref="tit">{{item}}</h4>
        <ol>
          <li v-for="val in list[item]" :key="val.MasterID" @tap="toMask(val.MasterID)">
            <img :src="val.CoverPhoto" />
            <p>
              <span>{{val.Name}}</span>
            </p>
          </li>
        </ol>
      </li>
    </ul>
    <ol class="fixed" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <li @tap="toList(index)" v-for="(item,index) in Object.keys(list)" :key="index">{{item}}</li>
    </ol>
    <span v-if="isTouch" class="letter">{{current}}</span>
  </div>
   <div ref="mask" :class="['mask',mask?'show':'hide']">
      <v-touch @swiperight="right" class="myTouch">
        <ul v-for="item in maskList" :key="item.GroupId">
          <li>
            <h4>{{item.GroupName}}</h4>
            <ol>
              <li class="maskLi" v-for="val in item.GroupList" :key="val.SerialID">
                <img class="picture" :src="val.Picture" />
                <p>
                  <span class="aliasName">{{val.AliasName}}</span>
                  <span class="price">{{val.DealerPrice}}</span>
                </p>
              </li>
            </ol>
          </li>
        </ul>
      </v-touch>
    </div>
</div>
  
</template>

<script lang="ts">
import Vue from "vue";
import BScroll from "better-scroll";

import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
export default Vue.extend({
  name: "home",
  components: {},
  data() {
    return {
      mask: false,
      current: "",
      isTouch: false
    };
  },
  computed: {
    ...mapState({
      list: (state: any) => state.home.list,
      maskList: (state: any) => state.home.maskList
    })
  },
  methods: {
    ...mapActions({
      getList: "home/getList",
      getDetail: "home/getDetail"
    }),
    //楼层
    toList(ind: number) {
       this.current = Object.keys(this.list)[ind];
      this.bscroll.scrollTo(0, -this.$refs.tit[ind].offsetTop);
    },
    //弹抽屉
    toMask(id: string) {
      this.mask = true;
      this.getDetail(id);
    },
    //右滑
    right() {
      this.mask = false;
    },
    //滑过列表
    touchStart(e: Event): void {
      this.isTouch = true;
    },
    touchMove(e: Event): void {
      // console.log('e...', e);
      let pageY = e.touches[0].pageY;
      let letterHeight = ((0.4 * window.innerWidth) / 750) * 100;
      let letterOffsetTop =
        (window.innerHeight - letterHeight * Object.keys(this.list).length) / 2;
      let letterIndex = Math.floor((pageY - letterOffsetTop) / letterHeight);
      // 处理上边界
      if (letterIndex < 0) {
        letterIndex = 0;
      }
      // 处理下边界
      if (letterIndex > Object.keys(this.list).length - 1) {
        letterIndex = Object.keys(this.list).length - 1;
      }
      // console.log('letter...', Object.keys(this.list)[letterIndex]);
      this.current = Object.keys(this.list)[letterIndex];
      this.toList(letterIndex)
    },
    touchEnd(e: Event): void {
      this.isTouch = false;
      this.current = "";
    }
  },
  created() {
    this.getList();
  },
  mounted() {
    this.bscroll = new BScroll(this.$refs.wrap, {
      probeType: 2,
      tap: true
    });
  }
});
</script>
<style scoped lang="scss">
.wrap {
  flex: 1;
  position: relative;
 
  .main{
    width: 100%;
    height: 100%;
     overflow: hidden;
  }
}
ul {
  width: 100%;
  > li {
    width: 100%;
    h4 {
      width: 100%;
      height: 30px;
      padding-left: 20px;
      line-height: 30px;
      background: #eee;
      box-sizing: border-box;
      font-size: 0.29rem;
    }
    ol li {
      padding-left: 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      display: flex;
      height: 1rem;
      align-items: center;
      img {
        height: 35px;
      }
      p {
        display: flex;
        flex-direction: column;
        padding-left: 20px;
        font-size: 0.32rem;
      }
    }
  }
}
.fixed {
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  li {
    color: #666;
    font-weight: 500;
    padding: 2px 10px;
    font-size: 0.24rem;
  }
}
.mask {
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  height: 100%;
  background: #fff;
  z-index: 111;
  padding-left: 3px;
  box-sizing: border-box;
  overflow-y: auto;
  border-left: 1px solid #eee;
  &.show {
    transform: translateX(0);
    transition: all 1s;
  }
  &.hide {
    transform: translateX(100%);
    transition: all 1s;
  }
  .maskLi {
    height: 75px;
  }
  .picture {
    height: 70px;
  }
  .aliasName {
    font-size: 0.34rem;
    color: #5f687a;
  }
  .price {
    margin-top: 0.1rem;
    font-size: 0.28rem;
    color: red;
  }
}
.myTouch {
  touch-action: pan-y !important;
}
 .letter{
    display: inline-block;
    width: 1.6rem;
    height: 1.6rem;
    background: rgba(0,0,0, .6);
    border-radius: .1rem;
    top: 50%;
    left: 50%;
    position: fixed;
    color: #fff;
    font-size: .8rem;
    text-align: center;
    line-height: 1.6rem;
    transform: translate3d(-50%, -50%, 0);
  }
</style>
