<template>
    <div class="cost_entertain">
            <Card class="itemCard">
                <p slot="title">报销人信息</p>
                <Form :label-width="80">
                    <Row>
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
                            <FormItem label="承担项目" prop="phone">
                               <b>{{postdata.Project.clientCode}}-{{postdata.Project.projectType}}-{{postdata.Project.projectRole}}</b>
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
                            <FormItem label="收款人" prop="name">
                                <Select @on-change="setPayeeName" v-model="postdata.IncoExpe.PayeeID" label-in-value placeholder="请输入收款人姓名">
                                    <Option v-for="item in userList" :key="item.value" :value="item.value">{{item.label}}</Option>
                                </Select>                               
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
                    </Row>
                   
                </Form>
            </Card>
            <Card class="itemCard" >
                <p slot="title">费用详情</p>
                 <Form :label-width="80">
                    <Row>
                        <Col span="8">
                            <FormItem label="招待人数" prop="name">
                                <Input @on-blur="subNum"  v-model="postdata.IncoExpe.Details[0].EntertainPersons" type="number" placeholder="请输入招待人数"></Input>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="招待时间" >
                                <DatePicker :value="postdata.IncoExpe.Details[0].OccurDate" type="date" @on-change="subReturnDate" show-week-numbers placeholder="请选择招待时间" style="width:100%;"></DatePicker>

                                
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="招待对象" prop="name">
                                <Input  @on-blur="subObj" v-model="postdata.IncoExpe.Details[0].EntertainTarget" placeholder="请输入招待对象"></Input>
                            </FormItem>
                        </Col>
                         <Col span="8">
                             <FormItem label="活动费用" prop="phone">
                                <Input @on-blur="subTotal" v-model="postdata.IncoExpe.Details[0].Amount" type="number" placeholder="请输活动费用"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="礼品费用" prop="phone">
                                <Input  @on-blur="subTotal" v-model="postdata.IncoExpe.Details[1].Amount" type="number" placeholder="请输入礼品费用"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="餐费" prop="phone">
                                <Input  @on-blur="subTotal" v-model="postdata.IncoExpe.Details[2].Amount" type="number" placeholder="请输入餐费"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="附件张数" prop="phone">
                                <Input v-model="postdata.IncoExpe.InvoicePages"  type="number" placeholder="请输入附件张数"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="合计" prop="phone">
                                {{postdata.IncoExpe.TotalAmount}}
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="总计(大写)" >
                                {{postdata.IncoExpe.TotalAmountCN}}
                            </FormItem>   
                        </Col>
                       
                    </Row>
                   
                </Form>

              
            </Card>
             <!-- <Card  class="itemCard">
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
        </Card> -->
           <Card  class="itemCard">
                <p slot="title">请示信息</p>
                <Form :label-width="80">
                    <FormItem label="事项要点" >
                        <Input  placeholder="请输入事项要点" v-model="postdata.TaskName"></Input>
                    </FormItem>
                    <FormItem label="具体内容" >
                        <Input  type="textarea" v-model="postdata.TaskSummary" :autosize="{minRows: 10,maxRows: 15}" placeholder="请输入事项的具体内容"></Input>
                    </FormItem>
                     <!-- <FormItem label="文件列表" v-if="fileName.length>0&&showFile">
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
                    </FormItem> -->
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
            <upload-files ref="uploadModal"  @handleUploadFileEvent="handleUploadEvent"></upload-files>

    </div>
</template>
<script>
import UploadFiles from "@/view/components/upload_file/upload_file"
import {getProjectList,getAllUserList,setIncoexpeTask,getIncoexpeTask} from "@/api/data"
import {digitUppercase} from "@/libs/tools"
import {TaskTypeID} from "@/libs/data"
export default {
    components:{
        UploadFiles
    },
    props:{
        taskFlowID:String,
        taskID:String,
        taskTypeID:String
    },
    data(){
        return{
              fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
            name:'',
            userList:[],

            phone:'',
            loading:false,
            ProjectData:[],
            postdata:{
                    TaskTypeID:TaskTypeID.HospitalityExpenses ,
                    TaskName: '',//任务名（UI中的报销单据要点）
                    TaskSummary: '',//任务概要（UI中的备注）
                    TaskOwner: '',//任务申请人ID，与User表的UserID对应，取自当前登录用户
                    ProjectID: -1,//项目ID 
                    IncoExpe: {//费用收入信息
                        IncoExpeID:0,//费用收入信息ID
                        IncoExpeType:200,//费用收入类别，100差旅费/200招待费/300一般费用/400外勤费用/500项目收入
                        PayeeID: '',//收款人ID，与用户表UserID对应，项目收入报告时为空
                        PayeeName: '',//收款人姓名（根据所选收款人自动获取）/收款单位（项目收入报告时使用）
                        PayeeBank: '',//收款银行（项目收入报告时使用）
                        PayeeAccount: '',//收款账号
                        TotalAmount: 0,//费用收入总金额
                        TotalAmountCN: '零',//费用收入总金额的中文表述
                        InvoicePages: 0,//单据附件张数
                        Details: [
                            { "ID":0,"IncoExpeID":"0","Type":201,"OccurDate":"","EntertainTarget":"","EntertainPersons":0,"Amount":0 } , 
                            { "ID":0,"IncoExpeID":"0","Type":202,"OccurDate":"","EntertainTarget":"","EntertainPersons":0,"Amount":0 } ,
                            { "ID":0,"IncoExpeID":"0","Type":203,"OccurDate":"","EntertainTarget":"","EntertainPersons":0,"Amount":0 } 
                        ]
                    }
            }
        }
    },
    mounted(){
        this.name=JSON.parse(localStorage.getItem("userName"));
        this.phone=JSON.parse(localStorage.getItem("phone"));
         this.postdata.TaskOwner=JSON.parse(localStorage.getItem("userId"));
        this.getProList(1);
        this.getAllUserList();
        this.getIncoexpeTask();
    },
    methods:{
        getIncoexpeTask(){
            getIncoexpeTask({"TaskID":this.taskID}).then(res=>{
                if(res.data.code==2503){
                    this.postdata={
                        TaskName: res.data.taskName,//任务名（UI中的报销单据要点）
                        TaskSummary: res.data.taskSummary,//任务概要（UI中的备注）
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
        },
        loadIncoexpeDetail(dat){
            dat.forEach(element => {
                this.postdata.IncoExpe.Details.push({
                    "ID":element.id,
                    "IncoExpeID":element.incoExpeID,
                    "Type":element.type,
                    "OccurDate":element.occurDate,
                    "EntertainTarget":element.entertainTarget,
                    "EntertainPersons":element.entertainPersons,
                    "Amount":element.amount
                    
                })
            });
        },
        handleSubmit(){
            console.log(this.postdata)
        //     setIncoexpeTask(this.postdata).then(res=>{
        //         if(res.data.code==2501){
        //             this.$Message.success({
        //                 content:"操作成功"
        //             })
        //         }else{
        //             this.$Message.error({
        //                 content:"操作失败:"+res.data.message
        //             })
        //         }
        //     })

        },
        subTotal(){
            this.postdata.IncoExpe.TotalAmount=0;
            this.postdata.IncoExpe.Details.forEach(element=>{  
                this.postdata.IncoExpe.TotalAmount+=parseFloat(element.Amount)||0
               
            })
            this.postdata.IncoExpe.TotalAmountCN=digitUppercase(this.postdata.IncoExpe.TotalAmount);
        },
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
        }, getAllUserList(){
            getAllUserList({"Status":1}).then(res=>{
                if(res.data.code==0){
                    res.data.userList.forEach(element=>{
                        this.userList.push({
                            value:element.userId,
                            label:element.userName
                        })
                    })
                }else{
                    this.$Message.error({
                        content:"收款人信息查询失败:"+res.data.message
                    })
                }
            })
        },setPayeeName(val){
            this.postdata.IncoExpe.PayeeID=val.value;
            this.postdata.IncoExpe.PayeeName=val.label;
        },
        
        subNum(){
           
            this.postdata.IncoExpe.Details[1].EntertainPersons=this.postdata.IncoExpe.Details[0].EntertainPersons;   
            this.postdata.IncoExpe.Details[2].EntertainPersons=this.postdata.IncoExpe.Details[0].EntertainPersons ; 
           
        },
        subObj(value){
  
           
            this.postdata.IncoExpe.Details[1].EntertainTarget=this.postdata.IncoExpe.Details[0].EntertainTarget;   
            this.postdata.IncoExpe.Details[2].EntertainTarget=this.postdata.IncoExpe.Details[0].EntertainTarget ; 
            
        },
        subReturnDate(value){
            
            this.postdata.IncoExpe.Details[0].OccurDate=value;  
            this.postdata.IncoExpe.Details[1].OccurDate=value;   
            this.postdata.IncoExpe.Details[2].OccurDate=value ;  
          
        },deleteFile(index){
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