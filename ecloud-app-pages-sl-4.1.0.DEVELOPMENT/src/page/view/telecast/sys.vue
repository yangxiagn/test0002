<template>
    <div class="sy-app-container tpl-sl-anaslys" style="overflow: auto;">
        <h3 class="center sy-theme-extraLightGray">{{$store.state.realName}}{{$store.state.lang.edu.t106 || '老师直播课堂上课情况统计'}}</h3>
        <el-tabs v-model="activeTabName" @tab-click="handleClick">
            <el-tab-pane v-for="item in tableData" :key="item.liveId"
                :label="item.title" :name="item.liveId"></el-tab-pane>
        </el-tabs>
        <div class="tpl-sl-anaslys-box">
            <div class="tpl-sl-anaslys-btns">
                <el-button>{{$store.state.lang.edu.t107 || "导出"}}</el-button>
                <!-- <el-button>返回</el-button> -->
            </div>
            <div class="tpl-sl-anaslys-tab center">
                <el-radio-group size="small" v-model="activeTypeName"  @change="handleTypeClick">
                    <el-radio-button label="1">{{$store.state.lang.edu.t108 || '已学习'}}</el-radio-button>
                    <el-radio-button label="0">{{$store.state.lang.edu.t109 || '未学习'}}</el-radio-button>
                </el-radio-group>
            </div>
            <el-table :data="sysTableData" border tooltip-effect="dark">
                <el-table-column prop="number1" :label="$store.state.lang.edu.t110 || '学号'" align="center"></el-table-column>
                <el-table-column prop="name1" :label="$store.state.lang.edu.t111 || '学生姓名'" align="center"></el-table-column>
                <el-table-column prop="number2" :label="$store.state.lang.edu.t110 || '学号'" align="center"></el-table-column>
                <el-table-column prop="name2" :label="$store.state.lang.edu.t111 || '学生姓名'" align="center"></el-table-column>
                <el-table-column prop="number3" :label="$store.state.lang.edu.t110 || '学号'" width="" align="center"></el-table-column>
                <el-table-column prop="name3" :label="$store.state.lang.edu.t111 || '学生姓名'" align="center"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { getList, find_situation_by_status } from "./request.js";
export default {
    props: {
        liveId: {
            type: String,
            default: ''
        },
        zbList: {
            type: Array,
            default: ()=>{
                return []
            }
        }
    },
    data(){
        return {
            activeTabName: '1',
            activeTypeName: '1',
            sysTableData: [],
            tableData: []
        }
    },
    watch: {
        activeTabName(val){
            this.sysTableData= [];
            this.getStudent();
        }
    },
    created(){
        this.init();
    },
    methods: {
        init(){
            this.refreshData();
        },
        refreshData(){
            getList({
                start: 1,
                size: 5
            }).then(res=>{
                let arr = [];
                if(res.list){
                    res.list.forEach((_s,s)=>{
                        if(this.liveId){
                            if(_s.liveId == this.liveId){
                                arr.push(_s)
                            }
                        }else{
                            arr.push(_s)
                        }
                    })
                }
                this.tableData = arr;
                this.activeTabName = this.tableData.length > 0 ? this.tableData[0].liveId : '';
            }).catch(err=>{
                
            })
        },
        // 查询学生
        getStudent(){
            find_situation_by_status({
                start: 1,
                size: 10000,
                liveId: this.activeTabName,
                status: this.activeTypeName
            }).then(res=>{
                let num = 1;
                let arr = [];
                if(res){
                    let obj = {};
                    res.forEach((_s,s)=>{
                        obj[`number${num}`] = _s.number;
                        obj[`name${num}`] = _s.name;
                        num++;
                        if(num == 4){
                            arr.push(obj);
                            obj = {};
                            num = 1;
                        }
                        if(s == res.length-1 && num != 4 && obj.number1){
                            arr.push(obj);
                        }
                    })
                }
                this.sysTableData = arr;
            })
        },
        handleClick(tab,event){
            this.activeTabName = tab.name;
        },
        handleTypeClick(val){
            this.activeTypeName = val;
            this.sysTableData= [];
            this.getStudent();
        }
    }
}
</script>

<style>

</style>
