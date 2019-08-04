<template>
    <div class="sy-ques-index">
        <sy-grad-4 :border="false">
            <div slot="headerRight" style="padding-top: 6px;">
                <!-- <el-tag type="gray">学生答疑</el-tag> -->
                <el-select style="width: 136px;" v-model="queryList.gradeValue" 
                    :placeholder="$store.state.lang.edu.t2 || '请选择年级'" @change="handleGradeChange">
                    <el-option v-for="item in gradelist" :key="item.gradeValue" :label="item.gradeName" :value="item.gradeValue"></el-option>
                </el-select>
                <el-select style="width: 100px;margin: 0 10px;" v-model="queryList.clazzId" 
                    :placeholder="$store.state.lang.edu.t3 || '请选择班级'"  @change="handleClzzChange">
                    <el-option v-for="item in classlist" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <el-select style="width: 100px;" v-model="queryList.courseValue" 
                    :placeholder="$store.state.lang.edu.t18 || '请选择科目'" @change="handleCourseChange">
                    <el-option v-for="item in courselist" :key="item.courseValue" :label="item.courseName" :value="item.courseValue"></el-option>
                </el-select>
                <!-- <el-button type="primary" icon="search">搜索</el-button> -->
                <el-button class="ques-button" @click="back()">{{$store.state.lang.button.back || "返回"}}</el-button>
            </div>
            <!-- 表格 -->
            <div slot="bodyRight" v-loading="pageloading"
                :element-loading-text="$store.state.lang.hw.t1 || '拼命加载中...'" style="padding: 3px 10px;">
                <el-table :data="tableData" border style="width: 100%;height: 100%;" height="100%"
                    ref="multipleTable"
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="40" align="center"></el-table-column>
                    <el-table-column :label="$store.state.lang.edu.t37 || '序号'" align="center" width="40" type="index"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="content" :label="$store.state.lang.edu.t66 || '问题描述'" align="center"></el-table-column>
                    <el-table-column prop="userName" :label="$store.state.lang.edu.t21 || '姓名'" align="center"></el-table-column>
                    <el-table-column prop="gradeName" :label="$store.state.lang.edu.t31 || '年级'" align="center"></el-table-column>
                    <el-table-column prop="className" :label="$store.state.lang.edu.t27 || '班级'" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="resName" :label="$store.state.lang.edu.t67 || '资源名称'" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="createTime" :label="$store.state.lang.edu.t68 || '创建时间'" align="center"></el-table-column>
                </el-table>
            </div>
            <div slot="footer">
                <el-button type="danger" :disabled="multipleSelection.length == 0" @click="handleDelete">{{$store.state.lang.button.delete || "删除"}}</el-button>
                <el-pagination @current-change="handleCurrentChange" :current-page="pramsList.start" :page-size="pramsList.size" 
                    class="pagination-mf" layout="total, prev, pager, next" :total="pramsList.total"></el-pagination>
            </div>
        </sy-grad-4>
    </div>
</template>
<script>
import { getCourseGradeTree, selectStudentQuestions, deleteStudentQuestions } from "./request.js";
export default {
  data() {
        return {
            pramsList:{
                start:1,
                size:30,
                total:0
            },

            queryList: {
                gradeValue: '',
                clazzId: '',
                courseValue: ''
            },
            gradelist: [],
            classlist: [],
            courselist: [],

            input2: '',
            activeName:'first',
            tableData:[],
            multipleSelection: []
        }
    },
    created () {
        this.$parent.$emit('currentPage', '/sl/home/home');
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
            this.getStudentsQuestionList();
        },
        // 查询学生答疑
        getStudentsQuestionList(){
            if(this.queryList.courseValue === ''){
                return
            }
            if(this.queryList.clazzId === ''){
                return
            }
            if(this.queryList.gradeValue === ''){
                return
            }
            selectStudentQuestions({
                start: this.pramsList.start,
                size: this.pramsList.size,
                gradeValue: this.queryList.gradeValue,
                courseValue: this.queryList.courseValue,
                classId: this.queryList.clazzId
            }).then(res=>{
                console.log(res);
                this.tableData = res.list || [];
                this.pramsList.total = res.total;
            }).catch(err=>{

            })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 加载更多学生答疑
        back(){ 
            this.$router.push({path:'Home'})
        },
        // 分页
        handleCurrentChange(val){
            this.pramsList.start = val;
            this.getStudentsQuestionList();
        },
        // 删除
        handleDelete(){
            this.$confirm(this.$store.state.lang.message.isdelete || '是否继续删除?', this.$store.state.lang.message.info || '提示', {
                confirmButtonText: this.$store.state.lang.button.ok || '确定',
                cancelButtonText: this.$store.state.lang.button.cancel || '取消',
                type: 'warning'
            }).then(() => {
                let arr = [];
                this.multipleSelection.forEach((_s,s)=>{
                    arr.push(_s.id)
                })
                deleteStudentQuestions(arr.join(',')).then(res=>{
                    this.$notify({
                        message: this.$store.state.lang.message.delete1 || '删除成功',
                        type: 'success'
                    });
                    this.getStudentsQuestionList();
                }).catch(err=>{

                })
            }).catch(() => {
                  
            });
        },
    }
}
</script>
<style scoped>
    ::-webkit-scrollbar{display:none;}
    .ques-body{
       margin:0 auto;
       overflow-y:auto;
    }
    .ques-select{
        width: 100px;
        margin:10px 10px 0 0;
    }
    .ques-bigselect{
        width: 135px;
        margin:10px 10px 0 0;
    }
    .ques-leftsel{margin-left:-10px;}
    .ques-button{
        float:right;
    }
    .ques-table{width:100%;}
</style>