<template>
    <div class="sy-pardet-index sy-pardet-height">
        <p class="sy-pardet-wid pardet-tit">数学 第一课堂第一课</p>
        <div class="sy-pardet-wid sy-pardet-height pardet-main">
            <div class="sy-pardet-pointer pardet-tabtit">
                <span :class="{'pardet-choose': show.show1}" @click="handleChangeDate('1')">录播课堂</span>
                <hr class="pardet-hr"/>
                <span :class="{'pardet-choose': show.show2}" @click="handleChangeDate('2')">课后练习</span>
            </div>
            <!-- 录播课堂 -->
            <div :class="{'pardet-none': showtab.showtab1}" class="pardet-video">
                <div class="sy-pardet-flex" style="height:500px;">
                    <div class="sy-pardet-height sy-pardet-flex1" style="background-color: #000;"></div>
                    <!-- 列表 -->
                    <div class="sy-pardet-height sy-pardet-list" :style="{width:widthValue1+'px'}">
                        <div class="sy-pardet-height sy-pardet-pointer pardet-shrink">
                            <i class="el-icon-arrow-right pardet-i" :class="{'iocn-rotate-l': isRotate}" @click="handleListHide(1)"></i>
                        </div>
                        <el-tree class="sy-pardet-height sy-pardet-boxsize" :data="treedata" :props="defaultProps" :isIcon="isShowTree1"></el-tree>
                    </div>
                </div>
                <div>
                    <h3>我要评论</h3>
                    <el-input type="textarea" :rows="8" resize="none"></el-input>
                    <el-button class="pardet-publish" @click="handleClickPublish">发表</el-button>
                    <div class="sy-pardet-boxsize pardet-comment">
                        <div class="pardet-comtit">
                            <h3 class="sy-pardet-flex1">热门评论</h3>
                            <p class="sy-pardet-pointer pardet-button pardet-button1" @click="handleSortTime">时间</p>
                            <p class="sy-pardet-pointer pardet-button pardet-button2" @click="handleSortHeat">热度</p>
                        </div>
                        <!-- 评论显示 -->
                        <div class="sy-pardet-wid pardet-dialog">
                            <!-- 头像 -->
                            <img src="/common/images/shiyuelogo.png" style="height:36px;"/>
                            <div class="pardet-assess">
                                <p><span>英语老师</span>9天前</p>
                                <div>英语老师英语老师英语老师英语老师英语老师英语老师英语老师英语老师英语老师英语老师英语老师英语老师英语老师英语老师英语老师</div>
                                <!-- 点赞 转载 -->
                                <div>
                                    <i class="pardet-raise">点赞</i>
                                    <i class="el-icon-share pardet-share"></i>
                                </div>
                            </div>
                        </div>
                        <el-input class="pardet-textarea" type="textarea" :rows="8" resize="none"></el-input>
                        <div class="sy-pardet-flex pardet-reply">
                            <p class="pardet-look">表情</p>
                            <el-button class="pardet-repbut" @click="hadleClickReply">回复</el-button>
                        </div>
                    </div>
                </div>
            </div>    
            <!-- 课后作业 -->
            <div class="sy-pardet-flex pardet-work" :class="{'pardet-none': showtab.showtab2}">
                <!-- 作业 -->
                <div class="sy-pardet-height sy-pardet-flex1" style="overflow-y:auto;"></div>
                <!-- 列表 -->
                <div class="sy-pardet-list" :style="{width:widthValue2+'px'}">
                    <div class="sy-pardet-height pardet-shrink">
                        <i class="el-icon-arrow-right pardet-i" :class="{'iocn-rotate-l': isRotate}" @click="handleListHide(2)"></i>
                    </div>
                    <el-tree class="sy-pardet-height sy-pardet-boxsize" :data="treedata" :props="defaultProps" :isIcon="isShowTree2"></el-tree>
                </div>
            </div>      
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isRotate: false,
            isShowTree1: true,
            widthValue1: 244,
            isShowTree2: true,
            widthValue2: 244,
            show: { //tab按钮,true选中,false未选中
                show1:true,
                show2:false
            },
            showtab: { //tab内容,false显示,true隐藏
                showtab1: false,
                showtab2: true
            },
            treedata: [{
                label: '第一章：极限与连续',
                children: [{
                    label: '第一课：极限的概念与基本性质',
                    children: [
                        {label: '第一课堂第一节课'},
                        {label: '第一课堂第二节课'}]
                },{
                    label: '第二课：连续',
                    children: [
                        {label: '第二课堂第一节课'}]
                }]
            }, {
                label: '第二章：函数',
                children: [{
                    label: '第一课：函数的概念',
                    children: [
                        {label: '第一课堂第一节课'}]
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    created () {
        let num=this.$route.query.tab;
        this.tabs(num);
        this.$parent.$emit('currentPage', '/sl/home/parstudy')
    },
    methods: {
        tabs(num){
            if(num==1){
                this.show.show1=this.showtab.showtab2=true;
                this.show.show2=this.showtab.showtab1=false;
            }else{
                this.show.show1=this.showtab.showtab2=false;
                this.show.show2=this.showtab.showtab1=true;               
            }
        },
        // 列表的显示、隐藏
        handleListHide(num){
            this.isRotate = !this.isRotate;
            if(num==1){
                this.isShowTree1 = !this.isShowTree1;              
                this.widthValue1 = this.isShowTree1 ? 244 : 16;
            }else{
                this.isShowTree2 = !this.isShowTree2;
                this.widthValue2 = this.isShowTree2 ? 244 : 16;
            }
        },
        // tabs切换
        handleChangeDate(num){
            this.tabs(num);
        },
        // 发表
        handleClickPublish(){},
        // 评论按时间排序
        handleSortTime(){},
        // 评论按热度排序
        handleSortHeat(){},
        // 回复
        hadleClickReply(){}
    }
}
</script>
<style scoped>
    /* 公共样式 */
    .sy-pardet-wid{
        width:96%;
        margin:0 auto;
    }
    .sy-pardet-height{height:100%;}
    .sy-pardet-flex{
        display:flex;
        justify-content:space-between;
    }
    .sy-pardet-flex1{flex: 1;}
    .sy-pardet-list{
        overflow-x: hidden;
        overflow-y:auto;
    }
    .sy-pardet-boxsize{box-sizing:border-box;}
    .sy-pardet-pointer{cursor:pointer;}
    /* 样式 */
    ::-webkit-scrollbar{display:none;}
    .sy-pardet-index{background-color: #FBFCFC;}
    .pardet-tit{
        line-height:40px;
        font-size:16px;
    }
    .pardet-main{padding:0 10px;}
    .pardet-tabtit{
        padding-bottom:12px;
        font-size:16px;
    }
    .pardet-choose{
        font-size:22px;
        font-weight:400;
        color:#457CD6;
    }
    .pardet-hr{
        display:inline-block;
        width:100px;
        height:2px;
        border:0;
        background-color:#ccc;
    }
    .pardet-none{display: none;}
    .pardet-video{
        height:92%;
        overflow-y:auto;
    }
    .pardet-i{
        height:66px;
        line-height:66px;
        background-color:#457CD6;
        position:relative;
        top:46%;
        font-size:16px;
        color:#fff;
    }
    .pardet-shrink{
        float:left;
        width:16px;
    }
    .pardet-comment{
        width:100%;
        margin:38px auto;
        padding-bottom:12px;
        border:1px solid rgb(191, 198, 217);
        border-radius:3px;
        background-color:#fff;       
    }
    .pardet-publish{
        float:right;
        margin-top:5px;
    }
    .pardet-comtit{
        display:flex;
        justify-content:flex-end;
        margin:0 2% 10px;
        border-bottom:1px solid rgb(191, 198, 217);
    }
    .pardet-button{
        height:30px;
        margin-top:9px;
        border:1px solid #ccc;
        padding:0 15px;
        line-height:30px;   
    }
    .pardet-button1{
        border-right:0;
        border-radius:5px 0 0 5px;
        background-color:#457CD6;
        color:#fff;
    }
    .pardet-button2{
        border-radius:0 5px 5px 0;
        background-color:#fff;
    }
    .pardet-dialog{
        display:flex;
        justify-content:flex-start;
        line-height:22px;
        font-size:14px;
    }
    .pardet-assess{padding-left:10px;}
    .pardet-assess p{padding:5px 0 10px;}
    .pardet-assess span{
        padding-right:10px;
        color:#457CD6;
    }
    .pardet-raise{color:#ccc;}
    .pardet-share{
        padding:0 8px;
        color:#457CD6;       
    }
    .pardet-textarea{
        width:92%;
        margin:15px 4% 0;
    }   
    .pardet-reply{
        width:91.8%;
        margin:-4px auto 0;
        border: 1px solid rgb(191, 198, 217);
        border-top:0;
        border-radius: 4px;
        padding:10px 0 5px;        
    }
    .pardet-look{margin:8px 0 0 10px;}
    .pardet-repbut{margin-right:10px;}
    .pardet-work{
        height:87%;
        background-color:#fff;
    }
</style>