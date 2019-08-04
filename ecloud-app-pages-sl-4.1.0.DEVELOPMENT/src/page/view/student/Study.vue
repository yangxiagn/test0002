<template>
    <div class="sy-app-container">
        <sy-grad-4>
            <div slot="headerRight" style="line-height:48px;">
                <span class="tele-span">{{$store.state.lang.sl.t3||'我的收藏'}}</span>
            </div>
            <div slot="bodyRight" style="padding: 10px;">
                <el-table :data="tableData" border tooltip-effect="dark" :empty-text="emptyText" height="100%" style="height: 100%;">
                    <el-table-column type="index" 
                        :label="$store.state.lang.edu.t37||'序号'" width="50" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="resName" 
                        :label="$store.state.lang.edu.t67||'资源名称'" align="center"></el-table-column>
                    <el-table-column prop="gradeName" 
                        :label="$store.state.lang.edu.t31||'年级'" align="center"></el-table-column>
                    <el-table-column prop="courseName" 
                        :label="$store.state.lang.hw.t23||'学科'" align="center"></el-table-column>
                    <el-table-column prop="authName" 
                        :label="$store.state.lang.rc.t47||'上传人'" align="center"></el-table-column>
                    <el-table-column prop="createTime" 
                        :label="$store.state.lang.edu.t31||'收藏日期'" align="center"></el-table-column>
                    <el-table-column prop="operate" 
                        :label="$store.state.lang.base.ctr||'操作'" width="66" align="center">
                        <template scope="scope">
                            <el-button type="text" size="small" @click="handleDelete('one',scope.row.id)">
                                {{$store.state.lang.button.delete||'删除'}}
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer">
                <el-button type="danger" size="small" @click="handleDelete('all')">{{$store.state.lang.sls.t16||'全部删除'}}</el-button>
            </div>
        </sy-grad-4>
    </div>
</template>
<script>
import { getSelectCollect,deleteCollect } from "./request.js";
export default {
    data() {
        return {    
            tableData:[],
            dialogFormVisible: false,
            form: '',
            formLabelWidth: '100px',
            value1: '',
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
        }
    },
    created(){
        this.$parent.$emit('currentPage', '/sl/home/stustudy');
        this.init();
    },
    methods: {
        init(){
            this.getList();
        },
        // 查询列表
        getList(){
            getSelectCollect().then(res=>{
                console.log(res);
                this.tableData = res || [];
            })
        },
        handleDelete(t, id){
            let ids = [];
            if(t == 'all'){
                this.tableData.forEach((_s,s)=>{
                    ids.push(_s.id)
                })
            }else{
                ids.push(id)
            }
            this.$confirm(t == 'all' ? '是否继续删除所有收藏?' : '是否继续删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteCollect(ids.join(',')).then(res=>{
                    this.$notify({
                        title: '成功',
                        message: '删除成功！',
                        type: 'success'
                    });
                    this.getList();
                })
            }).catch(() => {
                         
            });
        }
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