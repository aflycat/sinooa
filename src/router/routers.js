import Main from "@/components/main"
//import parentView from "@/components/parent-view"

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用"{{ 多语言字段 }}"形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线"_"
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去"@/router/before-close.js"里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [{
        path: "/login",
        name: "login",
        meta: {
            title: "Login - 登录",
            hideInMenu: true
        },
        component: () =>
            import ("@/view/login/login.vue")
    },
    {
        path: "/",
        name: "_home",
        redirect: "/home",
        component: Main,
        meta: {
            hideInMenu: true,
            notCache: true

        },
        children: [{
            path: "/home",
            name: "home",
            meta: {
                hideInMenu: true,
                title: "首页",
                notCache: true,
                icon: "md-home"
            },
            component: () =>
                import ("@/view/single-page/home")
        }]
    },



    // {
    //     path: "",
    //     name: "doc",
    //     meta: {
    //         title: "文档",
    //         href: "https://lison16.github.io/iview-admin-doc/#/",
    //         icon: "ios-book",
    //         hideInMenu: true
    //     }
    // },

    {

        path: "/normal",
        name: "normal",
        component: Main,
        meta: {
            title: "常用功能",
            icon: "md-home"
        },
        children: [{
                path: "weekly",
                name: "weekly",
                meta: {
                    title: "周报",
                    icon: "ios-paper"
                },
                component: () =>
                    import ("@/view/components/weekly/weekly.vue")
            }, {
                path: "nead_deal",
                name: "nead_deal",
                meta: {
                    title: "待办任务",
                    icon: "md-notifications"
                },
                component: () =>
                    import ("@/view/components/nead_deal/nead_deal.vue")
            }, {
                path: "task_search",
                name: "task_search",
                meta: {
                    title: "任务查询",
                    icon: "md-briefcase"
                },
                component: () =>
                    import ("@/view/components/task_search/task_search.vue")
            }, {
                path: "enclosure_search",
                name: "enclosure_search",
                meta: {

                    title: "附件查询",
                    icon: "md-attach"
                },
                component: () =>
                    import ("@/view/components/enclosure_search/enclosure_search.vue")
            },
            {
                path: "draft_search",
                name: "draft_search",
                meta: {
                    title: "草稿箱",
                    icon: "ios-folder-open"
                },
                component: () =>
                    import ("@/view/components/draft_search/draft_search.vue")
            },
            {
                path: "data_search",
                name: "data_search",
                meta: {
                    title: "资料搜索",
                    icon: "md-search"
                },
                component: () =>
                    import ("@/view/components/data_search/data_search.vue")
            },
            // {
            //     path: "leave",
            //     name: "leave",
            //     meta: {
            //         title: "请假申请",
            //         icon: "md-medical"
            //     },
            //     component: () =>
            //         import ("@/view/components/leave/leave.vue")
            // },
            {
                path: "deal_detail",
                name: "deal_detail",
                meta: {
                    title: "代办任务详情",
                    hideInMenu: true
                },
                component: () =>
                    import ("@/view/components/nead_deal/nead_deal_detail.vue")
            }

        ]
    },

    {
        path: "/program",
        name: "program",
        meta: {
            title: "项目管理报告",
            icon: "md-code"
        },
        component: Main,
        children: [{
                path: "development",
                name: "development",
                meta: {
                    icon: "md-code-download",
                    title: "项目开发"
                },
                component: () =>
                    import ("@/view/components/program/development.vue")
            }, {
                path: "approval",
                name: "approval",
                meta: {
                    icon: "md-code-working",
                    title: "项目立项"
                },
                component: () =>
                    import ("@/view/components/program/approval.vue")
            }, {
                path: "change",
                name: "change",
                meta: {
                    icon: "md-fastforward",
                    title: "项目变动"
                },
                component: () =>
                    import ("@/view/components/program/change.vue")
            },
            {
                path: "progress",
                name: "progress",
                meta: {
                    icon: "ios-map",
                    title: "项目进展"
                },
                component: () =>
                    import ("@/view/components/program/progress.vue")
            },
            {
                path: "investment",
                name: "investment",
                meta: {
                    icon: "md-locate",
                    title: "项目投资"
                },
                component: () =>
                    import ("@/view/components/program/investment.vue")
            },
            {
                path: "summary",
                name: "summary",
                meta: {
                    icon: "md-pricetag",
                    title: "项目总结"
                },
                component: () =>
                    import ("@/view/components/program/summary.vue")
            },
            {
                path: "file",
                name: "file",
                meta: {
                    icon: "ios-folder",
                    title: "专业文件"
                },
                component: () =>
                    import ("@/view/components/program/file.vue")
            }, {
                path: "agreement",
                name: "agreement",
                meta: {
                    icon: "md-clipboard",
                    title: "业务协议"
                },
                component: () =>
                    import ("@/view/components/program/agreement.vue")
            }, {
                path: "other",
                name: "other",
                meta: {
                    icon: "ios-link",
                    title: "其他事宜"
                },
                component: () =>
                    import ("@/view/components/program/other.vue")
            }, {
                path: "programlist",
                name: "programlist",
                meta: {
                    icon: "ios-list-box",
                    title: "项目列表"
                },
                component: () =>
                    import ("@/view/components/program/prolist.vue")
            }, {
                path: "customlist",
                name: "customlist",
                meta: {
                    icon: "md-list-box",
                    title: "客户列表"
                },
                component: () =>
                    import ("@/view/components/program/customlist.vue")
            },
            {
                path: "dynamic_template",
                name: "dynamic_template",
                meta: {
                    icon: "md-bulb",
                    title: "动态模板"
                },
                component: () =>
                    import ("@/view/components/program/dynamicTemplate.vue")
            }


        ]


    },
    {
        path: "/fund",
        name: "fund",
        meta: {
            icon: "logo-buffer",
            title: "基金管理"
        },
        component: Main,
        children: [{
                path: "development",
                name: "fund_development",
                meta: {
                    icon: "md-code-download",
                    title: "基金开发"
                },
                component: () =>
                    import ("@/view/components/fund/development.vue")
            }, {
                path: "approval",
                name: "fund_approval",
                meta: {
                    icon: "md-code-working",
                    title: "基金立项"
                },
                component: () =>
                    import ("@/view/components/fund/approval.vue")
            }, {
                path: "change",
                name: "fund_change",
                meta: {
                    icon: "md-fastforward",
                    title: "基金变动"
                },
                component: () =>
                    import ("@/view/components/fund/change.vue")
            }, {
                path: "execute",
                name: "execute",
                meta: {
                    icon: "ios-checkmark-circle",
                    title: "基金执行事务"
                },
                component: () =>
                    import ("@/view/components/fund/execute.vue")
            },
            {
                path: "cast",
                name: "cast",
                meta: {
                    icon: "md-create",
                    title: "基金投决会会议"
                },
                component: () =>
                    import ("@/view/components/fund/cast.vue")
            },
            {
                path: "fund_partner",
                name: "fund_partner",
                meta: {
                    icon: "md-person-add",
                    title: "基金合伙人会议"
                },
                component: () =>
                    import ("@/view/components/fund/fund_partner.vue")
            },
            {
                path: "fund_investment",
                name: "fund_investment",
                meta: {
                    icon: "md-locate",
                    title: "基金投资"
                },
                component: () =>
                    import ("@/view/components/fund/investment.vue")
            }, {
                path: "fund_exit",
                name: "fund_exit",
                meta: {
                    icon: "md-log-out",
                    title: "基金退出"
                },
                component: () =>
                    import ("@/view/components/fund/exit.vue")
            }
            // {
            //     path: "fund_add",
            //     name: "fund_add",
            //     meta: {
            //         icon: "md-shirt",
            //         title: "人员录入"
            //     },
            //     component: () =>
            //         import ("@/view/components/fund/add.vue")
            // }
        ]
    },
    {
        path: "/cost",
        name: "cost",
        meta: {
            icon: "ios-card",
            title: "消费报销"
        },
        component: Main,
        children: [{
                path: "travel",
                name: "travel",
                meta: {
                    icon: "md-train",
                    title: "差旅费报销"
                },
                component: () =>
                    import ("@/view/components/cost/travel.vue")
            },
            {
                path: "entertain",
                name: "entertain",
                meta: {
                    icon: "ios-chatboxes",
                    title: "招待费报销"
                },
                component: () =>
                    import ("@/view/components/cost/entertain.vue")
            },
            {
                path: "general",
                name: "general",
                meta: {
                    icon: "md-flame",
                    title: "一般费用报销"
                },
                component: () =>
                    import ("@/view/components/cost/general.vue")
            },
            {
                path: "field",
                name: "field",
                meta: {
                    icon: "ios-walk",
                    title: "外勤费用"
                },
                component: () =>
                    import ("@/view/components/cost/field.vue")
            },
            {
                path: "cost_program",
                name: "cost_program",
                meta: {
                    icon: "md-trending-up",
                    title: "项目收入发票"
                },
                component: () =>
                    import ("@/view/components/cost/cost_program.vue")
            },
            {
                path: "wage",
                name: "wage",
                meta: {
                    icon: "md-thumbs-up",
                    title: "工资费用发放"
                },
                component: () =>
                    import ("@/view/components/cost/wage.vue")
            },
            // {
            //     path: "borrow",
            //     name: "borrow",
            //     meta: {
            //         icon: "logo-yen",
            //         title: "个人借款"
            //     },
            //     component: () =>
            //         import ("@/view/components/cost/borrow.vue")
            // }
        ]
    },
    {
        path: "/platform",
        name: "platformset",
        meta: {
            icon: "md-flag",
            title: "权属平台管理"
        },
        component: Main,
        children: [{
                path: 'platfoem_app',
                name: "platform_app",
                meta: {
                    icon: "md-add",
                    title: "平台申请"
                },
                component: () =>
                    import ("@/view/components/platform/application.vue")

            }, {
                path: 'platform_change',
                name: "platform_change",
                meta: {
                    icon: "md-sync",
                    title: "平台修改"
                },
                component: () =>
                    import ("@/view/components/platform/change.vue")

            },
            {
                path: "platform_list",
                name: "platform_list",
                meta: {
                    icon: "ios-apps",
                    title: "平台列表"
                },
                component: () =>
                    import ("@/view/components/platform/list.vue")
            }, {
                path: "generral_manager",
                name: "generral_manager",
                meta: {
                    icon: "ios-person",
                    title: "总经理会事宜报告"
                },
                component: () =>
                    import ("@/view/components/operation/manager.vue")
            }, {
                path: "partner",
                name: "partner",
                meta: {
                    icon: "md-people",
                    title: "合伙人会事宜报告"
                },
                component: () =>
                    import ("@/view/components/operation/parnter.vue")
            }, {
                path: "shareholder",
                name: "shareholder",
                meta: {
                    icon: "ios-man",
                    title: "股东会事宜报告"
                },
                component: () =>
                    import ("@/view/components/operation/shareholder.vue")
            }, {
                path: "director",
                name: "director",
                meta: {
                    icon: "ios-people",
                    title: "董事会事宜报告"
                },
                component: () =>
                    import ("@/view/components/operation/director.vue")
            }, {
                path: "supervisor",
                name: "supervisor",
                meta: {
                    icon: "md-person",
                    title: "监事会事宜报告"
                },
                component: () =>
                    import ("@/view/components/operation/supervisor.vue")
            },

        ]
    }, {
        path: "/department",
        name: "department_set",
        meta: {
            icon: "ios-contacts",
            title: "部门管理",

        },
        component: Main,
        children: [{
                path: "department_app",
                name: "department_app",
                meta: {
                    icon: "md-add",
                    title: "部门申请"
                },
                component: () =>
                    import ("@/view/components/department/application.vue")
            }, {
                path: 'department_change',
                name: "department_change",
                meta: {
                    icon: "md-sync",
                    title: "部门修改"
                },
                component: () =>
                    import ("@/view/components/department/change.vue")

            },
            {
                path: "department_list",
                name: "department_list",
                meta: {
                    icon: "ios-apps-outline",
                    title: "部门列表"
                },
                component: () =>
                    import ("@/view/components/department/list.vue")

            }
        ]
    },
    // {
    //     path: "/change",
    //     name: "change_manager",
    //     meta: {
    //         icon: "md-pulse",
    //         title: "变动管理"
    //     },
    //     component: Main,
    //     children: [{
    //             path: "change_program",
    //             name: "change_program",
    //             meta: {
    //                 icon: "ios-podium",
    //                 title: "项目"
    //             },
    //             component: () =>
    //                 import ("@/view/components/change/change_program.vue")
    //         },
    //         {
    //             path: "change_role",
    //             name: "change_role",
    //             meta: {
    //                 icon: "md-medal",
    //                 title: "角色"
    //             },
    //             component: () =>
    //                 import ("@/view/components/change/change_role.vue")
    //         },
    //         {
    //             path: "change_admin",
    //             name: "change_admin",
    //             meta: {
    //                 icon: "md-megaphone",
    //                 title: "权限"
    //             },
    //             component: () =>
    //                 import ("@/view/components/change/change_admin.vue")
    //         },
    //         {
    //             path: "change_schedule",
    //             name: "change_schedule",
    //             meta: {
    //                 icon: "md-options",
    //                 title: "进度计划"
    //             },
    //             component: () =>
    //                 import ("@/view/components/change/change_schedule.vue")
    //         },
    //         {
    //             path: "change_tap",
    //             name: "change_tap",
    //             meta: {
    //                 icon: "md-bookmark",
    //                 title: "页签变动"
    //             },
    //             component: () =>
    //                 import ("@/view/components/change/change_tap.vue")
    //         },
    //         {
    //             path: "change_file",
    //             name: "change_file",
    //             meta: {
    //                 icon: "md-filing",
    //                 title: "文件目录"
    //             },
    //             component: () =>
    //                 import ("@/view/components/change/change_file.vue")
    //         },
    // {
    //     path: "change_platform",
    //     name: "change_platform",
    //     meta: {
    //         icon: "md-flag",
    //         title: "权属平台"
    //     },
    //     component: () =>
    //         import ("@/view/components/change/change_platform.vue")
    // },
    // {
    //     path: "change_department",
    //     name: "change_department",
    //     meta: {
    //         icon: "logo-codepen",
    //         title: "部门管理"
    //     },
    //     component: () =>
    //         import ("@/view/components/change/change_department.vue")
    // }

    //     ]
    // },
    {
        path: "/setting",
        name: "setting",
        meta: {
            icon: "md-settings",
            title: "设置",


        },
        component: Main,
        children: [{
                path: "information",
                name: "information",
                meta: {
                    icon: "md-person",
                    title: "个人信息"
                },
                component: () =>
                    import ("@/view/components/setting/information.vue")
            },
            {
                path: "process",
                name: "process",
                meta: {
                    icon: "md-git-commit",
                    title: "流程设置"
                },
                component: () =>
                    import ("@/view/components/setting/process.vue")
            },
            {
                path: "role",
                name: "role",
                meta: {
                    icon: "ios-contact",
                    title: "角色管理"
                },
                component: () =>
                    import ("@/view/components/setting/role.vue")
            },
            {
                path: "member",
                name: "member",
                meta: {
                    icon: "md-grid",
                    title: "人员管理"
                },
                component: () =>
                    import ("@/view/components/setting/member.vue")
            }
        ]
    },
    // {
    //     path: "/components",
    //     name: "components",
    //     meta: {
    //         icon: "logo-buffer",
    //         title: "组件"
    //     },
    //     component: Main,
    //     children: [{
    //             path: "split_pane_page",
    //             name: "split_pane_page",
    //             meta: {
    //                 icon: "md-pause",
    //                 title: "分割窗口"
    //             },
    //             component: () =>
    //                 import ("@/view/components/split-pane/split-pane.vue")
    //         },

    //     ]
    // },/define_process/define_excel
    {
        path: "/define_process",
        name: "define_process",
        meta: {
            // showAlways: false,
            hideInMenu: true
        },
        component: Main,
        children: [{
                path: "define_excel",
                name: "define_excel",
                meta: {
                    // showAlways: false,
                    icon: "md-pause",
                    title: "自定义流程"
                },
                component: () =>
                    import ("@/view/components/define/excel.vue")
            },

        ]
    },


    // {
    //     path: "/tools_methods",
    //     name: "tools_methods",
    //     meta: {
    //         hideInBread: true
    //     },
    //     component: Main,
    //     children: [{
    //         path: "tools_methods_page",
    //         name: "tools_methods_page",
    //         meta: {
    //             icon: "ios-hammer",
    //             title: "工具方法",
    //             beforeCloseName: "before_close_normal"
    //         },
    //         component: () =>
    //             import ("@/view/tools-methods/tools-methods.vue")
    //     }]
    // },

    {
        path: "/error_store",
        name: "error_store",
        meta: {
            // showInBread: false
        },
        component: Main,
        children: [{
            path: "error_store_page",
            name: "error_store_page",
            meta: {
                icon: "ios-bug",
                title: "开发日志"
            },
            component: () =>
                import ("@/view/error-store/error-store.vue")
        }]
    },


    // {
    //     path: "/argu",
    //     name: "argu",
    //     meta: {
    //         hideInMenu: true
    //     },
    //     component: Main,
    //     children: [{
    //             path: "params/:id",
    //             name: "params",
    //             meta: {
    //                 icon: "md-flower",
    //                 title: route => `{{ params }}-${route.params.id}`,
    //                 notCache: true,
    //                 beforeCloseName: "before_close_normal"
    //             },
    //             component: () =>
    //                 import ("@/view/argu-page/params.vue")
    //         },
    //         {
    //             path: "query",
    //             name: "query",
    //             meta: {
    //                 icon: "md-flower",
    //                 title: route => `{{ query }}-${route.query.id}`,
    //                 notCache: true
    //             },
    //             component: () =>
    //                 import ("@/view/argu-page/query.vue")
    //         }
    //     ]
    // },
    // {
    //     path: "/401",
    //     name: "error_401",
    //     meta: {
    //         title: "401"
    //             // hideInMenu: true
    //     },
    //     component: () =>
    //         import ("@/view/error-page/401.vue")
    // },
    // {
    //     path: "/500",
    //     name: "error_500",
    //     meta: {
    //         title: "500"
    //             // hideInMenu: true
    //     },
    //     component: () =>
    //         import ("@/view/error-page/500.vue")
    // },
    // {
    //     path: "*",
    //     name: "error_404",
    //     meta: {
    //         title: "404"
    //             // hideInMenu: true
    //     },
    //     component: () =>
    //         import ("@/view/error-page/404.vue")
    // }
]