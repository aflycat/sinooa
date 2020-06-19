<template>
    <div class="opraTem">
       <Card class="itemCard">
                <p slot="title">报送人信息</p>
                <Form :label-width="80">
                    <Row>
                        <Col span="8">
                            <FormItem label="报送人:" prop="name">
                                {{name}}
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="联系电话" prop="phone">
                                {{phone}}
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
                            <FormItem label="公司全称" prop="ClientName">
                                <Input v-model="postdata.Client.ClientName" placeholder="请输入公司全称"></Input>
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="公司简称" prop="ClientShortName">
                                <Input v-model="postdata.Client.ShortName" placeholder="请输入公司简称"></Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="统一社会代码" >
                                <Input v-model="postdata.Client.CodsCode" placeholder="请输入统一社会代码"></Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="所在国家" >
                                <Input v-model="postdata.Client.Country" placeholder="请输入所在国家"></Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="所在省市" prop="ClientRegion">
                                <Select v-model="postdata.Client.Region" filterable   placeholder="请选择所在省市">
                                    <Option v-for="item in cityData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col> 
                         <Col span="8">
                            <FormItem label="所属行业" prop="ClientIndustry">
                                 <Select v-model="postdata.Client.Industry" filterable   placeholder="请选择所属行业">
                                    <Option v-for="item in IndustryData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>

                            </FormItem>
                        </Col>
                         
                       
                        <Col span="8">
                            <FormItem label="经营范围" prop="ClientShortName">
                                <Input v-model="postdata.Client.Scope" placeholder="请输入经营范围"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="客户代码" prop="ClientCode">
                                <Input disabled v-model="postdata.Client.ClientCode" placeholder="请输入客户代码"></Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="相关客户代码" >
                                <Input v-model="postdata.Project.RelatedClient" placeholder="请输入相关客户代码"></Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="代表法人" prop="ClientLegalPerson">
                                <Input v-model="postdata.Client.LegalPerson" placeholder="请输入代表法人"></Input>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="总经理" prop="ClientManager">
                                <Input v-model="postdata.Client.Manager" placeholder="请输入总经理"></Input>
                            </FormItem>   
                        </Col>

                         <Col span="8">
                            <FormItem label="成立日期" prop="ClientOpenDate">
                                 <DatePicker :value="postdata.Client.OpenDate" @on-change="getClientOpenDate"  type="date" placeholder="请选择成立日期" style="width: 100%;"></DatePicker>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="注册地址" prop="ClientAddress">
                                <Input v-model="postdata.Client.Address" placeholder="请输入注册地址"></Input>
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="邮政编码" prop="ClientShortName">
                                <Input v-model="postdata.Client.Zip" placeholder="请输入邮政编码"></Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="联系人员" prop="ClientContact">
                                <Input v-model="postdata.Client.Contact" placeholder="请输入联系人员"></Input>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="联系电邮" prop="ClientContactEmail">
                                <Input v-model="postdata.Client.ContactEmail" placeholder="请输入联系电邮"></Input>
                            </FormItem>   
                        </Col>

                         <Col span="8">
                            <FormItem label="联系电话" prop="ClientContactPhone">
                                <Input v-model="postdata.Client.ContactPhone" placeholder="请输入联系电话"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="联系传真" prop="ClientContactFax">
                                <Input v-model="postdata.Client.ContactFax" placeholder="请输入联系传真"></Input>
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
                            <FormItem label="注册资本" prop="RegisteredCapital">
                                <Input v-model="postdata.Client.RegisteredCapital" type="number" placeholder="请输入注册资本">
                                      <span slot="append">万元</span>
                                </Input>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="总资产" prop="TotalAssets">
                                <Input v-model="postdata.Client.TotalAssets" type="number" placeholder="请输入总资产">
                                  <span slot="append">万元</span>
                                </Input>
                            </FormItem>   
                        </Col>

                         <Col span="8">
                            <FormItem label="净资产" prop="NetAssets">
                                <Input v-model="postdata.Client.NetAssets" type="number" placeholder="请输入净资产">
                                      <span slot="append">万元</span>
                                </Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="净利润" prop="NetAssets">
                                <Input v-model="postdata.Client.NetProfit" type="number" placeholder="请输入净利润">
                                      <span slot="append">万元</span>
                                </Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="营业收入" prop="Income">
                                <Input v-model="postdata.Client.Income" type="number" placeholder="请输入营业收入">
                                      <span slot="append">万元</span>
                                </Input>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="营业利润" prop="Profit">
                                <Input v-model="postdata.Client.Profit" type="number" placeholder="请输入营业利润">
                                      <span slot="append">万元</span>
                                </Input>
                            </FormItem>   
                        </Col>

                         <Col span="8">
                            <FormItem label="财务年度" prop="FinancialYear">
                                <Input v-model="postdata.Client.FinancialYear" type="number" placeholder="请输入财务年度">
                                  <span slot="append">万元</span>
                                </Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="财务季度" prop="FinancialQuarter">
                                <Input v-model="postdata.Client.FinancialQuarter" type="number" placeholder="请输入财务季度">
                                      <span slot="append">万元</span>
                                </Input>
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
                            <FormItem label="权属平台" >
                                
                                <Select v-model="postdata.Project.PlatformID" @on-change="getPlatformInfor"  filterable label-in-value  placeholder="请选择权属平台">
                                    <Option v-for="(item,index) in platformList"  :value="item.platformID" :key="index">{{ item.shortName }}</Option>
                                </Select>
                            </FormItem>
                            <!--  -->
                        </Col>
                    
                        <Col span="8">
                            <FormItem label="所属部门" >
                                <Select   v-model="postdata.Project.DepartmentID"  @on-change="getDepartment" filterable  label-in-value placeholder="请选择所属部门">
                                    <Option v-for="(item,index) in departmentList" :value="item.departmentID" :key="index">{{ item.deptName }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                      
                        <Col span="8">
                            <FormItem label="所属基金" >
                                <Select v-model="postdata.Project.FundID"  @on-change="getFund" filterable label-in-value  placeholder="请选择所属基金">
                                    <Option v-for="item in fundListData" :value="item.fundID" :key="item.fundID">{{ item.shortName }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                      
                        <Col span="8">
                            <FormItem label="项目品种" prop="ProjectType">
                                <Select disabled v-model="postdata.Project.ProjectType" filterable   placeholder="请选择项目品种">
                                    <Option v-for="item in TypeData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="项目角色" prop="ProjectRole">
                                 <Select disabled v-model="postdata.Project.ProjectRole" filterable   placeholder="请选择项目角色">
                                    <Option v-for="item in RoleData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                
                            </FormItem>   
                        </Col>

                         <Col span="8">
                            <FormItem label="项目经理" prop="Manager">
                                 <Select v-model="ManagerVlaue" filterable @on-change="getManager" label-in-value  placeholder="请选择项目经理">
                                    <Option v-for="item in ManagerData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>  
                        </Col>
                        <Col span="8">
                            <FormItem label="项目主办" prop="Owner">
                                 <Select v-model="OwnerVlaue" filterable  @on-change="getOwner" label-in-value  placeholder="请选择项目主办">
                                    <Option v-for="item in ManagerData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                         <Col span="16">
                            <FormItem label="项目成员" prop="Member">
                                 <Select v-model="MemberData" filterable multiple @on-change="getMember" label-in-value placeholder="请选择项目成员">
                                    <Option v-for="item in ManagerData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                
                            </FormItem>   
                        </Col>
                        
                      
                         <Col span="8">
                            <FormItem label="项目内容" >
                                <Input v-model="postdata.Project.Summary" placeholder="请输入项目内容"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="项目来源" >
                                <Input v-model="postdata.Project.Source" placeholder="请输入项目来源"></Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="预计开始日期" prop="ProjectStartDate">
                                  <DatePicker :value="postdata.Project.EstStartDate" @on-change="getProjectStartDate" type="date" placeholder="请选择开始日期" style="width: 100%;"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="预计结束日期" prop="ProjectEndDate">
                                  <DatePicker :value="postdata.Project.EstEndDate"  @on-change="getProjectEndDate"  type="date" placeholder="请选择结束日期" style="width: 100%;"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="实际开始日期" >
                                  <DatePicker :value="postdata.Project.RealStartDate" @on-change="getRealStartDate" type="date" placeholder="请选择实际开始日期" style="width: 100%;"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="实际结束日期" >
                                  <DatePicker :value="postdata.Project.RealEndDate"  @on-change="getRealEndDate"  type="date" placeholder="请选实际择结束日期" style="width: 100%;"></DatePicker>
                            </FormItem>
                        </Col>
                          <Col span="8">
                            <FormItem label="预计工时费用" >
                                <Input v-model="postdata.Project.EstHourCost" type="number" placeholder="请输入工时费">
                                      <span slot="append">万元</span>
                                </Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="预计总收入" >
                                <Input v-model="postdata.Project.EstIncome" type="number" placeholder="请输入预计总收入">
                                      <span slot="append">万元</span>
                                </Input>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="预计直接费用" >
                                <Input v-model="postdata.Project.EstFeeCost" type="number" placeholder="请输入直接费用">
                                      <span slot="append">万元</span>
                                </Input>
                            </FormItem>   
                        </Col>
                    </Row>

                </Form>   

            </Card>
            <task-file :fileList='postdata.TaskFiles' :flowRequire='flowRequire'></task-file>
            <task-flows :taskFlows='postdata.TaskFlows' :taskFlowID='taskFlowID'></task-flows>

    		<edict-button @handle-submit-agree='handleSubmitAgree' :TaskID='taskID' 
                :TaskFlowID='taskFlowID' :TaskStr='postdata' 
                >
            </edict-button>
    </div>
</template>
<script>
import UploadFiles from "@/view/components/upload_file/upload_file"
import edictButton from "@/view/components/template/return_edict_button"
import taskFile from "@/view/components/template/task_file_show"
import taskFlows from "@/view/components/template/approval_process"

import {getDealTaskDetail,getprogectType,getprogectRole,
getuserList,getCityList,getIndustryList,getPlatform,
getAllDepartment,addNewProjecttask,getAllFundList,taskFlowAgree,addNewProjecttaskMod
} from "@/api/data"
import {projectAdd,projectAddFile} from "@/api/user"
import {TaskTypeID} from "@/libs/data"
import {toUpperCase,orderObj} from "@/libs/tools"
export default {
    components:{
        UploadFiles,
        edictButton,
        taskFile,
        taskFlows

    },props:{
        taskID:String,
        taskFlowID:String,
        flowRequire:String
    },
    mounted(){
        this.name=JSON.parse(localStorage.getItem("userName"));
        this.phone=JSON.parse(localStorage.getItem("phone"));
        this.postdata.TaskOwner=JSON.parse(localStorage.getItem("userId"))
        this.gettaskDetail();//获取任务详情
        this.getCityList();
        this.getIndustryList();
        this.getprogectType();
        this.getprogectRole();
        this.getuserList();
        this.getPlatform();
        this.getAllDepartment();
        this.getAllFundList();

    },
    data(){
        return{
            loading:false,
            name:'',
            phone:'',
            cityData:[],
            cityVlaue:'',
            IndustryData:[],
            IndustryVlaue:'',
            DataVlaue:'',
            TypeVlaue:'',
            TypeData:[],
            RoleVlaue:'',
            RoleData:[],
            ManagerVlaue:'',
            ManagerData:[],
            OwnerVlaue:'',
            OwnerData:[],
            MemberData:[],
            fundListData:[],
            platformList:[],
            departmentList:[],
            postdata:{
                    TaskTypeID:TaskTypeID.itemDevelop,//任务类别ID，与TaskTypes表的TaskTypeID对应（开发3/立项4/变动5），取自对应的菜单项
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
                        Schedules:[],//项目进度
                        Summary:'',//项目概要
                        EstStartDate:'',//预计项目开始日期
                        EstEndDate:''//预计项目结束日期
                    }
            },
            standPost:{},
            managerObj:{},
            ownerObj:{},
            memberArr:[],
            standmanagerObj:'',
            standownerObj:'',
            standmemberArr:[],
            memberArrStr:[],
            TaskName:'',
            TaskSummary:''

        }
    },
    methods:{
        gettaskDetail(){
            getDealTaskDetail({TaskID:this.taskID}).then(res=>{
                if(res.data.code==2303){
                    this.standPost=JSON.parse(JSON.stringify(res.data)) 
                    this.standPost.project.members=[]

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
                            Industry:parseInt(res.data.client.industry),//所属行业，下拉表，从后台字典表中获取
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
                            Region:parseInt(res.data.client.region),
                            Country:res.data.client.country,
                            CodsCode:res.data.client.codsCode,//社会统一
                            ClientStatus:res.data.client.clientStatus//状态，1表示最新信息，0表示历史信息
                        },
                        Project:{

                            ProjectID:res.data.project.projectID,//项目ID，开发/立项（未选已有项目）/立项（选已有项目）报告：0，提交后新增项目信息，变动报告：为选中的项目ID，提交后保存项目历史信息（ProjectStatus设为0）并新增最新信息
                            ClientID:res.data.client.clientID,//客户ID 
                            ClientCode:res.data.project.clientCode,//客户代码，不同项目使用“客户代码 + 项目品种 + 项目角色”唯一区分
                            CurNumber:res.data.project.curNumber,
                            CurYear:res.data.project.curYear,
                            ProjectType:parseInt(res.data.project.projectType),//项目品种，下拉表，从后台字典表中获取
                            ProjectRole:parseInt(res.data.project.projectRole),//项目角色，下拉表，从后台字典表中获取
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
                            EstHourCost:res.data.project.estHourCost,
                            EstFeeCost:res.data.project.estFeeCost,
                            Schedules:res.data.project.schedules,//项目进度
                            Summary:res.data.project.summary,//项目概要
                            EstStartDate:res.data.project.estStartDate,//预计项目开始日期
                            EstEndDate:res.data.project.estEndDate,//预计项目结束日期
                            Members:[]
                        }
                    };
                    this.TaskSummary=res.data.taskSummary;
                    this.TaskName=res.data.taskName;
                    this.loadMember(res.data.project.members);//加载人员信息                  
                }else{
                    this.$Message.error({
                        content:'获取任务信息失败：'+res.data.message
                    })
                }
            })
        },loadMember(obj){
            obj.map(item=>{
                switch (item.memberType){
                    case 91:
                        //项目经理
                        this.ManagerVlaue=item.memberID;
                        this.standmanagerObj=item.memberID;
                        this.managerObj={
                                ID:0,
                                ProjectID:item.projectID,//项目ID，开发/立项（未选已有项目）/立项（选已有项目）报告为0，变动报告为选中的项目ID
                                MemberID:item.memberID,//项目成员ID，与用户表UserID对应
                                MemberName:item.memberName,//项目成员的姓名
                                MemberType:91,//1表示项目经理，2表示项目主办，3表示项目成员，4基金合伙人，5基金投决会，6基金成员，与角色表对应
                                Status:item.status//1表示目前的成员，0表示过往的成员(用默认值1)
                        }
                    break;
                    case 92:
                         //项目主办
                        this.OwnerVlaue=item.memberID;
                        this.standownerObj=item.memberID;
                        this.ownerObj={
                             ID:0,
                            ProjectID:item.projectID,//项目ID，开发/立项（未选已有项目）/立项（选已有项目）报告为0，变动报告为选中的项目ID
                            MemberID:item.memberID,//项目成员ID，与用户表UserID对应
                            MemberName:item.memberName,//项目成员的姓名
                            MemberType:92,//1表示项目经理，2表示项目主办，3表示项目成员，4基金合伙人，5基金投决会，6基金成员，与角色表对应
                            Status:item.status//1表示目前的成员，0表示过往的成员(用默认值1)
                        }
                      
                    break;
                    case 93:
                        //项目成员
                        this.MemberData.push(item.memberID);
                        this.standmemberArr.push(item.memberID);
                        this.memberArr.push({
                             ID:0,
                            ProjectID:item.projectID,//项目ID，开发/立项（未选已有项目）/立项（选已有项目）报告为0，变动报告为选中的项目ID
                            MemberID:item.memberID,//项目成员ID，与用户表UserID对应
                            MemberName:item.memberName,//项目成员的姓名
                            MemberType:93,//1表示项目经理，2表示项目主办，3表示项目成员，4基金合伙人，5基金投决会，6基金成员，与角色表对应
                            Status:item.status//1表示目前的成员，0表示过往的成员(用默认值1)
                        })
                    break;
                }              
            })
        },getManager(value){
            this.managerObj={
                ID:0,
                ProjectID:this.postdata.Project.ProjectID,//项目ID，开发/立项（未选已有项目）/立项（选已有项目）报告为0，变动报告为选中的项目ID
                MemberID:value.value,//项目成员ID，与用户表UserID对应
                MemberName:value.label,//项目成员的姓名
                MemberType:91,//1表示项目经理，2表示项目主办，3表示项目成员，4基金合伙人，5基金投决会，6基金成员，与角色表对应
                Status:1//1表示目前的成员，0表示过往的成员(用默认值1)
            }
        },
        getOwner(value){
            this.ownerObj={
                ID:0,
                ProjectID:this.postdata.Project.ProjectID,//项目ID，开发/立项（未选已有项目）/立项（选已有项目）报告为0，变动报告为选中的项目ID
                MemberID:value.value,//项目成员ID，与用户表UserID对应
                MemberName:value.label,//项目成员的姓名
                MemberType:92,//1表示项目经理，2表示项目主办，3表示项目成员，4基金合伙人，5基金投决会，6基金成员，与角色表对应
                Status:1//1表示目前的成员，0表示过往的成员(用默认值1)
            }
        },
        getMember(value){
            this.memberArr=[];
            this.memberArrStr=[];
            value.forEach(element=>{
                this.memberArrStr.push(element.value)
                 this.memberArr.push({
                    ID:0,//数据ID (用默认值0)
                    ProjectID:this.postdata.Project.ProjectID,//项目ID，开发/立项（未选已有项目）/立项（选已有项目）报告为0，变动报告为选中的项目ID
                    MemberID:element.value,//项目成员ID，与用户表UserID对应
                    MemberName:element.label,//项目成员的姓名
                    MemberType:93,//1表示项目经理，2表示项目主办，3表示项目成员，4基金合伙人，5基金投决会，6基金成员，与角色表对应
                    Status:1//1表示目前的成员，0表示过往的成员(用默认值1)
                 })
            })
        },
        handleSubmitAgree(TaskName,TaskSummary){
            this.postdata.Project.ClientCode= this.postdata.Client.ClientCode;
            var postClient=JSON.stringify(orderObj(toUpperCase(this.postdata.Client))),
                standClient=JSON.stringify(orderObj(toUpperCase(this.standPost.client))),
                postProject=JSON.stringify(orderObj(toUpperCase(this.postdata.Project))),
                standProject=JSON.stringify(orderObj(toUpperCase(this.standPost.project))),
                flag=TaskName==this.TaskName&&TaskSummary==this.TaskSummary;
           
            var projectFlag=
                (this.standmanagerObj==this.managerObj['MemberID'])
                &&
                (this.standownerObj==this.ownerObj['MemberID'])
                &&
                (JSON.stringify(this.standmemberArr)==JSON.stringify(this.memberArrStr));

            if((postClient==standClient)&&((postProject==standProject)&&projectFlag)&&flag){
                //无信息修改
                taskFlowAgree({TaskID:this.taskID,TaskFlowID:this.taskFlowID}).then(res=>{
                    if(res.data.code==2022){
                        this.$Message.success({
                            content:"操作成功"
                        })
                    }else{
                        this.$Message.error({
                            content:"操作成功"+res.data.message
                        })
                    }
                })
            }else{
                //有信息修改
                 if(postClient==standClient){
                    //客户信息无修改
                    this.postdata.Client.ClientID=0  
                }
                if((postProject==standProject)&&projectFlag){
                    //项目信息无修改
                this.postdata.Project.ProjectID=0
                } 
                this.postdata.Project.Members=this.memberArr;
                this.postdata.Project.Members.push(this.ownerObj);
                this.postdata.Project.Members.push(this.managerObj);
                this.postdata.TaskID=this.taskID;
                this.postdata.TaskFlowID=this.taskFlowID;
                addNewProjecttaskMod(this.postdata).then(res=>{
                     if(res.data.code==2304){
                        this.$Message.success({
                            content:"操作成功"
                        })
                    }else{
                        this.$Message.error({
                            content:"操作成功"+res.data.message
                        })
                    }
                })
            }
        },
        
        getClientOpenDate(value){
            this.postdata.Client.OpenDate=value;
        },
        getProjectStartDate(value){
            this.postdata.Project.EstStartDate=value;//预计开始时间
        },
        getProjectEndDate(value){
            this.postdata.Project.EstEndDate=value;//预计结束时间
        },
        getRealStartDate(value){
            this.postdata.Project.RealStartDate=value;//实际开始时间
        },
        getRealEndDate(value){
            this.postdata.Project.RealEndDate=value;//实际结束时间
        },

        getPlatformInfor(val){//设置权属平台
           this.postdata.Project.PlatformID=val.value;
            for(var i=0;i<this.platformList.length;i++){
                if(this.platformList[i].platformID==val.value){
                    this.postdata.Project.PlatCode=this.platformList[i].platCode
                    break;
                }
            }
        },
        getDepartment(val){//设置部门
           this.postdata.Project.DepartmentID=val.value;
            for(var i=0;i<this.departmentList.length;i++){
                if(this.departmentList[i].platformID==val.value){
                    this.postdata.Project.DeptCode=this.departmentList[i].deptCode
                    break;
                }
            }
        },
        getFund(value){//设置基金
            this.postdata.Project.FundID=val.value;
             for(var i=0;i<this.fundListData.length;i++){
                if(this.fundListData[i].fundID==val.value){
                    this.postdata.Project.FundCode=this.fundListData[i].fundCode
                    break;
                }
            }

        },



        getprogectType(){
            getprogectType({"PageIndex":1,"PageSize":1000}).then(res=>{
                 if(res.data.code==0){
                    res.data.projectTypeList.forEach(element => {
                        this.TypeData.push({
                            label:element.projectTypeName,
                            value:element.projectTypeId
                        })
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
                        this.RoleData.push({
                            label:element.projectRoleName,
                            value:element.projectRoleId
                        })
                    });
                }else{
                    this.$Message.error({
                        content:"项目角色信息加载失败:"+res.data.message
                    })
                }
            })
        },
        getuserList(){
            getuserList({"PageIndex":1,"PageSize":1000}).then(res=>{
                if(res.data.code==0){
                    res.data.userList.forEach(element => {
                        this.ManagerData.push({
                            label:element.userName,
                            value:element.userId
                        })
                    });
                }else{
                    this.$Message.error({
                        content:"成员信息加载失败:"+res.data.message
                    })
                }
            })
        },
          getAllFundList(){
            getAllFundList({FundStatus:1,USerID:JSON.parse(localStorage.getItem('userId'))}).then(res=>{
                if(res.data.code==2405){
                    this.fundListData=res.data.fundList
                }else{
                    this.$Message.error({
                        content:'基金列表加载失败:'+res.data.message
                    })
                }
            })
        },
        getCityList(){
            getCityList({"PageIndex":1,"PageSize":500}).then(res=>{
                
                if(res.data.code==0){
                    res.data.regionList.forEach(element => {
                        this.cityData.push({
                            label:element.regionName,
                            value:element.regionId
                        })
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
                        this.IndustryData.push({
                            label:element.industryName,
                            value:element.industryId
                        })
                    });
                }else{
                    this.$Message.error({
                        content:"公司所属行业信息加载失败:"+res.data.message
                    })
                }
            })
        },
        getPlatform(){
            getPlatform({'PlatStatus':1,'USerID':JSON.parse(localStorage.getItem("userId"))}).then(res=>{
                if(res.data.code==2105){
                    this.platformList=res.data.platList;
                }else{
                     this.$Message.error({
                        content:"权属平台信息加载失败:"+res.data.message
                    })
                }
            })
        },
        getAllDepartment(){
            getAllDepartment({'DeptStatus':1,'USerID':JSON.parse(localStorage.getItem("userId"))}).then(res=>{
                if(res.data.code==2205){
                    this.departmentList=res.data.deptList
                }else{
                     this.$Message.error({
                        content:"权属平台信息加载失败:"+res.data.message
                    })
                }
            })
        }
    }
}
</script>
