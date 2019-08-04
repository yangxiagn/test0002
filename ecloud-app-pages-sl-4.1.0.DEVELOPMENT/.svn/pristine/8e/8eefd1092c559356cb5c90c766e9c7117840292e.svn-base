import config from "./config.js";
let request = config.request;
export const ERR_OK = 'ok'
// 日志查询type==2表示登录日志==1表示普通日志
export let getlogList = (params) => {
    return request('GET', '/api/logging/logging', params);
};
export let deleteLog = (params) => {
    return request('POST', '/api/logging/logging/' + params);
};
//  获取模块数据
export function getAppModule() {
  let url = `/api/base/resource/application_module`
  const params = Object.assign({}, {})
  return request('get', url, params)
}

//  根据code获取当前用户资源树
export function getResTree(param) {
  let url = `/api/base/resource/code/tree`
  const params = Object.assign({}, {
    code: param.code,
    flag: 1
  })
  return request('get', url, params)
}

//  增加资源
export function addRes(param) {
  let url = `/api/base/resource`
  const params = Object.assign({}, {
    parentId: param.parentId,
    name: param.name,
    opener: param.opener,
    indexUrl: param.indexUrl,
    sort: param.sort
  })
  return request('post', url, params)
}

//  修改资源
export function editRes(param) {
  let url = `/api/base/resource`
  const params = Object.assign({}, {
    id: param.id,
    name: param.name,
    opener: param.opener,
    indexUrl: param.indexUrl,
    sort: param.sort
  })
  return request('put', url, params)
}

//  删除资源
export function delRes(param) {
  let url = `/api/base/resource/` +  `${param.id}`
  const params = Object.assign({}, {})
  return request('DELETE', url, params)
}

//  添加时校验
export function checkAdd(param) {
  let url = `/api/base/resource/check`
  const params = Object.assign({}, {
    name: param.name,
    parentId: param.parentId
  })
  return request('get', url, params)
}

//  修改时校验
export function checkEdit(param) {
  let url = `/api/base/resource/check`
  const params = Object.assign({}, {
    flag: true,
    name: param.name,
    parentId: param.parentId,
    id: param.id
  })
  return request('get', url, params)
}

//  根据id查询当前资源
export function getResById(param) {
  let url = `/api/base/resource/id`
  const params = Object.assign({}, {
    id: param.id
  })
  return request('get', url, params)
}


// GET /role 查询单位服务下所有角色
export let getRoleList = (serviceId, unitId) => {
    return new Promise((resolve, reject) => {
        request('get', '/api/base/role', { unitId, serviceId }).then((data) => {
            if(data.status == 200){
                resolve(data.data);
            }else{
                reject(data.fieldErrors);
            }
        }).catch(err=>{
            reject(err);
        });
    })
}

// GET /orgTree/{unitId}单位部门树节点查询
export let getOrgTree = (unitId) => {
    return new Promise((resolve, reject) => {
        request('get', '/api/base/orgTree/'+unitId, {}).then((data) => {
            if(data.status == 200){
                resolve(data.data);
            }else{
                reject(data.fieldErrors);
            }
        }).catch(err=>{
            reject(err);
        });
    })
}

// POST /role/res/all insertResRAl
export let saveRoleByRc = (obj) => {
    return new Promise((resolve, reject) => {
        request('post', '/api/base/role/res/all', obj, false).then((data) => {
            if(data.status == 200){
                resolve(data.data);
            }else{
                reject(data.fieldErrors);
            }
        }).catch(err=>{
            reject(err);
        });
    })
}

// GET /role/res/resource_data 查询资源下的信息(用户，组织，角色)
export let getRoleByRc = (unitId, resourceIds) => {
    return new Promise((resolve, reject) => {
        request('post', '/api/base/role/res/resource_data', {unitId, resourceIds}).then((data) => {
            if(data.status == 200){
                resolve(data.data);
            }else{
                reject(data.fieldErrors);
            }
        }).catch(err=>{
            reject(err);
        });
    })
}

// POST /role *新增角色
export let addRoles = (obj) => {
    return new Promise((resolve, reject) => {
        request('POST', '/api/base/role', obj).then((data) => {
            if(data.status == 200){
                resolve(data.data);
            }else{
                reject(data.fieldErrors);
            }
        }).catch(err=>{
            reject(err);
        });
    })
}

//POST /org/res *组织资源授权
export let saveOrgResource = (obj) => {
    return new Promise((resolve, reject) => {
        request('post', `/api/base/org/res`, obj).then((data) => {
            if(data.status == 200){
                resolve(data.data);
            }else{
                reject(data.fieldErrors);
            }
        }).catch(err=>{
            reject(err);
        });
    })
}

// GET /org_resource/choice/{orgId}/{serviceId} *组织资源授权的选中的id集合
export let getOrgResource = (orgId, serviceId) => {
    return new Promise((resolve, reject) => {
        request('get', `/api/base/org_resource/choice/${orgId}/${serviceId}`, {}).then((data) => {
            if(data.status == 200){
                resolve(data.data);
            }else{
                reject(data.fieldErrors);
            }
        }).catch(err=>{
            reject(err);
        });
    })
}

// GET /user/res *用户资源查询
export let getUserResource = (unitId, userId, serviceId) => {
    return new Promise((resolve, reject) => {
        request('get', `/api/base/user/res`, {unitId, userId, serviceId}).then((data) => {
            if(data.status == 200){
                resolve(data.data);
            }else{
                reject(data.fieldErrors);
            }
        }).catch(err=>{
            reject(err);
        });
    })
}
// POST /user/res *用户资源授权
export let saveUserResource = (obj) => {
    return new Promise((resolve, reject) => {
        request('post', `/api/base/user/res`, obj).then((data) => {
            if(data.status == 200){
                resolve(data.data);
            }else{
                reject(data.fieldErrors);
            }
        }).catch(err=>{
            reject(err);
        });
    })
}
// 查询是否重名
export let checkNameIsRepeat = (unitId, name) => {
    return request('get', '/api/base/role/same', { unitId, name });
};

// 通过id查询角色
export let getRoleById = (id) => {
    return request('get', '/api/base/role/' + id, '');
};

// 修改角色
export let updataRole = (params) => {
    return request('put', '/api/base/role', params);
};

// 删除角色
export let deleteRoles = (ids) => {
    return request('post', '/api/base/role/batch', { ids });
}

// 锁定角色
export let lockRole = (ids) => {
    return request('put', '/api/base/role/lock', { ids });
};

// 激活角色
export let unlockRole = (ids) => {
    return request('put', '/api/base/role/unlock', { ids });
};

// 查询角色资源
export let getRoleRresMinix = (roleIds, unitId) => {
    return request('get', '/api/base/role/res', { roleIds, unitId });
};

// 角色资源授权
export let roleRresMinix = (unitId, roleIds, resIds) => {
    return request('post', '/api/base/role/res', { unitId, roleIds, resIds });
};
// /api/base/selectusers/userGroups
export let getUserGroups = (obj) => {
    return new Promise((resolve, reject) => {
        request('get', `/api/base/selectusers/userGroups`, obj).then((data) => {
            if(data.status == 200){
                resolve(data.data);
            }else{
                reject(data.fieldErrors);
            }
        }).catch(err=>{
            reject(err);
        });
    })
}
// 查询学生 /api/base/selectusers/userByGroup
export let getUserList = (obj) => {
    return new Promise((resolve, reject) => {
        request('get', `/api/base/selectusers/userByGroup`, obj).then((data) => {
            if(data.status == 200){
                resolve(data.data);
            }else{
                reject(data.fieldErrors);
            }
        }).catch(err=>{
            reject(err);
        });
    })
}