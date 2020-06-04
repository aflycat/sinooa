<template>
    <div class="pro_change">
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
        <Card  class="itemCard">
                <p slot="title">基金基本信息</p>
                <Form :label-width="110">
                    <Row>
                         <Col span="8">
                            <FormItem label="权属平台" >
                                <Select v-model="postdata.Fund.PlatformID"  filterable   placeholder="请选择权属平台">
                                    <Option v-for="(item,index) in platformList" :value="item.platformID.toString()" :key="index">{{ item.shortName }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="基金全称">
                                <Input v-model="postdata.Fund.FundName" placeholder="请输入基金全称"></Input>
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="基金简称">
                                <Input v-model="postdata.Fund.ShortName" placeholder="请输入基金简称"></Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="基金类型">
                               <Select v-model="postdata.Fund.RegType"  filterable   placeholder="请选择基金类型">
                                    <Option  value="类型1" >类型1</Option>
                                   <Option   value="类型2" >类型2</Option>
                                   <Option   value="类型3" >类型3</Option>
                                   <Option   value="类型4" >类型4</Option>
                                </Select>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="注册地址" prop="ClientOpenDate">
                                 <Input v-model="postdata.Fund.Address" placeholder="请输入注册地址"></Input>
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="注册日期" prop="ClientOpenDate">
                                 <DatePicker :value='postdata.Fund.RegDate' @on-change="setDate('RegDate',$event)" type="date" placeholder="请选择成立日期" style="width: 100%;"></DatePicker>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="成立日期" prop="ClientOpenDate">
                                 <DatePicker :value='postdata.Fund.OpenDate'  @on-change="setDate('OpenDate',$event)" type="date" placeholder="请选择成立日期" style="width: 100%;"></DatePicker>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="备案日期" prop="ClientOpenDate">
                                 <DatePicker :value='postdata.Fund.RecordDate'  @on-change="setDate('RecordDate',$event)" type="date" placeholder="请选择成立日期" style="width: 100%;"></DatePicker>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="终止日期" prop="ClientOpenDate">
                                 <DatePicker :value='postdata.Fund.EndDate'  @on-change="setDate('EndDate',$event)" type="date" placeholder="请选择终止日期" style="width: 100%;"></DatePicker>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="基金代码" >
                                <Input disabled v-model="postdata.Fund.FundCode" placeholder="请输入基金代码"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="协会登记编码" >
                                <Input v-model="postdata.Fund.RegSCode" placeholder="请输入协会登记编码"></Input>
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="社会统一代码" >
                                <Input v-model="postdata.Fund.CodsCode" placeholder="请输入社会统一代码"></Input>
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
                                <FormItem label="存续开始" prop="ClientOpenDate">
                                    <DatePicker :value='postdata.Fund.LiveStartDate'  @on-change="setDate('LiveStartDate',$event)" type="date" placeholder="请选择成立日期" style="width: 100%;"></DatePicker>
                                </FormItem>  
                             </Col>
                             <Col span="8">
                                <FormItem label="存续结束" prop="ClientOpenDate">
                                    <DatePicker :value='postdata.Fund.LiveEndDate'  @on-change="setDate('LiveEndDate',$event)" type="date" placeholder="请选择成立日期" style="width: 100%;"></DatePicker>
                                </FormItem>  
                             </Col>
                         </Row>
                     </Form>
                    
                <Table :columns="progress" :data="progressData">
                    <template slot-scope="{row,index}" slot="action">
                        <span  @click="showEdict(-1,index,row)" style="margin-right:5px;color:#3498db;cursor:pointer;">编辑</span>
                        <span  @click="processDelete(index)" style="margin-right:5px;color:#ed4014;cursor:pointer;">删除</span>
                    </template>
                </Table>    
                 <Button style="margin-top:15px;" type="primary" @click="showEdict(1,0,'')" >添加存续期限</Button>

            </Card>  
            <Card  class="itemCard">
                <p slot="title">基金成员信息</p>
                 <Form :label-width="150">
                    <Card  v-for="(item,index) in postdata.Fund.Members" :key='index' style="margin-bottom:15px;">
                        <Row>
                            <Col span="8">
                                <FormItem label="成员类型" >
                                    <Select v-model="item.MemberType"  filterable   placeholder="请选择基金类型">
                                        <Option  :value="31">内部管理人</Option>
                                        <Option  :value="32">外部管理人</Option>
                                        <Option  :value="33">托管人</Option>
                                        <Option  :value="34">投资顾问</Option>
                                        <Option  :value="35">内部机构投资人</Option>
                                        <Option  :value="36">外部机构投资人</Option>
                                        <Option  :value="37">自然人投资人</Option>
                                        <Option  :value="38">基金产品投资人</Option>
                                        <Option  :value="39">基金经理</Option>
                                        <Option  :value="40">基金主办</Option>
                                        <Option  :value="41">基金成员</Option>
                                        <Option  :value="42">基金投决会</Option>
                                    </Select>
                                </FormItem>  
                            </Col>
                             <Col span="8">
                                <FormItem label="成员名字" >
                                    <Select filterable v-model='item.MemberID' label-in-value @on-change='setFundMemName(index,$event)' placeholder="请选择成员名字">
                                        <Option v-for="item in MemberList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>  
                            </Col>
                             <Col span="8">
                                <FormItem label="投资人类型" >
                                    <Select v-model="item.InvestorType"  filterable   placeholder="请选择基金类型">
                                        <Option   value="自然人(非员工跟投)" >自然人（非员工跟投）</Option>
                                        <Option   value="自然人(员工跟投)" >自然人（员工跟投）</Option>
                                        <Option   value="境内法人机构(公司等)" >境内法人机构(公司等)</Option>
                                        <Option   value="境内非法人机构(一般合伙企业等)" >境内非法人机构(一般合伙企业等)</Option>
                                         <Option  value="本产品管理人跟投" >本产品管理人跟投</Option>
                                        <Option   value="私募基金产品" >私募基金产品</Option>
                                        <Option   value="证券公司及其子公司资产管理计划" >证券公司及其子公司资产管理计划</Option>
                                        <Option   value="基金公司及其子公司资产管理计划" >基金公司及其子公司资产管理计划</Option>
                                         <Option  value="期货公司及其子公司资产管理计划" >期货公司及其子公司资产管理计划</Option>
                                        <Option   value="信托计划" >信托计划</Option>
                                        <Option   value="商业银行理财产品" >商业银行理财产品</Option>
                                        <Option   value="保险资产管理计划" >保险资产管理计划</Option>
                                         <Option  value="慈善基金、捐赠基金等社会公益基金" >慈善基金、捐赠基金等社会公益基金</Option>
                                        <Option   value="养老基金" >养老基金</Option>
                                        <Option   value="社会保障基金" >社会保障基金</Option>
                                        <Option   value="企业年金" >企业年金</Option>
                                         <Option  value="政府类引导基金" >政府类引导基金</Option>
                                        <Option   value="财政直接出资" >财政直接出资</Option>
                                        <Option   value="境外资金(QFII、RQFII等)" >境外资金（QFII、RQFII等）</Option>
                                        <Option   value="境外机构" >境外机构</Option>
                                    </Select>
                                </FormItem>  
                            </Col>
                             <Col span="8">
                                <FormItem label="认缴金额">
                                    <Input v-model="item.OrderMoney"  placeholder="请输入认缴金额"></Input>

                                </FormItem>  
                            </Col>
                             <Col span="8">
                                <FormItem label="实缴金额" >
                                <Input v-model="item.PaidMoney" placeholder="请输实缴金额"></Input>

                                </FormItem>  
                            </Col>
                             <Col span="8">
                                <FormItem label="份额类型" >
                                     <Select v-model="item.ShareType"  filterable   placeholder="请选择份额类型">
                                        <Option  value="优先级">优先级</Option>
                                        <Option  value="劣后级">劣后级</Option>
                                        <Option  value="无分级">无分级</Option>
                                    </Select>
                                </FormItem>  
                            </Col>
                             <Col span="8">
                                <FormItem label="管理费计提标准" >
                                <Input v-model="item.ManageFeeRate" placeholder="请输入管理费计提标准"></Input>

                                </FormItem>  
                            </Col>
                             <Col span="8">
                                <FormItem label="业绩报酬计提标准" >
                                    <Input v-model="item.RewardRate" placeholder="请输入业绩报酬计提标准"></Input>

                                </FormItem>  
                            </Col>
                            <Col span="8">
                               <Button  type="error" ghost style="border:none 0;" @click="deleteFundMember(index)">删除</Button>
                            </Col>
                            
                        </Row>
                    </Card>
                    <Button style="margin-top:15px;" type="primary" @click="addNewFundMember">新增</Button>
                 </Form>
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
        <upload-files ref="uploadModal"  @handleUploadFileEvent="handleUploadEvent"></upload-files>

    </div>
</template>
<script>
// tips
//如果有变更基金信息无修改设置为0，若修改保持不变

import {getDealTaskDetailFund,getPlatform,getuserList} from "@/api/data"
import UploadFiles from "@/view/components/upload_file/upload_file"
import {toUpperCase,orderObj} from "@/libs/tools"
export default {
    components:{
        UploadFiles,
    },
    props:{
        taskID:String,
        taskFlowID:String,
        taskTypeID:String
    },
    mounted(){
        this.getuserList();
        this.getPlatform();
        this.getDealTaskDetailFund()
        // this.getAllFundList();
    },
    data(){
        return{
            loading:false,
            loading2:false,
             fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
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
            processModal:false,
             ScheduleID:'',
            ScheduleName:'',
            Summary:'',
            EstStartDate:'',
            EstEndDate:'',
            RealStartDate:'',
            RealEndDate:'',
            progressData:[],
            platformList:[],
            MemberList:[],
            standPost:{

            },
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
                    TaskTypeID:'',//任务类别ID，与TaskTypes表的TaskTypeID对应（开发3/立项4/变动5），取自对应的菜单项
                    TaskName:'',//任务名（UI中的请示事项要点）
                    TaskSummary:'',//任务概要（UI中的请示事项具体内容）
                    TaskOwner:'',//任务申请人ID，与User表的UserID对应，取自当前登录用户
                    Fund:{
                        FundID:0,
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
                   
            }
        }
    },

    methods:{
        handleSubmitAgree(){
            var obj={
                // TaskTypeID:this.taskTypeID,
                TaskName: this.standPost.taskName,//任务名（UI中的请示事项要点）
                TaskSummary: this.standPost.taskSummary,//任务概要（UI中的请示事项具体内容）
                TaskNumber: this.standPost.taskNumber,
                TaskOwnerName: this.standPost.taskOwnerName,
                TaskOwnerPhone: this.standPost.taskOwnerPhone,
                TaskOwner: this.standPost.taskOwner,//
            }
            if(!(JSON.stringify(this.postUnchange)==JSON.stringify(obj))){
                 alert('普通信息有修改')
            }
            

            this.postdata.Fund.Schedules=this.progressData;//设置进程

            var standFun=JSON.stringify(orderObj(this.standPost.Fund)),
                postFund=JSON.stringify(orderObj(this.postdata.Fund))
            if(!(standFun==postFund)){
                 alert('基金信息有修改')

            }else{
                this.postdata.Fund.FundID=0
            }    

            console.log(this.postdata);

            


          



        },
        handleSubmitDisgree(){

        },
        getDealTaskDetailFund(){
            getDealTaskDetailFund({TaskID:this.taskID}).then(res=>{
                if(res.data.code==2403){
                    this.standPost.Fund=toUpperCase(res.data.fund)
                    // this.standPost.['taskTypeID']= this.taskTypeID
                    this.standPost['taskName']=res.data.taskName;
                    this.standPost['taskSummary']=res.data.taskSummary;
                    this.standPost['taskNumber']=res.data.taskNumber;
                    this.standPost['taskOwnerName']=res.data.taskOwnerName;
                    this.standPost['taskOwnerPhone']=res.data.taskOwnerPhone;
                    this.standPost['taskOwner']=res.data.taskOwner;
                    this.postUnchange={
                        TaskName:res.data.taskName,//任务名（UI中的请示事项要点）
                        TaskSummary:res.data.taskSummary,//任务概要（UI中的请示事项具体内容）
                        TaskNumber:res.data.taskNumber,
                        TaskOwnerName:res.data.taskOwnerName,
                        TaskOwnerPhone:res.data.taskOwnerPhone,
                        TaskOwner:res.data.taskOwner,//任务申请人ID，与User表的UserID对应，取自当前登录用户
                    }
                    this.postdata.Fund=toUpperCase(res.data.fund);
                    this.postdata.taskFlows=toUpperCase(res.data.taskFlows);

                    this.postdata.taskFiles=toUpperCase(res.data.taskFiles);

                    this.loadMembers(res.data.fund.members);
                    this.loadProcess(res.data.fund.schedules)
                }else{
                    this.$Message.error({
                        content:'数据加载失败：'+res.data.message
                    })
                }
            })
        },
        loadMembers(dat){
            this.postdata.Fund.Members=[];
            dat.forEach(element=>{
                this.postdata.Fund.Members.push({
                    ID:0,
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
            this.standPost.Fund.Members=this.postdata.Fund.Members

        },
        loadProcess(dat){
            this.progressData=[];
            dat.forEach(element=>{
                this.progressData.push({
                    ID:0,
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
            this.standPost.Fund.Schedules= this.progressData
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
        addNewFundMember(){
            this.postdata.Fund.Members.push({
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
        }, deleteFundMember(index){
             this.$Modal.confirm({
                 title:'删除',
                 content:'是否删除：'+this.postdata.Fund.Members[index].MemberName+'?',
                 onOk:()=>{
                     this.postdata.Fund.Members.splice(index,1)
                 }
             })
         },
          showEdict(type,index,row){
                this.processModal=true;
                // this.FundID=this.postdata.Fund.FundID;
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
            },
            setFundMemName(index,dat){
                this.postdata.Fund.Members[index].MemberName=dat.label;
            },
         setProcess(){
                if(this.processDeal){
                    //新增
                    this.progressData.push({
                        ScheduleID:this.ScheduleID,
                        FundID:this.postdata.Fund.FundID,
                        ScheduleName:this.ScheduleName,
                        Summary:this.Summary,
                        EstStartDate:this.EstStartDate,
                        EstEndDate:this.EstEndDate,
                        ID:0,
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
                    this.progressData[this.edictProcessIndex].FundID=this.postdata.Fund.FundID;
                    this.progressData[this.edictProcessIndex].ID=0;
                    this.progressData[this.edictProcessIndex].RealStartDate=this.RealStartDate;
                    this.progressData[this.edictProcessIndex].RealEndDate=this.RealEndDate;
                    this.progressData[this.edictProcessIndex].Status=1;

                }
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