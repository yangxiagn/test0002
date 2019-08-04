import {
    request
} from "@/page/request.js";

// 查询剩余时间 
export let getTimeLefts = (id) => {
    return new Promise((resolve, reject) => {
        request('get', '/api/exam/exam/select/time_left/' + id).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
}
// GET /examination/select_student_exam_type_by_groupid/{id} 学生查看考试--自主学习用
export let select_student_exam_type_by_groupid = (id) => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/exam/examination/select_student_exam_type_by_groupid/' + id).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
    return result;
}
//学生查看作业
export let selectStudentByIdHw = (id) => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/hw/zy_homework_exam/select_student_by_id/' + id).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
    return result;
}
//学生考试时查考试试题
export let selectStudentById = (id) => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/exam/examination/select_student_by_id/' + id).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
    return result;
}
// 自动保存 
export let autoSaveHomeWork = (obj) => {
    return new Promise((resolve, reject) => {
        request('post', '/api/exam/exam/automaticity_save', obj).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
}
// 手动保存 
export let saveHomeWork = (obj) => {
    return new Promise((resolve, reject) => {
        request('post', '/api/exam/exam/manual_operation_save', obj).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
}
// 手动保存 /zy_student_answer/manual_operation_save
export let saveHomeWorkHw = (obj) => {
    return new Promise((resolve, reject) => {
        request('post', '/api/hw/zy_student_answer/manual_operation_save', obj).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
}
//加入错题集
export let saveErrorNote = (obj) => {
    return new Promise((resolve, reject) => {
        request('post', '/api/exam/exam/save_error_note', obj).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
}
//加入疑难本
export let saveNote = (obj) => {
    return new Promise((resolve, reject) => {
        request('post', '/api/exam/exam/save_note', obj).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
}
//考试模板添加
export let examTemplate = (obj) => {
    return new Promise((resolve, reject) => {
        request('post', '/api/exam/exam_template', obj).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
}
//根据考试id查询考试
export let selectExamById = (id) => {
    return new Promise((resolve, reject) => {
        request('get', '/api/exam/examination/select_exam_by_id/' + id, {}).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
}
// 年级班级
export let getGradeCourses = () => {
    return new Promise((resolve, reject) => {
        request("get", "/api/base/nologin/grade_courses", {
            unitId: unitId
        }).then(
            data => {
                if (data && data.status == 200 && data.code == "ok") {
                    resolve(data.data);
                } else {
                    reject(data.fieldErrors);
                }
            }
        );
    });
};
export let userPhoto = window.ShiYue.base + '/api/storage/show/avatar/';
//学生进入考试
export let selectHwDetail = (id) => {
    return new Promise((resolve, reject) => {
        request('get', '/api/exam/examination/select_hw_detail/' + id).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
}
// GET /examination/select_student_exam_detail/{id} 根据考试id查询学生作业详情--自主学习用
export let selectEaxamDetail = (id) => {
    return new Promise((resolve, reject) => {
        request('get', '/api/exam/examination/select_student_exam_detail/' + id).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
}
//学生开始考试
export let startExam = (groupId) => {
    return new Promise((resolve, reject) => {
        request('post', '/api/exam/exam/answer_record/save', {
            groupId
        }).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
}