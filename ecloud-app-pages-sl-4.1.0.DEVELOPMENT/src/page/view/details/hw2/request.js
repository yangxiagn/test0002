import {
    request
} from "@/page/request.js";

//错题重做
export let selectErrorTopic = (groupId) => {
    return new Promise((resolve, reject) => {
        request('get', '/api/hw/zy_student_exam/select_error_topic', {
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