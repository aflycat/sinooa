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

//添加角色
// "RoleName":"测试"
export const addRole = (data) => {
        return axios.request({
            url: "http://120.78.154.66:8089/api/role/add/",
            data,
            method: 'post'
        })
    }
    // //修改角色
    // "RoleId":71,
    // "RoleName":"ABC"
export const modRole = (data) => {
    return axios.request({
        url: 'http://120.78.154.66:8089/api/role/mod/',
        data,
        method: 'post'
    })
}

//删除角色
// "RoleId":72
export const delRole = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/role/del/',
            data,
            method: 'post'
        })
    }
    //编辑角色权限
    // "RoleId":71,
    // "DataPermission":1,
    // "MenuPermissionList":[{"MenuId":2,"SubMenuId":1,"CanRead":true,"CanWrite":false,"CanReview":false}]
export const modRolePermission = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/permission/mod/',
            data,
            method: 'post'
        })
    }
    //添加用户
    // "UserName":"","LoginId":"","Password":"","CompanyId":,"DepartmentId":,"Sex":"","Degree":"",
    // "Speciality":"","Phone":"","Email":"","Zip":"","Address":"","Roles":,"Status":,"PayHour":,
    // "PayBase":,"PayAttendacne":,"PayHrcost":
export const addUser = (data) => {
        console.log(data)
        return axios.request({
            url: 'http://120.78.154.66:8089/api/user/add/',
            data,
            method: 'post'
        })
    }
    //编辑用户
    // "UserId":"","UserName":"","LoginId":"","Password":"","CompanyId":,"DepartmentId":,
    // "Sex":"","Degree":"","Speciality":"","Phone":"","Email":"","Zip":"",
    // "Address":"","Roles":,"Status":,"PayHour":,"PayBase":,"PayAttendace":,"PayHrcost":    
export const modUser = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/user/mod/',
            data,
            method: 'post'
        })
    }
    //删除用户
    // "UserId":""
export const deleteUser = (data) => {
        console.log(data)
        return axios.request({
            url: 'http://120.78.154.66:8089/api/user/del/',
            data,
            method: 'post'
        })
    }
    //修改密码
    // "UserId":"","OldPassword":"","NewPassword":""   
export const modPassword = (data) => {
        return axios.request({
            url: 'http://120.78.154.66:8089/api/user/modPasswd/',
            data,
            method: 'post'
        })
    }
    //退出登录
    // "LoginId":"",
    // "Token":""
    // export const logout = (data) => {
    //     return axios.request({
    //         url: '',
    //         data,
    //         method: 'post'
    //     })
    // }