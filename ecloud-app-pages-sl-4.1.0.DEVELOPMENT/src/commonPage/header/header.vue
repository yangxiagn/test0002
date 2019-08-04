<template>
    <div class="sy-header-nav">
        <div class="sy-header-nav" :style="{width: fixedWidth}">
            <div class="sy-header-nav-left">
                <img :src="getUnitLogo" :onerror="handleImgError"/>
                <span class="sy-header-nav-title">{{title}}</span>
            </div>
            <div class="sy-header-nav-right">
                <img v-if="type == 'platform'" src="/common/images/base/header.png"/>
                <div class="sy-header-btn-box">
                    <span v-if="type == 'platform'">{{$store.state.lang.header.welcome + (userName ? (',' + userName) : userName) + '!'}}</span>
                    <span :title="$store.state.lang.header.back">
                        <i style="color:#fff;" class="fa fa-university" @click="handleBack"></i>
                    </span>
                    <span v-if="$slots.back">
                        <slot name="back"></slot>
                    </span>
                    <span :title="$store.state.lang.header.skin"><i style="color:#fff;" class="fa fa-television" aria-hidden="true" @click="open('theme')"></i></span>
                    <span :title="$store.state.lang.header.about"><i style="color:#fff;" class="fa fa-exclamation-circle fa-rotate-180" @click="aboutDialog=true"></i></span>
                    <span :title="$store.state.lang.header.logout"><i style="color:#fff;" class="fa fa-power-off" aria-hidden="true" @click="open('logout')"></i></span>
                    <span v-if="env" title="开发端口" @click="open('host')">
                        <i class="fa fa-connectdevelop" aria-hidden="true"></i>
                    </span>
                    <span v-if="env" title="中英文对照" @click="open('lang')">
                        <i class="fa fa-american-sign-language-interpreting" aria-hidden="true"></i>
                    </span>
                    <span :title="isfullscreen ? $store.state.lang.header.exit : $store.state.lang.header.enter" @click="open('full')" class="sy-header-fullscreen">
                        <i style="color:#fff;font-size: 24px;position:relative;top: 3px;" :class="'mdi mdi-fullscreen' + (isfullscreen ? '-exit' : '')"></i>
                    </span>
                    <br>
                    <el-dropdown @command="handleCommand" v-show="langList.length == 2" trigger="click" style="color: #fff;margin-right: 8px;">
                        <span class="el-dropdown-link">
                            {{getLangName(lang)}} <i class="fa fa-sort-desc"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item style="font-size: 12px;line-height: 28px;" v-for="row in langList" :key="row.value" :command="row.value">{{row.name}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <div v-if="$slots.body" class="sy-header-nav-center">
                <slot name="body"></slot>
            </div>
        </div>
        <!-- 开发端口 -->
        <el-dialog title="开发端口" :visible.sync="dialogFormVisible" size="tiny">
            <div>
                <el-input placeholder="请输入地址" @keyup.enter.native="changeHost" v-model="inputHost"></el-input>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeHost">确 定</el-button>
            </div>
        </el-dialog>
        <sy-dialog v-if="env" title="中英文对照表查询"
            position="right"
            height="100%"
            width="50%"
            slide="right"
            :visible.sync="langModelDialog">
            <div slot="body" style="padding:10px 20px;overflow: auto;">
                <pre>{{$store.state.lang}}</pre>
            </div>
            <div slot="footer" class="right">
                <el-button @click="langModelDialog = false">关闭</el-button>
            </div>
        </sy-dialog>
        <!-- 关于 -->
        <el-dialog :title="$store.state.lang.header.about" :visible.sync="aboutDialog" size="tiny">
            <div class="sy-about-top">
                <img class="sy-about-logo" src="/common/images/aboutLogo.png">
                <span class="sy-about-logo-text">{{$store.state.lang.header.name}}</span>
            </div>
            <div class="sy-about-cont">
                <el-row style="line-height:28px;">
                    <el-col :span="8" class="right">{{$store.state.lang.header.pmodule}}：</el-col>
                    <el-col :span="16">{{versionList[versionList.length-1].model}}</el-col>
                    <el-col :span="8" class="right">{{$store.state.lang.header.version}}：</el-col>
                    <el-col :span="16">{{versionList[versionList.length-1].version}}</el-col>
                    <el-col :span="8" class="right">{{$store.state.lang.header.desc}}：</el-col>
                    <el-col :span="16">
                        <div v-for="(o , index) in versionList[versionList.length-1].metto" :key="'metto_'+index">{{index*1+1}}.{{o}}；</div>
                    </el-col>
                </el-row>
            </div>
            <div class="sy-about-foot">
                <div>{{$store.state.lang.header.name}}</div>
                <div>{{$store.state.lang.header.copyright}}</div>
            </div>
        </el-dialog>
        <!-- 主题设置 -->
        <sy-dialog
            :title="$store.state.lang.header.theme"
            :close-on-click-modal="false"
            position="middle"
            height="auto"
            width="550px"
            slide="fade"
            :visible.sync="themeModelDialog">
            <div slot="body" style="padding:10px 20px;">
                <div class="sy-sy-theme-row">
                    <p>{{$store.state.lang.header.systheme}}</p>
                    <ul class="sy-parmary-color">
                        <li v-for="c in themeColorList" :key="c.color" @click="changeThemeColor(c.color)">
                            <i :style="{background:c.color}"></i>
                            <p class="center">{{c[lang]}}</p>
                        </li>
                        <li>
                            <sy-color-picker class="color-other" defaultColor="#20a0ff" v-model="currentColor" @change="handleChange"></sy-color-picker>
                            <p class="center">{{$store.state.lang.header.other}}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </sy-dialog>
    </div>
</template>

<script>
    import header from './header.js';
    import './style.css';
    export default {
        mixins: [header],
        props: {
            fixedWidth: {
                type: String,
                default: '100%'  // 头部固定宽度
            },
            versionList: {
                type: Array,
                default: () => {
                    return [{
                        version: '4.0.0',
                        model: '基础平台',
                        metto: ['本版本中进行了页面扁平化的设计，在用户体验和流程上进行了大的优化，性能大大提升']
                    }]
                }
            },
            type: {
                type: String,
                default: 'platform'  // desktop platform
            },
            title: {
                type: String,
                default: ''
            },
            back: {
                type: String,
                default: '/'
            },
            name: {
                type: String,
                default: ''
            },
            lang: {
                type: String,
                default: 'zh-CN'
            },
            langList: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        data(){
            return {
                
            }
        },
        methods: {
            getLangName(value){
                let name = '';
                this.langList.forEach(a => {
                    if(a.value == value){
                        name = a.name
                    }
                });
                return this.lang == 'zh-CN' ? 'Language' : '语言'
            },
            handleCommand(command) {
                this.lang = command;
                this.handleChangeLange(this.lang);
            },
            handleImgError() {
                this.getUnitLogo = '/common/images/shiyuelogo.png';
            }
        }
    }
</script>
<style scoped>
    .sy-header-nav {
        position: relative;
        margin: 0 auto;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
    }

    .sy-header-nav-title {
        color: #fff;
        text-shadow: 3px 2px 2px rgba(26, 80, 154, .6);
    }

    .sy-header-nav-left {
        float: left;
        height: 100%;
        line-height: 60px;
        min-width: 250px;
        text-align: left;
        box-sizing: border-box;
        padding: 0 20px;
    }

    .sy-header-nav-left>img {
        height: 40px;
        width: 40px;
        background-color: #fff;
        vertical-align: middle;
        display: inline-block;
        border-radius: 50%;
        position: relative;
        top: -4px;
    }

    .sy-header-nav-left span {
        font-size: 22px;
        padding-left: 10px;
    }

    .sy-header-nav-center {
        height: 40px;
        width: 100%;
        position: relative;
        box-sizing: border-box;
        text-align: right;
    }

    .sy-header-nav .sy-header-nav-right {
        float: right;
        right: 0;
        height: 100%;
        min-width: 250px;
        padding: 0 20px;
        box-sizing: border-box;
        text-align: right;
        position: relative;
        z-index: 1000;
    }

    .sy-header-nav .sy-header-nav-right img {
        vertical-align: top;
        height: 60px;
    }
    .sy-header-nav .sy-header-nav-right div.sy-header-btn-box{
        display: inline-block;
        line-height: 25px;
    }
    .sy-header-nav .sy-header-nav-right div.sy-header-btn-box>span {
        display: inline-block;
        cursor: pointer;
        color: #fff;
        padding-left: 10px;
    }

    .sy-header-nav .sy-header-nav-right div.sy-header-btn-box span>i {
        font-size: 16px;
        color: #fff;
    }
</style>
