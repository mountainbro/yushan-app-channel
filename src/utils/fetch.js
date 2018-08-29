import axios from 'axios';
import store from '../store';
import { Message } from 'element-ui';
import NProgress from 'nprogress';
export function fetch(options) {
    return new Promise((resolve, reject) => {
            NProgress.start(); // 开启Progress
    const instance = axios.create({
        baseURL: process.env.BASE_API,
        headers: { 'Authorization':'Bearer '+store.getters.token }
    });
    instance(options).then(response => {
        const res = response.data;
    resolve(res);
    NProgress.done();
}).catch(error => {
        let msg = "发生异常错误,请刷新页面重试,或联系程序员";
    if(error.response && error.response.data && error.response.data.message){
        msg = error.response.data.message;
    }
    Message({
        message: msg,
        type: 'error',
        duration: 5 * 1000
    });
    reject(error);
    NProgress.done();
});
});
}
