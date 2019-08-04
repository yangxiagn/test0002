<template>
    <div class="sy-hw-app-container sy-exam-paper-img-box" v-loading="pageLoading" 
        :element-loading-text="$store.state.lang.hw.t1 || '拼命加载中...'">
        <div style="line-height:40px;">
            <div class="sy-hw-student-header sy-theme-extraLightBlack-background">
                <div class="sy-hw-student-header-ctr">
                    <el-checkbox v-model="openOneHw" style="color: #fff;margin-right: 10px;">
                        {{$store.state.lang.hw.t2 || '是否开启单题模式'}}
                    </el-checkbox>
                    <button class="sy-hw-student-header-submit sy-theme-background" @click="saveHomeWork">
                        {{$store.state.lang.hw.t3 || "上交练习"}}
                    </button>
                </div>
                <div class="sy-hw-student-header-title">{{hwName}}</div>
            </div>
        </div>
        <div style="padding-top: 10px;">
            <div class="sy-hw-student-body">
                <div ref="headerRight" style="line-height:40px;padding: 0 10px;">
                    <div class="sy-hw-student-body_title" v-for="(big, index) in hwData" :key="index+'_big'">
                        <ul>
                            <li v-for="(lib, i) in big.children" :key="'lib_'+i" @click="handleJump(lib)"
                                :class="{success: lib.isFinished, warning: lib.isMarking}">{{lib.sort}}</li>
                        </ul>
                    </div>
                </div>
                <div style="padding:10px 10px 0 10px;" >
                    <div class="sy-hw-student-body sy-theme-extraLightGray">
                        <ul class="sy-hw-student-body-hw" v-for="(big, index) in hwData" :key="index+'_big'">
                            <li v-for="(lib, i) in big.children" v-show="!openOneHw || lib.sort == currentHwIndex" 
                                :id="'question_'+lib.sort" :key="'lib_'+i">
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
                                        <el-radio v-for="opt in lib.libTopicOptionRelVMs" :key="opt.id" 
                                            :label="opt.id" style="width: 100%;margin: 5px 0;">
                                            <span v-html="opt.item +'、'+ opt.content"></span>
                                        </el-radio>
                                    </el-radio-group>
                                </div>
                                <!-- 多选 -->
                                <div class="selsect" v-if="lib.topicTypeId == '2'">
                                    <el-checkbox-group v-model="lib.computAnswers" @change="handleChange2(lib)" :min="1">
                                        <el-checkbox style="width: 100%;margin: 5px 0;" v-for="(opt,index) in lib.libTopicOptionRelVMs" 
                                            :label="opt.id" :key="index">
                                            <span v-html="opt.item +'、'+ opt.content"></span>
                                        </el-checkbox>
                                    </el-checkbox-group>
                                </div>
                                <!-- 判断 -->
                                <div class="selsect" v-if="lib.topicTypeId == '3'">
                                    <el-radio-group v-model="lib.computAnswer" @change="handleChange(lib)">
                                        <el-radio v-for="(opt,index) in lib.libTopicOptionRelVMs" :label="opt.id" 
                                            :key="index">{{opt.content}}</el-radio>
                                    </el-radio-group>
                                </div>
                                <!-- 填空 -->
                                <div class="selsect" v-if="lib.topicTypeId == '4'">
                                    <div v-for="opt in lib.libTopicOptionRelVMs" :key="opt.id" 
                                        style="display: inline-block;margin-right: 10px;">
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
                                        <el-radio 
                                            v-for="opt in lib.libTopicOptionRelVMs" 
                                            :key="opt.id" 
                                            :label="opt.id" 
                                            style="width: 100%;margin: 5px 0;">
                                            <span v-html="opt.item +'、'+ opt.content"></span>
                                        </el-radio>
                                    </el-radio-group>
                                </div>
                                <el-button :disabled="lib.isAddNote" class="add-btn"  @click="addIgnoreNote(lib)">
                                    {{$store.state.lang.hw.t6 || '加入疑难本'}}
                                </el-button>
                            </li>
                            <li class="center sy-hw-clear" v-show="openOneHw">
                                <el-button-group>
                                    <el-button type="primary" :disabled="currentHwIndex == 1" icon="arrow-left" @click="handleNext('pre')">
                                        {{$store.state.lang.hw.t7 || "上一题"}}
                                    </el-button>
                                    <el-button type="primary" :disabled="currentHwIndex == maxhw" @click="handleNext('next')">
                                        {{$store.state.lang.hw.t8 || '下一题'}}<i class="el-icon-arrow-right el-icon--right"></i>
                                    </el-button>
                                </el-button-group>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <sy-dialog :title="$store.state.lang.exam.t20 || '上交练习提示'" :visible.sync="confimVisible" width="400px" height="200px"> 
            <div slot="body"  style="padding:10px 10px;line-height: 50px;" class="center">
                <h4 class="center-h4v">{{$store.state.lang.hw.t9 || '您还有'}}<span style="padding: 0 20px;border-bottom: 1px solid #666;">{{number}}
                    </span>{{$store.state.lang.hw.t10 || '题未完成，确认上交吗？'}}</h4>
                <h4 class="center-h4h" style="display:none">{{$store.state.lang.hw.t11 || '确认上交吗？'}}</h4>
            </div>
            <div slot="footer">
                <el-button @click="confimVisible=false">{{$store.state.lang.hw.t12 || '继续做题'}}</el-button>
                <el-button type="primary" :loading="saveHomeWorkloading" @click="subminHw">{{$store.state.lang.hw.t13 || "确定上交"}}</el-button>
            </div>
        </sy-dialog>
    </div>
</template>
<script>
const topicType = [
    { label: "单选题", value: "1" }, 
    { label: "多选题", value: "2" },
    { label: "判断题", value: "3" },
    { label: "填空题", value: "4" },
    { label: "计算题", value: "5" },
    { label: "问答题", value: "6" },
    { label: "阅读理解", value: "7" },
    { label: "写作题", value: "8" },
    { label: "简答题", value: "9" },
    { label: "听力题", value: "10" }
]
import { getTimeLefts,selectStudentById,autoSaveHomeWork,addIgnoreNote,saveHomeWork } from "./request.js";
export default {
    name: '',
    props: {
        resId: {
            type: String,
            default: ''
        }
    },
    mixins: [],
    data(){
        return { 
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
            topicType,
            hwName: '',
            hwTimes: 0,
            hwData: [],
            headerHeight: '40px',
            __resizeHanlder: null
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
    created () {
       this.init()
    },
    updated(){
        this.$nextTick(()=>{
            this.computHeight();
        })
    },
    mounted(){
        this.__resizeHanlder = () => {
            this.$nextTick(function () {
                this.computHeight();
            })
        }
        window.addEventListener('resize', this.__resizeHanlder)
    },
    destroyed(){
        if(!this.__resizeHanlder){
            return
        }else{
            window.removeEventListener('resize', this.__resizeHanlder)
        }
        this.__resizeHanlder = null;
    },
    watch: {
        resId(newVal,oldval) {
            this.selectStudentHw();
        }
    },
    methods: {
        init(){
            this.getTimes();
            this.selectStudentHw();
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
            getTimeLefts(this.resId).then((data)=>{
                this.hwName = data.name;
                if(data.flag){
                    this.hwTimes = parseInt(data.timeLeft/1000);
                }else{
                    this.hwTimes = 0;
                }
            })
        },
        // 查询作业
        selectStudentHw(){
            this.hwData = [];
            this.pageLoading = true;
            selectStudentById(this.resId).then((res)=>{
                console.log('hw',res);
                this.pageLoading = false;
                let arr = [];
                if(res){
                    res.forEach((_d,d) => {
                        let obj = {
                            id: _d.id,
                            name: _d.name,
                            score: _d.score,
                            children: []
                        };
                        let topics = [];
                        if(_d.searchZyReadingTopicsVMs){
                            _d.searchZyReadingTopicsVMs.forEach((_s,s)=>{
                                let lib = _s.libTopicRelVMs || [];
                                let _topicTypeId = lib.length >0 ? lib[0].topicTypeId : '';
                                let _boj = {
                                    sort: _s.sort,
                                    id: _s.id,
                                    isMarking: lib[0].isSign==1?true:false,
                                    isFinished: false,
                                    isAddNote: false,
                                    computAnswer: '',  
                                    computAnswers: [],
                                    autoMark: _s.autoMark,
                                    content: lib.length >0 ? `${lib[0].content}` : (this.$store.state.lang.hw.t16 || `该题目没有题干`),
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
                                topics.push(_boj)
                            })
                        }
                        obj.children = topics;
                        arr.push(obj);
                    });
                }
                this.hwData = arr;
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
            }).catch(err=>{
                this.pageLoading = false;
            })
        },
        // 点击找题目
        handleJump(row){
            if(this.openOneHw){
                this.currentHwIndex = row.sort;
            }else{
                this.$scrollTo(document.getElementsByClassName('sy-hw-student-body-hw')[0], 0, 'question_'+row.sort, 500, -20);
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
        },
        // 判断题 单选
        handleChange(row){
            row.isFinished = true;
            this.autoSaveHomeWork(row);
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
        },
        // 多选改变
        handleChange2(row){ // --------------------------------------------存在无法清空
            if( row.computAnswers.length > 0 ){
                row.isFinished = true;
                this.autoSaveHomeWork(row);
            }else{
                row.isFinished = false;
            }
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
            let obj = this.makeObj(row);
            autoSaveHomeWork(obj).then((res)=>{
                
            }).catch(err=>{})
        },
        // 手动保存
        saveHomeWork(){
            let n = 0;
            this.hwData.forEach((_h,h)=>{
                _h.children.forEach((_c,c)=>{
                    if(!_c.isFinished){
                        n++
                    }else{
                        $(".center-h4v").css("display","none");
                        $(".center-h4h").css("display","block");
                    }
                })
            })
            this.number = n;
            this.confimVisible = true;
        },
        // 确认上交
        subminHw(){
            this.confimVisible = false;
            this.sumit();
        },
        sumit(){
            let obj = {
                groupId: this.resId,
                submitStudent: this.number == 0 ? 3 : 2 // 1 未提交 2 部分完成 3 全部
            }
            this.hwData.forEach((_h,h)=>{
                _h.children.forEach((_c,c)=>{
                    obj = {...obj, ...this.makeObj(_c,c)} 
                })
            })
            this.saveHomeWorkloading = true;
            saveHomeWork(obj).then(res=>{
                this.saveHomeWorkloading=false;
                this.$notify({
                    message: this.$store.state.lang.hw.t15 || "作业上交成功！",
                    type: "success"
                })
                // this.$router.push('/hw/home')
                obj.typeId = 2;
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
            addIgnoreNote(obj).then(res => {
                this.noteloading = false;
                row.isAddNote = true;
                this.$notify({
                    message: this.$store.state.lang.hw.t14 || "添加成功！",
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
.sy-hw-app-container{
    position: relative;
    max-width: 1366px;
    box-sizing: border-box;
    margin: 0 auto;
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
.selsect img{
    max-height: 150px;
    vertical-align: middle;
}
.sy-hw-student-body-hw>li:not(.sy-hw-clear) {
    margin-bottom: 20px;
    line-height: 30px;
    background-color: #fff;
    box-sizing: border-box;
    min-height: 120px;
    font-size: 14px;
    position: relative;
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
.sy-hw-student-body-hw>li:last-child {margin-bottom: 0}
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
.sy-hw-student-body-hw>li div.selsect{
    padding-bottom: 35px;
    padding-left: 35px;
}
.sy-hw-student-body-hw>li div.select>div.select_7{
    line-height: 30px;
    margin-bottom: 10px;
}
.sy-hw-student-body-hw>li div.select>div.select_7:last-child{margin-bottom: 0;}
</style>