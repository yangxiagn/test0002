import Tree from './tree/index.js';
import SelectUsers from './selectUsers/index.js';
import SyLogin from './login/index.js';
import Ue from './ueditor/index.js';
import SyComment from './comment/index.js';
import treeTable from './treeTable/index.js';
import zTable from './table-row-col/index.js';

const components = [
    Tree,
    SyLogin,
    Ue,
    SyComment,
    treeTable,
    zTable
];

const install = function(Vue, opts = {}) {
    if (Vue.prototype.$isServer) return;
    components.map(component => {
        if (component.props && component.props.hasOwnProperty('themes')) {
            component.props.themes.default = () => {
                return opts
            }
        }
        Vue.component(component.name, component);
    });
    SelectUsers.install(Vue);
    Vue.prototype.$SelectUsers = SelectUsers;
};

export default {
    version: '1.0.0',
    install,
    Tree,
    SyLogin,
    Ue,
    SyComment,
    treeTable,
    zTable
};