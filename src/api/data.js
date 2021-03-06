import axios from '@/libs/api.request'
//根据状态获取项目列表
export const getProjectList = data => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/projecttask/projectlistquery',
            data: data,
            method: 'post',
        })
    }
    //根据id获取项目列表

//根据项目id获取项目的详细信息
// "ProjectID":""
export const getProjectDetail = (data) => {
    return axios.request({
        url: 'http://120.78.154.66:8089/api/projecttask/projectquery/',
        data,
        method: 'post',
    })
}

//项目开发，立项无文件申请
export const addNewProjecttask = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/projecttask/pmtadd/',
            data,
            method: 'post',
        })
    }
    //项目开发，立项有文件申请
export const addNewProjecttaskTofile = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/projecttask/pmtaddtofile/',
            data,
            method: 'post',
        })
    }
    //项目开发，立项有文件申请修改并同意
export const addNewProjecttaskMod = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/projecttask/pmtmodagree',
            data,
            method: 'post',
        })
    }
    //进展 中止 终止 提交申请，无文件提交
export const addNewProTaskProcess = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/projecttask/potadd/',
            data,
            method: 'post',
        })
    }
    //进展 中止 终止 提交申请，文件提交
export const addNewProTaskProcessFile = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/projecttask/potaddtofile/',
            data,
            method: 'post',
        })
    }
    //进展 中止 终止 修改并同意
export const addNewProTaskProcessMod = (data) => {
    return axios.request({
        url: 'http://120.78.154.66:8089/api/projecttask/potmodagree',
        data,
        method: 'post',
    })
}


//基金开发，立项,变动
export const addNewFundTask = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/fundtask/fmtadd/',
            data,
            method: 'post',
        })
    }
    //基金开发，立项,变动文件
export const addNewFundTaskFile = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/fundtask/fmtaddtofile/',
            data,
            method: 'post',
        })
    }
    //基金开发立项修改并同意
export const addNewFundTaskModAgree = (data) => {
    return axios.request({
        url: 'http://120.78.154.66:8089/api/fundtask/fmtmodagree',
        data,
        method: 'post',
    })
}


//基金执行，投决，合伙人
export const addNewFunOperaTask = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/fundtask/fotadd/',
            data,
            method: 'post'
        })
    }
    //基金执行，投决，合伙文件
export const addNewFunOperaTaskFile = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/fundtask/fotaddtofile/',
            data,
            method: 'post'
        })
    }
    //基金执行，投决，合伙文件修改并同意
export const addNewFunOperaTaskModAgree = (data) => {
    return axios.request({
        url: 'http://120.78.154.66:8089/api/fundtask/fotmodagree',
        data,
        method: 'post'
    })
}

//基金投资
export const addNewFundInvestTask = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/fundtask/fitadd/',
            data,
            method: 'post'
        })
    }
    //基金投资文件
export const addNewFundInvestTaskFile = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/fundtask/fitaddtofile/',
            data,
            method: 'post'
        })
    }
    //基金投资修改并同意
export const addNewFundInvestTaskModAgree = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/fundtask/fitmodagree',
            data,
            method: 'post'
        })
    }
    //基金退出
export const addNewFundExitTask = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/fundtask/fetadd/',
            data,
            method: 'post'
        })
    }
    //基金退出文件
export const addNewFundExitTaskFile = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/fundtask/fetaddtofile/',
            data,
            method: 'post'
        })
    }
    //基金退出修改并同意
export const addNewFundExitTaskModAgree = (data) => {
    return axios.request({
        url: 'http://120.78.154.66:8089/api/fundtask/fetmodagree',
        data,
        method: 'post'
    })
}

//获取所有的基金列表
export const getAllFundList = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/fundtask/fundlistquery/',
            data,
            method: 'post'
        })
    }
    //获取该基金的详细信息
export const getFundDetail = (data) => {
    return axios.request({
        url: 'http://120.78.154.66:8089/api/fundtask/fundquery/',
        data,
        method: 'post'
    })
}




//审批同意

export const taskFlowAgree = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/taskflow/agree/',
            data,
            method: 'post',
        })
    }
    //审批不同意

export const taskFlowDisagree = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/taskflow/disagree/',
            data,
            method: 'post',
        })
    }
    //审批返回修改

export const taskFlowReturn = (data) => {
    return axios.request({
        url: 'http://120.78.154.66:8089/api/taskflow/return/',
        data,
        method: 'post',
    })
}


//获取周报历史数据
export const getworkWeekHistory = (data) => {
    return axios.request({
        url: "http://120.78.154.66:8089/api/workReport/qry",
        data,
        method: "post"
    })
}

//获取项目品种
export const getprogectType = (data) => {
    return axios.request({
        url: "http://120.78.154.66:8089/api/projectType/qryPage/",
        data,
        method: "post"
    })
}


//获取项目角色
export const getprogectRole = (data) => {
    return axios.request({
        url: "http://120.78.154.66:8089/api/projectRole/qryPage/",
        data,
        method: "post"
    })
}


//获取项目成员
export const getuserList = (data) => {
        return axios.request({
            url: "http://120.78.154.66:8089/api/user/qryPage/",
            data,
            method: "post"
        })
    }
    //获取所有的用户
export const getAllUserList = (data) => {
    return axios.request({
        url: "http://120.78.154.66:8089/api/user/qryAll/",
        data,
        method: "post"
    })
}

//获取所在城市
export const getCityList = (data) => {
    return axios.request({
        url: "http://120.78.154.66:8089/api/region/qryPage/",
        data,
        method: "post"
    })
}


//获取所属行业
export const getIndustryList = (data) => {
        return axios.request({
            url: "http://120.78.154.66:8089/api/industry/qryPage/",
            data,
            method: "post"
        })
    }
    //获取所有的公司
    // "PageIndex":1,
    // "PageSize":10
export const getCompanyList = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/company/qryPage/',
            data,
            method: 'post'
        })
    }
    //获取该公司下的部门
    // "CompanyId": "1",
    // 	"PageIndex":1,
    // 	"PageSize":10
export const getDepartment = (data) => {
    return axios.request({
        url: 'http://120.78.154.66:8089/api/department/qryPage/',
        data,
        method: 'post'
    })
}

//获取所有的角色
export const getRoleList = (data) => {
    return axios.request({
        url: 'http://120.78.154.66:8089/api/role/qryPage/',
        data,
        method: "post"
    })
}


//获取角色的权限
// "RoleId":1
export const getRolePermission = (data) => {
    return axios.request({
        url: 'http://120.78.154.66:8089/api/permission/qry/',
        data,
        method: 'post'
    })
}


//获取用户的详细信息
// "UserId":""
export const getUserDetail = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/user/qry/',
            data,
            method: 'post'
        })
    }
    //获取代办任务
export const getDealTask = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/taskflow/dealquery/',
            data,
            method: 'post'
        })
    }
    //获取任务详情
    // "TaskID":"295"
export const getTaskDetail = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/task/query/',
            data,
            method: 'post'
        })
    }
    //待办任务获取任务详情
    //	"TaskID":"96"
export const getDealTaskDetail = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/projecttask/query/',
            data,
            method: 'post'
        })
    }
    //获取基金的代办任务详情
export const getDealTaskDetailFund = (data) => {
    return axios.request({
        url: 'http://120.78.154.66:8089/api/fundtask/query/',
        data,
        method: 'post'
    })
}


//TaskID: 337
//获取费用报销信息信息
export const getIncoexpeTask = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/incoexpetask/query',
            data,
            method: 'post'
        })
    }
    //差旅费申请-不添加文件

export const setIncoexpeTask = (data) => {
    return axios.request({
        url: "http://120.78.154.66:8089/api/incoexpetask/add/",
        data,
        method: 'post'
    })
}



//获取工资发放数据
export const getPayDetail = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/paytask/query',
            data,
            method: 'post'
        })
    }
    //提交工资发放申请
export const setPayWageTask = (data) => {
    return axios.request({
        url: 'http://120.78.154.66:8089/api/paytask/add/',
        data,
        method: 'post'
    })
}

//获取所有的部门信息
export const getAllDepartment = (data) => {
        return axios.request({
            url: "http://120.78.154.66:8089/api/depttask/deptlistquery",
            data,
            method: "post"

        })
    }
    //获取某个部门的信息
export const getDepartmentDetail = (data) => {
        return axios.request({
            url: "http://120.78.154.66:8089/api/depttask/deptquery",
            data,
            method: "post"

        })
    }
    //部门信息提交不提交文件
export const upDepartment = (data) => {
    return axios.request({
        url: "http://120.78.154.66:8089/api/depttask/dmtadd",
        data,
        method: "post"

    })
}



//部门信息提交并提交文件
export const getDepartmentFile = (data) => {
    return axios.request({
        url: "http://120.78.154.66:8089/api/depttask/dmtaddtofile",
        data,
        method: "post"

    })
}



//获取部门的任务详情
export const getDepartmentTaskInfor = (data) => {
    return axios.request({
        url: 'http://120.78.154.66:8089/api/depttask/query/',
        data,
        method: 'post'
    })
}


//审批部门申请并同意,修改并同意
export const setDepartment = (data) => {
    return axios.request({
        url: "http://120.78.154.66:8089/api/depttask/dmtmodagree",
        data,
        method: "post"

    })
}


//获取某个平台的信息
export const geAllPlatformDetail = (data) => {
        return axios.request({
            url: "http://120.78.154.66:8089/api/plattask/platquery",
            data,
            method: "post"

        })
    }
    //获取所有的平台信息
export const getPlatform = (data) => {
        return axios.request({
            url: "http://120.78.154.66:8089/api/plattask/platlistquery",
            data,
            method: "post"

        })
    }
    //平台信息新增和修改不提交文件
export const upPlatform = (data) => {
        return axios.request({
            url: "http://120.78.154.66:8089/api/plattask/pmtadd",
            data,
            method: "post"

        })
    }
    //平台信息新增和修改提交文件
export const upPlatformFile = (data) => {
        return axios.request({
            url: "http://120.78.154.66:8089/api/plattask/pmtaddtofile",
            data,
            method: "post"

        })
    }
    //审批平台信息并同意,修改并同意
export const setPlatform = (data) => {
        return axios.request({
            url: "http://120.78.154.66:8089/api/plattask/pmtmodagree",
            data,
            method: "post"

        })
    }
    //总经理会 董事会 监事会 总经理会 合伙人会申请
export const addNewPlatformMeet = (data) => {
        return axios.request({
            url: "http://120.78.154.66:8089/api/plattask/potadd/",
            data,
            method: "post"

        })
    }
    //总经理会 董事会 监事会 总经理会 合伙人会申请并且添加文件
export const addNewPlatformMeetFile = (data) => {
        return axios.request({
            url: "http://120.78.154.66:8089/api/plattask/potaddtofile",
            data,
            method: "post"
        })
    }
    //总经理会 董事会 监事会 总经理会 合伙人会修改并同意
export const addNewPlatformMeetMod = (data) => {
    return axios.request({
        url: "http://120.78.154.66:8089/api/plattask/potmodagree",
        data,
        method: "post"

    })
}



//获取平台的任务详情
export const getPlatformTaskDetail = (data) => {
    return axios.request({
        url: 'http://120.78.154.66:8089/api/plattask/query/',
        data,
        method: 'post'
    })
}


//项目列表查询
export const programListQuery = (data) => {
    return axios.request({
        url: "http://120.78.154.66:8089/api/projecttask/projectlistquery/",
        data,
        method: "post"

    })
}

//该项目信息查询
export const programListQueryDetail = (data) => {
    return axios.request({
        url: "http://120.78.154.66:8089/api/projecttask/projectquery/",
        data,
        method: "post"

    })
}

//客户列表查询
export const clientListQuery = (data) => {
    return axios.request({
        url: "http://120.78.154.66:8089/api/projecttask/clientlistquery/",
        data,
        method: "post"

    })
}

//该客户信息查询
export const clientListQueryDetail = (data) => {
    return axios.request({
        url: "http://120.78.154.66:8089/api/projecttask/clientquery/",
        data,
        method: "post"

    })
}



//获取所有的流程目录
//FatherTypeID: 0
export const getAllListquery = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/tasktype/listquery',
            data,
            method: 'post'
        })
    }
    //获取某个流程的具体信息
    //TaskTypeID: 6
export const getListDetail = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/tasktype/query',
            data,
            method: 'post'
        })
    }
    //删除某个流程
    //	"TaskTypeID":"31"
export const delList = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/tasktype/del',
            data,
            method: 'post'
        })
    }
    //新增某个自定义流程
export const addNewDefine = (data) => {
    // console.log(111)
    return axios.request({
        url: 'http://120.78.154.66:8089/api/tasktype/add/',
        data,
        method: 'post'
    })
}






//删除这个流程下的某个步骤
export const deleteDefine = (data) => {
    return axios.request({
        url: 'http://120.78.154.66:8089/api/tasktype/del',
        data,
        method: 'post'
    })
}


//获取上传文件目录
export const getUploadFileMenuList = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/taskfile/typequery/',
            data,
            method: 'post'
        })
    }
    //上传文件接口
export const uploadFile = (data) => {
    return axios.request({
        url: 'http://120.78.154.66:8089/api/taskfile/add',
        data,
        method: 'post'
    })
}

//删除文件接口
export const deleteTaskFile = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/taskfile/del',
            data,
            method: 'post'
        })
    }
    //修改文件接口
export const changeTaskFile = (data) => {
    return axios.request({
        url: 'http://120.78.154.66:8089/api/taskfile/mod',
        data,
        method: 'post'
    })
}





//修改这个流程下的某个步骤
// {
// 	"TaskTypeID":"31",
// 	"FatherTypeID":"2",
// 	"TypeName":"项目预立项报告1",
// 	"NumberPrefix":"\"KHDM\"00-1",
// 	"ApiAdd":"api/projecttask/pmtadd1",
// 	"ApiAddtofile":"api/projecttask/pmtaddtofile1",
// 	"ApiQuery":"api/projecttask/query1",
// 	"ApiModagree":"api/projecttask/pmtmodagree1",
// 	"UI":"DevelopComponent1",
// 	"CurYear":"0",
// 	"CurNumber":"0",
// 	"TypeStatus":"1",
// 	"FlowTemplates":[
// 		{"ID":"0", "TaskTypeID":"31", "FlowID":"1", "FlowSummary":"项目主办审批", "FlowRequire":"1", "FlowTimeLimit":"2", "FlowOwner":"", "FlowGroup":"2"},
// 		{"ID":"0", "TaskTypeID":"31", "FlowID":"2", "FlowSummary":"项目经理审批", "FlowRequire":"101", "FlowTimeLimit":"2", "FlowOwner":"", "FlowGroup":"1"},
// 		{"ID":"0", "TaskTypeID":"31", "FlowID":"3", "FlowSummary":"公司经理审批", "FlowRequire":"1001", "FlowTimeLimit":"1", "FlowOwner":"b826ed4a-4ac6-46d8-937c-afa2839866b3", "FlowGroup":"0"},
// 		{"ID":"0", "TaskTypeID":"31", "FlowID":"3", "FlowSummary":"公司经理审批", "FlowRequire":"1001", "FlowTimeLimit":"1", "FlowOwner":"b826ed4a-4ac6-46d8-937c-afa2839866b4", "FlowGroup":"0"},
// 		{"ID":"0", "TaskTypeID":"31", "FlowID":"4", "FlowSummary":"抄送项目成员", "FlowRequire":"10001", "FlowTimeLimit":"1", "FlowOwner":"", "FlowGroup":"3"}
// 	]
// }
export const changeDefine = (data) => {
    return axios.request({
        url: 'http://120.78.154.66:8089/api/tasktype/mod/',
        data,
        method: 'post'
    })
}

//增加这个流程下的步骤
// {
// 	"TaskTypeID":"0",
// 	"FatherTypeID":"2",
// 	"TypeName":"项目预立项报告",
// 	"NumberPrefix":"\"KHDM\"00-",
// 	"ApiAdd":"api/projecttask/pmtadd",
// 	"ApiAddtofile":"api/projecttask/pmtaddtofile",
// 	"ApiQuery":"api/projecttask/query",
// 	"ApiModagree":"api/projecttask/pmtmodagree",
// 	"UI":"DevelopComponent",
// 	"FlowTemplates":[
// 		{"ID":"0", "TaskTypeID":"0", "FlowID":"1", "FlowSummary":"项目主办审批", "FlowRequire":"1", "FlowTimeLimit":"2", "FlowOwner":"", "FlowGroup":"2"},
// 		{"ID":"0", "TaskTypeID":"0", "FlowID":"2", "FlowSummary":"项目经理审批", "FlowRequire":"101", "FlowTimeLimit":"2", "FlowOwner":"", "FlowGroup":"1"},
// 		{"ID":"0", "TaskTypeID":"0", "FlowID":"3", "FlowSummary":"公司经理审批", "FlowRequire":"1001", "FlowTimeLimit":"1", "FlowOwner":"b826ed4a-4ac6-46d8-937c-afa2839866b3", "FlowGroup":"0"},
// 		{"ID":"0", "TaskTypeID":"0", "FlowID":"3", "FlowSummary":"公司经理审批", "FlowRequire":"1001", "FlowTimeLimit":"1", "FlowOwner":"b826ed4a-4ac6-46d8-937c-afa2839866b4", "FlowGroup":"0"},
// 		{"ID":"0", "TaskTypeID":"0", "FlowID":"4", "FlowSummary":"抄送项目成员", "FlowRequire":"10001", "FlowTimeLimit":"1", "FlowOwner":"", "FlowGroup":"3"}
// 	]
// }
export const addListChild = (data) => {
    return axios.request({
        url: 'http://120.78.154.66:8089/api/tasktype/add/',
        data,
        method: 'post'
    })
}