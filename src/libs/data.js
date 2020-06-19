	//任务类型ID
	export const TaskTypeID = {
	    itemDevelop: 3, //项目开发报告
	    itemProjectApproval: 4, //项目立项报告
	    itemChange: 5, //项目变动报告
	    itemProcess: 6, //项目进展
	    itemSummary: 7, //项目总结
	    itemProfile: 8, //项目文件
	    itemAgreement: 9, //项目协议
	    itemOther: 10, //其他事宜
	    TravelExpensesReport: 13, //差旅费报
	    HospitalityExpenses: 14, //招待费用
	    GeneralExpenses: 15, //一般费用
	    general: 16, //总经理会事宜
	    partner: 17, //合伙人会事宜
	    share: 18, //股东会事宜
	    directorate: 19, //董事会事宜
	    supervisors: 20, //监事会事宜
	    workReport: 23, //工时周报
	    FieldExpenses: 24, //外勤费用
	    ProjectIncome: 25, //项目收入
	    itemInvestment: 26, //项目投资
	    fundAffairs: 27, //基金事务
	    fundVote: 28, //基金投决
	    fundPartnership: 29, //基金合伙
	    WageExpenses: 30, //工资费用

	    PlarformAdd: 37,
	    PlatformChange: 38,
	    DepartmentAdd: 40, //部门新增
	    DepartmentChange: 41, //部门修改
	    fundDevelop: 45, //基金开发
	    fundProjects: 46, //基金立项
	    fundChanges: 47, //基金变动
	    fundInvest: 54,
	    funExit: 55,
	}
	export const TaskIDType = {
	    3: "项目开发报告",
	    4: "项目立项报告",
	    5: "项目变动报告",
	    6: "项目进展报告",
	    7: "项目总结报告",
	    8: "项目文件报告",
	    9: "项目协议报告",
	    10: '其他事宜',
	    13: "差旅费报",
	    14: "招待费用",
	    15: "一般费用",
	    16: "总经理会事宜报告",
	    17: "合伙人会事宜报告",
	    18: "股东会事宜报告",
	    19: "董事会事宜报告",
	    20: "监事会事宜报告",
	    23: "工时周报",
	    24: "外勤费用",
	    25: "项目收入",
	    26: "项目投资报告",
	    27: "基金事务报告",
	    28: "基金投决报告",
	    29: "基金合伙人报告",
	    30: "工资费用",
	    37: '权属平台新增',
	    38: '权属平台变动',
	    40: '部门新增',
	    41: '部门变动',
	    45: '基金开发',
	    46: '基金立项',
	    47: '基金变动',
	    54: '基金投资',
	    55: '基金退出'


	}
	export const SEX = [
	    { 'value': '保密', 'name': '保密' },
	    { 'value': '男', 'name': '男' },
	    { 'value': '女', 'name': '女' }
	];
	export const DEGREE = [
	    { 'value': '保密', 'name': '保密' },
	    { 'value': '学士', 'name': '学士' },
	    { 'value': '硕士', 'name': '硕士' },
	    { 'value': '博士', 'name': '博士' }
	];
	export const targetType = [{
	        'label': '投资于项目',
	        'value': '1'
	    },
	    {
	        'label': '投资于基金',
	        'value': '2'
	    }
	]
	export const platformMemberType = {
	    1: '自然人',
	    2: '机构内部股东',
	    3: '机构外部股东',
	    4: '法人代表',
	    5: '董事长',
	    6: '董事',
	    7: '监事',
	    8: '总经理',
	    9: '合伙人'
	}
	export const paltformMemberStatus = {
	    1: '目前的成员',
	    2: '过往的成员'
	}