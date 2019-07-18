import {toDetailData,getAllColor,getCarImg} from "../../server/home"
// 原始数据
const state={
  pictureList:[],
  SerialID:"2593",
   detailPictureList:[],
   allColor:{},
   ImageID:null,
   
   isload:false
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
    async toDetail({commit,state},{ImageID=state.ImageID,ColorID,Page=1,PageSize=30}){
      if(Page===1){
        await commit("updateIsLoad",false)
      }
      if(state.isload)return
      commit("updateImageId",ImageID)
      let data= await toDetailData({
        SerialID:state.SerialID,
        ImageID:ImageID||state.ImageID,
        ColorID:ColorID||null,
        Page:Page,
        PageSize:PageSize
      })
      if(data.data.List.length<30){
           await commit("updateIsLoad",true)
      }
      if(Page>1){
        data.data={
          ...data.data,
          List:state.detailPictureList.List.concat(data.data.List)
        }
      }
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
    //改变page
    async getPage({dispatch},{ColorID,Page,PageSize}){
       await dispatch("toDetail",{Page,ColorID,PageSize})
    }
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
        console.log("id",id)
        state.ImageID=id
      },
      updataPage(state,page){
        state.Page=page
      },
      updateIsLoad(state,payload){
        console.log("state",payload)
        state.isload=payload
      }

}

export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}