import {getHomeData,getDetailData} from "../../server/home"
// 原始数据
const state={
   list:[],
   maskList:[],
}

//派生数据
const getters={
    
}
//异步改变
const actions={
    //获取楼层列表数据
    async getList({commit},payload){
        let data=await getHomeData()
        commit("updateList",data.data)
    },
    //获取首页抽屉数据
    async getDetail({commit},id:string){
      let data=await getDetailData(id)
      commit('updateMaskList',data.data)
    },
}
//同步改变
const mutations={
  updateList(state,payload){
        var arr = [];
        //过滤数据  获取字母
        payload.forEach(item => {
          const str = item.Spelling.slice(0, 1);
          if (arr.find(item => item === str)) {
            arr = arr;
          } else {
            arr.push(str);
          }
        });
    
        //添加对象
        var obj = {};
        arr.forEach(item => {
          obj[item] = [];
        });
    
        //获取字母对应的数据
        for (var i in obj) {
          if (payload.find(item => item.Spelling.slice(0, 1) === i)) {
            obj[i] = [
              ...obj[i],
              ...payload.filter(item => item.Spelling.slice(0, 1) === i)
            ];
          }
        }
        return state.list = obj;
      },
      updateMaskList(state,payload){
          state.maskList=payload
      },
}

export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}