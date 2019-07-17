import {toDetailData,getAllColor,getCarImg} from "../../server/home"
// 原始数据
const state={
  pictureList:[],
  SerialID:"2593",
   Page:1,
   PageSize:30,
   detailPictureList:[],
   allColor:{},
   ImageID:Number
}

//派生数据
const getters={
    
}
//异步改变
const actions={
    //获取图片数据
    async getPicture({commit},id:string){
      let data= await getCarImg({
        SerialID:"2593"
      })
      commit("updatePicture",data.data)
    },
    async toDetail({commit,state},ImageID:string){
      console.log("imgId",ImageID)
      ImageID&&commit("updateImageId",ImageID)
      let data= await toDetailData({
        SerialID:state.SerialID,
        ImageID:ImageID||state.ImageID,
        Page:state.Page,
        PageSize:state.PageSize
      })
      commit("updateDetailPictureList",data.data)
    },
    //获取全部颜色
    async getAllColor({commit,state}){
      let data=await getAllColor(state.SerialID)
       commit("updateColor",data.data)
    },
    //根据条件获取图片
    async getColorPicture({commit},{SerialID,CarID,ColorID}){
      let data=await getCarImg({
        SerialID:SerialID||state.SerialID,
        ColorID:ColorID||null,
        CarID:CarID||null
      })
      commit('updatePicture',data.data)
    },
}
//同步改变
const mutations={
      //图片
      updatePicture(state,payload){
       payload=payload.map(item=>{
         item.List=item.List.map(val=>{
            val.Url=val.Url.replace("{0}",3)
            return val
          })
          return item
        })
        state.pictureList=payload
      },
      updateDetailPictureList(state,payload){
        let data=payload.List.map(item=>{
          item.Url=item.Url.replace("{0}",3)
           return item
         })
        payload.List=data
        state.detailPictureList=payload
      },
      updateColor(state,payload){
        state.allColor=payload
      },
      updateImageId(state,id=0){
        console.log("Id",id)
        state.ImageID=id
      }   

}

export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}