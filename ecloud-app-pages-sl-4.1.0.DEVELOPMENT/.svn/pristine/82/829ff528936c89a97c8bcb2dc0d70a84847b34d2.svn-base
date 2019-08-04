<template>
    <div class="sy-app-container" >
        <sy-grad-4 :border="false">
            <div slot="headerRight"  class="not_weight" style="padding-top: 5px;">
                <span>{{$store.state.lang.rc.t1||"资源类型："}}</span>
                <el-select v-model="form.resourceTypeId" :placeholder="$store.state.lang.rc.t2||'请选择'" style="width: 120px;">
                    <el-option :label="$store.state.lang.rc.t3||'全部类型'" value=""></el-option>
                    <el-option v-for="(item,index) in options.resourceType" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <el-input v-model="form.keyWord" :placeholder="$store.state.lang.rc.t4||'资源名称、上传人、标签'" :maxlength="50" style="width:150px;margin-right: 10px;"></el-input>
                <el-button icon="search" @click="handleSeacher">{{$store.state.lang.base.inquire||'查询'}}</el-button>
            </div>
            <div slot="bodyRight" style="padding:0 10px;overflow:auto" v-loading="pageloading" 
                :element-loading-text="$store.state.lang.hw.t1||'拼命加载中...'">
                <el-table :data="searchContent" border stripe style="width: 100%;height: 100%;" height="100%" @row-click="toDetails">
                    <el-table-column align="center" width="40">
                        <template scope="scope">
                            <el-radio class="radio" v-model="radio" :label="scope.row.id" @change="handleChange">{{''}}</el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column v-for="col in column" :key="col.prop" :prop="col.prop" :label="col.label" :width="col.width" :align="col.align">
                        <template scope="scope">
                            <div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis">
                                <b class="sy-hot-rc" v-if="scope.row.recommend==1 && col.prop === 'name'">{{$store.state.lang.rc.t6||'荐'}}</b>
                                <span class="sy-rc-items">{{scope.row[col.prop]}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$store.state.lang.base.ctr||'操作'" width="90" align="center">
                        <template scope="scope">
                            <el-button type="text" @click="hanldeView(scope.row)">{{$store.state.lang.rc.t5||'预览'}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer">
                <el-pagination @current-change="handleCurrentChange" :current-page="form.start" :page-size="form.size"
                    class="pagination-mf" layout="total, prev, pager, next" :total="form.total"></el-pagination>
            </div>
        </sy-grad-4>
    </div>
</template>
<script>
import {getResourceTypeNoLogin, getBase} from './request.js';
export default {
	props: {
        gradeValue: {
            type: String,
            default: ''
        },
        courseValue: {
            type: String,
            default: ''
        },
        select: {
            type: String,
            default: ''
        },
        term: {
            type: String,
            default: ''
        },
        categoryId: {
            type: String,
            default: ''
        }
	},
	data() {
		return {
            radio: this.select || '',
            currentValue: '100',
            emptyText: ' ',
            column: [
                {
                    prop: 'name',
                    label: this.$store.state.lang.rc.t7||'资源名称',
                    align: 'left',
                    width: ''
                }, {
                    prop: 'thumbsUp',
                    label: this.$store.state.lang.rc.t8||'点赞次数',
                    align: 'center',
                    width: '100'
                },
                {
                    prop: 'downloadNum',
                    label: this.$store.state.lang.rc.t9||'下载次数',
                    align: 'center',
                    width: '100'
                },
                {
                    prop: 'clickNum',
                    label: this.$store.state.lang.rc.t10||'阅读次数',
                    align: 'center',
                    width: '100'
                }, {
                    prop: 'publishTime',
                    label: this.$store.state.lang.rc.t11||'发布时间',
                    align: 'center',
                    width: '150'
                }
            ],
            multipleSelection: [], //复选框
            form: {
                resourceTypeId: '',
                sorts: 1,
                fileFormat: '2', // 视频
                courseTypeCode: 'type1',
                KnowledgePointId: '', // 年级
                start: 1,
                size: 30,
                keyWord: '',
                total: 0,
            },
            data: [],
            searchContent: [],
            pageloading: false,
            Userloading: false,
            options:{
                resourceType: []
            },
            treeTopTabsValue: '1',

		}
    },
	created() {
        this.init()
	},
	methods: {
        init(){
            console.log('11111111');
            this.getTypes();
            this.getList();  
        },
        // 查询
        trim(str) {
            return str.replace(/^\s+|\s+$/g, '');
        },
        // 查询资源类型
        getTypes() {
            return new Promise((resolve, reject) => {
                getResourceTypeNoLogin({
                    unitId: this.$store.state.unitId,
                    code: this.form.courseTypeCode
                }).then(res => {
                    this.options.resourceType = res.data || [];
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        checkeZero(t) {
            return t || t == 0 ? t : undefined
        },
        getList(t){
            getBase({
                unitId: this.$store.state.unitId,
                courseTypeCode: this.form.courseTypeCode,
                sort: this.form.sorts,
                // needknowledgePoint: '1',
                keyword: this.form.keyword || undefined,
                fileFormat: this.form.fileFormat || undefined,
                categoryId: this.categoryId || undefined,
                KnowledgePointId: this.form.KnowledgePointId || undefined,
                courseValue: this.checkeZero(this.courseValue),
                resourceTypeId: this.form.resourceTypeId || undefined,
                term: this.term || undefined,
                gradeValue: this.checkeZero(this.gradeValue),
                start: this.form.start,
                size: this.form.size
            }).then(res => {
                this.pageLoading = false;
                if (res.data && res.data.list) {
                    res.data.list.forEach((_d, d) => {
                        _d.type = this.form.courseTypeCode;
                    });
                }
                this.searchContent = res.data.list;
                this.form.total = res.data.total;
            }).catch(err => { this.pageLoading = false; });
        },
        //复选框
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }, 
        // 分页
        handleCurrentChange(val) {
            this.form.start = val;
            this.getList(this.hwType);
        },
        handleRowClick(row, event, column){
            this.radio = row.id;
            this.$emit('select', row)
        },
        handleSeacher(){
            this.form.start = 1;
            this.getList();
        },
        handleChange(val){
            for (let i = 0; i < this.tableData.length; i++) {
                const element = this.tableData[i];
                if(val == element.id){
                    this.$emit('select', element)
                    return
                }
            }
        },
        toDetails(row) {
            this.radio = row.id;
            row.id = row.auditId;
            console.log(row)
            this.$emit('select', row)
            // var params = qs.parse(location.search.substr(1))
            // var uid = params.uid || ''
			// var ut = params.ut || ''
            // this.$router.push({path:'/rc/detail',query:{'uid':uid,'ut':ut,'rxId':row.auditId}})
            //  window.open(`/rc/detail?uid=+row.id`);
        },
        hanldeView(row){
            window.open(`/rc/pre/detail?rxId=${row.auditId}`);
        }
    }
}
</script>
<style scoped>
</style>