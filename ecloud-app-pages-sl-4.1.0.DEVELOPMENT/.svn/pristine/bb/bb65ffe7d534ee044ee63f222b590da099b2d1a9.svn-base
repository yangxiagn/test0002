import { request } from "../../request.js";

// GET /grade/clazz/course 查询当前单位下的年级班级和学科
export let getCourseGradeTree = ()=>{
    return new Promise((resove,reject)=>{
        request("get", "api/base/grade/clazz/course", {}).then(res => {
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

// GET /select_catelog_count_than 课堂资源
export let selectCatelogCountThan = (obj) => {
    return new Promise((resove, reject) => {
        request("get", "api/sl/select_catelog_count_than", obj).then(res => {
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

// GET /select_student_questions 查询老师首页学习答疑
export let selectStudentQuestions = (obj) => {
    return new Promise((resove, reject) => {
        request("get", "api/sl/select_student_questions", obj).then(res => {
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

// POST /delete_student_questions 批量删除学习答疑
export let deleteStudentQuestions = (ids) => {
    return new Promise((resove, reject) => {
        request("post", "api/sl/delete_student_questions", {ids}).then(res => {
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

// GET /find_history_date 查询历史月历
export let findHistoryDate = () => {
    return new Promise((resove, reject) => {
        request("get", "api/sl/find_history_date", {}).then(res => {
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

// GET /select_learning_count_statistics 按学习人数
export let select_learning_count_statistics = (obj) => {
    return new Promise((resove, reject) => {
        request("GET", "api/sl/select_learning_count_statistics", obj).then(res => {
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

// GET /sl_resource/select_update_res 查询第一个需要上传的课
export let select_update_res = (type) => {
    return new Promise((resove, reject) => {
        request("GET", "api/sl/sl_resource/select_update_res", {type}).then(res => {
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