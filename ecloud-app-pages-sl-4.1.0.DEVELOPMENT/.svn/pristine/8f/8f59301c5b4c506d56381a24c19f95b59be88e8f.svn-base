<template>
    <div class="sy-parstudy-index" v-loading="pageloading" 
        :element-loading-text="$store.state.lang.hw.t1||'拼命加载中...'">
        <h3 class="parstudy-h3">{{$store.state.lang.slp.t1||'您孩子的学习'}}</h3>
        <div slot="bodyright" class="sy-parstudy-body">
            <div class="tpl-stu-home-cirle" v-for="item in progress" :key="item.percentage"
                @click="handleClickProgress(item)" >
                <el-progress type="circle" :percentage="item.learningProgress" 
                    width="135" stroke-width="18" class="sy-parstudy-pointer">
                </el-progress>
                <p>{{item.courseName}}</p>
            </div>    
        </div>
    </div>
</template>
<script>
import { select_student_course_details } from "./request.js";
export default {
    data() {
        return {    
            //  未完成=100-已完成-进行中
            pageloading: false,
            progress:[],
        }
    },
    created () {
        this.$parent.$emit('currentPage', '/sl/home/parstudy');
        this.init();
    },
    methods: {
        init(){
            this.getCouresDetails();
        },
        // 课程详情
        getCouresDetails(){
            this.pageloading = true;
            select_student_course_details().then(res=>{
                if(res){
                    res.forEach(_r=>{
                        _r.learningProgress = parseFloat(_r.learningProgress);
                    })
                }
                this.progress = res || [];
                this.pageloading = false;
            }).catch(err=>{
                this.pageloading = false;
            })
        },
        handleClickProgress(row){
            window.sessionStorage.setItem('_course_parent_data', JSON.stringify(row))
            this.$router.push({path: '/sl/home/parlist', query: {value: row.courseValue}})
        },
    }
}
</script>
<style scoped>
    .sy-parstudy-pointer{cursor: pointer;}
    ::-webkit-scrollbar{display:none;}
    .sy-parstudy-index{
        height: 100%;
        padding:0 10px;
        background-color: #FBFCFC;
        overflow-y: auto;
    }
    .parstudy-h3{
        margin-top:10px;
        padding:0 10px;
        line-height: 40px;
        background-color:#eee;
    }
    .sy-parstudy-body{
        
        text-align: center;
    }
    .parstudy-progress{
        width: 135px;
        padding: 40px 33px 0;
    }
    .parstudy-progress p{
        width: 100%;
        padding-top: 10px;
        font-size: 15px;
        text-align: center;
    }
    
    .tpl-stu-home-cirle{
        float: left;
        margin: 10px;
        position: relative;
        cursor: pointer;
        text-align: center;
    }
    .tpl-stu-home-cirle:hover>p{
        color: #20a0ff;
    }
    .tpl-stu-home-cirle>p{
        font-size: 12px;
        line-height: 36px;
    }
</style>