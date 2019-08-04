<template>
    <div class="app-container-box">
        <div class="app-container-box-center">
            <span>{{msg}} , {{name}} !</span>
            <p>您没有该权限访问当前网页，请更换地址浏览或者联系管理员！
                <a href="/desktop">个人桌面</a>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'hello',
        data () {
            return {
                msg: new Date().getHours() < 12 ? '早上好' : '下午好',
                name: this.$store.state.realName || ''
            }
        }
    }
</script>
<style scoped>
    div{
        line-height: 36px;
        font-size: 14px;
    }
    .app-container-box-center>span{

    }
</style>
