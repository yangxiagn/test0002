<template>
    <div class="tpl-sl-details-body">
        <div class="tpl-sl-details-body-left" v-loading="videoLoading" :style="{'margin-right': expened ? '230px' : '0px'}">
            <div class="center" v-show="!resId" style="line-height: 480px;"> 
                {{$store.state.lang.edu.t40 ||"请选择资源"}}
            </div>
            <el-tabs type="border-card" v-model="activeFlies" v-show="resId">
                <el-tab-pane v-for="item in files" :key="item.fileId" :name="item.fileId" :label="item.fileName" > 
                    <div class="tpl-sl-video-box">
                        <video :ref="item.fileId" :src="makeUrl(item.path)" 
                            autoplay controls height="100%" width="100%"></video>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <div style="padding: 10px;" v-show="resId">
                <el-tabs v-model="activeName">
                    <el-tab-pane :label="$store.state.lang.edu.t41 ||'我要提问'" name="1">
                        <el-input
                            type="textarea"
                            autofocus
                            :rows="5"
                            resize="none"
                            :maxlength="1000"
                            :autosize="{ minRows: 4, maxRows: 8}"
                            :placeholder="$store.state.lang.edu.t42 ||'请输入1000字以内的内容'"
                            v-model.trim="question">
                        </el-input>
                        <div class="right" style="padding: 10px 0;">
                            <el-button type="primary" @click="handleSave">提交</el-button>
                        </div>
                    </el-tab-pane>
                </el-tabs>
                <el-tabs v-model="activeName">
                    <el-tab-pane :label="$store.state.lang.edu.t44 ||'学生答疑'" name="1">
                        <div class="tpl-sl-notice-item" v-for="item in questionList" :key="item.id">
                            <el-form :model="backForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                <el-form-item :label="$store.state.lang.edu.t45 ||'学生提问：'" style="margin: 0;"> <pre style="margin: 0;">{{item.content}}</pre> </el-form-item>
                                <!-- <el-form-item :label="$store.state.lang.edu.t46 ||'教师回复：'" v-if="item.slQuestionsDetailsVMList && item.slQuestionsDetailsVMList.length > 0" style="margin: 0;"> 
                                    <pre style="margin: 0;" v-for="row in item.slQuestionsDetailsVMList" :key="row.id">{{row.content}}</pre> 
                                </el-form-item>
                                <el-form-item :label="$store.state.lang.edu.t46 ||'教师回复：'" v-if="$store.state.userType != 2 && item.slQuestionsDetailsVMList && item.slQuestionsDetailsVMList.length == 0" style="margin: 0;">暂无回复</el-form-item>
                                <el-form-item :label="$store.state.lang.edu.t46 ||'教师回复：'" v-if="$store.state.userType == 2 && item.slQuestionsDetailsVMList && item.slQuestionsDetailsVMList.length == 0">
                                    <el-input
                                        type="textarea"
                                        autofocus
                                        :rows="4"
                                        resize="none"
                                        :maxlength="1000"
                                        :autosize="{ minRows: 4, maxRows: 8}"
                                        :placeholder="$store.state.lang.edu.t42 ||'请输入1000字以内的内容'"
                                        v-model.trim="backForm.anwser">
                                    </el-input>
                                </el-form-item> -->
                            </el-form>
                            <div class="right" style="padding-bottom: 10px;" v-if="$store.state.userType == 2 && item.slQuestionsDetailsVMList && item.slQuestionsDetailsVMList.length == 0">
                                <el-button type="primary" :loading="addMoreLoading">
                                    {{$store.state.lang.edu.t47 ||'回复'}}
                                </el-button>
                            </div>
                        </div>
                        <el-button type="primary" v-if="!isempty" style="width: 100%;" @click="handleMore">
                            {{$store.state.lang.edu.t48 || "加载更多"}}
                        </el-button>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="tpl-sl-details-body-right" :style="{width: expened ? '230px' : '0px', padding: expened ? '5px' : '0px'}">
            <div class="tpl-sl-details-body-right-btn sy-theme-background" @click="expened = !expened" 
                :style="{visibility: expened ? 'hidden' :'visible'}">
                <i class="fa" :class="[`fa-angle-double-${expened? 'right' : 'left'}`]" aria-hidden="true"></i>
            </div>
            <div style="overflow: hidden;">
                <el-tree :data="catalogTreeData" node-key="id" :props="defaultProps"
                    :default-expanded-keys="[defaultKey]" 
                    :current-node-key="defaultKey"
                    :render-content="renderContent" highlight-current :default-expand-all="false" style="border: 0;height: 100%;" 
                    @node-click="handleNodeClick"></el-tree>
            </div>
        </div>
    </div>
</template>

<script>
import { photourl, getResorceInformation, getResourceDetails, select_student_questions_by_res_id, 
    save_or_update_Online_Log, save_or_update_res_progress,
    save_student_questions, filesurl, save_course_detal_log, getYearAndTerm } from "./request.js";
export default {
    data(){
        return {
            expened: true,
            videoLoading: false,
            filesurl: filesurl,
            activeName: '1',
            activeFlies: '',
            question: '',
            defaultKey: '',
            addMoreLoading: false,
            catalogTreeData: [],
            isempty: false,
            data: {},
            name: '',
            start: 1,
            resId: '',
            files: [],
            questionList: [],
            backForm: {
                anwser: ''
            },
            defaultProps: {
                children: 'resourceInfoVM',
                label: 'name'
            },
            currentData: {},
            rules: {
                name: [
                    { required: true, message: this.$store.state.lang.edu.t49 || '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: this.$store.state.lang.edu.t50 || '长度在 3 到 5 个字符', trigger: 'blur' }
                ]
            },
        }
    },
    created(){
        this.init();
    },
    methods: {
        init(){
            let obj = JSON.parse( window.sessionStorage.getItem('_course_data'));
            this.data = obj || {};
            this.name = obj.courseName;
            this.getCatalogTree();
        },
        makeUrl(path){
            let arr = path.split("."); 
            if(arr.length > 0){
                arr[arr.length -1] = 'mp4';
            }
            let base = arr.join('.'); 
            let str = '';
            if(/^group/.test(path)){
                return '/'+ base 
            }else{
                return this.filesurl +'/nologin'+ base 
            }
        },
        handleSave(){
            let obj = {
                content: this.question,
                courseValue: this.data.courseValue,
                courseName: this.data.courseName,
                resId: this.resId
            }
            if(!obj.content){return}
            save_student_questions(obj).then(res=>{
                this.$notify({
                    message: this.$store.state.lang.edu.t51 || '提交成功！',
                    type: 'success'
                });
                this.question = '';
                this.start = 1;
                this.getQuestion();
            })
        },
        // 加载更多
        handleMore(){
            this.start++;
            this.getQuestion();
        },
        // 查询问题
        getQuestion(){
            if(!this.resId){return}
            this.addMoreLoading = true;
            select_student_questions_by_res_id({
                resId: this.resId,
                start: this.start,
                size: 10
            }).then(res=>{
                if(res.list){
                    res.list.forEach((_s,s)=>{
                        let pass = true;
                        this.questionList.forEach((_a,a)=>{
                            if(_a.id == _s.id){
                                pass = false;
                            }
                        })
                        if(pass){
                            this.questionList.push(_s)
                        }
                    })
                }
                this.isempty = res.list.length == 0 ? true : false;
                this.addMoreLoading = false;
            }).catch(err=>{
                this.addMoreLoading = false;
            })
        },
        handleNodeClick(data){
            this.currentData = data;
            this.questionList = [];
            this.resId = '';
            this.start = 1;
            this.files = [];
            this.activeFlies = '';
            if(data.objId){
                this.resId = data.resId || '';
                this.videoLoading = true;
                getResourceDetails(data.objId).then(res=>{
                    this.files = res.files || [];
                    this.activeFlies = this.files.length > 0 ? this.files[0].fileId : '';
                    this.getvideo();
                    this.videoLoading = false;
                }).catch(err=>{
                    this.videoLoading = false;
                })
                this.getQuestion();
            }else{

            }
        },
        getvideo(vid) {
            getYearAndTerm().then(res=>{
                let yearId = '';
                let termId = '';
                if(res.unitSchoolTermRHVM){
                    termId = res.unitSchoolTermRHVM.schoolTerm;
                    yearId = res.unitSchoolTermRHVM.year;
                }
                let obj = {
                    yearId: yearId,
                    termId: termId,
                    courseValue: this.data.courseValue,
                    resId: this.currentData.resId,
                    resName: this.currentData.resName
                };
                // 如果学习过不在统计
                if(this.currentData.flag == 1){
                    return
                }
                // console.log('当前学年学期', yearId, termId);
                this.$nextTick(()=>{
                    let video = this.$refs[this.activeFlies][0];
                    let num = 1;
                    let getvideoprogress = (duration, timers, time1)=>{
                        let timer = setInterval(()=>{
                            let currentTime = parseInt(video.currentTime);
                            let ended = video.ended;
                            if(currentTime != time1){
                                // console.log('保存记录次数', num);
                                // console.log('保存记录时长', currentTime - time1)
                                obj.second = parseInt(currentTime - time1);
                                obj.catelogName = this.currentData.parentName;
                                obj.catelogId = this.currentData.parentId;
                                save_or_update_Online_Log(obj).then(res=>{
                                    // console.log('保存记录次数'+num, res);
                                })
                                let _obj = {
                                    yearId: yearId,
                                    termId: termId,
                                    fileId: this.activeFlies,
                                    second: parseInt(currentTime - time1),
                                    percentage: parseInt(currentTime/duration*100),
                                    resId: this.currentData.resId,
                                    resName: this.currentData.resName
                                };
                                save_or_update_res_progress(_obj).then(res=>{

                                })
                            }
                            if(ended){
                                // console.log('完成播放')
                                obj.typeId = 1;
                                obj.catalogId = this.currentData.parentId;
                                save_course_detal_log(obj).then(res=>{
                                    // console.log('完成播放保存结果',res)
                                })
                            }
                            if( ended || currentTime >= duration || currentTime == time1){
                                clearInterval(timer);
                            }
                            num++;
                            time1 = currentTime;
                        }, timers)
                    }
                    video.onplay = () => {
                        var duration = parseInt(video.duration);
                        let timers = parseInt(duration*1000 / 10);
                        let time1 = parseInt(video.currentTime);
                        getvideoprogress(duration, timers, time1);
                    }
                })
            }).catch(err=>{

            })
        },
        renderContent(h, { node, data, store }){
            return (
                <span style="padding: 5px 0;position: relative;">
                    <span>
                        <i style={{ display: node.level != 1 ? 'none' : '', fontSize: '16px',position: 'relative', top: '2px' }} 
                            class={{ fa: true, 'fa-folder-o': !node.expanded, 'fa-folder-open-o': node.expanded }} aria-hidden="true"></i>
                        <span style={{ display: data.type != 'rc' ? 'none' : 'inline-block', width: '36px', height: '36px', verticalAlign: 'middle' }}>
                            <img style="width: 100%;height: 100%;border-radius: 3px;" src={photourl+data.userId}/>
                        </span>
                        <span title={data.name}> {data.name.slice(0, 9)}</span>
                        <span style={{ display: data.type != 'rc' ? 'none' : 'inline-block'}}>
                            <i style={{ display: data.flag == 0 ? 'none' : 'inline-block', color: ' #13CE66'}}  
                                class="fa fa-check-circle" aria-hidden="true"></i>
                        </span>
                    </span>
                </span>
            )
        },
        // 获取编目
        getCatalogTree(){
            getResorceInformation({
                courseValue: this.data.courseValue,
                gradeValue: this.data.gradeValue
            }).then(res=>{
                let currentData = null;
                if(res){
                    res.forEach((_s,s)=>{
                        if(_s.resourceInfoVM){
                            _s.resourceInfoVM.forEach((_a,a)=>{
                                _a.name = _a.resName;
                                _a.type = 'rc';
                                _a.id = _a.resId;
                                _a.parentId = _s.id;
                                _a.parentName = _s.name;
                            })
                        }
                        if(_s.resourceInfoVM){
                            _s.resourceInfoVM.forEach((_a,a)=>{
                                if(_a.resId == this.data.resId){
                                    currentData = _a;
                                }
                            })
                        }
                    })
                }
                if(currentData){
                    this.handleNodeClick(currentData);
                }
                this.defaultKey = this.data.resId;
                this.catalogTreeData = this.data2tree(res);
            }).catch(err=>{

            })
        },
		data2tree: (datas, idprop, pIdprop) => {
			if (!idprop) {
				idprop = 'id';
			}
			if (!pIdprop) {
				pIdprop = 'parentId';
			}
			let nodes = [],
				c = function(obj) {
					let _c = [];
					for (let i = 0; i < datas.length; i++) {
						let _d = _.cloneDeep(datas[i]);
						if (_d[pIdprop + ''] == obj[idprop + '']) {
							_c.push(_d);
							c(_d);
						}
					}
					if (_c.length) {
						obj.resourceInfoVM = _c;
					}
				};
			for (let i = 0; i < datas.length; i++) {
				let _d = _.cloneDeep(datas[i]);
				if ((!_d[pIdprop + ''] && _d[pIdprop + ''] != '') || (!_.result(_.find(datas, {
						[idprop]: _d[pIdprop + '']
					}), idprop))) {
					c(_d);
					nodes.push(_d);
				}
			}
			return nodes;
        }
    }
}
</script>

<style scoped>

</style>

