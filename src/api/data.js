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



export const getTableData = () => {
    return axios.request({
        url: 'get_table_data',
        method: 'get'
    })
}

export const getDragList = () => {
    return axios.request({
        url: 'get_drag_list',
        method: 'get'
    })
}

export const errorReq = () => {
    return axios.request({
        url: 'error_url',
        method: 'post'
    })
}

export const saveErrorLogger = info => {
    return axios.request({
        url: 'save_error_logger',
        data: info,
        method: 'post'
    })
}

export const uploadImg = formData => {
    return axios.request({
        url: 'image/upload',
        data: formData
    })
}

export const getOrgData = () => {
    return axios.request({
        url: 'get_org_data',
        method: 'get'
    })
}

export const getTreeSelectData = () => {
    return axios.request({
        url: 'get_tree_select_data',
        method: 'get'
    })
}