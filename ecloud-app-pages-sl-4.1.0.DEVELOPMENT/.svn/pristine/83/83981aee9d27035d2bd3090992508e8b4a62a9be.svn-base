<template>
    <div class="sy-stuclass-index">
        <div class="stuclass-main">
            <div class="stuclass-tit">
                <img src="/common/images/shiyuelogo.png" class="stuclass-img"/>
                <div class="stuclass-titword">
                    <p>授课教师：赵老师</p>
                    <p>课堂名称：语文第一次答疑直播</p>
                    <p>当前在线人数：78人</p>
                </div>
            </div>
            <!-- 样式：看效果 -->
            <div class="stuclass-video"></div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {    
        }
    },
    created(){
        this.$parent.$emit('currentPage', '/sl/home/stutele');
    },
    methods: {
    }
}
</script>
<style scoped>
    ::-webkit-scrollbar{display:none;}
    .sy-stuclass-index{
        height: 100%;
        background-color: #FBFCFC;
        overflow-y: auto;
    }
    .stuclass-main{
        width:96%;
        margin:15px auto;
        border:1px solid #eee;
        background-color: #fff;
    }
    .stuclass-tit{
        padding:0 10% 0 13%;
        background-color:#eee;       
    }
    .stuclass-img{float:left;}
    .stuclass-titword{
        display:flex;
        justify-content: space-between;
        width: 90%;        
        line-height:40px;
        text-align: center;
    }
    .stuclass-titword p{width: 26%;}
    .stuclass-video{
        width:70%;
        height:500px;
        margin:20px auto;
        background-color:#333;
    }
</style>