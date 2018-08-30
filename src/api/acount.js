/**
 * Created by Administrator on 2018/8/6/006.
 */
import { fetch } from '@/utils/fetch';
//客户
export function place_advertiser_list(data) {
    return fetch({
        url: '/place_advertiser_list',
        method: 'get',
        params: data
    });
}
//账户管理
export function place_to_advertise(data) {
    return fetch({
        url: '/place_to_advertiser?per-page=10000',
        method: 'post',
        data:  data,
    });
}
//获取账户下二级域名列表
export function place_account_domain(data) {
    return fetch({
        url: '/place_account_domain/'+data.id,
        method: 'get',
        params: data
    });
}
//上传七牛获取token
export function getuptoken(data) {
    return fetch({
        url: '/api/public/getuptoken',
        method: 'get',
        params: data
    });
}
//二级域名解析提交
export function add_jiexi_url(data) {
    return fetch({
        url: 'api/account/add_jiexi_url',
        method: 'post',
        data:  data,
    });
}
//落地页需求提交
export function create_page_task(data) {
    return fetch({
        url: 'create_page_task',
        method: 'post',
        data:  data,
    });
}
