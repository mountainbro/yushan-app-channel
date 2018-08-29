import { fetch } from '@/utils/fetch';
//历史申请-------------------------------------------获取账户下二级域名列表
export function renewlist(data) {
    return fetch({
        url: '/api/qudaoapi/renewlist',
        method: 'get',
        params: data
    });
}
//获取返点
export function qd_addrenew(data) {
    return fetch({
        url: '/qd_addrenew/'+data.id,
        method: 'get',
    });
}

//新增续费
export function qd_addrenew_return(data) {
    return fetch({
        url: '/qd_addrenew_return',
        method: 'post',
        data:  data.data
    });
}
//审核

export function qd_renewshenhe1(data) {
    return fetch({
        url: '/qd_renewshenhe1/'+data.id,
        method: 'post',
        data:  data
    });
}
//审核媒体报价
export function qd_uprenewshowmoney(data) {
    return fetch({
        url: '/qd_uprenewshowmoney/'+data.id,
        method: 'post',
        data:  data
    });
}
//退款列表
export function qudao_tuikuanlist(data) {
    return fetch({
        url: '/qudao_tuikuanlist',
        method: 'post',
        data:  data
    });
}
//回款列表
export function qudao_backmoneylist(data) {
    return fetch({
        url: '/qudao_backmoneylist',
        method: 'post',
        data:  data
    });
}
//