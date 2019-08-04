<template>
    <div class="sy-app-container">
        <sy-grad-4>
            <div slot="headerRight" style="line-height:48px;">
                <span class="tele-span">{{$store.state.lang.sls.t14||'直播列表'}}</span>
            </div>
            <div slot="bodyRight" style="padding: 10px;">
                <el-table :data="tableData" border tooltip-effect="dark" :empty-text="emptyText" height="100%" style="height: 100%;">
                    <el-table-column type="index" 
                        :label="$store.state.lang.edu.t37||'序号'" width="50" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="title" 
                        :label="$store.state.lang.edu.t72||'课堂名称'" align="center"></el-table-column>
                    <el-table-column prop="courseName" 
                        :label="$store.state.lang.edu.t73||'直播学科'" width="90" align="center"></el-table-column>
                    <el-table-column prop="gradeName" 
                        :label="$store.state.lang.edu.t74||'年级班级'" align="left" header-align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="startTime" 
                        :label="$store.state.lang.edu.t75||'直播开始时间'" align="center"></el-table-column>
                    <el-table-column prop="operate" 
                        :label="$store.state.lang.base.ctr||'操作'" width="66" align="center">
                        <template scope="scope">
                            <el-button :disabled="scope.row.liveDateType == 0" type="text" 
                            size="small" @click="enterMsg(scope.row.id)">{{$store.state.lang.edu.t76||"直播"}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer" class="right">
                <el-pagination
                    @current-change="handleCurrentChange"
                    style="display: inline-block;padding: 0;padding-top: 5px;"
                    :current-page.sync="start"
                    :page-size="size"
                    layout="total, prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>
        </sy-grad-4>
    </div>
</template>
<script>
import { getList } from "./request.js";
export default {
    data() {
        return {    
            tableData:[],
            size: 30,
            dialogFormVisible: false,
            form: '',
            formLabelWidth: '100px',
            value1: '',
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            start: 1,
            total: 0,
        }
    },
    created(){
        this.$parent.$emit('currentPage', '/sl/home/stutele');
        this.init();
    },
    methods: {
        init(){
            this.refresh();
        },
        handleCurrentChange(val){
            this.start = val;
            this.refresh();
        },
        refresh(){
            getList({
                start: this.start,
                size: this.size
            }).then(res=>{
                this.tableData = res.list || [];
                this.total = res.total;
            })
        },
        // 跳转“视频”
        enterMsg(){
            this.$router.push({path:'stuclass'});
        },
    }
}
</script>
<style scoped>
    ::-webkit-scrollbar{display:none;}
    .tele-span{
        border-bottom:3px solid #457CD6;
        padding: 5px 10px;
    }
    .tele-button{
        float:right;
        margin-top:6px;
    }
    .tele-table{
        width:100%;
        height:94%;       
        margin:2% 0 4%;
        overflow-y:auto;
    }
</style>