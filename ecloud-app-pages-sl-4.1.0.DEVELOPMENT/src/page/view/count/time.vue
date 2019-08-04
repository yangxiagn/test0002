<template>
    <div class="sl-timers" v-loading="pageLoading">
        <el-select class="count-tabsel" v-model="courseValue"
            @change="handleChange"
            style="float:right;margin-bottom:12px;">
            <el-option v-for="item in courselist" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
        <el-table :data="timeDate" border>
            <el-table-column type="expand">
                <template scope="scope">
                    <el-table :data="scope.row.children" border>
                        <el-table-column prop="clazzName" :label="$store.state.lang.edu.t27 || '班级'" align="center"></el-table-column>
                        <el-table-column prop="studentCount" :label="$store.state.lang.edu.t28 || '总人数'" align="center"></el-table-column>
                        <el-table-column prop="avgSecond" :label="$store.state.lang.edu.t29 || '平均时长'" align="center">
                            <template scope="scope">
                                <span>{{scope.row.avgSecond + $store.state.lang.edu.t24}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="totalLength" :label="$store.state.lang.edu.t30 || '总时长'" align="center">
                            <template scope="scope">
                                <span>{{scope.row.totalLength + $store.state.lang.edu.t24}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </template> 
            </el-table-column>
            <el-table-column prop="gradeName" :label="$store.state.lang.edu.t31 || '年级'" align="center"></el-table-column>
            <el-table-column prop="sumCount" :label="$store.state.lang.edu.t28 || '总人数'" align="center"></el-table-column>
            <el-table-column prop="averageCount" :label="$store.state.lang.edu.t29 || '平均时长'" align="center">
                <template scope="scope">
                    <span>{{scope.row.averageCount + $store.state.lang.edu.t24}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="totalLength" :label="$store.state.lang.edu.t30 || '总时长'" align="center">
                <template scope="scope">
                    <span>{{scope.row.totalLength + $store.state.lang.edu.t24}}</span>
                </template>
            </el-table-column>
        </el-table> 
    </div>
</template>

<script>
import { getCourseList, select_second_statistics } from "./request.js";
export default {
    data() {
        return {
            pageLoading: false,
            courseValue: '',
            courselist: [],
            timeDate: []
        }
    },
    created(){
        this.init();
    },
    methods: {
        init(){
            this.getCourse();
        },
        getCourse(){
            getCourseList().then(res=>{
                this.courselist = res || [];
                this.courseValue = this.courselist.length > 0 ? this.courselist[0].value : '';
            }).catch(err=>{

            })
        },
        handleChange(val){
            if(val){
                this.getData();
            }else{
                this.timeDate = [];
            }
        },
        // 获取数据
        getData(){
            this.pageLoading= true;
            select_second_statistics({
                courseValue: this.courseValue
            }).then(res=>{
                let arr = [];
                if(res.gradeNumberVMs){
                    res.gradeNumberVMs.forEach((_s,s)=>{
                        if(res.gradeMap){
                            _s.children = res.gradeMap[_s.gradeId] || [];
                        }
                        arr.push(_s)
                    })
                }
                this.timeDate= arr;
                this.pageLoading= false;
            }).catch(err=>{
                this.pageLoading= false;
            })
        }
    }
}
</script>

<style>
.sl-timers .el-table__expanded-cell{
    padding-left: 10px;
    padding: 10px;
}
</style>
