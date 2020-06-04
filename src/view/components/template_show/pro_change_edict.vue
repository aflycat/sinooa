<template>
    <div class="pro_change">
        <!-- 项目立项 -->
            <Card class="itemCard">
                <p slot="title">报送人信息</p>
                <Form :label-width="80">
                    <Row>
                        <Col span="24">
                            <FormItem label="任务编号：">
                                <b>{{postUnchange.TaskNumber}}</b>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="报送人" prop="name">
                                {{postUnchange.TaskOwnerName}}
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="联系电话" prop="phone">
                                {{postUnchange.TaskOwnerPhone}}
                            </FormItem>   
                        </Col>
                        <!-- <Col span="24" v-if="postdata.TaskFiles.length>0" >
                            <FormItem label="报送文件：" >
                                <p  v-for="(item,index) in postdata.TaskFiles" :key='index'>
                                    <a :href="'http://120.78.154.66:8089/taskfiles/'+item.dateFolder+'/'+item.oldFileName" target="_blank" style="color:#2d8cf0;">
                                        {{item.oldFileName}}
                                    </a> 
                                    <Button style="color:#ed4014;" type="text" @click="deleteOriginFile(item.taskFileID,item.oldFileName,index)">删除</Button>
                                </p>
                            </FormItem>
                        </Col> -->
                    </Row>
                </Form>
            </Card>
            <Card class="itemCard">
                <p slot="title">项目选择</p>
                <Form :label-width="80">
                    <Row>
                        <Col span="8">
                            <FormItem label="项目简称" prop="ProjectType">
                                <Select v-model="ProjectVlaue" filterable  @on-change="selectProDetail">
                                    <Option v-for="item in ProjectData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
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
                <Form :label-width="100">
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
                                <Select v-model="postdata.Project.FundID" @on-change="getFund" filterable label-in-value  placeholder="请选择所属基金">
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
                                <Input v-model="postdata.Project.EstimatedHourCost" type="number" placeholder="请输入工时费">
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
                            <FormItem label="预计直接费用" prop="EstimatedFeeCost">
                                <Input v-model="postdata.Project.EstimatedFeeCost" type="number" placeholder="请输入直接费用">
                                      <span slot="append">万元</span>
                                </Input>
                            </FormItem>   
                        </Col>
                    </Row>

                </Form>   
                
            </Card>
             <Card  class="itemCard">
                <p slot="title">项目进度</p>
                <Table :columns="progress" :data="progressData">
                    <template slot-scope="{row,index}" slot="action">
                        <span  @click="showEdict(-1,index,row)" style="margin-right:5px;color:#3498db;cursor:pointer;">编辑</span>
                        <span  @click="processDelete(index)" style="margin-right:5px;color:#ed4014;cursor:pointer;">删除</span>
                    </template>
                </Table>

                 <Button style="margin-top:15px;" type="primary" @click="showEdict(1,0,'')" >添加进度</Button>
                
            </Card>      
             <Card  class="itemCard">
                <p slot="title">请示信息</p>
                <Form :label-width="80">
                        <FormItem label="事项要点">
                            <Input v-model="postUnchange.TaskName" placeholder="请输入事项要点"></Input>
                        </FormItem>
                        <FormItem label="具体内容" prop="TaskSummary">
                            <Input v-model="postUnchange.TaskSummary" type="textarea" :autosize="{minRows: 10,maxRows: 15}" placeholder="请输入事项的具体内容"></Input>
                        </FormItem>
                     <FormItem label="文件列表" v-if="fileName.length>0&&showFile">
                                <p class="fileName" v-for="(item,index) in fileName" :key='index'>
                                    <Row >
                                        <Col span="20">
                                            <span style="color:#2b85e4;margin-right:8px;">{{item.name}}</span>
                                            <span style="color:#808695;font-size:12px;">{{item.file}}</span>
                                        </Col>
                                        <Col span="4" style="color:#ed4014;cursor:pointer;" >
                                        <span @click="deleteFile(index)">删除</span> 
                                        </Col>
                                    </Row>
                                </p>
                    </FormItem>

                     <FormItem>
                         <Button @click="showUploadFile()" style="margin-right: 8px">添加附件</Button>
                         <Button style="margin-right: 8px" type="primary" :loading="loading"  @click="handleSubmitAgree()">
                                <span v-if="!loading">同意</span>
                                <span v-else>提交中...</span>
                            </Button> 
                            <Button :loading="loading2" @click="handleSubmitDisgree()"  style="margin-right: 8px" type="error">
                                <span v-if="!loading">不同意</span>
                                <span v-else>提交中...</span>
                            </Button> 

                    </FormItem>
                </Form>   
            </Card>
            <upload-files ref="uploadModal"  @handleUploadFileEvent="handleUploadEvent"></upload-files>
            <Modal v-model="processModal" title="编辑项目进度信息" @on-ok="setProcess">
                <Form :label-width="100">
                         <Row >
                            <Col span="12">
                                <FormItem label="序号">
                                    <Input placeholder="序号" type="number" v-model="ScheduleID"></Input>
                                </FormItem>
                            </Col>
                             <Col span="12">
                                <FormItem label="进度名">
                                    <Input placeholder="进度名"  v-model="ScheduleName"></Input>
                                </FormItem>
                            </Col>
                             <Col span="12">
                                <FormItem label="预计开始时间">
                                     <DatePicker @on-change="setEstStartDate" :value='EstStartDate' type="date"  placeholder="选择开始时间" style="width: 100%;"></DatePicker>
                                </FormItem>
                            </Col>
                             <Col span="12">
                                <FormItem label="预计结束时间">
                                     <DatePicker @on-change="setEstEndDate" :value='EstEndDate' type="date"  placeholder="选择结束时间" style="width: 100%;"></DatePicker>
                                </FormItem>
                            </Col>
                             <Col span="12">
                                <FormItem label="实际开始时间">
                                     <DatePicker @on-change="setRealStartDate" :value='RealStartDate' type="date"  placeholder="选择实际开始时间" style="width: 100%;"></DatePicker>
                                </FormItem>
                            </Col>
                             <Col span="12">
                                <FormItem label="实际结束时间">
                                     <DatePicker @on-change="setRealEndDate" :value='RealEndDate' type="date"  placeholder="选择实际结束时间" style="width: 100%;"></DatePicker>
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem label="进度说明">
                                    <Input placeholder="进度说明"  v-model="Summary"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                </Form>

            </Modal>

    </div>
</template>
<script>
// tips
// 需要一个对象存储初始加载时的信息
// 在切换选择的项目简称是，任务编号，报送人，联系电话，事项要点，具体内容不变
// 当提交数据是有更改调用修改并同意
// 当客户信息改时客户id设置为0
// 当项目信息有更改是项目id这位0
// 项目

import {getprogectType,getprogectRole,getuserList,
getCityList,getIndustryList,getProjectList,getPlatform,getAllDepartment,
getProjectDetail,addNewProjecttask,getAllFundList,getDealTaskDetail
} from "@/api/data"

import UploadFiles from "@/view/components/upload_file/upload_file"
import {TaskTypeID} from "@/libs/data"
import {toUpperCase,orderObj} from "@/libs/tools"
export default {
    components:{
        UploadFiles,
    },props:{
        taskID:String,
        taskFlowID:String,
        taskTypeID:String
    },
    data(){
        return{
            processModal:false,
            processDeal:false,
            loading:false,
            loading2:false,
            name:'',
            phone:'',
            ProjectVlaue:'',
            ScheduleID:'',
            ScheduleName:'',
            Summary:'',
            EstStartDate:'',
            EstEndDate:'',
            RealStartDate:'',
            RealEndDate:'',
            edictProcessIndex:0,
            progress:[
                {title:'序号',key:'ScheduleID',width:100},
                {title:'进度名',key:'ScheduleName'},
                {title:'预计开始时间',key:'EstStartDate'},
                {title:'预计结束时间',key:'EstEndDate'},
                 {title:'实际开始时间',key:'RealStartDate'},
                {title:'实际结束时间',key:'RealEndDate'},
                {title:'说明',key:'Summary'},
                {title:'操作', slot: 'action',width: 150}
            ],
            progressData:[],
            ProjectData:[],
            cityData:[],
            IndustryData:[],
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
            MemberList:[],
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            platformList:[],
            departmentList:[],
            fundListData:[],
            fileForm:new FormData(),
            standPost:{},
            postUnchange:{
                TaskTypeID:this.taskTypeID,
                TaskName:'',
                TaskSummary:'',
                TaskNumber:'',
                TaskOwner:'',
                TaskOwnerPhone:'',
                TaskOwnerName:'',
            },
            postdata:{
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
            }
        }
    },
    mounted(){
        this.getProList(2);
        this.getCityList();
        this.getIndustryList();
        this.getprogectType();
        this.getprogectRole();
        this.getuserList();
        this.getPlatform();
        this.getAllDepartment();
        this.getAllFundList();
        this.getDealTaskDetail()
    },
    methods:{
        getDealTaskDetail(){
            //获取任务详情
            getDealTaskDetail( {"TaskID":this.taskID} ).then(res=>{
                if(res.data.code==2303){
                    this.standPost=res.data;
                    this.postUnchange={
                        TaskTypeID:this.taskTypeID,//任务类别ID，与TaskTypes表的TaskTypeID对应（开发3/立项4/变动5），取自对应的菜单项
                        TaskName:res.data.taskName,//任务名（UI中的请示事项要点）
                        TaskSummary:res.data.taskSummary,//任务概要（UI中的请示事项具体内容）
                        TaskNumber:res.data.taskNumber,
                        TaskOwnerName:res.data.taskOwnerName,
                        TaskOwnerPhone:res.data.taskOwnerPhone,
                        TaskOwner:res.data.taskOwner,//任务申请人ID，与User表的UserID对应，取自当前登录用户
                    }
                    this.postdata={
                        Client:{
                            ClientID:res.data.client.clientID,//客户ID，开发/立项（未选已有项目）报告：为0，提交后新增客户信息，立项（选已有项目）/变动报告：为选中的项目的客户ID，提交后保存客户历史信息（ClientStatus设为0）并新增最新信息
                            ClientName:res.data.client.clientName,//公司全称
                            Region:res.data.client.region,//所在省市，下拉表，从后台字典表中获取
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
                            ProjectType:parseInt(res.data.project.projectType),//项目品种，下拉表，从后台字典表中获取
                            ProjectRole:parseInt(res.data.project.projectRole),//项目角色，下拉表，从后台字典表中获取
                            Summary:res.data.project.projectSummary,//项目概要
                            Source:res.data.project.source,//项目来源
                            EstimatedFeeCost:res.data.project.estimatedFeeCost,//预计直接费用
                            EstimatedHourCost:res.data.project.estimatedHourCost,//预计工时费用
                            ProjectStatus:res.data.project.projectStatus,//状态，默认为1，0表示历史信息，2表示开发报告审批完的项目，3表示立项报告审批完的项目，4表示总结报告审批完的项目
                            FundCode:res.data.project.fundCode,//基金代码
                            FundID:res.data.project.fundID,//基金id
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
                            EstEndDate:res.data.project.estEndDate,//预计项目结束日期
                            Members:res.data.project.members,
                            Schedules:res.data.project.schedules,
                            CurNumber:res.data.project.curNumber,
                            CurYear:res.data.project.curYear,
                            EstFeeCost:res.data.project.estFeeCost,
                            EstHourCost:res.data.project.estHourCost


                        }
                                
                    }
                    this.ProjectVlaue=res.data.project.projectID;
                    this.loadMember(res.data.project.members);//加载人员信息  
                    this.loadProcess(res.data.project.schedules)//加载项目进度
                }else{
                    this.$Message.error({
                        content:'数据加载失败：'+res.data.message
                    })
                }
            })

        },
            handleSubmitAgree(){
                //点击同意并修改内容
                var obj={
                    TaskTypeID:this.taskTypeID,
                    TaskName: this.standPost.taskName,//任务名（UI中的请示事项要点）
                    TaskSummary: this.standPost.taskSummary,//任务概要（UI中的请示事项具体内容）
                    TaskNumber: this.standPost.taskNumber,
                    TaskOwnerName: this.standPost.taskOwnerName,
                    TaskOwnerPhone: this.standPost.taskOwnerPhone,
                    TaskOwner: this.standPost.taskOwner,//
                }
                //由于返回数据和提交数据参数首字符大小不一  先将首字母大写，再排序，然后转化为字符串，再比较
                var postClient=JSON.stringify(orderObj(toUpperCase(this.postdata.Client))),
                    standClient=JSON.stringify(orderObj(toUpperCase(this.standPost.client))),
                    postProject=JSON.stringify(orderObj(toUpperCase(this.postdata.Project))),
                    standProject=JSON.stringify(orderObj(toUpperCase(this.standPost.project)))

                if(!(postClient==standClient)){
                    //客户信息有修改
                    alert('客户信息有修改')

                }
                if(!(postProject==standProject)){
                    //项目信息有修改
                     alert('项目信息有修改')
                } 
                if(!(JSON.stringify(this.postUnchange)==JSON.stringify(obj))){
                    //普通信息有修改
                     alert('普通信息有修改')
                }
            

                //点击同意无修改内容

                
                // this.postdata.Project.Schedules=[];
                // this.progressData.forEach(element=>{
                //      this.postdata.Project.Schedules.push({
                //          ID:0,
                //          ProjectID:this.ProjectVlaue,
                //          ScheduleID:element.ScheduleID,
                //          ScheduleName:element.ScheduleName,
                //          Summary:element.Summary,
                //          EstStartDate:element.EstStartDate,
                //          EstEndDate:element.EstEndDate,
                //          RealStartDate:element.RealStartDate,
                //          RealEndDate:element.RealEndDate,
                //          Status:element.Status,
                //      })
                // })



            },
            handleSubmitDisgree(){
                //点击不同意
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
            showEdict(type,index,row){
                this.processModal=true;
                if(type==1){
                    //新增
                    this.ScheduleID='';
                    this.ScheduleName='';
                    this.Summary='';
                    this.EstStartDate='';
                    this.EstEndDate='';
                    this.RealEndDate='';
                    this.RealStartDate='';
                    this.processDeal=true;
                }else{
                    //编辑
                    this.edictProcessIndex=index;
                    this.ScheduleID=row.ScheduleID;
                    this.ScheduleName=row.ScheduleName;
                    this.Summary=row.Summary;
                    this.EstStartDate=row.EstStartDate;
                    this.EstEndDate=row.EstEndDate;
                    this.RealStartDate=row.RealStartDate;
                    this.RealEndDate=row.RealEndDate;

                    this.processDeal=false;
                }
            },processDelete(index){
                // this.postdata.Project.Schedules
                 this.$Modal.confirm({
                    title:"删除",
                    content:"是否删除该进度:"+this.progressData[index]["ScheduleName"]+"?",
                    onOk:()=>{
                        this.progressData.splice(index,1);
                    }
                })
            },
            selectProDetail(){
                getProjectDetail({ProjectID:this.ProjectVlaue}).then(res=>{
                    if(res.data.code==2308){
                        this.postdata={
                                Client:{
                                    ClientID:res.data.client.clientID,//客户ID，开发/立项（未选已有项目）报告：为0，提交后新增客户信息，立项（选已有项目）/变动报告：为选中的项目的客户ID，提交后保存客户历史信息（ClientStatus设为0）并新增最新信息
                                    ClientName:res.data.client.clientName,//公司全称
                                    Region:res.data.client.region,//所在省市，下拉表，从后台字典表中获取
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
                                    ClientStatus:1//状态，1表示最新信息，0表示历史信息
                                },
                                Project:{
                                    ProjectID:res.data.project.projectID,//项目ID，开发/立项（未选已有项目）/立项（选已有项目）报告：0，提交后新增项目信息，变动报告：为选中的项目ID，提交后保存项目历史信息（ProjectStatus设为0）并新增最新信息
                                    ClientID:res.data.client.clientID,//客户ID 
                                    ClientCode:res.data.project.clientCode,//客户代码，不同项目使用“客户代码 + 项目品种 + 项目角色”唯一区分
                                    ProjectType:parseInt(res.data.project.projectType),//项目品种，下拉表，从后台字典表中获取
                                    ProjectRole:parseInt(res.data.project.projectRole),//项目角色，下拉表，从后台字典表中获取
                                    Summary:res.data.project.projectSummary,//项目概要
                                    Source:res.data.project.source,//项目来源
                                    EstimatedFeeCost:res.data.project.estimatedFeeCost,//预计直接费用
                                    EstimatedHourCost:res.data.project.estimatedHourCost,//预计工时费用
                                    ProjectStatus:res.data.project.projectStatus,//状态，默认为1，0表示历史信息，2表示开发报告审批完的项目，3表示立项报告审批完的项目，4表示总结报告审批完的项目
                                    FundCode:res.data.project.fundCode,//基金代码
                                    FundID:res.data.project.fundID,//基金id
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
                                    EstEndDate:res.data.project.estEndDate,//预计项目结束日期
                                    Members:res.data.project.members,
                                    Schedules:res.data.project.schedules,
                                     CurNumber:res.data.project.curNumber,
                                    CurYear:res.data.project.curYear,
                                     EstFeeCost:res.data.project.estFeeCost,
                                    EstHourCost:res.data.project.estHourCost
                                }
                        }
                         this.loadMember(res.data.project.members);//加载人员信息  
                         this.loadProcess(res.data.project.schedules)//加载项目进度
                    }else{
                        this.$Message.error({
                            content:"获取项目详细信息失败："+res.data.message
                        })
                    }
                })
            },loadMember(obj){
                this.MemberData=[];

                obj.map(item=>{
                    item.id=0;
                    switch (item.memberType){
                        case 91:
                            //项目经理
                            this.ManagerVlaue=item.memberID;
                        break;
                        case 92:
                            //项目主办
                            this.OwnerVlaue=item.memberID;
                        break;
                        case 93:
                            //项目成员
                            this.MemberData.push(item.memberID);
                        break;
                    }              
                })
            },
            loadProcess(obj){
                this.progressData=[];
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
            getManager(value){
                 this.postdata.Project.Members[0]={
                
                    ID:0,//数据ID (用默认值0)
                    ProjectID:0,//项目ID，开发/立项（未选已有项目）/立项（选已有项目）报告为0，变动报告为选中的项目ID
                    MemberID:value.value,//项目成员ID，与用户表UserID对应
                    MemberName:value.label,//项目成员的姓名
                    MemberType:91,//1表示项目经理，2表示项目主办，3表示项目成员，4基金合伙人，5基金投决会，6基金成员，与角色表对应
                    //EstimatedHour:0,//预计投入工时，暂未使用
                    Status:1//1表示目前的成员，0表示过往的成员(用默认值1)
                
                }
            },
            getOwner(value){
                this.postdata.Project.Members[1]={
                    ID:0,//数据ID (用默认值0)
                    ProjectID:0,//项目ID，开发/立项（未选已有项目）/立项（选已有项目）报告为0，变动报告为选中的项目ID
                    MemberID:value.value,//项目成员ID，与用户表UserID对应
                    MemberName:value.label,//项目成员的姓名
                    MemberType:92,//91表示项目经理，92表示项目主办，93表示项目成员，4基金合伙人，5基金投决会，6基金成员，与角色表对应
                    //EstimatedHour:0,//预计投入工时，暂未使用
                    Status:1//1表示目前的成员，0表示过往的成员(用默认值1)
                }
            },
            getMember(value){
                this.postdata.Project.Members.splice(2,this.postdata.Project.Members.length-1)
                value.forEach(element=>{
                    this.postdata.Project.Members.push({
                        ID:0,//数据ID (用默认值0)
                        ProjectID:0,//项目ID，开发/立项（未选已有项目）/立项（选已有项目）报告为0，变动报告为选中的项目ID
                        MemberID:element.value,//项目成员ID，与用户表UserID对应
                        MemberName:element.label,//项目成员的姓名
                        MemberType:93,//1表示项目经理，2表示项目主办，3表示项目成员，4基金合伙人，5基金投决会，6基金成员，与角色表对应
                        //EstimatedHour:0,//预计投入工时，暂未使用
                        Status:1//1表示目前的成员，0表示过往的成员(用默认值1)
                    })
                })
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
            setEstStartDate(value){
                this.EstStartDate=value;
            },
            setEstEndDate(value){
                this.EstEndDate=value; 
            },
            setRealStartDate(value){
                this.RealStartDate=value; 
            },
            setRealEndDate(value){
                this.RealEndDate=value; 
            },
            setProcess(){
                if(this.processDeal){
                    //新增
                    this.progressData.push({
                        ScheduleID:this.ScheduleID,
                        ScheduleName:this.ScheduleName,
                        Summary:this.Summary,
                        EstStartDate:this.EstStartDate,
                        EstEndDate:this.EstEndDate,
                        ID:0,
                        ProjectID:0,
                        RealStartDate:this.RealStartDate,
                        RealEndDate:this.RealStartDate,
                        Status:1
                    })
                }else{
                    //编辑
                    this.progressData[this.edictProcessIndex].ScheduleID=this.ScheduleID;
                    this.progressData[this.edictProcessIndex].ScheduleName=this.ScheduleName;
                    this.progressData[this.edictProcessIndex].Summary=this.Summary;
                    this.progressData[this.edictProcessIndex].EstStartDate=this.EstStartDate;
                    this.progressData[this.edictProcessIndex].EstEndDate=this.EstEndDate;

                    this.progressData[this.edictProcessIndex].ID=this.ID;
                    this.progressData[this.edictProcessIndex].ProjectID=this.ProjectID;
                    this.progressData[this.edictProcessIndex].RealStartDate=this.RealStartDate;
                    this.progressData[this.edictProcessIndex].RealEndDate=this.RealEndDate;
                     this.progressData[this.edictProcessIndex].Status=this.Status;

                }
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
            getFund(val){//设置基金
                this.postdata.Project.FundID=val.value;
                for(var i=0;i<this.fundListData.length;i++){
                    if(this.fundListData[i].fundID==val.value){
                        this.postdata.Project.FundCode=this.fundListData[i].fundCode
                        break;
                    }
                }

            },
            getProList(status){
                //获取项目列表
                getProjectList({"ProjectStatus":2,"USerID":JSON.parse(localStorage.getItem("userId"))}).then(res=>{
                    if(res.data.code==2307){
                        res.data.projectList.forEach(element => {
                            this.ProjectData.push({
                                label:element.clientCode+'--'+element.projectType+'--'+element.projectRole,
                                value:element.projectID
                            })
                        });
                       
                    }else{
                        this.$Message.error({
                            content:'项目列表数据加载失败：'+res.data.message
                        })
                    }
                })
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
        },getPlatform(){
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
        },deleteFile(index){
                this.fileName.splice(index,1);
                this.fileWrap.splice(index,1);

            },
            handleUploadEvent(flag,filename,fileWrap){
                this.fileModal=flag;
                if(filename){
                    this.fileName=filename;
                }
                if(fileWrap){
                    this.fileWrap=fileWrap;
                }
                this.showFile=true;
            },showUploadFile(){
                //显示modal
                this.$refs["uploadModal"].showModal(true);
            }
            
        }
}
</script>
<style lang='less'  scoped>
     .approval{
        width: 100%;
        height:100%;
        .itemCard{
            margin-bottom: 20px;
        }
    }
</style>
