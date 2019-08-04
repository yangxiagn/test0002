<template>
    <div class="app-container-box">
        <sy-grad-4>
            <div slot="headerRight">
                <el-row>
                    <el-col :span="18">
                        <el-tabs v-model="activeName" @tab-click="handleClickTab">
                            <el-tab-pane :label="$store.state.lang.base.auth.first" name="first"></el-tab-pane>
                            <el-tab-pane :label="$store.state.lang.base.auth.second" name="second"></el-tab-pane>
                        </el-tabs>
                    </el-col>
                    <el-col :span="6" style="line-height: 40px;" class="right">
                        <el-button v-if="activeName == 'second'" type="primary" @click="handleClickRolesTabele('add')">{{$store.state.lang.button.add}}</el-button>
                    </el-col>
                </el-row>
            </div>
            <div slot="bodyRight">
                <sy-grad-4 v-if="activeName == 'first'">
                    <div slot="headerRight" style="padding-top: 5px;">
                        <el-select v-model="authType" placeholder="" @change="handleChangeType">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="$store.state.lang.base.auth[item.value]"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <el-button v-if="authType == '1'" style="margin-left: 10px;" type="" @click="handleSeacher">{{$store.state.lang.base.auth.txt}}</el-button>
                    </div>
                    <div slot="bodyLeft">
                        <div v-if="authType != '1'" style="height: 100%;">
                            <div v-if="authType == 'user'" style="height: 100%;overflow:auto;">
                                <el-tree
                                    v-if="authType == 'user'"
                                    :data="userTreeData"
                                    highlight-current
                                    style="border: 0;height: 100%;"
                                    node-key="id"
                                    ref="usersss"
                                    :load="handleUserNodeClick"
                                    :default-expanded-keys="[]"
                                    @node-click="handleUserNodeClick"
                                    :props="defaultProps">
                                </el-tree>
                            </div>
                            <div v-if="authType == 'role'" style="height: 100%;overflow:auto;">
                                <el-tree
                                    v-if="authType == 'role'"
                                    :data="roleListTreeData"
                                    highlight-current
                                    ref="rolesss"
                                    style="border: 0;height: 100%;"
                                    node-key="id" 
                                    :default-expanded-keys="['root_unit']"
                                    @node-click="handleRoleNodeClick"
                                    :props="defaultProps">
                                </el-tree>
                            </div>
                            <div v-if="authType == 'unit'" style="height: 100%;overflow:auto;">
                                <el-tree
                                    v-if="authType == 'unit'"
                                    :data="unitData"
                                    highlight-current
                                    ref="unitsss"
                                    style="border: 0;height: 100%;"
                                    node-key="id"
                                    :default-expanded-keys="['root_unit']"
                                    @node-click="handleNodeClick"
                                    :props="defaultProps">
                                </el-tree>
                            </div>
                        </div>
                        <el-tree
                            v-if="authType == '1'"
                            :data="treeData"
                            ref="rcTree"
                            style="border: 0;height: 100%;"
                            show-checkbox
                            node-key="id"
                            default-expand-all
                            @check-change="handleCheckChange"
                            :props="defaultProps">
                        </el-tree>
                    </div>
                    <div slot="bodyRight" style="overflow: auto;">
                        <div v-if="authType == '1'" style="padding: 10px;">
                            <el-card class="box-card" :body-style="{padding: '10px'}">
                                <div slot="header">
                                    <span style="line-height: 36px;">{{$store.state.lang.base.auth.roleName}}</span>
                                </div>
                                <div class="sy-edu-click" @click="handleSelect(rcForm.role, 'role')">
                                    <span v-if="rcForm.role.length == 0" class="sy-edu-click-info-msg">{{$store.state.lang.base.auth.info4}}</span>
                                    <div v-else>
                                        <sy-tag hover-close :closable="true"
                                            style="margin:5px;color:#333"
                                            type="gray"
                                            v-for="(tag,index) in rcForm.role"
                                            @close.stop="handleRemove(rcForm.role,index)"
                                            :key="tag.id">
                                            {{tag.name}}
                                        </sy-tag>
                                    </div>
                                </div>
                            </el-card>
                            <el-card class="box-card" :body-style="{padding: '10px'}">
                                <div slot="header">
                                    <span style="line-height: 36px;">{{$store.state.lang.base.auth.txt1}}</span>
                                </div>
                                <div class="sy-edu-click" @click="handleSelect(rcForm.unit, 'unit')">
                                    <span v-if="rcForm.unit.length == 0" class="sy-edu-click-info-msg">{{$store.state.lang.base.auth.info4}}</span>
                                    <div v-else>
                                        <sy-tag hover-close :closable="true"
                                            style="margin:5px;color:#333"
                                            type="gray"
                                            v-for="(tag,index) in rcForm.unit"
                                            @close.stop="handleRemove(rcForm.unit,index)"
                                            :key="tag.id">
                                            {{tag.name}}
                                        </sy-tag>
                                    </div>
                                </div>
                            </el-card>
                            <el-card class="box-card" :body-style="{padding: '10px'}">
                                <div slot="header">
                                    <span style="line-height: 36px;">{{$store.state.lang.header.personal}}</span>
                                </div>
                                <div class="sy-edu-click" @click="handleSelect(rcForm.user, 'user')">
                                    <span v-if="rcForm.user.length == 0" class="sy-edu-click-info-msg">{{$store.state.lang.base.auth.info4}}</span>
                                    <div v-else>
                                        <sy-tag hover-close :closable="true"
                                            style="margin:5px;color:#333"
                                            type="gray"
                                            v-for="(tag,index) in rcForm.user"
                                            @close.stop="handleRemove(rcForm.user,index)"
                                            :key="tag.id">
                                            {{tag.name}}
                                        </sy-tag>
                                    </div>
                                </div>
                            </el-card>
                            <div >
                                <el-button type="primary" style="width: 100px;" :loading="saveLoading" @click="save">{{$store.state.lang.button.ok}}</el-button>
                            </div>
                        </div>
                        <div v-if="authType != '1'">
                            <el-tree
                                :data="treeData"
                                ref="rcTree"
                                style="border: 0;height: 100%;"
                                show-checkbox
                                node-key="id"
                                default-expand-all
                                @check-change="handleCheckChange"
                                :props="defaultProps">
                            </el-tree>
                        </div>
                    </div>
                    <div slot="footer" v-if="authType != '1'" class="center">
                        <el-button type="primary" style="width: 100px;" :loading="saveLoading" @click="save" :disabled="radioID == ''">{{$store.state.lang.button.ok}}</el-button>
                    </div>
                </sy-grad-4>
                <sy-grad-4 v-if="activeName == 'second'">
                    <div slot="bodyRight" style="padding: 10px;">
                        <el-table ref="multipleTable"
                            :data="roleList"
                            border
                            tooltip-effect="dark"
                            height="100%"
                            style="width: 100%;height: 100%;"
                            @selection-change="handleSelectionChange">
                            <el-table-column type="selection" width="45" align="center"></el-table-column>
                            <el-table-column type="index" :label="$store.state.lang.base.auth.sort" width="45" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="name" :label="$store.state.lang.base.auth.name" width="150" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="roleType" :label="$store.state.lang.base.auth.roleType" width="100" align="center" show-overflow-tooltip>
                                <template scope="scope">{{ scope.row.roleType == 0 ? $store.state.lang.base.auth.info1 : $store.state.lang.base.auth.info2 }}</template>
                            </el-table-column>
                            <el-table-column prop="status" :label="$store.state.lang.base.auth.status" width="80" align="center" show-overflow-tooltip>
                                <template scope="scope">{{ scope.row.status == 1 ? $store.state.lang.base.auth.active : $store.state.lang.base.auth.lock }}</template>
                            </el-table-column>
                            <el-table-column prop="memo" :label="$store.state.lang.base.auth.memo" width="" align="left" header-align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column :label="$store.state.lang.base.ctr" width="150" align="center">
                                <template scope="scope">
                                    <el-button type="text" @click="handleClickRolesTabele('w', scope.row, scope.$index)">{{$store.state.lang.button.users}}</el-button>
                                    <el-button type="text" @click="handleClickRolesTabele('e', scope.row, scope.$index)">{{$store.state.lang.button.edit}}</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div slot="footer">
                        <el-button :disabled="multipleSelection.length == 0" :loading="deleteBtn" type="danger" @click="handleClickRolesTabele('d')">{{$store.state.lang.button.delete}}</el-button>
                        <el-button :disabled="multipleSelection.length == 0" type="" @click="handleClickRolesTabele('a')">{{$store.state.lang.base.auth.auth}}</el-button>
                        <el-button :disabled="multipleSelection.length == 0" type="" @click="handleClickRolesTabele('lock')">{{$store.state.lang.base.auth.lock}}</el-button>
                        <el-button :disabled="multipleSelection.length == 0" type="" @click="handleClickRolesTabele('active')">{{$store.state.lang.base.auth.active}}</el-button>
                    </div>
                </sy-grad-4>
            </div>
        </sy-grad-4>
        <sy-dialog :title="$store.state.lang.base.auth.txt2" height="auto" width="400px"
            :visible.sync="roleDialogVisibale">
            <div slot="body" style="padding: 10px;" v-loading="dialogLoading">
                <el-table :data="roleList" ref="multipleTable1" border stripe
                    @selection-change="handleSelectionChange1" :height="roleList.length>10 ? '400' : ''" style="width: 100%">
					<el-table-column type="selection" width="55" align="center"></el-table-column>
					<el-table-column prop="name" :label="$store.state.lang.base.auth.name" align="center"></el-table-column>
					<el-table-column prop="memo" :label="$store.state.lang.base.auth.memo"  align="left" header-align="center"></el-table-column>
				</el-table>
            </div>
            <div slot="footer" style="line-height: 34px;">
                <el-button type="" size="small" @click="roleDialogVisibale = false">{{$store.state.lang.button.cancel}}</el-button>
                <el-button type="primary" size="small" @click="submitData('role')">{{$store.state.lang.button.ok}}</el-button>
            </div>
        </sy-dialog>
        <sy-dialog :title="$store.state.lang.base.auth.txt3" height="500px" width="400px"
            :visible.sync="unitDialogVisibale">
            <div slot="body" style="padding: 10px;" v-loading="dialogLoading">
                <el-tree
                    v-if="authType == '1'"
                    :data="unitData"
                    ref="unitTree"
                    style="border: 0;height: 100%;"
                    show-checkbox
                    node-key="id"
                    default-expand-all
                    :props="defaultProps">
                </el-tree>
            </div>
            <div slot="footer">
                <el-button type="" size="small" @click="unitDialogVisibale = false">{{$store.state.lang.button.cancel}}</el-button>
                <el-button type="primary" size="small" @click="submitData('unit')">{{$store.state.lang.button.ok}}</el-button>
            </div>
        </sy-dialog>
        
        <sy-dialog :title="$store.state.lang.button.add"
            :close-on-click-modal="false"
            position="middle"
            height="auto"
            width="650px"
            slide="fade"
            :visible.sync="addNewRoleDialog">
            <div slot="body" style="height:434px;">
                <el-row class="sy-base-role-auth">
                    <el-col :span="15" style="border-right: 1px dashed #ccc;padding: 0 15px 0 10px;height:430px;">
                        <div class="tree-style" style="height:100%;width:100%;position: relative;overflow:hidden;">
                            <sy-grad-4 :border="false">
                                <div slot="headerRight" style="padding: 8px 0 0 0;background-color: #fff;">{{$store.state.lang.base.auth.info3}}</div>
                                <div slot="bodyRight" style="overflow-y:auto;background-color: #fff;">
                                    <el-form ref="form" :model="form" label-width="85px" :rules="rules">
                                        <el-form-item :label="$store.state.lang.base.auth.name+'：'" prop="name">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item :label="$store.state.lang.base.auth.info5+'：'">
                                            <div class="el-textarea__inner cp" @click="openSelects" style="resize: none;height: 90px;overflow-y: auto;"> 
                                                {{form.userNames || $store.state.lang.base.auth.info4}} 
                                            </div>
                                        </el-form-item>
                                        <el-form-item :label="$store.state.lang.base.auth.status+'：'">
                                            <el-radio-group v-model="form.status">
                                                <el-radio :label="1">{{$store.state.lang.base.yes}}</el-radio>
                                                <el-radio :label="0">{{$store.state.lang.base.no}}</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                        <el-form-item :label="$store.state.lang.base.auth.sort+'：'" prop="sort">
                                            <el-input v-model.number="form.sort" :maxlength="5" style="width:100%"></el-input>
                                        </el-form-item>
                                        <el-form-item :label="$store.state.lang.base.auth.memo+'：'" prop="memo">
                                            <el-input type="textarea" :rows="4" resize="none" placeholder="" v-model="form.memo"></el-input>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </sy-grad-4>
                        </div>
                    </el-col>
                    <el-col :span="9" style="padding: 0 0 0 15px;height:400px;">
                        <div class="tree-style" style="height:100%;width:100%;position: relative;overflow:hidden;">
                            <sy-grad-4 :border="false">
                                <div slot="headerRight" style="padding: 8px 0 0 0;background-color: #fff;">
                                    {{$store.state.lang.base.auth.auth}}
                                    <el-button type="" size="mini" style="float:right;" @click="changeExpande('unexpend')">{{$store.state.lang.base.auth.info6}}</el-button>                                
                                    <el-button type="" size="mini" style="float:right;margin-right:10px;" @click="changeExpande('expend')">{{$store.state.lang.base.auth.info7}}</el-button>
                                </div>
                                <div slot="bodyRight" style="overflow-y:auto;background-color: #fff;">
                                    <sy-ztree 
                                        style="overflow:hidden;overflow-y:auto;"
                                        :treeData="treeData"
                                        :chkboxType="chkboxType"
                                        :defaultChecked="defaultChecked"
                                        :isExpendAll="isExpendAll"
                                        @checked-node="checkedNode"
                                        showCheckBox>
                                    </sy-ztree>
                                </div>
                            </sy-grad-4>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div slot="footer" style="line-height: 34px;">
                <el-button type="" @click="addNewRoleDialog = false" size="small">{{$store.state.lang.button.cancel}}</el-button>
                <el-button type="primary" :loading="saveBtn" @click="submitForm('add')">{{$store.state.lang.button.ok}}</el-button>
            </div>
        </sy-dialog>
        <!-- 角色授权 -->
        <sy-dialog :title="$store.state.lang.base.auth.info5"
            :close-on-click-modal="false"
            position="middle"
            height="600px"
            width="300px"
            slide="fade"
            :visible.sync="authRoleDialog">
            <div slot="body" style="padding:10px;" :style="{overflow: autoPageLoading ? 'hidden' : 'auto'}" v-loading="autoPageLoading">
               <el-tree 
                    v-show="!autoPageLoading"
                    :data="treeData" 
                    :props="defaultProps"
                    ref="restree"
                    show-checkbox
                    :empty-text="emptyauthText"
                    node-key="id" 
                    style="border:0"
                    highlight-current
                    :default-expand-all="false">
                </el-tree>
            </div>
            <div slot="footer" style="line-height: 34px;">
                <el-button type="" @click="authRoleDialog = false" size="small">{{$store.state.lang.button.cancel}}</el-button>
                <el-button type="primary" :loading="authBtn" @click="submitAuth">{{$store.state.lang.button.ok}}</el-button>
            </div>
        </sy-dialog>
        <!-- 修改 -->
        <sy-dialog
            :title="$store.state.lang.button.edit"
            :close-on-click-modal="false"
            position="middle"
            height="auto"
            width="500px"
            slide="fade"
            :visible.sync="editDialog">
            <div slot="body" style="padding:20px;" v-loading="addPageLoading">
                <el-form ref="editform" :model="editform" label-width="100px" :rules="rules">
                    <el-form-item :label="$store.state.lang.base.auth.name+'：'" prop="name">
                        <el-input v-model="editform.name" :disabled="isdisabled"></el-input>
                    </el-form-item>
                    <el-form-item :label="$store.state.lang.base.auth.info8+'：'" v-show="editform.businessType != 1">
                        <div class="el-textarea__inner cp" @click="openEditSelects" style="resize: none;height: 90px;overflow-y: auto;"> 
                            {{editform.usernames || $store.state.lang.base.auth.info4}} 
                        </div>
                    </el-form-item>
                    <el-row>
                        <el-col :span="12" v-show="!isdisabled">
                            <el-form-item :label="$store.state.lang.base.auth.status+'：'">
                                <el-radio-group v-model="editform.status">
                                    <el-radio :disabled="isdisabled" :label="1">{{$store.state.lang.base.yes}}</el-radio>
                                    <el-radio :disabled="isdisabled" :label="0">{{$store.state.lang.base.no}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$store.state.lang.base.auth.sort+'：'" prop="sort">
                                <el-input v-model="editform.sort" style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item :label="$store.state.lang.base.auth.memo+'：'" prop="memo">
                        <el-input type="textarea" :rows="4" resize="none" placeholder="" v-model="editform.memo"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" style="line-height: 34px;">
                <el-button type="" @click="editDialog = false" size="small">{{$store.state.lang.button.cancel}}</el-button>
                <el-button type="primary" :loading="editBtn" @click="submitUpdata">{{$store.state.lang.button.ok}}</el-button>
            </div>
        </sy-dialog>
    </div>
</template>

<script>
import config from "./config.js";
import { getCodeMenuList } from "../../request.js";
import { getRoleList, getOrgTree, saveRoleByRc, getRoleByRc, addRoles, checkNameIsRepeat,getResTree, 
    getRoleById, updataRole, deleteRoles, lockRole, unlockRole, getRoleRresMinix, roleRresMinix,
    getOrgResource,saveOrgResource, getUserList, getUserResource, saveUserResource, getUserGroups
    } from "./request.js";
export default {
    data(){
        let checkLoginName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error(this.$store.state.lang.base.auth.data1));
            }else{
                if(this.roleName === value){
                    callback()
                }else{
                    if(value.length>50 ){
                        return callback(new Error(this.$store.state.lang.base.auth.data2));
                    }else{
                        checkNameIsRepeat(this.$store.state.unitId,value).then((data)=>{
                            if(data.data){
                                callback(new Error(this.$store.state.lang.base.auth.data3))
                            }else{
                                callback()
                            }
                        })
                    }
                } 
            }
        };
        let checkSort = (rule, value, callback) => {
            if (!value && value != 0) {
            return callback(new Error(this.$store.state.lang.base.auth.data4));
            }
            if (!(/^[0-9_]+$/.test(value))) {
                callback(new Error(this.$store.state.lang.base.auth.data5));
            } else {
                if(value*1 >= 0 && value*1 < 10000){
                    callback();
                }else{
                    callback(new Error(this.$store.state.lang.base.auth.data6));
                }
            }
        };
        return {
            module: config.module,
            authType: '1',
            options: [
                {
                    value: '1',
                    label: '按资源授权'
                },
                {
                    value: 'user',
                    label: '按人授权'
                },
                {
                    value: 'role',
                    label: '按角色授权'
                },
                {
                    value: 'unit',
                    label: '按组织授权'
                },
            ],
            selectRcList: [],
            dialogLoading: false,
            saveLoading: false,
            roleDialogVisibale: false,
            unitDialogVisibale: false,
            unitData: [],
            activeName: this.$route.query.tab || 'first',
            roleCheckList: [],
            roleList: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            treeData: [],
            rcForm: {
                role: [],
                unit: [],
                user: []
            },
            multipleSelection: [],
            addNewRoleDialog: false,
            form: {
                name: '',
                sort: null,
                userNames: '',
                unitId: '',
                status: '1',
                memo: '',
                resIds: '',
                userIds: '',
                resourceId: 'sc'
            },
            rules: {
                name: [
                    { required: true, validator: checkLoginName, trigger: 'blur' }
                ],
                sort: [
                    { required: true, validator: checkSort,trigger: 'blur'}
                ],
                memo: [
                    {   validator: (rule, value, callback) => {
                            if(value.length > 2000){
                                return callback(new Error(this.$store.state.lang.base.auth.data7));
                            }else{
                                callback();
                            }
                        }, trigger: 'blur' }
                ]
            },
            editform: {
                code: '',
                id: '',
                memo: '',
                name: '',
                roleType: '',
                sort: '',
                status: '',
                unitId: '',
                userids: [],
                usernames: '',
                businessType: '',
                resourceId: 'sc'
            },
            oldeditform: {},
            chkboxType: {
                "Y": "ps", 
                "N": "s" 
            },
            defaultChecked: [],
            currentChexedKeys: [],
            isExpendAll: false,
            saveBtn: false,
            currentRoleId: '',
            editDialog: false,
            isdisabled: false,
            addPageLoading: false,
            roleName: '',
            deleteBtn: false,
            authRoleDialog: false,
            autoPageLoading: false,
            roleListTreeData: [],
            radioID: '',
            userTreeData: []
        }
    },
    created(){
        this.$parent.$emit('currentPage', '/sl/home/auth');
        this.init();
    },
    methods: {
        init(){
            this.getRcList();
            if(this.activeName == 'second'){
                this.getRoles();
            }
        },
        handleClickTab(tab, event){
            this.radioID = '';
            this.rcForm.role = [];
            this.rcForm.unit = [];
            this.rcForm.user = [];
            this.roleCheckList = [];
            this.$router.push({path: '/sl/home/auth', query: {tab: tab.name}})
            if(tab.name == 'second'){
                this.getRoles();
            }else{

            }
        },
        getRcList(){
            getResTree({code: this.module}).then((data) => {
                console.log(data);
                this.treeData = data.data || [];
			}).catch(err=>{});
        },
        handleSelect(data, type){
            this.dialogLoading = false;
            if(type == 'role'){// 角色
                this.roleDialogVisibale = true;
                let ids = [];
                this.rcForm.role.forEach((_a,a)=>{
                    ids.push(_a.id)
                })
                this.roleCheckList = ids;
                this.getRoles('no');
            }else if(type == 'unit'){// 组织
                this.unitDialogVisibale = true;
                let keys = [];
                this.rcForm.unit.forEach((_s,s)=>{
                    keys.push(_s.id)
                })
                this.$refs.unitTree.setCheckedKeys(keys)
                if(this.unitData.length == 0){
                    this.getOrgs();
                }
            }else{ // 个人
                this.$SelectUsers({
                    lang: this.$store.state.langType,
                    unitType: 1,
                    selectUserType: 2,
                    userTypes: [2],
                    unitId: this.$store.state.unitId,
                    selectUserIds: this.$_.map(this.rcForm.user, 'id')
                }, (selectUser, instance) => {
                    let arr = [];
                    selectUser.forEach((_a,a)=>{
                        arr.push({
                            id: _a.id,
                            name: _a.realName
                        })
                    })
                    this.rcForm.user = arr;
                })
            }
        },
        // 查询角色
        getRoles(t){
            this.dialogLoading = true;
            getRoleList(t == 'no' ? undefined : this.module, this.$store.state.unitId).then((res)=>{
                this.roleList = res || [];
                this.roleListTreeData = [{
                    id: 'root_role',
                    name: this.$store.state.lang.base.auth.root_role,
                    children: res || []
                }];
                this.dialogLoading = false;
            }).catch(err=>{
                this.dialogLoading = false;
            })
        },
        // 查询部门
        getOrgs(){
            this.dialogLoading = true;
            getOrgTree(this.$store.state.unitId).then((res)=>{
                this.dialogLoading = false;
                this.unitData = [{
                    id: 'root_unit',
                    name: this.$store.state.lang.base.auth.root_unit,
                    children: this.make(res, 'domId', 'domPid')
                }];
            }).catch(err=>{
                this.dialogLoading = false;
            })
        },
        // 授权类型改变
        handleChangeType(val){
            this.radioID = '';
            // 重置显示
            this.rcForm.role = [];
            this.rcForm.unit = [];
            this.rcForm.user = [];
            this.roleCheckList = [];
            this.$nextTick(()=>{
                if(this.$refs.unitTree){
                    this.$refs.unitTree.setCheckedKeys([])
                }
                if(this.$refs.rcTree){
                    this.$refs.rcTree.setCheckedKeys([])
                }
            })
            if(val == 'user'){ // 按人
                let obj = {
                    userType: 2,
                    unitId: this.$store.state.unitId,
                    groupId: 'all',
                    groupType: 'all',
                    secondGroups: ''
                }
                this.getUsers(obj).then(res=>{
                    this.userTreeData = [
                        {id: 'all', name: this.$store.state.lang.base.auth.all, type: 'all', children: res},
                        {id: 'department', name: this.$store.state.lang.base.auth.department, type: 'department', children: [{id: '_0_'}]},
                        {id: 'subject', name: this.$store.state.lang.base.auth.subject, type: 'subject', children: [{id: '_0_'}]},
                        {id: 'gradeclass', name: this.$store.state.lang.base.auth.gradeclass, type: 'gradeclass', children: [{id: '_0_'}]},
                    ]
                })
            }else if(val == 'role'){ // 按角色
                this.getRoles('no');
            }else if(val == 'unit'){ // 按组织
                if(this.unitData.length == 0){
                    this.getOrgs();
                }
            }
        },
       
        submitData(type){
            if(type == 'role'){// 角色
                this.roleDialogVisibale = false;
                let arr = [];
                this.roleList.forEach((_a,a)=>{
                    this.roleCheckList.forEach((_s,s)=>{
                        if(_a.id == _s){
                            arr.push({
                                id: _s,
                                name: _a.name
                            })
                        }
                    })
                })
                this.rcForm.role = arr;
            }else if(type == 'unit'){// 组织
                this.unitDialogVisibale = false;
                let nodes = this.$refs.unitTree.getCheckedNodes();
                let arr = [];
                nodes.forEach((_s,s)=>{
                    arr.push({
                        id: _s.id,
                        name: _s.name
                    })
                })
                this.rcForm.unit = arr;
            }
        },
        handleRemove(data, index){
            data.splice(index, 1);
        },
        handleCheckChange(data, checked, node){
            this.selectRcList = this.$refs.rcTree.getCheckedKeys();
        },
        save(){
            if(this.authType == '1'){
                let obj = {
                    orgIds: this.$_.map(this.rcForm.unit, 'id'),
                    resIds: this.$refs.rcTree.getCheckedKeys(),
                    roleIds: this.$_.map(this.rcForm.role, 'id'),
                    serviceId: 'sc',
                    unitId: this.$store.state.unitId,
                    userIds: this.$_.map(this.rcForm.user, 'id')
                }
                if(obj.resIds.length == 0){
                    return
                }
                this.saveLoading = true;
                saveRoleByRc(obj).then(res=>{
                    this.$notify({
                        message: this.$store.state.lang.message.save,
                        type: 'success'
                    });
                    this.saveLoading = false;
                }).catch(err=>{
                    this.saveLoading = false;
                })
            }else if(this.authType == 'unit'){ // 保存组织授权
                this.saveLoading = true;
                saveOrgResource({
                    unitId: this.$store.state.unitId,
                    orgIds: this.radioID,
                    resIds: this.$refs.rcTree.getCheckedKeys().join(','),
                    serviceId: this.module
                }).then(res=>{
                    this.$notify({
                        message: this.$store.state.lang.message.success,
                        type: 'success'
                    });
                    this.saveLoading = false;
                }).catch(err=>{
                    this.saveLoading = false;
                })
            }else if(this.authType == 'role'){ // 保存角色
                let resIds = this.$refs.rcTree.getCheckedKeys();
                this.saveLoading = true;
                roleRresMinix(this.$store.state.unitId,this.radioID,resIds.join(',')).then((data)=>{
                    this.saveLoading = false;
                    if(data && data.data){
                        this.$notify({
                            message: this.$store.state.lang.base.auth.data10,
                            type: 'success'
                        });
                    }
                })
            }else if(this.authType == 'user'){ // 按人授权
                let resIds = this.$refs.rcTree.getCheckedKeys();
                this.saveLoading = true;
                saveUserResource({
                    unitId: this.$store.state.unitId,
                    serviceId: this.module,
                    userId: this.radioID,
                    resIds: resIds.join(',')
                }).then((data)=>{
                    this.saveLoading = false;
                    if(data){
                        this.$notify({
                            message: this.$store.state.lang.base.auth.data10,
                            type: 'success'
                        });
                    }
                })
            }
        },
        handleSeacher(){
            if(this.selectRcList.length>0){
                getRoleByRc(this.$store.state.unitId, this.selectRcList.join(',')).then(res=>{
                    if(res){
                        let role= [],unit = [], user = [];
                        res.organizationListVMS.forEach((_s,s)=>{
                            unit.push({
                                id: _s.id,
                                name: _s.name
                            })
                        })
                        res.roleVMS.forEach((_s,s)=>{
                            role.push({
                                id: _s.id,
                                name: _s.name
                            })
                        })
                        res.userVMS.forEach((_s,s)=>{
                            user.push({
                                id: _s.id,
                                name: _s.realName
                            })
                        })
                        this.rcForm.role = role;
                        this.rcForm.unit = unit;
                        this.rcForm.user = user;
                    }
                }).catch(err=>{

                })
            }
        },
        make(datas, idprop, pIdprop, item, lazy = false) {
            if (!idprop) {
                idprop = 'id';
            }
            if (!pIdprop) {
                pIdprop = 'parentId';
            }
            let _this = this;
            let nodes = [];
            let c = function(obj) {
                let _c = [];
                for (let i = 0; i < datas.length; i++) {
                    let _d = _this.$_.cloneDeep(datas[i]);
                    if(_d){
                        _d.item = item;
                    }
                    if (_d[pIdprop + ''] == obj[idprop + '']) {
                        _c.push(_d);
                        c(_d);
                    }
                }
                obj.children = lazy ? (_c.length == 0 ? [{id: "_0_"}] : _c.sort((a, b) => { return a.sort > b.sort })) : _c.sort((a, b) => { return a.sort > b.sort });
            };
            for (let i = 0; i < datas.length; i++) {
                let _d = _this.$_.cloneDeep(datas[i]);
                if(_d){
                    _d.item = item;
                }
                if ((!_d[pIdprop + ''] && _d[pIdprop + ''] != '') || (!_.result(_this.$_.find(datas, {
                        [idprop]: _d[pIdprop + '']
                    }), idprop))) {
                    c(_d);
                    nodes.push(_d);
                }
            }
            return nodes;
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleSelectionChange1(val){
            this.roleCheckList = this.$_.map(val, 'id');
        },
        handleClickRolesTabele(type, row, index){
            if(type == 'add'){ // 新增
                this.form.userIds = '';
                this.form.userNames = '';
                this.saveBtn = false;
                this.currentChexedKeys = [];
                this.defaultChecked = [];
                this.addNewRoleDialog = true;
                this.$refs.form.resetFields();
                this.form.status = 1;
            }else if(type == 'w'){ // 维护角色成员
                this.currentRoleId = row.id;
                this.openEditeDialog(row).then(res=>{
                    if(res.status == 200){
                        let arr = [];
                        res.data.users.forEach((_s,s)=>{
                            arr.push(_s.id)
                        })
                        this.$SelectUsers({
                            lang: this.$store.state.langType,
                            unitType: 1,
                            selectUserType: 2,
                            unitId: this.$store.state.unitId,
                            selectUserIds: arr
                        },(selectUser,instance)=>{
                            let ids = this.$_.map(selectUser, 'id');
                            this.editform.userids = ids;
                            this.updataRoleMsg();
                        })
                    }
                })
            }else if(type == 'e'){ // 编辑
                this.currentRoleId = row.id;
                if(row.roleType*1 > 0){
                    this.isdisabled = true;
                }else{
                    this.isdisabled = false;
                }
                this.editDialog = true;
                this.openEditeDialog(row).then(data=>{
                    
                }).catch(err=>{
                    
                })
            }else if(type == 'd'){
                let ids = this.$_.map(this.multipleSelection, 'id');
                let isType = this.$_.find(this.multipleSelection, function(o){ return o.roleType > 0});
                if(isType){
                    this.$notify({
                        message: this.$store.state.lang.base.auth.data11,
                        type: 'warning'
                    });
                }else{
                    this.$confirm(this.$store.state.lang.message.delete, this.$store.state.lang.message.info, {
                        confirmButtonText: this.$store.state.lang.button.ok,
                        cancelButtonText: this.$store.state.lang.button.cancel,
                        type: 'warning'
                    }).then(() => {
                        this.deleteBtn = true;
                        deleteRoles(ids.join(',')).then((data)=>{
                            this.deleteBtn = false;
                            if(data && data.code === 'ok'){
                                this.$notify({
                                    message: this.$store.state.lang.message.delete1,
                                    type: 'success'
                                });
                                this.getRoles();
                            }
                        })
                    }).catch(() => {

                    });
                }
            }else if(type == 'lock'){ // 锁定
                let ids = this.$_.map(this.multipleSelection, 'id');
                let isType = this.$_.find(this.multipleSelection, function(o){ return o.roleType > 0});
                if(isType){
                    this.$notify({
                        message: this.$store.state.lang.base.auth.data13,
                        type: 'warning'
                    });
                }else{
                    this.$confirm(this.$store.state.lang.base.auth.msg, this.$store.state.lang.message.info, {
                        confirmButtonText: this.$store.state.lang.button.ok,
                        cancelButtonText: this.$store.state.lang.button.cancel,
                        type: 'warning'
                    }).then(() => {
                        if(ids){
                            lockRole(ids.join(',')).then((data)=>{
                                if(data && data.code === 'ok'){
                                    this.$notify({
                                        message: this.$store.state.lang.base.auth.data14,
                                        type: 'success'
                                    });
                                    this.getRoles();
                                }
                            }) 
                        }
                    }).catch(() => {

                    });
                    
                }
            }else if(type == 'active'){ // 激活
                let ids = this.$_.map(this.multipleSelection, 'id');
                let isType = this.$_.find(this.multipleSelection, function(o){ return o.roleType > 0});
                if(isType){
                    this.$notify({
                        message:this.$store.state.lang.base.auth.data15,
                        type: 'warning'
                    });
                }else{
                    if(ids){
                        unlockRole(ids.join(',')).then((data)=>{
                            if(data && data.code === 'ok'){
                                this.$notify({
                                    message: this.$store.state.lang.base.auth.data16,
                                    type: 'success'
                                });
                                this.getRoles();
                            }
                        })
                    }
                }
            }else if(type == 'a'){ // 授权
                this.authRoleDialog = true;
                if(this.multipleSelection.length>0){
                    this.moreRoles = true;
                    let isActive = this.$_.find(this.multipleSelection, {status: 0})
                    if(isActive){
                        this.$notify({
                            message: this.$store.state.lang.base.auth.data12,
                            type: 'warning'
                        });
                    }else{
                        this.$refs.restree.setCheckedKeys([]);
                        let rolesIds = this.$_.map(this.multipleSelection, 'id');
                        this.autoPageLoading = true;
                        getRoleRresMinix( rolesIds.join(','),this.$store.state.unitId).then((data)=>{
                            this.autoPageLoading = false;
                            if(data && data.data){
                                this.$refs.restree.setCheckedKeys(data.data);
                            }else{
                                this.$refs.restree.setCheckedKeys([]);
                            }
                        }).catch((err)=>{
                            this.autoPageLoading = false;
                        })
                    }
                }
            }
        },
        // 修改角色
        updataRoleMsg(){
            let obj = {
                id: this.editform.id,
                name: this.editform.name,
                status: this.editform.status,
                sort: this.editform.sort,
                memo: this.editform.memo,
                unitId: this.$store.state.unitId,
                userIds: this.editform.userids.join(',')
            }
            this.editBtn = true;
            updataRole(obj).then((data)=>{
                this.editBtn = false;
                if(data && data.code == 'ok'){
                    this.$notify({
                        message: this.$store.state.lang.base.auth.data9,
                        type: 'success'
                    });
                    this.editDialog = false;
                    this.getRoles();
                }else{
                    this.$notify({
                        message: data.message,
                        type: 'error'
                    });
                }
            })
        },
        // 编辑 查询角色详情
        openEditeDialog(row){
            return new Promise((resove, reject)=>{
                this.addPageLoading = true;
                getRoleById(row.id).then((data)=>{
                    resove(data)
                    if(data && data.data){
                        this.oldeditform = this.$_.cloneDeep(data.data);
                        this.editform.id = data.data.id;
                        this.editform.memo = data.data.memo;
                        this.editform.businessType = data.data.businessType;
                        this.editform.status = data.data.status;
                        this.editform.name = data.data.name;
                        this.editform.roleType = data.data.roleType;
                        this.editform.sort = data.data.sort;
                        this.editform.unitId = data.data.unitId;
                        this.editform.usernames = this.$_.map(data.data.users, 'realName').join('、');
                        this.editform.userids = this.$_.map(data.data.users, 'id');
                        this.roleName = data.data.name;
                    }
                    this.addPageLoading = false;
                }).catch((err)=>{
                    this.addPageLoading = false;
                })
            })
        },
        checkedNode(nodes){
            this.currentChexedKeys = this.$_.map(nodes.allCeckNodes, 'id');
        },
        // 新增展开收缩树
        changeExpande(t){
            if(t === 'unexpend'){
                // 收缩
                this.isExpendAll = false;
            }else{
                // 展开
                this.isExpendAll = true;
            }
        },
        // 提交信息并关闭弹出框
        submitForm(t){
            if(t === 'add'){
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.addnewRole();
                    } else {
                        return false;
                    }
                });
            }
        },
        addnewRole(){
            let resArr = this.currentChexedKeys;
            let obj = {
                name: this.form.name,
                status: this.form.status,
                sort: this.form.sort,
                unitId: this.$store.state.unitId,
                memo: this.form.memo,
                resIds: resArr.join(','),
                userIds: this.form.userIds,
                resourceId: this.module
            }
            this.saveBtn = true;
            addRoles(obj).then((data)=>{
                this.saveBtn = false;
                if(data){
                    this.$notify({
                        message: this.$store.state.lang.base.auth.data8,
                        type: 'success'
                    });
                    this.addNewRoleDialog = false;
                    this.getRoles();
                }
            })
        },
        openSelects(){
            this.$SelectUsers({
                lang: this.$store.state.langType,
                unitType: 1,
                selectUserType: 2,
                unitId: this.$store.state.unitId,
                selectUserIds: this.form.userIds ? this.form.userIds.split(',') : []
            },(selectUser,instance)=>{
                let ids = this.$_.map(selectUser, 'id');
                let names = this.$_.map(selectUser, 'realName');
                this.form.userIds = ids.join(',');
                this.form.userNames = names.join('、');
            })
        },
        // 打开选人控件
        openEditSelects(t){
            this.$SelectUsers({
                lang: this.$store.state.langType,
                unitType: 1,
                selectUserType: 2,
                unitId: this.$store.state.unitId,
                selectUserIds: this.editform.userids
            },(selectUser,instance)=>{
                let aids = _.map(selectUser, 'id');
                let anames = _.map(selectUser, 'realName').join('、');
                this.editform.usernames = anames
                this.editform.userids = aids;
            })
        },
        // 提交修改
        submitUpdata(){
            this.$refs['editform'].validate((valid) => {
                if (valid) {
                    if(this.isdisabled){
                        this.updataRoleMsg();
                    }else{
                        if(this.roleName === this.editform.name){
                            this.updataRoleMsg();
                        }else{
                            this.$refs['editform'].validate((valid) => {
                                if (valid) {
                                    this.updataRoleMsg();
                                } else {
                                    return false;
                                }
                            });
                        }
                    }
                } else {
                    return false;
                }
            });
        },
        // 提交授权
        submitAuth(){
            let roleIds = this.$_.map(this.multipleSelection, 'id').join(',');
            let resIds = this.$refs.restree.getCheckedKeys();
            this.authBtn = true;
            roleRresMinix(this.$store.state.unitId,roleIds,resIds.join(',')).then((data)=>{
                this.authBtn = false;
                if(data && data.data){
                    this.$notify({
                        message: this.$store.state.lang.base.auth.data10,
                        type: 'success'
                    });
                }
                this.authRoleDialog = false;
            })
        },
        // 单位树点击
        handleNodeClick(data) {
            if(data.type && data.type == 'organization'){
                this.radioID = data.id;
                this.getMsgOrg(data.id);
            }else{
                this.radioID = '';
                this.$refs.rcTree.setCheckedKeys([])
            }
        },
        // 查询部门授权信息
        getMsgOrg(id){
            getOrgResource(id,this.module).then((res)=>{
                this.$refs.rcTree.setCheckedKeys(res)
            })
        },
        // 点击角色
        handleRoleNodeClick(data){
            if(data.id){
                this.radioID = data.id;
                this.getRoleMsg(data.id)
            }else{
                this.radioID = '';
                this.$refs.rcTree.setCheckedKeys([])
            }
        },
        // 查询角色权限
        getRoleMsg(rolesIds){
            getRoleRresMinix( rolesIds,this.$store.state.unitId).then((data)=>{
                if(data.status == 200){
                    this.$refs.rcTree.setCheckedKeys(data.data || [])
                }
            }).catch((err)=>{
                this.autoPageLoading = false;
            })
        },
        // 点击个人shu
        handleUserNodeClick(data){
            this.radioID = '';
            let isChildren = false;
            data.children.forEach((_s,s)=>{
                if(_s.id == '_0_'){
                    isChildren = true; 
                }
            })
            if(data.type == 'stu'){
                this.radioID = data.id;
                this.getUserMsg(data.id)
                return
            }else if(data.type == 'department'){
                if(isChildren){
                    data.children = [];
                    getOrgTree(this.$store.state.unitId).then((res)=>{
                        data.children = this.make(res, 'domId', 'domPid', 'department', true)
                    }).catch(err=>{
                        
                    })
                }
                return
            }else if(data.type == 'subject'){
                if(isChildren){
                    data.children = [];
                    this.getTrees('subject').then(res=>{
                        data.children = res;
                    })
                }
                return
            }else if(data.type == 'gradeclass'){
                if(isChildren){
                    data.children = [];
                    this.getTrees('gradeclass').then(res=>{
                        data.children = res;
                    })
                }
                return
            }else{
                this.$refs.rcTree.setCheckedKeys([])
            }
            if(data.item == 'department'){
                if(isChildren){
                    let obj = {
                        userType: 2,
                        unitId: this.$store.state.unitId,
                        groupId: data.id,
                        groupType: 'department',
                        secondGroups: ''
                    }
                    this.getUsers(obj).then(res=>{
                        data.children = res;
                    })
                }
                return
            }else if(data.item == 'subject'){
                if(isChildren){
                    let obj = {
                        userType: 2,
                        unitId: this.$store.state.unitId,
                        groupId: data.id,
                        groupType: data.type,
                        secondGroups: ''
                    }
                    this.getUsers(obj).then(res=>{
                        data.children = res;
                    })
                }
                return
            }else if(data.item == 'gradeclass'){
                if(isChildren){
                    let obj = {
                        userType: 2,
                        unitId: this.$store.state.unitId,
                        groupId: data.id,
                        groupType: data.type,
                        secondGroups: ''
                    }
                    this.getUsers(obj).then(res=>{
                        data.children = res;
                    })
                }
                return
            }
        },
        // 查询类型
        getTrees(groupType){
            return new Promise((resove,reject)=>{
                getUserGroups({
                    userType: 2,
                    unitId: this.$store.state.unitId,
                    groupType: groupType
                }).then((res)=>{
                    let arr = this.make(res, 'id', 'parentId', groupType,true);
                    arr.forEach((_s,s)=>{
                        _s.parentId = groupType;
                    })
                    console.log(arr);
                    resove(arr)
                })
            })
        },
         // 查询用户
        getUsers(obj){
            return new Promise((resove,reject)=>{
                getUserList(obj).then((res)=>{
                    let arr = [];
                    if(res){
                        res.forEach((_s,s)=>{
                            arr.push({
                                id: _s.id,
                                name: _s.realName,
                                type: 'stu',
                                parentId: 'all',
                                children: []
                            })
                        })
                    }
                    resove(arr)
                })
            })
        },
        // 查询用户权限
        getUserMsg(id){
            getUserResource(this.$store.state.unitId,id,this.module).then(res=>{
                let arr = [];
                if(res){
                    res.forEach((_s,s)=>{
                        arr.push(_s.id)
                    })
                }
                this.$refs.rcTree.setCheckedKeys(arr)
            })
        }
    }
}
</script>

<style scoped>
.box-card{
    margin-bottom: 10px;
}
.sy-edu-click{
    min-height: 80px;
    border-radius: 3px;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
    border: 1px dotted transparent;
}
.sy-edu-click:hover{
    border-color: #777;
}
.sy-edu-click-info-msg{
    color: #ccc;
    font-size: 14px;
}
</style>


