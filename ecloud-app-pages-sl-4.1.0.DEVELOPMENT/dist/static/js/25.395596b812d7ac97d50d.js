webpackJsonp([25],{"4TBm":function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"sy-app-container"},[a("div",{staticClass:"sy-home-body-left",style:{width:e.leftWidth+"px"}},[a("div",{staticClass:"change-menu-icon"},[a("i",{staticClass:"fa fa-outdent",class:{"iocn-rotate-l":e.isRotate},attrs:{"aria-hidden":"true"},on:{click:e.changeNavStyle}})]),e._v(" "),a("sy-left-nav",{attrs:{router:"",defaultActive:e.currentPage,navList:e.navList,isIcon:e.isShowText}})],1),e._v(" "),a("div",{staticClass:"sy-home-body-right",style:{left:e.leftPosition+"px"}},[a("transition",{attrs:{name:"fade",mode:"out-in",appear:""}},[a("router-view")],1)],1)])},staticRenderFns:[]}},Ek31:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),a("r6Pd"),t.default={name:"hello",data:function(){return{isShowText:!0,leftWidth:230,leftPosition:230,isRotate:!1,currentPage:"",navList:[]}},created:function(){this.init()},methods:{init:function(){var e=this;this.$on("currentPage",function(t){e.currentPage=t}),this.$on("change-user-name",function(t){e.userName=t}),1==this.$store.state.userType?this.navList=[{sort:7,isSelect:!1,menuRoute:"/sl/home/stuhome",name:"我的主页",id:"exam_7",parentId:"exam",code:"exam_7",indexUrl:"",opener:1,icon:"fa-home",children:[]},{sort:9,isSelect:!1,menuRoute:"/sl/home/stutele",name:"课堂直播",id:"exam_9",parentId:"exam",code:"exam_9",icon:"fa-laptop",children:[]},{sort:8,isSelect:!1,menuRoute:"/sl/home/stustudy",name:"我的收藏",id:"exam_8",parentId:"exam",code:"exam_8",icon:"fa-book",children:[]}]:2==this.$store.state.userType?this.navList=[{sort:1,isSelect:!1,menuRoute:"/sl/home/home",name:"我的主页",id:"exam_1",parentId:"exam",code:"exam_1",icon:"fa-home",children:[]},{sort:2,isSelect:!1,menuRoute:"/sl/home/count",name:"统计分析",id:"exam_2",parentId:"exam",code:"exam_2",icon:"fa-bar-chart",children:[]},{sort:3,isSelect:!1,menuRoute:"/sl/home/telecast",name:"直播课堂",id:"exam_3",parentId:"exam",code:"exam_3",icon:"fa-laptop",children:[]},{sort:4,isSelect:!1,menuRoute:"/sl/home/setting",name:"课程设置",id:"exam_4",parentId:"exam",code:"exam_4",indexUrl:"",opener:1,icon:"fa-life-ring",children:[]}]:this.navList=[{sort:5,isSelect:!1,menuRoute:"/sl/home/parhome",name:"我的主页",id:"exam_5",parentId:"exam",code:"exam_5",indexUrl:"",opener:1,icon:"fa-home",children:[]},{sort:6,isSelect:!1,menuRoute:"/sl/home/parstudy",name:"学生学习",id:"exam_6",parentId:"exam",code:"exam_6",icon:"fa-book",children:[]}]},navListData:function(e){var t=this;e.forEach(function(e,a){2==e.resourceType&&(e.name=t.$store.state.lang.base[e.code]||e.name,e.children.forEach(function(e,a){2==e.resourceType&&(e.name=t.$store.state.lang.base[e.code]||e.name)}))}),this.navList=e},changeNavStyle:function(){this.isShowText=!this.isShowText,this.isRotate=!this.isRotate,this.leftWidth=this.isShowText?220:50,this.leftPosition=this.isShowText?220:50}}}},Ni3P:function(e,t,a){var n=a("VU/8")(a("Ek31"),a("4TBm"),function(e){a("cYbj")},null,null);e.exports=n.exports},cYbj:function(e,t){}});