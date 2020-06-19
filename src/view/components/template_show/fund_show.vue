<template>
    <div class="fund_show">
        <approval-header :TaskNumber='postdata.TaskNumber' :TaskName='postdata.TaskName' :TaskOwnerName='postdata.TaskOwnerName' :TaskOwnerPhone='postdata.TaskOwnerPhone' :TaskSummary='postdata.TaskSummary'></approval-header>

           
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
                                 <b>{{ postdata.Fund.FundName}}</b>
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="基金简称：">
                                <b>{{ postdata.Fund.ShortName}}</b>
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
                                 <FormItem v-if='item.MemberType==37||item.MemberType==39||item.MemberType==40||item.MemberType==41||item.MemberType==42'   label="成员名字:" >
                                    <b> {{item.MemberName}} </b>
                                </FormItem>  
                                
                                <FormItem v-if='item.MemberType==32||item.MemberType==33||item.MemberType==34||item.MemberType==36' label="平台简称:" >
                                     <b> {{item.MemberName}} </b>
                                </FormItem>  
                                <FormItem v-if='item.MemberType==31||item.MemberType==35' label="客户代码:" >
                                     <b> {{item.MemberName}} </b>
                                </FormItem>  
                                  <FormItem v-if='item.MemberType==38' label="基金简称:" >
                                    <b> {{item.MemberName}} </b>
                                </FormItem>  
                            </Col>
                             <Col span="8">
                                <FormItem label="投资人类型：" >
                                   <b> {{InvestorType[item.InvestorType]}} </b>
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
            <task-file :fileList='postdata.TaskFiles' :flowRequire='flowRequire'></task-file>
            <task-flows :taskFlows='postdata.TaskFlows' :taskFlowID='taskFlowID'></task-flows>
            <approval-button  v-if='flowRequire<=1100' :TaskID='taskID'  :TaskFlowID='taskFlowID' :flowRequire='flowRequire' :taskFlows='postdata.TaskFlows'></approval-button>

         

    </div>
</template>
<script>
import {TaskTypeID} from "@/libs/data"
import {getPlatform,getuserList,addNewFundTask,getDealTaskDetailFund} from "@/api/data"
import taskFile from "@/view/components/template/task_file_show"
import taskFlows from "@/view/components/template/approval_process"
import approvalButton from "@/view/components/template/approval_button"
import approvalHeader from "@/view/components/template/approval_header"

export default {
     components:{
        taskFile,taskFlows,approvalButton,approvalHeader
    },
    props:{
        taskID:String,
        taskFlowID:String,
        flowRequire:String
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
             InvestorType:{
                "1":'自然人（非员工跟投）',
                "2":'自然人（员工跟投）',
                "3":'境内法人机构(公司等)',
                "4":'境内非法人机构(一般合伙企业等)',
                "5":'本产品管理人跟投',
                "6":'私募基金产品',
                "7":'证券公司及其子公司资产管理计划',
                "8":'基金公司及其子公司资产管理计划',
                "9":'期货公司及其子公司资产管理计划',
                "10":'信托计划',
                "11":'商业银行理财产品',
                "12":'保险资产管理计划',
                "13":'慈善基金、捐赠基金等社会公益基金',
                "14":'养老基金',
                "15":'社会保障基金',
                "16":'企业年金',
                "17":'政府类引导基金',
                "18":'财政直接出资',
                "19":'境外资金（QFII、RQFII等）',
                "20":'境外机构'

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
