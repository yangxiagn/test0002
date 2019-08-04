<template>
    <div class="center sy-app-container" style="background: #007AC1;color: #fff;">
        <h1 v-if="showImage" style="font-size:150px;margin: 100px 0 5px;">404</h1>
        <img v-else style="font-size:150px;margin: 30px 0 0px;width: 50%;" src="/common/images/404.png" @onerror="handleError" alt="">
        <!-- <p style="font-size:18px;padding-left: 180px;">Oops! The page you were looking for does not exist.</p> -->
        <div style="padding: 60px 35px 35px 200px;">
            <el-button style="padding: 10px 30px;font-size: 16px;" @click="go" icon="arrow-left">返回个人桌面</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            showImage: false
        }
    },
    methods: {
        handleError(){
            this.showImage = true;
        },
        go(){
            location.href = '/desktop';
        }
    }
}
</script>

<style>

</style>
