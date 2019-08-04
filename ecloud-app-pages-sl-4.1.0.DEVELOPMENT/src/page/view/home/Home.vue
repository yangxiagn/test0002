<template>
    <div class="sy-home-index">
        <sy-grad-4 :border="false" class="home-sy">
            <div slot="headerRight" style="padding-top: 6px;">
                <el-select class="home-bigselect" v-model="queryList.gradeValue" 
                    :placeholder="$store.state.lang.edu.t2 || '请选择年级'" @change="handleGradeChange">
                    <el-option v-for="item in gradelist" :key="item.gradeValue" 
                        :label="item.gradeName" :value="item.gradeValue"></el-option>
                </el-select>
                <el-select  class="home-select" style="margin: 0 10px;" v-model="queryList.clazzId" 
                    :placeholder="$store.state.lang.edu.t3 || '请选择班级'"  @change="handleClzzChange">
                    <el-option v-for="item in classlist" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <el-select  class="home-select" v-model="queryList.courseValue" 
                    :placeholder="$store.state.lang.edu.t18 || '请选择科目'" @change="handleCourseChange">
                    <el-option v-for="item in courselist" :key="item.courseValue" :label="item.courseName" :value="item.courseValue"></el-option>
                </el-select>
                <!-- <el-button type="primary" icon="search">搜索</el-button> -->
            </div>
            <!-- 主页 -->
            <div slot="bodyRight" style="padding: 0 10px 10px;">
                <div class="sy-home-flex">
                    <!-- 表格 -->
                    <div class="home-left">
                        <div class="sy-home-flex">
                            <h3>{{$store.state.lang.edu.t44 || "学生答疑"}}</h3>
                            <p class="sy-home-pointer home-more" @click="handleMoreClick">{{$store.state.lang.edu.t52 ||"更多"}}</p>
                        </div>
                        <el-table :data="tableData" border class="home-table">
                            <el-table-column :label="$store.state.lang.edu.t37 || '序号'" align="center" width="40" type="index"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="content" 
                                :label="$store.state.lang.edu.t66 || '问题描述'" align="center"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="userName" 
                                :label="$store.state.lang.edu.t21 || '姓名'" align="center"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="gradeName" 
                                :label="$store.state.lang.edu.t31 || '年级'" align="center"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="className" 
                                :label="$store.state.lang.edu.t27 || '班级'" align="center"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="resName" 
                                :label="$store.state.lang.edu.t67 || '资源名称'" align="center"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="createTime" 
                                :label="$store.state.lang.edu.t68 || '创建时间'" align="center"></el-table-column>
                        </el-table>
                    </div>
                    <!-- 环形进度条 -->
                    <div class="home-right">
                        <h3>{{$store.state.lang.edu.t53 ||"课堂资源"}}</h3>
                        <div class="home-circle">
                            <div  class="home-progress cp" v-for="item in progress" :key="item.percentage" 
                                @click="handleRClick(item)">
                                <el-progress type="circle" :percentage="item.percentage" width="130" 
                                    stroke-width="25"></el-progress>
                                <p>{{item.word}}</p>
                            </div>    
                        </div>
                    </div>
                </div>
                <!-- 折线图 -->
                <div class="home-bottom">
                    <el-row>
                        <el-col :span="6">
                            <b>{{$store.state.lang.edu.t54 ||"学习人数"}}</b>
                        </el-col>
                        <el-col :span="18" class="right sy-home-pointer">
                            <span>{{$store.state.lang.edu.t55 ||'选择时间段：'}}</span>
                            <span :class="{'sy-theme-text': show['1']}" @click="handleChangeDate('1')">
                                {{$store.state.lang.edu.t56}}
                            </span>
                            <span style="padding: 0 6px;"> | </span>
                            <span :class="{'sy-theme-text': show['2']}" @click="handleChangeDate('2')">
                                {{$store.state.lang.edu.t57}}
                            </span>
                            <span style="padding: 0 6px;"> | </span>
                            <span :class="{'sy-theme-text': show['3']}" @click="handleChangeDate('3')">
                                {{$store.state.lang.edu.t58}}
                            </span>
                            <span style="padding: 0 6px;"> | </span>
                            <span :class="{'sy-theme-text': show['4']}" @click="handleChangeDate('4')" class="relative">
                                <span>{{monthsName}}</span>
                                <el-collapse-transition>
                                    <div v-show="showNums" class="sy-parhome-bgbor parhome-tabs">
                                        <el-button type="text" class="parhome-button" v-for="item in mList" 
                                            :key="item.value"
                                            :disabled="!item.type" @click.stop="handleClickM(item)" 
                                            :title="item.year+$store.state.lang.edu.t60">{{item.month}}{{$store.state.lang.edu.t59}}</el-button>
                                    </div>
                                </el-collapse-transition>
                            </span>
                        </el-col>
                    </el-row>
                    <div ref="myChart" class="home-chart"></div>
                </div>
            </div>
        </sy-grad-4>
    </div>
</template>
<script>
// 引入echarts
import echarts from 'echarts';
import { getCourseGradeTree, selectCatelogCountThan, selectStudentQuestions, findHistoryDate, select_learning_count_statistics, select_update_res } from "./request.js";
export default {
    data() {
        return {
            //  未完成=100-已完成-进行中
            progress:[],
            resource:{
                progress1:40,
                progress2:80,
                progress3:25,
            },
            monthsName: this.$store.state.lang.edu.t63 || '历史月份',
            showNums: false,
            show: {
                '1': true,
                '2': false,
                '3': false,
                '4': false,
            },
            mList: [],
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
            myCharts: null, 
            option: {
                backgroundColor:'#fff',
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                toolbox: {
                    show: true,
                    feature: {
                        // magicType: {type: ['line', 'bar']},
                        saveAsImage: {
                            show: true,
                            title: this.$store.state.lang.edu.t65 ||'下载',
                            name: this.$store.state.lang.edu.t64 ||'学生学习人数统计'
                        }
                    },
                },
                xAxis: {
                    type: 'category',
                    data: [],
                    axisTick:{
                        show:false
                    }
                },
                yAxis: {
                    type: 'value',
                    axisTick:{
                        show:false
                    },
                    splitLine:{  
                　　　　show:false  
                　　}  
                },
                grid: {
                    left: 40,
                    right: 30,
                    top: 30,
                    bottom:40
                },
                series: []
            },
            paramsList: {
                gradeValue: '',
                classId: '',
                courseValue: '',
                dateType: 1, // 查询类型 1:本周,2:上周,3:本月,4:历史月份
                month: undefined, // 月份 (参数type=4必填)
                year: undefined // 年份 (参数type=4必填) 例:2018
            }            
        }
    },
    created () {
        this.$parent.$emit('currentPage', '/sl/home/home');
        this.init();
    },
    methods: {
        init(){
            // -- 初始化历史月份
            this.getModths();
            this.getGradeClazzCoures();
        },
        // 查询月份
        getModths(){
            findHistoryDate().then(res=>{
                if(res){
                    res.forEach((_s,s)=>{
                        _s.isSelect = false;
                    })
                }
                this.mList = res || [];
            })
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
            this.getKtRcList();
            this.getStudentsQuestionList();
            // 初始化图表
            this.handleChangeDate('1');
        },
        // 查询课堂资源
        getKtRcList(){
            if(this.queryList.courseValue === ''){
                return
            }
            if(this.queryList.gradeValue === ''){
                return
            }
            selectCatelogCountThan({
                gradeValue: this.queryList.gradeValue,
                courseValue: this.queryList.courseValue
            }).then(res=>{
                for(let key in res){
                    res[key] = parseFloat(res[key]);
                }
                this.progress = [{
                    percentage: res.microVideoCountThan,
                    word: this.$store.state.lang.edu.t62 || '微课',
                    type: 4
                },{
                    percentage: res.hwCountThan,
                    word: this.$store.state.lang.edu.t61 || '作业',
                    type: 2
                },{
                    percentage: res.recordedCountThan,
                    word: this.$store.state.lang.edu.t32 || '录播课堂',
                    type: 1
                }];
            }).catch(err=>{

            })
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
                start: 1,
                size: 5,
                gradeValue: this.queryList.gradeValue,
                courseValue: this.queryList.courseValue,
                classId: this.queryList.clazzId
            }).then(res=>{
                this.tableData = res.list || [];
            }).catch(err=>{

            })
        },
        // 课堂资源点击事件
        handleRClick(row){
            select_update_res(row.type).then(res=>{
                let obj = {
                    id: res,
                    gv: this.queryList.gradeValue,
                    cv: this.queryList.courseValue
                }
                this.$router.push({path: '/sl/home/setting', query: obj})
            })
        },
        handleClickM(row){
            row.isSelect = true;
            this.monthsName = row.month+this.$store.state.lang.edu.t59;
            this.showNums = false;
            this.paramsList.year= row.year;
            this.paramsList.month= row.month;
            this.getTimers();
        },
        getTimers(){
            select_learning_count_statistics(this.paramsList).then(res=>{
                this.drawChart(res);
            }).catch(err=>{

            })
        },
        // tabs切换
        handleChangeDate(num){
            for(let key in this.show){
                this.show[key] = num == key ? true : false;
            }
            this.paramsList.gradeValue = this.queryList.gradeValue;
            this.paramsList.classId = this.queryList.clazzId;
            this.paramsList.courseValue = this.queryList.courseValue;
            this.paramsList.dateType = num;
            if(num != '4'){
                this.monthsName = this.$store.state.lang.edu.t63 || '历史月份';
                this.paramsList.year= undefined;
                this.paramsList.month= undefined;
                this.getTimers();
            }else{
                this.showNums = !this.showNums;
            }
        },
        drawChart(data){
            let xAxis = [];
            let arr = [];
            if(data){
                data.forEach((_s,s)=>{
                    xAxis.push(_s.monthAndDay);
                    arr.push(_s.minute);
                })
            }
            // 请求数据
            this.myCharts.showLoading();
            this.option.xAxis.data = xAxis;
            this.option.series = [
                {
                    name: this.$store.state.lang.edu.t54 || '学习人数',
                    data: arr,
                    type: 'line'
                }
            ]
            this.myCharts.setOption(this.option);
            setTimeout(()=>{
                this.myCharts.hideLoading();
            }, 10)
        },
        // 加载更多学生答疑
        handleMoreClick(){
            this.$router.push({path:'question'})
        }
    },
    mounted(){
        if(this.$refs.myChart){
            this.myCharts = echarts.init(this.$refs.myChart);
            this.myCharts.setOption(this.option);
        }
    }
}
</script>
<style scoped>
    .sy-parhome-bgbor{
        background-color: #fff;
        border:1px solid #c1c1c1;
    }
    /* tabs切换 */
    .parhome-tabs{
        width: 160px;       
        position: absolute;
        top: 180%;
        right: 0;
        border-radius: 3px;
        padding: 5px;  
        z-index: 100;
    }
    .parhome-button{
        width: 40px;
        margin: 0;
    }
    .sy-home-flex{
        display: flex;
        justify-content: space-between;
    }
    .sy-home-pointer{cursor: pointer;}
    .home-sy{overflow-y:auto;}
    .home-select{
        width: 100px;
    }
    .home-bigselect{
        width: 136px;
    }
    .home-leftsel{margin-left:-10px;}
    .home-left{
        width:60%;
        margin-right:20px;
    }
    .home-more{
        line-height:47px;
        color:#457CD6;
    }
    .home-table{
        height:240px;
        overflow-y: hidden;
    }
    .home-right{
        width: 40%;
        min-width: 410px;
    }
    .home-circle{
        display: flex;
        justify-content: space-around;
        height: 240px;
        background-color:#fff;
        border: 1px solid #e5e5e5;
    }
    .home-progress{margin:auto 0;}
    .home-progress p{
        padding-top: 10px;
        text-align: center;
    }
    .home-bottom{
        margin:30px 0;
        line-height: 36px;
    }
    /* tabs切换 */
    .home-tabs{
        width: 160px;
        position: absolute;
        top: 180%;
        right: 0;
        border: 1px solid #ccc;
        border-radius: 3px;
        padding: 5px;
        background-color: #fff;
        z-index: 100;
    }
    .home-chart{
        height:300px;
        border:1px solid #c1c1c1;
    }
</style>