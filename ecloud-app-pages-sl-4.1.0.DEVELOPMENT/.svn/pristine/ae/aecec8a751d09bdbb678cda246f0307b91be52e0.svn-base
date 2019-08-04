<template>
	<div class="sy-app-container" >
        <sy-grad-4 :border="false">
            <div slot="headerRight" style="padding: 5px 0 0 0;" class="not_weight">
                <el-select v-model="parmasList.paperType" @change="handleChangeExamType" 
                    :placeholder="$store.state.lang.exam.t1||'请选择考试类型'" class="sy-exam-select-120">
                    <el-option :label="$store.state.lang.exam.t2||'全部考试类型'" value=""></el-option>
                    <el-option v-for="item in paperTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <el-input v-model="parmasList.fullscore" style="width:180px;" :maxlength="6" 
                    :placeholder="$store.state.lang.exam.t3||'请输入总分'"></el-input>
                <el-input v-model="parmasList.paperName" style="width:200px;" :maxlength="50" 
                    :placeholder="$store.state.lang.exam.t4||'请输入试卷名称'"></el-input>
                <el-button icon="search" @click="handleSeacher">{{$store.state.lang.base.inquire ||　'查询'}}</el-button>
            </div>            
            <div slot="bodyRight" style="padding:0 10px" v-loading="pageloading" 
                :element-loading-text="$store.state.lang.hw.t1||'拼命加载中...'">
                <el-table  ref="multipleTable" :stripe="false" :empty-text="emptyText" :data="tableData" border 
                    tooltip-effect="dark" height="100%" style="width: 100%;height:100%;" @row-click="handleRowClick">   
                    <el-table-column align="center" width="45">
                        <template scope="scope">
                            <el-radio class="radio" v-model="radio" :label="scope.row.id" @change="handleChange">{{''}}</el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip align="left" header-align="center" prop="name" 
                        :label="$store.state.lang.exam.t5_1||'试卷名称'"></el-table-column>
                    <!-- <el-table-column show-overflow-tooltip align="center" prop="allScore" width="70" 
                        :label="$store.state.lang.exam.t6||'试卷总分'"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="topicCount" width="60" 
                        :label="$store.state.lang.exam.t7||'试题数'"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" width="70" prop="shareType" 
                        :label="$store.state.lang.exam.t8||'共享模式'">
                        <template scope="scope">{{scope.row.shareType==0?
                            $store.state.lang.exam.t10||'个人':scope.row.shareType==1?
                            $store.state.lang.exam.t19||'校级':
                            $store.state.lang.edu.t31||'年级'}}</template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="testpaperType" width="70" 
                        :label="$store.state.lang.exam.t11||'试卷分类'">
                        <template scope="scope">{{scope.row.testpaperType==1?
                            $store.state.lang.exam.t12||'期中考试':
                            scope.row.testpaperType==2?$store.state.lang.exam.t13||'期末考试':
                            $store.state.lang.exam.t15||'单元测试'}}</template>
                    </el-table-column> -->
                    <el-table-column show-overflow-tooltip align="center" prop="gradeName" 
                        :label="$store.state.lang.edu.t31||'年级'" width="100"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="courseName " width="100" 
                        :label="$store.state.lang.exam.t14||'课程'">
                        <template scope="scope">{{scope.row.courseName}}</template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="userName" width="100" 
                        :label="$store.state.lang.exam.t16||'创建人'"></el-table-column>
                    <el-table-column align="center" width="140" prop="useTime" 
                        :label="$store.state.lang.edu.t68||'创建时间'">
                        <template scope="scope">
                            <span style="line-height: 16px;">{{scope.row.useTime | moment('YYYY-MM-DD HH:mm:ss')}}</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column :label="$store.state.lang.base.ctr||'操作'" width="90" align="center">
                        <template scope="scope">
                            <el-button type="text" @click="hanldeView(scope.row)">{{$store.state.lang.rc.t5||"预览"}}</el-button>
                        </template>
                    </el-table-column> -->
                </el-table>      
            </div>
            <div slot="footer">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="parmasList.start"
                    :page-size="parmasList.size"
                    class="pagination-mf"
                    layout="total, prev, pager, next"
                    :total="parmasList.total">
                </el-pagination>
            </div>
        </sy-grad-4>
	</div> 
</template>
<script>
import {selectPaper,selectList,getYearlist,getTermlist} from "./request.js";
export default {
    props: {
        gradeValue: {
            type: String,
            default: ''
        },
        courseValue: {
            type: String,
            default: ''
        },
        select: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            emptyText: ' ',
            radio: this.select || '',
            parmasList: {
                paperType: '',// 考试类型
                gradeId: '',// 年级
                courseId: '',// 课程
                courseValue: '',
                fullscore: '', // 总分
                paperName: '', // 试卷名称
                start: 1,
                size: 30,
                total: 0
            },
            paperTypeOptions: [
                { label: this.$store.state.lang.exam.t12||'期中考试', value: '1' },
                { label: this.$store.state.lang.exam.t13||'期末考试', value: '2' },
                { label: this.$store.state.lang.exam.t15||'单元测试', value: '3' }
            ], // 考试类型
            pageloading: false, 
            tableData: []
        };
    },
    created() {
        this.$parent.$emit("currentPage", "/exam/col/exam");
        this.init()
    },
    methods: {
        init(){
            this.getList();  
        },
        handleChange(){
            this.form.start = 1;
            this.getList();
        },
        // 查询
        trim(str) {
            return str.replace(/^\s+|\s+$/g, '');
        },
        handleSeache(){
            this.form.start = 1;
            this.getList();
        },
        getList(){
            this.pageloading = true;
            this.tableData=[];
            let obj = {
                name:this.parmasList.paperName|| undefined,
                testpaperType:this.parmasList.paperType|| undefined,
                gradeValue: this.gradeValue,
                courseValue: this.courseValue,
                allScore: this.parmasList.fullscore|| undefined,
                start: this.parmasList.start,
                size: this.parmasList.size    
            }
            selectList(obj).then(res => {
                this.emptyText = this.$store.state.lang.base.nodata||'暂无数据';
                this.pageloading = false;
                if(res.list){
                    res.list.forEach((_a,a)=>{
                        _a.radio = false
                    })
                }
                this.tableData = res.list;
                this.parmasList.total = res.total;
            }).catch(err => {
                this.emptyText = this.$store.state.lang.base.nodata||'暂无数据';
                this.pageloading = false;
            });
        },
        // 分页
        handleCurrentChange(val) {
            this.parmasList.start = val;
            this.getList();
        },
        // 考试类型改变
        handleChangeExamType(){
            this.parmasList.start = 1;
            this.getList();
        },
        // 搜索
        handleSeacher(){
            this.parmasList.start = 1;
            this.getList();
        },
        handleRowClick(row, event, column){
            this.radio = row.id;
            this.$emit('select', row)
        },
        handleChange(val){
            for (let i = 0; i < this.tableData.length; i++) {
                const element = this.tableData[i];
                if(val == element.id){
                    this.$emit('select', element)
                    return
                }
            }
        },
        // 试卷预览
        hanldeView(row){
            // 清理本地存储的
            window.localStorage.removeItem('papers-'+row.id);
            window.localStorage.removeItem('oldpapers-'+row.id);
            window.localStorage.removeItem('recycleDatas-'+row.id);
            window.localStorage.removeItem('papersForm-'+row.id);
            window.localStorage.removeItem('papersChekedform-'+row.id);
            window.open('/exam/parperpreview?id='+row.id);
        },
    }
};
</script>