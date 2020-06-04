 
<template>
<!-- 项目收入费用-->
    <div class="information">
        <Row :gutter="16">
            <!-- <Col span="6">
                <Card class="itemCard preview">
                    <h3>{{postdata.UserName}}</h3>
                    <p><Icon class="icon" type="ios-call-outline" />{{postdata.Phone}}</p>
                    <Divider /> -->
                    <!-- <p><Icon class="icon"  type="ios-briefcase-outline" />前端工程师</p>
                    <p><Icon class="icon"  type="ios-git-network" />{{postdata.DepartmentId}}</p>
                    <p><Icon class="icon"  type="ios-pin-outline" />{{postdata.CompanyId}}</p> -->
                <!-- </Card>
            </Col> -->
           
           <Col span="24" >
                <Card class="itemCard">
                    <p slot="title">个人设置</p>
                    <Form :label-width="80">
                        <Row>
                           <Col span="12">
                                <FormItem label="姓名:">
                                    <b> {{postdata.UserName}}</b>
                                </FormItem>
                            </Col>
                             <Col span="12">
                                    <FormItem label="性别:">
                                       <b> {{postdata.Sex}}</b>
                                    </FormItem>
                                </Col>
                              <Col span="12">
                                    <FormItem label="最高学历:" >
                                         <b>{{postdata.Degree}}</b>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="专业:">
                                         <b>{{postdata.Speciality}}</b>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="电话:">
                                         <b>{{postdata.Phone}}</b>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="邮编:">
                                        <b> {{postdata.Email}}</b>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="通讯地址:">
                                         <b>{{postdata.Address}}</b>
                                    </FormItem>
                                </Col>     
                                        </Row>
                                    </Form>
                            </Card>
                        </Col>
            </Row>
            <Card class="itemCard">
                <p slot="title">公司信息</p>
                <Form :label-width="100">
                    <Row>
                    <!-- <Col span="8">
                        <FormItem label="所属公司:">
                            <b> {{postdata.CompanyId}}</b>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="所属部门:">
                         <b>{{postdata.DepartmentId}}</b>
                        </FormItem>
                    </Col> -->
                    <Col span="8">
                        <FormItem label="邮箱:">
                            <b> {{postdata.Email}}</b>
                        </FormItem>
                    </Col>
                    <Col span="16">
                        <FormItem label="所属角色:">
                             <!-- {{roleList[item]}} -->
                            <b> <span v-for="item in postdata.Roles" :key="item">
                                {{roleList[item]}}&nbsp;&nbsp;
                            </span></b>
                            
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="基本工资:">
                           <b>  {{postdata.PayBase}}</b>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="考勤补贴:">
                            <b> {{postdata.PayAttendace}}</b>
                        </FormItem>
                    </Col>
                    
                    <Col span="8">
                        <FormItem label="当前工时标准:">
                            <b> {{postdata.PayHour}}</b>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="人力成本:">
                             <b>{{postdata.PayHrcost}}</b>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="账号状态:">
                             <b>{{postdata.Status}}</b>
                        </FormItem>
                    </Col>
                        </Row>
                </Form>
            </Card>
             <Card class="itemCard">
                    <p slot="title">账户设置 </p>
                    <Form :label-width="100">
                        <Row>
                            <Col span="8">
                                <FormItem label="用户名:">
                                    <b>{{postdata.LoginId}}</b>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="密码:">
                                         <Button type="text" style="color:#2d8cf0;" @click="passWmodal=true">修改密码</Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                    <div>
                       
                    </div>
                </Card>
        
          <Modal v-model="passWmodal" title="重置密码" @on-ok="changePass">
             <Form :label-width="90">
                    <FormItem label="新密码">
                        <Input v-model="passWord" placeholder="请输入新密码"></Input>
                    </FormItem>
                     <FormItem label="确认密码">
                        <Input v-model="passWordAgain" placeholder="请确认密码"></Input>
                    </FormItem>
            </Form>
         </Modal> 
    </div>
</template>
<script>
import {
    getUserDetail,
    getRoleList
    } from "@/api/data"
export default {
    data(){
        return{
             passWmodal:false,
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
           },
           passWord:'',
           passWordAgain:'',
           roleList:{}

        }
    },
    mounted(){
        this.getUserInfor()
        this.getRoleList()
    },
    methods:{
        getUserInfor(){
            getUserDetail({UserId:JSON.parse(localStorage.getItem('userId')) }).then(res=>{
                if(res.data.code==0){
                    this.postdata={
                        UserName:res.data.userName,//用户姓名
                        LoginId:res.data.loginId,//登录名
                        CompanyId:res.data.companyName,//所属公司
                        DepartmentId:res.data.departmentName,//所属部门
                        Email:res.data.email,//满足email格式要求
                        Sex:res.data.sex,//性别，下拉框，保密|男|女
                        Degree:res.data.degree,//学历，下拉框，保密|学士|硕士|博士|
                        Speciality:res.data.speciality,//专业
                        Phone:res.data.phone,//电话
                        Zip:res.data.zip,//邮编
                        Address:res.data.zip,//通讯地址
                        Roles:res.data.roles,//角色，可多选,每个元素是RoleId
                        PayHour:res.data.payHour,//工时标准
                        PayBase:res.data.payBase,//基本工资`
                        PayAttendace:res.data.payAttendance,//考勤补贴
                        PayHrcost:res.data.payHrcost,//人力成本
                        Status:res.data.payHrcost==1?'正常':res.data.payHrcost==0?'未审批':'冻结'//状态
                    }
                }else{
                    this.$Message.error({
                        content:"个人信息加载失败："+res.data.message
                    })
                }
            })
        },
        getRoleList(){
            getRoleList({	"PageIndex":1,"PageSize":1000}).then(res=>{
                if(res.data.code==0){
                    res.data.roleList.forEach(element => {
                        this.roleList[element.roleId]=element.roleName
                    });
                }else{
                    this.$Message.error({
                        content:'角色信息加载失败：'+res.data.mesage
                    })
                }

            })
        },
       changePass(){
           
       }
    }
}
</script>
<style lang='less' scoped>
    .information{
        
     
        .preview{
            p{
                padding: 10px 0;
                .icon{
                    margin-right: 8px;
                }
            }
        }
        
    }
</style>