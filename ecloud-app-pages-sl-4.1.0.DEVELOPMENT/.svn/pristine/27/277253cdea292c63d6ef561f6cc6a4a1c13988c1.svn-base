<template>
    <div class="sy-stuknow-index sy-stuknow-height">
        <div class="stuknow-tit">数学 第一课堂第一课</div>
        <div class="sy-stuknow-height stuknow-main">
            <div class="stuknoe-tabtit">
                <span @click="hadleClickOut(1)">录播课堂</span>
                <hr class="stuknow-hr"/>
                <span @click="hadleClickOut(2)">课后练习</span>
                <hr class="stuknow-hr"/>
                <span class="stuknow-choose">知识点微课</span>
                <hr class="stuknow-hr"/>
                <span @click="hadleClickOut(4)">错题巩固</span>
            </div>
            <!-- 录播课堂 -->
            <div class="stuknow-video">
                <div class="sy-stuknow-flex stuknow-top">
                    <!-- 视频 -->
                    <div class="sy-stuknow-height sy-stuknow-flex1" style="background-color: #000;"></div>
                    <!-- 列表 -->
                    <div class="sy-stuknow-height" :style="{width:widthValue+'px'}">
                        <div class="sy-stuknow-height sy-stuknow-i">
                            <i class="el-icon-arrow-right stuknow-i" :class="{'iocn-rotate-l': isRotate}" @click="handleListHide"></i>
                        </div>
                        <el-tree class="sy-stuknow-height stuknow-list" :data="data" :props="defaultProps" :isIcon="isShowTree"></el-tree>
                    </div>
                </div>
                <div>
                    <h3>我要评论</h3>
                    <el-input type="textarea" :rows="8" resize="none"></el-input>
                    <el-button class="stuknow-publish">发表</el-button>
                    <div class="stuknow-comment">
                        <div class="stuknow-comtit">
                            <h3 class="sy-stuknow-flex1">热门评论</h3>
                            <p class="stuknow-button stuknow-button1">时间</p>
                            <p class="stuknow-button stuknow-button2">热度</p>
                        </div>
                        <!-- 评论显示 -->
                        <div class="studet-dialog">
                            <!-- 头像 -->
                            <img src="/common/images/shiyuelogo.png" style="height:36px;"/>
                            <div class="studet-assess">
                                <p><span>英语老师</span>9天前</p>
                                <div>英语老师英语老师英语老师英语老师英语老师英语老师英语老师英语老师英语老师英语老师英语老师英语老师英语老师英语老师英语老师英语老师英语老师英语老师英语老师英语老师</div>
                                <!-- 点赞 转载 -->
                                <div>
                                    <i class="studet-raise">点赞</i>
                                    <i class="el-icon-share studet-share"></i>
                                </div>
                            </div>
                        </div>
                        <el-input class="stuknow-textarea" type="textarea" :rows="8" resize="none"></el-input>
                        <div class="sy-stuknow-flex studet-reply">
                            <p class="studet-look">表情</p>
                            <el-button class="studet-repbut" @click="hadleClickReply">回复</el-button>
                        </div>
                    </div>
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
            isShowTree: true,
            widthValue: 244,
            data: [{
                label: '第一章：极限与连续',
                children: [{
                    label: '第一课：极限的概念与基本性质',
                    children: [
                        {label: '第一课堂第一节课'},
                        {label: '第一课堂第二节课'}]
                },{
                    label: '第二课：连续',
                    children: [{label: '第二课堂第一节课'}]
                }]
            }, 
            {
                label: '第二章：函数',
                children: [{
                    label: '第一课：函数的概念',
                    children: [{label: '第一课堂第一节课'}]
                }]
            }],
            tableData:[{
                num:'1',
                content:'函数概念的基本性质——第一章第一节'
            },{
                num:'2',
                content:'函数概念的基本性质——第一章第一节'
            },{
                num:'3',
                content:'函数概念的基本性质——第一章第一节'
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    created () {
        this.$parent.$emit('currentPage', '/sl/home/stustudy')
    },
    methods: {
        // 列表的显示、隐藏
        handleListHide(){
            this.isShowTree = !this.isShowTree;
			this.isRotate = !this.isRotate;
			this.widthValue = this.isShowTree ? 244 : 16;
        },
        // tabs切换
        handleChangeDate(num){
            for(let key in this.show){
                this.show[key] = num == key ? true : false;
                this.showtab[key] = num == key ? false : true;
            }
        },
        // 跳转
        hadleClickOut(n){
            this.$router.push({path:'studet',query:{tab:n}})
        },
        // 回复
        hadleClickReply(){}
    }
}
</script>
<style scoped>
    /* 公共样式 */
    .sy-stuknow-height{height:100%;}
    .sy-stuknow-flex{
        display:flex;
        justify-content:space-between;
    }
    .sy-stuknow-flex1{flex:1;}
    .sy-stuknow-i{
        float:left;
        width:16px;
        cursor:pointer;
    }
    ::-webkit-scrollbar{display:none;}
    /* 样式 */
    .sy-stuknow-index{background-color: #FBFCFC;}
    .stuknow-tit{
        width:96%;
        margin:0 auto;
        line-height:40px;
        font-size:16px;
    }
    .stuknow-main{
        width:96%;
        margin:0 auto;
        padding:0 10px;       
    }
    .stuknoe-tabtit{
        padding-bottom:12px;
        font-size:16px;
    }
    .stuknow-hr{
        display:inline-block;
        width:100px;
        height:2px;
        border:0;
        background-color:#ccc
    }
    .stuknow-choose{
        font-size:22px;
        font-weight:400;
        color:#457CD6;
    }
    .stuknow-video{
        height:92%;
        overflow-y:auto;
    }
    .stuknow-top{height:500px;}
    .stuknow-list{box-sizing:border-box;}
    .stuknow-i{
        height:66px;
        line-height:66px;
        position:relative;
        top:46%;
        background-color:#457CD6;
        font-size:16px;
        color:#fff;
    }
    .stuknow-publish{
        float:right;
        margin-top:5px;
    }
    .stuknow-comment{
        width:100%;
        margin:38px auto;
        box-sizing: border-box;
        border:1px solid rgb(191, 198, 217);
        border-radius:3px;        
        padding-bottom:12px;
        background-color:#fff;
    }
    .stuknow-comtit{
        display:flex;
        justify-content:flex-end;       
        margin:0 2% 10px;
        border-bottom:1px solid rgb(191, 198, 217);
    }
    .stuknow-button{
        height:30px;     
        margin-top:9px;
        line-height:30px;
        border:1px solid #ccc;
        padding:0 15px;
        cursor:pointer;
    }
    .stuknow-button1{        
        border-right:0;
        border-radius:5px 0 0 5px;
        background-color:#457CD6;       
        color:#fff;
    }
    .stuknow-button2{
        border-radius:0 5px 5px 0;
        background-color:#fff;
    }
    .studet-dialog{
        display:flex;
        justify-content:flex-start;
        width:96%;
        margin:0 auto;        
        line-height:22px;
        font-size:14px;
    }
    .studet-assess{padding-left:10px;}
    .studet-assess p{padding:5px 0 10px;}
    .studet-assess span{
        color:#457CD6;
        padding-right:10px;
    }
    .studet-raise{color:#ccc;}
    .studet-share{
        color:#457CD6;
        padding:0 8px;
    }
    .stuknow-textarea{
        width:92%;
        margin:15px 4% 0;
    }
    .studet-reply{
        width:91.8%;
        margin:-4px auto 0;
        border: 1px solid rgb(191, 198, 217);
        border-top:0;
        border-radius: 4px;
        padding:10px 0 5px;       
    }
    .studet-look{margin:8px 0 0 10px;}
    .studet-repbut{margin-right:10px;}
</style>