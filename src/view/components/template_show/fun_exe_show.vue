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
                    <Col span="24" v-if="postdata.TaskFiles.length>0" >
                        <FormItem label="报送文件：" >
                            <p  v-for="(item,index) in postdata.TaskFiles" :key='index'>
                                <a :href="'http://120.78.154.66:8089/taskfiles/'+item.dateFolder+'/'+item.fileName" target="_blank" style="color:#2d8cf0;">
                                   {{item.fileNumber}}&nbsp;&nbsp; {{item.oldFileName}}
                                </a> 
                                 <Button style="color:#ed4014;" type="text" @click="deleteOriginFile(item.taskFileID,item.oldFileName,index)">删除</Button>
                            </p>
                        </FormItem>
                    </Col>
                </Row>
                 </Form>    
        </Card>
        <Card  class="itemCard">
                <p slot="title">基金基本信息</p>
                <Form :label-width="110">
                    <Row>
                         <Col span="8">
                            <FormItem label="权属平台:" >
                                <b> {{platList[postdata.Fund.PlatformID]}} </b>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="基金全称:">
                                 <b>{{postdata.Fund.FundName}} </b>
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="基金简称:">
                                 <b>{{postdata.Fund.ShortName}} </b>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="基金类型:">
                                <b> {{postdata.Fund.RegType}} </b>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="注册地址:" prop="ClientOpenDate">
                                 <b>{{postdata.Fund.Address}} </b>
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="注册日期:" prop="ClientOpenDate">
                                 <b>{{postdata.Fund.RegDate.substr(0,10)}} </b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="成立日期:" prop="ClientOpenDate">
                                 <b>{{postdata.Fund.OpenDate.substr(0,10)}} </b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="备案日期:" prop="ClientOpenDate">
                                 <b>{{postdata.Fund.RecordDate.substr(0,10)}} </b>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="终止日期:" prop="ClientOpenDate">
                                <b> {{postdata.Fund.EndDate.substr(0,10)}} </b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="基金代码:" >
                                <b> {{postdata.Fund.FundCode}} </b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="协会登记编码:" >
                                <b> {{postdata.Fund.RegSCode}} </b>
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="社会统一代码:" >
                                <b> {{postdata.Fund.CodsCode}} </b>
                            </FormItem>   
                        </Col>
                    </Row>

                </Form>
            </Card>
             <Card  class="itemCard">
                <p slot="title">基金存续期限</p>
                     <Form :label-width="100">
                        <Row>
                            <Col span="8">
                                <FormItem label="存续开始:" >
                                     <b>{{postdata.Fund.LiveStartDate.substr(0,10)}} </b>
                                </FormItem>  
                             </Col>
                             <Col span="8">
                                <FormItem label="存续结束:" >
                                     <b>{{postdata.Fund.LiveEndDate.substr(0,10)}} </b>
                                </FormItem>  
                             </Col>
                         </Row>
                     </Form>
                    
                <Table :columns="progress" :data="progressData"> </Table>    
            </Card>  
            <Card  class="itemCard">
                <p slot="title">基金成员信息</p>
                 <Form :label-width="150">
                    <Card  v-for="(item,index) in postdata.Members" :key='index' style="margin-bottom:15px;">
                        <Row>
                            <Col span="8">
                                <FormItem label="成员类型:" >
                                  <b>{{MemberType[item.MemberType]}} </b>
                                </FormItem>  
                            </Col>
                             <Col span="8">
                                <FormItem label="成员名字:" >
                                    <b> {{item.MemberName}} </b>
                                </FormItem>  
                            </Col>
                             <Col span="8">
                                <FormItem label="投资人类型:" >
                                    <b> {{item.InvestorType}} </b>
                                </FormItem>  
                            </Col>
                             <Col span="8">
                                <FormItem label="认缴金额:">
                                    <b> {{item.OrderMoney}} </b>
                                </FormItem>  
                            </Col>
                             <Col span="8">
                                <FormItem label="实缴金额:" >
                                     <b>{{item.PaidMoney}} </b>
                                </FormItem>  
                            </Col>
                             <Col span="8">
                                <FormItem label="份额类型:" >
                                     <b>{{item.ShareType}} </b>
                                   
                                </FormItem>  
                            </Col>
                             <Col span="8">
                                <FormItem label="管理费计提标准:" >
                                     <b>{{item.ManageFeeRate}} </b>
                                </FormItem>  
                            </Col>
                             <Col span="8">
                                <FormItem label="业绩报酬计提标准:" >
                                     <b>{{item.RewardRate}} </b>
                                </FormItem>  
                            </Col>
                           
                        </Row>
                    </Card>
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
        <upload-files ref="uploadModal"  @handleUploadFileEvent="handleUploadEvent"></upload-files>

    </div>
</template>
<script>
import UploadFiles from "@/view/components/upload_file/upload_file"
import returnStep from "@/view/components/template/return_step"
import {getDealTaskDetailFund,getPlatform} from "@/api/data"
export default {
    components:{
UploadFiles
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
            postdata:{
                TaskFiles:[],
                TaskNumber:'',
                TaskFlows:[],
            },
             platList:[],
            progress:[
                {title:'序号',key:'ScheduleID',width:100},
                {title:'进度名',key:'ScheduleName'},
                {title:'预计开始时间',key:'EstStartDate'},
                {title:'预计结束时间',key:'EstEndDate'},
                {title:'实际开始时间',key:'RealStartDate'},
                {title:'实际结束时间',key:'RealEndDate'},
                {title:'说明',key:'Summary'},
               
            ],
             MemberType:{
                31:'内部管理人',
                32:'外部管理人',
                33:'托管人',
                34:'投资顾问',
                35:'内部机构投资人',
                36:'外部机构投资人',
                37:'自然人投资人',
                38:'基金产品投资人',
                39:'基金经理',
                40:'基金主办',
                41:'基金成员',
                42:'基金投决会',
            },
        }
    },
    mounted(){
        this.getDealTaskDetailFund();
        this.getPlatform();
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
                            FundStatus:1
                        }
                        

                    }
                    this.loadMembers(res.data.fund.members);
                    this.loadProcess(res.data.fund.schedules)
                }else{
                    this.$Message.error({
                        content:'数据加载失败:'+res.data.message
                    })
                }
            })
        },
         loadMembers(dat){
            this.postdata.Members=[];
            dat.forEach(element=>{
                this.postdata.Members.push({
                    ID:element.id,
                    FundID:element.fundID,
                    MemberID:element.memberID,
                    MemberName:element.memberName,
                    MemberType:element.memberType,
                    InvestorType:element.investorType,
                    OrderMoney:element.orderMoney,
                    PaidMoney:element.paidMoney,
                    ShareType:element.shareType,
                    ManageFeeRate:element.manageFeeRate,
                    RewardRate:element.rewardRate,
                    Status:element.status
                })
            })
        },
        loadProcess(dat){
            this.progressData=[];
            dat.forEach(element=>{
                this.progressData.push({
                    ID:element.id,
                    FundID:element.fundID,
                    ScheduleID:element.scheduleID,
                    ScheduleName:element.scheduleName,
                    Summary:element.summary,
                    EstStartDate:element.estStartDate.substr(0,10),
                    EstEndDate:element.estEndDate.substr(0,10),
                    RealStartDate:element.realStartDate.substr(0,10),
                    RealEndDate:element.realEndDate.substr(0,10),
                    Status:element.status,
                })
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
        loadMember(dat){
            dat.forEach(element => {
                this.memberData.push({
                    kind:platformMemberType[element.memberType],
                    name:element.memberName,
                    scale:element.shareRate,
                    money:element.subscription,
                    nature:paltformMemberStatus[element.status] 
                })
            });
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
        },showReturnModal(){
            this.$refs['stepModal'].showModal(true)
        }
    }
}
</script>