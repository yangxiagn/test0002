import { request } from "../../request.js";

export let filesurl = window.ShiYue.base + '/api/storage'

// GET /show/avatar/{userId} 展示用户头像, 需要传入用户id， 前端必须判断， 不可以传入undefind
export let photourl = window.ShiYue.base + '/api/storage/show/avatar/'

// GET /sl_resorce/select_catalog/number 查询题库编目树
export let getCatalogList = (obj) => {
    return new Promise((resove, reject) => {
        request("get", "api/sl/sl_resorce/select_catalog/number", obj).then(res => {
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

// GET /sl_resorce/select_teacher/information 根据编目ID查询所有上传的资源
export let getResorceInformation = (obj) => {
    return new Promise((resove, reject) => {
        request("get", "api/sl/sl_resorce/select_teacher/information", obj).then(res => {
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

// GET /resource/details/{examId} 后台视频资源详情显示
export let getResourceDetails = (id) => {
    return new Promise((resove, reject) => {
        request("get", "api/rc/resource/details/"+ id, {}).then(res => {
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

// GET /select_student_questions_by_res_id 查询详情页学习答疑
export let select_student_questions_by_res_id = (obj) => {
    return new Promise((resove, reject) => {
        request("get", "api/sl/select_student_questions_by_res_id", obj).then(res => {
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

// POST /save_student_questions 新增学习答疑
export let save_student_questions = (obj) => {
    return new Promise((resove, reject) => {
        request("POST", "api/sl/save_student_questions", obj).then(res => {
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

// GET /sl_resource/select_teach_hw 根据编目ID查询所有上传的作业
export let getResorceSelectTeachHw = (obj) => {
    return new Promise((resove, reject) => {
        request("get", "api/sl/sl_resource/select_teach_hw", obj).then(res => {
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

// GET /sl_resource/select_teach_video 根据年级学科查询知识点微课
export let select_teach_video = (obj) => {
    return new Promise((resove, reject) => {
        request("get", "api/sl/sl_resource/select_teach_video", obj).then(res => {
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

// POST /save_course_detal_log 保存学生学科学习记录
export let save_course_detal_log = (obj) => {
    return new Promise((resove, reject) => {
        request("POST", "api/sl/save_course_detal_log", obj).then(res => {
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

// GET /term_and_year 根据单位id查询学年学期
export let getYearAndTerm = (obj) => {
    return new Promise((resove, reject) => {
        request("get", "api/base/term_and_year", {}).then(res => {
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

// POST /save_or_update_Online_Log 保存或修改学生学习情况
export let save_or_update_Online_Log = (obj) => {
    return new Promise((resove, reject) => {
        request("POST", "api/sl/save_or_update_Online_Log", obj).then(res => {
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

// POST /sl_res_progress/save_or_update_res_progress 新增或修改资源观看记录
export let save_or_update_res_progress = (obj) => {
    return new Promise((resove, reject) => {
        request("POST", "api/sl/sl_res_progress/save_or_update_res_progress", obj).then(res => {
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

// GET /sl_resource/select_error 根据编目ID查询错题
export let getErrorSelectTeachHw = (obj) => {
    return new Promise((resove, reject) => {
        request("get", "api/sl/sl_resource/select_error", obj).then(res => {
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