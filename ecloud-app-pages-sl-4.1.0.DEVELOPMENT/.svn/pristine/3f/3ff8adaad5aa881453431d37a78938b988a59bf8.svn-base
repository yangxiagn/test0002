import {
    getCourseBase,
    getCourseNameClass,
    getCataloglList,
    getResourceTypeList,
    getKnowpointTree,
    getRoutineManage,
    getLabelList,
    saveBaseRc
} from './request.js';
export default {
    name: 'Upload',
    props: {
        data: {
            type: Object,
            default: {}
        },
    },
    data() {
        return {
            courseType: 'type1',//资源类型
            catalog: this.$store.state.lang.rc.t35, //编目名称
            gradeValue: '',
            catalogId: '', //编目ID
            schooltermType: '',//学期----来源于编目
            stageId: '',//学段----来源于编目
            isShowCatalogError: false,
            catalogErrorText: this.$store.state.lang.rc.t36,
            /* 选择编目弹框 */
            courses: [], //课程
            courseValue: '', //课程value
            coursesDialog: false,
            catalogTreeData: [], //编目
            defaultChecked: [],
            emptyTextCatalogTree: this.$store.state.lang.rc.t37 || '正在加载中...',
            treeNode: undefined, //选中的编目节点
            addNewBtn: false,
            isExpendAll: true,
            //初始化第二步-begin
            emptyText: this.$store.state.lang.rc.t37 || '正在加载中...',
            // 步骤二表内容
            objTable1: {
                resourceType: '',
                knowledge: this.$store.state.lang.rc.t35,
                knowledgeId: '',
                fileAuthor: '',
                fileName: '',
                uploadValue: '',
                percentage: '0',
                isShowProgress: false,
                isShow: false,
                fileId: '', //附件ID
                fileType: '', //附件类型
                suffix: '', //附件后缀名
                fileSize: '', //附件大小
                deleteColumnDisabled: '',
                //错误提示
                isShowResourceTypeError: false,
                isShowRcFileNameError: false,
                isShowfileNameError: false,
                resourceTypeErrorText: this.$store.state.lang.rc.t38 || '资源分类不能为空！',
                rcFileNameErrorText: this.$store.state.lang.rc.t39 || '为空！',
                isUploadBtn: true,
                isErrorProgress: false,
                isProgress: false,
                fileNameErrorText: this.$store.state.lang.rc.t40 || '请先上传文件!'
            },
            tableData1: [],
            currentColumn: [{
                    prop: 'rcType',
                    label: this.$store.state.lang.rc.t41 || '资源分类',
                    align: 'center',
                    width: '160'
                }, {
                    prop: 'knowledge',
                    label: this.$store.state.lang.rc.t42 || '知识点',
                    align: 'center',
                    width: '100'
                }, {
                    prop: 'fileAuthor',
                    label: this.$store.state.lang.rc.t43 || '作者',
                    align: 'center',
                    width: '100'
                }, {
                    prop: 'fileName',
                    label: this.$store.state.lang.rc.t44 || '资源名称（小于50字）',
                    align: 'center',
                    width: ''
                },
                {
                    prop: 'uploadValue',
                    label: this.$store.state.lang.edu.t94 || '上传文件',
                    align: 'center',
                    width: '280'
                }
            ],
            rcTypess: [],
            //初始化第二步-end
            // 知识点
            tableDataIndexKnowledge: 0,
            choseNnowledgelDialog: false,
            nowledgelTreeData: [],
            nowledgelChecked: [],
            //删除
            deleteColumnDialog: false,
            //上传资源的限制
            uploadFileSize: 0, //上传的最大限额
            uploadNumber: 0, //最大可以上传的资源数量
            addColumnDisabled: false, //新增按钮
            uploadText: this.$store.state.lang.rc.t45 || '添加',
            //上传
            tableDataIndex: 0, //上传选择的当前行数
            tableDataKeys: {}, //上传的文件的标识
            isScuessUpload: {}, //是否上传成功
            uploadData: {
                serverid: 'rc'
            },
            uploadAction: window.ShiYue.base + '/zuul/api/storage/upload',
            // 资源属性
            tableData2: [{
                    id: 'cell1',
                    name: this.$store.state.lang.rc.t46 || '标题'
                },
                {
                    id: 'cell2',
                    name: this.$store.state.lang.rc.t47 || '上传人'
                },
                {
                    id: 'cell3',
                    name: this.$store.state.lang.rc.t48 || '标签'
                },
                {
                    id: 'cell4',
                    name: this.$store.state.lang.rc.t49 || '简介'
                },
                {
                    id: 'cell5',
                    name: this.$store.state.lang.rc.t50 || '下载控制'
                },
            ],
            rcName: '', //标题
            isShowRcNameError: false,
            deleteColumnDialog: false,
            column: '', //选中的当前
            authorName: this.$store.state.realName ? this.$store.state.realName : this.$store.state.lang.rc.t51 || '点击选择(只能有一个上传人)', //上传人
            userId: this.$store.state.userId ? this.$store.state.userId : '',
            isShowAuthorNameError: false,
            checkList: [], //选中的已有标签
            labelName: this.$store.state.lang.rc.t52 ||  '点击选择已有标签', //选中的标签名称
            label: '', //选中的标签ID
            labels: [], //已有标签列表
            choseLabelDialog: false,
            tag: '',
            jianjie: '',
            downloadControl: '0',
            sharedScope: 2, //共享范围是匿名
            isSubmitAndUpload: false,
            isSubmitAndClose: false,
        }
    },
    created() {
        this.getResourceTypeList(); //获取资源分类
        this.getRoutineManage(); //获取资源上传的限制配置
        if(JSON.stringify(this.data) != "{}"){
            this.gradeValue = this.data.gradeValue;
            this.courseValue = this.data.courseValue;
            this.catalogId = this.data.id;
            this.catalog = this.data.name;
            this.schooltermType = this.data.schooltermType;
            this.stageId = this.data.stageId;
        }
    },
    methods: {
        //获得后台的上传限制---新增上传资源时需要用到
        getRoutineManage() {
            getRoutineManage().then((res) => {
                if (res && res.code == 'ok' && res.data) {
                    this.uploadFileSize = res.data.uploadFileSize;
                    this.uploadNumber = res.data.uploadNumber;
                    if (this.uploadNumber < 2) {
                        this.addColumnDisabled = true
                    }
                } else {
                    this.addColumnDisabled = true
                }
            })
        },
        //获得资源分类---type1表示基础型课程
        getResourceTypeList() {
            let _rcTypess = [];
            getResourceTypeList('type1').then((res) => {
                if (res && res.code == 'ok' && res.data && res.data.length > 0) {
                    res.data.forEach((val) => {
                        _rcTypess.push({
                            text: val.name,
                            value: val.id
                        });
                    });
                    this.rcTypess = _rcTypess;
                    this.tableData1.push(this.objTable1)
                    this.tableData1.forEach((val, i) => {
                        this.tableData1[i].resourceType = this.rcTypess[0].value;
                    });
                } else {
                    this.tableData1.push(this.objTable1)
                    this.rcTypess = [];
                }
            })
        },
        //打开选择编目dialog
        choseCatalog() {
            this.coursesDialog = true;
            this.catalogTreeData = [];
            this.emptyText = this.$store.state.lang.rc.t37 || '正在加载中...'
            this.emptyTextCatalogTree = this.$store.state.lang.rc.t37 || '正在加载中...'
            this.addNewBtn = false
            if (this.courseValue) {
                this.getCataloglList({
                    courseValue: this.courseValue,
                    gradeValue: this.gradeValue,
                    schooltermType: this.term
                })
            } else {
                //获取行政班的基础型课程
                getCourseBase().then((data) => {
                    if (data && data.code == 'ok' && data.fieldErrors == null && data.data && data.data.length > 0) {
                        data.data.forEach((val) => {
                            if (val.parentId != null && val.type != 'course_type') {
                                // 只需要课程，不需要课程类型
                                this.courses.push({
                                    value: val.value,
                                    name: val.name
                                });
                            }
                            if (this.courses.length == 0) {
                                this.emptyText = this.$store.state.lang.base.nodata || '暂无数据'
                                this.emptyTextCatalogTree = this.$store.state.lang.base.nodata || '暂无数据'
                            }
                        })
                        if (!this.courseValue) { //新增
                            if (this.courses.length > 0) {
                                //根据年度和学期查询任教班级和课程（年度学期可以为不必填项）-如果没有的话默认选中第一个学科
                                getCourseNameClass({
                                    year: this.year ? this.year : undefined,
                                    schoolTerm: this.term
                                }).then((res) => {
                                    if (res && res.status === 200 && res.data && res.data.length > 0) {
                                        for (let i = 0; i < res.data.length; i++) {
                                            for (let o = 0; o < this.courses.length; o++) {
                                                if (res.data[i].courseValue == this.courses[o].value) {
                                                    this.courseValue = this.courses[o].value;
                                                    this.curIndex = o
                                                    this.getCataloglList({
                                                        courseValue: this.courseValue,
                                                        gradeValue: this.gradeValue,
                                                        schooltermType: this.term
                                                    })
                                                    return false
                                                }
                                            }
                                        }
                                    } else {
                                        this.curIndex = 0
                                        if (this.courses.length > 0) {
                                            this.courseValue = this.courses[0].value
                                            this.getCataloglList({
                                                courseValue: this.courseValue,
                                                gradeValue: this.gradeValue,
                                                schooltermType: this.term
                                            })
                                        }
                                    }
                                })
                            }
                        } else {
                            if (this.courseValue) {
                                this.getCataloglList({
                                    courseValue: this.courseValue,
                                    gradeValue: this.gradeValue,
                                    schooltermType: this.term
                                })
                            }
                        }
                    } else {
                        this.emptyText = this.$store.state.lang.base.nodata || "暂无数据"
                    }
                })

            }
        },
        //点击课程获得编目
        courseName(courseValue, index) {
            this.curIndex = index;
            this.courseValue = courseValue;
            this.getCataloglList({
                courseValue: this.courseValue,
                gradeValue: this.gradeValue,
                schooltermType: this.term
            })
        },
        /* 获得编目 */
        getCataloglList(params) {
            this.defaultChecked = [];
            this.emptyTextCatalogTree = this.$store.state.lang.rc.t37 || '正在加载中...'
            let arr = []
            getCataloglList(params).then((res) => {
                if (res && res.status == 200 && res.data && res.data.length > 0) {
                    res.data.forEach((_val) => {
                        if (_val.parentId != null) {
                            arr.push({
                                name: _val.name,
                                id: _val.id,
                                parentId: _val.parentId,
                                children: [],
                                schooltermType: _val.schooltermType,
                                stageId: _val.stageId,
                                path: _val.path,
                                courseValue: _val.courseValue,
                                gradeValue: _val.gradeValue,
                                nocheck: _val.path.split("/").length > 2 ? false : true
                            })
                        }
                    })
                    this.catalogTreeData = arr;
                    if (this.catalogTreeData.length == 0) {
                        this.emptyTextCatalogTree = this.$store.state.lang.base.nodata || '暂无数据'
                        return false
                    }
                    if (this.treeNode == undefined) { //刚刚进入编目还没有做任何选择操作
                        this.defaultChecked = [];
                    } else {
                        // 修改编目时设置默然选中项
                        this.catalogTreeData.forEach((val) => {
                            if (val.id == this.treeNode.id) {
                                this.defaultChecked.push(this.treeNode.id);
                            }
                        })
                    }
                } else {
                    this.emptyTextCatalogTree = this.$store.state.lang.base.nodata || '暂无数据'
                }
            })
        },
        //选择编目
        checkedCourses(val) {
            this.treeNode = val.allCeckNodes[0]; //保存当前选中的编目
        },
        //确定并关闭选择编目dialog
        submitCourses() {
            if (this.treeNode == undefined) {
                this.catalog = this.$store.state.lang.rc.t35 || "点击选择";
                this.catalogId = "";
                this.isShowCatalogError = true
            } else {
                this.isShowCatalogError = false
                this.catalog = this.treeNode.name;
                this.catalogId = this.treeNode.id;
                this.schooltermType = this.treeNode.schooltermType;
                this.stageId = this.treeNode.stageId;
            }
            this.addNewBtn = true
            //关闭dialog
            this.coursesDialog = false;
        },
        // 切换资源类型---判断删除按钮是否禁用
        resourceTypeChange(index) {
            if (this.tableData1[index].resourceType != this.rcTypess[0].value) {
                this.tableData1[index].deleteColumnDisabled = false;
            } else {
                if (this.tableData1.length > 1) {
                    this.tableData1[index].deleteColumnDisabled = false;
                } else {
                    this.tableData1[index].deleteColumnDisabled = true;
                }
            }
        },
        //选择知识点dialog
        choseNnowledge(i) {
            this.addNewBtn = false
            if (this.gradeValue) {
                this.choseNnowledgelDialog = true;
                this.tableDataIndexKnowledge = i;
                this.knowpointTree = [];
                this.emptyText = this.$store.state.lang.rc.t37 || "正在加载中...";
                getKnowpointTree({
                    unitId: this.$store.state.unitId,
                    gradeValue: this.gradeValue,
                    courseValue: this.courseValue
                }).then((res) => {
                    this.nowledgelTreeData = [];
                    if (res && res.code == 'ok' && res.data && res.data.length > 0) {
                        res.data.forEach((_data) => {
                            if (_data.parentPointId != null) {
                                this.nowledgelTreeData.push({
                                    id: _data.id,
                                    name: _data.name,
                                    parentId: _data.parentPointId,
                                    children: [],
                                })
                            } else {
                                this.nowledgelTreeData.push({
                                    id: _data.id,
                                    name: _data.name,
                                    parentId: _data.parentPointId,
                                    children: [],
                                    nocheck: true,
                                })
                            }
                        })
                        if (!this.tableData1[this.tableDataIndexKnowledge].knowledge) {
                            this.nowledgelChecked = [];
                        } else {
                            this.nowledgelChecked.push(this.tableData1[this.tableDataIndexKnowledge].knowledgeId);
                        }
                    } else {
                        this.emptyText = this.$store.state.lang.base.nodata || "暂无数据";
                    }
                });
            } else {
                this.$notify.info({
                    message: this.$store.state.lang.rc.t53 || '请先选择编目才能选择知识点'
                });
            }
        },
        //选择知识点
        checkedNode(node) {
            this.tableData1[this.tableDataIndexKnowledge].currentNode = node.allCeckNodes[0];
        },
        //关闭选择知识点dialog
        submitNnowledge() {
            if (this.tableData1[this.tableDataIndexKnowledge].currentNode == undefined) {
                this.tableData1[this.tableDataIndexKnowledge].knowledge = this.$store.state.lang.rc.t35;
                this.tableData1[this.tableDataIndexKnowledge].knowledgeId = "";
                this.$notify.info({
                    message: this.$store.state.lang.rc.t54 || '您没有选择知识点'
                });
            } else {
                if (JSON.stringify(this.tableData1[this.tableDataIndexKnowledge].currentNode) != "{}") {
                    this.tableData1[this.tableDataIndexKnowledge].knowledge = this.tableData1[this.tableDataIndexKnowledge].currentNode.name;
                    this.tableData1[this.tableDataIndexKnowledge].knowledgeId = this.tableData1[this.tableDataIndexKnowledge].currentNode.id;
                }
            }
            if (this.tableData1[this.tableDataIndexKnowledge].knowledge != this.$store.state.lang.rc.t35) {
                this.tableData1[this.tableDataIndexKnowledge].deleteColumnDisabled = false;
            } else {
                this.tableData1[this.tableDataIndexKnowledge].deleteColumnDisabled = true;
            }

            this.choseNnowledgelDialog = false;
            this.addNewBtn = true
        },
        /********************************************************************上传begin********************************************************************/
        //资源名称的验证
        rcFileNameKeyupEnter(index) {
            if (this.tableData1[index].fileName) {
                if (!this.rcName) {
                    this.rcName = this.tableData1[index].fileName
                }
                this.tableData1[index].isShowRcFileNameError = false;
                for (let i = 0; i < this.tableData1.length; i++) {
                    if (index != i) {
                        //资源列表中的资源名称不能重复
                        if (this.tableData1[index].fileName === this.tableData1[i].fileName) {
                            this.tableData1[index].isShowRcFileNameError = true;
                            this.tableData1[index].rcFileNameErrorText = this.$store.state.lang.rc.t55 || '重复'
                            break
                        } else {
                            this.tableData1[index].isShowRcFileNameError = false;
                            this.tableData1[index].deleteColumnDisabled = false;
                        }
                    }
                }
            } else {
                this.tableData1[index].isShowRcFileNameError = true;
                this.tableData1[index].rcFileNameErrorText = this.$store.state.lang.rc.t39 || '为空!';
            }
        },
        //获得当前选中的行
        handleuPLOAD(i) {
            this.tableDataIndex = i * 1 + 1 + '';
            if (this.tableData1[this.tableDataIndex - 1].isShowProgress) {
                this.tableData1[this.tableDataIndex - 1].isShowProgress = true;
            } else {
                this.tableData1[this.tableDataIndex - 1].isShowProgress = false;
            }
            if (this.tableData1[this.tableDataIndex - 1].isErrorProgress) {
                this.tableData1[this.tableDataIndex - 1].isErrorProgress = true
            } else {
                this.tableData1[this.tableDataIndex - 1].isErrorProgress = false
            }
        },
        // 上传之前
        beforeUpload(file) {
            if (/\.[^\.]+$/.exec(file.name)[0]!='.mp4') {
                this.tableData1[this.tableDataKeys[file.uid + ''] - 1].isShowfileNameError = true;
                this.tableData1[this.tableDataKeys[file.uid + ''] - 1].fileNameErrorText = this.$store.state.lang.rc.t56 || "禁止上传此类型文件,只能上传mp4格式的文件";

                this.tableData1[this.tableDataKeys[file.uid + ''] - 1].isUploadBtn = false;
                this.tableData1[this.tableDataKeys[file.uid + ''] - 1].isProgress = false;
                this.tableData1[this.tableDataKeys[file.uid + ''] - 1].isErrorProgress = true;
                return false;
            }
            if (this.uploadFileSize < file.size / 1048576.0) {
                this.tableData1[this.tableDataKeys[file.uid + ''] - 1].isErrorProgress = true;
                this.tableData1[this.tableDataKeys[file.uid + ''] - 1].isShowfileNameError = true;
                this.tableData1[this.tableDataKeys[file.uid + ''] - 1].isProgress = false;
                this.tableData1[this.tableDataKeys[file.uid + ''] - 1].fileNameErrorText = (this.$store.state.lang.rc.t57 || '上传的资源已超过设置的最大上传') + this.uploadFileSize + 'MB';
                return false;
            }
        },
        submitUpload(ref) {
            let arr = [];
            arr.push(this.$refs[ref][0].uploadFiles[this.$refs[ref][0].uploadFiles.length - 1])
            this.$refs[ref][0].uploadFiles = arr
            this.$refs[ref][0].submit();
            this.tableData1[ref.split("_")[1]].percentage = 0 + '%'
            this.tableData1[ref.split("_")[1]].isShowProgress = false;
            this.tableData1[ref.split("_")[1]].isUploadBtn = false;
        },
        //导入文件改变， 资源名称改变
        onChange(file, fileList) {
            if (!this.tableDataKeys[file.uid + ''] && !this.isScuessUpload[file.uid + '']) {
                this.tableDataKeys[file.uid + ''] = this.tableDataIndex;
                this.tableData1[this.tableDataKeys[file.uid + ''] - 1].uploadValue = file.name;
                this.tableData1[this.tableDataKeys[file.uid + ''] - 1].isShowfileNameError = false;
                this.tableData1[this.tableDataKeys[file.uid + ''] - 1].isUploadBtn = true;
                this.tableData1[this.tableDataKeys[file.uid + ''] - 1].isProgress = false;
                this.tableData1[this.tableDataKeys[file.uid + ''] - 1].isErrorProgress = false
                this.tableData1[this.tableDataKeys[file.uid + ''] - 1].isShowProgress = false;
                if (this.tableData1[this.tableDataKeys[file.uid + ''] - 1].uploadValue) {
                    this.tableData1[this.tableDataKeys[file.uid + ''] - 1].deleteColumnDisabled = false; //删除按钮出现
                }
                return
            }
        },
        // 上传的进度
        onProgress(event, file) {
            this.isScuessUpload[file.uid + ''] = false;
            this.tableData1[this.tableDataKeys[file.uid + ''] - 1].percentage = Math.round(file.percentage) + '%';
            this.tableData1[this.tableDataKeys[file.uid + ''] - 1].isShowProgress = false;
            this.tableData1[this.tableDataKeys[file.uid + ''] - 1].isProgress = true;
            this.tableData1[this.tableDataKeys[file.uid + ''] - 1].isUploadBtn = false;
        },
        // 上传成功
        onSuccess(response, file, fileList) {
            this.tableData1[this.tableDataKeys[file.uid + ''] - 1].isShowProgress = true;
            if (response && response.status == '200') {
                this.isScuessUpload[file.uid + ''] = true;
                if (response.data) {
                    this.tableData1[this.tableDataKeys[file.uid + ''] - 1].fileId = response.data.id;
                    this.tableData1[this.tableDataKeys[file.uid + ''] - 1].fileType = response.data.fileType;
                    this.tableData1[this.tableDataKeys[file.uid + ''] - 1].suffix = response.data.suffix;
                    this.tableData1[this.tableDataKeys[file.uid + ''] - 1].fileSize = response.data.fileSize;
                    this.$notify({
                        message: this.$store.state.lang.rc.t18 || '上传成功！',
                        type: 'success'
                    });
                    this.tableData1[this.tableDataKeys[file.uid + ''] - 1].isShowfileNameError = false;
                    this.tableData1[this.tableDataKeys[file.uid + ''] - 1].isShowRcFileNameError = false;
                    // 如果资源名称为空的话，上传成功后将上传的资源名称作为资源名称
                    if (!this.tableData1[this.tableDataKeys[file.uid + ''] - 1].fileName) {
                        this.tableData1[this.tableDataKeys[file.uid + ''] - 1].fileName = file.name;
                    }
                    // 如果上传的资源的名称大于50个字就提示出来
                    if (this.tableData1[this.tableDataKeys[file.uid + ''] - 1].fileName.length > 50) {
                        this.tableData1[this.tableDataKeys[file.uid + ''] - 1].isShowRcFileNameError = true;
                        this.tableData1[this.tableDataKeys[file.uid + ''] - 1].rcFileNameErrorText = this.$store.state.lang.rc.t58 || '超过50个字';
                    }
                    //  如果上传完资源---在资源属性中标题是空的，则将资源名称的名字作为标题，如果已经有标题，则保持标题不变
                    if (!this.rcName) {
                        this.rcName = (this.tableData1[this.tableDataKeys[file.uid + ''] - 1].fileName).match(/(.*)\.[^.]+/)[1]
                        // 当已经触发了校验，那上传成功之后可以将检验提示的错误信息去掉
                        this.isShowRcNameError = false
                    }
                    // 上传成功的图标出现
                    this.tableData1[this.tableDataKeys[file.uid + ''] - 1].isShowProgress = true;
                }
            } else {
                this.tableData1[this.tableDataIndex - 1].isProgress = false;
                this.tableData1[this.tableDataKeys[file.uid + ''] - 1].isErrorProgress = true;
                this.tableData1[this.tableDataKeys[file.uid + ''] - 1].fileName = "";
            }
            // 如果有资源名称，或者上传过资源的话，那么将删除按钮激活，当这有一条信息时删除就是清空该条数据的内容
            if (this.tableData1[this.tableDataKeys[file.uid + ''] - 1].fileName) {
                this.tableData1[this.tableDataKeys[file.uid + ''] - 1].deleteColumnDisabled = false;
            } else {
                this.tableData1[this.tableDataKeys[file.uid + ''] - 1].deleteColumnDisabled = true;
            }
        },
        /********************************************************************上传  end********************************************************************/
        //删除
        deleteColumn(column) {
            // 删除行的下标
            this.column = column;
            this.deleteColumnDialog = true;
        },
        // 确认删除
        submitDeleteColumn() {
            this.uploadText = this.$store.state.lang.rc.t45 || '添加'
            if (this.$refs[`upload_${this.column}`][this.column]) {
                this.$refs[`upload_${this.column}`][this.column].abort() //清除正在上传的文件
            }
            // 初始化错误信息
            this.tableData1[this.column].isShowfileNameError = false;
            this.tableData1[this.column].fileNameErrorText = this.$store.state.lang.rc.t59 || '请先上传文件!';
            this.tableData1[this.column].deleteColumnDisabled = true;
            this.tableData1[this.column].isUploadBtn = true;
            this.tableData1[this.column].isErrorProgress = false;
            this.tableData1[this.column].isProgress = false;
            if (this.tableData1.length > 1) {
                this.tableData1.splice(this.column, 1);
                // 如果上传资源条数小于上传限制的条数，则可以新增，新增按钮是不禁用的
                if (this.tableData1.length < this.uploadNumber) {
                    this.addColumnDisabled = false;
                };
                if (this.tableData1.length == 1) { //多个资源列表在删除倒数第二个时，看倒数第一个的资源情况决定最后一个资源的删除按钮是否禁用
                    if (this.column != 0) { //如果删除不是资源列表的第一行
                        if (
                            this.tableData1[this.column - 1].resourceType != this.rcTypess[0].value ||
                            this.tableData1[this.column - 1].knowledge ||
                            this.tableData1[this.column - 1].fileAuthor ||
                            this.tableData1[this.column - 1].fileName ||
                            this.tableData1[this.column - 1].uploadValue
                        ) {
                            this.tableData1[this.column - 1].deleteColumnDisabled = false;
                        } else {
                            this.tableData1[this.column - 1].deleteColumnDisabled = true;
                        }
                    } else { //如果删除的刚好是资源列表的第一行
                        if (
                            this.tableData1[this.column].resourceType != this.rcTypess[0].value ||
                            this.tableData1[this.column].knowledge ||
                            this.tableData1[this.column].fileAuthor ||
                            this.tableData1[this.column].fileName ||
                            this.tableData1[this.column].uploadValue
                        ) {
                            this.tableData1[this.column].deleteColumnDisabled = false;
                        } else {
                            this.tableData1[this.column].deleteColumnDisabled = true;
                        }
                    }
                }
            } else if (this.tableData1.length == 1) {
                if (
                    this.tableData1[this.column].resourceType != this.rcTypess[0].value ||
                    this.tableData1[this.column].knowledge ||
                    this.tableData1[this.column].fileAuthor ||
                    this.tableData1[this.column].fileName ||
                    this.tableData1[this.column].uploadValue
                ) {
                    // 初始化数据
                    this.tableData1[this.column].resourceType = this.rcTypess[0].value;
                    this.tableData1[this.column].knowledge = this.$store.state.lang.rc.t35;
                    this.tableData1[this.column].fileAuthor = "";
                    this.tableData1[this.column].fileName = "";
                    this.tableData1[this.column].uploadValue = "";
                    this.tableData1[this.column].fileId = "";
                    this.tableData1[this.column].fileType = "";
                    this.tableData1[this.column].suffix = "";
                    this.tableData1[this.column].fileSize = "";
                }
            }
            this.deleteColumnDialog = false;
        },
        //增加上传资源列表
        addColumn() {
            this.tableData1[this.tableData1.length - 1].deleteColumnDisabled = false;
            let last = this.tableData1[this.tableData1.length - 1];
            if (this.tableData1.length < this.uploadNumber) {
                this.addColumnDisabled = false;
                this.tableData1.push({
                    resourceType: last ? last.resourceType : '',
                    knowledge: this.$store.state.lang.rc.t35,
                    fileAuthor: '',
                    fileName: '',
                    knowledgeId: '',
                    uploadValue: '',
                    percentage: '0',
                    isShowProgress: false,
                    isShow: false,
                    fileId: '', //附件ID
                    fileType: '', //附件类型
                    suffix: '', //附件后缀名
                    fileSize: '', //附件大小
                    isShowResourceTypeError: false,
                    isShowRcFileNameError: false,
                    isShowfileNameError: false,
                    resourceTypeErrorText: this.$store.state.lang.rc.t38 || '资源分类不能为空！',
                    rcFileNameErrorText: this.$store.state.lang.rc.t39 || '为空！',
                    isUploadBtn: true,
                    isErrorProgress: false,
                    isProgress: false,
                    fileNameErrorText: this.$store.state.lang.rc.t59 || '请先上传文件!'
                });
                if (this.tableData1.length == this.uploadNumber) {
                    this.addColumnDisabled = true;
                    this.uploadText = this.$store.state.lang.rc.t60 || '已达最大增加数'
                    this.$notify.info({
                        message: (this.$store.state.lang.rc.t61 || '已达到增加资源的最大') + this.uploadNumber + (this.$store.state.lang.rc.t62 || '条限制条数'),
                    });
                }
            }
        },
        //选择上传人
        choseUploadUser() {
            let _m = [];
            _m.push(this.userId);
            this.$SelectUsers({
                lang: this.$store.state.langType,
                selectUserType: 2, //选择的类型，是学生还是老师
                unitId: this.$store.state.unitId,
                selectUserIds: _m //设置默认的选中值
            }, (selectUsers, instance) => {
                if (selectUsers.length > 1) {
                    this.$notify({
                        message: this.$store.state.lang.rc.t62 || '最多选择一个上传人！',
                        type: 'warning'
                    });
                    return true
                } else {
                    if (selectUsers.length == 1) {
                        this.authorName = selectUsers[0].realName;
                        this.userId = selectUsers[0].id
                        this.isShowAuthorNameError = false;
                    } else {
                        this.userId = "";
                        this.authorName = this.$store.state.lang.rc.t35;
                        this.isShowAuthorNameError = true;
                    }
                }
            })
        },
        //选择已有标签
        getLabelList() {
            this.labels = [];
            this.emptyText = this.$store.state.lang.rc.t37 || "正在加载中..."
            getLabelList().then((res) => {
                if (res && res.status == '200' && res.data && res.data.length > 0) {
                    let lablesNameArr = [];
                    let lablesIdArr = [];
                    res.data.forEach((val) => {
                        this.labels.push({
                            id: val.id,
                            name: val.name
                        });
                        if (this.checkList && this.checkList.length > 0) {
                            this.checkList.forEach((index) => {
                                if (index == val.id) {
                                    lablesNameArr.push(val.name);
                                    lablesIdArr.push(val.id);
                                }
                            })
                        }
                    })
                    this.labelName = lablesNameArr.join(",");
                    this.label = lablesIdArr.join(",");
                } else {
                    this.emptyText = this.$store.state.lang.base.nodata || "暂无数据"
                }
                this.addNewBtn = false;
            })
        },
        //打开选择标签dialog
        choseLabel() {
            this.choseLabelDialog = true;
            this.getLabelList();
        },
        //关闭选择标签dialog
        submitLabel() {
            let arr = [];
            if (this.checkList && this.checkList.length > 0) {
                this.checkList.forEach((val) => {
                    arr.push(_.find(this.labels, {
                        id: val
                    }));
                })
                this.labelName = _.map(arr, 'name').join(",");
                this.label = this.checkList.join(",");
                this.choseLabelDialog = false;
            } else {
                this.labelName = "";
                this.label = "";
                this.choseLabelDialog = false;
                this.$notify.info({
                    message: this.$store.state.lang.rc.t63 || '您没有选择任何标签',
                });
            }
        },

        _init() { //清空数据
            this.treeNode = undefined;
            this.curIndex = 0;
            if (!this.cValue) {
                this.courseValue = ""
            }
            if (!this.cId) {
                this.catalog = this.$store.state.lang.rc.t35;
                this.catalogId = "";
            }
            this.defaultChecked = [];
            this.nowledgelChecked = [];
            this.tableData1 = [];
            this.tableData1.push({
                resourceType: this.rcTypess.length > 0 ? this.rcTypess[0].value : '',
                knowledge: this.$store.state.lang.rc.t35,
                knowledgeId: '',
                fileAuthor: '',
                fileName: '',
                uploadValue: '',
                percentage: '0',
                isShowProgress: false,
                isShow: false,
                fileId: '', //附件ID
                fileType: '', //附件类型
                suffix: '', //附件后缀名
                fileSize: '', //附件大小
                deleteColumnDisabled: '',
                //错误提示
                isShowResourceTypeError: false,
                isShowRcFileNameError: false,
                isShowfileNameError: false,
                resourceTypeErrorText: this.$store.state.lang.rc.t38 || '资源分类不能为空！',
                rcFileNameErrorText: this.$store.state.lang.rc.t39 || '为空！',
                isUploadBtn: true,
                isErrorProgress: false,
                isProgress: false,
                fileNameErrorText: this.$store.state.lang.rc.t59 || '请先上传文件!'
            });
            // 第三步
            this.rcName = ''; //标题
            this.authorName = this.$store.state.realName;
            this.labelName = this.$store.state.lang.rc.t52 || "点击选择已有标签"; //选中的已有标签
            this.checkList = [];
            this.label = '';
            this.labels = []; //选择已有标签
            this.tag = '';
            this.jianjie = '';
            this.authorName = this.$store.state.realName ? this.$store.state.realName : (this.$store.state.lang.rc.t51 || '点击选择(只能有一个上传人)'); //上传人
            this.userId = this.$store.state.userId ? this.$store.state.userId : '';
            this.downloadControl = '0'
        },
        //基础型资源保存
        saveBaseRc(parms, t) {
            saveBaseRc(parms, t).then((res) => {
                if (res == 'error' || res.status != '200') {
                    this.$notify.error({
                        message: this.$store.state.lang.rc.t64 || '上传资源出错'
                    });
                } else if (res.status == '200') {
                    this.$notify({
                        message: this.$store.state.lang.rc.t65 || '提交并上传成功',
                        type: 'success'
                    });
                    this.$emit("upload-submit", { id: res.data, name: this.rcName })
                }
            })
        },
        //验证数据
        uploadValidate() {
            if (this.catalog == this.$store.state.lang.rc.t35) {
                this.isShowCatalogError = true;
            };
            if (!this.rcName) {
                this.isShowRcNameError = true;
            };
            if (this.authorName == this.$store.state.lang.rc.t35) {
                this.isShowAuthorNameError = true;
            };
            let fileJson = {}
            this.tableData1.forEach((val, i) => {
                if (!val.resourceType) {
                    this.tableData1[i].isShowResourceTypeError = true;
                };
                if (!val.fileName) {
                    this.tableData1[i].isShowRcFileNameError = true;
                } else if (val.fileName.length > 50) {
                    this.tableData1[i].isShowRcFileNameError = true;
                    this.tableData1[i].rcFileNameErrorText = this.$store.state.lang.rc.t58 || '超过50个字'
                }
                if (!val.fileId) {
                    this.tableData1[i].isShowfileNameError = true;
                }
                fileJson["files[" + i + "].resourceType"] = val.resourceType;
                fileJson["files[" + i + "].fileName"] = val.fileName;
                fileJson["files[" + i + "].fileId"] = val.fileId;
                fileJson["files[" + i + "].suffix"] = val.suffix;
                fileJson["files[" + i + "].fileType"] = val.fileType;
                fileJson["files[" + i + "].fileSize"] = val.fileSize;
                fileJson["files[" + i + "].knowledgeId"] = val.knowledgeId; //知识点不必填
                fileJson["files[" + i + "].fileAuthor"] = val.fileAuthor; //作者不必填
            });
            let resourceJson = {
                courseType: this.courseType,
                publicId: this.courseType,
                catalogId: this.catalogId,
                gradeValue: this.gradeValue,
                courseValue: this.courseValue,
                termValue: this.schooltermType,
                stageId: this.stageId,
                "detailedVM.brief": this.jianjie ? this.jianjie : '',
                createUser: this.userId,
                userName: this.authorName,
                resTag: this.tag,
                labels: this.label,
                name: this.rcName,
                "detailedVM.downloadControl": this.downloadControl,
                sharedScope: this.sharedScope,
                appId: this.$route.query.topicId,
                appPk: this.$route.query.appPk,
                ...fileJson
            };
            let s = 0
            if (this.rcName &&
                this.authorName) {
                for (let i = 0; i < this.tableData1.length; i++) {
                    if (
                        this.tableData1[i].resourceType &&
                        this.tableData1[i].fileName && this.tableData1[i].fileName.length <= 50 &&
                        this.tableData1[i].fileId) {
                        s++
                    }
                }
            }
            if (s == this.tableData1.length) {
                if (this.catalog != this.$store.state.lang.rc.t35) {
                    return resourceJson
                }
            }
        },
        //提交
        submitAndUpload() {
            let resourceJson = this.uploadValidate();
            if (resourceJson) {
                this.saveBaseRc(resourceJson);
            }
        },
    }
}