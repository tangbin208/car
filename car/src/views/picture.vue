<template>
  <div class="wrap">
    <div class="top">
      <router-link to="/color" tag="span">{{this.color.Name||'颜色'}}</router-link>|
      <router-link to="/type" tag="span">{{type}}</router-link>
    </div>
    <div v-if="isShow" v-show="!isSwiper" class="main">
      <!-- 图片列表   -->
      <div class="pirture">
        <ul class="list" v-for="item in pictureList" :key="item.Id">
          <li
            v-for="(val,index) in item.List"
            :key="index"
            @click="index!==0?goToDetail(true,item.Id,index):''"
          >
            <img :src="val.Url" alt />
            <p v-if="index===0" :class="index===0?'active':''" @click="goToDetail(false,item.Id)">
              <span>{{item.Name}}</span>
              <span>{{item.Count}}张></span>
            </p>
          </li>
        </ul>
      </div>
      <!-- 没有更多内容   -->
      <div v-if="!pictureList.length" class="mask">
        <img src="http://h5.chelun.com/2017/official/img/no-img.png" alt />
        <p>暂时还没有内容</p>
      </div>
    </div>
    <!-- 图片详情   -->
    <div v-if="!isShow" class="main" ref="imgList" @scroll="imgList">
      <ul class="list" ref="imgListScroll">
        <li v-for="(val,index) in detailPictureList.List" :key="index">
          <img :src="val.Url" alt @click="goToDetail(true,detailPictureList.Id,index)" />
        </li>
      </ul>
    </div>
    <!-- 轮播   -->
    <div v-show="isSwiper" class="swiper">
      <div class="swiper-container" ref="swiper">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(item,index) in detailPictureList.List"
            :key="index"
            @click="removeSwiper"
          >
            <img :src="item.Url" alt />
          </div>
        </div>
      </div>
      <span class="count">{{swiperIndex}}/{{detailPictureList.Count}}</span>
      <span class="price">询最低价</span>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
export default Vue.extend({
  props: {},
  components: {},
  data() {
    return {
      isShow: true, //控制图片详情显隐
      color: {
        Name: "颜色"
      },
      type: "车款",
      CarID: null,
      ColorID: null,
      isSwiper: false, //控制轮播图显隐
      swiperIndex: 1,
      Page: 1,
      PageSize: 30,
      count:0
    };
  },
  computed: {
    ...mapState({
      pictureList: (state: any) => state.picture.pictureList,
      detailPictureList: (state: any) => state.picture.detailPictureList,
    })
  },
  methods: {
    ...mapActions({
      getPicture: "picture/getPicture",
      toDetail: "picture/toDetail",
      getColorPicture: "picture/getColorPicture",
      getSwiper: "picture/getSwiper",
      getPage: "picture/getPage"
    }),
    //图片详情
    goToDetail(isSwiper: number, ImageID: string, ind: number) {
     
      if (!isSwiper) {
        this.isShow = false;
      } else {
        this.mySwiper(ind);
      }
       this.toDetail({ ImageID, ColorID: this.color.ColorId});
    },
    //轮播图
    mySwiper(ind: number) {
      let that = this;
      that.isSwiper = true;
      that.$nextTick(() => {
        let mySwiper = new Swiper(that.$refs.swiper, {
          observer: true,
          on: {
            slideChangeTransitionEnd: function() {
              //切换结束时，告诉我现在是第几个slide
              that.swiperIndex = this.activeIndex + 1;
              if (that.swiperIndex === that.Page * that.PageSize - 5) {
                that.getPage({
                  ColorID: that.color.ColorId
                });
              }
            }
          }
        });
        mySwiper.slideTo(ind, 1); //切换到第一个slide
      });
    },
    //隐藏swiper
    removeSwiper() {
      this.isSwiper = false;
    },
    //上拉加载
    imgList() {
      //可滚动容器的高度
      let innerHeight = this.$refs.imgListScroll.clientHeight;
      //屏幕尺寸高度
      let outerHeight = this.$refs.imgList.clientHeight;
      //可滚动容器超出当前窗口显示范围的高度
      let scrollTop = this.$refs.imgList.scrollTop;
      //scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时，出现innerHeight < (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
      //console.log(innerHeight + " " + outerHeight + " " + scrollTop);
      if (innerHeight < outerHeight + scrollTop) {
        //加载更多操作
        let timer = 0;
        clearTimeout(timer);
        timer = setTimeout(() => {
          this.getPage({
            ColorID: this.color.ColorId,
            Page:++this.Page,
            PageSize:this.PageSize
          });
        }, 500);
      }
    }
  },
  created() {
    // console.log(this.$route.params);
    this.color = this.$route.params;
    console.log(this.color);
    let ColorID = this.$route.params.ColorId || null;
    let CarID = this.$route.params.CarID || null;
    // this.type=this.$route.params.CarID||null
    // console.log("cid",ColorID)
    this.getColorPicture({ ColorID, CarID });
  },
  updated() {},
  mounted() {}
});
</script>
<style scoped lang="scss">
.wrap {
  flex: 1;
  background: #f4f4f4;
  display: flex;
  flex-direction: column;
}
.main {
  flex: 1;
  overflow-y: auto;
  position: relative;
  .imgList {
    width: 100%;
    height: 100%;
  }
}
.top {
  width: 100%;
  height: 40px;
  display: flex;
  font-size: 0.32rem;
  align-items: center;
  background: #fff;
  color: #454545;
  border-bottom: 6px solid #f4f4f4;
  span {
    flex: 1;
    text-align: center;
  }
}
.list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  li {
    width: 32.5%;
    margin-right: 0.06rem;
    margin-bottom: 0.06rem;
    height: 2.46rem;
    box-sizing: border-box;
    padding: 0;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .active {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 0.28rem;
      color: #fff;
    }
  }
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  background: #f4f4f4;
  width: 100%;
  height: 100%;
  text-align: center;
  img {
    width: 1.74rem;
    margin-top: 3rem;
  }
  p {
    font-size: 0.24rem;
    color: silver;
  }
}
.swiper {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  z-index: 111;
  .swiper-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    height: 240px;
    z-index: 9;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .count {
    position: absolute;
    bottom: 10px;
    left: 50%;
    color: #fff;
    font-size: 0.32rem;
    width: 100px;
    margin-left: -50px;
    text-align: center;
    z-index: 133;
  }
  .price {
    position: absolute;
    right: 10px;
    bottom: 5px;
    color: #fff;
    font-size: 0.25rem;
    line-height: 0.2rem;
    background: #3aacff;
    padding: 8px;
  }
}
</style>