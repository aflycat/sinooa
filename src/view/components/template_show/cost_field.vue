<template>
    <div class="cost_field">
        
          <Card  class="itemCard">
            <p slot="title">任务明细</p>
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
                        <FormItem label="承担项目：">
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
                    <Form :label-width="90">
                        <Row>
                            <Col span="8">
                                <FormItem label="外勤时间" prop="phone">
                                    <DatePicker :value="postdata.IncoExpe.Details[0].OccurDate" type="date" @on-change="subReturnDate" show-week-numbers placeholder="请选择招待时间" style="width:100%;"></DatePicker>
                                </FormItem>   
                            </Col>
                            <Col span="8">
                            
                                <FormItem label="会议费用" prop="name">
                                    <Input  v-model="postdata.IncoExpe.Details[0].Amount" type="number" placeholder="请输入会议费用"></Input>
                                </FormItem>
                            </Col>
                            

                            <Col span="8">
                                <FormItem label="宣传费用" prop="phone">
                                    <Input @on-blur="subObj" v-model="postdata.IncoExpe.Details[1].Amount" type="number" placeholder="请输入宣传费用"></Input>
                                </FormItem>   
                            </Col>
                            <Col span="8">
                                <FormItem label="通讯费用" prop="phone">
                                    <Input @on-blur="subObj" v-model="postdata.IncoExpe.Details[2].Amount" type="number" placeholder="请输入通讯费用"></Input>
                                </FormItem>   
                            </Col>
                            
                            <Col span="8">
                                <FormItem label="物业费用" prop="phone">
                                    <Input @on-blur="subObj" v-model="postdata.IncoExpe.Details[3].Amount" type="number" placeholder="请输入物业租金"></Input>
                                </FormItem>   
                            </Col>
                            
                            <Col span="8">
                                <FormItem label="资本支出" prop="phone">
                                    <Input @on-blur="subObj" v-model="postdata.IncoExpe.Details[4].Amount" type="number" placeholder="请输入资本支出"></Input>
                                </FormItem>   
                            </Col>
                            <Col span="8">
                                <FormItem label="行政收费" prop="phone">
                                    <Input @on-blur="subObj" v-model="postdata.IncoExpe.Details[5].Amount" type="number" placeholder="请输入行政收费"></Input>
                                </FormItem>   
                            </Col>
                            <Col span="8">
                                <FormItem label="办公费用" prop="phone">
                                    <Input @on-blur="subObj" v-model="postdata.IncoExpe.Details[6].Amount" type="number" placeholder="请输入办公费"></Input>
                                </FormItem>   
                            </Col>
                            <Col span="8">
                                <FormItem label="交通邮政" prop="phone">
                                    <Input @on-blur="subObj" v-model="postdata.IncoExpe.Details[7].Amount" type="number" placeholder="请输入交通费"></Input>
                                </FormItem>   
                            </Col>
                            
                            <Col span="8">
                                <FormItem label="其他费用" prop="phone">
                                    <Input @on-blur="subObj" v-model="postdata.IncoExpe.Details[8].Amount" type="number" placeholder="请输入其他费用"></Input>
                                </FormItem>   
                            </Col>
                            <Col span="16">
                                <FormItem label="附件张数" prop="phone">
                                    <Input v-model="postdata.IncoExpe.InvoicePages" type="number" placeholder="请输入附件张数"></Input>
                                </FormItem>   
                            </Col>
                            <Col span="8">
                                <FormItem label="合计" prop="phone">
                                    {{postdata.IncoExpe.TotalAmount}}
                                </FormItem>   
                            </Col>
                            <Col span="8">
                                <FormItem label="总计(大写)	" prop="phone">
                                    {{postdata.IncoExpe.TotalAmountCN}}
                                </FormItem>   
                            </Col>
                        
                        </Row>
                    
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
                            <Button style="margin-right: 8px" type="primary" :loading="loading" >
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
import {getIncoexpeTask,getProjectList,getAllUserList,setIncoexpeTask} from "@/api/data"
import {deleteFile} from "@/api/user"
import {digitUppercase} from "@/libs/tools"
export default {
    name:'costField',
  
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
            userList:[],
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
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
                        { "ID":0,"IncoExpeID":"0","Type":301,"OccurDate":"","Amount":0 } ,
                        { "ID":0,"IncoExpeID":"0","Type":302,"OccurDate":"","Amount":0 } ,
                        { "ID":0,"IncoExpeID":"0","Type":303,"OccurDate":"","Amount":0 } ,
                        { "ID":0,"IncoExpeID":"0","Type":304,"OccurDate":"","Amount":0 } ,
                        { "ID":0,"IncoExpeID":"0","Type":305,"OccurDate":"","Amount":0 } ,
                        { "ID":0,"IncoExpeID":"0","Type":306,"OccurDate":"","Amount":0 } ,
                        { "ID":0,"IncoExpeID":"0","Type":307,"OccurDate":"","Amount":0 } ,
                        { "ID":0,"IncoExpeID":"0","Type":308,"OccurDate":"","Amount":0 } ,
                        { "ID":0,"IncoExpeID":"0","Type":309,"OccurDate":"","Amount":0 }
                    ]
                }
            }
        }
    },mounted(){
        this.gettaskDetail();
        this.getProList(1);
        this.getAllUserList();
       
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
        }, subObj(value){
            this.postdata.IncoExpe.TotalAmount=0;
            this.postdata.IncoExpe.Details.forEach(
                element=>{
                    this.postdata.IncoExpe.TotalAmount+=parseFloat(element.Amount)
                }
            )

            this.postdata.IncoExpe.TotalAmountCN=digitUppercase(this.postdata.IncoExpe.TotalAmount);
            


        },subReturnDate(value){
            this.postdata.IncoExpe.Details.forEach(element=>{
                element.OccurDate=value;
            })
        },
         gettaskDetail(){
             getIncoexpeTask({TaskID:this.taskID}).then(res=>{
                  if(res.data.code==2503){
                      this.postdata={
                        TaskTypeId:res.data.taskTypeID,
                        TaskName: res.data.taskName,//任务名（UI中的报销单据要点）
                        TaskSummary: res.data.taskSummary,//任务概要（UI中的备注）
                        TaskOwner:res.data.taskOwner,//任务申请人ID，与User表的UserID对应，取自当前登录用户
                        ProjectID:res.data.project.projectID,//项目ID 
                        TaskOwnerName:res.data.taskOwnerName,
                        TaskFiles:res.data.taskFiles,
                        TaskFlows:res.data.taskFlows,
                        TaskNumber:res.data.taskNumber,
                        Project:res.data.project,
                        IncoExpe: {//费用收入信息
                            IncoExpeID:res.data.incoExpe.incoExpeID,//费用收入信息ID
                            IncoExpeType:400,//费用收入类别，100差旅费/200招待费/300一般费用/400外勤费用/500项目收入
                            PayeeID: res.data.incoExpe.payeeID,//收款人ID，与用户表UserID对应，项目收入报告时为空
                            PayeeName: res.data.incoExpe.payeeName,//收款人姓名（根据所选收款人自动获取）/收款单位（项目收入报告时使用）
                            PayeeBank: res.data.incoExpe.payeeBank,//收款银行（项目收入报告时使用）
                            PayeeAccount:res.data.incoExpe.payeeAccount,//收款账号
                            TotalAmount: res.data.incoExpe.totalAmount,//费用收入总金额
                            TotalAmountCN: res.data.incoExpe.totalAmountCN,//费用收入总金额的中文表述
                            InvoicePages: res.data.incoExpe.invoicePages,//单据附件张数
                            Details:[]
                        }
                      }
                         this.loadIncoexpeDetail(res.data.incoExpe.details)
                  }else{
                    this.$Message.error({
                        content:'获取任务信息失败：'+res.data.message
                    })
                  }

             })
         },
         loadIncoexpeDetail(dat){
            dat.forEach(element => {
                this.postdata.IncoExpe.Details.push({
                    "ID":0,
                    "IncoExpeID":element.incoExpeID,
                    "Type":element.type,
                    "OccurDate":element.occurDate,
                    "Amount":element.amount
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
        },setPayeeName(val){
            this.postdata.IncoExpe.PayeeID=val.value;
            this.postdata.IncoExpe.PayeeName=val.label;
        }
    }
}
</script>