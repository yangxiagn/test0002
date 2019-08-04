import { request } from "../../request.js";

// GET /lib/grade_course_role 根据角色查询所能看到的年级和课程
export let getCourseGrade = ()=>{
    return new Promise((resove,reject)=>{
        request("get", "api/base/lib/grade_course_role", {}).then(res=>{
            if(res.status == 200){
                resove(res.data)
            }else{
                reject(res);
            }
        }).catch(err=>{
            reject(err);
        });
    })
}

// GET /sl_resorce/select_catalog/number 查询题库编目树
export let getCatalogList = (obj)=>{
    return new Promise((resove,reject)=>{
        request("get", "api/sl/sl_resorce/select_catalog/number", obj).then(res=>{
            if(res.status == 200){
                resove(res.data)
            }else{
                reject(res);
            }
        }).catch(err=>{
            reject(err);
        });
    })
}

// GET /term_and_year 根据单位id查询学年学期
export let getTermAndYear = (obj={})=>{
    return new Promise((resove,reject)=>{
        request("get", "api/base/term_and_year", obj).then(res=>{
            if(res.status == 200){
                resove(res.data)
            }else{
                reject(res);
            }
        }).catch(err=>{
            reject(err);
        });
    })
}

//考试列表显示
export let selectList = (obj) => {
    return new Promise((resolve, reject) => {
        request('get', '/api/exam/examination/select_list', obj).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
}
//试卷列表显示
export let selectPaper = (obj) => {
    return new Promise((resolve, reject) => {
        request('get', '/api/exam/exam_list/select', obj).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
}
// 获得学年列表
export let getYearlist = (obj) => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/base/years/no_auth', obj).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject('error')
            }
        })
    })
    return result;
}
// 获得学期列表
export let getTermlist = (unitId, year) => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/base/term', { unitId, year }).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject('error')
            }
        })
    })
    return result;
}

//查询老师布置作业列表
export let selectMyHome = (obj) => {
    let result = new Promise((resolve, reject) => {
        request('GET', '/api/hw/zy_homework_exam/select_my', obj).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
    return result;
}
//校级作业
export let selectSchoolHome = (obj) => {
    let result = new Promise((resolve, reject) => {
        request('GET', '/api/hw/zy_homework_exam/select_school_level', obj).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
    return result;
}

//获取资源分类--不登录
export let getResourceTypeNoLogin = (params) => {
    return request("GET", "/api/rc/nologin/resource_type/selectResType", params);
}
/*高级搜索获取基础型课程数据*/
export function getBase(pamams) {
    return request("get", "/api/rc/nologin/resource/search/base_resource/", pamams);
}

// POST /sl_resorce/batch_save_sl_resource 设置课-练
export let saveBatchSlResoure = (obj) => {
    let result = new Promise((resolve, reject) => {
        request('POST', '/api/sl/sl_resorce/batch_save_sl_resource', obj, false).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
    return result;
}

// DELETE /sl_resorce/delete_sl_resource 删除资源
export let deleteBatchSlResoure = (id) => {
    let result = new Promise((resolve, reject) => {
        request('DELETE', '/api/sl/sl_resorce/delete_sl_resource?id='+id, {} ).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
    return result;
}

// POST /sl_resorce/update_resorce 
export let updataBatchSlResoure = (obj) => {
    let result = new Promise((resolve, reject) => {
        request('POST', '/api/sl/sl_resorce/update_resorce', obj).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
    return result;
}
// GET /sl_resorce/find_by_catalog_id 根据编目ID,年级，学科查询上传的资源--修改用
export let getBatchSlResoure = (obj) => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/sl/sl_resorce/find_by_catalog_id', obj ).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
    return result;
}