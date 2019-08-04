import {
    request
} from "@/page/request.js";
// 手动保存 /zy_student_answer/manual_operation_save
export let saveHomeWork = (obj) => {
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
// 查询剩余时间 /zy_homework_exam/select_time_left/{id}
export let getTimeLefts = (id) => {
    return new Promise((resolve, reject) => {
        request('get', '/api/hw/zy_homework_exam/select_time_left/' + id).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
}
//学生查看作业
export let selectStudentById = (id) => {
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
// 自动保存 /zy_student_answer/automaticity_save
export let autoSaveHomeWork = (obj) => {
    return new Promise((resolve, reject) => {
        request('post', '/api/hw/zy_student_answer/automaticity_save', obj).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
}
// 加入错题本 /zy_student_answer/save_error_note
export let addErrorNote = (obj) => {
    return new Promise((resolve, reject) => {
        request('post', '/api/hw/zy_student_answer/save_error_note', obj).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
}
// 加入疑难本 /zy_student_answer/save_note
export let addIgnoreNote = (obj) => {
    return new Promise((resolve, reject) => {
        request('post', '/api/hw/zy_student_answer/save_note', obj).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
}