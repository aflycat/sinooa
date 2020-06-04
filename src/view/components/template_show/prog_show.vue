<template>
<!-- 审批项目 -->
    <div class="prog_show">
        <Card  class="itemCard">
            <p slot="title">任务明细</p>
            <Form :label-width="80">
                <Row>
                     <Col span="24">
                        <FormItem label="任务编号：">
                            <b>{{postdata.TaskNumber}}</b>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="事项要点：">
                            <b>{{postdata.TaskName}}</b>
                        </FormItem>
                    </Col>
                   
                    <Col span="12">
                        <FormItem label="报送人：">
                            <b>{{postdata.TaskOwnerName}}</b>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="联系电话：">
                           <b>{{ postdata.TaskOwnerPhone}}</b>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="报送内容：">
                            <b>{{postdata.TaskSummary}}</b>
                        </FormItem>
                    </Col>
                    <Col span="24" v-if="postdata.TaskFiles.length>0" >
                        <FormItem label="报送文件：" >
                            <p  v-for="(item,index) in postdata.TaskFiles" :key='index'>
                                <a :href="'http://120.78.154.66:8089/taskfiles/'+item.dateFolder+'/'+item.oldFileName" target="_blank" style="color:#2d8cf0;">
                                    {{item.oldFileName}}
                                </a> 
                                 <Button style="color:#ed4014;" type="text" @click="deleteOriginFile(item.taskFileID,item.oldFileName,index)">删除</Button>
                            </p>
                        </FormItem>
                    </Col>
                </Row>
                 </Form>    
        </Card>  
                <Card  class="itemCard">
                <p slot="title">公司基本信息</p>
                <Form :label-width="100">
                    <Row>
                         <Col span="8">
                            <FormItem label="公司全称：" prop="ClientName">
                                <b>{{postdata.Client.ClientName}}</b>
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="公司简称：" prop="ClientShortName">
                                <b>{{postdata.Client.ShortName}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="统一社会代码：" >
                                <b>{{postdata.Client.CodsCode}}</b>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="所在国家：" >
                                <b>{{postdata.Client.Country}}</b>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="所在省市：" prop="ClientRegion">
                                <b>{{cityData[postdata.Client.Region]}}</b>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="所属行业：" prop="ClientIndustry">
                               <b>{{IndustryData[postdata.Client.Industry]}}</b>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="经营范围：" prop="ClientShortName">
                                <b>{{postdata.Client.Scope}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="客户代码：" prop="ClientCode">
                                <b>{{postdata.Client.ClientCode}}</b>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="相关客户代码:" >
                                <b>{{postdata.Project.RelatedClient}}</b>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="代表法人：" prop="ClientLegalPerson">
                                <b>{{postdata.Client.LegalPerson}}</b>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="总经理：" prop="ClientManager">
                                <b>{{postdata.Client.Manager}}</b>
                            </FormItem>   
                        </Col>

                        <Col span="8">
                            <FormItem label="成立日期：" prop="ClientOpenDate">
                                <b>{{postdata.Client.OpenDate.replace("T"," ").substr(0,10)}}</b>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="注册地址：" prop="ClientAddress">
                                <b>{{postdata.Client.Address}}</b>
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="邮政编码：" prop="ClientShortName">
                                <b>{{postdata.Client.Zip}}</b>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="联系人员：" prop="ClientContact">
                                <b>{{postdata.Client.Contact}}</b>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="联系电邮：" prop="ClientContactEmail">
                                <b>{{postdata.Client.ContactEmail}}</b>
                            </FormItem>   
                        </Col>

                         <Col span="8">
                            <FormItem label="联系电话：" prop="ClientContactPhone">
                                <b>{{postdata.Client.ContactPhone}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="联系传真：" prop="ClientContactFax">
                                <b>{{postdata.Client.ContactFax}}</b>
                            </FormItem>   
                        </Col>
                     
                    </Row>

                </Form>
            </Card>
            <Card  class="itemCard">
                <p slot="title">公司财务信息</p>
                <Form :label-width="80">
                    <Row>
                        <Col span="8">
                            <FormItem label="注册资本：" prop="ClientRegisteredCapital">
                                <b>{{postdata.Client.RegisteredCapital||0}}万元</b>
                               
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="总资产：" prop="ClientTotalAssets">
                                <b>{{postdata.Client.TotalAssets||0}}万元</b>
                              
                            </FormItem>   
                        </Col>

                         <Col span="8">
                            <FormItem label="净资产：" prop="ClientNetAssets">
                                <b>{{postdata.Client.NetAssets||0}}万元</b>
                              
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="净利润：" prop="NetAssets">
                               <b> {{postdata.Client.NetProfit||0}}万元</b>
                               
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="营业收入：" prop="ClientIncome">
                                <b>{{postdata.Client.Income||0}}万元</b>
                               
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="营业利润：" prop="ClientProfit">
                                <b>{{postdata.Client.Profit||0}}万元</b>
                               
                            </FormItem>   
                        </Col>

                         <Col span="8">
                            <FormItem label="财务年度：" prop="ClientFinancialYear">
                                <b>{{postdata.Client.FinancialYear||0}}万元</b>
                               
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="财务季度：" prop="ClientFinancialQuarter">
                                <b>{{postdata.Client.FinancialQuarter||0}}万元</b>
                               
                            </FormItem>
                        </Col>
                        
                     
                    </Row>

                </Form>
            </Card>
            <Card  class="itemCard">
                <p slot="title">项目信息</p>
                  <Form :label-width="100">
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
                                 <b>{{foundName||'基金接口尚未开发'}}</b>
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

                           <Col span="8">
                            <FormItem label="项目经理：" prop="Manager">
                                <b> {{ManagerVlaue}}</b>
                            </FormItem>  
                        </Col>
                        <Col span="8">
                            <FormItem label="项目主办：" prop="Owner"> 
                              <b> {{OwnerVlaue}}</b>
                            </FormItem>
                        </Col>
                         <Col span="16">
                            <FormItem label="项目成员：" prop="Member">
                               <b> {{MemberData.toString()}}</b>
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
                            <FormItem label="预计工时费用：" prop="ProjectEstimatedHourCost">
                                <b>{{postdata.Project.ProjectEstimatedHourCost||0}}万元</b>
                               
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="预计总收入：" >
                                <b>{{postdata.Project.EstIncome}}万元</b>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="预计直接费用：" prop="ProjectEstimatedFeeCost">
                                <b>{{postdata.Project.EstimatedFeeCost||0}}万元</b>
                                 
                            </FormItem>   
                        </Col>
                    </Row>

                </Form>   
                
            </Card>
            <Card  class="itemCard">
                <p slot="title">项目进度</p>
                <Table :columns="progress" :data="progressData"> </Table>
            </Card> 
            <Card  class="itemCard">
            <p slot="title">审批进度</p>
            <Form :label-width="80">
                <Timeline>
                    <template v-for="(item,index) in postdata.TaskFlows">
                        <TimelineItem  :color="item.flowStatus==1?'#19be6b':'#515a6e'"  :key="index">
                            <p >
                                {{item.flowDoneDate.replace("T"," ").substr(0,16)}}   <Divider type="vertical" />
                                {{item.flowSummary}}  <Divider type="vertical" />
                                {{item.flowOwnerName||item.flowGroupName}} <Divider type="vertical" />
                                 {{item.flowEmail}}
                            </p>
                            <p class="content">{{item.flowComment||''}}</p>
                        </TimelineItem>
                    </template>
                </Timeline>
            </Form>    
        </Card>
        <Card  class="itemCard">
            <p slot="title">审批意见</p>
            <Form :label-width="80">
                  <Row>
                    <Col span="24">
                        <FormItem label="快捷输入">
                            <RadioGroup  @on-change="easzyInput">
                                <Radio label="同意"></Radio>
                                <Radio label="基本同意"></Radio>
                                <Radio label="收阅执行"></Radio>
                                <Radio label="不同意"></Radio>
                            </RadioGroup>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="审批意见">
                            <Input v-model="FlowComment" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入具体内容"></Input>
                        </FormItem>
                    </Col>
                   
                    <Col span="24">
                        <FormItem>
                           
                            <Button style="margin-right: 8px" type="primary" :loading="loading"  @click="handleSubmitAgree()">
                                <span v-if="!loading">同意</span>
                                <span v-else>提交中...</span>
                            </Button> 
                            <Button @click="showReturnModal"   style="margin-right: 8px" type="warning">修改</Button>  
                            <Button :loading="loading2" @click="handleSubmitDisgree()"  style="margin-right: 8px" type="error">
                                <span v-if="!loading">不同意</span>
                                <span v-else>提交中...</span>
                            </Button> 
                        </FormItem>
                    </Col>
                </Row>
            </Form>    
        </Card>  
        <return-step ref='stepModal' :taskFlowID="taskFlowID" :taskFlows="taskFlows" :FlowComment="FlowComment" :taskID="taskID"></return-step>
    
    </div>
</template>
<script>
import {getDealTaskDetail,getCityList,getIndustryList,getprogectType,
        getprogectRole,getuserList,geAllPlatformDetail,getDepartmentDetail,
        taskFlowAgree,taskFlowDisagree,taskFlowReturn
            } from "@/api/data"
import {deleteFile} from "@/api/user"
import returnStep from "@/view/components/template/return_step"
export default {
    name:'progshowTem',
    components:{
        returnStep
    },
    props:{
        taskID:String,
        taskFlowID:String
    },
    data(){
        return{
            loading:false,
            loading1:false,
            loading2:false,
             progress:[
                {title:'序号',key:'ScheduleID',width:100},
                {title:'进度名',key:'ScheduleName'},
                {title:'预计开始时间',key:'EstStartDate'},
                {title:'预计结束时间',key:'EstEndDate'},
                 {title:'实际开始时间',key:'RealStartDate'},
                {title:'实际结束时间',key:'RealEndDate'},
                {title:'说明',key:'Summary'},
            ],
            progressData:[],
            postdata:{
                 TaskName:'',//任务名（UI中的请示事项要点）
                    TaskSummary:'',//任务概要（UI中的请示事项具体内容）
                    TaskOwner:'',//任务申请人ID，与User表的UserID对应，取自当前登录用户
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
                        Schedules:[
                            //ID数据id
                            //ProjectID项目id
                            //ScheduleID进度序号
                            //ScheduleName进度明
                            //Summary//详细说明
                            //EstStartDate//预计开始日期
                            //EstEndDate//预计结束日期
                            //RealStartDate实际开始日期
                            //RealEndDate实际结束日期
                            //Status   1最新进度 0过往进度

                        ],//项目进度
                        Summary:'',//项目概要
                        EstStartDate:'',//预计项目开始日期
                        EstEndDate:''//预计项目结束日期
                    }
            },
            
            taskFlows:[],
            FlowComment:'',
            cityData:{},
            IndustryData:{},
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
    }, watch:{ 
        taskID(){
            this.gettaskDetail();
            this.MemberData=[]
        }
    },
    mounted(){
        this.gettaskDetail();//获取任务详情
        this.getCityList();//获取城市
        this.getIndustryList();//获取所属行业
        this.getprogectType();//获取项目类型
        this.getprogectRole();//获取项目角色
                                
    },
    methods:{
        gettaskDetail(){
            getDealTaskDetail({TaskID:this.taskID}).then(res=>{
                if(res.data.code==2303){
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
                    this.taskFlows=res.data.taskFlows;
                    this.loadMember(res.data.project.members);//加载人员信息
                    this.geAllPlatformDetail(res.data.project.platformID);//获取平台信息
                    this.getDepartmentDetail(res.data.project.departmentID);//获取部门信息
                                    //获取基金信息
                    this.loadProcess(res.data.project.schedules)//加载项目进度                //加载项目进度
                   
                }else{
                    this.$Message.error({
                        content:'获取任务信息失败：'+res.data.message
                    })
                }
            })
        },
        loadProcess(obj){
                obj.forEach(element=>{
                    this.progressData.push({
                        ID:element.iD,
                        ProjectID:element.projectID,
                        RealStartDate:element.realStartDate.substr(0,10),
                        RealEndDate:element.realEndDate.substr(0,10),
                        ScheduleID:element.scheduleID,
                        ScheduleName:element.scheduleName,
                        EstStartDate:element.realStartDate.substr(0,10),
                        EstEndDate:element.estEndDate.substr(0,10),
                        Summary:element.summary,
                        Status:element.status
                    })
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
        },
        getCityList(){
            getCityList({"PageIndex":1,"PageSize":500}).then(res=>{
                
                if(res.data.code==0){
                    res.data.regionList.forEach(element => {
                        this.cityData[element.regionId]=element.regionName
                    });
                }else{
                    this.$Message.error({
                        content:"公司所在省市信息加载失败:"+res.data.message
                    })
                }
            })
        },
        getIndustryList(){
            getIndustryList({"PageIndex":1,"PageSize":500}).then(res=>{
                if(res.data.code==0){
                    
                    res.data.industryList.forEach(element => {
                        this.IndustryData[element.industryId]=element.industryName
                        
                    });
                }else{
                    this.$Message.error({
                        content:"公司所属行业信息加载失败:"+res.data.message
                    })
                }
            })
        },
        getuserList(){
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
        },loadMember(obj){

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
        },easzyInput(val){
            this.FlowComment=val;
        },
        handleSubmitAgree(){
            taskFlowAgree({
                TaskID:this.taskID,
                TaskFlowID:this.taskFlowID,
                FlowComment:this.FlowComment
            }).then(res=>{  
                if(res.data.code==2022){
                    this.$Message.success({content:'操作成功'})
                }else{
                     this.$Message.success({content:'操作失败:'+res.data.message})
                }
            })
        },
        handleSubmitDisgree(){
            taskFlowDisagree({
                TaskID:this.taskID,
                TaskFlowID:this.taskFlowID,
                FlowComment:this.FlowComment
            }).then(res=>{
                if(res.data.code==2024){
                   this.$Message.success({content:'操作成功'})
                }else{
                     this.$Message.success({content:'操作失败:'+res.data.message})
                }
            })
        },
        showReturnModal(){
            this.$refs['stepModal'].showModal(true,this.taskFlows);
        },
        deleteOriginFile(fileId,fileName,index){
            this.$Modal.warning({
                title:'删除',
                content:'是否删除文件：'+fileName,
                onOk:()=>{
                    deleteFile({TaskFileID:fileId}).then(res=>{
                        if(res.data.code==2203){
                            this.postdata.TaskFiles.splice(index,1)
                            this.$Notice.success({
                                title:"删除成功"
                            })
                        }else{
                            this.$Message.error({
                                title:"删除失败："+res.data.message
                            })
                        }
                    })
                }


            })
        }
    }

}
</script>