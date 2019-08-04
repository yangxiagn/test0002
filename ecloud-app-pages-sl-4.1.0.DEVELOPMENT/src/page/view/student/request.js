import { request } from "../../request.js";

// GET /select_student_learning_progress 学生查询学生学习记录
export let selectStudentLearningProgress = () => {
    return new Promise((resove,reject)=>{
        request("get", "api/sl/select_student_learning_progress", {}).then(res => {
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

// GET /select_student_course_details 学生或家长查询学生课程详情
export let select_student_course_details = () => {
    return new Promise((resove, reject) => {
        request("get", "api/sl/select_student_course_details", {}).then(res => {
            if (res.status == 200) {
                resove(res.data)
            } else {
                reject(res);
            }
        }).catch(err => {
            reject(err);
        });
    })
}

// POST /find_student_live_class_home 查询学生主页直播列表
export let find_student_live_class_home = (dayNumber) => {
    return new Promise((resove, reject) => {
        request("POST", "api/sl/find_student_live_class_home", {dayNumber}).then(res => {
            if (res.status == 200) {
                resove(res.data)
            } else {
                reject(res);
            }
        }).catch(err => {
            reject(err);
        });
    })
}
// POST /sl/live_class_page 学生或老师查看直播课堂列表
export let getList = (obj) => {
    return new Promise((resove, reject) => {
        request('post', '/api/sl/live_class_page', obj).then(res => {
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

// GET /select_sl_collect 查看收藏
export let getSelectCollect = (obj) => {
    return new Promise((resove, reject) => {
        request('get', '/api/sl/select_sl_collect', {}).then(res => {
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

// POST /delete_sl_collect 批量删除收藏
export let deleteCollect = (ids) => {
    return new Promise((resove, reject) => {
        request('POST', '/api/sl/delete_sl_collect', {ids}).then(res => {
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