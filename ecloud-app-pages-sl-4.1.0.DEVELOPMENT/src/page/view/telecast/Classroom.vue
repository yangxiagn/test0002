<template>
    <div class="sy-app-container">
        <sy-grad-4  v-if="$store.state.userType == 2">
            <div slot="headerRight" style="line-height:40px;">
                <el-button style="float: right;margin-top: 5px;" @click="$router.push({path: 'telecast'})">
                    {{$store.state.lang.button.back||'返回' }}
                </el-button>
                <el-tabs v-model="activeName" style="display: inline-block;" @tab-click="handleClick">
                    <el-tab-pane :label="$store.state.lang.edu.t112 ||'课堂设置'" name="first"></el-tab-pane>
                    <el-tab-pane :label="$store.state.lang.edu.t71 ||'直播统计'" name="second"></el-tab-pane>
                </el-tabs>
            </div>
            <div slot="bodyRight" style="padding: 10px;">
                <div v-if="activeName == 'first'">
                    <p>Unconnected third party</p>
                    <el-row>
                        <!-- <el-col :span="8">
                            <div class="tpl-sl-zbtitle">
                                <img :src="getUnitLogo" alt="头像"  :onerror="handleImgError">
                                授课教师： {{$store.state.realName}}
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="tpl-sl-zbtitle">
                                课堂名称：
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="tpl-sl-zbtitle">
                                当前在线人数：70
                            </div>
                        </el-col> -->
                    </el-row>
                    <!-- <video src="" class="tpl-video"></video> -->
                </div>
                <sys v-else :live-id="$route.query.id"></sys>
            </div>
        </sy-grad-4>
    </div>
</template>
<script>
import { showImgUrl } from "./request";
import sys from "./sys.vue";
export default {
    components: {
        sys
    },
    data() {
        return {    
            activeName: 'first',
            dialogFormVisible: false,
            form: {},
            showImgUrl: showImgUrl,
            getUnitLogo: ''
        }
    },
    created(){
        this.$parent.$emit('currentPage', '/sl/home/telecast');
        if(this.$store.state.avatar){
            this.getUnitLogo = showImgUrl + this.$store.state.avatar
        }else{
            this.getUnitLogo = '/common/images/base/user.png'
        }
    },
    methods: {
        handleImgError() {
            this.getUnitLogo = '/common/images/base/user.png';
        }
    }
}
</script>
<style scoped>
    .tpl-video{
        display: block;
        width: 100%;
        height: 600px;
        background-color: black;
        margin: 0 auto;
    }
    .tpl-sl-zbtitle{
        text-align: center;
        line-height: 60px;
        background-color: #f5f7fa;
        padding: 10px 0;
    }
    .tpl-sl-zbtitle>img{
        height: 60px;
        width: 60px;
        vertical-align: middle;
        border-radius: 50%;
        margin-right: 10px;
    }
</style>