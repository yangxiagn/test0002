import waves from './waves/waves.js';
import download from './download-element-table.js';

const isServer = Vue.prototype.$isServer;
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;
const ieVersion = isServer ? 0 : Number(document.documentMode);
/* istanbul ignore next */
const camelCase = function (name) {
    return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
    }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};

function setStyle(element, styleName, value) {
    if (!element || !styleName) return;

    if (typeof styleName === 'object') {
        for (var prop in styleName) {
            if (styleName.hasOwnProperty(prop)) {
                setStyle(element, prop, styleName[prop]);
            }
        }
    } else {
        styleName = camelCase(styleName);
        if (styleName === 'opacity' && ieVersion < 9) {
            element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
        } else {
            element.style[styleName] = value;
        }
    }
};

const styles = {
    display: 'block',
    'box-sizing': 'border-box',
    width: '100%',
    'vertical-align': 'middle',
    'white-space': 'nowrap',
    'text-overflow': 'ellipsis',
    'overflow': 'hidden'
}

export default (Vue) => {
    Vue.directive('focus', { //输入框自动获得焦点
        inserted: (el) => {
            el.focus()
        }
    });

    Vue.directive("back", { //返回上个history页面
        bind: (el, binding, vnode) => {
            el.addEventListener('click', () => {
                window.history.go(-1);
                // window.history.back();
            })
        }
    });
    let getStyles = function (styles, _styles) {
        if (_styles) {
            for (let key in _styles) {
                styles[key] = _styles[key];
            }
        }
        return styles;
    };
    Vue.directive("title", {
        //溢出隐藏 并增加鼠标提示
        bind: (el, binding, vnode) => {
            setStyle(el, getStyles(styles, binding.value.styles), null);
            if (el.offsetWidth < el.scrollWidth) {
                el.setAttribute("title", binding.value.title);
            }
        },
        inserted: (el, binding, vnode) => {
            setStyle(el, getStyles(styles, binding.value.styles), null);
            if (el.offsetWidth < el.scrollWidth) {
                el.setAttribute("title", binding.value.title);
            }
        },
        componentUpdated: (el, binding, vnode) => {
            setStyle(el, getStyles(styles, binding.value.styles), null);
            if (el.offsetWidth < el.scrollWidth) {
                el.setAttribute("title", binding.value.title);
            }
        }
    })
    ;

    Vue.directive("waves", waves);
    Vue.directive("download", download);
}