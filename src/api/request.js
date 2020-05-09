import axios from 'axios'
import { Toast } from 'vant'
var service =  axios.create({
    baseURL:"/mz",       //所有请求都带/mz
    // timeout:2000,
    headers:{
        'content-type': "application/json",
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15881389022555505541202","bc":"310100"}'
    }
})
// axios.defaults.baseURL = "/mz" //所有请求都带/mz
// axios.defaults.timeout = 2000 //设置请求超时时间
// axios.defaults.headers = {
//     'content-type': "application/json",
//     'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15881389022555505541202","bc":"310100"}'
// }
var toast = null;
// 拦截器
service.interceptors.request.use(config => {
    toast = Toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner"
    });
    return config;
})

service.interceptors.response.use(res => {
    toast.clear();
    return res
})
export default service;