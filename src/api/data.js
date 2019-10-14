import axios from '@/libs/api.request'
//获取项目列表
export const getProjectList = data => {
    return axios.request({
        url: 'http://120.78.154.66:8089/api/projecttask/projectlistquery',
        data: data,
        method: 'post',
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