import api from '@/api';
import config from '@/config.js';
export let request = (method, url, params, serializer = true) => {
    return api(method, url, params, serializer, {
        headers: {
            'Sy-Headers': 'device='+config.device+';app='+config.app
        }
    })
};

export let getLoginConfig = () => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/uaa/oauth/login/config').then(((data) => {
            if (data && data.code === 'ok') {
                resolve(data)
            } else {
                reject(data);
            }

        }))
    })
    return result
}