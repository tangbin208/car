import axios from '@/utils/request';

interface Response{
  data: any;
  code: number;
  msg: string;
}
// 获取当地经销商列表
export function getDealerList (carId: string,cityId: string) : Promise<Response> {
  return axios.get(`/v2-dealer-alllist.html`,{
		params:{
			carId ,cityId,
		}
	});
}
// 获取当前城市
export function getCityId () : Promise<Response> {
  return axios.get(`/location-client.html`);
}

// 获取省列表
export function getProvinceList () : Promise<Response> {
  return axios.get(`/v1-city-alllist.html`);
}

// 获取市列表
export function getCityList (provinceid: string) : Promise<Response> {
  return axios.get(`/v1-city-alllist.html`,{
    params:{
      provinceid
    }
  });
}
/**提交报价h2-submit-lowprice.html
 * 
 * carid  132101
 * mobile 18888888888
 * name 啊啊啊
 * dealerids  100107482,100049178,100042570
 * location  北京
 * carname  2019款无畏号
 * locationid 201
 * 
 */
export function submitLowPrice (params: any) : Promise<Response> {
  return axios.get(`/h2-submit-lowprice.html`,{
    params
  });
}
