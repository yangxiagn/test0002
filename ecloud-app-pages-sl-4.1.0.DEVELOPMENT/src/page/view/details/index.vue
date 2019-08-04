<template>
    <div class="sy-app-container sy-sl-student-details" style="overflow: auto;">
        <h2 class="center sy-theme-lightBackground" 
            style="margin: 10px auto;line-height: 40px;max-width: 1366px;">
            {{name}}
            <el-button style="float:right;margin-top: 6px;" type="" @click="handleBack">
                {{$store.state.lang.button.back || "返回"}}
            </el-button>
        </h2>
        <!-- <p class="center">第一课堂第一课</p> -->
        <ul class="center tpl-sl-details">
            <li :style="{'font-size': active.lbkc ? '22px' : '16px', color: active.lbkc ? '#13CE66' : '#666'}" @click="handleChange('lbkc')">
                <i class="fa fa-video-camera" aria-hidden="true"></i>
                <span>{{$store.state.lang.edu.t32 || '录播课堂'}}</span>
            </li>
            <li>
                <hr>
            </li>
            <li :style="{'font-size': active.khlx ? '22px' : '16px', color: active.khlx ? '#13CE66' : '#666'}" @click="handleChange('khlx')">
                <i class="fa fa-wpforms" aria-hidden="true"></i>
                <span>{{$store.state.lang.edu.t33 || "课后练习"}}</span>
            </li>
            <li>
                <hr>
            </li>
            <li :style="{'font-size': active.zsdwk ? '22px' : '16px', color: active.zsdwk ? '#13CE66' : '#666'}" @click="handleChange('zsdwk')">
                <i class="fa fa-life-ring" aria-hidden="true"></i>
                <span>{{$store.state.lang.edu.t34 || "知识点微课"}}</span>
            </li>
            <li>
                <hr>
            </li>
            <li :style="{'font-size': active.ctgg ? '22px' : '16px', color: active.ctgg ? '#13CE66' : '#666'}" @click="handleChange('ctgg')">
                <i class="fa fa-calendar-times-o" aria-hidden="true"></i>
                <span>{{$store.state.lang.edu.t35 || "错题巩固"}}</span>
            </li>
        </ul>
        <div>
            <lbkc v-if="active.lbkc"></lbkc>
            <khlx v-if="active.khlx"></khlx>
            <zbwk v-if="active.zsdwk"></zbwk>
            <error v-if="active.ctgg"></error>
        </div>
        <div class="goTop4 sy-theme-background" v-show="isShowTopBtn" @click="backTop" 
            :title="$store.state.lang.edu.t36 || '返回顶部'">
            <span class="el-icon-arrow-up"></span>
        </div>
    </div>
</template>
<script>
import lbkc from "./lbkc.vue";
import khlx from "./khlx.vue";
import zbwk from "./zsdwk.vue";
import error from "./error.vue";
export default {
    components: {
        lbkc,
        khlx,
        zbwk,
        error
    },
    data() {
        return {
            isShowTopBtn: false,
            name: '',
            active: {
                lbkc: false,
                khlx: false,
                zsdwk: false,
                ctgg: false
            },
            data: {},
            catalogTreeData: []
        }
    },
    created () {
        this.$parent.$emit('currentPage', '/sl/home/stustudy');
        this.init();
    },
    methods: {
        init(){
            let obj = JSON.parse( window.sessionStorage.getItem('_course_data'));
            this.data = obj || {};
            this.name = obj.courseName;
            if(this.$route.query.key){
                this.active[this.$route.query.key] = true;
            }else{
                this.active.lbkc = true;
            }
        },
        handleBack(){
            // history.go(-1);
            if(this.$route.query.type == 'stu'){
                this.$router.push('/sl/home/stuhome')
            }else{
                this.$router.push('/sl/home/stuhome')
            }
        },
        // 切换
        handleChange(t){
            for(let key in this.active){
                if(key == t){
                    this.active[key] = true;
                    this.$router.push({path: '/sl/details', query: {...this.$route.query, key: key}})
                }else{
                    this.active[key] = false;
                }
            }
        },
        // 返回顶部
        backTop(){
            if(!this.$el){return}
            this.$scrollTo(this.$el, 0);
        },
    },
    mounted() {
        if(!this.$el){return}
        this.$el.onscroll = () => {
            if (this.$el.scrollTop > 10) {
                this.isShowTopBtn = true;
            } else {
                this.isShowTopBtn = false;
            }
        }
    }
}
</script>
<style scoped>
    .tpl-sl-details{
        padding: 10px 0;
        max-width: 1366px;
        margin: 0 auto;
    }
    .tpl-sl-details>li{
        display: inline-block;
        font-size: 16px;
        width: 150px;
        line-height: 32px;
        vertical-align: middle;
        cursor: pointer;
    }
    .tpl-sl-details>li:hover{
        color: #13CE66;
    }
    .goTop4 {
        position: fixed;
        height: 40px;
        width: 40px;
        bottom: 60px;
        right: 10px;
        color: #fff;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        cursor: pointer;
    }
</style>