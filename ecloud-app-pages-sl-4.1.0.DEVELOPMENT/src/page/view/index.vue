<template>
	<div class="sy-app-container">
        <div class="sy-home-body-left" :style="{width:leftWidth+'px'}">
            <div class="change-menu-icon">
                <i class="fa fa-outdent" aria-hidden="true" :class="{'iocn-rotate-l': isRotate}" @click="changeNavStyle"></i>
            </div>
            <sy-left-nav router :defaultActive="currentPage" :navList="navList" :isIcon="isShowText"></sy-left-nav>
        </div>
        <div class="sy-home-body-right" :style="{left: leftPosition + 'px'}">
            <transition name="fade" mode="out-in" appear>
                <router-view></router-view>
            </transition>
        </div>
	</div>
</template>

<script>
import { getCodeMenuList  } from '../request.js';
export default {
	name: 'hello',
	data() {
		return {
			isShowText: true,
			leftWidth: 230,
			leftPosition: 230,
			isRotate: false,
			currentPage: '',
			navList: [],
		}
	},
	created() {
		this.init();
	},
	methods: {
		init(){
            let _this = this;
            this.$on('currentPage', function(msg) {
                _this.currentPage = msg;
            });
            this.$on('change-user-name', function(name) {
                _this.userName = name;
            })
			
            if(this.$store.state.userType == 1){ // 学生
                this.navList = [
                    {
                        sort: 7,
                        isSelect: false,
                        menuRoute: '/sl/home/stuhome',
                        name: this.$store.state.lang.sl.t1 || '我的主页',
                        id: 'exam_7',
                        parentId: 'exam',
                        code: 'exam_7',
                        indexUrl: '',
                        opener: 1,
                        icon: 'fa-home',
                        children: []
                    },
                    {
                        sort: 9,
                        isSelect: false,
                        menuRoute: '/sl/home/stutele',
                        name: this.$store.state.lang.sl.t2 || '课堂直播',
                        id: 'exam_9',
                        parentId: 'exam',
                        code: 'exam_9',
                        icon: 'fa-laptop',
                        children: []
                    },
                    {
                        sort: 8,
                        isSelect: false,
                        menuRoute: '/sl/home/stustudy',
                        name: this.$store.state.lang.sl.t3 || '我的收藏',
                        id: 'exam_8',
                        parentId: 'exam',
                        code: 'exam_8',
                        icon: 'fa-book',
                        children: []
                    }
                ]
            }else if(this.$store.state.userType == 2){ // 教师
            // app_sl_teacher
                getCodeMenuList('app_sl_teacher').then((data) => {
                    this.navListData(data)
                }).catch(err=>{});
                // this.navList = [
                //     {
                //         sort: 1,
                //         isSelect: false,
                //         menuRoute: '/sl/home/home',
                //         name: this.$store.state.lang.sl.t1 || '我的主页',
                //         id: 'exam_1',
                //         parentId: 'exam',
                //         code: 'exam_1',
                //         icon: 'fa-home',
                //         children: []
                //     },
                //     {
                //         sort: 2,
                //         isSelect: false,
                //         menuRoute: '/sl/home/count',
                //         name: this.$store.state.lang.sl.t4 || '统计分析',
                //         id: 'exam_2',
                //         parentId: 'exam',
                //         code: 'exam_2',
                //         icon: 'fa-bar-chart',
                //         children: []
                //     },
                //     {
                //         sort: 3,
                //         isSelect: false,
                //         menuRoute: '/sl/home/telecast',
                //         name: this.$store.state.lang.sl.t5 || '直播课堂',
                //         id: 'exam_3',
                //         parentId: 'exam',
                //         code: 'exam_3',
                //         icon: 'fa-laptop',
                //         children: []
                //     },
                //     {
                //         sort: 4,
                //         isSelect: false,
                //         menuRoute: '/sl/home/setting',
                //         name: this.$store.state.lang.sl.t6 || '课程设置',
                //         id: 'exam_4',
                //         parentId: 'exam',
                //         code: 'exam_4',
                //         indexUrl: '',
                //         opener: 1,
                //         icon: 'fa-life-ring',
                //         children: []
                //     }
                // ]
            }else{ // 家长
                this.navList = [
                    {
                        sort: 5,
                        isSelect: false,
                        menuRoute: '/sl/home/parhome',
                        name: this.$store.state.lang.sl.t1 || '我的主页',
                        id: 'exam_5',
                        parentId: 'exam',
                        code: 'exam_5',
                        indexUrl: '',
                        opener: 1,
                        icon: 'fa-home',
                        children: []
                    },
                    {
                        sort: 6,
                        isSelect: false,
                        menuRoute: '/sl/home/parstudy',
                        name: this.$store.state.lang.sl.t7 || '学生学习',
                        id: 'exam_6',
                        parentId: 'exam',
                        code: 'exam_6',
                        icon: 'fa-book',
                        children: []
                    }
                ]
            }
		},
		navListData(data){
			data.forEach((_a,a)=>{
				if(_a.resourceType == 2){
                    _a.name = this.$store.state.lang.sl[_a.code] || _a.name;
					_a.children.forEach((_d,d)=>{
						if(_d.resourceType == 2){
                            _d.name = this.$store.state.lang.sl[_d.code] || _d.name;
						}
					})
				}
            })
			this.navList = data;
		},
		changeNavStyle() {
			this.isShowText = !this.isShowText;
			this.isRotate = !this.isRotate;
			this.leftWidth = this.isShowText ? 220 : 50;
			this.leftPosition = this.isShowText ? 220 : 50;
		}
	}
}
</script>
<style>
    /* 修改默认样式 */
    .el-table__expanded-cell{
        padding:0;
        padding-left: 50px;
    }
</style>