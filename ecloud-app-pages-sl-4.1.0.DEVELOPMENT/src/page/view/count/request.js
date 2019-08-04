import {
    request
} from "../../request.js";

// GET /grade/clazz/course 查询当前单位下的年级班级和学科
export let getCourseGradeTree = () => {
    return new Promise((resove, reject) => {
        request("get", "api/base/grade/clazz/course", {}).then(res => {
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
        request("post", "api/sl/delete_student_questions", {
            ids
        }).then(res => {
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

// GET /nologin/grade_courses 根据单位查询所能看到的年级和课程
export let getGradeCoursesList = (obj) => {
    return new Promise((resove, reject) => {
        request("GET", "api/base/nologin/grade_courses", obj).then(res => {
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

// GET /rc/course 查询课程
export let getCourseList = (obj) => {
    return new Promise((resove, reject) => {
        request("GET", "api/base/rc/course", {}).then(res => {
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

// GET /select_second_statistics 按时长统计
export let select_second_statistics = (obj) => {
    return new Promise((resove, reject) => {
        request("GET", "api/sl/select_second_statistics", obj).then(res => {
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

// GET /select_student_statistics 按学生统计
export let select_student_statistics = (obj) => {
    return new Promise((resove, reject) => {
        request("GET", "api/sl/select_student_statistics", obj).then(res => {
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

// GET /sl_resorce/select_resource_and_hw 根据编目ID查询资源和作业
export let select_resource_and_hw = (obj) => {
    return new Promise((resove, reject) => {
        request("GET", "api/sl/sl_resorce/select_resource_and_hw", obj).then(res => {
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

// GET /sl_resorce/select_student_count 根据资源id查询完成数和未完成数
export let getCountSelectStudentCount = (obj) => {
    return new Promise((resove, reject) => {
        request("GET", "api/sl/sl_resorce/select_student_count", obj).then(res => {
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

// GET /sl_resource/select_hw_student/count 根据作业id查询完成数和未完成数
export let getCountSelectHwCount = (obj) => {
    return new Promise((resove, reject) => {
        request("GET", "api/sl/sl_resource/select_hw_student/count", obj).then(res => {
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