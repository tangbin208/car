import axios from 'axios';



// 实现拦截器, 对请求进行统一判断
// 拦截器
// 请求拦截器
// 响应拦截器
const service = axios.create({
  baseURL: 'http://baojia.chelun.com/', // 叶文程的服务器
  // baseURL: "http://169.254.12.208:7001/",//唐小彬的服务器
  // baseURL: "http://169.254.78.4:7001/",//马进凯的服务器

  timeout: 5000,
});

// request interceptor 请求拦截
service.interceptors.request.use((config) => {
  // 判断是否有登录态


  return config;
}, Promise.reject);

// response interceptor 响应拦截

service.interceptors.response.use((response: {data: any  }) => {
  return response.data;
}, Promise.reject);
export default service;
// export const  getRequest=({url,params={}})=>{
//   return service({
// 		url,
//     method:'GET',
//     params
// 	})
// }
// export const  postRequest=({url,params={}})=>{
//   return service({
// 		url,
//     method:'POST',
//     data:params
// 	})
// }
// export const  putRequest=({url,params={}})=>{
//   return service({
// 		url,
//     method:'PUT',
//     data:params
// 	})
// }

// export const deleteRequest=({url,params={}})=>{
//   return service({
// 		url,
//     method:'DELETE',
//     params
// 	})
// }
