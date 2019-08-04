<template>
    <div class="sy-hw-time-r" :class="[className]" :style="{width: width,height: height, 'line-height': height}">
        <span :class="[titleClass]">{{text}}</span>
        <span :style="{color: color}" :class="[timeClass]">{{formatNumber(hours)}} : {{formatNumber(minit)}} : {{formatNumber(number)}}</span>
    </div>
</template>
<script>
export default {
    props: {
        text: {
            type: String,
            default: '剩余时间：'
        },
        width: {
            type: String,
            default: '150px'
        },
        time: {
            type: Number,
            default: 0
        },
        height: {
            type: String,
            default: '40px'
        },
        className: {
            type: String,
            default: ''
        },
        titleClass: {
            type: String,
            default: ''
        },
        timeClass: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            number: '00',
            step: 1,
            color: '#fff',
            timer: null,
            minit: this.formatNumber(this.time),
            hours: 0
        }
    },
    created(){
        this.init();
    },
    methods: {
        formatNumber(n){
            return n<10 && n>=0 ? `0${ parseInt(n) }` : parseInt(n)
        },
        init(){
            this.timer = null;
            this.number = parseInt(this.time%60) || 59; // 秒
            this.minit = parseInt(parseInt(this.time/60)%60); // 分
            this.hours = parseInt(parseInt(this.time/60)/60); // 时
            this.start();
        },
        start(){
            if(this.minit == 0){
                if(this.hours == 0){

                }else{
                    this.hours--;
                    this.minit = 59;
                }
            }else{
                this.minit--;
            }
            let _this = this;
            this.timer = setInterval(function(){ 
                _this.number--;
                if(_this.number == 0){
                    if(_this.time > 0){
                        _this.minit--;
                    }
                }
                if(_this.minit == 0){
                    if(_this.hours > 0){
                        _this.hours--;
                        _this.minit= 59;
                    }
                    if(_this.number == 0 && _this.minit == 0  && _this.hours == 0){
                        _this.color = '#FF4949';
                        clearInterval(_this.timer);
                        _this.zeroIterval();
                        return
                    }
                }
                if(_this.number == 0){
                    _this.number = 59;
                }
            },1000);
        },
        zeroIterval(){
            let num = 59;
            let _this = this;
            let timer = setInterval(function(){ 
                num--;
                _this.number = num;
                if(num == 0){
                    clearInterval(timer);
                    _this._callback();
                }
            },1000);
        },
        _callback(){
            this.$emit('time-change', 0)
        }
    }
}
</script>
<style scoped>
.sy-hw-time-r{
    display: inline-block;
    min-width: 150px;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    text-align: center;
    box-sizing: border-box;
    color: #fff;
    background-color: #008000;
    margin: 0 -3px;
    padding: 0;
}
</style>