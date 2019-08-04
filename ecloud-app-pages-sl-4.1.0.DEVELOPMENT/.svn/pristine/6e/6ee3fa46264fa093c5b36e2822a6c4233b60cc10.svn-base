<template>
    <div class="sy-app-container">
        <sy-grad-4>
            <div slot="headerRight" style="line-height:40px;" v-if="$store.state.userType == 2">
                <el-button class="tele-button" v-if="activeName == 'first'" @click="handleOpen">{{$store.state.lang.edu.t69 ||"直播安排"}}</el-button>
                <el-tabs v-model="activeName" style="display: inline-block;" @tab-click="handleClick">
                    <el-tab-pane :label="$store.state.lang.edu.t70 ||'直播设置'" name="first"></el-tab-pane>
                    <el-tab-pane :label="$store.state.lang.edu.t71 ||'直播统计'" name="second"></el-tab-pane>
                </el-tabs>
            </div>
            <div slot="bodyRight" style="padding: 10px;" v-loading="pageLoading" element-loading-text="拼命加载中...">
                <el-table v-if="activeName == 'first'" :data="tableData" border tooltip-effect="dark" :empty-text="emptyText" style="width: 100%;height: 100%;" height="100%">
                    <el-table-column type="index" :label="$store.state.lang.edu.t37 ||'序号'" width="48" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="title" :label="$store.state.lang.edu.t72 ||'课堂名称'" align="center"></el-table-column>
                    <el-table-column prop="courseName" :label="$store.state.lang.edu.t73 ||'直播学科'" align="center"></el-table-column>
                    <el-table-column prop="gradeName" :label="$store.state.lang.edu.t74 ||'年级班级'" :align="$store.state.userType == 2 ? 'left': 'center'" header-align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="starttime" :label="$store.state.lang.edu.t75 ||'直播开始时间'" align="center">
                        <template scope="scope">
                            <span>{{scope.row.startTime}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="operate" :label="$store.state.lang.base.ctr || '操作'" width="140" align="center" >
                        <template scope="scope">
                            <el-button v-if="$store.state.userType == 2" type="text" size="small" :disabled="scope.row.liveDateType != 0" 
                            @click="edit(scope.row)">{{$store.state.lang.button.update || "修改"}}</el-button>
                            <el-button v-if="$store.state.userType == 2" type="text" size="small" @click="deleteMsg(scope.row)">{{$store.state.lang.button.cancel || "删除"}}</el-button>
                            <el-button type="text" size="small" @click="enterMsg(scope.row)">{{$store.state.lang.edu.t76 ||'直播'}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <sys v-else></sys>
            </div>
            <div v-if="activeName == 'first'" slot="footer" class="right">
                 <el-pagination
                    @current-change="handleCurrentChange"
                    style="display: inline-block;padding: 0;padding-top: 5px;"
                    :current-page.sync="currentPage"
                    :page-size="100"
                    layout="total, prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>
        </sy-grad-4>
        <sy-dialog :title="isEdit ? $store.state.lang.edu.t77 || '修改直播' : $store.state.lang.edu.t69 || '直播安排'" :visible.sync="dialogFormVisible" height="430px" width= "500px">
            <div slot="body" style="padding: 10px 15px 10px 10px;" v-loading="dialogLoading">
                <el-form ref="form" :model="form" label-width="90px" :rules="rules">
                    <el-form-item :label="$store.state.lang.edu.t72 || '课堂名称' + '：'" prop="name">
                        <el-input :placeholder="$store.state.lang.edu.t78 || '请输入名称'" v-model="form.name" :maxlength="100"></el-input>
                    </el-form-item>
                    <el-form-item :label="$store.state.lang.edu.t73 || '直播学科' + '：'" prop="courseValue">
                        <el-select :placeholder="$store.state.lang.edu.t18 || '请选择科目'" v-model="form.courseValue" style="width: 100%;">
                            <el-option v-for="item in subjects" :key="item.id" :label="item.name" :value="item.courseValue"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$store.state.lang.edu.t79 || '选择学生' + '：'" prop="studentNames">
                        <div class="el-input--small cp" @click="handleSelectUser">
                            <div class="el-input__inner" 
                                style="line-height: 24px;height: auto;"
                                :style="{color: form.students.length == 0 ? 'rgb(151,160,190)' : 'rgb(31, 39, 61)'}"
                                >{{form.students.length == 0 ? $store.state.lang.edu.t80 || "点击选择学生" : form.studentNames}}</div>
                        </div>
                        <el-input :placeholder="$store.state.lang.edu.t78 || '请输入名称'" style="display: none;" v-model="form.studentNames" :maxlength="50"></el-input>
                    </el-form-item>
                    <el-form-item :label="$store.state.lang.edu.t81 || '直播时间' + '：'" prop="date">
                        <el-date-picker v-model="form.date" 
                            :clearable="false" :editable="false"  style="width: 100%;" 
                            type="datetime" :placeholder="$store.state.lang.edu.t82 || '选择日期'" 
                            :picker-options="pickerOptions"></el-date-picker>
                    </el-form-item>
                    <el-form-item :label="$store.state.lang.edu.t83 || '直播说明' + '：'" prop="desc">
                        <el-input type="textarea" resize="none" :rows="5" 
                            :maxlength="1000" v-model="form.desc" 
                            :placeholder="$store.state.lang.edu.t84 || '请输入500字以内的说明！'"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer">
                <el-button @click="dialogFormVisible = false">{{$store.state.lang.button.cancel || '取消'}}</el-button>
                <el-button type="primary" :loading="saveLoading" @click="handleSubmit">{{$store.state.lang.edu.t43 || '提交'}}</el-button>
            </div>
        </sy-dialog>
    </div>
</template>
<script>
import { getList,getGradeCourseList,saveLive, deleteLive, updateLive,getDetailsById } from "./request.js";
import sys from "./sys.vue";
export default {
    components: {
        sys
    },
    data() {
        return {    
            activeName: 'first',
            dialogLoading: false,
            pageLoading: false,
            isEdit: false,
            tableData:[],
            dialogFormVisible: false,
            saveLoading: false,
            form: {
                id: '',
                name: '',
                courseValue: '',
                studentNames: '',
                students: [],
                grades: [],
                date: new Date(),
                desc: ''
            },
            rules: {
                name: [
                    { required: true, message: this.$store.state.lang.edu.t85 || '请输入直播名称', trigger: 'blur' },
                    { min: 3, max: 50, message: this.$store.state.lang.edu.t86 || '长度在 3 到 50 个字符', trigger: 'blur' }
                ],
                desc: [
                    { min: 0, max: 500, message: this.$store.state.lang.edu.t87 || '长度在 0 到 500 个字符', trigger: 'blur' }
                ],
                courseValue: [
                    { required: true, message: this.$store.state.lang.edu.t88 || '请选择直播课程', trigger: 'change' }
                ],
                date: [
                    { type: 'date', required: true, message: this.$store.state.lang.edu.t82 || '请选择日期', trigger: 'change' }
                ],
                studentNames: [
                    { required: true, message: this.$store.state.lang.edu.t79 || '请选择学生', trigger: 'change' }
                ]
            },
            value1: '',
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            currentPage: 1,
            total: 0,
            iAdminRole: false,
            subjects: [],
            tags: []
        }
    },
    created(){
        this.$parent.$emit('currentPage', '/sl/home/telecast');
        this.init();
    },
    methods: {
        init(){
            this.refreshData();
            this.getGradeCourseB();
        },
        refreshData(){
            this.pageLoading = true;
            getList({
                start: this.currentPage,
                size: 30
            }).then(res=>{
                this.tableData = res.list || [];
                this.total = res.total
                this.pageLoading = false;
            }).catch(err=>{
                this.pageLoading = false;
            })
        },
        handleCurrentChange(val){
            this.currentPage = val;
            this.refreshData();
        },
        handleClick(tab,event){
            this.activeName = tab.name;
        },
        getGrades(arr){
            let g = [],c={};
            arr.forEach((_a,a)=>{
                if(_a){
                    g.push(_a.split('_')[0])
                }
            })
            g = this.$_.uniq(g);
            return g

        },
        // 查询年级课程综合表
        getGradeCourseB(){
            this.grade = '';
            this.gradeOptios = []
            getGradeCourseList(this.$store.state.unitId).then((data)=>{
                this.existGradeCourseList = data.data.gradeCourseList ||[];
                let arr = data.data.roles || [];
                this.iAdminRole = false;
                arr.forEach((_a,a)=>{
                    if(_a == 'XX_SYS_RC' || _a == 'XX_SYS_'){
                        this.iAdminRole = true;
                    }
                })
                this.gradeCourseData = data.data || {};
                // this.getGrades(this.existGradeCourseList);
                if(this.iAdminRole){
                    this.subjects = data.data.courseVMs || [];
                    this.gradeOptios = data.data.gradeSimpleVMs;
                }else{
                    let grads = this.getGrades(this.existGradeCourseList);
                    grads.forEach((_g,g)=>{
                        this.gradeOptios.push( this.$_.find(data.data.gradeSimpleVMs,{gradeValue: _g}) )
                    })
                    this.grade = this.gradeOptios.length>0 ? this.gradeOptios[0].id : '';
                    this.subjects = this.gradeCourseData.courseRole[this.grade]
                    // this.subject = this.subjects.length > 0 ? this.subjects[0].courseValue : '';
                }
                if(this.existGradeCourseList.length != 0 || this.iAdminRole){
                    // this.getRcList();
                }
            })
        },
        handleOpen(){
            this.isEdit = false;
            this.dialogFormVisible = true;
            this.form.students = [];
            this.form.grades = [];
            this.$refs.form.resetFields();
        },
        handleSubmit(){
            this.$refs.form.validate((valid) => {
                if (valid) {
                    let obj = {
                        content: this.form.desc,
                        courseName: '',
                        courseValue: this.form.courseValue,
                        startTime: this.$moment(this.form.date).format('YYYY-MM-DD HH:mm:ss'),
                        title: this.form.name,
                        liveClassGradeClassRVMList: [],
                        liveClassStudentVMList: []
                    }
                    this.subjects.forEach((_s,s)=>{
                        if(_s.courseValue == this.form.courseValue){
                            obj.courseName = _s.name
                        }
                    })
                    let gc = [];
                    this.form.grades.forEach((_s,s)=>{
                        _s.children.forEach((_a,a)=>{
                            gc.push({
                                classId: _a.classId,
                                className: _a.className,
                                gradeId: _s.gradeId,
                                gradeName: _s.gradeName,
                                gradeValue: _s.gradeValue
                            })
                        })
                    })
                    obj.liveClassGradeClassRVMList = gc;
                    let stu = [];
                    this.form.students.forEach((_s,s)=>{
                        stu.push({
                            userId: _s.userId
                        })
                    })
                    obj.liveClassStudentVMList = stu;
                    this.saveLoading = true;
                    if(this.isEdit){
                        obj.id = this.form.id;
                        obj.liveClassGradeClassRVMList.forEach((_s,s)=>{
                            _s.liveId = this.form.id;
                        })
                        obj.liveClassStudentVMList.forEach((_s,s)=>{
                            _s.liveId = this.form.id;
                        })
                        updateLive(obj).then(res=>{
                            this.$notify({
                                message: this.$store.state.lang.edu.t89 || '修改成功',
                                type: 'success'
                            });
                            this.refreshData();
                            this.dialogFormVisible = false;
                            this.saveLoading = false;
                        }).catch(err=>{
                            this.saveLoading = false;
                        })
                    }else{
                        saveLive(obj).then(res=>{
                            this.$notify({
                                message: this.$store.state.lang.edu.t90 || '安排成功',
                                type: 'success'
                            });
                            this.currentPage = 1;
                            this.refreshData();
                            this.dialogFormVisible = false;
                            this.saveLoading = false;
                        }).catch(err=>{
                            this.saveLoading = false;
                        })
                    }
                } else {
                    return false;
                }
            });
        },
        // 选择对象
        handleSelectUser(){
            let ids = [];
            this.form.students.forEach((_s,s)=>{
                ids.push(_s.userId);
            })
            this.$SelectUsers({
                 lang: this.$store.state.langType,
                selectUserType: 1,
                unitType: 2,
                userTypes: [1],
                unitId: this.$store.state.unitId,
                secondGroups: [],
                selectUserIds: ids
            }, (selectUsers, instance) => {
                let arr = [];
                let names = [];
                let grades = [];
                selectUsers.forEach((_s,s)=>{
                    let has = true;
                    grades.forEach((_a,a)=>{
                        if(_a.gradeId == _s.gradeId){
                            has = false
                        }
                    })
                    if(has){
                        grades.push({
                            gradeValue: _s.gradeValue,
                            gradeName: _s.gradeName,
                            gradeId: _s.gradeId,
                            children: []
                        })
                    }
                    arr.push({
                        userName: _s.realName,
                        userId: _s.id,
                        classId: _s.classId,
                        className: _s.className,
                        number: _s.number,
                        gradeValue: _s.gradeValue,
                        gradeName: _s.gradeName,
                        gradeId: _s.gradeId
                    })
                    names.push(_s.gradeName + _s.className)
                })
                grades.forEach((_a,a)=>{
                    selectUsers.forEach((_s,s)=>{
                        if(_s.gradeId == _a.gradeId){
                            let has = true;
                            _a.children.forEach((_d,d)=>{
                                if(_d.classId == _s.classId){
                                    has = false
                                }
                            })
                            if(has){
                                _a.children.push({
                                    classId: _s.classId,
                                    className: _s.className
                                })
                            }
                        }
                    })
                })
                this.form.grades = grades;
                console.log(grades);
                this.form.students = arr;
                this.form.studentNames = this.$_.uniq( names ).sort().join('、');
            });
        },
        //修改
        edit(row){
            this.isEdit = true;
            this.dialogFormVisible = true;
            this.form.id = row.liveId;
            this.dialogLoading = true;
            getDetailsById(this.form.id).then(res=>{
                this.form.desc = res.content;
                this.form.name = res.title;
                this.form.date = new Date(res.startTime);
                this.form.courseValue = res.courseValue;
                let grades = [];
                let arr = [];
                let names = [];
                if(res.liveClassGradeClassRVMList){
                    res.liveClassGradeClassRVMList.forEach((_s,s)=>{
                        names.push(`${_s.gradeName}${_s.className}`)
                        let has = true;
                        grades.forEach((_a,a)=>{
                            if(_a.gradeId == _s.gradeId){
                                has = false
                            }
                        })
                        if(has){
                            grades.push({
                                gradeValue: _s.gradeValue,
                                gradeName: _s.gradeName,
                                gradeId: _s.gradeId,
                                children: []
                            })
                        }
                       
                    })
                    grades.forEach((_a,a)=>{
                        res.liveClassGradeClassRVMList.forEach((_s,s)=>{
                            if(_s.gradeId == _a.gradeId){
                                let has = true;
                                _a.children.forEach((_d,d)=>{
                                    if(_d.classId == _s.classId){
                                        has = false
                                    }
                                })
                                if(has){
                                    _a.children.push({
                                        classId: _s.classId,
                                        className: _s.className
                                    })
                                }
                            }
                        })
                    })
                }
                if(res.liveClassStudentVMList){
                    res.liveClassStudentVMList.forEach((_s,s)=>{
                        arr.push({
                            userName: '',
                            userId: _s.userId,
                            classId: '',
                            className: '',
                            number: '',
                            gradeValue: '',
                            gradeName: '',
                            gradeId: ''
                        })
                    })
                }
                this.form.grades = grades;
                this.form.students = arr;
                this.form.studentNames = names.join('，');
                this.dialogLoading = false;
            }).catch(err=>{
                this.dialogLoading = false;
            })
        },
        // 删除
        deleteMsg(row) {
             this.$confirm(this.$store.state.lang.message.isdelete || '是否继续删除?', this.$store.state.lang.message.info || '提示', {
                confirmButtonText: this.$store.state.lang.button.ok || '确定',
                cancelButtonText: this.$store.state.lang.button.cancel || '取消',
                type: 'warning'
            }).then(() => {
                // 实现删除
                deleteLive(row.liveId).then(res=>{
                    this.$notify({
                        message: this.$store.state.lang.message.delete1 || '删除成功',
                        type: 'success'
                    });
                    this.currentPage = 1;
                    this.refreshData();
                })
            }).catch(() => {});     
        },
        // 直播
        enterMsg(row){
            this.$router.push({path:'classroom',query: {id: row.liveId}});
        }
    }
}
</script>
<style scoped>
    .sy-tele-pointer{cursor:pointer;}
    .tele-span{padding: 5px 10px;}
    .tele-span1{border-bottom:3px solid #457CD6;}
    .tele-button{
        float:right;
        margin-top:6px;
    }
    .tele-table{
        width:100%;
        height:96%;       
        overflow-y:auto;
    }
</style>