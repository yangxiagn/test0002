import { request } from "../../../request.js";
// 获取课程列表
export let getCourseBase = (params) => {
    return request('GET', '/api/base/rc/course', params);
};
//根据年度和学期查询任教班级和课程--年度学期可以为不必填项
export let getCourseNameClass = (params) => {
    return request('GET', '/api/base/rc/teacher/teacher_grade_course', params);
};
//GET /lib/catalog/list 查询题库编目树-根据年级，课程，和学期（学期不是必填项）
export let getCataloglList = (params) => {
    return request('GET', '/api/base/lib/catalog/list', params);
};
//根据课程类型获取资源类型
export let getResourceTypeList = (params) => {
    return request('GET', '/api/rc/resource_type/' + params);
};
//根据unitId、年级value,课程value--获取知识点
export let getKnowpointTree = (params) => {
    return request('GET', '/api/base/knowpoint/find/tree', params);
};
//获取上传设置的限制
export let getRoutineManage = (params) => {
    return request('GET', '/api/rc/routineManage', params);
};
//选择已有标签
export let getLabelList = (params) => {
    return request('GET', '/api/rc/label', params);
};
//基础资源保存
export let saveBaseRc = (params) => {
    return request('PUT', '/api/rc/resource/upload/basic', params);
};