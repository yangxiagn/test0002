<template>
    <div class="sy-app-container">
        <sy-grad-4 :border="false">
            <div slot="headerRight" style="padding-top: 5px;">
                <el-select v-model="gradeId" placeholder="" style="width: 120px;" @change="handleGradeChange">
                    <el-option
                        v-for="item in gradeOptions"
                        :key="item.id"
                        :label="item.gradeName"
                        :value="item.id">
                    </el-option>
                </el-select>
                <el-select v-model="courseValue" placeholder="" style="width: 120px;margin-left: 10px" @change="handleCourseChange">
                    <el-option
                        v-for="item in courseMap[gradeId]"
                        :key="item.courseValue"
                        :label="item.name"
                        :value="item.courseValue">
                    </el-option>
                </el-select>
            </div>
            <div slot="bodyRight">
                <div class="sy-sl-setting-box sy-theme-tableBorder">
                    <div class="sy-sl-setting-header sy-theme-tableBorder">
                        <div class="sy-sl-setting-body-left center sy-theme-extraLightGray sy-theme-tableBorder" 
                            style="border-bottom: 0;">{{$store.state.lang.edu.t91 || '教材目录'}}</div>
                        <div class="sy-sl-setting-body-right sy-theme-tableBorder sy-theme-extraLightGray" 
                            style="border-bottom: 0;">
                            <el-row>
                                <el-col :span="4" class="body-item center cp">{{$store.state.lang.edu.t92 || '学习内容'}}</el-col>
                                <el-col :span="10" class="body-item center cp">{{$store.state.lang.edu.t93 || "资源名称（小于50个字）"}}</el-col>
                                <el-col :span="10" class="body-item center cp">{{$store.state.lang.edu.t94 || "上传文件"}}</el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="sy-sl-setting-body">
                        <div class="sy-sl-setting-body-left sy-theme-tableBorder" style="overflow-y: auto;">
                            <el-tree :data="treeData" :props="defaultProps" highlight-current 
                                style="border: 0;height: 100%;" :current-node-key="currentNodeKey" node-key="id"
                                :default-expanded-keys="defaultexpandedkeys"
                                @node-click="handleNodeClick"></el-tree>
                        </div>
                        <div class="sy-sl-setting-body-right sy-theme-tableBorder">
                            <sy-grad-4 :border="false">
                                <div slot="bodyRight" style="overflow:auto;">
                                    <div v-for="item in data" :key="item.type">
                                        <el-row class="sy-sl-setting-body-row" v-for="(row,index) in item.data" 
                                            :key="index">
                                            <el-col :span="4" class="body-item center">{{index == 0 ? `${item.name}` : '&nbsp;'}}</el-col>
                                            <el-col :span="10" class="body-item center">
                                                <el-input v-model="row.name" :placeholder="$store.state.lang.edu.t93 || '资源名称（小于50个字）'"></el-input>
                                            </el-col>
                                            <el-col :span="10" class="body-item center sy-import">
                                                <div class="sy-import-file-name el-input__inner cp" 
                                                    style="width: 150px;" @click="handleOpenSelect(item,row)">
                                                    <div class="sy-import-file-name-div" style="width: 110px;">
                                                        {{row.rcName}}</div>
                                                    <span class="fa fa-folder-o"></span>
                                                </div>
                                                <el-button :loading="saveLoading" style="margin-left: 10px;" size="small" 
                                                    :type="row.isSave ? 'success' : ''"
                                                    @click="handleClick('save', index, row, item.data)">
                                                    {{row.isSave ? $store.state.lang.button.update : $store.state.lang.button.save}}
                                                </el-button>
                                                <el-button size="small" type="danger" 
                                                    @click="handleClick('delete', index, row, item.data)">{{$store.state.lang.button.delete || "删除"}}</el-button>
                                                <el-button size="small" type="primary" 
                                                    @click="handleClick('add', index, row, item.data)">{{$store.state.lang.button.add || '添加'}}</el-button>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                                <!-- <div slot="footer" class="center">
                                    <el-button size="small" type="primary">确认</el-button>
                                    <el-button size="small" type="">取消</el-button>
                                </div> -->
                            </sy-grad-4>
                        </div>
                    </div>
                </div>
            </div>
        </sy-grad-4>

		<!-- 资源库 -->
		<sy-dialog :title="$store.state.lang.edu.t95 || '请从资源库或者本地选择需要上传的资源'" 
            height="160px" width="600px" :visible.sync="rcDialog">
			<div slot="body" style="padding:40px 20px;" class="center">
                <el-button size="small" style="min-width: 100px;" type="primary" @click="openDialog('rc')">{{$store.state.lang.edu.t96 || '资源库'}}</el-button>
                <el-button size="small" style="min-width: 100px;" type="primary" @click="rcUploadDialog = true">{{$store.state.lang.edu.t97 || '本地'}}</el-button>
			</div>
		</sy-dialog>
        <!-- 资源库选择 -->
		<sy-dialog :title="$store.state.lang.edu.t104 || '选择资源'" 
            height="600px" width="1000px" :visible.sync="rcSelectDialog">
			<div slot="body" style="padding:0px;">
                <rc-list v-if="rcSelectDialog" :select="examDefaultSelect" :grade-value="gradeValue" :course-value="courseValue" @select="getSelectExam"></rc-list>
			</div>
            <div slot="footer" class="right">
                <el-button size="small" type="" @click="handleExamCtr('close')">{{$store.state.lang.button.cancel || '取消'}}</el-button>
                <el-button size="small" type="primary" @click="handleExamCtr('ok')">{{$store.state.lang.button.ok || '确定'}}</el-button>
			</div>
		</sy-dialog>
        <!-- 资源库上传 -->
		<sy-dialog :title="$store.state.lang.edu.t98 || '上传资源'" 
            height="610px" width="1024px" :visible.sync="rcUploadDialog">
			<div slot="body" style="padding:0px;" class="center">
                <upload :data="uploadData" v-if="rcUploadDialog" @upload-submit="getSelectExam"></upload>
			</div>
		</sy-dialog>
        <!-- 选择试卷 -->
		<sy-dialog :title="$store.state.lang.edu.t99 || '选择试卷'" height="600px" width="1000px" :visible.sync="examSelectDialog">
			<div slot="body" style="padding:0px;">
                <exam-list v-if="examSelectDialog" :select="examDefaultSelect" :grade-value="gradeValue" :course-value="courseValue" @select="getSelectExam"></exam-list>
			</div>
            <div slot="footer" class="right">
                <el-button size="small" type="" @click="handleExamCtr('close')">{{$store.state.lang.button.cancel || '取消'}}</el-button>
                <el-button size="small" type="primary" @click="handleExamCtr('ok')">{{$store.state.lang.button.ok || '确定'}}</el-button>
			</div>
		</sy-dialog>
        <!-- 选择作业 -->
		<sy-dialog :title="$store.state.lang.edu.t100 || '选择作业'" height="600px" width="1000px" :visible.sync="hwSelectDialog">
			<div slot="body" style="padding:0px;overflow:hiedden;">
                <hw-list v-if="hwSelectDialog" :select="examDefaultSelect" :grade-value="gradeValue" :course-value="courseValue" @select="getSelectExam"></hw-list>
			</div>
            <div slot="footer" class="right">
                <el-button size="small" type="" @click="handleExamCtr('close')">{{$store.state.lang.button.cancel || '取消'}}</el-button>
                <el-button size="small" type="primary" @click="handleExamCtr('ok')">{{$store.state.lang.button.ok || '确定'}}</el-button>
			</div>
		</sy-dialog>
    </div>
</template>

<script>
import { getCourseGrade, getCatalogList, saveBatchSlResoure, deleteBatchSlResoure, getBatchSlResoure, updataBatchSlResoure } from "./request.js";
import examList from "./examList.vue";
import hwList from "./hwList.vue";
import rcList from "./rcList.vue";
import upload from "./upload/index.vue";
export default {
    components: {
        examList,
        hwList,
        rcList,
        upload
    },
    data(){
        return {
            saveLoading: false,
            input: '',
            gradeValue: '',
            gradeId: '',
            currentNodeKey: '',
            defaultexpandedkeys: [],
            courseValue: '',
            oldCourse: '',
            isExpendAll:  true,
            action: '',
            examSelectDialog: false,
            hwSelectDialog: false,
            gradeOptions: [],
            classOptions: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            treeData: [],
            courseVMs: [],
            courseMap: {},
            rcDialog: false,
            rcSelectDialog: false,
            rcUploadDialog: false,
            currentTerm: '',
            examDefaultSelect: '',
            currentSelectObj: {},
            data: [],
            currentData: {},
            catalogObj: {},
            uploadData: {},
            queryList: {}
        }
    },
    created(){
        this.$parent.$emit('currentPage', '/sl/home/setting');
        this.init();
    },
    methods: {
        init(){
            this.queryList = {
                id: this.$route.query.id,
                gv: this.$route.query.gv,
                cv: this.$route.query.cv
            }
            this.getGradeCourseList();
        },
        handleOpenSelect(row,data){
            this.currentSelectObj = data;
            if(row.type == 'dycs'){ // 单元测试
                this.examSelectDialog = true;
                this.examDefaultSelect = data.id;
            }else if(row.type == 'khlx'){ // 课后练习
                this.hwSelectDialog = true;
            }else{
                this.uploadData = {
                    id: data.catelogId,
                    name: data.catelogName,
                    courseValue: data.courseValue,
                    schooltermType: data.schooltermType,
                    stageId: data.stageId,
                    gradeValue: data.gradeValue
                };
                this.rcDialog = true;
            }
        },
        handleExamCtr(t){
            this.examSelectDialog = false;
            this.hwSelectDialog = false;
            this.rcSelectDialog = false;
            if (t != 'ok') {
                this.currentSelectObj.data = {};
                this.currentSelectObj.name = '';
                this.currentSelectObj.rcName = '';
                this.currentSelectObj.objectId = '';
            }
        },
        getSelectExam(data){
            this.rcDialog = false;
            this.rcUploadDialog = false;
            this.currentSelectObj.data = data;
            this.currentSelectObj.name = data.name;
            this.currentSelectObj.rcName = data.name;
            this.currentSelectObj.objectId = data.id;
        },
        getSelectWkExam(data){
            this.rcDialog = false;
            this.rcUploadDialog = false;
            this.currentSelectObj.data = data;
            this.currentSelectObj.name = data.name;
            this.currentSelectObj.rcName = data.name;
            this.currentSelectObj.objectId = data.id;
        },
        // 选择资源
        openDialog(t){
            if(t == 'rc'){
                this.rcSelectDialog = true;
            }
        },
        handleClick(t, index, row, data){
            if(t == 'add'){
                data.push({
                    id: '',
                    name: '',
                    rcName: '',
                    objectId: '',
                    catelogName: row.catelogName,
                    schooltermType: row.schooltermType,
                    courseValue: row.courseValue,
                    gradeValue: row.gradeValue,
                    catelogId: row.catelogId,
                    stageId: row.stageId,
                    typeId: row.typeId,
                    data: {},
                    isSave: false
                })
            }else if(t == 'delete'){
                if(row.id){
                    this.$confirm(this.$store.state.lang.message.isdelete || '是否继续删除?', this.$store.state.lang.message.info || '提示', {
                        confirmButtonText: this.$store.state.lang.button.ok || '确定',
                        cancelButtonText: this.$store.state.lang.button.cancel || '取消',
                        type: 'warning'
                    }).then(() => {
                        deleteBatchSlResoure(row.id).then(res=>{
                            this.$notify({
                                message: this.$store.state.lang.message.delete1 || '删除成功',
                                type: 'success'
                            });
                            this.getDetails();
                        })
                    }).catch(() => {
                           
                    });
                }else{
                    if(data && data.length > 1){
                        data.splice(index, 1);
                    }else{
                        row.id = '';
                        row.objectId = '';
                        row.name = '';
                        row.rcName = '';
                        row.catelogName= '';
                        row.schooltermType= '';
                        row.stageId= '';
                        row.courseValue= '';
                        row.gradeValue= '';
                        row.catelogId= '';
                        row.typeId = '';
                        row.data = {};
                        row.isSave = false;
                    }
                }
            }else if(t == 'save'){
                let obj = {
                    "catelogId": row.catelogId,
                    "courseValue": row.courseValue,
                    "gradeValue": row.gradeValue,
                    "name": row.name,
                    "objectId": row.objectId,
                    "objectName": row.rcName,
                    "typeId": row.typeId
                }
                if(!row.objectId){
                    return
                }
                if(row.id){
                    obj.id= row.id;
                    updataBatchSlResoure(obj).then(res=>{
                        this.$notify({
                            message: this.$store.state.lang.edu.t89 || '修改成功',
                            type: 'success'
                        });
                        row.isSave = true;
                    }).catch(err=>{
                        
                    })
                }else{
                    this.saveLoading = true;
                    obj.gradeId = this.gradeId;
                    saveBatchSlResoure([obj]).then(res=>{
                        if(res && res){
                            row.id = res[0];
                        }
                        this.$notify({
                            message: this.$store.state.lang.edu.t105 || '保存成功',
                            type: 'success'
                        });
                        row.isSave = true;
                        this.saveLoading = false;
                    }).catch(err=>{
                        this.saveLoading = false;
                    })
                }
            }
        },
        // 获取年级科目
        getGradeCourseList(){
            getCourseGrade().then(res=>{
                this.gradeOptions = res.gradeSimpleVMs || [];
                this.courseMap = res.courseMap || {};
                this.courseVMs = res.courseVMs || [];
                let gid = '';
                if(this.queryList.gv){
                    this.gradeOptions.forEach((_s,s)=>{
                        if(_s.gradeValue == this.queryList.gv){
                            gid = _s.id;
                        }
                    })
                }
                this.gradeId = gid || (this.gradeOptions.length > 0 ? this.gradeOptions[0].id : '');
                
                this.courseValue = this.queryList.cv || (this.courseMap[this.gradeId] && this.courseMap[this.gradeId].length>0 ? this.courseMap[this.gradeId][0].courseValue : '');
                this.oldCourse = '';
            })
        },
        // 年级改变
        handleGradeChange(val){
            this.data = [];
            let id = this.courseMap[this.gradeId] && this.courseMap[this.gradeId].length>0 ? this.courseMap[this.gradeId][0].courseValue : '';
            if(this.oldCourse && id == this.oldCourse){
                this.treeData = [];
                this.getBMlist();
            }else{
                this.oldCourse = this.queryList.cv || id;
                this.courseValue = this.queryList.cv || id;
            }
        },
        // 科目改变
        handleCourseChange(val){
            // console.log('---------',val);
            this.data = [];
            this.treeData = [];
            this.getBMlist();
        },
        // 获取编目
        getBMlist(){
            if(!this.courseValue){return}
            let gv = '';
            this.gradeOptions.forEach((_a,a)=>{
                if(_a.id == this.gradeId){
                    gv = _a.gradeValue;
                }
            })
            this.gradeValue = gv;
            let obj = {
                courseValue: this.courseValue,
                gradeValue: gv
            }
            getCatalogList(obj).then(res=>{
                this.treeData = res ? this.data2tree(res) : [];
                if(this.treeData.length == 0){
                    this.queryList = {};
                    return
                }
                if(!this.queryList.id){
                    this.queryList = {};
                    return
                }
                this.currentNodeKey = this.queryList.id;
                this.defaultexpandedkeys = [this.queryList.id];
                let _data = {};
                this.treeData.forEach((_s,s)=>{
                    if(_s.id == this.currentNodeKey){
                        _data = _s;
                    }else{
                        if(_s.children){
                            _s.children.forEach((_a,a)=>{
                                if(_a.id == this.currentNodeKey){
                                    _data = _a;
                                }
                            })
                        }
                    }
                })
                this.handleNodeClick(_data);
            })
        },
        handleNodeClick(data, node){
            this.currentData = data;
            this.getDetails();
        },
        getDetails(){
            getBatchSlResoure({
                courseValue: this.currentData.courseValue,
                gradeValue: this.currentData.gradeValue,
                catelogId: this.currentData.id
            }).then(res=>{
                this.queryList = {};
                let _arr = this.makeData(this.currentData)
                if(res && res.length>0){
                    _arr.forEach((_s,s)=>{
                        res.forEach((_a,a)=>{
                            if(_s.typeId == _a.type){
                                if(!_s.data[0].id){
                                    _s.data[0].id = _a.resId;
                                    _s.data[0].name = _a.resName;
                                    _s.data[0].objectId = _a.objId;
                                    _s.data[0].rcName = _a.objName;
                                    _s.data[0].typeId = _s.typeId;
                                    _s.data[0].isSave = true;
                                }else{
                                    _s.data.push({
                                        id: _a.resId,
                                        courseValue: this.currentData.courseValue || '',
                                        gradeValue: this.currentData.gradeValue || '',
                                        catelogId: this.currentData.id || '',
                                        catelogName: this.currentData.name || '',
                                        schooltermType: this.currentData.schooltermType ||'',
                                        stageId: this.currentData.stageId ||'',
                                        name: _a.resName,
                                        objectId: _a.objId,
                                        rcName: _a.objName,
                                        typeId: _s.typeId,
                                        data: {},
                                        isSave: true
                                    })
                                }

                            }
                        })
                    })
                }
                this.data = _arr;
            })
        },
        makeData(data){
            let arr = [];
            if(data.parentId){
                arr.push({
                    type: 'lbkc',
                    name: this.$store.state.lang.edu.t101 || '录播课程',
                    typeId: '1',
                    data: [
                        {
                            id: '',
                            courseValue: data.courseValue || '',
                            gradeValue: data.gradeValue || '',
                            catelogId: data.id || '',
                            catelogName: data.name || '',
                            schooltermType: data.schooltermType ||'',
                            stageId: data.stageId ||'',
                            name: '',
                            objectId: '',
                            rcName: '',
                            typeId: '1',
                            data: {},
                            isSave: false
                        }
                    ]
                })
                arr.push({
                    type: 'khlx',
                    name: this.$store.state.lang.edu.t33 || '课后练习',
                    typeId: '2',
                    data: [
                        {
                            id: '',
                            name: '',
                            rcName: '',
                            courseValue: data.courseValue || '',
                            gradeValue: data.gradeValue || '',
                            catelogId: data.id || '',
                            catelogName: data.name || '',
                            schooltermType: data.schooltermType ||'',
                            stageId: data.stageId ||'',
                            data: {},
                            objectId: '',
                            typeId: '2',
                            isSave: false
                        }
                    ]
                })
                arr.push({
                    type: 'ptwk',
                    name: this.$store.state.lang.edu.t102 || '配套微课',
                    typeId: '4',
                    data: [
                        {
                            id: '',
                            name: '',
                            rcName: '',
                            courseValue: data.courseValue || '',
                            gradeValue: data.gradeValue || '',
                            catelogId: data.id || '',
                            catelogName: data.name || '',
                            schooltermType: data.schooltermType ||'',
                            stageId: data.stageId ||'',
                            data: {},
                            objectId: '',
                            typeId: '4',
                            isSave: false
                        }
                    ]
                })

            }else{ 
                arr.push({
                    type: 'dycs',
                    name: this.$store.state.lang.edu.t103 || '单元测试',
                    typeId: '3',
                    data: [
                        {
                            id: '',
                            name: '',
                            rcName: '',
                            courseValue: data.courseValue || '',
                            gradeValue: data.gradeValue || '',
                            catelogId: data.id || '',
                            catelogName: data.name || '',
                            schooltermType: data.schooltermType ||'',
                            stageId: data.stageId ||'',
                            data: {},
                            objectId: '',
                            typeId: '3',
                            isSave: false
                        }
                    ]
                })
            }
            return arr;
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
						obj.children = _c;
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
    },
    mounted(){

    }
}
</script>

<style scoped>
.sy-sl-setting-box{
    position: absolute;
    left: 10px;
    right: 10px;
    box-sizing: border-box;
    top: 0px;
    bottom: 10px;
}
.sy-sl-setting-header{
    position: absolute;
    left: 0px;
    right: 0px;
    box-sizing: border-box;
    top: 0px;
    height: 40px;
    line-height: 40px;
}
.sy-sl-setting-body{
    position: absolute;
    left: 0px;
    right: 0px;
    box-sizing: border-box;
    top: 40px;
    bottom: 0px;
    line-height: 40px;
}
.sy-sl-setting-body-left{
    position: absolute;
    width: 230px;
    border: 1px solid #ccc;
    height: 100%;
    top: 0;
    box-sizing: border-box;
}
.sy-sl-setting-body-right{
    position: absolute;
    height: 100%;
    top: 0;
    box-sizing: border-box;
    border: 1px solid #ccc;
    left: 230px;
    border-left: 0;
    background-color: #fff;
    right: 0;
}
.sy-sl-setting-body-row{
    margin: 10px 0;
    height: 40px;
    line-height: 40px;
}
</style>

