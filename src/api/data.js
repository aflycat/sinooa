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
    //TaskID: 337
    //获取费用报销信息信息
export const getIncoexpeTask = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/incoexpetask/query',
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
    //审批部门申请并同意
export const setDepartment = (data) => {
    return axios.request({
        url: "http://120.78.154.66:8089/api/depttask/dmtmodagree",
        data,
        method: "post"

    })
}


//获取某个平台的信息
export const getPlatform = (data) => {
        return axios.request({
            url: "http://120.78.154.66:8089/api/plattask/platquery",
            data,
            method: "post"

        })
    }
    //获取所有的平台信息
export const geAllPlatformDetail = (data) => {
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
    //审批平台信息并同意
export const setPlatform = (data) => {
    return axios.request({
        url: "http://120.78.154.66:8089/api/plattask/pmtmodagree",
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






//删除这个流程下的某个步骤



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
export const modList = (data) => {
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