import { fetch } from '@/utils/fetch';
//历史申请-------------------------------------------获取账户下二级域名列表
export function domain_list(data) {
    return fetch({
        url: '/domain_list',
        method: 'get',
        params: data
    });
}
//媒介一审
export function domain_shenhe1(data) {
    return fetch({
        url: '/domain_shenhe1?id='+data.id,
        method: 'post',
        data:  data,
    });
}
//媒介二审
export function domain_shenhe2(data) {
    return fetch({
        url: '/domain_shenhe2?id='+data.id,
        method: 'post',
        data:  data,
    });
}
//二审域名
export function upyumingstatus(data) {
    return fetch({
        url: 'api/account/upyumingstatus?id='+data.id,
        method: 'post',
        data:  data,
    });
}
//获取账户下落地页
export function page_list(data) {
    return fetch({
        url: '/page_list',
        method: 'get',
        params: data
    });
}
//媒介落地页1审
export function page_shenhe1(data) {
    return fetch({
        url: '/page_shenhe1?id='+data.id,
        method: 'post',
        data:  data,
    });
}
//落地页2审
export function page_shenhe2(data) {
    return fetch({
        url: '/page_shenhe2?id='+data.id,
        method: 'post',
        data:  data,
    });
}
//落地页二审
export function upyestatus(data) {
    return fetch({
        url: 'api/qudaoapi/upyestatus?id='+data.id,
        method: 'post',
        data:  data,
    });
}
//