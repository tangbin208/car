import axios from "axios";


//实现拦截器, 对请求进行统一判断
//拦截器
//请求拦截器
//响应拦截器
const service = axios.create({
  baseURL: "http://baojia.chelun.com/",//唐小彬的服务器
  timeout: 5000
});

// request interceptor 请求拦截
service.interceptors.request.use(config => {
  //判断是否有登录态


  return config;
}, Promise.reject);

// response interceptor 响应拦截
service.interceptors.response.use(response => {
  return response.data
}, Promise.reject);
export default service;