<template>
    <sy-grad-4 :border="false">
        <div slot="headerRight">
            <div class="sy-row">
                <span class="sy-condition">
                    {{$store.state.lang.base.log.period}}：
                    <el-select v-model="period" @change="periodChange" class="sy-condition-width ">
                        <el-option v-for="item in periods" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </span>
                <span class="sy-condition">
                    {{$store.state.lang.base.log.userName}}：
                    <el-input v-model="name" size="small" 
                        :placeholder="$store.state.lang.base.log.info6" :maxlength="50" 
                        class="sy-condition-width "></el-input>
                </span>
                <span class="sy-condition" v-if="$route.path=='/base/operateLog'">
                    {{$store.state.lang.base.log.keyword}}：
                    <el-input v-model="keyword" size="small" 
                        :placeholder="$store.state.lang.base.log.info6" :maxlength="50" class="sy-condition-width "></el-input>
                </span>
                <span class="sy-condition">
                    {{$store.state.lang.base.log.state}}：
                    <el-select v-model="state" @change="stateChange" class="sy-condition-width ">
                        <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </span>
                <span class="sy-condition">
                    <el-button @click="search" size="small">{{$store.state.lang.base.log.search}}</el-button>
                </span>
            </div>
            <sy-dialog title="清除日志" :close-on-click-modal="false" position="middle" width="425px" height="200px" slide="fade" :visible.sync="deleteLogDialog">
                <div slot="body" style="padding:30px 10px 0;text-align:center;">
                    <span class="el-message-box__message fontRed" v-if="total>100000">{{$store.state.lang.base.log.info1}}</span>{{$store.state.lang.base.log.info2}}：
                    <el-select v-model="deletePeriod" class="sy-condition-width " style="width:205px;">
                        <el-option v-for="item in deletePeriods" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
                <div slot="footer">
                    <el-button type="" @click="deleteLogDialog = false" size="small">{{$store.state.lang.button.cancel}}</el-button>
                    <el-button type="primary" :loading="loadingBtn" @click="submitDialog">{{$store.state.lang.button.ok}}</el-button>
                </div>
            </sy-dialog>
        </div>
        <div slot="bodyRight">
            <div class="full-parent-height">
                <el-table :data="tableData" :empty-text="emptyText" border height="100%" style="width:100%;height:100%;">
                    <el-table-column v-for="item in appColumn" :key="item.prop" :label="$store.state.lang.base.log[item.prop]" :align="item.align" :width="item.width"  header-align="center">
                        <template scope="scope">
                            <span v-if="item.prop === 'logSuc'" :style="{color: scope.row[item.prop] === 2 ? '#FF4949' : ''}">
                                {{scope.row[item.prop] == 1 ? $store.state.lang.base.log.success : $store.state.lang.base.log.err}}
                            </span>
                            <span v-else>{{scope.row[item.prop]}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div slot="footer" style="line-height: 28px;padding-top: 5px;">
            <!-- <el-button type="danger" @click="clear" size="small">{{$store.state.lang.base.log.info3}}</el-button> -->
            <div style="float: right;">
                <el-pagination @current-change="handleCurrentChange" 
                    style="display: inline-block;padding: 0;"
                    :current-page="currentPage" :page-size="pageSize"  
                    layout="total, prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>
    </sy-grad-4>
</template>
<script>
import index from "./index.js";
export default {
  mixins: [index],
  name: "log"
};
</script>
<style tyle="text/css" scoped>
.box-header {
  text-align: left;
}

.sy-condition-width {
  width: 13%;
  padding-top: 5px;
}

.sy-condition-width .el-input,
.sy-condition-width .el-input__inner {
  width: 100%;
}
</style>

