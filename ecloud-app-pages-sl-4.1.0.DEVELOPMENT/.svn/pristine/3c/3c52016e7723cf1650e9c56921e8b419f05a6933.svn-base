<template>
    <div v-loading="pageLoading">
        <div style="margin-bottom: 10px;">
            <el-select style="width: 120px;" v-model="queryList.gradeValue" 
                :placeholder="$store.state.lang.edu.t2 || '请选择年级'" @change="handleGradeChange">
                <el-option v-for="item in gradelist" :key="item.gradeValue" :label="item.gradeName" :value="item.gradeValue"></el-option>
            </el-select>
            <el-select style="width: 120px;margin: 0 10px;" v-model="queryList.clazzId" 
                :placeholder="$store.state.lang.edu.t3 || '请选择班级'"  @change="handleClzzChange">
                <el-option v-for="item in classlist" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-select style="width: 120px;margin-right: 10px;" v-model="queryList.courseValue" 
                :placeholder="$store.state.lang.edu.t18 || '请选择科目'" @change="handleCourseChange">
                <el-option v-for="item in courselist" :key="item.courseValue" :label="item.courseName" :value="item.courseValue"></el-option>
            </el-select>
            <el-input  style="width: 180px;" :placeholder="$store.state.lang.edu.t19 || '请输入学生姓名、学号'" icon="search" v-model="searchInput" :on-icon-click="handleIconClick"></el-input>
        </div>
        <el-table :data="studentDate" border class="count-table count-list">
            <el-table-column prop="studentNumber" :label="$store.state.lang.edu.t20 || '学号'" align="center"></el-table-column>
            <el-table-column prop="userName" :label="$store.state.lang.edu.t21 || '姓名'" align="center"></el-table-column>
            <el-table-column prop="onlineTime" :label="$store.state.lang.edu.t22 || '时间'" align="center"></el-table-column>
            <el-table-column prop="second" :label="$store.state.lang.edu.t23 || '在线时长'" align="center">
                <template scope="scope">
                    <span>{{scope.row.second + $store.state.lang.edu.t24 }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="recordedCount" :label="$store.state.lang.edu.t25 || '录播课堂数'" align="center"></el-table-column>
            <el-table-column prop="hwCount" :label="$store.state.lang.edu.t26 || '作业练习数'" align="center"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import { getCourseGradeTree, select_student_statistics } from "./request.js";
export default {
    data(){
        return {
            queryList: {
                gradeValue: '',
                clazzId: '',
                courseValue: ''
            },
            pageLoading: false,
            searchInput: '',
            gradelist: [],
            classlist: [],
            studentDate: []
        }
    },
    created () {
        this.init();
    },
    methods: {
        init(){
            this.getGradeClazzCoures();
        },
        // 查询 年级 班级 科目 联动
        getGradeClazzCoures(){
            getCourseGradeTree().then(res=>{
                this.gradelist = res || [];
                this.queryList.gradeValue = this.gradelist.length>0 ? this.gradelist[0].gradeValue : '';
            })
        },
        // n年级改变
        handleGradeChange(val){
            this.queryList.clazzId = '';
            this.queryList.courseValue = '';
            setTimeout(() => {
                for (let i = 0; i < this.gradelist.length; i++) {
                    if(this.gradelist[i].gradeValue == val){
                        this.classlist = this.gradelist[i].clazzs || [];
                        this.queryList.clazzId = this.classlist.length>0 ? this.classlist[0].id : '';
                        return
                    }
                }
            }, 50);
        },
        // 班级改变
        handleClzzChange(val){
            this.queryList.courseValue = '';
            setTimeout(() => {
                for (let i = 0; i < this.gradelist.length; i++) {
                    if(this.gradelist[i].gradeValue == this.queryList.gradeValue){
                        let clazzs = this.gradelist[i].clazzs;
                        if(clazzs){
                            for (let s = 0; s < clazzs.length; s++) {
                                if(clazzs[s].id == val){
                                    this.courselist = clazzs[s].courseListsVM || [];
                                    this.queryList.courseValue = this.courselist.length>0 ? this.courselist[0].courseValue : '';
                                    return
                                }
                            }
                        }
                        return
                    }
                }
            }, 50);
        },
        // 科目改变
        handleCourseChange(val){
            if(val){
                this.getData();
            }else{
                this.studentDate = [];
            }
        },
        handleIconClick(){
            this.getData();
        },
        // 获取数据
        getData(){
            this.pageLoading = true;
            select_student_statistics({
                gradeValue: this.queryList.gradeValue,
                classId: this.queryList.clazzId,
                courseValue: this.queryList.courseValue,
                keyWord: this.searchInput
            }).then(res=>{
                this.studentDate = res || [];
                this.pageLoading = false;
            }).catch(err=>{
                this.pageLoading = false;
            })
        }
    }
}
</script>

<style>

</style>
