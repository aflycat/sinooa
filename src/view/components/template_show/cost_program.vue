<template>
    <div class="cost_program">
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
                            <FormItem label="收款单位" prop="name">
                                <Input v-model="postdata.IncoExpe.PayeeName" placeholder="请输入收款单位"></Input>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="收款账号" prop="phone">
                                <Input v-model="postdata.IncoExpe.PayeeAccount" placeholder="请输入收款账号"></Input>
                            </FormItem>   
                        </Col>

                         <Col span="8">
                             <FormItem label="开户行" prop="phone">
                                <Input v-model="postdata.IncoExpe.PayeeBank" placeholder="请输入开户行"></Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="承担项目" prop="phone">
                                <Select v-model="postdata.ProjectID" filterable  >
                                    <Option v-for="item in ProjectData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>     
                        </Col>
                    </Row>
                   
                </Form>
            </Card>
             <Card class="itemCard" >
                <p slot="title">收入详情</p>
                 <Form :label-width="100">
                    <Row>
                         <Col span="8">
                            <FormItem label="收入性质" prop="phone">
                                <Input v-model="postdata.IncoExpe.Details[0].IncomeNature" placeholder="请输入收入性质"></Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                        
                            <FormItem label="发票金额" prop="name">
                                <Input @on-blur="getTotalAmountCn" v-model="postdata.IncoExpe.Details[0].Amount" placeholder="请输入收入性质"></Input>
                            </FormItem>
                        </Col>
                        

                         <Col span="8">
                             <FormItem label="发票金额(大写)" prop="phone">
                                 <Input v-model="postdata.IncoExpe.TotalAmountCN" placeholder="请输入收入性质"></Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="附件张数" prop="phone">
                                <Input v-model="postdata.IncoExpe.InvoicePages" type="number" placeholder="请输入附件张数"></Input>
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
                        <FormItem label=" ">
                            <Button @click="showUploadFile()" style="margin-right: 8px">添加附件</Button>
                            <Button style="margin-right: 8px" type="primary" :loading="loading"  @click="handleSubmit()">
                                <span v-if="!loading">同意</span>
                                <span v-else>提交中...</span>
                            </Button> 
                            <Button :loading="loading2"  style="margin-right: 8px" type="error">
                                <span v-if="!loading">不同意</span>
                                <span v-else>提交中...</span>
                                
                            </Button> 
                        </FormItem>
                    </Col>
                </Row>
            </Form>    
        </Card>  

    </div>
</template>
<script>
import {getIncoexpeTask,getProjectList} from "@/api/data"
import {digitUppercase} from "@/libs/tools"

export default {
    name:'costProgram',
    
     props:{
        taskFlowID:String,
        taskID:String,
        taskTypeID:String

    },
    data(){
        return{
            loading:false,
            loading1:false,
            loading2:false,
            ProjectData:[],
            postdata:{
                TaskTypeId:'',
                TaskName: '',//任务名（UI中的报销单据要点）
                TaskSummary: '',//任务概要（UI中的备注）
                TaskOwner: '',//任务申请人ID，与User表的UserID对应，取自当前登录用户
                ProjectID:0,//项目ID 
                TaskFiles:[],
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
        this.gettaskDetail();
        this.getProList(1);
        // this.getUserList()
    },methods:{
        getProList(status){
            //获取项目列表
            getProjectList({"ProjectStatus":1,"USerID":JSON.parse(localStorage.getItem("userId"))}).then(res=>{
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
        gettaskDetail(){
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
        },
         loadIncoexpeDetail(dat){
            dat.forEach(element => {
                this.postdata.IncoExpe.Details.push({
                     "ID":0,
                     "IncoExpeID":"0",
                     "Type":501,
                     "OccurDate":element.OccurDate,
                     "Amount":element.amount,
                     "IncomeNature":element.incomeNature 


                })
            });
        },getTotalAmountCn(){
            this.postdata.IncoExpe.TotalAmount=this.postdata.IncoExpe.Details[0].Amount;
            this.postdata.IncoExpe.TotalAmountCN=digitUppercase(this.postdata.IncoExpe.TotalAmount);

        },
        
    }
}
</script>