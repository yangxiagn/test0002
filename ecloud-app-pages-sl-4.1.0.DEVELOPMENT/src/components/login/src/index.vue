<template>
    <div class="sy-login-panel">
        <div class="sy-login-panel-header">{{langs.t1}}</div>
        <div class="sy-login-panel-cont">
            <el-form ref="loginForm" :model="loginForm" :rules="loginFormRules">
                <el-form-item prop="username">
                    <el-input ref="username" @focus="ifocus" @blur="iblur" type="text" @change="inputChange" v-model.trim="loginForm.username" size="large" 
                        :placeholder="langs.t5" @keyup.enter.native="next('password', 'username')">
                        <template slot="prepend">
                            <span class="fa fa-user" aria-hidden="true"></span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input ref="password" @focus="ifocus" @blur="iblur" type="password" @change="inputChange" v-model.trim="loginForm.password" size="large" 
                        :placeholder="langs.t6" @keyup.enter.native="next('button', 'password')">
                        <template slot="prepend">
                            <span class="fa fa-lock" aria-hidden="true"></span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="errorMsg" class="sy-login-errormsg"></el-form-item>
                <el-form-item>
                    <el-row>
                        <el-col :span="18">
                            <el-checkbox v-model="loginForm.remPass" @change="removeRempass">{{langs.t2}}</el-checkbox>
                        </el-col>
                        <el-col :span="6" style="text-align: right;">
                            <a class="fogPass" href="/forgetPassword" target="_blank">
                                <el-button type="text">{{langs.t3}}</el-button>
                            </a>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-row>
                    <el-col :span="24">
                        <el-button ref="button" type="primary" size="large" style="width: 100%;height: 45px;" @click="login">{{langs.t4}}</el-button>
                    </el-col>
                </el-row>
                <ul class="login-icons-box">
                    <li v-for="item in orthersData" :key="item.id" @click="handleClick(item)">
                        <img :src="item.imgPath" alt=""> 
                    </li>    
                </ul>
            </el-form>
        </div>
    </div>
</template>

<script>
import config from "@/config.js";
import langugs from "./lang.js";
export default {
    name: 'SyLogin',
    props: {
        action: {
            type: String,
            default: ''
        },
        callback: Function
    },
    data() {
        return {
            loginForm: {
                username: '',
                password: '',
                errorMsg: '',
                remPass: false
            },
            loginFormRules: {
                username: [{
                    trigger: 'change',
                    validator: (rule, value, callback) => {
                        value = this.$trim(value);
                        if (!value || value.length <= 0) {
                            callback(new Error(this.langs.t5));
                            return;
                        }
                        callback();
                    }
                }],
                password: [{
                    trigger: 'change',
                    validator: (rule, value, callback) => {
                        value = this.$trim(value);
                        if (!value || value.length <= 0) {
                            callback(new Error(this.langs.t6));
                            return;
                        }
                        callback();
                    }
                }],
                errorMsg: [{
                    trigger: 'change',
                    validator: (rule, value, callback) => {
                        if (value) {
                            callback(new Error(value));
                            return;
                        }
                        callback();
                    }
                }]
            },
            langs: {},
            orthersData: []
        }
    },
    created(){
        let changeLang = window.localStorage.getItem("lange_" + config.app) || "zh-CN";
        this.langs = langugs[changeLang];
        this.init();
    },
    mounted() {
		let _ = JSON.parse(localStorage.getItem("rempass"));
		if (_) {
			if (_.rempass) {
				this.loginForm.remPass = true;
				this.loginForm.username = _._;
				this.loginForm.password = _.__;
			} else {
				localStorage.removeItem("rempass");
			}
		}
    	setTimeout(() => {
           $(this.$refs.username.$refs.input).trigger('focus');
    	}, 400);
    },
    methods: {
        init(){
            this.orthersData = [];
            let _this = this;
            $.get(
                window.ShiYue.base + "/api/uaa/social/info",
                {},
                function(res, textStatus, xhr) {
                    if (res.status && res.status == 200) {
                        let arr = [];
                        for (var i = 0; i < res.data.length; i++) {
                            let row = res.data[i];
                            arr.push({
                                id: row.providerId,
                                providerId: row.providerId,
                                name: row.name,
                                providerAppLoginUrl: row.providerAppLoginUrl,
                                providerAppId: row.providerAppId,
                                imgPath: `/common/images/${row.providerId}_icon1.png`
                            })
                        }
                        _this.orthersData = arr;
                        console.log(arr);
                    }
                }
            )
        },
        handleClick(d){
            let url =
                d.providerAppLoginUrl +
                "?appid=" +
                d.providerAppId +
                "&client_id=" +
                d.providerAppId +
                "&redirect_uri=" +
                encodeURIComponent(location.origin +
                location.pathname.substring(location.pathname.length - 1,"") +
                (this.getQueryString("redirect")
                ? "?redirect=" + this.getQueryString("redirect")
                : "")) +
                "&response_type=code&scope=snsapi_login&state=" +
                d.providerId +
                "_" +
                this.generateMixed(32);
            window.location.href = url;
        },
        generateMixed (n) {
            var chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
            var res = "";
            for (var i = 0; i < n; i++) {
            var id = Math.ceil(Math.random() * 35);
            res += chars[id];
            }
            return res;
        },
        getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return "";
        },
        inputChange() {
            this.loginForm.errorMsg = '';
            this.$refs.loginForm.validateField('errorMsg');
        },
        ifocus(e) {
            let _c = $(this.$refs.button.$el).css('background-color');
            $(e.target).prev('.el-input-group__prepend').css('border-color', _c).find('.fa').css('color', _c);
        },
        iblur(e) {
            $(e.target).prev('.el-input-group__prepend').removeAttr('style').find('.fa').removeAttr('style');
        },
        removeRempass() {
            if (!this.loginForm.remPass) {
                localStorage.removeItem("rempass");
            }
        },
    	next(_ref, _thisref) {
    		// 账号、mima都不为空，则直接提交表单
    		if (this.loginForm.username.length > 0 && this.loginForm.password.length > 0) {
    			let $vm = this.$refs.button;
    			$vm.$el.focus();
    			$vm.$emit('click');
    			return false;
    		}
    		if (_thisref && this.loginForm[_thisref].length <= 0) {
				return false;
    		}
    		let $vm = this.$refs[_ref];
    		if ($vm.$options._componentTag == 'el-input') {
    			$vm.$refs.input.focus();
    		} else {
    			$vm.$el.focus();
    			$vm.$emit('click');
    		}
    	},
        login() {
            this.$refs.loginForm.validate((valid) => {
                if (!valid || !this.action || this.action.length == 0) {
                    return valid;
                }
                $.post(this.action, this.loginForm, (res, textStatus, xhr) => {
                    if (res.status && res.status == 200) {
                    	if (this.loginForm.remPass) {
			        		localStorage.setItem("rempass", JSON.stringify({
			        			"rempass": this.loginForm.remPass,
			        			"_": this.loginForm.username,
			        			"__": this.loginForm.password
			        		}))
			        	} else {
			        		localStorage.removeItem("rempass");
			        	}
                        localStorage.setItem('user', JSON.stringify(res));
                        
                        if (typeof this.callback === 'function') {
                            this.callback(res, this);
                        }
                    } else {
                        this.loginForm.errorMsg = res.message;
                        this.$refs.loginForm.validate();
                    }
                }, 'json');
            });
        }
    }
};
</script>

<style scoped>
.login-icons-box{
    text-align: center;
    line-height: 30px;
}
.login-icons-box>li {
    display: inline-block;
    height: 30px;
    width: 30px;
    cursor: pointer;
    background-repeat: no-repeat;
    background-size: contain;
    margin: 16px 5px 0;
}
.login-icons-box>li>img{
    display: inline-block;
    width: 100%;
    height: 100%;
    vertical-align: top;
}
.sy-login-panel {
    min-width: 310px;
    padding: 30px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    box-shadow: 0 0 5px #333;
}

.sy-login-panel .sy-login-panel-header {
    font-size: 22px;
    line-height: 30px;
}

.sy-login-panel .sy-login-panel-cont {
    margin: 20px auto 0;
}

.sy-login-panel .sy-login-panel-cont .fa-user,
.sy-login-panel .sy-login-panel-cont .fa-lock {
    width: 21px;
    text-align: center;
    font-size: 22px;
}

.sy-login-panel .sy-login-panel-cont .el-form-item {
    margin-bottom: 22px;
}

.sy-login-panel .sy-login-panel-cont .el-form-item.sy-login-errormsg {
    margin-bottom: 0px;
    -webkit-transform: all .5s;
    transform: all .5s;
}

.sy-login-panel .sy-login-panel-cont .el-form-item.sy-login-errormsg.is-error {
    margin-bottom: 18px;
    -webkit-transform: all .5s;
    transform: all .5s;
}
</style>
