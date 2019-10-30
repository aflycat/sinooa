export const menuList = [{
        name: '首页',
        component: 'HomeComponent',
        show: true,
        children: [],
        CanRead: true,
        CanWrite: true,
        CanReview: true,
        MenuId: 1
    },
    {
        name: '公司运营',
        component: '',
        show: true,
        CanRead: false,
        CanWrite: false,
        CanReview: false,
        MenuId: 2,
        children: [{
                name: '总经理会事宜报告',
                component: 'GeneralManagerComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 2,
                SubMenuId: 1
            },
            {
                name: '合伙人会事宜报告',
                component: 'PartnerComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 2,
                SubMenuId: 2
            },
            {
                name: '股东会事宜报告',
                component: 'ShareHoldersComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 2,
                SubMenuId: 3
            },
            {
                name: '董事会事宜报告',
                component: 'DirectorateComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 2,
                SubMenuId: 4
            },
            {
                name: '监事会事宜报告',
                component: 'SupervisorsComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 2,
                SubMenuId: 5
            },
            {
                name: '自设流程事宜报告',
                component: 'SelfProcessComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 2,
                SubMenuId: 6
            }
        ]
    },
    {
        name: '项目管理',
        component: '',
        show: true,
        CanRead: false,
        CanWrite: false,
        CanReview: false,
        MenuId: 3,
        children: [{
                name: '项目开发报告',
                component: 'DevelopComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 3,
                SubMenuId: 1
            },
            {
                name: '项目立项报告',
                component: 'ProjectApprovalComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 3,
                SubMenuId: 2
            },
            {
                name: '项目变动报告',
                component: 'ChangeComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 3,
                SubMenuId: 3
            },
            {
                name: '项目进展报告',
                component: 'ProcessComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 3,
                SubMenuId: 4
            },
            {
                name: '项目投资报告',
                component: 'InvestmentComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 3,
                SubMenuId: 5
            },
            {
                name: '项目总结报告',
                component: 'SummaryComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 3,
                SubMenuId: 6
            },
            {
                name: '专业文件报告',
                component: 'ProfileComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 3,
                SubMenuId: 7
            },
            {
                name: '业务协议报告',
                component: 'AgreementComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 3,
                SubMenuId: 8
            },
            {
                name: '其它事宜报告',
                component: 'OtherComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 3,
                SubMenuId: 9
            }
        ]
    },
    {
        name: '基金管理',
        component: '',
        show: true,
        CanRead: false,
        CanWrite: false,
        CanReview: false,
        MenuId: 4,
        children: [{
                name: '基金开发报告',
                component: 'FundDevelopComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 4,
                SubMenuId: 1
            },
            {
                name: '基金立项报告',
                component: 'FundProjectsComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 4,
                SubMenuId: 2
            },
            {
                name: '基金变动报告',
                component: 'FundChangesComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 4,
                SubMenuId: 3
            },
            {
                name: '基金事务报告',
                component: 'FundAffairsComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 4,
                SubMenuId: 4
            },
            {
                name: '基金投决报告',
                component: 'FundVoteComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 4,
                SubMenuId: 5
            },
            {
                name: '基金合伙报告',
                component: 'FundPartnershipComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 4,
                SubMenuId: 6
            },
            {
                name: '人员录入',
                component: 'FundPartnershipComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 4,
                SubMenuId: 7
            }
        ]
    },
    {
        name: '费用报销',
        component: '',
        show: true,
        CanRead: false,
        CanWrite: false,
        CanReview: false,
        MenuId: 6,
        children: [{
                name: '差旅费报销单据',
                component: 'TravelExpenseComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 6,
                SubMenuId: 1
            },
            {
                name: '招待费用报销单据',
                component: 'EnterttainmentExpenseComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 6,
                SubMenuId: 2
            },
            {
                name: '一般费用报销单据',
                component: 'GeneralExpenseComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 6,
                SubMenuId: 3
            },
            {
                name: '外勤费用报销',
                component: 'FieldExpenseComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 6,
                SubMenuId: 4
            },
            {
                name: '项目收入发票',
                component: 'ProjectRevenueComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 6,
                SubMenuId: 5
            },
            {
                name: '工资费用发放单据',
                component: 'WagesExpenseComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 6,
                SubMenuId: 6
            },
            {
                name: '个人借款',
                component: 'WagesExpenseComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 6,
                SubMenuId: 7
            }
        ]
    },
    {
        name: '系统设置',
        component: '',
        show: true,
        CanRead: false,
        CanWrite: false,
        CanReview: false,
        MenuId: 7,
        children: [{
                name: '流程模板',
                component: 'ProcessTemplateComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 7,
                SubMenuId: 1
            },
            {
                name: '角色管理',
                component: 'UserManagerComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 7,
                SubMenuId: 2
            },
            {
                name: '角色授权',
                component: 'UserAuthorizationComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 7,
                SubMenuId: 3
            },
            {
                name: '用户管理',
                component: 'PeopleManagerComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 7,
                SubMenuId: 4
            },
            {
                name: '修改密码',
                component: 'ChangePasswordComponent',
                CanRead: false,
                CanWrite: false,
                CanReview: false,
                MenuId: 7,
                SubMenuId: 5
            }
        ]
    }
];