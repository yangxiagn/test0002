import generateColors from './utils/color.js';
import colorMap from './utils/colorMap.js';
import api from "@/api/index.js";
import themes from "./themes.js";
import store from "@/vuex/index.js"; // vuex
let themeFUN = function () {
    return new Promise((resolve, reject) => {
        var elmentUI = $.ajax({
            url: "/common/css/element-ui.min.css",
            data: {},
            dataType: 'text',
            type: "GET",
            async: false
        }).responseText;
        var indexcss = $.ajax({
            url: "/common/css/index.css",
            data: {},
            dataType: "text",
            type: "GET",
            async: false
        }).responseText;
        var ecloudcss = $.ajax({
            url: "/common/css/ecloud-ui.min.css",
            data: {},
            dataType: "text",
            type: "GET",
            async: false
        }).responseText;
        let styleData = elmentUI + indexcss + ecloudcss;
        let storeColor = window.localStorage.getItem("themeColor");
        storeColor = storeColor == 'null' ? '#457CD6' : storeColor;
        let changeTheme = (color, theme) => {
            let colors = {
                primary: color
            };
            colors = { ...colors,
                ...generateColors(colors.primary)
            };
            if (styleData) {
                Object.keys(colorMap).forEach(key => {
                    var value = colorMap[key];
                    styleData = styleData.replace(new RegExp(key, "ig"), value);
                });
                Object.keys(colors).forEach(key => {
                    styleData = styleData.replace(new RegExp("(:|\\s+)" + key, "g"), "$1" + colors[key]);
                });
                styleData = styleData.replace(new RegExp("fonts/element-icons.woff", "g"), "/common/fonts/element-icons.woff");
                styleData = styleData.replace(new RegExp("fonts/element-icons.ttf", "g"), "/common/fonts/element-icons.ttf");
                var nod = document.createElement("style");
                nod.style.id = "theme-style";
                if (nod.styleSheet) {
                    nod.styleSheet.cssText = styleData;
                } else {
                    nod.innerHTML = styleData;
                }
                document.getElementsByTagName("head")[0].appendChild(nod);
                window.localStorage.setItem('themeColor', theme);
            }
        }
        if (store.state.theme != storeColor) {
            api("get", "/api/base/my_desktop/color").then(res => {
                let color = '';
                let theme = '';
                if (res.status == 200) {
                    color = themes[res.data] || res.data;
                    theme = res.data;
                } else {
                    color = "#457CD6";
                    theme = "#457CD6";
                }
                changeTheme(color, theme);
                store.commit("changeTheme", theme);
                resolve()
            }).catch(err => {
                changeTheme("#457CD6", "#457CD6");
                store.commit("changeTheme", "#457CD6");
                resolve()
            });
        } else {
            let color = themes[storeColor] || storeColor;
            let theme = storeColor;
            changeTheme(color, theme);
            store.commit("changeTheme", theme);
            resolve()
        }
    })
}

// 修改主题
export default themeFUN