import request from '../api';

// 模块中左侧导航栏目
export let getCodeMenuList = (code,model="base") => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/base/resource/user/code/tree', { code }, true, {headers: { 'Sy-Headers': 'device=pc;app='+model }}).then((data) => {
            resolve(data.data || []);
        });
    })
    return result
}

// 获得权限
export let getRcCodeList = (code, obj,model="base") => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/base/resource/user/code', { code }, true, {headers: { 'Sy-Headers': 'device=pc;app='+model }}).then((data) => {
            console.log(data);
            if (data && data.code === 'ok') {
                Object.keys(obj).forEach((_rc, i) => {
                    if (_.find(data.data, { code: _rc })) {
                        obj[_rc] = true;
                    }
                })
                resolve(true);
            } else {
                reject('error');
            }
        });
    })
    return result
};

// 获取个人信息
export let getDesktopSelfprops = (model="base") => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/base/desktop/selfprops', {}, true, {headers: { 'Sy-Headers': 'device=pc;app='+model }}).then((data) => {
            console.log('----------', data);
            if (data && data.code === 'ok') {
                resolve(data);
            } else {
                reject('error');
            }
        });
    })
    return result
};