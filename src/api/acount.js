/**
 * Created by Administrator on 2018/8/6/006.
 */
import { fetch } from '@/utils/fetch';
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
        url: '/place_to_advertiser',
        method: 'post',
        data:  data,
    });
}
//获取账户下二级域名列表
export function place_account_domain(data) {
    return fetch({
        url: '/place_account_domain',
        method: 'get',
        params: data
    });
}
