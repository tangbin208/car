<template>
  <div class="wrap">
    <div class="top">
      <span>颜色</span>|
      <span>车款</span>
    </div>
    <ul class="list" v-for="item in pictureList" :key="item.Id">
      <li v-for="(val,index) in item.List" :key="index">
        <img :src="val.Url" alt />
         <p v-if="index===0" :class="index===0?'active':''" @click="toDetail(item.Id)">
          <span>{{item.Name}}</span>
          <span>{{item.Count}}张></span>
        </p>
      </li>
      
    </ul>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
export default Vue.extend({
  props: {},
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState({
      pictureList: (state: any) => state.home.pictureList
    })
  },
  methods: {
    ...mapActions({
      getPicture: "home/getPicture",
      toDetail:"home/toDetail"
    }),
  },
  created() {
    this.getPicture();
  },
  mounted() {}
});
</script>
<style scoped lang="scss">
.wrap {
  flex: 1;
  background: #f4f4f4;
}
.top {
  width: 100%;
  height: 40px;
  display: flex;
  font-size: 0.32rem;
  align-items: center;
  background: #fff;
  color: #454545;
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
      top:0;
      left:0;
      background: rgba(0,0,0,.3);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: .28rem;
      color: #fff;
    }
  }
}
</style>