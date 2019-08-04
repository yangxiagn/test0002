<template>
    <div class="tpl-sl-details-body">
        <div class="tpl-sl-details-body-left" :style="{'margin-right': expened ? '230px' : '0px'}">
            <hw v-if="rcType == 2" :res-id="objId" @complated="handleComplated"></hw>
            <exam v-if="rcType == 3" :res-id="objId" :exam-id="objId" @complated="handleComplated"></exam>
            <div v-if="!rcType" class="center" v-show="!resId" style="line-height: 480px;"> 
                {{$store.state.lang.edu.t40 ||"请选择资源"}}
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
import hw from "./hw/index.vue";
import exam from "./exam/index.vue";
import { getResorceSelectTeachHw, photourl, getYearAndTerm, save_course_detal_log } from "./request.js";
export default {
    components: {
        hw,
        exam
    },
    data(){
        return {
            expened: true,
            rcType: null,
            activeName: '1',
            objId: '',
            defaultKey: '',
            examId: '',
            catalogTreeData: [],
            question: '',
            backForm: {
                anwser: ''
            },
            defaultProps: {
                children: 'resourceInfoVM',
                label: 'name'
            },
            rules: {
                name: [
                    { required: true, message: this.$store.state.lang.edu.t49 || '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: this.$store.state.lang.edu.t50 || '长度在 3 到 5 个字符', trigger: 'blur' }
                ]
            },
            data: {},
            name: '',
            currentData: {}
        }
    },
    created(){
        // console.log(this.treeData);
        this.init();
    },
    methods: {
        init(){
            let obj = JSON.parse( window.sessionStorage.getItem('_course_data'));
            // console.log(obj);
            this.data = obj || {};
            this.name = obj.courseName;
            this.getCatalogTree();
        },
        handleNodeClick(data){

        },
        // 上交作业后回调
        handleComplated(data){
            if(this.currentData.flag == 1){
                return
            }
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
                    resName: this.currentData.resName,
                    catalogId: this.currentData.parentId,
                    typeId: data.typeId
                };
                save_course_detal_log(obj).then(res=>{
                    console.log('完成保存结果',res)
                })
            }).catch(err=>{

            })
        },
        handleNodeClick(data){
            this.currentData = data;
            this.rcType = null;
            this.questionList = [];
            this.resId = '';
            this.start = 1;
            if(data.sltype == 'rc'){
                this.resId = data.resId || '';
                this.rcType = data.type;
                this.objId = data.objId || '';
                this.examId = data.examId || '';
            }else{

            }
        },
        renderContent(h, { node, data, store }){
            return (
                <span style="padding: 5px 0;">
                    <span>
                        <i style={{ display: node.level != 1 ? 'none' : '', fontSize: '16px',position: 'relative', top: '2px' }} 
                            class={{ fa: true, 'fa-folder-o': !node.expanded, 'fa-folder-open-o': node.expanded }} aria-hidden="true"></i>
                        <span style={{ display: data.sltype != 'rc' ? 'none' : 'inline-block', width: '36px', height: '36px', verticalAlign: 'middle' }}>
                            <img style="width: 100%;height: 100%;border-radius: 3px;" src={photourl+data.userId}/>
                        </span>
                        <span> {data.name}</span>
                    </span>
                </span>
            )
        },
        // 获取编目
        getCatalogTree(){
            getResorceSelectTeachHw({
                courseValue: this.data.courseValue,
                gradeValue: this.data.gradeValue
            }).then(res=>{
                if(res){
                    res.forEach((_s,s)=>{
                        if(_s.resourceInfoVM){
                            _s.resourceInfoVM.forEach((_a,a)=>{
                                _a.name = _a.resName;
                                _a.sltype = 'rc';
                                _a.id = _a.resId;
                                _a.parentId = _s.id;
                                _a.parentName = _s.name;
                            })
                        }
                        if(!_s.parentId){
                            if(_s.resourceInfoVM){
                                _s.resourceInfoVM.forEach((_a,a)=>{
                                    _a.name = _a.resName;
                                    _a.sltype = 'rc';
                                    _a.parentId = _s.id;
                                    _a.parentName = _s.name;
                                    res.push(_a)
                                })
                            }
                        }
                    })
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

<style>

</style>

