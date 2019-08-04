<template>
    <div class="sy-app-container" >
        <sy-grad-4 :border="false">
            <div slot="headerRight"  class="not_weight" style="padding-top: 5px;">
                <el-date-picker v-model="form.startDate" :editable="false" type="date" 
                    :placeholder="$store.state.lang.hw.t17||'请选择开始日期'"
                    :picker-options="pickerOptions0" style="width:140px"></el-date-picker> 
                <span style="padding: 0 10px;">~</span>
                <el-date-picker v-model="form.endDate" :editable="false" type="date" 
                    :placeholder="$store.state.lang.hw.t18||'请选择结束日期'"
                    :picker-options="pickerOptions1" style="width:140px;margin-right: 10px;"></el-date-picker>
                <el-input v-model="form.keyWord" :placeholder="$store.state.lang.hw.t19||'输入作业关键字'" :maxlength="50" style="width:150px;margin-right: 10px;"></el-input>
                <el-button icon="search" @click="handleSeacher">{{$store.state.lang.base.inquire ||　'查询'}}</el-button>
                <el-radio-group size="small" v-model="hwType" style="float:right;">
                    <el-radio-button label="1">{{$store.state.lang.hw.t20||"我发布的作业"}}</el-radio-button>
                    <el-radio-button label="2">{{$store.state.lang.hw.t21||"校级作业"}}</el-radio-button>
                </el-radio-group>
            </div>
            <div slot="bodyRight" style="padding:0 10px;overflow:auto" v-loading="pageloading" 
                :element-loading-text="$store.state.lang.hw.t1||'拼命加载中...'">
                <el-table v-show="hwType == '1'" ref="multipleTable" :empty-text="emptyText" :data="tableData" border 
                    tooltip-effect="dark" height="100%" style="width: 100%;height:100%;" @row-click="handleRowClick">   
                    <el-table-column align="center" width="40">
                        <template scope="scope">
                            <el-radio class="radio" v-model="radio" :label="scope.row.id" @change="handleChange">{{''}}</el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip align="left" header-align="center" prop="name" 
                        :label="$store.state.lang.hw.t22||'练习作业名称'"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="gradeName" 
                        :label="$store.state.lang.edu.t31||'年级'" width="100"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="classname" 
                        :label="$store.state.lang.edu.t27||'班级'" width="150"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="courseName" 
                        :label="$store.state.lang.hw.t23||'学科'" width="100"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="useTime" 
                        :label="$store.state.lang.hw.t24||'布置时间'" width="130" >
                        <template scope="scope">
                            <span>{{scope.row.useTime | moment('YYYY-MM-DD HH:mm:ss')}}</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column show-overflow-tooltip align="center" prop="completedCount" 
                        :label="$store.state.lang.hw.t27||'完成数'" width="70"></el-table-column> -->
                    <el-table-column show-overflow-tooltip align="center" prop="limitTime" 
                        :label="$store.state.lang.hw.t26||'完成所需时长'" width="90">
                        <template scope="scope">
                            <span>{{scope.row.limitTime == '-1' ? '/' : scope.row.limitTime + $store.state.lang.edu.t24||'分钟'}}</span>
                        </template>
                    </el-table-column> 
                </el-table>
                <el-table v-show="hwType == '2'" :empty-text="emptyText" :data="tableData" border 
                    tooltip-effect="dark" height="100%" style="width: 100%;height:100%;" @row-click="handleRowClick">
                    <el-table-column align="center" width="40">
                        <template scope="scope">
                            <el-radio class="radio" v-model="radio" :label="scope.row.id" @change="handleChange">{{''}}</el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="name" label="练习作业名称"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="gradeName" 
                        :label="$store.state.lang.edu.t31||'年级'" width="100"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="courseName" 
                        :label="$store.state.lang.hw.t23||'学科'" width="100"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="userName" 
                        :label="$store.state.lang.hw.t25||'布置人'" width="100"></el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="useTime" 
                        :label="$store.state.lang.edu.t68||'创建时间'" width="130" >
                        <template scope="scope">
                            <div>{{scope.row.useTime | moment('YYYY-MM-DD HH:mm:ss')}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="limitTime" 
                        :label="$store.state.lang.hw.t26||'完成所需时长'" width="90">
                        <template scope="scope">
                            <div>{{scope.row.limitTime == '-1' ? '/' : scope.row.limitTime + $store.state.lang.edu.t24||'分钟'}}</div>
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
import {selectMyHome,selectSchoolHome} from './request.js';
export default {
	props: {
        type: {
            type: String,
            default: '1'  // 1 我创建的作业  2 校级作业
        },
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
        }
	},
	data() {
		return {
            radio: this.select || '',
            currentValue: '100',
            emptyText: ' ',
            multipleSelection: [], //复选框
            form: {
                name: '', // 考试名称
                type: '1', // 考试类型
                gradeId: '', // 年级
                courseId: '',  // 学科
                shareId: '',  // 共享方式
                startDate:'',
                endDate:'',
                timeLimt: '2', // 时长限制
                times: 0, // 时长
                gradeValue:'',
                courseValue:'',
                id:'',
                start: 1,
                size: 30,
                keyWord: '',
                total: 0,
                desc: ''
            },
            pageloading: false,
            Userloading: false,
            pickerOptions0:{},
            pickerOptions1:{},
            options: {
                grade: [],
                corse: []
            },
            repairtypeapplyOptions: [], // 设备列表
            repairtypeapplyOption: [],  //原因列表     
            tableData: [{}],
            courseMap: {},
            typeList: [], //设备类型
            allCourseList: [],
            gradeCourseData: {},
            hwType: '1'
		}
    },
	watch:{
        hwType(val){
            this.form.keyWord = '';
            this.getList(this.hwType);
        },
        'form.startDate': function(newVal,oldVal){
			if(!newVal){
				this.pickerOptions1 = {
					disabledDate(time) {
						return false;
					}
				}
			}else{
				this.pickerOptions1 = {
					disabledDate(time) {
						return time.getTime() < newVal.getTime();
					}
				}
			}			
		},
		'form.endDate': function(newVal,oldVal){
			if(!newVal){
				this.pickerOptions0 = {
					disabledDate(time) {
						return false;
					}
				}
			}else{
				this.pickerOptions0 = {
					disabledDate(time) {
						return time.getTime() > newVal.getTime();
					}
				}
			}
        }
	},
	created() {
        this.init()
	},
	methods: {
        init(){
            this.getList(this.hwType);  
        },
        // 查询
        trim(str) {
            return str.replace(/^\s+|\s+$/g, '');
        },
        getList(t){
            if(t == 1){ // 查询我创建的作业
                this.pageloading = true;
                this.tableData=[];
                this.form.keyWord = this.trim(this.form.keyWord);//关键字去除两段空格
                selectMyHome({
                    gradeValue: this.gradeValue,
                    courseValue: this.courseValue,
                    beginTime: this.form.startDate ? this.$moment(this.form.startDate).format('YYYY-MM-DD') :undefined,
                    endTime: this.form.endDate ? this.$moment(this.form.endDate).format('YYYY-MM-DD')+' 23:59:59' :undefined,
                    keyWord: this.form.keyWord|| undefined,
                    start: this.form.start,
                    size: this.form.size        
                }).then(res => {
                    this.emptyText = this.$store.state.lang.base.nodata||'暂无数据';
                    this.pageloading = false;
                    this.tableData = res.list;
                    this.form.total = res.total;
                }).catch(err => {
                    this.emptyText = this.$store.state.lang.base.nodata||'暂无数据';
                    this.pageloading = false;
                });
            }else{ // 校级作业
                this.pageloading = true;
                this.tableData=[];
                this.form.keyWord = this.trim(this.form.keyWord);//关键字去除两段空格
                selectSchoolHome({
                    gradeValue: this.form.gradeValue,
                    courseValue: this.form.courseValue,
                    beginTime: this.form.startDate|| undefined,
                    endTime: this.form.endDate|| undefined,
                    keyWord: this.form.keyWord|| undefined,
                    start: this.form.start,
                    size: this.form.size
                }).then(res => {
                    this.emptyText = this.$store.state.lang.base.nodata||'暂无数据';
                    this.pageloading = false;
                    this.tableData = res.list;
                    this.form.total = res.total;
                }).catch(err => {
                    this.emptyText = this.$store.state.lang.base.nodata||'暂无数据';
                    this.pageloading = false;
                });
            }
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
            this.getList(this.hwType);
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
    }
}
</script>
<style scoped>
</style>