<template>
    <div class="pro_infor">
        <Card v-if="flag==2||flag==3" class="itemCard">
                <p slot="title">项目信息</p>
                  <Form :label-width="160">
                    <Row>
                        <Col span="8">
                            <FormItem label="权属平台：" >
                                 <b>{{platformName}}</b>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="所属部门：" >
                                 <b>{{departmentName}}</b>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="所属基金：" >
                                 <b>{{foundName}}</b>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="项目品种:" prop="ProjectType">
                                 <b>{{TypeObj[postdata.Project.ProjectType]}}</b>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="项目角色:" prop="ProjectRole">
                                 <b>{{RoleObj[postdata.Project.ProjectRole]}}</b>
                            </FormItem>   
                        </Col>
                        
                         <Col span="24">
                            <FormItem label="项目内容：" prop="phone">
                                <b>{{postdata.Project.Summary}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="项目来源：" prop="phone">
                                <b>{{postdata.Project.Source}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="预计工时费用：" prop="ProjectEstimatedHourCost">
                                <b>{{postdata.Project.ProjectEstimatedHourCost||0}}万元</b>
                               
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="预计直接费用：" prop="ProjectEstimatedFeeCost">
                                <b>{{postdata.Project.EstimatedFeeCost||0}}万元</b>
                                 
                            </FormItem>   
                        </Col>
                       <Col span="8">
                            <FormItem label="预计开始日期：" prop="ProjectStartDate">
                                <b>{{postdata.Project.EstStartDate.replace("T"," ").substr(0,10)}}</b>
                                
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="预计结束日期：" prop="name">
                                <b>{{postdata.Project.EstEndDate.replace("T"," ").substr(0,10)}}</b>

                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="实际开始日期：" >
                                <b>{{postdata.Project.RealStartDate.replace("T"," ").substr(0,10)}}</b>

                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="实际结束日期：" >
                                <b>{{postdata.Project.RealEndDate.replace("T"," ").substr(0,10)}}</b>

                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="项目经理：" prop="Manager">
                                <b>{{ManagerVlaue}}</b>
                            </FormItem>  
                        </Col>
                        <Col span="8">
                            <FormItem label="项目主办：" prop="Owner">
                                <b>{{OwnerVlaue}}</b>
                            </FormItem>
                        </Col>
                        <Col span="16">
                            <FormItem label="项目成员：" prop="Member">
                                <b>{{MemberData.toString()}}</b>
                            </FormItem>   
                        </Col>
                    </Row>

                </Form>   
                
            </Card>
    </div>
</template>
<script>
import {getprogectType,getprogectRole,
getuserList,getCityList,getIndustryList,getProjectList,getProjectDetail,
geAllPlatformDetail,getDepartmentDetail,getFundDetail
} from "@/api/data"

export default {
    name:"proInform",
    props:{
        objId:Number,
        flag:Number
    },
    data (){
        return{
            ManagerData:'',
            MemberData:[],
             postdata:{
               TaskFiles:[],
                TaskTypeID:'',//任务类别ID，与TaskTypes表的TaskTypeID对应（开发3/立项4/变动5），取自对应的菜单项
                TaskName:'',//任务名（UI中的请示事项要点）
                TaskSummary:'',//任务概要（UI中的请示事项具体内容）
                TaskOwner:'',//任务申请人ID，与User表的UserID对应，取自当前登录用户
                TaskFlows:[],
               
               Client:{
                    ClientID:0,//客户ID，开发/立项（未选已有项目）报告：为0，提交后新增客户信息，立项（选已有项目）/变动报告：为选中的项目的客户ID，提交后保存客户历史信息（ClientStatus设为0）并新增最新信息
                    ClientName:'',//公司全称
                    ShortName:'',//公司简称
                    ClientCode:'',//客户代码，不同客户使用该唯一的代码区分
                    Scope:'',//经营范围--**
                    Industry:'',//所属行业，下拉表，从后台字典表中获取--**
                    LegalPerson:'',//法人代表--**
                    Manager:'',//总经理--**
                    RegisteredCapital:0,//注册资本--**
                    OpenDate:'',//成立日期--**
                    Address:'',//注册地址--**
                    Zip:'',//邮政编码--**
                    Contact:'',//联系人员--**
                    ContactEmail:'',//联系电邮--**
                    ContactPhone:'',//联系电话--**
                    ContactFax:'',//联系传真--**
                    TotalAssets:0,//总资产--**
                    NetAssets:0,//净资产--**
                    Income:0,//营业收入--**
                    Profit:0,//营业利润--**
                    NetProfit:0,//净利润--**
                    FinancialYear:0,//财务年度--**
                    FinancialQuarter:0,//财务季度--**
                    ClientStatus:1,//状态，1表示最新信息，0表示历史信息--**
                    Region:'',//所在省市，下拉表，从后台字典表中获取
                    Country:"",//所在国家
                    CodsCode:""//社会统一代码     
                },
                Project:{
                    ProjectID:0,//项目ID，开发/立项（未选已有项目）/立项（选已有项目）报告：0，提交后新增项目信息，变动报告：为选中的项目ID，提交后保存项目历史信息（ProjectStatus设为0）并新增最新信息
                    ClientID:0,//客户ID 
                    ClientCode:'',//客户代码，不同项目使用“客户代码 + 项目品种 + 项目角色”唯一区分
                    ProjectType:'',//项目品种，下拉表，从后台字典表中获取
                    ProjectRole:'',//项目角色，下拉表，从后台字典表中获取
                    Source:'',//项目来源--**
                    EstimatedFeeCost:0,//预计直接费用
                    EstimatedHourCost:0,//预计工时费用
                    ProjectStatus:1,//状态，默认为1，0表示历史信息，2表示开发报告审批完的项目，3表示立项报告审批完的项目，4表示总结报告审批完的项目,5终止报告审批完的项目
                    Members:[],

                    PlatformID:'',//权属平台id
                    RealStartDate:'',//实际项目开始日期
                    RealEndDate:'',//实际项目结束日期
                    PlatCode:'',//权属平台代码
                    DepartmentID:'',//部门id
                    DeptCode:'',//部门代码
                    FundCode:'暂时未有',//基金代码
                    FundID:123,//基金id
                    RelatedClient:'',//相关其他客户代码
                    ProjectLabel:'',//项目标签
                    EstIncome:'',//预计总收入
                    Schedules:[],//项目进度
                    Summary:'',//项目概要
                    EstStartDate:'',//预计项目开始日期
                    EstEndDate:''//预计项目结束日期
                
                }
            },
            taskFlows:[],
            FlowComment:'',
            TypeObj:{},
            RoleObj:{},
            ManagerData:{},
            MemberData:[],
            ManagerVlaue:'',
            OwnerVlaue:'',
            departmentName:'',
            foundName:'',
            platformName:'',
            FlowComment:'',
            ReturnFlowID:''
        }
    },mounted(){
        this.getprogectType();//获取项目类型
        this.getprogectRole();//获取项目角色
    },watch:{
        objId(){
              getProjectDetail({ProjectID:this.objId}).then(res=>{
                     if(res.data.code==2308){
                    this.postdata={
                        TaskTypeID:res.data.taskTypeID,//任务类别ID，与TaskTypes表的TaskTypeID对应（开发3/立项4/变动5），取自对应的菜单项
                        TaskName:res.data.taskName,//任务名（UI中的请示事项要点）
                        TaskSummary:res.data.taskSummary,//任务概要（UI中的请示事项具体内容）
                        TaskOwner:res.data.taskOwner,//任务申请人ID，与User表的UserID对应，取自当前登录用户
                        TaskNumber:res.data.taskNumber,
                        TaskOwnerName:res.data.taskOwnerName,
                        TaskOwnerPhone:res.data.taskOwnerPhone,
                        TaskFiles:res.data.taskFiles,
                        TaskFlows:res.data.taskFlows,
                        Client:{
                            ClientID:res.data.client.clientID,//客户ID，开发/立项（未选已有项目）报告：为0，提交后新增客户信息，立项（选已有项目）/变动报告：为选中的项目的客户ID，提交后保存客户历史信息（ClientStatus设为0）并新增最新信息
                            ClientName:res.data.client.clientName,//公司全称
                            ClientRegion:res.data.client.clientRegion,//所在省市，下拉表，从后台字典表中获取
                            ShortName:res.data.client.shortName,//公司简称
                            ClientCode:res.data.client.clientCode,//客户代码，不同客户使用该唯一的代码区分
                            Scope:res.data.client.scope,//经营范围
                            Industry:res.data.client.industry,//所属行业，下拉表，从后台字典表中获取
                            LegalPerson:res.data.client.legalPerson,//法人代表
                            Manager:res.data.client.manager,//总经理
                            RegisteredCapital:res.data.client.registeredCapital,//注册资本
                            OpenDate:res.data.client.openDate,//成立日期
                            Address:res.data.client.address,//注册地址
                            Zip:res.data.client.zip,//邮政编码
                            Contact:res.data.client.contact,//联系人员
                            ContactEmail:res.data.client.contactEmail,//联系电邮
                            ContactPhone:res.data.client.contactPhone,//联系电话
                            ContactFax:res.data.client.contactFax,//联系传真
                            TotalAssets:res.data.client.totalAssets,//总资产
                            NetAssets:res.data.client.netAssets,//净资产
                            Income:res.data.client.income,//营业收入
                            Profit:res.data.client.profit,//营业利润
                            NetProfit:res.data.client.netProfit,//净利润
                            FinancialYear:res.data.client.financialYear,//财务年度
                            FinancialQuarter:res.data.client.financialQuarter,//财务季度
                            Region:res.data.client.region,
                            Country:res.data.client.country,
                            CodsCode:res.data.client.codsCode,//社会统一
                            ClientStatus:1//状态，1表示最新信息，0表示历史信息
                        },
                        Project:{
                            ProjectID:res.data.project.projectID,//项目ID，开发/立项（未选已有项目）/立项（选已有项目）报告：0，提交后新增项目信息，变动报告：为选中的项目ID，提交后保存项目历史信息（ProjectStatus设为0）并新增最新信息
                            ClientID:res.data.client.clientID,//客户ID 
                            ClientCode:res.data.project.clientCode,//客户代码，不同项目使用“客户代码 + 项目品种 + 项目角色”唯一区分
                            ProjectType:res.data.project.projectType,//项目品种，下拉表，从后台字典表中获取
                            ProjectRole:res.data.project.projectRole,//项目角色，下拉表，从后台字典表中获取
                            ProjectSummary:res.data.project.projectSummary,//项目概要
                            Source:res.data.project.source,//项目来源
                            // ProjectStartDate:res.data.project.projectStartDate,//项目开始日期
                            // ProjectEndDate:res.data.project.projectEndDate,//项目结束日期
                            EstimatedFeeCost:res.data.project.estimatedFeeCost,//预计直接费用
                            EstimatedHourCost:res.data.project.estimatedHourCost,//预计工时费用
                            ProjectStatus:res.data.project.projectStatus,//状态，默认为1，0表示历史信息，2表示开发报告审批完的项目，3表示立项报告审批完的项目，4表示总结报告审批完的项目
                            
                            PlatformID:res.data.project.platformID,//权属平台id
                            RealStartDate:res.data.project.realStartDate,//实际项目开始日期
                            RealEndDate:res.data.project.realEndDate,//实际项目结束日期
                            PlatCode:res.data.project.platCode,//权属平台代码
                            DepartmentID:res.data.project.departmentID,//部门id
                            DeptCode:res.data.project.deptCode,//部门代码
                            FundCode:res.data.project.fundCode,//基金代码
                            FundID:res.data.project.fundID,//基金id
                            RelatedClient:res.data.project.relatedClient,//相关其他客户代码
                            ProjectLabel:res.data.project.projectLabel,//项目标签
                            EstIncome:res.data.project.estIncome,//预计总收入
                            Schedules:res.data.project.schedules,//项目进度
                            Summary:res.data.project.summary,//项目概要
                            EstStartDate:res.data.project.estStartDate,//预计项目开始日期
                            EstEndDate:res.data.project.estEndDate//预计项目结束日期
                        }
                    };
                    // this.taskFlows=res.data.taskFlows;
                    this.loadMember(res.data.project.members);//加载人员信息
                    this.geAllPlatformDetail(res.data.project.platformID);//获取平台信息
                    this.getDepartmentDetail(res.data.project.departmentID);//获取部门信息
                    this.getFundInfor(res.data.project.fundID)                //获取基金信息
                                    //加载项目进度
                   
                }else{
                    this.$Message.error({
                        content:'获取任务信息失败：'+res.data.message
                    })
                }
                })
        }
    },
    methods:{
            loadMember(obj){
                this.MemberData=[]
                obj.map(item=>{
                    switch (item.memberType){
                        case 91:
                            //项目经理
                            this.ManagerVlaue=item.memberName;
                        break;
                        case 92:
                            //项目主办
                            this.OwnerVlaue=item.memberName;
                        break;
                        case 93:
                            //项目成员
                            this.MemberData.push(item.memberName);
                        break;
                    }              
                })
            },getFundInfor(id){
                getFundDetail({"FundID":id}).then(res=>{
                    if(res.data.code==2406){
                          this.foundName=res.data.fund.shortName;
                    }else{
                        this.$Message.error({
                            content:"基金信息加载失败:"+res.data.message
                        })
                    }
                })
            },
            getprogectType(){

                getprogectType({"PageIndex":1,"PageSize":1000}).then(res=>{
                    if(res.data.code==0){
                        res.data.projectTypeList.forEach(element => {
                            this.TypeObj[element.projectTypeId]=element.projectTypeName
                            
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
                            this.RoleObj[element.projectRoleId]=element.projectRoleName
                            
                        });
                    }else{
                        this.$Message.error({
                            content:"项目角色信息加载失败:"+res.data.message
                        })
                    }
                })
            },
            geAllPlatformDetail(id){
                geAllPlatformDetail({PlatformID:id}).then(res=>{
                    if(res.data.code==2106){
                        this.platformName=res.data.platform.shortName;
                    }else{
                        this.$Message.error("平台信息查询失败:"+res.data.message)
                    }
                })
            },
            getDepartmentDetail(id){
                getDepartmentDetail({DepartmentID:id}).then(res=>{
                    if(res.data.code==2206){
                        this.departmentName=res.data.department.deptName;
                    }else{
                        this.$Message.error("部门信息查询失败:"+res.data.message)
                    }
                })
            }, getuserList(){
            getuserList({"PageIndex":1,"PageSize":1000}).then(res=>{
                if(res.data.code==0){
                    res.data.userList.forEach(element => {
                        this.ManagerData[element.userId]=element.userName
                      
                    });
                }else{
                    this.$Message.error({
                        content:"成员信息加载失败:"+res.data.message
                    })
                }
            })
        }
    }
}
</script>