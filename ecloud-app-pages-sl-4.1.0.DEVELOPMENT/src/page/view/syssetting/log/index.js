import config from './config.js';
import { getlogList, deleteLog } from '../request.js';
import _config from '@/config.js';
export default {
    data() {
        return {
            module: 'sl',
            emptyText: '',
            period: 'ALL',
            name: '',
            keyword: '',
            state: '',
            periods: [{
                value: 'ALL',
                label: this.$store.state.lang.base.log.ALL,
            }, {
                value: 'NEARLY_HOUR',
                label: this.$store.state.lang.base.log.time1
            }, {
                value: 'NEARLY_THOURS',
                label: this.$store.state.lang.base.log.time2
            }, {
                value: 'NEARLY_DAY',
                label: this.$store.state.lang.base.log.time3
            }, {
                value: 'NEARLY_TDAYS',
                label: this.$store.state.lang.base.log.time4
            }, {
                value: 'NEARLY_MONTH',
                label: this.$store.state.lang.base.log.time5
            }, {
                value: 'NEARLY_TMONTHS',
                label: this.$store.state.lang.base.log.time6
            }, {
                value: 'NEARLY_YEAR',
                label: this.$store.state.lang.base.log.time7
            }],
            states: [{
                value: '',
                label: this.$store.state.lang.base.log.info7
            }, {
                value: '0',
                label: this.$store.state.lang.base.log.err
            }, {
                value: '1',
                label: this.$store.state.lang.base.log.success
            }],
            tableData: [],
            appColumn: [{
                label: this.$store.state.lang.base.log.userName,
                prop: "userName",
                align: "left",
                width: "210",
            }, {
                label: this.$store.state.lang.base.log.loginIp,
                prop: "loginIp",
                align: "center",
                width: "120",
            }, {
                label: this.$store.state.lang.base.log.logDetails,
                prop: "logDetails",
                align: "center",
                width: "200",
            }, {
                label: this.$store.state.lang.base.log.logging,
                prop: "logging",
                align: "left",
                width: "",
            }, {
                label: this.$store.state.lang.base.log.logSuc,
                prop: "logSuc",
                align: "center",
                width: "130",
            }, {
                label: this.$store.state.lang.base.log.logRequestTime,
                prop: "logRequestTime",
                align: "center",
                width: "170",
            }],
            currentPage: 1,
            pageSize: 30, //每页显示多少条数据
            total: 0, //总数据
            deleteLogDialog: false,
            deletePeriod: 'NEARLY_THOURS',
            deletePeriods: [{
                value: 'ALL',
                label: this.$store.state.lang.base.log.ALL,
            }, {
                value: 'NEARLY_HOUR',
                label: this.$store.state.lang.base.log.NEARLY_HOUR,
            }, {
                value: 'NEARLY_THOURS',
                label: this.$store.state.lang.base.log.NEARLY_THOURS,
            }, {
                value: 'NEARLY_DAY',
                label: this.$store.state.lang.base.log.NEARLY_DAY,
            }, {
                value: 'NEARLY_TDAYS',
                label: this.$store.state.lang.base.log.NEARLY_TDAYS,
            }, {
                value: 'NEARLY_MONTH',
                label: this.$store.state.lang.base.log.NEARLY_MONTH,
            }, {
                value: 'NEARLY_TMONTHS',
                label: this.$store.state.lang.base.log.NEARLY_TMONTHS,
            }, {
                value: 'NEARLY_YEAR',
                label: this.$store.state.lang.base.log.NEARLY_YEAR,
            }],
        }
    },
    created() {
        this.$parent.$emit("currentPage", "/exam/col/log");
        this.getTable()
    },
    methods: {
        getlogList(parm) {
            this.tableData = [];
            getlogList(parm).then(res => {
                if (res.data && res.status == 200 && res.data.list && res.data.list.length > 0) {
                    this.total = res.data.total ? res.data.total : this.total;
                    if (this.total > 100000) {
                        this.deleteLogDialog = true
                    }
                    res.data.list.forEach(val => {
                        this.tableData.push({
                            userName: val.nickName ? val.realName + "（" + val.nickName + "）" : val.realName,
                            loginIp: val.clientIp,
                            logDetails: val.modular, //操作模块
                            logging: val.logging ? val.logging : val.operation, //操作日志的内容
                            // logSuc: val.successful == 1 ? "成功" : "失败",
                            logSuc: val.successful,
                            logRequestTime: val.requestTime
                        });
                    });
                } else {
                    this.total = 0;
                    this.emptyText = "";
                }
            });
        },
        getTable() {
            if (this.name) {
                this.name = this.name.trim();
            }
            this.getlogList({
                module: this.module,
                period: this.period,
                accounts: this.name ? this.name : undefined,
                start: this.currentPage,
                modular: this.keyword ? this.keyword : undefined,
                size: this.pageSize,
                type: this.$route.path == '/base/loginLog' ? '2' : '1',
                successful: this.state == "0" || this.state == "1" ? this.state : undefined
            });
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getTable();
        },
        periodChange() {
            this.getTable();
        },
        stateChange() {
            this.getTable();
        },
        search() {
            this.getTable();
        },
        deleteLog(parm) {
            deleteLog(parm).then(res => {
                if (res && res.status == 200) {
                    this.$notify({
                        message: this.$store.state.lang.message.success,
                        type: 'success'
                    });
                } else {
                    this.$notify.error({
                        message: this.$store.state.lang.message.error,
                    });
                }
                this.getTable();
                this.deleteLogDialog = false
            })
        },
        clear() {
            this.deleteLogDialog = true
        },
        submitDialog() {
            this.deleteLog(this.deletePeriod)
        },
    }
}