<template>
  <div class="wrap">
    <div class="top">
      <router-link to="/color" tag="span">{{color}}</router-link>|
      <router-link to="/type" tag="span">{{type}}</router-link>
    </div>
    <div class="main">
      <div v-if="isShow" class="pirture">
        <ul class="list" v-for="item in pictureList" :key="item.Id">
          <li v-for="(val,index) in item.List" :key="index"  @click="index!==0?toSwiper(item.Id):''">
            <img :src="val.Url" alt />
            <p v-if="index===0" :class="index===0?'active':''" @click="goToDetail(item.Id)">
              <span>{{item.Name}}</span>
              <span>{{item.Count}}张></span>
            </p>
          </li>
        </ul>
      </div>
      <div v-if="!isShow" class="img">
        <ul class="list">
          <li v-for="(val,index) in detailPictureList.List" :key="index">
            <img :src="val.Url" alt @click="toSwiper()" />
          </li>
        </ul>
      </div>
      <div v-if="!pictureList.length" class="mask">
        <img src="http://h5.chelun.com/2017/official/img/no-img.png" alt />
        <p>暂时还没有内容</p>
      </div>
    </div>
    <div v-if="isSwiper" class="swiper">
      <div class="swiper-container" ref="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in detailPictureList.List" :key="index">
            <img :src="item.Url" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import "swiper/dist/css/swiper.min.css";
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
export default Vue.extend({
  props: {},
  components: {},
  data() {
    return {
      isShow: true,
      color: "颜色",
      type: "车款",
      CarID: null,
      ColorID: null,
      isSwiper: false
    };
  },
  computed: {
    ...mapState({
      pictureList: (state: any) => state.picture.pictureList,
      detailPictureList: (state: any) => state.picture.detailPictureList
    })
  },
  methods: {
    ...mapActions({
      getPicture: "picture/getPicture",
      toDetail: "picture/toDetail",
      getColorPicture: "picture/getColorPicture",
      getSwiper: "picture/getSwiper"
    }),
    //图片详情
    goToDetail(ImageID: string) {
       this.isShow = false;
       this.toDetail(ImageID);
    },
    //图片轮播
    toSwiper(ImageID: string) {
      this.isSwiper = true;
      this.toDetail(ImageID);
    }
  },
  created() {
    // console.log(this.$route.params);
    this.color = this.$route.params.Name || this.color;
    let ColorID = this.$route.params.ColorId || null;
    let CarID = this.$route.params.CarID || null;
    // this.type=this.$route.params.CarID||null
    // console.log("cid",ColorID)
    this.getColorPicture({ ColorID, CarID });
  },
  updated(){
     new Swiper(this.$refs.swiper,{});
  },
  mounted() {
    this.$nextTick(() => {
     
      
    });
  }
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
  z-index: 10;
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
}
</style>