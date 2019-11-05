<template>
    <Modal class="memm_basic" v-model="flags" title="人员基本信息" @on-ok="handleOk()" @on-cancel="handleCancel()" width="700px">
        <Form :label-width="100">
            <Row :gutter="16">
                <Col span="12">
                    <FormItem label="姓名">
                        <Input v-model="postdata.UserName" placeholder="姓名"></Input>
                    </FormItem>
                </Col>
                 <Col span="12">
                    <FormItem label="登录名">
                        <Input v-model="postdata.LoginId"  placeholder="登录名"></Input>
                    </FormItem>
                </Col>
                 <Col span="12">
                    <FormItem label="密码">
                        <Input v-model="postdata.Password"  placeholder="密码"></Input>
                    </FormItem>
                </Col>
                 <Col span="12"  v-if="!isEdict">
                    <FormItem label="确认密码">
                        <Input  v-model="PasswordAgain"  placeholder="密码"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="所属公司">
                        <Select placeholder="选择所属公司" @on-change="getDepartment" v-model="postdata.CompanyId">
                          <Option v-for="item in companyList" :value="item.value" :key="item.value">{{item.label}}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="所属部门">
                        <Select placeholder="选择所属部门"   v-model="postdata.DepartmentId">
                          <Option v-for="item in departmentList" :value="item.value" :key="item.value">{{item.label}}</Option>
                            
                        </Select>
                    </FormItem>
                </Col>
               <Col span="12">
                    <FormItem label="邮箱">
                        <Input  v-model="postdata.Email" placeholder="邮箱"></Input>
                    </FormItem>
                </Col>

                 <Col span="12">
                    <FormItem label="性别">
                        <Select placeholder="选择性别"  v-model="postdata.Sex">
                            <Option :value="'男'" :key="1">男</Option>
                            <Option :value="'女'" :key="2">女</Option>
                            <Option :value="'保密'" :key="3">保密</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="最高学历" >
                        <!-- <Input  placeholder="最高学历"></Input> -->
                        <Select placeholder="最高学历"  v-model="postdata.Degree">
                            <Option :value="'博士'" :key="1">博士</Option>
                            <Option :value="'研究生'" :key="2">研究生</Option>
                            <Option :value="'本科'" :key="3">本科</Option>
                            <Option :value="'大专'" :key="4">大专</Option>
                            <Option :value="'其他'" :key="6">其他</Option>
                        </Select>
                    </FormItem>
                </Col>
                 <Col span="12">
                    <FormItem label="专业">
                        <Input  v-model="postdata.Speciality"  placeholder="专业"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="电话">
                        <Input  v-model="postdata.Phone" placeholder="电话"></Input>
                    </FormItem>
                </Col>
                 <Col span="12">
                    <FormItem label="邮编">
                        <Input  v-model="postdata.Zip" placeholder="邮编"></Input>
                    </FormItem>
                </Col>
                <Col span="24">
                    <FormItem label="通讯地址">
                        <Input  v-model="postdata.Address" placeholder="通讯地址"></Input>
                    </FormItem>
                </Col>   
                <Col span="24">
                    <FormItem label="所属角色">
                       
                        <CheckboxGroup v-model="postdata.Roles">

                            <Row>
                                <Col span="6" v-for="item in roleList">
                                    <Checkbox :label="item.value"><span>{{item.label}}</span></Checkbox>
                                </Col>
                              
                            </Row>
                        </CheckboxGroup>
                    </FormItem>
                </Col>
                <Col span="24">
                    <FormItem class="notice" label="注：" >
                        <p>
                            1、基本工资、考勤补贴根据薪酬级别设定设置有关数据，人力成本为总人力成本数据（即含外勤费用）；
    2、人力成本应根据职员转正或调整决定日起，在当月内完成调整。
                        </p>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="基本工资">
                         <Input  v-model="postdata.PayBase" placeholder="基本工资"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="考勤补贴">
                         <Input  v-model="postdata.PayAttendace" placeholder="考勤补贴"></Input>
                    </FormItem>
                </Col>
                
                <Col span="24">
                    <FormItem label="当前工时标准">
                         <Row type="flex" justify="space-between">
                              <Col span="9">
                                <Select placeholder="选择工时"  v-model="postdata.PayHour">
                                    <Option :value="20" :key="20">20</Option>
                                    <Option :value="30" :key="30">30</Option>
                                    <Option :value="50" :key="50">50</Option>
                                    <Option :value="70" :key="70">70</Option>
                                    <Option :value="100" :key="100">100</Option>
                                    <Option :value="140" :key="140">140</Option>
                                </Select>
                              </Col>
                               <!-- <Col span="14">
                                <Input  v-model="postdata."  placeholder="其他"></Input>
                              </Col> -->
                         </Row>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="人力成本">
                         <Input  v-model="postdata.PayHrcost"  placeholder="人力成本"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="账号状态">
                        <Select placeholder="选择状态"  v-model="postdata.Status">
                            <Option :value="1" :key="1">正常</Option>
                            <Option :value="0" :key="2">未审批</Option>
                            <Option :value="-1" :key="3">冻结</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
               
        </Form>
       
    </Modal>
</template>
<script>
import {addUser,modUser} from "@/api/user"
import {getRoleList,getCompanyList,getDepartment,getUserDetail} from "@/api/data"

export default {
    name:"memBasic",
    props:{
        userId:String,
        isEdict:Boolean
    },

    data(){
        return{
           flags:false,
           roleList:[],
           loading:false,
           roleCheck:[],
           PasswordAgain:'',
           companyList:[],
           departmentList:[],
           postdata:{
                UserName:'',//用户姓名
                LoginId:'',//登录名
                Password:'',//密码，复杂度要求：大写字母、小写字母、数字、特殊符号任选二类
                CompanyId:'',//所属公司
                DepartmentId:'',//所属部门
                Email:'',//满足email格式要求
                Sex:'',//性别，下拉框，保密|男|女
                Degree:'',//学历，下拉框，保密|学士|硕士|博士|
                Speciality:'',//专业
                Phone:'',//电话
                Zip:'',//邮编
                Address:'',//通讯地址
                Roles:[],//角色，可多选,每个元素是RoleId
                PayHour:0,//工时标准
                PayBase:0,//基本工资`
                PayAttendace:0,//考勤补贴
                PayHrcost:0,//人力成本
                Status:1//状态
           }
        }
    },
    mounted(){
        this.getRoleLists();
        this.getCompanyList();
    },
    watch:{
        userId(value){
           
            this.getUserInfor(value)
        }
    },
    methods:{
        getRoleLists(){
            getRoleList({"PageIndex":1,"PageSize":1000}).then(res=>{
                console.log(res);
                if(res.data.code==0){
                    res.data.roleList.forEach(element => {
                        this.roleList.push({
                            label:element.roleName,
                            value:element.roleId
                        })
                    });
                }else{
                    this.$Message.error({
                        content:"角色列表加载失败："+res.data.message
                    })
                }
            })

            
        },
        getCompanyList(){
            getCompanyList({"PageIndex":1,"PageSize":1000}).then(res=>{
                if(res.data.code==0){
                    res.data.companyList.forEach(element=>{
                        this.companyList.push({
                            value:element.companyId,
                            label:element.companyName
                        })
                    })
                }else{
                    this.$Message.error({
                        content:"公司数据加载失败："+res.data.mesage
                    })
                }
            })
        },
        getDepartment(value){

            this.postdata.DepartmentId='';
            this.departmentList=[]

            getDepartment({"PageIndex":1,"PageSize":1000,"CompanyId":value}).then(res=>{
                if(res.data.code==0){
                    console.log(res)
                    res.data.departmentList.forEach(element=>{
                        this.departmentList.push({
                            value:element.departmentId,
                            label:element.departmentName
                        })
                    })
                }else{
                     this.$Message.error({
                        content:"部门数据加载失败："+res.data.mesage
                    })
                }
            })
        },
        handleOk(){
            console.log(this.postdata)
            if(this.isEdict){
                this.edictUser()
            }else{
                this.addNewUser()
            }
        },
        handleCancel(){

        },
        showModel(flag){
            this.flags=flag;
        },
        addNewUser(){
            addUser(this.postdata).then(res=>{
                console.log(res)
                if(res.data.code==0){
                    this.$Notice.success({
                        title:'用户创建成功'
                    })
                    this.$emit('loadUserlistAgain')
                }else{
                    this.$Message.error({
                        content:'新增用户失败：'+res.data.message
                    })
                }
            })
        },
        getUserInfor(value){
            getUserDetail({UserId:value}).then(res=>{
                console.log(res)
                if(res.data.code==0){
                    
                    this.postdata={
                        UserId:res.data.userId,
                        UserName:res.data.userName,//用户姓名
                        LoginId:res.data.loginId,//登录名
                        Password:res.data.password,//密码，复杂度要求：大写字母、小写字母、数字、特殊符号任选二类
                        CompanyId:res.data.companyId,//所属公司
                        DepartmentId:res.data.departmentId,//所属部门
                        Email:res.data.email,//满足email格式要求
                        Sex:res.data.sex,//性别，下拉框，保密|男|女
                        Degree:res.data.degree,//学历，下拉框，保密|学士|硕士|博士|
                        Speciality:res.data.speciality,//专业
                        Phone:res.data.phone,//电话
                        Zip:res.data.zip,//邮编
                        Address:res.data.address,//通讯地址
                        Roles:res.data.roles,//角色，可多选,每个元素是RoleId
                        PayHour:res.data.payHour,//工时标准
                        PayBase:res.data.payBase,//基本工资`
                        PayAttendace:res.data.payAttendance,//考勤补贴
                        PayHrcost:res.data.payHrcost,//人力成本
                        Status:res.data.status//状态
                    }
                    this.departmentList=[]
                    getDepartment({"PageIndex":1,"PageSize":1000,"CompanyId":res.data.companyId}).then(res=>{
                        if(res.data.code==0){
                            res.data.departmentList.forEach(element=>{
                                this.departmentList.push({
                                    value:element.departmentId,
                                    label:element.departmentName
                                })
                            })
                        }else{
                            this.$Message.error({
                                content:"部门数据加载失败："+res.data.mesage
                            })
                        }
                    })
                }else{
                    this.$Message.error({
                        content:'用户信息获取失败：'+res.data.message
                    })
                }
            })
                
            
        },
        edictUser(){
            modUser(this.postdata).then(res=>{
                console.log(res);
                if(res.data.code==0){
                    this.$Notice.success({
                        title:'用户信息修改成功'
                    })
                    this.$emit('loadUserlistAgain')
                }else{
                    this.$Message.error({
                        content:'用户信息修改失败：'+res.data.message
                    })
                }
            })
        }
    }

}
</script>
<style lang="less" >
    .memm_basic{
        .ivu-modal-body{
            max-height: 400px;
            overflow-y: auto;
        }
    }

</style>