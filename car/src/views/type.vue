<template>
  <div class="wrap">
    <div class="top">
      <h5 @click="toPicture({car_name:'全部颜色'})" >全部车款</h5>
    </div>
    <div class="nav">
      <p>
        <span v-for="(item,index) in yearType" :key="index" class="active">{{item}}</span>
      </p>
      <ul v-for="(item,index) in sortArr" :key="index">
        <li>
          <h6>{{item.title}}</h6>
          <div v-for="val in item.list" :key="val.car_id" @click="toPicture(val)">
            <p class="first">
              <span>{{val.market_attribute.year}}款 {{val.car_name}}</span>
              <span>{{val.market_attribute.dealer_price_min}}起</span>
              
            </p>
            <p class="last">
                 <span>{{val.horse_power}}马力{{val.gear_num}}档{{val.trans_type}}</span>
                <span>指导价{{val.market_attribute.dealer_price_max}}</span>
            </p>
          </div>
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
      isShow: true
    };
  },
  computed: {
    ...mapGetters({
      sortArr:"car/sortArr",
      yearType:"car/yearType"
    })
  },
  methods: {
     ...mapMutations({
      getTypeId:"picture/getTypeId"
    }),
    toPicture(type:object){
      this.getTypeId(type)
      this.$router.push({
        name:"picture",
      })
    }
  },
  created() {},
  mounted() {
    console.log("arr",this.yearType)
  }
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
  > p {
    margin-top: 0.15rem;
    padding-left: 0.2rem;
    font-size: 0.3rem;
    line-height: 0.76rem;
    height: 0.76rem;
    background: #fff;
    overflow-x: scroll;
    span {
      padding-right: 0.42rem;
      &.active {
        color: #00afff;
      }
    }
  }
  ul {
    width: 100%;
    li {
      width: 100%;
      h6 {
        padding: 0 0.2rem;
        font-size: 0.24rem;
        color: #666;
        background: #eee;
        line-height: .5rem;
        font-weight: 400;
      }
      div {
        padding: 0.3rem;
        background: #fff;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
        p{
          display: flex;
          justify-content: space-between;
        }
        .first {
          width: 100%;
          span:first-child{
            width: 70%;
          font-size: 0.3rem;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          }
          span:last-child{
            color: red;
            font-size: .26rem
          }
        }
        .last {
          padding-top: 0.1rem;
          font-size: 0.24rem;
          span:first-child{
            width: 60%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          }
          span{
            color: #b3b3b3;
          }
        }
      }
    }
  }
}
</style>