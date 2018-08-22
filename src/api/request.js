import { fetch } from '@/utils/fetch';
export function domain_list(data) {
    return fetch({
        url: '/domain_list',
        method: 'get',
        data:  data
    });
}
