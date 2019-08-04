<template>
    <div v-loading="pageLoading" :element-loading-text="$store.state.lang.hw.t1 || '拼命加载中...'" style="width: 100%;">
        <div style="line-height:40px;width: 100%;" >
            <div class="sy-hw-student-header sy-theme-extraLightBlack-background">
                <div class="sy-hw-student-header-title center">{{hwName}}</div>
            </div>
        </div>
        <div slot="bodyRight">
            <div class="sy-hw-student-body">
                <div slot="bodyRight" style="padding:0 10px;" >
                    <div class="sy-hw-student-body sy-theme-extraLightGray">
                        <ul class="sy-hw-student-body-hw" v-if="hwData.length > 0">
                            <li v-for="(lib, i) in hwData" :key="'lib_'+i">
                                <div class="title" style="overflow:hidden;margin-top:10px;padding:0 10px">
                                    <div style="float: left;width: 22px;line-height: 30px;">
                                        <span>{{lib.sort}}、</span>
                                    </div>
                                    <div style="margin-left: 22px;line-height: 30px;">
                                        <!-- 题干 -->
                                        <span v-html="lib.simpleContent"></span>
                                        <span v-if="lib.topicTypeId == '1' || lib.topicTypeId == '3' && lib.stuAnswer">（{{lib.stuAnswer}}）</span>
                                        <span v-if="lib.topicTypeId == '2' && lib.stuAnswers.length > 0">（{{lib.stuAnswers.join('')}}）</span>
                                        <span v-if="isShowAnswer">
                                            <i v-if="lib.stuAnswer == lib.rightAnswer || isRightAnswer(lib.rightAnswer, lib.stuAnswers)" 
                                                style="color: #13CE66;font-size: 30px;vertical-align: middle;position: relative;top: -2px;" 
                                                class="fa fa-check" aria-hidden="true"></i>
                                            <i v-else style="color: #FF4949;font-size: 30px;vertical-align: middle;position: relative;top: -2px;" 
                                                class="fa fa-times" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                </div>
                                <!-- 单选 -->
                                <div class="selsect" v-if="lib.topicTypeId == '1'">
                                    <el-radio-group v-model="lib.stuAnswer">
                                        <el-radio :disabled="isShowAnswer" v-for="opt in lib.itemAndContent" :key="opt.id" 
                                            :label="opt.item" style="width: 100%;margin: 5px 0;">
                                            <span v-html="opt.item +'、'+ opt.content"></span>
                                        </el-radio>
                                    </el-radio-group>
                                </div>
                                <!-- 多选 -->
                                <div class="selsect" v-if="lib.topicTypeId == '2'">
                                    <el-checkbox-group v-model="lib.stuAnswers">
                                        <el-checkbox :disabled="isShowAnswer" style="width: 100%;margin: 5px 0;" 
                                            v-for="(opt,index) in lib.itemAndContent" :label="opt.item" :key="index">
                                            <span v-html="opt.item +'、'+ opt.content"></span>
                                        </el-checkbox>
                                    </el-checkbox-group>
                                </div>
                                <!-- 判断 -->
                                <div class="selsect" v-if="lib.topicTypeId == '3'">
                                    <el-radio-group v-model="lib.stuAnswer">
                                        <el-radio :disabled="isShowAnswer" v-for="(opt,index) in lib.itemAndContent" 
                                            :label="opt.item" :key="index">{{opt.item + '、' +opt.content}}</el-radio>
                                    </el-radio-group>
                                </div>
                            </li>
                        </ul>
                        <div v-else class="sy-hw-no-data">
                            <i style="font-size: 26px;color:#F7BA2A;" class="fa fa-slideshare" aria-hidden="true"></i> 
                            <span style="padding-left: 20px;color: #777;">{{$store.state.lang.hw.t28||'没有可练习的错题！'}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div slot="footer" class="center" v-if="hwData.length != 0">
            <el-button type="primary" @click="isShowAnswer = true">{{$store.state.lang.hw.t29||'查看练习结果'}}</el-button>
            <el-button type="" @click="init">{{$store.state.lang.hw.t30||"重新练习"}}</el-button>
            <el-button type="" @click="gobanck">{{$store.state.lang.button.back||'返回'}}</el-button>
        </div>
    </div>
</template>
<script>
import {selectErrorTopic } from "./request.js";
export default {
    name: '',
    props: {
        resId: {
            type: String,
            default: ''
        }
    },
    data(){
        return { 
            pageLoading: false,
            hwName: window.sessionStorage.getItem('studentHwName'),
            hwData: [],
            isShowAnswer: false // 是否显示答案
        }
    },
    computed: {
        maxhw: function () {
            if(this.hwData.length > 0){
                return this.hwData[0].children.length
            }else{
                return {}
            }
        }
    },
    watch: {
        resId(newVal, oldVal){
            
            this.init()
        }
    },
    created () {
        this.init()
    },
    methods: {
        init(){
            this.isShowAnswer = false;
            this.selectStudentHw();
        },
        isRightAnswer(a,b){
            b = this.$_.cloneDeep(b);
            let bb = b.sort(function(a,b){return a>b}).join('')
            return a == bb
        },
        // 查询作业
        selectStudentHw(){
            this.hwData = [];
            this.pageLoading = true;
            selectErrorTopic(this.resId).then((res)=>{
                this.pageLoading = false;
                let arr = [];
                if(res){
                    res.forEach((_d,d) => {
                        let _boj = {
                            sort: d+1, // 序号
                            isRight: false, // 是否正确
                            topicTypeId: _d.topicTypeId, // 题型
                            simpleContent: _d.simpleContent,  //题干
                            itemAndContent: [], // 选项
                            rightAnswer: '', // 正确答案
                            stuAnswer: '', // 单选 判断题 学生 答案
                            stuAnswers: [], // 多选题 学生 答案
                        }
                        let _arr = [];
                        _d.itemAndContent.forEach((_s,s)=>{
                            _arr.push({
                                id: _s.id,
                                item: _s.item,
                                content: _s.content
                            })
                        })
                        // 正确答案
                        let answer = this.$_.map(this.$_.filter(_arr, o=>{ return this.$_.find(_d.optionId,n=>{return n == o.id})}), 'item') 
                        _boj.rightAnswer = answer.sort(function(a,b){return a>b}).join('')
                        _boj.itemAndContent = _arr;
                        arr.push(_boj);
                    });
                }
                this.hwData = arr;
            }).catch(err=>{
                this.pageLoading = false;
            })
        },
        //返回
        gobanck(){
            this.$router.push({path: '/sl/home/stuhome'})
        },
    }
}
</script>
<style scoped>
.sy-hw-app-container{
    position: absolute;
    top: 10px;
    left: 20px;
    right: 20px;
    bottom: 10px;
    box-sizing: border-box;
}
.sy-hw-student-header{
    box-sizing: border-box;
    background-color: #666;
    height: 40px;
    line-height: 40px;
    color: #fff;
}
.sy-hw-student-header-title{
    font-size: 16px;
    padding: 0 15px;
    box-sizing: border-box;
}
.sy-hw-student-body{
    position: relative;
    height: 100%;
    box-sizing: border-box;
    overflow-y: hidden;
}
.sy-hw-student-body_title{box-sizing: border-box;}
.sy-hw-student-body_title>ul{overflow: hidden;}
.sy-hw-student-body_title>ul>li{
    float: left;
    cursor: pointer;
    height: 38px;
    width: 38px;
    margin-right: 10px;
    text-align: center;
    border: 1px solid #cccccc;
    line-height: 38px;
    box-sizing: border-box;
    font-size: 14px;
    margin-bottom: 5px;
}
.sy-hw-student-body_title>ul>li.success{
    background-color: #13CE66;
    color: #fff;
}
.sy-hw-student-body_title>ul>li.warning{
    background-color: #F7BA2A!important;
    color: #fff;
}
.sy-hw-student-body-hw{
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 20px 80px;
    overflow: auto;
    position: relative;
    height: 100%;
}
.sy-hw-student-body-hw>li:not(.sy-hw-clear) {
    margin-bottom: 20px;
    line-height: 30px;
    background-color: #fff;
    box-sizing: border-box;
    font-size: 14px;
    position: relative;
    padding: 0 0 20px;
    overflow: hidden;
}
.sy-hw-student-body-hw>li>b{
    float: right;
    width: 60px;
    height: 60px;
    text-align: right;
    cursor: pointer;
    position: relative;
}
.sy-hw-student-body-hw>li>b>span{
    position: relative;
    z-index: 10;
    font-size: 12px;
    padding-right: 5px; 
    color: #666;
}
.sy-hw-student-body-hw>li>b>i{
    position: absolute;
    width: 0;
    height: 0;
    right: 0;
    border: 0;
    border-top: 60px solid #ccc;
    border-left: 60px solid transparent; 
}
.sy-hw-student-body-hw>li>b.marking>span{color: #fff;}
.sy-hw-student-body-hw>li>b.marking>i{border-top-color: #F7BA2A;}
.sy-hw-student-body-hw>li:last-child {margin-bottom: 0;}
.sy-hw-student-body-hw>li .add-btn{
    position: absolute;
    right: 0;
    bottom: 0;
    width: 130px;
    box-sizing: border-box;
    height: 32px;
    line-height: 32px;
    background: #CCCCCC;
    border:  0;
    border-color: #c4c4c4;
    color: #333;
    outline: none;
    font-size: 14px;
    padding-top: 0;
    border-radius: 0;
}
.sy-hw-student-body-hw>li .add-btn:hover{background: #A9A9A9;}
.sy-hw-student-body-hw>li .add-btn[disabled]{  
    background-color: #dddddd;  
    color: #aaa;
} 
.sy-hw-student-body-hw>li div.title,.sy-hw-student-body-hw>li div.selsect{
    padding-right: 30px;
    padding-left: 15px;
    padding-bottom: 0px;
    font-size: 14px;
    padding-top: 10px;
}
.sy-hw-student-body-hw>li div.selsect{padding-left: 35px;}
.sy-hw-student-body-hw>li div.select>div.select_7{
    line-height: 30px;
    margin-bottom: 10px;
}
.sy-hw-student-body-hw>li div.select>div.select_7:last-child{margin-bottom: 0;}
.sy-hw-no-data{
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%,-50%)
}
</style>