import axios from '@/libs/api.request'
//登录
export const login = ({ userName, password }) => {
        const data = {
            LoginId: userName,
            Password: password
        }
        return axios.request({
            url: 'http://120.78.154.66:8089/api/user/login/',
            data,
            method: 'post'
        })
    }
    //获取个人信息
export const getUserInfo = (UserId) => {
        const data = {
            UserId: UserId
        }
        return axios.request({
            url: 'http://120.78.154.66:8089/api/user/qry/',
            data,
            method: 'post'
        })
    }
    //退出
export const logout = (token) => {
        return axios.request({
            url: 'logout',
            method: 'post'
        })
    }
    //公司运营提交接口
export const operationTaskAdd = (data) => {
        return axios.request({
            url: "http://120.78.154.66:8089/api/task/add/",
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


//文件上传
export const uploadFile = (data) => {
    return axios.request({
        url: "http://120.78.154.66:8089/api/taskfile/add/",
        data,
        method: 'post'
    })
}


//提交个人工时周报
export const workWeekSubmit = (data) => {
    return axios.request({
        url: "http://120.78.154.66:8089/api/workReport/saveSubmit",
        data,
        method: 'post'
    })
}

//提交项目开发报告,无文件提交
export const projectAdd = (data) => {
        return axios.request({
            url: "http://120.78.154.66:8089/api/projecttask/pmtadd/",
            data,
            method: 'post'
        })
    }
    //提交项目开发报告,有文件提交
export const projectAddFile = (data) => {
    return axios.request({
        url: "http://120.78.154.66:8089/api/projecttask/pmtaddtofile/",
        data,
        method: 'post'
    })
}