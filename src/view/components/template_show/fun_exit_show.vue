<template>
    <div class="pro_change">
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
                    <task-file :fileList='postdata.TaskFiles'></task-file>

                </Row>
                 </Form>    
        </Card>
        <Card  class="itemCard">
            <p slot="title">基金信息</p>
                <Form :label-width="120">
                    <Row>
                      
                        <Col span="8">
                            <FormItem label="权属平台：" >
                             <b> {{platList[postdata.Fund.PlatformID]}} </b>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="基金全称：">
                                <b>{{postdata.Fund.FundName}}</b>
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="基金简称：">
                                 <b>{{postdata.Fund.ShortName}}</b>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="注册日期：">
                                 <b>{{postdata.Fund.RegDate.substr(0,10)||''}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="成立日期：" >
                                <b> {{postdata.Fund.OpenDate.substr(0,10)||''}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="备案日期：" >
                                <b> {{postdata.Fund.RecordDate.substr(0,10)||''}}</b>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="终止日期：" >
                                <b> {{postdata.Fund.EndDate.substr(0,10)||''}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="基金类型：">
                                <b> {{postdata.Fund.RegType}}</b>
                             
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="基金代码：" >
                                <b> {{postdata.Fund.FundCode}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="协会登记编码：" >
                                <b> {{postdata.Fund.RegSCode}}</b>
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="社会统一代码：" >
                                <b> {{postdata.Fund.CodsCode}}</b>
                            </FormItem>   
                        </Col>
                      </Row>
                </Form>
        </Card>
         <Card  class="itemCard">
            <p slot="title">投资信息</p>
            <Form :label-width="120" v-for='(item,index) in postdata.Fund.Invests' :key='index'>
                <template v-if='item.status==1'>
                    <Row >
                        <Col span="8">
                            <FormItem label="投资类型：">
                                <b>{{item.targetType==1?'投资项目':'投资基金'}}</b>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="投资对象：">
                                <b v-if='item.targetType==1'>{{proNameList[item.targetID]}}</b>
                                <b v-else>{{fundNameList[item.targetID]}}</b>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="投资方式：">
                               <b> {{item.investWay}}</b>
                              
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="持股比例：" >
                                <b>{{item.shareRate}}%</b>
                              
                            </FormItem>   
                        </Col>
                       
                        <Col span="8">
                            <FormItem label="持资认缴资本总额：" >
                                <b>{{item.orderMoney}}万元</b>
                              
                            </FormItem>   
                        </Col>
                        <Col span="8" >
                            <FormItem label="已投资总额：" >
                                <b>{{item.paidMoney}}万元</b>
                               
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="投资日期" >
                               <b> {{item.investDate.substr(0,10)||''}}</b>
                            </FormItem>   
                        </Col>
                        
                    </Row>
                    <Card  class="itemCard">
                        <p slot="title">退出信息</p>
                        
                                <Row v-for='(x,index) in item.exits' :key='index'>
                                    <Col span="8">
                                        <FormItem label="退出方式：">
                                            <b>{{x.exitWay}}</b>
                                     
                                        </FormItem>   
                                    </Col>
                                    <Col span="8">
                                        <FormItem   label="退出日期：">
                                            <b>{{x.exitDate.substr(0,10)}}</b>
                                        </FormItem>   
                                    </Col>
                                    <Col span="8" >
                                        <FormItem label="分配方式：" >
                                            <b>{{x.moneyType}}</b>
                                           
                                        </FormItem>   
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="退出本金：" >
                                            <b>{{x.exitPrincipal}}</b>
                                          
                                        </FormItem>   
                                    </Col>
                                
                                    <Col span="8">
                                        <FormItem label="实际退出金额：" >
                                            <b>{{x.exitMoney}}</b>
                                        
                                        </FormItem>   
                                    </Col>
                                    
                                </Row>
                        
                    </Card>
                    </template>

             </Form>
              
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
                            <!-- <Button @click="showReturnModal"   style="margin-right: 8px" type="warning">修改</Button>   -->
                            <Button :loading="loading2" @click="handleSubmitDisgree()"  style="margin-right: 8px" type="error">
                                <span v-if="!loading">不同意</span>
                                <span v-else>提交中...</span>
                            </Button> 
                        </FormItem>
                    </Col>
                </Row>
            </Form>    
        </Card>  
        <upload-files ref="uploadModal"  @handleUploadFileEvent="handleUploadEvent"></upload-files>

    </div>
</template>
<script>
import UploadFiles from "@/view/components/upload_file/upload_file"
import returnStep from "@/view/components/template/return_step"
import taskFile from "@/view/components/template/task_file_show"
import {getDealTaskDetailFund,getPlatform,getAllFundList,programListQuery} from "@/api/data"
export default {
    components:{
        UploadFiles,
        taskFile
    },
    props:{
        taskID:String,
        taskFlowID:String
    },
    data(){
        return{
            loading:false,
            loading2:false,
            FlowComment:'',
            platList:{},
            proNameList:{},
            fundNameList:{},
            postdata:{
                TaskFiles:[],
                TaskNumber:'',
                TaskFlows:[],
                Fund:{
                    RegDate:'',
                    OpenDate:'',
                    RecordDate:'',
                    EndDate:''
                }
            }
        }
    },
    mounted(){
        this.getDealTaskDetailFund();
        this.getPlatform();
        this.getAllFundList();
        this.programListQuery();
    },
    methods:{
         getDealTaskDetailFund(){
            getDealTaskDetailFund({TaskID:this.taskID}).then(res=>{
                if(res.data.code==2403){
                    this.postdata={
                        TaskFiles:res.data.taskFiles,
                        TaskTypeID:res.data.taskTypeID,
                        TaskName:res.data.taskName,
                        TaskSummary:res.data.taskSummary,
                        TaskNumber:res.data.taskNumber,
                        TaskOwner:res.data.taskOwner,
                        TaskOwnerPhone:res.data.taskOwnerPhone,
                        TaskOwnerName:res.data.taskOwnerName,
                        TaskFlows:res.data.taskFlows,
                        Fund:{
                            FundID:res.data.fund.fundID,
                            PlatformID:res.data.fund.platformID,//
                            FundName:res.data.fund.fundName,//
                            ShortName:res.data.fund.shortName,///
                            FundCode:res.data.fund.fundCode,//基金代码
                            CodsCode:res.data.fund.codsCode,//社会统一
                            RegSCode:res.data.fund.regSCode,//协会登记
                            RegType:res.data.fund.regType,//基金类型
                            Address:res.data.fund.address,//注册地址
                            RegDate:res.data.fund.regDate,//注册日期
                            OpenDate:res.data.fund.openDate,//成立日期
                            RecordDate:res.data.fund.recordDate,//备案日期
                            EndDate:res.data.fund.endDate,//终止日期
                            LiveStartDate:res.data.fund.liveStartDate,//存续开始日期
                            LiveEndDate:res.data.fund.liveEndDate,//存续结束日期
                            FundStatus:res.data.fund.fundStatus,
                            Invests:res.data.fund.invests
                        }
                    }                    
                }else{
                    this.$Message.error({
                        content:'数据加载失败:'+res.data.message
                    })
                }
            })
         },programListQuery(){
            programListQuery({ProjectStatus:2,USerID:JSON.parse(localStorage.getItem('userId'))}).then(res=>{
                if(res.data.code==2307){
                    res.data.projectList.forEach(element=>{
                       this.proNameList[element.projectID]=element.clientCode+'-'+element.projectType+'-'+element.projectRole
                    })
                }else{
                    this.$Message.error({
                        content:'投资对象数据加载失败：'+res.data.message
                    })
                }
            })

        },getAllFundList(){
            getAllFundList({FundStatus:1,USerID:JSON.parse(localStorage.getItem('userId'))}).then(res=>{
                if(res.data.code==2405){
                    res.data.fundList.forEach(element=>{
                        this.fundNameList[element.fundID]=element.shortName
                    })
                }else{
                    this.$Message.error({
                        content:'投资对象数据加载失败：'+res.data.message
                    })
                }
            })

        },
         getPlatform(){
            getPlatform({'PlatStatus':1,'USerID':JSON.parse(localStorage.getItem("userId"))}).then(res=>{
                if(res.data.code==2105){
                    
                    res.data.platList.forEach(element => {
                        this.platList[element.platformID]=element.shortName
                    });
                }else{
                     this.$Message.error({
                        content:"权属平台信息加载失败:"+res.data.message
                    })
                }
            })
        },
        easzyInput(val){
            this.FlowComment=val;
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
            this.$refs.uploadModal.showModal(true);
        }
    }
}
</script>