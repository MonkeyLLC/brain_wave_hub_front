import axios from 'axios';
import {useLogin} from "@/stores/login.js";
// 创建axios实例
const httpInstance = axios.create({
    baseURL: 'http://localhost:6601',
    timeout: 50000,
    withCredentials: true
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
    return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    //console.log('e', e);
    let status = e.response.status;
   // console.log('status', status);
    if (status === 401) {
       // alert('登录过期，请重新登录');
      //  useLogin().loginState = false;
        localStorage.setItem('loginState', '0');
   /*     let state = localStorage.getItem('loginState');
        if (state !== '0') {
            location.reload()
        }*/
       // location.reload()
    } else {
        return e;
    }

}, function (error) {
    // 对响应错误做点什么
    console.log('error', error);
    return Promise.reject(error);
})
export default httpInstance; 