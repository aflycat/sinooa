<template>
    <div class="cost_field_show">
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
                   
                    <Col span="8">
                        <FormItem label="报送人：">
                            <b>{{postdata.TaskOwnerName}}</b>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="联系电话：">
                           <b>{{ postdata.TaskOwnerPhone}}</b>
                        </FormItem>
                    </Col>
                     <Col span="8">
                        <FormItem label="承担项目：">
                           <b>{{postdata.Project.clientCode}}-{{postdata.Project.projectType}}-{{postdata.Project.projectRole}}</b>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="报送内容：">
                           <b> {{postdata.TaskSummary}}</b>
                        </FormItem>
                    </Col>
                    <!-- <Col span="24" v-if="postdata.TaskFiles.length>0" >
                        <FormItem label="报送文件：" >
                            <p  v-for="(item,index) in postdata.TaskFiles" :key='index'>
                                <a :href="'http://120.78.154.66:8089/taskfiles/'+item.dateFolder+'/'+item.fileName" target="_blank" style="color:#2d8cf0;">
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
            <p slot="title">收款人信息</p>
            <Form :label-width="80">
                <Row>
                    <Col span="8">
                        <FormItem label="收款人：" prop="name">
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
                <p slot="title">费用详情</p>
                 <Form :label-width="90">
                    <Row>
                         <Col span="8">
                            <FormItem label="外勤时间：" >
                                 <b>{{postdata.IncoExpe.Details[0].OccurDate.substr(0,10)}}</b>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                        
                            <FormItem label="会议费用：" >
                                 <b>{{postdata.IncoExpe.Details[0].Amount}}</b>
                            </FormItem>
                        </Col>
                        

                         <Col span="8">
                             <FormItem label="宣传费用：" >
                                  <b>{{postdata.IncoExpe.Details[1].Amount}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="通讯费用：" >
                                 <b>{{postdata.IncoExpe.Details[2].Amount}}</b>
                            </FormItem>   
                        </Col>
                        
                         <Col span="8">
                            <FormItem label="物业费用：" >
                                 <b>{{postdata.IncoExpe.Details[3].Amount}}</b>
                            </FormItem>   
                        </Col>
                        
                         <Col span="8">
                            <FormItem label="资本支出：" >
                                 <b>{{postdata.IncoExpe.Details[4].Amount}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="行政收费：" >
                                 <b>{{postdata.IncoExpe.Details[5].Amount}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                             <FormItem label="办公费用：" >
                                  <b>{{postdata.IncoExpe.Details[6].Amount}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="交通邮政：" >
                                 <b>{{postdata.IncoExpe.Details[7].Amount}}</b>
                            </FormItem>   
                        </Col>
                        
                         <Col span="8">
                            <FormItem label="其他费用：" >
                                 <b>{{postdata.IncoExpe.Details[8].Amount}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="16">
                            <FormItem label="附件张数：" >
                                 <b>{{postdata.IncoExpe.InvoicePages}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="合计：" >
                                {{postdata.IncoExpe.TotalAmount}}
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="总计(大写)：" >
                                {{postdata.IncoExpe.TotalAmountCN}}
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
                        <!-- <Button @click="showUploadFile()" style="margin-right: 8px">添加附件</Button>     -->
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
        <!-- <upload-files ref="uploadModal"  @handleUploadFileEvent="handleUploadEvent"></upload-files> -->

    </div>
</template>
<script>
// import UploadFiles from "@/view/components/upload_file/upload_file"
import {getIncoexpeTask} from "@/api/data"
export default {
    name:'costFieldShow',
     components:{
        // UploadFiles,
    },
     props:{
        taskFlowID:String,
        taskID:String,
        taskTypeID:String

    },
    data(){
        return{
             loading:false,
             showReturnModal:false,
            loading2:false,
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
            FlowComment:'',
            postdata:{
                TaskTypeID: '',
                TaskName: '',//任务名（UI中的报销单据要点）
                TaskNumber:'',
                TaskSummary: '',//任务概要（UI中的备注）
                TaskOwner: '',//任务申请人ID，与User表的UserID对应，取自当前登录用户
                ProjectID:'',//项目ID 
                Project:'',
                TaskFiles:[],
                IncoExpe: {//费用收入信息
                    IncoExpeID:0,//费用收入信息ID
                    IncoExpeType:400,//费用收入类别，100差旅费/200招待费/300一般费用/400外勤费用/500项目收入
                    PayeeID: '',//收款人ID，与用户表UserID对应，项目收入报告时为空
                    PayeeName: '',//收款人姓名（根据所选收款人自动获取）/收款单位（项目收入报告时使用）
                    PayeeBank: '',//收款银行（项目收入报告时使用）
                    PayeeAccount: '',//收款账号
                    TotalAmount: 0,//费用收入总金额
                    TotalAmountCN: '零',//费用收入总金额的中文表述
                    InvoicePages: 0,//单据附件张数
                    Details: [
                            { "ID":0,"IncoExpeID":"0","Type":401,"OccurDate":"","Amount":0 } ,
                            { "ID":0,"IncoExpeID":"0","Type":402,"OccurDate":"","Amount":0 } ,
                            { "ID":0,"IncoExpeID":"0","Type":403,"OccurDate":"","Amount":0 } ,
                            { "ID":0,"IncoExpeID":"0","Type":404,"OccurDate":"","Amount":0 } ,
                            { "ID":0,"IncoExpeID":"0","Type":405,"OccurDate":"","Amount":0 } ,
                            { "ID":0,"IncoExpeID":"0","Type":406,"OccurDate":"","Amount":0 } ,
                            { "ID":0,"IncoExpeID":"0","Type":407,"OccurDate":"","Amount":0 } ,
                            { "ID":0,"IncoExpeID":"0","Type":408,"OccurDate":"","Amount":0 } ,
                            { "ID":0,"IncoExpeID":"0","Type":409,"OccurDate":"","Amount":0 }
                        ]
                }
            }

        }
    },mounted(){
        this.getIncoexpeTask()
    },
    methods:{
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
                        Project:res.data.project,
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
                    OccurDate:element.occurDate
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
        },showUploadFile(){
            //显示modal
            this.$refs["uploadModal"].showModal(true);
        },
        easzyInput(val){
            this.FlowComment=val;
        }
    }
}
</script>