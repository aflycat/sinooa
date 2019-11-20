<template>
    <div class="opraTem">
        <Card  class="itemCard">
            <p slot="title">任务明细</p>
            <Form :label-width="80">
                <Row>
                     <Col span="24">
                        <FormItem label="任务编号：">
                            {{postdata.TaskNumber}}
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="事项要点：">
                             <Input v-model="postdata.TaskName" placeholder='请输入事项要点'></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="事项标签：">
                            <!-- {{getdata.taskNumber||''}} -->

                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="报送人：">
                            {{postdata.TaskOwnerName}}
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="联系电话：">
                             <Input v-model="postdata.TaskOwnerPhone" placeholder='请输入事项要点'></Input>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="报送内容：">
                             <Input v-model="postdata.TaskSummary" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入具体内容"></Input>
                        </FormItem>
                    </Col>
                    <Col span="24" v-if="postdata.TaskFiles.length>0" >
                        <FormItem label="报送文件：" >
                            <p  v-for="(item,index) in postdata.TaskFiles" :key='index'>
                                <a :href="'http://120.78.154.66:8089/taskfiles/'+item.dateFolder+'/'+item.fileName" target="_blank" style="color:#2d8cf0;">
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
                <Form :label-width="80">
                    <Row>
  
                         <Col span="8">
                            <FormItem label="公司全称" prop="ClientName">
                                <Input v-model="postdata.Client.ClientName" placeholder="请输入公司全称"></Input>
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="公司简称" prop="ClientShortName">
                                <Input v-model="postdata.Client.ClientShortName" placeholder="请输入公司简称"></Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="所在省市" prop="ClientRegion">
                                 <Select v-model="postdata.Client.ClientRegion" filterable   placeholder="请选择所在省市">
                                    <Option v-for="item in cityData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="所属行业" prop="ClientIndustry">
                                <Select v-model="postdata.Client.ClientIndustry" filterable   placeholder="请选择所属行业">
                                    <Option v-for="item in IndustryData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                         
                       
                        <Col span="8">
                            <FormItem label="经营范围" prop="ClientShortName">
                                <Input v-model="postdata.Client.ClientScope" placeholder="请输入经营范围"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="客户代码" prop="ClientCode">
                                <Input disabled v-model="postdata.Client.ClientCode" placeholder="请输入客户代码"></Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="代表法人" prop="ClientLegalPerson">
                                <Input v-model="postdata.Client.ClientLegalPerson" placeholder="请输入代表法人"></Input>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="总经理" prop="ClientManager">
                                <Input v-model="postdata.Client.ClientManager" placeholder="请输入总经理"></Input>
                            </FormItem>   
                        </Col>

                        <Col span="8">
                            <FormItem label="成立日期" prop="ClientOpenDate">
                                 <DatePicker type="date" :value="postdata.Client.ClientOpenDate"  placeholder="请选择成立日期" style="width: 100%;"></DatePicker>
                                <!-- <Input v-model="postdata.Client.ClientOpenDate" placeholder="请输入成立日期"></Input> -->
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="注册地址" prop="ClientAddress">
                                <Input v-model="postdata.Client.ClientAddress" placeholder="请输入注册地址"></Input>
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="邮政编码" prop="ClientShortName">
                                <Input v-model="postdata.Client.ClientZip" placeholder="请输入邮政编码"></Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="联系人员" prop="ClientContact">
                                <Input v-model="postdata.Client.ClientContact" placeholder="请输入联系人员"></Input>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="联系电邮" prop="ClientContactEmail">
                                <Input v-model="postdata.Client.ClientContactEmail" placeholder="请输入联系电邮"></Input>
                            </FormItem>   
                        </Col>

                         <Col span="8">
                            <FormItem label="联系电话" prop="ClientContactPhone">
                                <Input v-model="postdata.Client.ClientContactPhone" placeholder="请输入联系电话"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="联系传真" prop="ClientContactFax">
                                <Input v-model="postdata.Client.ClientContactFax" placeholder="请输入联系传真"></Input>
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
                            <FormItem label="注册资本" prop="ClientRegisteredCapital">
                                <Input v-model="postdata.Client.ClientRegisteredCapital" type="number" placeholder="请输入注册资本">
                                      <span slot="append">万元</span>
                                </Input>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="总资产" prop="ClientTotalAssets">
                                <Input v-model="postdata.Client.ClientTotalAssets" type="number" placeholder="请输入总资产">
                                  <span slot="append">万元</span>
                                </Input>
                            </FormItem>   
                        </Col>

                         <Col span="8">
                            <FormItem label="净资产" prop="ClientNetAssets">
                                <Input v-model="postdata.Client.ClientNetAssets" type="number" placeholder="请输入净资产">
                                      <span slot="append">万元</span>
                                </Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="营业收入" prop="ClientIncome">
                                <Input v-model="postdata.Client.ClientIncome" type="number" placeholder="请输入营业收入">
                                      <span slot="append">万元</span>
                                </Input>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="营业利润" prop="ClientProfit">
                                <Input v-model="postdata.Client.ClientProfit" type="number" placeholder="请输入营业利润">
                                      <span slot="append">万元</span>
                                </Input>
                            </FormItem>   
                        </Col>

                         <Col span="8">
                            <FormItem label="财务年度" prop="ClientFinancialYear">
                                <Input v-model="postdata.Client.ClientFinancialYear" type="number" placeholder="请输入财务年度">
                                  <span slot="append">万元</span>
                                </Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="财务季度" prop="ClientFinancialQuarter">
                                <Input v-model="postdata.Client.ClientFinancialQuarter" type="number" placeholder="请输入财务季度">
                                      <span slot="append">万元</span>
                                </Input>
                            </FormItem>
                        </Col>
                        
                     
                    </Row>

                </Form>
            </Card>
            <Card  class="itemCard">
                <p slot="title">项目信息</p>
                  <Form :label-width="80">
                    <Row>
                      
                       <Col span="8">
                            <FormItem label="项目品种:" prop="ProjectType">
                                 
                                {{TypeObj[postdata.Project.ProjectType]}}
                                
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="项目角色:
                            " prop="ProjectRole">
                                 
                                {{RoleObj[postdata.Project.ProjectRole]}}
                                 
                                
                            </FormItem>   
                        </Col>

                           <Col span="8">
                            <FormItem label="项目经理" prop="Manager">
                                 <Select v-model="ManagerVlaue"  filterable  label-in-value  placeholder="请选择项目经理">
                                    <Option v-for="item in ManagerData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>  
                        </Col>
                        <Col span="8">
                            <FormItem label="项目主办" prop="Owner"> 
                                 <Select v-model="OwnerVlaue"  filterable  label-in-value  placeholder="请选择项目主办">
                                    <Option v-for="item in ManagerData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                         <Col span="16">
                            <FormItem label="项目成员" prop="Member">
                                 <Select v-model="MemberData"   filterable multiple  label-in-value placeholder="请选择项目成员">
                                    <Option v-for="item in ManagerData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>   
                        </Col>
                        
                        
                         <Col span="24">
                            <FormItem label="项目内容" prop="phone">
                             <Input v-model="postdata.Project.ProjectSummary" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入项目内容"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="项目来源" prop="phone">
                                <Input v-model="postdata.Project.ProjectSource" placeholder="请输入项目来源"></Input>
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="开始日期" prop="ProjectStartDate">
                                  <DatePicker :value="postdata.Project.ProjectStartDate" type="date" placeholder="请选择开始日期" style="width: 100%;"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="结束日期" prop="name">
                                  <DatePicker :value="postdata.Project.ProjectEndDate" type="date" placeholder="请选择结束日期" style="width: 100%;"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="工时费用" prop="ProjectEstimatedHourCost">
                                <Input v-model="postdata.Project.ProjectEstimatedHourCost" type="number" placeholder="请输入工时费">
                                      <span slot="append">万元</span>
                                </Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="直接费用" prop="ProjectEstimatedFeeCost">
                                <Input v-model="postdata.Project.ProjectEstimatedFeeCost" type="number" placeholder="请输入直接费用">
                                      <span slot="append">万元</span>
                                </Input>
                            </FormItem>   
                        </Col>
                    </Row>

                </Form>   
                
            </Card>


        <Card  class="itemCard">
            <p slot="title">审批进度</p>
            <Form :label-width="80">
                <Timeline>
                   
                    <template v-for="(item,index) in postdata.TaskFlows">

                        <TimelineItem  :color="item.flowStatus==1?'#19be6b':'#515a6e'"  :key="index">
                            <p >{{item.flowDoneDate.replace("T"," ").substr(0,16)}}   <Divider type="vertical" />
                                {{item.flowSummary}}  <Divider type="vertical" />
                                {{item.flowOwnerName}} <Divider type="vertical" />
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
                        <FormItem label="审批意见">
                            <Input  type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入具体内容"></Input>
                        </FormItem>
                    </Col>
                    <Col span="24">
                    <FormItem label="文件列表" v-if="fileName.length>0&&showFile">
                                <p class="fileName" v-for="(item,index) in fileName" :key="index">
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
                    </Col>
                    <Col span="24">
                        <FormItem label=" ">
                            <Button @click="showUploadFile()" style="margin-right: 8px">添加附件</Button>
                            <Button style="margin-right: 8px" type="primary" :loading="loading"  @click="handleSubmit()">
                                <span v-if="!loading">同意</span>
                                <span v-else>提交中...</span>
                            </Button> 
                            <Button @click="showReturnModal"  style="margin-right: 8px" type="warning">修改</Button>  
                            <Button :loading="loading2"  style="margin-right: 8px" type="error">
                                <span v-if="!loading">驳回</span>
                                <span v-else>提交中...</span>
                                
                            </Button> 
                        </FormItem>
                    </Col>
                </Row>
            </Form>    
        </Card>    
        <upload-files ref="uploadModal"  @handleUploadFileEvent="handleUploadEvent"></upload-files>
        <return-step ref='stepModal' :taskFlowID="taskFlowID" :taskFlows="taskFlows" :FlowComment="FlowComment" :taskID="taskID"></return-step>
    </div>
</template>
<script>
import {getDealTaskDetail,getCityList,getIndustryList,getprogectType,getprogectRole,getuserList} from "@/api/data"
import {deleteFile} from "@/api/user"
import returnStep from "@/view/components/template/return_step"
import UploadFiles from "@/view/components/upload_file/upload_file"

export default {
    components:{
        UploadFiles,
        returnStep
    },
    props:{
        taskID:String,
        taskFlowID:String
    },
    name:'progedictTem',
    data(){
        return{
            loading:false,
            loading1:false,
            loading2:false,
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
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
                    ClientRegion:'',//所在省市，下拉表，从后台字典表中获取
                    ClientShortName:'',//公司简称
                    ClientCode:'',//客户代码，不同客户使用该唯一的代码区分
                    ClientScope:'',//经营范围
                    ClientIndustry:'',//所属行业，下拉表，从后台字典表中获取
                    ClientLegalPerson:'',//法人代表
                    ClientManager:'',//总经理
                    ClientRegisteredCapital:0,//注册资本
                    ClientOpenDate:'',//成立日期
                    ClientAddress:'',//注册地址
                    ClientZip:'',//邮政编码
                    ClientContact:'',//联系人员
                    ClientContactEmail:'',//联系电邮
                    ClientContactPhone:'',//联系电话
                    ClientContactFax:'',//联系传真
                    ClientTotalAssets:0,//总资产
                    ClientNetAssets:0,//净资产
                    ClientIncome:0,//营业收入
                    ClientProfit:0,//营业利润
                    ClientNetProfit:0,//净利润
                    ClientFinancialYear:0,//财务年度
                    ClientFinancialQuarter:0,//财务季度
                    ClientStatus:1//状态，1表示最新信息，0表示历史信息
                },
                Project:{
                    ProjectID:0,//项目ID，开发/立项（未选已有项目）/立项（选已有项目）报告：0，提交后新增项目信息，变动报告：为选中的项目ID，提交后保存项目历史信息（ProjectStatus设为0）并新增最新信息
                    ClientID:0,//客户ID 
                    ClientCode:'',//客户代码，不同项目使用“客户代码 + 项目品种 + 项目角色”唯一区分
                    ProjectType:'',//项目品种，下拉表，从后台字典表中获取
                    ProjectRole:'',//项目角色，下拉表，从后台字典表中获取
                    ProjectSummary:'',//项目概要
                    ProjectSource:'',//项目来源
                    ProjectStartDate:'',//项目开始日期
                    ProjectEndDate:'',//项目结束日期
                    ProjectEstimatedFeeCost:0,//预计直接费用
                    ProjectEstimatedHourCost:0,//预计工时费用
                    ProjectStatus:1,//状态，默认为1，0表示历史信息，2表示开发报告审批完的项目，3表示立项报告审批完的项目，4表示总结报告审批完的项目
                    Members:[]//1表示项目经理，2表示项目主办，3表示项目成员，4基金合伙人，5基金投决会，6基金成员，与角色表对应
                }
            },
            
            taskFlows:[],
            FlowComment:'',
            cityData:[],
            IndustryData:[],
            TypeObj:{},
            RoleObj:{},
            ManagerData:[],
            MemberData:[],
            ManagerVlaue:'',
            OwnerVlaue:'',
        }
    },
    watch:{ 
        taskID(){
            this.gettaskDetail();
            this.MemberData=[]
        }
    },
    mounted(){
        this.gettaskDetail();
        this.getCityList();
        this.getIndustryList();
        this.getprogectType();
        this.getprogectRole();
        this.getuserList();
    },
    methods:{
        gettaskDetail(){
            getDealTaskDetail({TaskID:this.taskID}).then(res=>{
                console.log(res)
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
                            ClientShortName:res.data.client.clientShortName,//公司简称
                            ClientCode:res.data.client.clientCode,//客户代码，不同客户使用该唯一的代码区分
                            ClientScope:res.data.client.clientScope,//经营范围
                            ClientIndustry:res.data.client.clientIndustry,//所属行业，下拉表，从后台字典表中获取
                            ClientLegalPerson:res.data.client.clientLegalPerson,//法人代表
                            ClientManager:res.data.client.clientManager,//总经理
                            ClientRegisteredCapital:res.data.client.clientRegisteredCapital,//注册资本
                            ClientOpenDate:res.data.client.clientOpenDate,//成立日期
                            ClientAddress:res.data.client.clientAddress,//注册地址
                            ClientZip:res.data.client.clientZip,//邮政编码
                            ClientContact:res.data.client.clientContact,//联系人员
                            ClientContactEmail:res.data.client.clientContactEmail,//联系电邮
                            ClientContactPhone:res.data.client.clientContactPhone,//联系电话
                            ClientContactFax:res.data.client.clientContactFax,//联系传真
                            ClientTotalAssets:res.data.client.clientTotalAssets,//总资产
                            ClientNetAssets:res.data.client.clientNetAssets,//净资产
                            ClientIncome:res.data.client.clientIncome,//营业收入
                            ClientProfit:res.data.client.clientProfit,//营业利润
                            ClientNetProfit:res.data.client.clientNetProfit,//净利润
                            ClientFinancialYear:res.data.client.clientFinancialYear,//财务年度
                            ClientFinancialQuarter:res.data.client.clientFinancialQuarter,//财务季度
                            ClientStatus:1//状态，1表示最新信息，0表示历史信息
                        },
                        Project:{
                            ProjectID:res.data.project.projectID,//项目ID，开发/立项（未选已有项目）/立项（选已有项目）报告：0，提交后新增项目信息，变动报告：为选中的项目ID，提交后保存项目历史信息（ProjectStatus设为0）并新增最新信息
                            ClientID:res.data.client.clientID,//客户ID 
                            ClientCode:res.data.project.clientCode,//客户代码，不同项目使用“客户代码 + 项目品种 + 项目角色”唯一区分
                            ProjectType:res.data.project.projectType,//项目品种，下拉表，从后台字典表中获取
                            ProjectRole:res.data.project.projectRole,//项目角色，下拉表，从后台字典表中获取
                            ProjectSummary:res.data.project.projectSummary,//项目概要
                            ProjectSource:res.data.project.projectSource,//项目来源
                            ProjectStartDate:res.data.project.projectStartDate,//项目开始日期
                            ProjectEndDate:res.data.project.projectEndDate,//项目结束日期
                            ProjectEstimatedFeeCost:res.data.project.projectEstimatedFeeCost,//预计直接费用
                            ProjectEstimatedHourCost:res.data.project.projectEstimatedHourCost,//预计工时费用
                            ProjectStatus:1,//状态，默认为1，0表示历史信息，2表示开发报告审批完的项目，3表示立项报告审批完的项目，4表示总结报告审批完的项目
                        //     Members:[]
                        }
                    };
                    this.taskFlows=res.data.taskFlows;
                    this.loadMember(res.data.project.members)

                   
                }else{
                    this.$Message.error({
                        content:'获取任务信息失败：'+res.data.message
                    })
                }
            })
        },
        deleteFile(index){
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
        },showReturnModal(){
            this.$refs['stepModal'].showModal(true)
        },deleteOriginFile(fileId,fileName,index){
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
        },loadMember(obj){
            obj.map(item=>{
                switch (item.memberType){
                    case 1:
                        //项目经理
                        this.ManagerVlaue=item.memberID;
                    break;
                     case 2:
                         //项目主办
                        this.OwnerVlaue=item.memberID;
                    break;
                     case 3:
                         //项目成员
                        this.MemberData.push(item.memberID);
                    break;
                }              
            })
        },
        getprogectType(){
            //  TypeObj:{},
            // RoleObj:{},
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
                            value:element.regionId.toString()
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
                            value:element.industryId.toString()
                        })
                    });
                }else{
                    this.$Message.error({
                        content:"公司所属行业信息加载失败:"+res.data.message
                    })
                }
            })
        }

        
    }
}
</script>
<style lang="less" scoped>
   
    .content{
   font-size: 14px;
        font-weight: bold;
    }
</style>