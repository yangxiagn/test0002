import { request } from "../../request.js";
// avatar
export let showImgUrl = window.ShiYue.base + '/api/storage/show/thumbnail/';

// POST /sl/live_class_page 学生或老师查看直播课堂列表
export let getList = (obj) => {
    return new Promise((resove,reject)=>{
        request('post', '/api/sl/live_class_page', obj).then(res => {
            if(res.status == 200){
                resove(res.data)
            }else{
                reject(res)
            }
        }).catch(err=>{
            reject(err)
        })
    })
}

export let getGradeCourseList = unitId => {
    return request("GET", "/api/base/lib/grade_course_role");
};

// POST /sl/save_live_class 新增直播课堂
export let saveLive = (obj) => {
    return new Promise((resove, reject) => {
        request('post', '/api/sl/save_live_class', obj, false).then(res => {
            if (res.status == 200) {
                resove(res.data)
            } else {
                reject(res)
            }
        }).catch(err => {
            reject(err)
        })
    })
}
// POST /sl/delete_live_class 删除直播课堂
export let deleteLive = (id) => {
    return new Promise((resove, reject) => {
        request('post', '/api/sl/delete_live_class', {id}).then(res => {
            if (res.status == 200) {
                resove(res.data)
            } else {
                reject(res)
            }
        }).catch(err => {
            reject(err)
        })
    })
}
// POST /sl/update_live_class 修改直播课堂
export let updateLive = (obj) => {
    return new Promise((resove, reject) => {
        request('post', '/api/sl/update_live_class', obj, false).then(res => {
            if (res.status == 200) {
                resove(res.data)
            } else {
                reject(res)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

// POST /find_live_class_by_id 根据直播id查询详情
export let getDetailsById = (id) => {
    return new Promise((resove, reject) => {
        request('post', '/api/sl/find_live_class_by_id', {id}).then(res => {
            if (res.status == 200) {
                resove(res.data)
            } else {
                reject(res)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

// POST /find_situation_by_status 根据观看状态查询学生列表
export let find_situation_by_status = (obj) => {
    return new Promise((resove, reject) => {
        request('post', '/api/sl/find_situation_by_status', obj).then(res => {
            if (res.status == 200) {
                resove(res.data)
            } else {
                reject(res)
            }
        }).catch(err => {
            reject(err)
        })
    })
}