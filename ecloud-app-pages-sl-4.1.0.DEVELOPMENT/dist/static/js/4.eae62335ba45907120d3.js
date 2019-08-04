webpackJsonp([4,30,31,32],{"3zz4":function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.pageLoading,expression:"pageLoading"}]},[a("div",{staticStyle:{"margin-bottom":"10px"}},[a("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:"请选择年级"},on:{change:e.handleGradeChange},model:{value:e.queryList.gradeValue,callback:function(t){e.queryList.gradeValue=t},expression:"queryList.gradeValue"}},e._l(e.gradelist,function(e){return a("el-option",{key:e.gradeValue,attrs:{label:e.gradeName,value:e.gradeValue}})})),e._v(" "),a("el-select",{staticStyle:{width:"120px",margin:"0 10px"},attrs:{placeholder:"请选择班级"},on:{change:e.handleClzzChange},model:{value:e.queryList.clazzId,callback:function(t){e.queryList.clazzId=t},expression:"queryList.clazzId"}},e._l(e.classlist,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),a("el-select",{staticStyle:{width:"120px","margin-right":"10px"},attrs:{placeholder:"请选择科目"},on:{change:e.handleCourseChange},model:{value:e.queryList.courseValue,callback:function(t){e.queryList.courseValue=t},expression:"queryList.courseValue"}},e._l(e.courselist,function(e){return a("el-option",{key:e.courseValue,attrs:{label:e.courseName,value:e.courseValue}})})),e._v(" "),a("el-input",{staticStyle:{width:"180px"},attrs:{placeholder:"请输入学生姓名、学号",icon:"search","on-icon-click":e.handleIconClick},model:{value:e.searchInput,callback:function(t){e.searchInput=t},expression:"searchInput"}})],1),e._v(" "),a("el-table",{staticClass:"count-table count-list",attrs:{data:e.studentDate,border:""}},[a("el-table-column",{attrs:{prop:"studentNumber",label:"学号",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"userName",label:"姓名",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"onlineTime",label:"时间",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"second",label:"在线时长",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.second+"分钟"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"recordedCount",label:"录播课堂数",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"hwCount",label:"作业练习数",align:"center"}})],1)],1)},staticRenderFns:[]}},"40kI":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a(10),n=a.n(s),r=a("6kVi"),i=a("Np5o"),l=a.n(i),o=a("7xji"),u=a.n(o),c=a("TWZE"),d=a.n(c);t.default={components:{ks:l.a,student:u.a,times:d.a},data:function(){return{queryList:{gradeValue:"",clazzId:"",courseValue:""},gradelist:[],courseMap:{},classlist:[],courseDate:[],myChart1:null,option1:{backgroundColor:"#fff",tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},xAxis:{type:"value",axisTick:{show:!1},splitLine:{show:!1}},yAxis:{type:"category",data:["直播课程","视频微课","单元检测","课后作业","点播课程"],axisTick:{show:!1}},series:[],grid:{left:100,right:60,top:30,bottom:40},itemStyle:{normal:{color:function(e){return["#8beafe","#6ee469","#fefc8b","#2ee4d5","#fdafc7"][e.dataIndex]}}}},activeName:"first",searchInput:"",studentDate:[],timeDate:[]}},created:function(){this.$parent.$emit("currentPage","/sl/home/count"),this.init()},methods:{init:function(){this.getGradeClazzCoures()},getFB:function(){var e=this;a.i(r.i)({courseValue:this.queryList.courseValue,gradeValue:this.queryList.gradeValue}).then(function(t){e.drawchart1(t)})},getGradeClazzCoures:function(){var e=this;a.i(r.g)({unitId:this.$store.state.unitId}).then(function(t){e.gradelist=t.gradeSimpleVMs||[],e.courseMap=t.courseMap||{},e.queryList.gradeValue=e.gradelist.length>0?e.gradelist[0].gradeValue:""}).catch(function(e){})},handleGradeChange:function(e){var t=this;this.queryList.courseValue="",this.courseDate=[];var a="";this.gradelist.forEach(function(t,s){t.gradeValue==e&&(a=t.id)}),setTimeout(function(){t.courseDate=t.courseMap[a],t.queryList.courseValue=t.courseDate.length>0?t.courseDate[0].courseValue:""},50)},handleCourseChange:function(e){e?this.getFB():this.drawchart1({})},drawchart1:function(e){var t=this,a={};if(e?a=e:a.resourceCount={},this.myChart1.showLoading(),a.resourceCount){var s=[a.resourceCount[5]||0,a.resourceCount[4]||0,a.resourceCount[3]||0,a.resourceCount[2]||0,a.resourceCount[1]||0];this.option1.series=[{name:"资源数",data:s,type:"bar"}],this.myChart1.setOption(this.option1),setTimeout(function(){t.myChart1.hideLoading()},10)}}},mounted:function(){this.$refs.myChart1&&(this.myChart1=n.a.init(this.$refs.myChart1),this.myChart1.setOption(this.option1))}}},"7xji":function(e,t,a){var s=a("VU/8")(a("Kt0C"),a("3zz4"),function(e){a("U7yU")},null,null);e.exports=s.exports},"8V1m":function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticStyle:{"line-height":"30px","margin-bottom":"10px"}},[a("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:"请选择"},on:{change:e.handleGradeChange1},model:{value:e.gradeValue,callback:function(t){e.gradeValue=t},expression:"gradeValue"}},e._l(e.gradeSimpleVMs,function(e){return a("el-option",{key:e.gradeValue,attrs:{label:e.gradeName,value:e.gradeValue}})})),e._v(" "),a("el-select",{staticStyle:{width:"120px",margin:"0 10px"},attrs:{placeholder:"请选择"},on:{change:e.handleGradeChangeCourse},model:{value:e.courseValue,callback:function(t){e.courseValue=t},expression:"courseValue"}},e._l(e.courseList,function(e){return a("el-option",{key:e.courseValue,attrs:{label:e.name,value:e.courseValue}})}))],1),e._v(" "),a("div",{staticClass:"count-tabscon"},[a("el-row",[a("el-col",{attrs:{span:6}},[a("el-card",{staticStyle:{"min-height":"440px"}},[a("el-tree",{staticStyle:{border:"0",height:"100%"},attrs:{data:e.catalogTreeData,"node-key":"id",props:e.defaultProps,"default-expanded-keys":[e.defaultKey],"current-node-key":e.defaultKey,"highlight-current":"","default-expand-all":!1},on:{"node-click":e.handleNodeClick}})],1)],1),e._v(" "),a("el-col",{attrs:{span:10}},[a("el-card",[0!=e.showData.resVMs.length?a("el-tabs",{model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"视频资源",name:"1"}},e._l(e.showData.resVMs,function(t){return a("div",{key:t.resId,staticClass:"tpl-sl-rows cp",on:{click:function(a){e.handleResClick(t)}}},[a("i",{staticClass:"fa fa-film",attrs:{"aria-hidden":"true"}}),e._v(" "),a("span",{staticClass:"tpl-sl-title"},[e._v(e._s(t.resName))])])}))],1):e._e(),e._v(" "),0!=e.showData.hwVMs.length?a("el-tabs",{model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"作业资源",name:"1"}},e._l(e.showData.hwVMs,function(t){return a("div",{key:t.hwId,staticClass:"tpl-sl-rows cp",on:{click:function(a){e.handleHwClick(t)}}},[a("i",{staticClass:"fa fa-file-text",attrs:{"aria-hidden":"true"}}),e._v(" "),a("span",{staticClass:"tpl-sl-title"},[e._v(e._s(t.hwName))])])}))],1):e._e(),e._v(" "),0==e.showData.resVMs.length&&0==e.showData.hwVMs.length?a("p",{staticClass:"center",staticStyle:{"line-height":"400px",color:"#ccc"}},[e._v("暂无数据")]):e._e()],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-card",[a("div",{ref:"myChart1",staticClass:"sl-myChart2"})])],1)],1)],1)])},staticRenderFns:[]}},"A/bN":function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"sy-count-index"},[a("div",{staticClass:"sy-count-wid"},[a("div",{staticClass:"count-header"},[a("h3",[e._v("资源分布")]),e._v(" "),a("el-select",{staticClass:"home-bigselect",staticStyle:{width:"120px","margin-top":"8px"},attrs:{placeholder:"请选择年级"},on:{change:e.handleGradeChange},model:{value:e.queryList.gradeValue,callback:function(t){e.queryList.gradeValue=t},expression:"queryList.gradeValue"}},e._l(e.gradelist,function(e){return a("el-option",{key:e.gradeValue,attrs:{label:e.gradeName,value:e.gradeValue}})})),e._v(" "),a("el-select",{staticClass:"home-select",staticStyle:{width:"120px","margin-top":"8px","margin-left":"10px"},attrs:{placeholder:"请选择班级"},on:{change:e.handleCourseChange},model:{value:e.queryList.courseValue,callback:function(t){e.queryList.courseValue=t},expression:"queryList.courseValue"}},e._l(e.courseDate,function(e){return a("el-option",{key:e.courseValue,attrs:{label:e.name,value:e.courseValue}})}))],1),e._v(" "),a("div",{ref:"myChart1",staticClass:"count-bar"})]),e._v(" "),a("div",[a("el-tabs",{staticClass:"sy-count-wid",model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"按课时统计",name:"first"}},["first"==e.activeName?a("ks"):e._e()],1),e._v(" "),a("el-tab-pane",{attrs:{label:"按学生统计",name:"second"}},["second"==e.activeName?a("student"):e._e()],1),e._v(" "),a("el-tab-pane",{attrs:{label:"按时长统计",name:"third"}},["third"==e.activeName?a("times"):e._e()],1)],1)],1)])},staticRenderFns:[]}},F67R:function(e,t){},FbOv:function(e,t,a){var s=a("VU/8")(a("40kI"),a("A/bN"),function(e){a("NvhE")},"data-v-5d6e1d72",null);e.exports=s.exports},Kt0C:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("6kVi");t.default={data:function(){return{queryList:{gradeValue:"",clazzId:"",courseValue:""},pageLoading:!1,searchInput:"",gradelist:[],classlist:[],studentDate:[]}},created:function(){this.init()},methods:{init:function(){this.getGradeClazzCoures()},getGradeClazzCoures:function(){var e=this;a.i(s.c)().then(function(t){e.gradelist=t||[],e.queryList.gradeValue=e.gradelist.length>0?e.gradelist[0].gradeValue:""})},handleGradeChange:function(e){var t=this;this.queryList.clazzId="",this.queryList.courseValue="",setTimeout(function(){for(var a=0;a<t.gradelist.length;a++)if(t.gradelist[a].gradeValue==e)return t.classlist=t.gradelist[a].clazzs||[],void(t.queryList.clazzId=t.classlist.length>0?t.classlist[0].id:"")},50)},handleClzzChange:function(e){var t=this;this.queryList.courseValue="",setTimeout(function(){for(var a=0;a<t.gradelist.length;a++)if(t.gradelist[a].gradeValue==t.queryList.gradeValue){var s=t.gradelist[a].clazzs;if(s)for(var n=0;n<s.length;n++)if(s[n].id==e)return t.courselist=s[n].courseListsVM||[],void(t.queryList.courseValue=t.courselist.length>0?t.courselist[0].courseValue:"");return}},50)},handleCourseChange:function(e){e?this.getData():this.studentDate=[]},handleIconClick:function(){this.getData()},getData:function(){var e=this;this.pageLoading=!0,a.i(s.d)({gradeValue:this.queryList.gradeValue,classId:this.queryList.clazzId,courseValue:this.queryList.courseValue,keyWord:this.searchInput}).then(function(t){e.studentDate=t||[],e.pageLoading=!1}).catch(function(t){e.pageLoading=!1})}}}},Np5o:function(e,t,a){var s=a("VU/8")(a("RPT2"),a("8V1m"),function(e){a("F67R")},null,null);e.exports=s.exports},NvhE:function(e,t){},OCTg:function(e,t){},PtGG:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("6kVi");t.default={data:function(){return{pageLoading:!1,courseValue:"",courselist:[],timeDate:[]}},created:function(){this.init()},methods:{init:function(){this.getCourse()},getCourse:function(){var e=this;a.i(s.a)().then(function(t){e.courselist=t||[],e.courseValue=e.courselist.length>0?e.courselist[0].value:""}).catch(function(e){})},handleChange:function(e){e?this.getData():this.timeDate=[]},getData:function(){var e=this;this.pageLoading=!0,a.i(s.b)({courseValue:this.courseValue}).then(function(t){var a=[];t.gradeNumberVMs&&t.gradeNumberVMs.forEach(function(e,s){t.gradeMap&&(e.children=t.gradeMap[e.gradeId]||[]),a.push(e)}),e.timeDate=a,e.pageLoading=!1}).catch(function(t){e.pageLoading=!1})}}}},RPT2:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("bOdI"),n=a.n(s),r=a(10),i=a.n(r),l=a("6kVi");t.default={data:function(){return{defaultProps:{children:"children",label:"name"},activeName:"1",defaultKey:"",courseMap:{},gradeSimpleVMs:[],courseList:[],gradeValue:"",courseValue:"",myChart1:null,option1:{backgroundColor:"#fff",title:{text:"",x:"center",y:"87.5%"},tooltip:{trigger:"item",formatter:"{a} <br/>{b}: {c} ({d}%)"},legend:{x:"center",y:"80%",data:["已完成","未完成"]},series:[{name:"",type:"pie",radius:["30%","50%"],avoidLabelOverlap:!1,label:{normal:{show:!1,position:"center"},emphasis:{show:!0,textStyle:{fontSize:"16",fontWeight:"bold"}}},labelLine:{normal:{show:!1}},data:[]}],color:["#ffcb6b","#ff6666"]},catalogTreeData:[],showData:{resVMs:[],hwVMs:[]},courseName:""}},created:function(){this.init()},methods:{init:function(){this.getGC()},handleResClick:function(e){var t=this;this.myChart1&&(this.myChart1.clear(),this.myChart1.showLoading()),a.i(l.e)({resId:e.resId,gradeValue:this.gradeValue}).then(function(e){t.drawchart1(e)})},handleHwClick:function(e){var t=this;this.myChart1&&(this.myChart1.clear(),this.myChart1.showLoading()),a.i(l.f)({hwId:e.hwId,gradeValue:this.gradeValue}).then(function(e){t.drawchart1(e)})},drawchart1:function(e){var t=this;this.option1.title.text=this.courseName+"科目完成情况分布图",this.option1.series[0].name=this.courseName+"科目完成情况分布图",this.option1.series[0].data=[{value:e.complete,name:"已完成"},{value:e.unfinished,name:"未完成"}],this.myChart1.setOption(this.option1),setTimeout(function(){t.myChart1.hideLoading()},10)},getGC:function(){var e=this;a.i(l.g)({unitId:this.$store.state.unitId}).then(function(t){e.gradeSimpleVMs=t.gradeSimpleVMs||[],e.courseMap=t.courseMap||{},e.gradeValue=e.gradeSimpleVMs.length>0?e.gradeSimpleVMs[0].gradeValue:""}).catch(function(e){})},handleGradeChange1:function(e){var t=this;this.courseList=[],this.courseValue="";var a="";this.gradeSimpleVMs.forEach(function(t,s){t.gradeValue==e&&(a=t.id)}),setTimeout(function(){t.courseList=t.courseMap[a],t.courseValue=t.courseList.length>0?t.courseList[0].courseValue:""},50)},handleGradeChangeCourse:function(e){var t=this;this.showData.hwVMs=[],this.showData.resVMs=[],this.courseName="",this.courseList.forEach(function(a,s){a.courseValue==e&&(t.courseName=a.name)}),this.getCatalogTree()},handleNodeClick:function(e){this.showData.hwVMs=[],this.showData.resVMs=[],e&&(this.showData.resVMs=e.resVMs||[],this.showData.hwVMs=e.hwVMs||[])},getCatalogTree:function(){var e=this;this.catalogTreeData=[],""!==this.courseValue&&""!==this.gradeValue&&a.i(l.h)({courseValue:this.courseValue,gradeValue:this.gradeValue}).then(function(t){t&&t.forEach(function(e,a){e.resourceInfoVM&&e.resourceInfoVM.forEach(function(t,a){t.name=t.resName,t.sltype="rc",t.id=t.resId,t.parentId=e.id,t.parentName=e.name}),e.parentId||e.resourceInfoVM&&e.resourceInfoVM.forEach(function(a,s){a.name=a.resName,a.sltype="rc",a.parentId=e.id,a.parentName=e.name,t.push(a)})}),e.catalogTreeData=e.data2tree(t)}).catch(function(e){})},data2tree:function(e,t,a){t||(t="id"),a||(a="parentId");for(var s=[],r=0;r<e.length;r++){var i=_.cloneDeep(e[r]);(i[a+""]||""==i[a+""])&&_.result(_.find(e,n()({},t,i[a+""])),t)||(function s(n){for(var r=[],i=0;i<e.length;i++){var l=_.cloneDeep(e[i]);l[a+""]==n[t+""]&&(r.push(l),s(l))}r.length&&(n.children=r)}(i),s.push(i))}return s}},mounted:function(){this.$refs.myChart1&&(this.myChart1=i.a.init(this.$refs.myChart1),this.myChart1.setOption(this.option1))}}},TWZE:function(e,t,a){var s=a("VU/8")(a("PtGG"),a("aOHO"),function(e){a("OCTg")},null,null);e.exports=s.exports},U7yU:function(e,t){},aOHO:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.pageLoading,expression:"pageLoading"}],staticClass:"sl-timers"},[a("el-select",{staticClass:"count-tabsel",staticStyle:{float:"right","margin-bottom":"12px"},attrs:{placeholder:"请选择"},on:{change:e.handleChange},model:{value:e.courseValue,callback:function(t){e.courseValue=t},expression:"courseValue"}},e._l(e.courselist,function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),e._v(" "),a("el-table",{attrs:{data:e.timeDate,border:""}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-table",{attrs:{data:t.row.children,border:""}},[a("el-table-column",{attrs:{prop:"clazzName",label:"班级",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"studentCount",label:"总人数",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"avgSecond",label:"平均时长",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.avgSecond+"分钟"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"totalLength",label:"总时长",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.totalLength+"分钟"))])]}}])})],1)]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"gradeName",label:"年级",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"sumCount",label:"总人数",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"averageCount",label:"平均时长",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.averageCount+"分钟"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"totalLength",label:"总时长",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.totalLength+"分钟"))])]}}])})],1)],1)},staticRenderFns:[]}}});