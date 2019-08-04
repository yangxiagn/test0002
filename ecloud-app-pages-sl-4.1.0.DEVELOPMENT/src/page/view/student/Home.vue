<template>
    <div class="sy-app-container" style="overflow: auto;">
        <el-row>
            <el-col :span="12">
                <div class="tpl-stu-home-card">
                    <div class="tpl-stu-home-card-header">
                        <el-tabs v-model="activeName1" @tab-click="handleClick">
                            <el-tab-pane :label="$store.state.lang.sls.t1 || '学习进度'" name="1"></el-tab-pane>
                        </el-tabs>
                    </div>
                    <div>
                        <el-table :data="tableData" border height="240">
                            <el-table-column type="index" 
                                :label="$store.state.lang.edu.t37 || '序号'" width="45" align="center"></el-table-column>
                            <el-table-column prop="courseName" 
                                :label="$store.state.lang.sls.t2 || '科目'" width="120" align="center"></el-table-column>
                            <el-table-column prop="resName" show-overflow-tooltip 
                                :label="$store.state.lang.sls.t3 || '当前进度'" align="center"></el-table-column>
                            <el-table-column prop="totalTime" 
                                :label="$store.state.lang.sls.t4 || '累计在线时长'" width="100" align="center">
                                <template scope="scope">
                                    <span>{{scope.row.totalTime}}{{$store.state.lang.edu.t24 || '分钟'}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="tpl-stu-home-card">
                    <div class="tpl-stu-home-card-header">
                        <el-tabs v-model="activeName1" @tab-click="handleClick">
                            <el-tab-pane :label="$store.state.lang.sl.t5 || '直播课堂'" name="1"></el-tab-pane>
                        </el-tabs>
                        <el-button class="more" type="text" @click="$router.push('/sl/home/stutele')">
                            {{$store.state.lang.edu.t52 || '更多'}}
                        </el-button>
                    </div>
                    <div class="tpl-stu-home-zbkc sy-theme-tableBorder">
                        <div class="tpl-stu-home-zbkc-left sy-theme-tableBorder">
                            <div v-for="(o,index) in zbList" :key="index" 
                                :class="{'sy-theme-background': o.selected, 'sy-theme-lightBackground': !o.selected}"
                                :style="{color: o.selected ? '#fff' : '#333'}"
                                @click="handleSelected(o)"
                                class="tpl-stu-home-zbkc-left-card sy-theme-background-hover sy-theme-tableBorder cp">
                                <i>{{o.month}}{{$store.state.lang.edu.t59 || '月'}}</i>
                                <b>{{o.day}}</b>
                                <p>{{week[o.week-1]}}</p>
                            </div>
                        </div>
                        <ul class="tpl-stu-home-zbkc-content sy-theme-tableBorder">
                            <li v-for="(o, index) in zbDetails" :key="index" class="sy-theme-hover" @click="handleToZB(o)">
                                <p><b>{{o.startDate}}</b><span>{{o.teacherName}}{{$store.state.lang.sls.t5||'老师'}}</span></p>
                                <p>{{o.title}}</p>
                            </li>
                        </ul>
                    </div>
                    
                </div>   
            </el-col>
            <el-col :span="24">
                <div class="tpl-stu-home-card">
                    <div class="tpl-stu-home-card-header">
                        <el-tabs v-model="activeName1" @tab-click="handleClick">
                            <el-tab-pane :label="$store.state.lang.sls.t6||'课程详情'" name="1"></el-tab-pane>
                        </el-tabs>
                    </div>
                    <div>
                        <div class="tpl-stu-home-cirle" v-for="item in progress" :key="item.percentage"
                            @click="handleClickProgress(item)" >
                            <el-progress type="circle" :percentage="item.learningProgress" 
                                width="135" stroke-width="18" class="sy-parstudy-pointer">
                            </el-progress>
                            <span>{{item.courseName}}</span>
                        </div> 
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
// 引入echarts
import echarts from 'echarts';
import { selectStudentLearningProgress, select_student_course_details, find_student_live_class_home } from "./request.js";
export default {
    data() {
        return {
            activeName1: '1',
            progress:[],
            tableData:[],
            week: ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
            zbList: [],
            zbDetails: []
        }
    },
    created () {
        this.$parent.$emit('currentPage', '/sl/home/stuhome');
        this.init();
    },
    methods: {
        init(){
            this.getStudyPros();
            this.getCouresDetails();
            this.getZBList();
        },
        // 查询学生主页直播
        getZBList(){
            find_student_live_class_home(5).then(res=>{
                console.log(res)
                if(res && res[0]){
                    res.forEach((_s,s)=>{
                        _s.id = `zb_list_${s}`;
                        if(s == 0){
                            _s.selected = true;
                        }else{
                            _s.selected = false;
                        }
                    })
                }
                this.zbList = res || [];
                this.zbDetails = this.zbList.length > 0 ? this.zbList[0].resultList : [];
            }).catch(err=>{
                
            })
        },
        handleSelected(row){
            for (let i = 0; i < this.zbList.length; i++) {
                let element = this.zbList[i];
                if(element.id == row.id){
                    element.selected = true;
                }else{
                    element.selected = false;
                }
            }
            this.zbDetails = row.resultList || [];
        },
        handleToZB(row){
            // 跳转直播 ---
            console.log(row)
        },
        // 查询学习进度
        getStudyPros(){
            selectStudentLearningProgress().then(res=>{
                this.tableData = res || [];
            }).catch(err=>{
                
            })
        },
        // 课程详情
        getCouresDetails(){
            select_student_course_details().then(res=>{
                if(res){
                    res.forEach(_r=>{
                        _r.learningProgress = parseFloat(_r.learningProgress);
                    })
                }
                this.progress = res || [];
            }).catch(err=>{

            })
        },
        handleChangeCourse(){
            this.drawchart1();
        },
        handleClickProgress(row){
            window.sessionStorage.setItem('_course_data', JSON.stringify(row))
            this.$router.push({path: '/sl/details', query: {type: 'stu'}})
        },
        drawchart1(){
            // 请求数据
            this.myChart.showLoading();
            // ----------------
            let arr1 = [];
            let arr2 = [];
            // 模拟数据生成，柱状图
            for(let i=0; i<5; i++){
                arr1.push(parseInt(Math.random()*20+2));
                arr2.push(parseInt(Math.random()*20+2));
            }
            this.option.series = [
                {
                    data: arr1,
                    type: 'bar',
                },
                {
                    data: arr2,
                    type: 'bar',
                }
            ]
            this.myChart.setOption(this.option);
            setTimeout(()=>{
                this.myChart.hideLoading();
            }, 10)
        },
        // 更多 直播课堂
        hadleClickMore(){
            this.$router.push({path:'stutele'})
        }
    },
    mounted(){
        if(this.$refs.myChart){
            this.myChart=echarts.init(this.$refs.myChart);
            this.myChart.setOption(this.option);
        }
    }
}
</script>
<style scoped>
    .tpl-stu-home-card{
        padding: 10px;
        padding-top: 0;
    }
    .tpl-stu-home-card-header{
        position: relative;
    }
    .tpl-stu-home-card-header>.more{
        position: absolute;
        right: 0;
        top: 10px;
    }
    .tpl-stu-home-zbkc{
        height: 240px;
        box-sizing: border-box;
        overflow: hidden;
    }
    .tpl-stu-home-zbkc-left{
        float: left;
        height: 240px;
        width: 70px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        text-align: center;
    }
    .tpl-stu-home-zbkc-left-card{
        height: 48px;
        position: relative;
        border-bottom: 1px solid #ccc;
        box-sizing: border-box;
    }
    .tpl-stu-home-zbkc-left-card:hover{
        color: #fff;
    }
    .tpl-stu-home-zbkc-left-card>i{
        position: absolute;
        top: 2px;
        right: 2px;
        font-size: 12px;
        font-style: normal
    }
    .tpl-stu-home-zbkc-left-card>b{
        line-height: 24px;
        font-size: 18px;
    }
    .tpl-stu-home-zbkc-left-card>p{
        margin: 0;
        line-height: 24px;
        font-size: 12px;
    }
    .tpl-stu-home-zbkc-content{
        margin-left: 70px;
        height: 240px;
        overflow: hidden;
        border: 1px solid #ccc;
        border-left: 0;
        box-sizing: border-box;
        overflow-y: auto;
        padding: 0 10px;
    }
    .tpl-stu-home-zbkc-content>li{
        border-bottom: 1px solid #ccc;
        padding: 5px 10px;
        cursor: pointer;
    }
    .tpl-stu-home-zbkc-content>li>p{
        line-height: 20px;
    }
    .tpl-stu-home-zbkc-content>li>p>span{
        float: right;
    }
    .tpl-stu-home-cirle{
        float: left;
        margin: 10px;
        position: relative;
        cursor: pointer;
        text-align: center;
    }
    .tpl-stu-home-cirle:hover>span{
        color: #20a0ff;
    }
    .tpl-stu-home-cirle>span{
        position: absolute;
        left: 50%;
        bottom: 43px;
        transform: translateX(-50%);
        font-size: 12px;
    }
</style>