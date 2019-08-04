<template>
    <div class="sy-app-container" style="overflow: auto;" v-loading="pageloading" element-loading-text="拼命加载中...">
        <sy-grad-4>
            <div slot="headerRight" style="line-height: 40px;">
                <b>{{courseName}}</b>
                <el-button style="float: right;margin-top: 5px;" @click="back(1)">{{$store.state.lang.button.back||'返回'}}</el-button>
            </div>
            <div slot="bodyLeft">
                <el-tree :data="tableDate" node-key="catalogId" :props="defaultProps"
                :default-expanded-keys="defaultKey" 
                :current-node-key="currentKey"
                :render-content="renderContent" highlight-current :default-expand-all="false" style="border: 0;height: 100%;" 
                @node-click="handleNodeClick"></el-tree>
            </div>
            <div slot="bodyRight" style="padding: 0 10px 10px;overflow-y: auto;">
                <el-tabs v-if="showData.videoResourceVMList.length!=0" v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane :label="$store.state.lang.edu.t13||'视频资源'" name="1">
                        <el-card>
                            <div v-for="o in showData.videoResourceVMList" :key="o.id" class="tpl-sl-rows">
                                <i class="fa fa-film" aria-hidden="true"></i>
                                <span class="tpl-sl-title">{{o.name}}</span>
                                <el-progress style="width: 150px;display: inline-block;" :text-inside="true" :stroke-width="18" :percentage="o.percentage" 
                                    :status="o.percentage < 50 ? 'exception' : ( o.percentage == 100 ? 'success' : '' )"></el-progress>
                            </div>
                        </el-card>
                    </el-tab-pane>
                </el-tabs>
                <el-tabs v-if="showData.homeworkResourceVMList.length!=0" v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane :label="$store.state.lang.edu.t14||'作业资源'" name="1">
                        <el-card>
                            <div v-for="o in showData.homeworkResourceVMList" :key="o.id" class="tpl-sl-rows">
                                <i class="fa fa-file-text" aria-hidden="true"></i>
                                <span class="tpl-sl-title">{{o.name}}</span>
                                <span>{{$store.state.lang.slp.t2||"正确率"}}：</span>
                                <el-tag :type=" parseFloat(o.correctRate) > 50 ? 'success' : 'danger'">{{o.correctRate ? o.correctRate : '0%'}}</el-tag>
                            </div>
                        </el-card>
                    </el-tab-pane>
                </el-tabs>
                <p v-if="showData.videoResourceVMList.length==0 && showData.homeworkResourceVMList.length==0" style="line-height: 160px;color: #ccc;" class="center">该编目没有学习记录</p>
            </div>
        </sy-grad-4>
    </div>
</template>
<script>
import { getSelect_student_details } from "./request.js";
export default {
    data() {
        return {
            activeName: '1',
            pageloading: false,
            tableDate: [],
            defaultKey: [],
            currentKey: '',
            courseName: '',
            defaultProps: {
                children: 'children',
                label: 'catalogName'
            },
            showData: {
                homeworkResourceVMList: [],
                videoResourceVMList: []
            }
        }
    },
    created () {
        this.$parent.$emit('currentPage', '/sl/home/parstudy');
        this.init();
    },
    methods: {
        init(){
            let obj = JSON.parse( window.sessionStorage.getItem('_course_parent_data'));
            if(obj){
                this.courseName = obj.courseName;
            }
            this.getDetails();
        },
        // 查询学生详情
        getDetails(){
            this.pageloading = true;
            getSelect_student_details({
                courseValue: this.$route.query.value
            }).then(res=>{
                let arr = this.data2tree(res, 'catalogId', 'parentId');
                this.pageloading = false;
                this.tableDate = arr;
            }).catch(err=>{
                this.pageloading = false;
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
        },
        handleNodeClick(data){
            this.showData.homeworkResourceVMList = [];
            this.showData.videoResourceVMList = [];
            if(data){
                this.showData.homeworkResourceVMList = data.homeworkResourceVMList || [];
                this.showData.videoResourceVMList = data.videoResourceVMList || [];
            }
            console.log(this.showData);
        },
        renderContent(h, { node, data, store }){
            return (
                <span>
                    <span>
                        <i style={{ display: node.level != 1 ? 'none' : '', fontSize: '16px',position: 'relative', top: '2px' }} 
                            class={{ fa: true, 'fa-folder-o': !node.expanded, 'fa-folder-open-o': node.expanded }} aria-hidden="true"></i>
                        <span> {data.catalogName}</span>
                    </span>
                </span>
            )
        },
        // 加载更多学生答疑
        back(){ 
            this.$router.push({path:'parstudy'})
        },
        handleClickVideo(row){
            this.$router.push({path:'pardetails',query:{tab:row}})
        }
    }
}
</script>
<style scoped>
    .tpl-sl-rows{
        line-height: 40px;
        box-shadow: 0 2px 3px #ccc;
        padding: 0 10px;
        margin-bottom: 10px;
    }
    .tpl-sl-title{
        display: inline-block;
        padding: 0 5px;
        width: 200px;
        overflow: hidden;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>