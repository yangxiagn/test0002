<template>
    <div class="sy-exam-paper-img-box" ref="exambox" :class="{'sy-hw-app-container': !isfullscreen, 'sy-exam-full-container' : isfullscreen}"  >
        <div v-if="!isStarted" class="sy-hw_add_box" v-loading="pageloading" element-loading-text="拼命加载中...">
            <div style="padding: 30px 50px;">
                <div class="sy_hw_box_row">
                    <el-row >
                        <el-col :span="3" class="sy_hw_box_img">
                            <img :src="form.avatar"/>
                        </el-col>
                        <el-col :span="21">
                            <el-row style="line-height:36px;">
                                <el-col :span="6" style="padding-left: 20px;">姓名： {{form.userName}}</el-col>
                                <el-col :span="6" style="padding-left: 20px;">年级： {{form.gradeName}}</el-col>
                                <el-col :span="6" style="padding-left: 20px;">考试时间： {{form.limitTime == -1 ? '不限' : `${form.limitTime} 分钟`}}</el-col>
                                <el-col :span="6" style="padding-left: 20px;">考试总分： {{form.totalScore}}</el-col>
                                <el-col :span="6" style="padding-left: 20px;">学号： {{form.userNumber}}</el-col>
                                <el-col :span="6" style="padding-left: 20px;">课程： {{form.courseName}}</el-col>
                                <el-col :span="6" style="padding-left: 20px;">题目数量： {{form.topicCount}}</el-col>
                                <el-col :span="6" style="padding-left: 20px;">及格分： {{form.passPoints}}</el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>    
            </div>
            <div class="sy-hw_add_box_body sy-theme-extraLightGray">
                <h4>考试说明</h4>
                <p>本次考试请同学们认真完成！</p>
                <el-collapse-transition>
                    <div v-show="isShowAll">
                        <p class="left">{{form.description}}</p>
                    </div>
                </el-collapse-transition>
                <div v-show="form.description" class="sy-hw_btn" @click="isShowAll = !isShowAll">
                    <i v-if="!isShowAll" class="fa fa-angle-double-down" aria-hidden="true"></i>
                    <i v-else class="fa fa-angle-double-up" aria-hidden="true"></i>
                </div>
            </div>
            <div class="sy-hw_add_box_footer" style="text-align:center;">
                <el-button @click="handleStart" type="success" :loading="saveLoading">开始考试</el-button>
                <el-button @click="gobanck">返回</el-button>
            </div>
        </div>
        <div v-if="isStarted" v-loading="pageLoading" element-loading-text="拼命加载中...">
            <div slot="headerRight" style="line-height:40px;">
                <div class="sy-hw-student-header sy-theme-extraLightBlack-background">
                    <div class="sy-hw-student-header-ctr">
                        <sy-time v-if="hwTimes != 0" :time="hwTimes" width="190px" class="sy-hw-student-header-time"></sy-time>
                        <button class="sy-hw-student-header-submit sy-theme-background" @click="saveHomeWork">{{$store.state.lang.exam.t17||"我要交卷"}}</button>
                    </div>
                    <div class="sy-hw-student-header-title">{{hwName}}</div>
                </div>
            </div>
            <div slot="bodyRight">
                <div class="sy-hw-student-body">
                    <div :headerH="headerHeight">
                        <div ref="headerRight" style="line-height:30px;padding: 0 10px;">
                            <el-tabs v-model="activeName" @tab-click="handleClick" v-if="!openOneHw">
                                <el-tab-pane v-for="(big, index) in hwData" :name="big.id" :key="index+'_big'">
                                    <span slot="label" >{{$store.state.lang.exam.t18||"第"}}{{index+1}}{{$store.state.lang.exam.t19||"大题"}}</span>
                                    <div class="sy-hw-student-body_title">
                                        <ul>
                                            <li v-for="(lib, i) in big.children" :key="'lib_'+i" @click="handleJump(lib)" :class="{success: lib.isFinished, warning: lib.isMarking}">
                                                <a :href="`#question_${lib.sort}`">{{lib.sort}}</a>
                                            </li>
                                        </ul>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>   
                            <div class="sy-hw-student-body_title" v-else>
                                <ul style="padding: 10px 0px;">
                                    <li v-for="(lib, i) in resultData" :key="'lib_'+i" :style="{'background': currentHwIndex == lib.sort ? '#20A0FF' : ''}" 
                                        @click="handleJump(lib)" :class="{success: lib.isFinished, warning: lib.isMarking}">
                                        <a :href="`#question_${lib.sort}`">{{lib.sort}}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div slot="bodyRight" style="padding:10px 10px 0 10px;" >
                            <div class="sy-hw-student-body sy-theme-extraLightGray">
                                <div class="sy-hw-student-body-hw">
                                    <div v-for="(big, index) in hwData" :key="index+'_big'" v-if="!openOneHw" >
                                        <h4>{{big.num}}、{{big.name}}（{{big.score}}分）</h4>
                                        <ul>
                                            <li v-for="(lib, i) in big.children" :id="'question_'+lib.sort" :key="'lib_'+i">
                                                <b @click="handleMark(lib)" :class="{marking: lib.isMarking}"><span>{{$store.state.lang.hw.t4 || '标记'}}</span><i></i></b>
                                                <div class="title" style="overflow:hidden;margin-top:10px;padding:0 10px">
                                                    <div style="float: left;width: 22px;line-height: 30px;">
                                                        <span>{{lib.sort}}、</span>
                                                    </div>
                                                    <div style="margin-left: 22px;line-height: 30px;">
                                                        <!-- 题干 -->
                                                        <span v-html="lib.content"></span>
                                                    </div>
                                                </div>
                                                <!-- 单选 -->
                                                <div class="selsect" v-if="lib.topicTypeId == '1'">
                                                    <el-radio-group v-model="lib.computAnswer" @change="handleChange(lib)">
                                                        <el-radio v-for="opt in lib.libTopicOptionRelVMs" :key="opt.id" :label="opt.id" style="width: 100%;margin: 5px 0;">
                                                            <span v-html="opt.item +'、'+ opt.content"></span>
                                                        </el-radio>
                                                    </el-radio-group>
                                                </div>
                                                <!-- 多选 -->
                                                <div class="selsect" v-if="lib.topicTypeId == '2'">
                                                    <el-checkbox-group v-model="lib.computAnswers" @change="handleChange2(lib)" :min="1">
                                                        <el-checkbox style="width: 100%;margin: 5px 0;" v-for="(opt,index) in lib.libTopicOptionRelVMs" :label="opt.id" :key="index">
                                                            <span v-html="opt.item +'、'+ opt.content"></span>
                                                        </el-checkbox>
                                                    </el-checkbox-group>
                                                </div>
                                                <!-- 判断 -->
                                                <div class="selsect" v-if="lib.topicTypeId == '3'">
                                                    <el-radio-group v-model="lib.computAnswer" @change="handleChange(lib)">
                                                        <el-radio v-for="(opt,index) in lib.libTopicOptionRelVMs" :label="opt.id" :key="index">{{opt.content}}</el-radio>
                                                    </el-radio-group>
                                                </div>
                                                <!-- 填空 -->
                                                <div class="selsect" v-if="lib.topicTypeId == '4'">
                                                    <div v-for="opt in lib.libTopicOptionRelVMs" :key="opt.id" style="display: inline-block;margin-right: 10px;">
                                                        <span>（{{opt.item}}）、</span>
                                                        <el-input v-model="opt.computAnswer" :maxlength="100" @blur="handleChange4(lib)" 
                                                            style="width: 240px;" :placeholder="$store.state.lang.hw.t5 || '请输入内容'"></el-input>
                                                    </div>
                                                </div>
                                                <!-- 计算题 问答题 作文  -->
                                                <div class="selsect" v-if="lib.topicTypeId == '5' || lib.topicTypeId == '6' || lib.topicTypeId == '8'">
                                                    <sy-ue :ref="`question_answer_${lib.id}`" class="sy-ue-style" v-model="lib.computAnswer"
                                                        :default-msg="lib.computAnswer" :config="ueIndexConfig" :max-len="1000"></sy-ue>
                                                </div>
                                                <!-- 简答题 阅读理解  -->
                                                <div class="selsect" v-if="lib.topicTypeId == '7' || lib.topicTypeId == '9'">
                                                    <div class="select_7" v-for="opt in lib.libTopicOptionRelVMs" :key="opt.id">
                                                        <div><span v-html="opt.item +'、'+ opt.content"></span></div>
                                                        <sy-ue :ref="`question_answers_${opt.id}`" class="sy-ue-style" v-model="opt.computAnswer" 
                                                            :default-msg="opt.computAnswer" :config="ueIndexConfig" :maxLen="1000"></sy-ue>
                                                    </div>
                                                </div>                                               
                                                <!-- 听力 -->
                                                <div class="selsect" v-if="lib.topicTypeId == '10'">
                                                    <el-radio-group v-model="lib.computAnswer" @change="handleChange(lib)">
                                                        <el-radio v-for="opt in lib.libTopicOptionRelVMs" :key="opt.id" :label="opt.id" style="width: 100%;margin: 5px 0;">
                                                            <span v-html="opt.item +'、'+ opt.content"></span>
                                                        </el-radio>
                                                    </el-radio-group>
                                                </div>
                                                <el-button :disabled="lib.isAddNote" class="add-btn"  @click="addIgnoreNote(lib)">
                                                    {{$store.state.lang.hw.t6 || '加入疑难本'}}
                                                </el-button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div v-if="openOneHw" >
                                        <ul>
                                            <li v-for="(lib, i) in resultData" v-show="lib.sort == currentHwIndex" :id="'question_'+lib.sort" :key="'lib_'+i">
                                                <b @click="handleMark(lib)" :class="{marking: lib.isMarking}"><span>{{$store.state.lang.hw.t4 || '标记'}}</span><i></i></b>
                                                <div class="title" style="overflow:hidden;margin-top:10px;padding:0 10px">
                                                    <div style="float: left;width: 22px;line-height: 30px;">
                                                        <span>{{lib.sort}}、</span>
                                                    </div>
                                                    <div style="margin-left: 22px;line-height: 30px;">
                                                        <!-- 题干 -->
                                                        <span v-html="lib.content"></span>
                                                    </div>
                                                </div>
                                                <!-- 单选 -->
                                                <div class="selsect" v-if="lib.topicTypeId == '1'">
                                                    <el-radio-group v-model="lib.computAnswer" @change="handleChange(lib)">
                                                        <el-radio v-for="opt in lib.libTopicOptionRelVMs" :key="opt.id" :label="opt.id" style="width: 100%;margin: 5px 0;">
                                                            <span v-html="opt.item +'、'+ opt.content"></span>
                                                        </el-radio>
                                                    </el-radio-group>
                                                </div>
                                                <!-- 多选 -->
                                                <div class="selsect" v-if="lib.topicTypeId == '2'">
                                                    <el-checkbox-group v-model="lib.computAnswers" @change="handleChange2(lib)" :min="1">
                                                        <el-checkbox style="width: 100%;margin: 5px 0;" v-for="(opt,index) in lib.libTopicOptionRelVMs" :label="opt.id" :key="index">
                                                            <span v-html="opt.item +'、'+ opt.content"></span>
                                                        </el-checkbox>
                                                    </el-checkbox-group>
                                                </div>
                                                <!-- 判断 -->
                                                <div class="selsect" v-if="lib.topicTypeId == '3'">
                                                    <el-radio-group v-model="lib.computAnswer" @change="handleChange(lib)">
                                                        <el-radio v-for="(opt,index) in lib.libTopicOptionRelVMs" :label="opt.id" :key="index">{{opt.content}}</el-radio>
                                                    </el-radio-group>
                                                </div>
                                                <!-- 填空 -->
                                                <div class="selsect" v-if="lib.topicTypeId == '4'">
                                                    <div v-for="opt in lib.libTopicOptionRelVMs" :key="opt.id" style="display: inline-block;margin-right: 10px;">
                                                        <span>（{{opt.item}}）、</span>
                                                        <el-input v-model="opt.computAnswer" :maxlength="100" @blur="handleChange4(lib)" style="width: 240px;" 
                                                        :placeholder="$store.state.lang.hw.t5 || '请输入内容'"></el-input>
                                                    </div>
                                                </div>
                                                <!-- 计算题 问答题 作文  -->
                                                <div class="selsect" v-if="lib.topicTypeId == '5' || lib.topicTypeId == '6' || lib.topicTypeId == '8'">
                                                    <sy-ue :ref="`question_answer_${lib.id}`" class="sy-ue-style" v-model="lib.computAnswer"
                                                        :default-msg="lib.computAnswer" :config="ueIndexConfig" :max-len="1000"></sy-ue>
                                                </div>
                                                <!-- 简答题 阅读理解  -->
                                                <div class="selsect" v-if="lib.topicTypeId == '7' || lib.topicTypeId == '9'">
                                                    <div class="select_7" v-for="opt in lib.libTopicOptionRelVMs" :key="opt.id">
                                                        <div><span v-html="opt.item +'、'+ opt.content"></span></div>
                                                        <sy-ue :ref="`question_answers_${opt.id}`" class="sy-ue-style" v-model="opt.computAnswer" 
                                                            :default-msg="opt.computAnswer" :config="ueIndexConfig" :maxLen="1000"></sy-ue>
                                                    </div>
                                                </div>                                                
                                                <!-- 听力 -->
                                                <div class="selsect" v-if="lib.topicTypeId == '10'">
                                                    <el-radio-group v-model="lib.computAnswer" @change="handleChange(lib)">
                                                        <el-radio v-for="opt in lib.libTopicOptionRelVMs" :key="opt.id" :label="opt.id" style="width: 100%;margin: 5px 0;">
                                                            <span v-html="opt.item +'、'+ opt.content"></span>
                                                        </el-radio>
                                                    </el-radio-group>
                                                </div>
                                                <el-button :disabled="lib.isAddNote" class="add-btn"  @click="addIgnoreNote(lib)">
                                                    {{$store.state.lang.hw.t6 || '加入疑难本'}}
                                                </el-button>
                                            </li>
                                            <li class="center sy-hw-clear">
                                                <el-button-group>
                                                    <el-button type="primary" :disabled="currentHwIndex == 1" icon="arrow-left" 
                                                        @click="handleNext('pre')">{{$store.state.lang.hw.t7 || "上一题"}}</el-button>
                                                    <el-button type="primary" :disabled="currentHwIndex == maxhw" @click="handleNext('next')">
                                                        {{$store.state.lang.hw.t8 || '下一题'}}
                                                        <i class="el-icon-arrow-right el-icon--right"></i>
                                                    </el-button>
                                                </el-button-group>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <sy-dialog :title="$store.state.lang.exam.t20 || '上交练习提示'" :visible.sync="confimVisible" width="400px" height="200px"> 
            <div slot="body"  style="padding:10px 10px;line-height: 50px;" class="center">
                <h4>{{$store.state.lang.hw.t9 || '您还有'}}<span style="padding: 0 20px;border-bottom: 1px solid #666;">{{number}}
                    </span>{{$store.state.lang.hw.t10 || '题未完成，确认上交吗？'}}</h4>
            </div>
            <div slot="footer">
                <el-button @click="confimVisible=false">{{$store.state.lang.hw.t12 || '继续做题'}}</el-button>
                <el-button type="primary" :loading="saveHomeWorkloading" @click="subminHw">{{$store.state.lang.hw.t13 || "确定上交"}}</el-button>
            </div>
        </sy-dialog>
    </div>
</template>
<script>
import screenfull from 'screenfull';
import syTime from "./time.vue";
import {
    getTimeLefts,
    select_student_exam_type_by_groupid,
    selectStudentByIdHw,
    autoSaveHomeWork,
    saveHomeWork,
    saveHomeWorkHw,
    saveNote, 
    examTemplate,
    selectExamById,
    getGradeCourses,
    userPhoto,
    selectEaxamDetail,
    startExam } from "./request.js";
export default {
    name: '',
    mixins: [],
    props: {
        resId: {
            type: String,
            default: ''
        },
        examId: {
            type: String,
            default: ''
        }
    },
    components: {
        syTime: syTime
    },
    data(){
        return { 
            isStarted: true,
            form:{
                avatar:'', //学生头像
                courseName :'', //课程名称
                description :'', //作业说明
                gradeName :'', //年纪名称
                id :'', //作业ID
                limitTime :'',  //限制时间
                topicCount :'', //题目数量
                userId :'',
                userName :'',
                userNumber :'',
                passPoints:'',
                totalScore:''
            },
            saveLoading:false,
            isShowAll: false,
            pageloading: false,
            // -----------------------
            number: 0,
            currentHwIndex: 1,
            openOneHw: false,
            noteloading: false,
            confimVisible: false,
            pageLoading: false,
            saveHomeWorkloading: false,
            ueIndexConfig: {
                initialFrameHeight: 100,
                zIndex: 1500,
                toolbars: [
                    [
                        'bold', 'italic', 'underline', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', 'insertorderedlist', 'insertunorderedlist', 'fontfamily', 'fontsize',
                        'paragraph', 'simpleupload', 'link', 'unlink', 'forecolor', 'backcolor',
                        'date', 'superscript', 'subscript', 'strikethrough', 'removeformat', 'source', 'equation',
                        // 音频、附件
                        // 'music','attachment',
                    ]
                ]
            },
            hwName: '',
            hwTimes: 0,
            hwData: [],
            resultData: [],
            headerHeight: '40px',
            isLoading: false,
            __resizeHanlder: null,
            activeName: '',
            examCtrlVM: {
                finishOftime: '',
                hweId: '',
                id: '',
                isFullscreen: false,
                isOutOrder: '',
                isShowAnswer: '',
                isShowPosition: '',
                queryTime: '',
                queryType: '',
                timeMode: '' //  [{value: '1',label: '按打开试卷的时间计时'},{value: '2',label: '按考试开始的时间计时'}],
            },
            isfullscreen: false
        }
    },
    computed: {
        maxhw: function () {
            if(this.resultData.length > 0){
                return this.resultData.length
            }else{
                return {}
            }
        }
    },
    created () {
        this._init()
    },
    updated(){
        this.$nextTick(()=>{
            this.computHeight();
        })
    },
    mounted(){
        // this.$nextTick( ()=>{
        //     this.launchFullscreen(document.documentElement);
        // })
        
        // this.__resizeHanlder = () => {
        //     this.$nextTick(function () {
        //         this.computHeight();
        //     })
        // }
        // window.addEventListener('resize', this.__resizeHanlder)
    },
    destroyed(){
        // if(!this.__resizeHanlder){
        //     return
        // }else{
        //     window.removeEventListener('resize', this.__resizeHanlder)
        // }
        // this.__resizeHanlder = null;
    },
    watch: {
        resId(newVal,oldval) {
            this.selectStudentHw();
        }
    },
    methods: {
        //---------------------------------------------------------------------------------
        init(){
            // this.getTimes();
            this.selectStudentHw();
        },
        _init(){
            // this.selectHwDetail();  
            this.handleStart();      
        },
        //页面详情
        selectHwDetail(){
            this.pageloading=true;
            selectEaxamDetail(this.examId).then(res =>{
                this.form.avatar = userPhoto + res.userId;
                this.form.courseName = res.courseName;
                this.form.description = res.description;
                this.form.gradeName = res.gradeName;
                this.form.id = res.id;
                this.form.limitTime = res.limitTime;
                this.form.passPoints = res.passPoints;
                this.form.totalScore = res.totalScore;
                this.form.userName = res.userName;
                this.form.userNumber = res.userNumber;
                this.form.topicCount = res.topicCount;
                selectExamById(this.examId).then(data=>{
                    this.examCtrlVM.isFullscreen = data.examCtrlVM.isFullscreen;
                    this.isfullscreen = data.examCtrlVM.isFullscreen;
                    this.openOneHw = data.topicShowType == 2 ? true : false;
                    this.pageloading=false;
                }).catch(err=>{
                    this.pageloading=false;
                })
                
            }).catch((err)=>{
                this.pageloading=false;
            })

        },
        // 查询年级班级
        getGradeCourses(){
            getGradeCourses().then((data)=>{
                this.options.grade = data.gradeSimpleVMs;
                this.form.gradeId = this.options.grade.length > 0 ? this.options.grade[0].id : '';
                this.courseMap = data.courseMap;
            }).catch((err)=>{
                
            })
        },
        //返回
        gobanck(){
            this.$router.push({path: '/exam/stu/stuexam'})
        },
        handleStart(){
            this.isStarted = true;
            this.saveLoading = true;
            // if(this.isfullscreen){
            //     this.open();
            // }
            startExam(this.resId).then((res)=>{
                this.saveLoading = false;
                this.init();
            }).catch(err=>{
                this.saveLoading = false;
            })
        },
        open(t) {
            if (!screenfull.enabled) {
                this.$message({
                    message: 'you browser can not work',
                    type: 'warning'
                })
                return false
            }
            screenfull.request()
            if (this.isfullscreen) {
                this.onFullScreenEvent(this.fullScreenCallback);
                this.preventDefault();
            } else {
                this.offFullScreenEvent(this.fullScreenCallback)
            }
        },
        preventDefault(){
            var isCtrl = false;  
            document.onkeyup=function(e){  
                if(e.which == 17)  
                    isCtrl=false;  
            }  
            document.onkeydown=function(e){  
                if(e.which == 27){
                    isCtrl=true; 
                }//键盘的Ctrl键  
                if((e.which == 27) && isCtrl == true){  
                    console.log('assasdfsdfasfasfsadfasfasfasdfasdfasdfasdfasdf');
                    e.preventDefault()
                    return false;  
                }  
            }  
            var isNS = (navigator.appName == "Netscape") ? 1 : 0;  
            if(navigator.appName == "Netscape") document.captureEvents(Event.MOUSEDOWN||Event.MOUSEUP);  
            function mischandler(){  
                return false;  
            }  
            function mousehandler(e){//屏蔽鼠标右键  
                var myevent = (isNS) ? e : event;  
                var eventbutton = (isNS) ? myevent.which : myevent.button;  
                if((eventbutton==2)||(eventbutton==3)) return false;  
            }  
            document.oncontextmenu = mischandler;  
            document.onmousedown = mousehandler;  
            document.onmouseup = mousehandler;    
        },
        fullScreenCallback() {
            let isFullscreen = this.fullScreenStatus()
            if (!isFullscreen) {
                // 退出全屏时解绑回调
                this.offFullScreenEvent(this.fullScreenCallback)
            }
        },
        fullScreenStatus() {
            if (document.fullscreen ||
                document.mozFullScreen ||
                document.fullscreenElement ||
                document.msFullscreenElement ||
                document.webkitIsFullScreen) {
                return true
            } else {
                return false
            }
        },
        onFullScreenEvent(callback) {
            document.addEventListener('fullscreenchange', callback)
            document.addEventListener('mozfullscreenchange', callback)
            document.addEventListener('MSFullscreenChange', callback)
            document.addEventListener('webkitfullscreenchange', callback)
        },
        offFullScreenEvent(callback) {
            document.removeEventListener('fullscreenchange', callback)
            document.removeEventListener('mozfullscreenchange', callback)
            document.removeEventListener('MSFullscreenChange', callback)
            document.removeEventListener('webkitfullscreenchange', callback)
        },
        launchFullscreen(element) {
            if(element.requestFullscreen) {
                element.requestFullscreen();
            } else if(element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if(element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if(element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        },
        // 计算高度
        computHeight(){
            this.$nextTick(()=>{
                if(this.$refs.headerRight){
                    this.headerHeight = this.$refs.headerRight.scrollHeight-5 + 'px';
                }else{
                    this.headerHeight = '40px';
                }
            })
        },
        // 查询剩余时间
        getTimes(){
            getTimeLefts(this.examId).then((data)=>{
                this.hwName = data.name;
                if(data.flag){
                    this.hwTimes = data.timeLeft / 1000;
                }else{
                    this.hwTimes = 0;
                }
            })
        },
        // 获取没有答题的第一个
        getFirstNUm(id){
            this.activeName = id;
        },
        // 查询作业
        selectStudentHw(){
            this.pageLoading = true;
            this.hwData = [];
            selectStudentByIdHw(this.resId).then((res)=>{
                this.isLoading = false;
                let arr = [];
                let arr1 = [];
                let num = 1;
                if(res){
                    res.forEach((_d,d) => {
                        let obj = {
                            id: _d.id,
                            name: _d.name,
                            num: d+1,
                            score: _d.score,
                            children: []
                        };
                        let topics=[];
                        if(_d.searchZyReadingTopicsVMs){
                            _d.searchZyReadingTopicsVMs.forEach((_s,s)=>{
                                let lib = _s.libTopicRelVMs || [];
                                let _topicTypeId = lib.length >0 ? lib[0].topicTypeId : '';
                                let _boj = {
                                    sort: num,
                                    groupId: _s.groupId,
                                    id: _s.id,
                                    pid: _d.id,
                                    isLoading: false,
                                    isMarking: lib[0].isSign==1?true:false,
                                    isFinished: false,
                                    isAddNote: false,
                                    computAnswer: '',  
                                    computAnswers: [],
                                    autoMark: _s.autoMark,
                                    content: lib.length >0 ? `${lib[0].content}` : `该题目没有题干`,
                                    topicTypeId: _topicTypeId,
                                    topicId: lib.length >0 ? lib[0].id : '',
                                    libTopicOptionRelVMs: [],
                                    searchReadingZyUserAnswerRVMs: lib.length >0 ? lib[0].searchReadingZyUserAnswerRVMs : [],
                                    searchZyStudentAnswerVMs: lib.length >0 ? lib[0].searchZyStudentAnswerVMs : []
                                }
                                let _child = [];
                                lib[0].libTopicOptionRelVMs.forEach((_l,l)=>{
                                    _child.push({
                                        id: _l.id,
                                        computAnswer: '',
                                        sort: _l.sort,
                                        item: _l.item,
                                        content: _l.content
                                    })
                                })
                                let _computAnswer = '';
                                let _computAnswers = [];
                                if(lib[0].searchReadingZyUserAnswerRVMs.length > 0){
                                    if(_topicTypeId == 1||_topicTypeId == 10){ // 单选
                                        _computAnswer = lib[0].searchReadingZyUserAnswerRVMs[0].optionId
                                        if(_computAnswer){
                                            _boj.isFinished = true;
                                            _boj.computAnswer = _computAnswer;
                                        }
                                    }else if(_topicTypeId == 2) { // 多选
                                        _boj.isFinished = true;
                                        _boj.computAnswers = this.$_.map(lib[0].searchReadingZyUserAnswerRVMs,'optionId');
                                    }else if(_topicTypeId == 5 || _topicTypeId == 6 || _topicTypeId == 8){ // 计算题 问答题 作文
                                        _computAnswer = lib[0].searchReadingZyUserAnswerRVMs[0].answer;
                                        if(_computAnswer){
                                            _boj.isFinished = true;
                                            _boj.computAnswer = _computAnswer;
                                        }
                                    }else if(_topicTypeId == 4){ // 填空
                                        let f = true;
                                        _boj.searchReadingZyUserAnswerRVMs.forEach((_a,a)=>{
                                            if(_a.answer){
                                                _child.forEach((_c,c)=>{
                                                    if(_c.id == _a.optionId){
                                                        _c.computAnswer = _a.answer;
                                                    }
                                                })
                                            }else{
                                                f = false;
                                            }
                                        })
                                        _boj.isFinished = f;
                                    }else if(_topicTypeId == 7 || _topicTypeId == 9){// <!-- 简答题 阅读理解  -->
                                        let jd = true;
                                        _boj.searchReadingZyUserAnswerRVMs.forEach((_a,a)=>{
                                            if(_a.answer){
                                                _child.forEach((_c,c)=>{
                                                    if(_c.id == _a.optionId){
                                                        _c.computAnswer = _a.answer;
                                                    }
                                                })
                                            }else{
                                                jd = false;
                                            }
                                        })
                                        _boj.isFinished = jd;
                                    }else if(_topicTypeId == 3){ // 判断
                                        _computAnswer = lib[0].searchReadingZyUserAnswerRVMs[0].optionId
                                        if(_computAnswer){
                                            _boj.isFinished = true;
                                            _boj.computAnswer = _computAnswer;
                                        }
                                    }
                                }
                                
                                _boj.libTopicOptionRelVMs = _child;
                                topics.push(_boj);
                                arr1.push(_boj);
                                num++;
                            })
                        }
                        obj.children = topics;
                        arr.push(obj);
                    })
                    this.hwData = arr;
                    this.resultData = arr1;
                    this.activeName = this.hwData.length > 0 ? this.hwData[0].id : '';
                    this.pageLoading = false;
                    this.$nextTick(()=>{
                        this.hwData.forEach((_h,h)=>{
                            _h.children.forEach((_c,c)=>{
                                var _this = this;
                                if(_c.topicTypeId == 5 || _c.topicTypeId == 6 || _c.topicTypeId == 8){ // 计算题 问答题 作文
                                    let ue = this.$refs[`question_answer_${_c.id}`][0].editor;
                                    ue.addListener("blur",function(){  
                                        let html = ue.getContent();
                                        let txt = ue.getContentTxt(); 
                                        _c.computAnswer = html;
                                        if(txt){
                                            _c.isFinished = true;
                                            _this.autoSaveHomeWork(_c);
                                        }else{
                                            _c.isFinished = false;
                                        }
                                    })  
                                }else if(_c.topicTypeId == 7 || _c.topicTypeId == 9){ // <!-- 简答题 阅读理解  -->
                                    _c.libTopicOptionRelVMs.forEach((_l,l)=>{
                                        let ues = this.$refs[`question_answers_${_l.id}`][0].editor;
                                        ues.addListener("blur",function(){  
                                            let html = ues.getContent();
                                            let txt = ues.getContentTxt(); 
                                            _l.computAnswer = html;
                                            for(let i = 0; i < _c.libTopicOptionRelVMs.length; i++){
                                                if(!_c.libTopicOptionRelVMs[i].computAnswer){
                                                    _c.isFinished = false;
                                                    return
                                                }
                                            }
                                            _c.isFinished = true;
                                            _this.autoSaveHomeWork(_c);
                                        })  
                                    })
                                }
                            })
                        })
                        this.computHeight();
                    })
                }
            }).catch(err=>{
                this.pageLoading = false;
            }) 
        },
        // 点击找题目
        handleJump(row){
            if(this.openOneHw){
                this.currentHwIndex = row.sort;
            }else{
                this.$scrollTo(document.getElementsByClassName('sy-hw-student-body-hw')[0], 0, 'question_'+row.sort, 500, -50);
            }
        },
        handleNext(t){
            if(t == 'pre'){
                this.currentHwIndex--
            }else if(t == 'next'){
                this.currentHwIndex++
            }
        },
        // 标记
        handleMark(row){
            row.isMarking = !row.isMarking;
            this.autoSaveHomeWork(row);
            row.isLoading = true;
        },
        // 判断题 单选
        handleChange(row){
            row.isFinished = true;
            this.autoSaveHomeWork(row);
            row.isLoading = true;
        },
        // 填空 改变
        handleChange4(row){
            let _row = row.libTopicOptionRelVMs;
            for(let i = 0; i<_row.length; i++){
                if(!_row[i].computAnswer){
                    row.isFinished = false;
                    return
                }
            }
            row.isFinished = true;
            this.autoSaveHomeWork(row);
            row.isLoading = true;
        },
        // 多选改变
        handleChange2(row){ // --------------------------------------------存在无法清空
            if( row.computAnswers.length > 0 ){
                row.isFinished = true;
                this.autoSaveHomeWork(row);
            }else{
                row.isFinished = false;
            }
            row.isLoading = true;
        },
        makeObj(row,index=0){
            let obj = {};
            obj[`zyStudentAnswerExtendVMs[${index}].topicGroupId`] = row.id;
            obj[`zyStudentAnswerExtendVMs[${index}].topicId`] = row.topicId;
            obj[`zyStudentAnswerExtendVMs[${index}].isSign`] = row.isMarking ? 1 : 0;
            if(row.topicTypeId == 1 || row.topicTypeId == 10){ // 单选
                let _lib = this.$_.find(row.libTopicOptionRelVMs, {id: row.computAnswer});
                obj[`zyStudentAnswerExtendVMs[${index}].zyUserAnswerRExtendVM[0].optionId`] = row.computAnswer;
                obj[`zyStudentAnswerExtendVMs[${index}].zyUserAnswerRExtendVM[0].answer`] = _lib ? _lib.content : '';
            }else if(row.topicTypeId == 2){ // 多选
                row.computAnswers.forEach((_a,a)=>{
                    let _mib = this.$_.find(row.libTopicOptionRelVMs, {id: _a});
                    obj[`zyStudentAnswerExtendVMs[${index}].zyUserAnswerRExtendVM[${a}].optionId`] = _a;
                    obj[`zyStudentAnswerExtendVMs[${index}].zyUserAnswerRExtendVM[${a}].answer`] = _mib ? _mib.content : '';
                })
            }else if(row.topicTypeId == 5 || row.topicTypeId == 6 || row.topicTypeId == 8){// 计算题 问答题 作文
                obj[`zyStudentAnswerExtendVMs[${index}].zyUserAnswerRExtendVM[0].optionId`] = row.topicId;
                obj[`zyStudentAnswerExtendVMs[${index}].zyUserAnswerRExtendVM[0].answer`] = row.computAnswer;
            }else if(row.topicTypeId == 4){ // 填空
                row.libTopicOptionRelVMs.forEach((_a,a)=>{
                    obj[`zyStudentAnswerExtendVMs[${index}].zyUserAnswerRExtendVM[${a}].optionId`] = _a.id;
                    obj[`zyStudentAnswerExtendVMs[${index}].zyUserAnswerRExtendVM[${a}].answer`] = _a.computAnswer;
                })
            }else if(row.topicTypeId == 7 || row.topicTypeId == 9){ //  <!-- 简答题 阅读理解  -->
                row.libTopicOptionRelVMs.forEach((_a,a)=>{
                    obj[`zyStudentAnswerExtendVMs[${index}].zyUserAnswerRExtendVM[${a}].optionId`] = _a.id;
                    obj[`zyStudentAnswerExtendVMs[${index}].zyUserAnswerRExtendVM[${a}].answer`] = _a.computAnswer;
                })
            }else if(row.topicTypeId == 3){ // 判断
                let _pib = this.$_.find(row.libTopicOptionRelVMs, {id: row.computAnswer});
                obj[`zyStudentAnswerExtendVMs[${index}].zyUserAnswerRExtendVM[0].optionId`] = row.computAnswer;
                obj[`zyStudentAnswerExtendVMs[${index}].zyUserAnswerRExtendVM[0].answer`] = _pib? _pib.content : '';
            }   
            return obj;
        },
        // 自动保存
        autoSaveHomeWork(row){
            this.activeName = row.pid;
            let obj = this.makeObj(row);
            autoSaveHomeWork(obj).then((res)=>{ }).catch(err=>{ })
        },
        // 手动保存
        saveHomeWork(){
            let n = 0;
            this.hwData.forEach((_h,h)=>{
                _h.children.forEach((_c,c)=>{
                    if(!_c.isFinished){
                        n++
                    }
                })
            })
            this.number = n;
            this.subminHw();
            // this.$confirm(`您还有 ${this.number} 题未完成，确认上交吗？`, '提示', {
            //     confirmButtonText: '确定上交',
            //     cancelButtonText: '继续做题',
            //     type: 'info'
            // }).then(() => {
                
            // }).catch(() => {});
        },
        // 确认上交
        subminHw(){
            let obj = {
                groupId: this.resId,
                submitStudent: this.number == 0 ? 3 : 2 // 1 未提交 2 部分完成 3 全部
            }
            let num = 0;
            this.hwData.forEach((_h,h)=>{
                _h.children.forEach((_c,c)=>{
                    obj.groupId = _c.groupId;
                    obj = {...obj, ...this.makeObj(_c,num)} 
                    num++;
                })
            })

            this.saveHomeWorkloading = true;
            saveHomeWorkHw(obj).then(res=>{
                this.saveHomeWorkloading=false;
                this.$notify({
                    message: this.$store.state.lang.exam.t21||"考试上交成功！",
                    type: "success"
                })
                this.confimVisible = false;
                // if(this.isfullscreen){
                //     if (!screenfull.enabled) {
                //         this.$message({
                //             message: 'you browser can not work',
                //             type: 'warning'
                //         })
                //         return false
                //     }
                //     screenfull.toggle()
                // }
                // this.$router.push('/exam/stu/stuexam')
                obj.typeId = 3;
                this.$emit('complated', obj)
            }).catch((err)=>{
                this.saveHomeWorkloading=false;
            })
        },
        // 加入疑难本
        addIgnoreNote(row){
            let obj = {};
            obj['zyStudentAnswerSaveNoteVMs[0].id'] = row.id;
            obj['zyStudentAnswerSaveNoteVMs[0].topicId'] = row.topicId;
            this.noteloading=true;
            saveNote(obj).then(res => {
                this.noteloading = false;
                row.isAddNote = true;
                this.$notify({
                    title: "成功",
                    message: "添加成功！",
                    type: "success"
                })
            }).catch((err)=>{
                this.noteloading=false;
            })
        }
    }
}
</script>
<style scoped>
.sy-exam-full-container{
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    z-index: 300;
    box-sizing: border-box;
}
.sy-hw-app-container{
    position: relative;
    width: 100%;
    height: 100%;
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
.sy-hw-student-header-ctr{
    float: right;
    height: 40px;
    box-sizing: border-box;
}
.sy-hw-student-header-submit{
    width: 115px;
    box-sizing: border-box;
    text-align: center;
    height: 40px;
    cursor: pointer;
    float: right;
    line-height: 40px;
    background: #fff;
    border:  0;
    border-color: #c4c4c4;
    color: #fff;
    outline: none;
    font-size: 14px;
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
    height: 30px;
    width: 30px;
    margin-right: 5px;
    text-align: center;
    border: 1px solid #cccccc;
    line-height: 30px;
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
.sy-hw-student-body_title>ul>li a{
    text-decoration: none;
    display: block;
    height: 29px;
    width: 28px;
    line-height: 29px;
    color: #333;
    outline: none;
}
.sy-hw-student-body_title>ul>li a:hover{
    opacity: .6;
    background-color: rgba(0, 0, 0, .3)
}
.sy-hw-student-body-hw{
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 10px 4vh;
    overflow: auto;
    position: relative;
    height: 100%;
}
.sy-hw-student-body-hw h4{
    line-height: 30px;
    margin: 0;
}
.sy-hw-student-body-hw ul li:not(.sy-hw-clear) {
    margin-bottom: 10px;
    line-height: 30px;
    background-color: #fff;
    box-sizing: border-box;
    min-height: 120px;
    font-size: 14px;
    position: relative;
    overflow: hidden;
}
.sy-hw-student-body-hw ul li>b{
    float: right;
    width: 6.5vh;
    height: 6.5vh;
    text-align: right;
    cursor: pointer;
    position: relative;
}
.sy-hw-student-body-hw ul li>b>span{
    position: relative;
    z-index: 10;
    font-size: 12px;
    padding-right: 0.5vh; 
    color: #666;
}
.sy-hw-student-body-hw ul li>b>i{
    position: absolute;
    width: 0;
    height: 0;
    right: 0;
    border: 0;
    border-top: 6.5vh solid #ccc;
    border-left: 6.5vh solid transparent; 
}
.sy-hw-student-body-hw ul li>b.marking>span{color: #fff;}
.sy-hw-student-body-hw ul li>b.marking>i{border-top-color: #F7BA2A;}
.sy-hw-student-body-hw ul li:last-child {margin-bottom: 0;}
.sy-hw-student-body-hw ul li .add-btn{
    position: absolute;
    right: 0;
    bottom: 0;
    width: 13vh;
    box-sizing: border-box;
    height: 3vh;
    line-height: 3vh;
    background: #CCCCCC;
    border:  0;
    border-color: #c4c4c4;
    color: #333;
    outline: none;
    font-size: 12px;
    padding-top: 0;
    border-radius: 0;
}
.sy-hw-student-body-hw ul li .add-btn:hover{background: #A9A9A9;}
.sy-hw-student-body-hw ul li .add-btn[disabled]{  
    background-color: #dddddd;  
    color: #aaa;
} 
.sy-hw-student-body-hw ul li div.title,.sy-hw-student-body-hw>li div.selsect{
    padding-right: 30px;
    padding-left: 15px;
    padding-bottom: 0px;
    font-size: 14px;
    padding-top: 10px;
}
.sy-hw-student-body-hw ul li div.selsect{
    padding-bottom: 3.5vh;
    padding-left: 3vh;
}
.sy-hw-student-body-hw ul li div.select>div.select_7{
    line-height: 30px;
    margin-bottom: 10px;
}
.sy-hw-student-body-hw ul li div.select>div.select_7:last-child{margin-bottom: 0;}
.sy-ue-style{padding-right: 5vh;}
.sy-hw_add_box{
    border: 1px solid #ccc;
    background: #fff;
    box-sizing: border-box;
    overflow: hidden;
    width: 70%;
    margin: 60px auto;
    padding: 10px;
}
.sy-hw_add_box_body_msg{
    margin: 0 50px 15px;
    text-align: center;
    padding: 10px;
}
.sy-hw_add_box_body_msg>p{
    line-height: 20px;
    color: #fff;
    font-size: 10px
}
.sy-hw_add_box_body{
    margin: 0 50px;
    background: #ccc;
    text-align: center;
    padding: 10px 15px 20px;
}
.sy-hw_add_box_body h4{
    margin: 0;
    line-height: 2.5rem;
}
.sy-hw_add_box_body>p{
    text-align: left;
    width: 100%;
    line-height: 2rem;
}
.sy-hw_add_box_body>p.sy-hw_all{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.sy-hw_add_box_body>div{
    cursor: pointer;
    padding: 0 10px;
}
.sy-hw_add_box_body i{font-size: 22px;}
.sy_hw_box_img img{
    width: 72px;
    height: 72px;
    vertical-align: top;
}
</style>