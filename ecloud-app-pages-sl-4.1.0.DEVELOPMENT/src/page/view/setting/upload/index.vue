<template>
    <div class="sy-upload-page">
        <div class="sy-note-upload-form">
            <table class="sy-upload-page-table" cellspacing="0" cellpadding="0" border="0" >
                <tr>
                    <td width="12%">{{$store.state.lang.rc.t12||"第一步：资源目录"}}</td>
                    <td>
                        <span class="sy-lf center">{{$store.state.lang.rc.t13||'基础型课程'}}</span>
                        <div class="sy-upload-page-row1 left">
                            <el-tag v-if='JSON.stringify(this.data) != "{}"' type="primary">{{catalog}}</el-tag>
                            <div 
                                v-else
                                 @click="choseCatalog" 
                                :class="{'el-input__inner':true, 'cp':true,'borderRed':isShowCatalogError}">
                                {{catalog}}
                            </div>
                            <span class="errorMsg" v-if="isShowCatalogError" style="bottom: -24px;">{{catalogErrorText}}</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>{{$store.state.lang.rc.t14||'第二步：上传资源'}}</td>
                    <td align="left">
                        <el-table :data="tableData1" style="width:100%;" class="step2 mb5" :empty-text="emptyText">
                            <el-table-column 
                                v-for="col in currentColumn" 
                                :key="col.prop" 
                                :prop="col.prop" 
                                :label="col.label" 
                                :width="col.width" 
                                :align="col.align">
                                <template scope="scope">
                                    <div v-if="col.prop === 'rcType'">
                                        <el-select 
                                            v-model="scope.row.resourceType" 
                                            :class="{'borderRed':scope.row.isShowResourceTypeError}" 
                                            @change="resourceTypeChange(scope.$index)" >
                                                <el-option v-for="item in rcTypess" :key="item.value" :label="item.text" :value="item.value"></el-option>
                                        </el-select>
                                        <span class="errorMsg" v-if="scope.row.isShowResourceTypeError">{{scope.row.resourceTypeErrorText}}</span>
                                    </div>
                                    <div v-else-if="col.prop === 'knowledge'"
                                        @click="choseNnowledge(scope.$index)"  
                                        class="el-input__inner cp">
                                        {{scope.row.knowledge}}
                                    </div>
                                    <el-input v-else-if="col.prop === 'fileAuthor'" 
                                        size="small" 
                                        :placeholder="$store.state.lang.rc.t15||'最长10个字'" 
                                        v-model.trim="scope.row.fileAuthor" 
                                        :maxlength="10">
                                    </el-input>
                                    <div v-else-if="col.prop === 'fileName'">
                                        <el-input size="small" :placeholder="$store.state.lang.rc.t24||'最长50个字'" v-model.trim="scope.row.fileName" :maxlength="50" 
                                            :class="{'borderRed':scope.row.isShowRcFileNameError}" @blur="rcFileNameKeyupEnter(scope.$index)" ></el-input>
                                        <span class="errorMsg" v-if="scope.row.isShowRcFileNameError">{{$store.state.lang.rc.t16||'资源名称不能'}}{{scope.row.rcFileNameErrorText}}</span>
                                    </div>
                                    <div v-else-if="col.prop === 'uploadValue'">
                                        <el-upload 
                                            :ref="'upload_'+scope.$index" 
                                            :on-change="onChange" 
                                            :on-progress="onProgress" 
                                            :data="uploadData" :action="uploadAction" 
                                            :before-upload="beforeUpload" 
                                            :on-success="onSuccess" 
                                            :auto-upload="false" 
                                            :show-file-list="false" 
                                            class="sy-lf sy-import" 
                                            name="fileUpload" 
                                            :disabled="scope.$index==0?false:true || tableData1[scope.$index-1].uploadValue?false:true">
                                                <div 
                                                    slot="trigger" 
                                                    class="sy-import-file-name el-input__inner" 
                                                    :class="{'borderRed':scope.row.isShowfileNameError}" 
                                                    @click="handleuPLOAD(scope.$index)">
                                                        <div class="sy-import-file-name-div">{{scope.row.uploadValue}}</div>
                                                        <span class="fa fa-folder-o"></span>
                                                </div>
                                        </el-upload>
                                        <span class="sy-note-progress">
                                            <el-button 
                                                type="primary" 
                                                :disabled="scope.row.uploadValue == ''"  
                                                size="small" 
                                                @click="submitUpload('upload_'+scope.$index)" 
                                                v-if="scope.row.isUploadBtn">
                                                {{$store.state.lang.rc.t20||'上传'}}
                                            </el-button>
                                            <span v-if="scope.row.isProgress">
                                                <span v-if="!scope.row.isShowProgress" :title="$store.state.lang.rc.t17||'正在上传...'">{{scope.row.percentage}}</span>
                                                <i class="fontLv el-icon-circle-check" v-if="scope.row.isShowProgress" 
                                                    :title="$store.state.lang.rc.t18||'上传成功'"></i>
                                            </span>
                                            <i class="sy-error-progress fa fa-info-circle " v-if="scope.row.isErrorProgress" 
                                                :title="$store.state.lang.rc.t19||'上传出错'"></i>
                                        </span>
                                        <span class="errorMsg" v-if="scope.row.isShowfileNameError">{{scope.row.fileNameErrorText}}</span>
                                        <el-button 
                                            type="danger" 
                                            class="sy-import-button" 
                                            size="small" 
                                            @click="deleteColumn(scope.$index)" 
                                            :disabled="scope.row.deleteColumnDisabled">
                                            {{$store.state.lang.button.delete||"删除"}}
                                        </el-button>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-button 
                            type="primary" 
                            size="small" 
                            @click="addColumn" 
                            :disabled="addColumnDisabled">
                            {{uploadText}}
                        </el-button>
                    </td>
                </tr>
                <tr>
                    <td>{{$store.state.lang.rc.t21||"第三步：资源属性"}}</td>
                    <td>
                        <el-table :data="tableData2" style="width: 100%">
                            <el-table-column prop="name" :label="$store.state.lang.rc.t22||'属性分类'" width="150" align="center">
                            </el-table-column>
                            <el-table-column prop="n" :label="$store.state.lang.rc.t23||'内容'" align="center">
                                <template scope="scope">
                                    <div v-if="scope.row.id === 'cell1'">
                                        <el-input 
                                            size="small" 
                                            :placeholder="$store.state.lang.rc.t24||'最长50个字'" 
                                            :maxlength="50" 
                                            v-model.trim="rcName" 
                                            :class="{'borderRed':isShowRcNameError}" 
                                            @blur="rcNameKeyupEnter" 
                                            @keyup.enter="rcNameKeyupEnter">
                                        </el-input>
                                        <span class="errorMsg" v-if="isShowRcNameError">{{$store.state.lang.rc.t25||"标题不能为空"}}!</span>
                                    </div>
                                    <div v-else-if="scope.row.id === 'cell2'" class="left">
                                        <div
                                            :class="{'el-input__inner':true,'cp':true,'borderRed':isShowAuthorNameError}" 
                                            style="width:30%;"
                                            @click="choseUploadUser">
                                            {{authorName}}
                                        </div>
                                        <span class="errorMsg" v-if="isShowAuthorNameError">{{$store.state.lang.rc.t26||"上传人不能为空"}}!</span>
                                    </div>
                                    <div v-else-if="scope.row.id === 'cell3'" class="left">
                                        <div @click="choseLabel" class="el-input el-input__inner cp" style="width:30%;">
                                            {{labelName}}</div>
                                        <el-input 
                                            size="small" 
                                            :placeholder="$store.state.lang.rc.t27||'自定义标签（只能有一个,最大长度50）'" 
                                            v-model.trim="tag" 
                                            :maxlength="50" 
                                            style="width:30%;">
                                        </el-input>
                                    </div>
                                    <el-input 
                                        v-else-if="scope.row.id === 'cell4'" 
                                        type="textarea" 
                                        :rows="7" 
                                        resize="none" 
                                        :placeholder="$store.state.lang.rc.t28||'最大输入长度为500'" 
                                        :maxlength="500" 
                                        v-model="jianjie"
                                        style="margin:5px 0;">
                                    </el-input>
                                    <div v-else-if="scope.row.id === 'cell5'" class="left">
                                        <el-radio class="radio" v-model="downloadControl" label="0">{{$store.state.lang.rc.t29||'允许下载'}}</el-radio>
                                        <el-radio class="radio" v-model="downloadControl" label="1">{{$store.state.lang.rc.t30||'不允许下载'}}</el-radio>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                      <div class="pl15 center sy-rc-btn-goTop">
                            <el-button 
                                type="primary" 
                                class="sy-import-button" 
                                size="small" 
                                @click="submitAndUpload" 
                                :disabled="isSubmitAndUpload">
                                {{$store.state.lang.edu.t43||'提交'}}
                            </el-button>
                        </div>  
                    </td>
                </tr>
            </table>
        </div>
        <!-- 选择编目dialog，基础型课程为左边科目列表，右边编目树；非基础型课程只有课程树-->
        <sy-dialog 
            append-to-body 
            :title="$store.state.lang.rc.t31||'选择学科'" 
            :close-on-click-modal="false" 
            position="middle" 
            width="600px" 
            height="380px" 
            slide="fade" 
            :visible.sync="coursesDialog">
            <div slot="body" class="sy-upload-page-chose-courses">
                <div class="sy-upload-page-courses-list sy-theme-border" v-if="!cValue">
                    <div class="sy-upload-page-courses-list-title sy-theme-background">{{$store.state.lang.hw.t23||'学科'}}</div>
                    <div class="sy-upload-page-courses-list-cont">
                        <ul v-if="courses && courses.length>0">
                            <li 
                                v-for="(course,index) in courses" 
                                :key="course.value" 
                                class="sy-theme-border"
                                @click="courseName(course.value,index)">
                                    <a href="javascript:void(0)" 
                                    :class="{'sy-theme-text-active':curIndex==index}">{{course.name}}</a>
                            </li>
                        </ul>
                        <span v-else class="tc">{{emptyText}}</span>
                    </div>
                </div>
                <div 
                    :style="{'margin-left':(cValue?'0':'190px')}"
                    class="sy-upload-page-tree">
                    <sy-ztree 
                        v-if="catalogTreeData && catalogTreeData.length>0" 
                        idName="coursesTree" 
                        :treeData="catalogTreeData" 
                        @checked-node="checkedCourses" 
                        titleChecked 
                        :defaultChecked="defaultChecked" 
                        showRadioBox 
                        isExpendAll 
                        radioType="all">
                    </sy-ztree>
                    <span v-else>{{emptyTextCatalogTree}}</span>
                </div>
            </div>
            <div slot="footer">
                <el-button type="" @click="coursesDialog = false" size="small">{{$store.state.lang.button.cancel || '取消'}}</el-button>
                <el-button type="primary" :loading="addNewBtn" @click="submitCourses">{{$store.state.lang.button.ok || '确定'}}</el-button>
            </div>
        </sy-dialog>
        <!-- 选择知识点dialog  -->
        <sy-dialog append-to-body :title="$store.state.lang.rc.t32||'选择知识点'" :close-on-click-modal="false" position="middle" width="600px" 
            height="380px" slide="fade" :visible.sync="choseNnowledgelDialog">
            <div slot="body" style="padding:0 10px;">
                <div class="sy-row">
                    <div class="sy-col sy-20">
                        <sy-ztree v-if="nowledgelTreeData && nowledgelTreeData.length>0" idName="nowledgelTree" 
                            :treeData="nowledgelTreeData" :defaultChecked="nowledgelChecked" @checked-node="checkedNode" 
                            showRadioBox isExpendAll titleChecked radioType="all"></sy-ztree>
                        <span v-else>{{emptyText}}</span>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <el-button type="" @click="choseNnowledgelDialog = false" size="small">{{$store.state.lang.button.cancel || '取消'}}</el-button>
                <el-button type="primary" :loading="addNewBtn" @click="submitNnowledge">{{$store.state.lang.button.ok || '确定'}}</el-button>
            </div>
        </sy-dialog>
        <!-- 删除资源列 -->
        <sy-dialog append-to-body :title="$store.state.lang.message.info||'提示'" :close-on-click-modal="false" position="middle" width="300px" height="200px" slide="fade" :visible.sync="deleteColumnDialog">
            <div slot="body" style="padding:10px;">
                <div class="el-message-box__content">
                    <span class="el-message-box__status el-icon-warning"></span>
                    <div class="el-message-box__message" style="margin-left: 50px;">
                        <p>{{$store.state.lang.rc.t33||'确认删除该资源吗？'}}</p>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <el-button type="" @click="deleteColumnDialog = false" size="small">{{$store.state.lang.button.cancel || '取消'}}</el-button>
                <el-button type="primary" :loading="addNewBtn" @click="submitDeleteColumn">{{$store.state.lang.button.ok || '确定'}}</el-button>
            </div>
        </sy-dialog>
        <!-- 选择已有标签dialog  -->
        <sy-dialog append-to-body :title="$store.state.lang.rc.t34||'选择已有标签'" :close-on-click-modal="false" position="middle" width="600px" height="380px" slide="fade" :visible.sync="choseLabelDialog">
            <div slot="body" style="padding:10px;">
                <div class="sy-row">
                    <div class="sy-col sy-20">
                        <el-checkbox-group v-model="checkList" v-if="labels && labels.length>0">
                            <el-checkbox :label="label.id" v-for="label in labels" :key="label.id">{{label.name}}</el-checkbox>
                        </el-checkbox-group>
                        <span v-else>{{emptyText}}</span>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <el-button type="" @click="choseLabelDialog = false" size="small">{{$store.state.lang.button.cancel || '取消'}}</el-button>
                <el-button type="primary" :loading="addNewBtn" @click="submitLabel">{{$store.state.lang.button.ok || '确定'}}</el-button>
            </div>
        </sy-dialog>
    </div>
</template>
<script>
import "./index.css";
import index from "./index.js";
export default {
  name: "Upload",
  mixins: [index]
};
</script>