<template>
    <div>
        <div style="line-height: 30px;margin-bottom: 10px;">
            <el-select v-model="gradeValue" style="width: 120px;" 
                :placeholder="$store.state.lang.edu.t2 || '请选择年级'" @change="handleGradeChange1">
                <el-option v-for="item in gradeSimpleVMs" :key="item.gradeValue" :label="item.gradeName" :value="item.gradeValue"></el-option>
            </el-select>
            <el-select v-model="courseValue" style="width: 120px;margin: 0 10px;"  
                :placeholder="$store.state.lang.edu.t3 || '请选择班级'" @change="handleGradeChangeCourse">
                <el-option v-for="item in courseList" :key="item.courseValue" :label="item.name" :value="item.courseValue"></el-option>
            </el-select>
        </div>
        <!--课程列表  -->
        <div class="count-tabscon">
            <el-row>
                <el-col :span="6">
                    <el-card style="min-height: 440px;">
                        <el-tree :data="catalogTreeData" node-key="id" :props="defaultProps"
                            :default-expanded-keys="[defaultKey]" 
                            :current-node-key="defaultKey" highlight-current :default-expand-all="false" style="border: 0;height: 100%;" 
                            @node-click="handleNodeClick"></el-tree>
                    </el-card>
                </el-col>
                <el-col :span="10">
                    <el-card>
                        <el-tabs v-if="showData.resVMs.length!=0" v-model="activeName">
                            <el-tab-pane :label="$store.state.lang.edu.t13 || '视频资源'" name="1">
                                <div v-for="o in showData.resVMs" :key="o.resId" class="tpl-sl-rows cp" @click="handleResClick(o)">
                                    <i class="fa fa-film" aria-hidden="true"></i>
                                    <span class="tpl-sl-title">{{o.resName}}</span>
                                    <!-- <el-progress style="width: 150px;display: inline-block;" :text-inside="true" :stroke-width="18" :percentage="o.percentage" 
                                        :status="o.percentage < 50 ? 'exception' : ( o.percentage == 100 ? 'success' : '' )"></el-progress> -->
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                        <el-tabs v-if="showData.hwVMs.length!=0" v-model="activeName">
                            <el-tab-pane :label="$store.state.lang.edu.t14 || '作业资源'" name="1">
                                <div v-for="o in showData.hwVMs" :key="o.hwId" class="tpl-sl-rows cp" @click="handleHwClick(o)">
                                    <i class="fa fa-file-text" aria-hidden="true"></i>
                                    <span class="tpl-sl-title">{{o.hwName}}</span>
                                    <!-- <span>正确率：</span>
                                    <el-tag :type=" parseFloat(o.correctRate) > 50 ? 'success' : 'danger'">{{o.correctRate ? o.correctRate : '0%'}}</el-tag> -->
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                        <p v-if="showData.resVMs.length==0 && showData.hwVMs.length==0" style="line-height: 400px;color: #ccc;" class="center">
                            {{$store.state.lang.base.nodata || '暂无数据'}}
                        </p>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card>
                        <div ref="myChart1" class="sl-myChart2"></div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts';
import { getGradeCoursesList, select_resource_and_hw, getCountSelectStudentCount,getCountSelectHwCount } from "./request.js";
export default {
    data(){
        return {
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            activeName: '1',
            defaultKey: '',
            courseMap: {},
            gradeSimpleVMs: [],
            courseList: [],
            gradeValue: '',
            courseValue: '',
            myChart1:null,
            option1:{
                backgroundColor:'#fff',
                title:{
                    text: '',
                    x:'center',
                    y : '87.5%'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    x : 'center',
                    y : '80%',
                    data:[this.$store.state.lang.edu.t15, this.$store.state.lang.edu.t16]
                },
                series: [
                    {
                        name:'',
                        type:'pie',
                        radius: ['30%', '50%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position:'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '16',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[]
                    }
                ],
                color:['#ffcb6b','#ff6666']
            },
            catalogTreeData: [],
            showData: {
                resVMs: [],
                hwVMs: []
            },
            courseName: ''
        }
    },
    created(){
        this.init();
    },
    methods: {
        init(){
            this.getGC();
        },
        handleResClick(data){
            if(this.myChart1){
                this.myChart1.clear();
                this.myChart1.showLoading();
            }
            getCountSelectStudentCount({
                resId: data.resId,
                gradeValue: this.gradeValue
            }).then(res=>{
                this.drawchart1(res);
            })
        },
        handleHwClick(data){
            if(this.myChart1){
                this.myChart1.clear();
                this.myChart1.showLoading();
            }
            getCountSelectHwCount({
                hwId: data.hwId,
                gradeValue: this.gradeValue
            }).then(res=>{
                this.drawchart1(res);
                
                
            })
        },
        drawchart1(res){
            console.log(res);
            this.option1.title.text = `${this.courseName}${this.$store.state.lang.edu.t14}`;
            this.option1.series[0].name = `${this.courseName}${this.$store.state.lang.edu.t14}`;
            this.option1.series[0].data = [
                {value: res.complete, name: this.$store.state.lang.edu.t15},
                {value: res.unfinished, name: this.$store.state.lang.edu.t16}
            ]
            this.myChart1.setOption(this.option1);
            setTimeout(()=>{
                this.myChart1.hideLoading();
            }, 10)
        },
        // 查询年级科目
        getGC(){
            getGradeCoursesList({unitId: this.$store.state.unitId}).then(res=>{
                this.gradeSimpleVMs = res.gradeSimpleVMs || [];
                this.courseMap = res.courseMap || {};
                this.gradeValue = this.gradeSimpleVMs.length>0 ? this.gradeSimpleVMs[0].gradeValue : '';
            }).catch(err=>{

            })
        },
        handleGradeChange1(val){
            this.courseList = [];
            this.courseValue = '';
            let gradeId = '';
            this.gradeSimpleVMs.forEach((_s,s)=>{
                if(_s.gradeValue == val){
                    gradeId = _s.id;
                }
            })
            setTimeout(() => {
                this.courseList = this.courseMap[gradeId];
                this.courseValue = this.courseList.length > 0 ? this.courseList[0].courseValue : '';
            }, 50);
        },
        handleGradeChangeCourse(val){
            this.showData.hwVMs = [];
            this.showData.resVMs = [];
            this.courseName = '';
            this.courseList.forEach((_s,s)=>{
                if(_s.courseValue == val){
                    this.courseName = _s.name;
                }
            })
            this.getCatalogTree();
        },
        handleNodeClick(data){
            this.showData.hwVMs = [];
            this.showData.resVMs = [];
            if(data){
                this.showData.resVMs = data.resVMs || [];
                this.showData.hwVMs = data.hwVMs || [];
            }
        },
        // 获取编目
        getCatalogTree(){
            this.catalogTreeData = [];
            if(this.courseValue === '' || this.gradeValue === ''){return}
            select_resource_and_hw({
                courseValue: this.courseValue,
                gradeValue: this.gradeValue
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
    mounted () {
        if(this.$refs.myChart1){
            this.myChart1=echarts.init(this.$refs.myChart1);
            this.myChart1.setOption(this.option1);
        }
    }
}
</script>

<style>
.sl-myChart2{
    height: 400px;
    width: 100%;
    margin: 0 auto;
    background-color: #fff;
}
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
