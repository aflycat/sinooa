<template>
    <div class="fund_show">
        <Card  class="itemCard">
            <p slot="title">任务明细</p>
            <Form :label-width="80">
                <Row>
                     <Col span="24">
                        <FormItem label="任务编号：">
                            <b> {{postdata.TaskNumber}}</b>
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
                           <b> {{postdata.TaskSummary}}</b>
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
                <p slot="title">基金基本信息</p>
                <Form :label-width="120">
                    <Row>
                        <Col span="8">
                            <FormItem label="权属平台：" >
                                <b> {{platformList[postdata.Fund.PlatformID]}}</b>

                              
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="基金全称：">
                                 <b>{{ postdata.TaskOwnerPhone}}</b>
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="基金简称：">
                                <b>{{ postdata.TaskOwnerPhone}}</b>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="基金类型：">
                                {{postdata.Fund.RegType}}
                              
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="注册地址：" prop="ClientOpenDate">
                                <b>{{ postdata.Fund.Address}}</b>
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="注册日期：" prop="ClientOpenDate">
                                <b>{{ postdata.Fund.RegDate.substr(0,10)}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="成立日期：" prop="ClientOpenDate">
                                
                                <b>{{ postdata.Fund.OpenDate.substr(0,10)}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="备案日期：" prop="ClientOpenDate">
                                 <b>{{ postdata.Fund.RecordDate.substr(0,10)}}</b>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="终止日期：" prop="ClientOpenDate">
                                <b>{{ postdata.Fund.EndDate.substr(0,10)}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="基金代码：" >
                                <b>{{ postdata.Fund.FundCode}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="协会登记编码：" >
                                <b>{{ postdata.Fund.RegSCode}}</b>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="社会统一代码：" >
                                 <b>{{ postdata.Fund.CodsCode}}</b>
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
                                <FormItem label="存续开始：" prop="ClientOpenDate">
                                    <b>{{ postdata.Fund.LiveStartDate.substr(0,10)}}</b>
                                </FormItem>  
                             </Col>
                             <Col span="8">
                                <FormItem label="存续结束：" prop="ClientOpenDate">
                                     <b>{{ postdata.Fund.LiveEndDate.substr(0,10)}}</b>
                                </FormItem>  
                             </Col>
                         </Row>
                     </Form>
                    
                <Table :columns="progress" :data="progressData"></Table>    
            </Card>  
            <Card  class="itemCard">
                <p slot="title">基金成员信息</p>
                 <Form :label-width="150">
                    <Card  v-for="(item,index) in postdata.Members" :key='index' style="margin-bottom:15px;">
                        <Row>
                            <Col span="8">
                                <FormItem label="成员类型：" >
                                    {{memTypyList[item.MemberType]}}
                                </FormItem>  
                            </Col>
                             <Col span="8">
                                <FormItem label="成员名字：" >
                                     <b>{{item.MemberName}}</b>
                                </FormItem>  
                            </Col>
                             <Col span="8">
                                <FormItem label="投资人类型：" >
                                    <b>{{item.InvestorType}}</b>
                                </FormItem>  
                            </Col>
                             <Col span="8">
                                <FormItem label="认缴金额：">
                                    <b>{{item.OrderMoney}}</b>
                                </FormItem>  
                            </Col>
                             <Col span="8">
                                <FormItem label="实缴金额：" >
                                    <b>{{item.PaidMoney}}</b>
                                </FormItem>  
                            </Col>
                             <Col span="8">
                                <FormItem label="份额类型：" >
                                    <b>{{item.ShareType}}</b>
                                    
                                </FormItem>  
                            </Col>
                             <Col span="8">
                                <FormItem label="管理费计提标准：" >
                                    <b>{{item.ManageFeeRate}}</b>
                                </FormItem>  
                            </Col>
                             <Col span="8">
                                <FormItem label="业绩报酬计提标准：" >
                                    <b>{{item.RewardRate}}</b>
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
                            <Button @click="showReturnModal"   style="margin-right: 8px" type="warning">修改</Button>  
                          
                        <Button :loading="loading2" @click="handleSubmitDisgree()"  style="margin-right: 8px" type="error">
                            <span v-if="!loading">不同意</span>
                            <span v-else>提交中...</span>
                        </Button>                    

                    </FormItem>
                </Form>   

            </Card>
         
        <upload-files ref="uploadModal"  @handleUploadFileEvent="handleUploadEvent"></upload-files>

    </div>
</template>
<script>
import UploadFiles from "@/view/components/upload_file/upload_file"
import {TaskTypeID} from "@/libs/data"
import {getPlatform,getuserList,addNewFundTask,getDealTaskDetailFund} from "@/api/data"
export default {
     components:{
        UploadFiles,
    },
    props:{
        taskID:String,
        taskFlowID:String,
    },
    data(){
        return{
            loading:false,
            loading2:false,
            name:'',
            phone:'',
            ScheduleID:'',
            ScheduleName:'',
            platformList:{},
            Summary:'',
            EstStartDate:'',
            EstEndDate:'',
            RealStartDate:'',
            RealEndDate:'',
            processModal:false,
            edictProcessIndex:0,
            FlowComment:'',
            memTypyList:{
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
                42:'基金投决会'

            },
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
            platformList:[],
            limitData:[],
            MemberList:[],
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
            
            postdata:{
                    TaskTypeID:TaskTypeID.fundDevelop,//任务类别ID，与TaskTypes表的TaskTypeID对应（开发3/立项4/变动5），取自对应的菜单项
                    TaskName:'',//任务名（UI中的请示事项要点）
                    TaskSummary:'',//任务概要（UI中的请示事项具体内容）
                    TaskOwner:'',//任务申请人ID，与User表的UserID对应，取自当前登录用户
                    TaskFlows:[],
                    TaskFiles:[],
                    Fund:{
                        FundID:'',
                        PlatformID:'',//
                        FundName:'',//
                        ShortName:'',///
                        FundCode:'',//基金代码
                        CodsCode:'',//社会统一
                        RegSCode:'',//协会登记
                        RegType:'',//基金类型
                        Address:'',//注册地址
                        RegDate:'',//注册日期
                        OpenDate:'',//成立日期
                        RecordDate:'',//备案日期
                        EndDate:'',//终止日期
                        LiveStartDate:'',//存续开始日期
                        LiveEndDate:'',//存续结束日期
                        FundStatus:1
                    },
                    Members:[],
                    Schedules:[]
            }
        }
    },
    mounted(){
        this.name=JSON.parse(localStorage.getItem('userName'));
        this.postdata.TaskOwner=JSON.parse(localStorage.getItem('userId'));
        this.phone=JSON.parse(localStorage.getItem('phone'))
        this.getuserList();
        this.getPlatform();
        this.getDealTaskDetailFund();
    },
    methods:{
      
        getDealTaskDetailFund(){
            getDealTaskDetailFund({TaskID:this.taskID}).then(res=>{
                if(res.data.code==2403){
                    this.postdata={
                        TaskID:res.data.taskID,
                        TaskName:res.data.taskName,
                        TaskSummary:res.data.taskSummary,
                        TaskNumber:res.data.taskNumber,
                        TaskOwnerName:res.data.taskOwnerName,
                        TaskOwnerPhone:res.data.taskOwnerPhone,
                        TaskFlowID:this.taskFlowID,
                        FlowComment:'',
                        TaskFlows:res.data.taskFlows,
                        TaskFiles:res.data.taskFiles,
                        Fund:{
                            FundID:res.data.taskTypeID==TaskTypeID.fundChanges?res.data.taskTypeID:0,
                            PlatformID:res.data.fund.platformID,
                            FundName:res.data.fund.fundName,
                            ShortName:res.data.fund.shortName,
                            FundCode:res.data.fund.fundCode,
                            CodsCode:res.data.fund.codsCode,
                            RegSCode:res.data.fund.regSCode,
                            RegType:res.data.fund.regType,
                            Address:res.data.fund.address,
                            RegDate:res.data.fund.regDate,
                            OpenDate:res.data.fund.openDate,
                            RecordDate:res.data.fund.recordDate,
                            EndDate:res.data.fund.endDate,
                            LiveStartDate:res.data.fund.liveStartDate,
                            LiveEndDate:res.data.fund.liveEndDate,
                            FundStatus:res.data.fund.fundStatus,
                            Members:[],
                            Schedules:[]
                        },
                        Members:[],
                        Schedules:[]                       
                    }

                    this.loadMembers(res.data.fund.members);
                    this.loadProcess(res.data.fund.schedules)

                }else{
                    this.$Message.error({
                        content:'任务详情获取失败:'+res.data.message
                    })
                }
            })

        },
        loadMembers(dat){
            this.postdata.Members=[];
            dat.forEach(element=>{
                this.postdata.Members.push({
                    ID:0,
                    FundID:this.postdata.Fund.FundID,
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
                    ID:0,
                    FundID:this.postdata.Fund.FundID,
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
        handleSubmit(){
           
            this.postdata.Fund.Members=this.postdata.Members;
            this.postdata.Fund.Schedules=this.progressData;
            console.log(this.postdata);


        },
         setFundMemName(index,dat){
            this.postdata.Members[index].MemberName=dat.label;
        },
        addNewFundMember(){
            this.postdata.Members.push({
                ID:0,
                FundID:this.postdata.Fund.FundID,
                MemberID:'',
                MemberName:'',
                MemberType:'',
                InvestorType:'',
                OrderMoney:'',
                PaidMoney:'',
                ShareType:'',
                ManageFeeRate:'',
                RewardRate:'',
                Status:1
            })
         },
         deleteFundMember(index){
             this.$Modal.confirm({
                 title:'删除',
                 content:'是否删除：'+this.postdata.Members[index].MemberName+'?',
                 onOk:()=>{
                     this.postdata.Members.splice(index,1)
                 }
             })
         },
         getPlatform(){
            getPlatform({'PlatStatus':1,'USerID':JSON.parse(localStorage.getItem("userId"))}).then(res=>{
                if(res.data.code==2105){
                    res.data.platList.forEach(element=>{
                        this.platformList[element.platformID]=element.shortName
                    })
                    
                }else{
                     this.$Message.error({
                        content:"权属平台信息加载失败:"+res.data.message
                    })
                }
            })
        },
         getuserList(){
            getuserList({"PageIndex":1,"PageSize":1000}).then(res=>{
                if(res.data.code==0){
                    res.data.userList.forEach(element => {
                        this.MemberList.push({
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
            },setProcess(){
                if(this.processDeal){
                    //新增
                    this.progressData.push({
                        ScheduleID:this.ScheduleID,
                        ScheduleName:this.ScheduleName,
                        Summary:this.Summary,
                        EstStartDate:this.EstStartDate,
                        EstEndDate:this.EstEndDate,
                        ID:0,
                        FundID:this.postdata.Fund.FundID,
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
                    this.progressData[this.edictProcessIndex].FundID=this.postdata.Fund.FundID;
                    this.progressData[this.edictProcessIndex].RealStartDate=this.RealStartDate;
                    this.progressData[this.edictProcessIndex].RealEndDate=this.RealEndDate;
                     this.progressData[this.edictProcessIndex].Status=this.Status;

                }
            },
            processDelete(index){
                // this.postdata.Project.Schedules
                 this.$Modal.confirm({
                    title:"删除",
                    content:"是否删除该进度:"+this.progressData[index]["ScheduleName"]+"?",
                    onOk:()=>{
                        // this.postdata.Project.Schedules.splice(index,1);
                        this.progressData.splice(index,1);
                    }
                })
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
        setDate(key,val){
            // console.log(key,val)
            this.postdata.Fund[key]=val
        }, easzyInput(val){
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
            //显示modal
            this.$refs["uploadModal"].showModal(true);
        }
    }
}
</script>
