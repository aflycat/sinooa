<template>
    <div class="pro_change">
         <Card class="itemCard">
                <p slot="title">报送人信息</p>
                <Form :label-width="80">
                    <Row>
                        <Col span="8">
                            <FormItem label="报送人：" prop="name">
                                  <b> {{postdata.TaskOwnerName}}</b>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="联系电话：" prop="phone">
                                <b> {{postdata.TaskOwnerPhone}} </b>
                            </FormItem>   
                        </Col>
                    </Row>
                   
                </Form>
            </Card>
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
             <Form :label-width="120">
                    <Row>
                        <Col span="8">                       
                            <FormItem label="已投阶段：">
                                 <b> {{FundInvest.InvestWay}}</b>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="投资方式：">
                                  <b> {{FundInvest.TargetType==1?'投资于项目':'投资于基金'}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="投资日期：" >
                                  <b> {{FundInvest.InvestDate.substr(0,10)}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="持股比例：" >
                                  <b> {{FundInvest.ShareRate}}%</b>
                            </FormItem>   
                        </Col>
                       
                        <Col span="8">
                            <FormItem label="持资认缴资本总额：" >
                                  <b> {{FundInvest.OrderMoney}}万元</b>
                            </FormItem>   
                        </Col>
                        <Col span="8" >
                            <FormItem label="已投资总额：" >
                                  <b> {{FundInvest.PaidMoney}}万元</b>
                            </FormItem>   
                        </Col>
                    </Row>
             </Form>
        </Card>
         <Card  class="itemCard">
            <p slot="title">退出信息</p>
             <Form :label-width="120">
                    <Row>
                           <Col span="8">
                            <FormItem label="退出方式">
                               <!-- <Select v-model='postdata.FundInvestExit.ExitWay'  filterable   placeholder="请选择退出方式">
                                    <Option   value="境内上市" >境内上市</Option>
                                    <Option   value="境外上市" >境外上市</Option>
                                    <Option   value="新三板挂牌" >新三板挂牌</Option>
                                    <Option   value="协议转让" >协议转让</Option>
                                    <Option   value="整体收购" >整体收购</Option>
                                    <Option   value="企业回购" >企业回购</Option>
                                    <Option   value="清算" >清算</Option>
                                    <Option   value="融资人还款" >融资人还款</Option>
                                    <Option   value="被投企业分红" >被投企业分红</Option>
                                </Select> -->
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem  label="退出日期">
                                 <!-- <DatePicker  :value='postdata.FundInvestExit.ExitDate' type="date" placeholder="请选择退出日期" style="width: 100%;" @on-change='setExitDate'></DatePicker> -->
                            </FormItem>   
                        </Col>
                        <Col span="8" >
                            <FormItem label="分配方式" >
                                <!-- <Select v-model='postdata.FundInvestExit.MoneyType'  filterable   placeholder="请选择分配方式">
                                    <Option   value="现金分配" >现金分配</Option>
                                    <Option   value="非现金分配" >非现金分配</Option>
                                </Select> -->
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="退出本金" >
                                <!-- <Input v-model='postdata.FundInvestExit.ExitPrincipal' type="number" placeholder="请输入退出本金">
                                        <span slot="append">万元</span>
                                </Input> -->
                            </FormItem>   
                        </Col>
                       
                        <Col span="8">
                            <FormItem label="实际退出金额" >
                                <!-- <Input v-model='postdata.FundInvestExit.ExitMoney' placeholder="请输入实际退出金额">
                                    <span slot="append">万元</span>
                                </Input> -->
                            </FormItem>   
                        </Col>
                    </Row>
             </Form>
        </Card>
         <Card  class="itemCard">
                <p slot="title">请示信息</p>
                <Form :label-width="80">
                    <FormItem label="事项要点" prop="TaskName">
                        <Input v-model='postdata.TaskName'  placeholder="请输入事项要点"></Input>
                    </FormItem>
                    <FormItem label="具体内容" prop="TaskSummary">
                        <Input v-model='postdata.TaskSummary'  type="textarea" :autosize="{minRows: 10,maxRows: 15}" placeholder="请输入事项的具体内容"></Input>
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

    </div>
</template>
<script>
//
import UploadFiles from "@/view/components/upload_file/upload_file"
import {getDealTaskDetailFund,getPlatform,getAllFundList,programListQuery,getProjectList} from "@/api/data"

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
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
            platList:[],
            FundInvest:{},
            exitInvest:{},
            standExut:{},
            postdata:{
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
        this.getPlatform();
         this.getDealTaskDetailFund();

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
                    res.data.fund.invests.forEach(element=>{
                        if(element.status==1){
                            this.FundInvest={
                                TargetType:element.targetType,
                                TargetID:element.targetID,
                                InvestWay:element.investWay,
                                ShareRate:element.shareRate,
                                OrderMoney:element.orderMoney,
                                PaidMoney:element.paidMoney,
                                InvestDate:element.investDate
                            } 
                            // this.exitInvest={
                            //     FundID:element.exits.
                            //     InvestID:element.exits.
                            //     ExitDate:element.exits.
                            //     ExitWay:element.exits.
                            //     ExitPrincipal:element.exits.
                            //     ExitMoney:element.exits.
                            // }
                        }
                    })

                }else{
                    this.$Message.error({
                        content:'数据加载失败:'+res.data.message
                    })
                }
            })
        }, getPlatform(){
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
    }
}
</script>