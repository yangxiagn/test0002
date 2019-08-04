import {
    request
} from "../../request.js";

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

// GET /student/select_student/by_parent_id 查询学生年级和课程--家长用
export let getGradeCourseBstudentID = () => {
    return new Promise((resove, reject) => {
        request("get", "api/base/student/select_student/by_parent_id", {}).then(res => {
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

// POST /find_student_learning_time 家长查询学生学习时长
export let find_student_learning_time = (obj) => {
    return new Promise((resove, reject) => {
        request("POST", "api/sl/find_student_learning_time", obj).then(res => {
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

// GET /sl_resorce/select_res_type_count 资源分布
export let select_res_type_count = (obj) => {
    return new Promise((resove, reject) => {
        request("GET", "api/sl/sl_resorce/select_res_type_count", obj).then(res => {
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

// GET /sl_resource/select_student_details 查询学生学习详情页
export let getSelect_student_details = (obj) => {
    return new Promise((resove, reject) => {
        request("GET", "api/sl/sl_resource/select_student_details", obj).then(res => {
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