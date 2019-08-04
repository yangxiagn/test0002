import env from './env.js';
import version from './version.js';
const baseUrl = env.baseUrl;
const count = 0;
let realName = '';
let loginName = '';
let avatar = '';
let unitId = '';
let unitType = 1;
let userId = '';
let userType = 0;
let unitName = '';
let userMsg = JSON.parse(window.localStorage.getItem("user"));
let checkedData = [];
let APPLY_KEY = "报名";
if (userMsg && userMsg.data) {
    realName = userMsg.data.realName;
    loginName = userMsg.data.loginName;
    avatar = userMsg.data.avatar;
    unitId = userMsg.data.unitId;
    unitType = userMsg.data.unitType;
    userId = userMsg.data.userId;
    userType = userMsg.data.userType;
    unitName = userMsg.data.unitName
}
import lang from "../lang/index.js";
let langType = window.localStorage.getItem("lange_") || 'zh-CN';
export default {
    theme: '',
    langType: langType,
    lang: lang[langType],
    baseUrl,
    count,
    realName,
    loginName,
    checkedData,
    avatar,
    unitId,
    unitType,
    userType,
    userId,
    unitName,
    version: version,
    pageSize: 30,
    APPLY_KEY
}
