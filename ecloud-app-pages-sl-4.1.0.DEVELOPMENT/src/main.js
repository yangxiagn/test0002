import Vue from 'vue';
import App from './App';
import router from './router';
import store from "./vuex/index.js"; // vuex
import VueI18n from "vue-i18n";
import lang from "./lang/index.js";
import api from "./api/index.js";

Vue.use(VueI18n);
// 模块语言配置
const langType = window.localStorage.getItem("lange_") || "zh-CN";
let i18n = new VueI18n({ locale: langType, messages: lang });

// 全局配置
import config_g from "./tools/config.js";
Vue.use(config_g);


Vue.config.productionTip = false;

import changeTheme from '@/theme/index.js';

let getQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return "";
}
let init = () => {
    changeTheme().then(res => {
        new Vue({
            el: '#app',
            router,
            i18n,
            store,
            template: '<App/>',
            components: {
                App
            }
        })
    })
}
if (getQueryString("code")) {
    var type = getQueryString("state").split("_")[0];
    api('get', "/api/uaa/social/" + type, {
        code: getQueryString("code")
    }).then(res => {
        if (res.status && res.status == 200) {
            localStorage.setItem("user", JSON.stringify(res.data));
            store.commit("getUserInfo");
            init();
        }
    }).catch(err => {
        init();
    })
} else {
    init();
}