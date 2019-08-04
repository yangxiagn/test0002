
import lang from "../lang/index.js";
export default {
    getUserInfo(state) {
        let userMsg = JSON.parse(window.sessionStorage.getItem('user'));
        if (userMsg && userMsg.data) {
            state.realName = userMsg.data.realName;
            state.loginName = userMsg.data.loginName;
            state.avatar = userMsg.data.avatar;
            state.unitId = userMsg.data.unitId;
            state.unitType = userMsg.data.unitType;
            state.userId = userMsg.data.userId;
            state.userType = userMsg.data.userType;
        }
    },
    changeCheckedData(state, data) {
        state.checkedData = data
    },
    changeApplyKey(state, data) {
        state.APPLY_KEY = data;
    },
    changeLange(state, data) {
        state.langType = data;
        state.lang = lang[data];
    },
    changeTheme(state, data) {
        state.theme = data;
    }
}