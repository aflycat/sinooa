<template>
    <div class="pro_infor">
        <Card v-if="flag==1||flag==3" class="itemCard">
                <p slot="title">基金成员信息</p>
                 <Form :label-width="160">
                        <Row>
                         <Col span="12">
                            <FormItem label="基金合伙人：" prop="ClientRegisteredCapital">
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="投决会委员：" prop="ClientRegisteredCapital">
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="合伙人数量：" prop="ClientRegisteredCapital">
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="普通合伙人数量：" prop="ClientRegisteredCapital">
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="有限合伙人数量：" prop="ClientRegisteredCapital">
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="管理人：" prop="ClientRegisteredCapital">
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="普通合伙人：" prop="ClientRegisteredCapital">
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="执行事务合伙人：" prop="ClientRegisteredCapital">
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="执行事务合伙人委派代表：" prop="ClientRegisteredCapital">
                            </FormItem>
                        </Col>
                    </Row>
                 </Form>
                  

            </Card>
        <Card v-if="flag==2||flag==3" class="itemCard">
                <p slot="title">项目信息</p>
                  <Form :label-width="80">
                     
                    <Row>
                         <Col span="8">
                            <FormItem label="事项页签：" prop="ProjectType">
                               
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="项目品种：" prop="ProjectType">
                                {{TypeData[postdata.Project.ProjectType]}}
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="项目角色：" prop="ProjectRole">
                                 {{TypeData[postdata.Project.ProjectRole]}}
                            </FormItem>   
                        </Col>

                        <Col span="8">
                            <FormItem label="工时费用：" prop="ProjectEstimatedHourCost">
                            {{postdata.Project.ProjectEstimatedHourCost||0}}万元
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="直接费用：" prop="ProjectEstimatedFeeCost">
                            {{postdata.Project.ProjectEstimatedFeeCost||0}}万元
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="项目内容：" prop="phone">
                                 {{postdata.Project.ProjectSummary}}
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="项目来源：" prop="phone">
                                {{postdata.Project.ProjectSource}}
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="开始日期：" prop="ProjectStartDate">
                                {{postdata.Project.ProjectStartDate}}
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="结束日期：" prop="name">
                                {{postdata.Project.ProjectEndDate}}
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="项目经理：" prop="Manager">
                                {{ManagerData}}
                            </FormItem>  
                        </Col>
                        <Col span="8">
                            <FormItem label="项目主办：" prop="Owner">
                                {{OwnerData}}
                            </FormItem>
                        </Col>
                        <Col span="16">
                            <FormItem label="项目成员：" prop="Member">
                                {{MemberData.toString()}}
                            </FormItem>   
                        </Col>
                    </Row>

                </Form>   
                
            </Card>
    </div>
</template>
<script>
import {getprogectType,getprogectRole,getuserList,getCityList,getIndustryList,getProjectList,getProjectDetail} from "@/api/data"

export default {
    name:"proInform",
    props:{
        objId:Number,
        flag:Number
    },
    data (){
        return{
           
            TypeData:{},
            RoleData:{},
            ManagerData:'',
            OwnerData:'',
            MemberData:[],
             postdata:{
                Client:{
                    ClientCode:'',//客户代码，不同客户使用该唯一的代码区分
                },
                Project:{
                    ProjectType:'',//项目品种，下拉表，从后台字典表中获取
                    ProjectRole:'',//项目角色，下拉表，从后台字典表中获取
                    ProjectSummary:'',//项目概要
                    ProjectSource:'',//项目来源
                    ProjectStartDate:'',//项目开始日期
                    ProjectEndDate:'',//项目结束日期
                    ProjectEstimatedFeeCost:'',//预计直接费用
                    ProjectEstimatedHourCost:'',//预计工时费用
        //             Members:[{},{}]
                }
            }
        }
    },mounted(){
        this.getprogectType();
        this.getprogectRole();
    },watch:{
        objId(news){
              getProjectDetail({ProjectID:this.objId}).then(res=>{
                    if(res.data.code==2307){
                        res=res.data;
                        this.postdata={
                                Client:{
                                    ClientCode:res.client.clientCode,//客户代码，不同客户使用该唯一的代码区分
                                },
                                Project:{
                                    ProjectType:parseInt(res.project.projectType),//项目品种，下拉表，从后台字典表中获取
                                    ProjectRole:parseInt(res.project.projectRole),//项目角色，下拉表，从后台字典表中获取
                                    ProjectSummary:res.project.projectSummary,//项目概要
                                    ProjectSource:res.project.projectSource,//项目来源
                                    ProjectStartDate:res.project.projectStartDate.substr(0,10),//项目开始日期
                                    ProjectEndDate:res.project.projectEndDate.substr(0,10),//项目结束日期
                                    ProjectEstimatedFeeCost:res.project.projectEstimatedFeeCost,//预计直接费用
						            ProjectEstimatedHourCost:res.project.projectEstimatedHourCost,//预计工时费用
                                    Members:[{},{}]
                                }
                        }
                        this.MemberData=[];
                        res.project.members.forEach(element=>{
                            if(element.memberType==1){
                                this.ManagerData=element.memberName;
                            }else if(element.memberType==2){
                               this.OwnerData=element.memberName;
                            }else{
                                // console.log(element.memberName)
                                this.MemberData.push(element.memberName);
                            }
                        })
                    }else{
                        this.$Message.error({
                            content:"获取项目详细信息失败："+res.data.message
                        })
                    }
                })
        }
    },
    methods:{
            getprogectType(){
                getprogectType({"PageIndex":1,"PageSize":1000}).then(res=>{
                    if(res.data.code==0){
                        res.data.projectTypeList.forEach(element => {
                            this.TypeData[element.projectTypeId]=element.projectTypeName
                        });
                    }else{
                        this.$Message.error({
                            content:"项目品种信息加载失败:"+res.data.message
                        })
                    }
                })
            },
            getprogectRole(){
                getprogectRole({"PageIndex":1,"PageSize":1000}).then(res=>{
                    if(res.data.code==0){
                        res.data.projectRoleList.forEach(element => {
                            this.RoleData[element.projectRoleId]=element.projectRoleName
                        });
                    }else{
                        this.$Message.error({
                            content:"项目角色信息加载失败:"+res.data.message
                        })
                    }
                })
            }
    }
}
</script>