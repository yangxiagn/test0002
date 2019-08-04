<template>
    <div class="sy-count-index">
        <div class="sy-count-wid">
            <div class="count-header">
                <h3>{{$store.state.lang.edu.t1 || '资源分布'}}</h3>
                <el-select class="home-bigselect" style="width:120px;margin-top: 8px;" v-model="queryList.gradeValue" 
                    :placeholder="$store.state.lang.edu.t2 || '请选择年级'" @change="handleGradeChange">
                    <el-option v-for="item in gradelist" :key="item.gradeValue" :label="item.gradeName" :value="item.gradeValue"></el-option>
                </el-select>
                <el-select  class="home-select" style="width:120px;margin-top: 8px;margin-left: 10px;" v-model="queryList.courseValue" 
                    :placeholder="$store.state.lang.edu.t3 || '请选择班级'"  @change="handleCourseChange">
                    <el-option v-for="item in courseDate" :key="item.courseValue" :label="item.name" :value="item.courseValue"></el-option>
                </el-select>
            </div>
            <div ref="myChart1" class="count-bar"></div>
        </div>
        <div>
            <el-tabs class="sy-count-wid" v-model="activeName">
                <!-- 按课时统计 -->
                <el-tab-pane :label="$store.state.lang.edu.t4 || '按课时统计'" name="first">
                    <ks v-if="activeName == 'first'"></ks>
                </el-tab-pane>
                <!-- 按学生统计 -->
                <el-tab-pane :label="$store.state.lang.edu.t5 || '按学生统计'" name="second">
                    <student  v-if="activeName == 'second'"></student>
                </el-tab-pane>
                <!-- 按时长统计 -->
                <el-tab-pane :label="$store.state.lang.edu.t6 || '按时长统计'" name="third">
                    <times  v-if="activeName == 'third'"></times>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
// 引入echarts
import echarts from 'echarts';
import { getCourseGradeTree, getGradeCoursesList, select_res_type_count } from "./request.js";
import ks from "./ks.vue";
import student from "./student.vue";
import times from "./time.vue";
export default {
    components: {
        ks,
        student,
        times
    },
    data() {
        return {    
            queryList: {
                gradeValue: '',
                clazzId: '',
                courseValue: ''
            },
            gradelist: [],
            courseMap: {},
            classlist: [],
            courseDate:[],
            myChart1:null,
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
                        this.$store.state.lang.edu.t7, 
                        this.$store.state.lang.edu.t8, 
                        this.$store.state.lang.edu.t9, 
                        this.$store.state.lang.edu.t10, 
                        this.$store.state.lang.edu.t11
                    ],
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
            activeName: 'first',
            searchInput: '',
            studentDate: [],
            timeDate:[]
        }
    },
    created () {
        this.$parent.$emit('currentPage', '/sl/home/count')
        this.init();
    },
    methods: {
        init(){
            this.getGradeClazzCoures();
        },
        // 查询资源分布
        getFB(){
            select_res_type_count({
                courseValue: this.queryList.courseValue,
                gradeValue: this.queryList.gradeValue
            }).then(res=>{
                this.drawchart1(res);
            })
        },
        // 查询 年级 班级 科目 联动
        getGradeClazzCoures(){
            getGradeCoursesList({unitId: this.$store.state.unitId}).then(res=>{
                this.gradelist = res.gradeSimpleVMs || [];
                this.courseMap = res.courseMap || {};
                this.queryList.gradeValue = this.gradelist.length>0 ? this.gradelist[0].gradeValue : '';
            }).catch(err=>{

            })
        },
        // n年级改变
        handleGradeChange(val){
            this.queryList.courseValue = '';
            this.courseDate = [];
            let gradeId = '';
            this.gradelist.forEach((_s,s)=>{
                if(_s.gradeValue == val){
                    gradeId = _s.id;
                }
            })
            setTimeout(() => {
                this.courseDate = this.courseMap[gradeId];
                this.queryList.courseValue = this.courseDate.length > 0 ? this.courseDate[0].courseValue : '';
            }, 50);
        },
        handleCourseChange(val){
            if(val){
                this.getFB();
            }else{
                this.drawchart1({});
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
                        name: this.$store.state.lang.edu.t12,
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
    },
    mounted () {
        if(this.$refs.myChart1){
            this.myChart1=echarts.init(this.$refs.myChart1);
            this.myChart1.setOption(this.option1);
        }
    }
}
</script>
<style scoped>
    /* 公共样式 */
    .sy-count-wid{
        padding: 3px 10px;
    }
    .sy-count-index{
        height: 100%;
        background-color: #FBFCFC;
        overflow-y: auto;
    }
    .count-header{
        display: flex;
        justify-content: space-between;
    }
    .count-header h3{flex: 1;}
    .count-select{
        width: 100px;
        margin:10px 0 0 10px;
    }
    .count-bigselect{
        width: 135px;
        margin:10px 0 0 10px;
    }
    .count-bar{
        height:300px;
        border:1px solid #c1c1c1;
    }
    .count-list{      
        height:360px;
        border-bottom:1px solid #eee;
        overflow-y:auto;
    }
    .count-tabs{padding-bottom: 20px;}
    .count-tabsel{
        width: 100px;
        margin-right:10px;
    }
    .count-bigtabsel{
        width: 135px;
        margin-right:10px;
    }
    .count-input{width:180px;}
    .count-table{width: 100%;}
    .count-tabscon{padding:0 20px 20px;}
    .count-tabslist{
        float: left;
        width:66%;
        height: 360px;
        box-sizing: border-box;
        padding-right: 1%;
        overflow-y: auto;
    }
    .count-expend{
        display:flex;
        justify-content:flex-end;
        line-height:40px;
        text-align:center;
    }
    .count-expend div{
        width: 33.3%;
        text-align: left;
    }
    .count-tabscir{
        float: right;
        width:30%;
        height: 360px;
        margin-left: 3%;
        box-sizing: border-box;
        border-left:1px solid #e5e5e5;
    }  
    .count-expend p{width:25%;}   
    /* 去除框架样式 */
    .el-table::before{height:0;}
</style>