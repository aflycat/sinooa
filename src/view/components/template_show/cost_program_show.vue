<template>
    <div class="cost_program_show">
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
                    
                </Row>
                 </Form>    
        </Card>
         <Card class="itemCard">
                <p slot="title">收款人信息</p>
                <Form :label-width="80">
                    <Row>
                        <Col span="8">
                            <FormItem label="收款单位：" prop="name">
                                <b>{{postdata.IncoExpe.PayeeName}}</b>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="收款账号：" prop="phone">
                                <b>{{postdata.IncoExpe.PayeeAccount}}</b>
                            </FormItem>   
                        </Col>

                         <Col span="8">
                             <FormItem label="开户行：" prop="phone">
                                 <b>{{postdata.IncoExpe.PayeeBank}}</b>
                            </FormItem>   
                        </Col>
                    </Row>
                   
                </Form>
            </Card>
            <Card class="itemCard" >
                <p slot="title">收入详情</p>
                 <Form :label-width="120">
                    <Row>
                         <Col span="8">
                            <FormItem label="收入性质：" prop="phone">
                                <b>{{postdata.IncoExpe.Details[0].IncomeNature}}</b>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                        
                            <FormItem label="发票金额：" prop="name">
                                <b>{{postdata.IncoExpe.Details[0].Amount}}</b>
                            </FormItem>
                        </Col>
                        

                         <Col span="8">
                             <FormItem label="发票金额(大写)：" prop="phone">
                                 <b>{{postdata.IncoExpe.TotalAmountCN}}</b>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="附件张数：" prop="phone">
                                <b>{{postdata.IncoExpe.InvoicePages}}</b>
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
                    </Row>
                   
                     <FormItem>
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


    </div>
</template>
<script>
import {getIncoexpeTask} from "@/api/data"
export default {
    name:'costprogramShow',
    props:{
        taskFlowID:String,
        taskID:String,
        taskTypeID:String
    },
    data(){
        return{
            loading:false,
            loading2:false,
            FlowComment:'',
            postdata:{
                    TaskTypeID: '',
                    TaskName: '',//任务名（UI中的报销单据要点）
                    TaskNumber:'',
                    TaskSummary: '',//任务概要（UI中的备注）
                    TaskOwner: '',//任务申请人ID，与User表的UserID对应，取自当前登录用户
                    ProjectID:'',//项目ID 
                    IncoExpe: {//费用收入信息
                        IncoExpeID:0,//费用收入信息ID
                        IncoExpeType:500,//费用收入类别，100差旅费/200招待费/300一般费用/400外勤费用/500项目收入
                        PayeeID: '',//收款人ID，与用户表UserID对应，项目收入报告时为空
                        PayeeName: '',//收款人姓名（根据所选收款人自动获取）/收款单位（项目收入报告时使用）
                        PayeeBank: '',//收款银行（项目收入报告时使用）
                        PayeeAccount: '',//收款账号
                        TotalAmount: 0,//费用收入总金额
                        TotalAmountCN: '零',//费用收入总金额的中文表述
                        InvoicePages: 0,//单据附件张数
                        Details: [
                            { "ID":0,"IncoExpeID":"0","Type":501,"OccurDate":"","Amount":0,"IncomeNature":"" }
                        ]
                    }
            }

        }
    },mounted(){
         this.getIncoexpeTask()
    },methods:{
         getIncoexpeTask(){
            getIncoexpeTask({TaskID:this.taskID}).then(res=>{
                if(res.data.code==2503){
                    this.postdata={
                        TaskName: res.data.taskName,//任务名（UI中的报销单据要点）
                        TaskSummary:  res.data.taskSummary,//任务概要（UI中的备注）
                        TaskOwner:  res.data.taskOwner,//任务申请人ID，与User表的UserID对应，取自当前登录用户
                        TaskFiles: res.data.taskFiles,
                        TaskFlows: res.data.taskFlows,
                        TaskNumber: res.data.taskNumber,
                        TaskOwnerName: res.data.taskOwnerName,
                        TaskOwnerPhone: res.data.taskOwnerPhone,
                        ProjectID: res.data.project.projectID,
                        IncoExpe: {//费用收入信息
                            IncoExpeID: res.data.incoExpe.incoExpeID,//费用收入信息ID
                            IncoExpeType:res.data.incoExpe.incoExpeType,//费用收入类别，100差旅费/200招待费/300一般费用/400外勤费用/500项目收入
                            PayeeID:res.data.incoExpe.payeeID,//收款人ID，与用户表UserID对应，项目收入报告时为空
                            PayeeName: res.data.incoExpe.payeeName,//收款人姓名（根据所选收款人自动获取）/收款单位（项目收入报告时使用）
                            PayeeBank:res.data.incoExpe.payeeBank,//收款银行（项目收入报告时使用）
                            PayeeAccount: res.data.incoExpe.payeeAccount,//收款账号
                            TotalAmount: res.data.incoExpe.totalAmount,//费用收入总金额
                            TotalAmountCN:res.data.incoExpe.totalAmountCN,//费用收入总金额的中文表述
                            InvoicePages: res.data.incoExpe.invoicePages,//单据附件张数
                            Details:[]
                        }
                    }
                     this.loadIncoexpeDetail(res.data.incoExpe.details)
                }else{
                    this.$Message.error({
                        content:'数据加载失败:'+res.data.message
                    })
                }
            })
        }, loadIncoexpeDetail(dat){
            dat.forEach(element => {
                this.postdata.IncoExpe.Details.push({
                    Amount:element.amount,
                    OccurDate:element.occurDate,
                    IncomeNature:element.incomeNature

                })
            });
        },
        easzyInput(val){
            this.FlowComment=val;
        }
    }
}
</script>