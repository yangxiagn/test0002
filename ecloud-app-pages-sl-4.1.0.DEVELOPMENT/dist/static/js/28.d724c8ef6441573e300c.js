webpackJsonp([28],{"+hVb":function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"tpl-sl-details-body"},[a("div",{staticClass:"tpl-sl-details-body-left",style:{"margin-right":e.expened?"230px":"0px"}},[2==e.rcType?a("hw",{attrs:{"res-id":e.objId},on:{complated:e.handleComplated}}):e._e(),e._v(" "),3==e.rcType?a("exam",{attrs:{"res-id":e.examId,"exam-id":e.examId},on:{complated:e.handleComplated}}):e._e(),e._v(" "),e.rcType?e._e():a("div",{directives:[{name:"show",rawName:"v-show",value:!e.resId,expression:"!resId"}],staticClass:"center",staticStyle:{"line-height":"480px"}},[e._v(" \n            请选择资源\n        ")])],1),e._v(" "),a("div",{staticClass:"tpl-sl-details-body-right",style:{width:e.expened?"230px":"0px",padding:e.expened?"5px":"0px"}},[a("div",{staticClass:"tpl-sl-details-body-right-btn sy-theme-background",style:{visibility:e.expened?"hidden":"visible"},on:{click:function(t){e.expened=!e.expened}}},[a("i",{staticClass:"fa",class:["fa-angle-double-"+(e.expened?"right":"left")],attrs:{"aria-hidden":"true"}})]),e._v(" "),a("el-tree",{staticStyle:{border:"0",height:"100%"},attrs:{data:e.catalogTreeData,"node-key":"id",props:e.defaultProps,"default-expanded-keys":[e.defaultKey],"current-node-key":e.defaultKey,"render-content":e.renderContent,"highlight-current":"","default-expand-all":!1},on:{"node-click":e.handleNodeClick}})],1)])},staticRenderFns:[]}},"2GYw":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,n=a("bOdI"),s=a.n(n),d=a("uu6+"),i=a.n(d),l=a("ZVag"),o=a.n(l),c=a("fv5m");t.default={components:{hw:i.a,exam:o.a},data:function(){return{expened:!0,rcType:null,activeName:"1",objId:"",defaultKey:"",examId:"",catalogTreeData:[],question:"",backForm:{anwser:""},defaultProps:{children:"resourceInfoVM",label:"name"},rules:{name:[{required:!0,message:"请输入活动名称",trigger:"blur"},{min:3,max:5,message:"长度在 3 到 5 个字符",trigger:"blur"}],region:[{required:!0,message:"请选择活动区域",trigger:"change"}],date1:[{type:"date",required:!0,message:"请选择日期",trigger:"change"}],date2:[{type:"date",required:!0,message:"请选择时间",trigger:"change"}],type:[{type:"array",required:!0,message:"请至少选择一个活动性质",trigger:"change"}],resource:[{required:!0,message:"请选择活动资源",trigger:"change"}],desc:[{required:!0,message:"请填写活动形式",trigger:"blur"}]},data:{},name:"",currentData:{}}},created:function(){this.init()},methods:(r={init:function(){var e=JSON.parse(window.sessionStorage.getItem("_course_data"));this.data=e||{},this.name=e.courseName,this.getCatalogTree()},handleNodeClick:function(e){},handleComplated:function(e){var t=this;a.i(c.d)().then(function(r){var n="",s="";r.allYearAndTermVMs&&r.allYearAndTermVMs.forEach(function(e,t){1==e.current&&(n=e.year)}),r.unitSchoolTermRHVM&&(s=r.unitSchoolTermRHVM.schoolTerm);var d={yearId:n,termId:s,courseValue:t.data.courseValue,resId:t.currentData.resId,resName:t.currentData.resName,catalogId:t.currentData.parentId,typeId:e.typeId};a.i(c.g)(d).then(function(e){})}).catch(function(e){})}},s()(r,"handleNodeClick",function(e){this.currentData=e,this.rcType=null,this.questionList=[],this.resId="",this.start=1,"rc"==e.sltype&&(this.resId=e.resId||"",this.rcType=e.type,this.objId=e.objId||"",this.examId=e.examId||"")}),s()(r,"renderContent",function(e,t){var a=t.node,r=t.data;return t.store,e("span",{style:"padding: 5px 0;"},[e("span",null,[e("i",{style:{display:1!=a.level?"none":"",fontSize:"16px",position:"relative",top:"2px"},class:{fa:!0,"fa-folder-o":!a.expanded,"fa-folder-open-o":a.expanded},attrs:{"aria-hidden":"true"}},[]),e("span",{style:{display:"rc"!=r.sltype?"none":"inline-block",width:"36px",height:"36px",verticalAlign:"middle"}},[e("img",{style:"width: 100%;height: 100%;border-radius: 3px;",attrs:{src:c.j+r.userId}},[])]),e("span",null,[" ",r.name])])])}),s()(r,"getCatalogTree",function(){var e=this;a.i(c.l)({courseValue:this.data.courseValue,gradeValue:this.data.gradeValue}).then(function(t){t&&t.forEach(function(e,a){e.resourceInfoVM&&e.resourceInfoVM.forEach(function(t,a){t.name=t.resName,t.sltype="rc",t.id=t.resId,t.parentId=e.id,t.parentName=e.name}),e.parentId||e.resourceInfoVM&&e.resourceInfoVM.forEach(function(a,r){a.name=a.resName,a.sltype="rc",a.parentId=e.id,a.parentName=e.name,t.push(a)})}),e.defaultKey=e.data.resId,e.catalogTreeData=e.data2tree(t)}).catch(function(e){})}),s()(r,"data2tree",function(e,t,a){t||(t="id"),a||(a="parentId");for(var r=[],n=0;n<e.length;n++){var d=_.cloneDeep(e[n]);(d[a+""]||""==d[a+""])&&_.result(_.find(e,s()({},t,d[a+""])),t)||(function r(n){for(var s=[],d=0;d<e.length;d++){var i=_.cloneDeep(e[d]);i[a+""]==n[t+""]&&(s.push(i),r(i))}s.length&&(n.resourceInfoVM=s)}(d),r.push(d))}return r}),r)}},AY49:function(e,t){},UX6t:function(e,t,a){var r=a("VU/8")(a("2GYw"),a("+hVb"),function(e){a("AY49")},null,null);e.exports=r.exports}});