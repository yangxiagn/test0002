const _import = require("@/router/" + process.env.NODE_ENV);

let routes = [{
        path: "/sl",
        name: "sl",
        component: _import("page/Index"),
        children: [{
                path: "home",
                name: "prehome",
                component: _import("page/view/index"),
                children: [{
                        path: "hello",
                        name: "slhello",
                        component: _import("commonPage/hello/Hello")
                    },
                    {
                        path: "home",
                        name: "slname",
                        component: _import("page/view/home/Home")
                    },
                    {
                        path: "question",
                        name: "slquestion",
                        component: _import("page/view/home/Question")
                    },
                    {
                        path: "count",
                        name: "slcount",
                        component: _import("page/view/count/Count")
                    },
                    {
                        path: "telecast",
                        name: "sltelecast",
                        component: _import("page/view/telecast/Telecast")
                    },
                    {
                        path: "classroom",
                        name: "slclassroom",
                        component: _import("page/view/telecast/Classroom")
                    },
                    //家长
                    {
                        path: "parhome",
                        name: "parhome",
                        component: _import("page/view/parent/Home")
                    },
                    {
                        path: "parstudy",
                        name: "parstudy",
                        component: _import("page/view/parent/Study")
                    },

                    {
                        path: "parlist",
                        name: "parlist",
                        component: _import("page/view/parent/List")
                    },
                    {
                        path: "pardetails",
                        name: "pardetails",
                        component: _import("page/view/parent/Details")
                    },
                    // 学生
                    {
                        path: "stuhome",
                        name: "stuhome",
                        component: _import("page/view/student/Home")
                    },
                    {
                        path: "stustudy",
                        name: "stustudy",
                        component: _import("page/view/student/Study")
                    },
                    {
                        path: "stutele",
                        name: "stutele",
                        component: _import("page/view/student/Telecast")
                    },
                    // 知识点微课详情
                    {
                        path: "stuknow",
                        name: "stuknow",
                        component: _import("page/view/student/Knowvideo")
                    },
                    // 直播课堂详情
                    {
                        path: "stuclass",
                        name: "stuclass",
                        component: _import("page/view/student/Classroom")
                    },
                    // 设置
                    {
                        path: "setting",
                        name: "setting",
                        component: _import("page/view/setting/index")
                    },
                    {
                        path: "auth",
                        name: "auth",
                        component: _import("page/view/syssetting/authcode")
                    },
                    {
                        path: "log",
                        name: "log",
                        component: _import("page/view/syssetting/log/log")
                    },
                    {
                        path: "/",
                        redirect: "/sl/home/hello"
                    }
                ]
            },
            {
                path: "details",
                name: "details",
                component: _import("page/view/details/index")
            },
            {
                path: "not",
                name: "not",
                component: _import("commonPage/not/index")
            },
            {
                path: "/",
                redirect: "/sl/home"
            }
        ]
    },
    {
        path: "/",
        redirect: "/sl"
    },
    {
        path: '*',
        component: _import("commonPage/404/index")
    }
];

export default routes;