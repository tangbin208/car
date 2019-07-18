import request from "../utils/request"
//获取home的数据
export function getHomeData() {
	return request({
		url: '/v2-car-getMasterBrandList.html',
		method: 'GET',
	})
}
//获取home抽屉数据
export function getDetailData(id:string){
	return request({
		url:"/v2-car-getMakeListByMasterBrandId.html?MasterID="+id,
		method: 'GET',
		    
	})
}
//获取图片列表
export function getListPicture({SerialID}){
	return request({
		url:"/v2-car-getImageList.html?SerialID="+SerialID,
		method: 'GET',
	})
}
//获取图片详情数据  轮播
export function toDetailData(payload){
	return request({
		url:'/v2-car-getCategoryImageList.html?',
		method: 'GET',
		params:payload

	})
}
//获取全部颜色
export function getAllColor(id){
	return request({
		url:"/v2-car-getModelImageYearColor.html?SerialID="+id,
		method: 'GET',
	})
}

//按条件获取车型图片
export function getCarImg(payload){
	return request({
		url:'/v2-car-getImageList.html?',
		method:"GET",
		params:payload
	})
}
