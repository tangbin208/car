import {getHomeData,getDetailData,getListPicture,toDetailData} from "../../server/home"
// 原始数据
const state={
   list:[],
   maskList:[],
   pictureList:[],
   carId:"2593",
   Page:1,
   PageSize:30,
   detailPictureList:[]
}

//派生数据
const getters={
    
}
//异步改变
const actions={
    //获取楼层列表数据
    async getList({commit},payload){
        let data=await getHomeData()
        commit("updataList",data.data)
    },
    //获取首页抽屉数据
    async getDetail({commit},id:string){
      let data=await getDetailData(id)
      commit('updataMaskList',data.data)
    },
    //获取图片数据
    async getPicture({commit},id:string){
      let data= await getListPicture("2593")
      commit("updataPicture",data.data)
    },
    async toDetail({commit,state},id:string){
      let data= await toDetailData({
        SerialID:state.carId,
        ImageID:id,
        Page:state.Page,
        PageSize:state.PageSize
      })
      data=data.data.List.map(item=>{
        item.Url=item.Url.replace("{0}",3)
         return item
       })
      commit("updataDetailPictureList",data)
    }

}
//同步改变
const mutations={
    updataList(state,payload){
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
      updataMaskList(state,payload){
          state.maskList=payload
      },
      //图片
      updataPicture(state,data){
       data=data.map(item=>{
         item.List=item.List.map(val=>{
            val.Url=val.Url.replace("{0}",3)
            return val
          })
          return item
        })
        state.pictureList=data
      },
      updataDetailPictureList(state,data){
        state.detailPictureList=data
      }

    
}

export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}