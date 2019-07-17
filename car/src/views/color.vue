<template>
  <div class="wrap">
    <div class="top">
      <h5  @click="toPicture({Name:'全部颜色'})">全部颜色</h5>
    </div>
    <div class="nav">
      <p>
        <span
          v-for="(item,index) in (Object.keys(allColor)).reverse()"
          :key="index"
          @click="tabs(item,index)"
          :class="index===ind?'active':''"
        >{{item}}</span>
      </p>
      <ul>
        <li v-for="val in Object.values(allColor[item])" :key="val.ColorId" @click="toPicture(val)">
          <span :style="{background:val.Value}"></span>
          {{val.Name}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
export default Vue.extend({
  props: {},
  components: {},
  data() {
    return {
      item: "2017",
      ind:0
    };
  },
  computed: {
    ...mapState({
      allColor: (state: any) => state.picture.allColor
    })
  },
  methods: {
    ...mapActions({
      getAllColor: "picture/getAllColor",
    }),
    tabs(val: string,ind:number) {
      this.item = val;
      this.ind=ind
    },
    toPicture(val){
      this.$router.push({
        name:"picture",
        params:val
      })
    }
  },
  created() {
    this.getAllColor();
  },
  mounted() {}
});
</script>
<style scoped lang="scss">
.wrap {
  flex: 1;
  background: #f4f4f4;
  overflow: hidden;
}
.top {
  width: 100%;
  h5 {
    height: 0.8rem;
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.34rem;
    background: #fff;
    margin: 0.15rem 0;
    color: #00afff;
    font-weight: 400;
  }
}
.nav {
  width: 100%;

  p {
    margin-top: 0.15rem;
    padding-left: 0.2rem;
    font-size: 0.3rem;
    line-height: 0.76rem;
    height: 0.76rem;
    background: #fff;
    overflow-x: scroll;
    margin-bottom: 6px;
    span {
      padding-right: 0.42rem;
      &.active{
        color: #00afff;
      }
    }
  }

  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    background: #fff;
    padding: 0 .2rem;
    box-sizing: border-box;
    li {
      width: 47%;
      font-size: 0.32rem;
      line-height: 0.68rem;
      border: 1px solid #3aacff;
      box-sizing: border-box;
      margin: 0.2rem .1rem;
      border-radius: 0.05rem;
      display: flex;
      align-items: center;
      span {
        width: 0.4rem;
        height: 0.4rem;
        margin-left: 0.2rem;
        vertical-align: -12%;
        box-sizing: border-box;
        border: 1px solid #818181;
        margin-right: 8px;
      }
    }
  }
}
</style>