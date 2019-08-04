import screenfull from 'screenfull';
import changeTheme from '@/theme/index.js';
import store from '@/vuex/store.js';
import DialogLogin from '@/commonPage/login/DialogLogin.vue';
import {
    updataThemeColor,
    validataEmail,
    validataMobile,
    imgUrl,
    getUnitLogo
} from './request.js';
export default {
    name: 'MyDesktop',
    data() {
        return {
            getUnitLogo: getUnitLogo + this.$store.state.unitId,
            imgUrl: imgUrl,
            showImgUrl: '',
            deskImgUrl: '',
            isHaveImg: true,
            isDeskHaveImg: true,
            loading: false,
            isfullscreen: false,
            bgColor: {
                background: "rgb(73, 193, 219)"
            },
            tableData: [],
            activeName: 'first',
            selfMsgDialog: false,
            menuModelDialog: false,
            themeModelDialog: false,
            editable: true,
            imgloading: false,
            isDragging: false,
            delayedDragging: false,
            isOpen: false,
            value: 3,
            oldPassWord: '',
            
            menuList: [],

            oldloginMobile: '',
            oldloginEmail: '',
            photoModel: {},
            mottoModel: {},
            msgModel: {},
            toolsModel: {},
            unitId: '',
            isEditDialog: false,
            langModelDialog: false,
            editData: [],
            editDialog: false,
            currentColor: window.localStorage.getItem('themeColor') || '#20a0ff',
            themeColorList: [{
                'zh-CN': '中国红',
                en: 'China red',
                color: '#e31d1a'
            }, {
                'zh-CN': '东方蓝',
                en: 'Oriental Blue',
                color: '#457CD6'
            }, {
                'zh-CN': '赛罗蓝',
                en: 'Siro Blue',
                color: '#49C1D9'
            }, {
                'zh-CN': '清新绿',
                en: 'Fresh green',
                color: '#4DB021'
            }],
            loginConfigMsg: {
                footer: '',
                link: ''
            },
            dialogFormVisible: false,
            userName: '',
            iocnSrc: '',
            inputHost: window.localStorage.getItem('currentHost') || '',
            aboutDialog: false
        }
    },
    watch: {
        name: function(newVal, oldVal) {
            if (!newVal) { return }
            this.userName = newVal;
        },
        isDragging(newValue) {
            if (newValue) {
                this.delayedDragging = true
                return
            }
            this.$nextTick(() => {
                this.delayedDragging = false
            })
        }
    },
    computed: {
        env: function() {
            if (process.env.NODE_ENV == 'development') {
                return true
            } else if (process.env.NODE_ENV == 'production') {
                return false
            }
        }
    },
    beforeCreate() {

    },
    created() {
        if (store.state.realName) {
            this.userName = store.state.realName;
        } else {
            this.userName = '';
        }
        if (store.state.avatar) {
            this.iocnSrc = window.ShiYue.base + '/api/storage/show/' + store.state.avatar;
        } else {
            this.iocnSrc = window.ShiYue.base + '/api/storage/show/' + 'logo.png';
        }
        let msg = window.localStorage.getItem('loginConfigMsg');
        msg = msg ? JSON.parse(msg) : false;
        if (msg && msg.link) {
            this.loginConfigMsg.footer = msg.footer;
            this.loginConfigMsg.link = msg.link;
        }
        this.init();
    },
    methods: {
        init(){
            this.handleChangeLange(this.lang);
        },
        handleChangeLange(val){
            this.$emit("changeLange", val);
            this.$store.commit("changeLange", val);
        },
        changeHost() {
            this.dialogFormVisible = false;
            window.localStorage.setItem('currentHost', this.inputHost);
            window.location.reload();
        },
        handleChange(data){
            console.log(data)
            this.changeThemeColor(data)
        },
        changeThemeColor(color) {
            let saveTheme = window.localStorage.getItem('themeColor');
            if (saveTheme && saveTheme == color) {
                return
            }
            updataThemeColor('color', color).then((data) => {
                if (data && data.data === 'success') {
                    this.$notify({
                        message: '设置成功！',
                        type: 'success'
                    });
                    window.localStorage.setItem('themeColor', color);
                    changeTheme(color);
                } else {

                }
            })
        },
        // 接收座右铭信息 并修改
        onSelectType(msg) {
            if (this.selfMsgForm.motto === msg) {

            } else {
                this.selfMsgForm.motto = msg;
                this.submitForm('save');
            }
        },
        // 失去焦点校验
        handleBulur(t, value, obj, key) {
            if (t === 'phone') {
                if (!value) { return; }
                // console.log(this.oldloginMobile)
                if (this.oldloginMobile === this.$trim(value)) { return; }
                if (this.$checkPhoneNumber(this.$trim(value))) {
                    validataMobile(this.$trim(value)).then((data) => {
                        if (!data.data) {
                            this.$notify({
                                message: '手机号码已存在！',
                                type: 'warning'
                            });
                            obj[key] = '';
                        }
                    })
                } else {
                    this.$notify({
                        message: '手机号码格式有误！',
                        type: 'error'
                    });
                    obj[key] = '';
                }
            } else if (t === 'email') {
                if (!value) { return; }
                if (this.oldloginEmail === this.$trim(value)) { return; }
                if (this.$checkEmail(this.$trim(value))) {
                    validataEmail(this.$trim(value)).then((data) => {
                        if (!data.data) {
                            this.$notify({
                                message: '邮箱已存在！',
                                type: 'warning'
                            });
                            obj[key] = '';
                        }
                    })
                } else {
                    this.$notify({
                        message: '邮箱格式有误！',
                        type: 'error'
                    });
                    obj[key] = '';
                }
            }
        },
        open(t) {
            if (t === 'logout') {
                this.$confirm(this.$store.state.lang.header.infomsg, this.$store.state.lang.header.info, {
                    confirmButtonText: this.$store.state.lang.button.ok,
                    cancelButtonText: this.$store.state.lang.button.cancel,
                    type: 'warning'
                }).then(() => {
                    window.localStorage.removeItem("user");
                    $.post(window.ShiYue.base + '/api/uaa/oauth/logout', (res) => {
                        const h = this.$createElement;
                        if(process.env.NODE_ENV == 'development'){
                            this.$msgbox({
                                message: h(DialogLogin),
                                title: '  ',
                                customClass: 'sy-login-box',
                                showConfirmButton: false,
                                showCancelButton: false,
                                closeOnPressEscape: false,
                                closeOnClickModal: false,
                            beforeClose: (action, instance, done) => {
                                 done();
                            }
                            }).then(action => {
                                this.$message({
                                    type: 'info',
                                    message: 'action: ' + action
                                });
                            });
                        }else{
                            location.href = "/login";
                        }
                    });
                }).catch(() => {});
            } else if (t === 'reload') {
                window.location.reload();
            } else if (t === 'theme') {
                this.themeModelDialog = true;
            } else if (t === 'full') {
                if (!screenfull.enabled) {
                    this.$message({
                        message: 'you browser can not work',
                        type: 'warning'
                    })
                    return false
                }
                this.isfullscreen = !this.isfullscreen;
                screenfull.toggle()
                if (this.isfullscreen) {
                    this.onFullScreenEvent(this.fullScreenCallback)
                } else {
                    this.offFullScreenEvent(this.fullScreenCallback)
                }
            } else if (t == 'host') {
                this.dialogFormVisible = true;
            } else if(t == 'lang'){
                this.langModelDialog = true;
            }else{
                this.$alert('此功能没做', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {

                    }
                });
            }
        },
        handleBack(){
            location.href = '/desktop';
        },
        fullScreenCallback() {
            this.isfullscreen = this.fullScreenStatus()
            let isFullscreen = this.fullScreenStatus()
            if (!isFullscreen) {
                // 退出全屏时解绑回调
                this.offFullScreenEvent(this.fullScreenCallback)
            }
        },
        fullScreenStatus() {
            if (document.fullscreen ||
                document.mozFullScreen ||
                document.fullscreenElement ||
                document.msFullscreenElement ||
                document.webkitIsFullScreen) {
                return true
            } else {
                return false
            }
        },
        onFullScreenEvent(callback) {
            document.addEventListener('fullscreenchange', callback)
            document.addEventListener('mozfullscreenchange', callback)
            document.addEventListener('MSFullscreenChange', callback)
            document.addEventListener('webkitfullscreenchange', callback)
        },
        offFullScreenEvent(callback) {
            document.removeEventListener('fullscreenchange', callback)
            document.removeEventListener('mozfullscreenchange', callback)
            document.removeEventListener('MSFullscreenChange', callback)
            document.removeEventListener('webkitfullscreenchange', callback)
        }
    },
    mounted() {

    }
}