<template>
    <div class="sy-parhome-index">
        <sy-grad-4 :border="false">
            <div slot="bodyRight" class="parhome-body" style="width:96%;">
                <div>
                    <div class="parhome-tit">
                        <h3>{{$store.state.lang.edu.t1||'资源分布'}}</h3>
                        <el-select style="margin-top: 6px;" v-model="paramsList.courseValue" 
                            :placeholder="$store.state.lang.edu.t18||'请选择科目'" @change="handleChangeCourse">
                            <el-option v-for="item in courselist" :key="item.courseValue" :label="item.courseName" :value="item.courseValue"></el-option>
                        </el-select>
                    </div>
                    <div ref="myChart1" class="sy-parhome-bgbor parhome-chart"></div>
                </div>
                <div class="parhome-bottom">
                    <el-row>
                        <el-col :span="6">
                            <h3>{{$store.state.lang.slp.t3||'学习时长'}}</h3>
                        </el-col>
                        <el-col :span="18" class="right sy-parhome-pointer">
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
                                        <el-button type="text" class="parhome-button" v-for="item in mList" :key="item.value"
                                            :disabled="!item.type" @click.stop="handleClickM(item)" 
                                            :title="item.year+$store.state.lang.edu.t60">{{item.month}}{{$store.state.lang.edu.t59}}</el-button>
                                    </div>
                                </el-collapse-transition>
                            </span>
                        </el-col>
                    </el-row>
                    <div ref="myChart2" class="sy-parhome-bgbor parhome-chart"></div>
                </div>
            </div>
        </sy-grad-4>
    </div>
</template>
<script>
// 引入echarts
import echarts from 'echarts';
import { findHistoryDate, getGradeCourseBstudentID, find_student_learning_time, select_res_type_count } from "./request.js";
export default {
    data() {
        return {
            monthsName: this.$store.state.lang.edu.t63 || '历史月份',
            showNums: false,
            show: {
                '1': true,
                '2': false,
                '3': false,
                '4': false,
            },
            gradeValue: '',
            paramsList: {
                courseValue: '',
                type: 1, // 查询类型 1:本周,2:上周,3:本月,4:历史月份
                month: undefined, // 月份 (参数type=4必填)
                year: undefined // 年份 (参数type=4必填) 例:2018
            },
            mList: [],
            courselist: [],
            input2: '',
            activeName:'first',
            tableData:[],
            myChart1:null,
            myChart2: null, 
            option1:{
                backgroundColor: '#fff',
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                xAxis: {
                    type: 'value',
                    axisTick:{
                        show:false
                    },
                    splitLine:{  
                　　　　show:false  
                　　}
                },
                yAxis: {
                    type: 'category',
                    data: [
                        this.$store.state.lang.edu.t7 ||'直播课程', 
                        this.$store.state.lang.edu.t8 ||'视频微课', 
                        this.$store.state.lang.edu.t9 ||'单元检测', 
                        this.$store.state.lang.edu.t10 ||'课后作业', 
                        this.$store.state.lang.edu.t11 ||'点播课程'],
                    axisTick:{
                        show:false
                    }
                },
                series: [],
                grid: {
                    left:100,
                    right: 60,
                    top: 30,
                    bottom:40
                },
                itemStyle: {   
                    normal:{   　　　　　　　
                        color: function (params){
                            var colorList = ['#8beafe','#6ee469', '#fefc8b', '#2ee4d5', '#fdafc7'];
                            return colorList[params.dataIndex];
                        }
                    }
                },
            },
            option2: {
                backgroundColor: '#fff',
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
                            name: this.$store.state.lang.slp.t4 ||'学生学习时长统计'
                        }
                    },
                },
                xAxis: {
                    type: 'category',
                    // 拿数据
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
            }              
        }
    },
    created () {
        this.$parent.$emit('currentPage', '/sl/home/parhome');
        this.init();
    },
    methods: {
        init(){
            // -- 初始化历史月份
            this.getModths();
            // 查询科目
            this.getCourseList();
        },
        // 查询资源分布
        getFB(){
            select_res_type_count({
                courseValue: this.paramsList.courseValue,
                gradeValue: this.gradeValue
            }).then(res=>{
                this.drawchart1(res);
            })
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
        // 查询科目列表
        getCourseList(){
            getGradeCourseBstudentID().then(res=>{
                this.gradeValue = res.gradeValue;
                this.courselist = res.courseInformationVM || [];
                this.paramsList.courseValue = this.courselist.length > 0 ?  this.courselist[0].courseValue : '';
            }).catch(err=>{

            })
        },
        // 科目改变
        handleChangeCourse(){
            // 查询资源分布
            this.getFB();
            this.handleChangeDate('1');
        },
        // 查询时长
        getTimers(){
            find_student_learning_time(this.paramsList).then(res=>{
                this.drawChart2(res);
            }).catch(err=>{

            })
        },
        handleClickM(row){
            row.isSelect = true;
            this.monthsName = row.month+(this.$store.state.lang.edu.t59 || '月');
            this.showNums = false;
            this.paramsList.year= row.year;
            this.paramsList.month= row.month;
            this.getTimers();
        },
        // tabs切换
        handleChangeDate(num){
            for(let key in this.show){
                this.show[key] = num == key ? true : false;
            }
            this.paramsList.type = num;
            if(num != '4'){
                this.monthsName = this.$store.state.lang.edu.t63 || '历史月份';
                this.paramsList.year= undefined;
                this.paramsList.month= undefined;
                this.getTimers();
            }else{
                this.showNums = !this.showNums;
            }
        },
        drawchart1(_data){
            let data = {};
            if(!_data){ 
                data.resourceCount = {};
            }else{
                data = _data;
            }
            this.myChart1.showLoading();
            // ----------------
            if(data.resourceCount){
                let arr = [data.resourceCount['5']||0, data.resourceCount['4']||0, data.resourceCount['3']||0, data.resourceCount['2']||0, data.resourceCount['1']||0];
                this.option1.series = [
                    {
                        name: this.$store.state.lang.edu.t12 || '资源数',
                        data: arr,
                        type: 'bar',
                    }
                ]
                this.myChart1.setOption(this.option1);
                setTimeout(()=>{
                    this.myChart1.hideLoading();
                }, 10)
            }
        },
        drawChart2(data){
            let xAxis = [];
            let arr = [];
            if(data){
                data.forEach((_s,s)=>{
                    xAxis.push(_s.monthAndDay);
                    arr.push(_s.minute);
                })
            }
            // 请求数据
            this.myChart2.showLoading();
            this.option2.xAxis.data = xAxis;
            this.option2.series = [
                {
                    name: this.$store.state.lang.slp.t3 || '学习时长',
                    data: arr,
                    type: 'line'
                }
            ]
            this.myChart2.setOption(this.option2);
            setTimeout(()=>{
                this.myChart2.hideLoading();
            }, 10)
        },
        // 加载更多学生答疑
        handleMoreClick(){
            this.$router.push({path:'question'})
        }
    },
    mounted(){
        if(this.$refs.myChart1){
            this.myChart1=echarts.init(this.$refs.myChart1);
            this.myChart1.setOption(this.option1);
        }
        if(this.$refs.myChart2){
            this.myChart2=echarts.init(this.$refs.myChart2);
            this.myChart2.setOption(this.option2);
        }
    }
}
</script>
<style scoped>
    .sy-parhome-bgbor{
        background-color: #fff;
        border:1px solid #c1c1c1;
    }
    .sy-parhome-pointer{cursor: pointer;}
    ::-webkit-scrollbar{display:none;}
    .parhome-body{
        margin:0 auto;
        overflow-y:auto;
    }
    .parhome-tit{
        display: flex;
        justify-content: space-between;
    }
    .parhome-select{
        width: 100px;
        margin:10px 0 0 10px;
    }
    .parhome-chart{height:300px;}
    .parhome-bottom{
        margin-top: 30px;
        line-height: 36px;
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
</style>