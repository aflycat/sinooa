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