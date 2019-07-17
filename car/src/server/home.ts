import request from "../utils/request"

export function getHomeData() {
	return request({
		url: '/v2-car-getMasterBrandList.html',
		method: 'GET',
	})
}

export function getDetailData(id:string){
	return request({
		url:"/v2-car-getMakeListByMasterBrandId.html?MasterID="+id
		    
	})
}

export function getListPicture(id:string){
	return request({
		url:"/v2-car-getImageList.html?SerialID="+id
	})
}

export function toDetailData({SerialID,ImageID,Page,PageSize}){
	return request({
		url:`/v2-car-getCategoryImageList.html?SerialID=${SerialID}&ImageID=${ImageID}&Page=${Page}&PageSize=${PageSize}`
	})
}
