<template>
    <div class="cost_train">
        <Card  class="itemCard">
            <p slot="title">任务明细</p>
            <Form :label-width="80">
                <Row>
                     <Col span="24">
                        <FormItem label="任务编号：">
                            {{postdata.TaskNumber}}
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="事项要点：">
                             <Input v-model="postdata.TaskName" placeholder='请输入事项要点'></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="事项标签：">
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="申请人：">
                            {{postdata.TaskOwnerName}}
                        </FormItem>
                    </Col>
                    <!-- <Col span="12">
                        <FormItem label="联系电话：">
                             <Input v-model="postdata.TaskOwnerPhone" type="text"  placeholder="请输入联系电话："></Input>
                        </FormItem>
                    </Col> -->
                     <Col span="24">
                        <FormItem label="报送内容：">
                             <Input v-model="postdata.TaskSummary" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入具体内容"></Input>
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
        <Card class="itemCard">
                <p slot="title">收款人信息</p>
                <Form :label-width="80">
                    <Row>
                        <Col span="8">
                            <FormItem label="收款人" prop="name">
                                <Input  v-model="postdata.IncoExpe.PayeeName" placeholder="请输入收款人姓名"></Input>
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
                <p slot="title">费用列表</p>
                <Table stripe :columns="columnsCost" :data="dataCost"></Table>
                 
                <!-- <p style="margin-top:20px;">
                    <Button type="primary" style="margin-right:8px;" @click="addCost">增加</Button>
                  
                </p> -->
                <Form :label-width="80" style="margin-top:10px;">
                    <Row>
                        <Col span="12">
                            <FormItem label="总计" prop="name">
                                <Input readonly v-model="postdata.IncoExpe.TotalAmount"  placeholder="请输入合计"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="总计" prop="name">
                                <Input readonly v-model="postdata.IncoExpe.TotalAmountCN"  placeholder="请输入合计大写"></Input>
                            </FormItem>
                        </Col>
                       
                    </Row>
                   
                </Form>
                
                <!-- <Table border ref="selection" :columns="travelColums" :data="travelData"></Table> -->
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
                    <FormItem label="文件列表" v-if="fileName.length>0&&showFile">
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
                                <span v-if="!loading">驳回</span>
                                <span v-else>提交中...</span>
                                
                            </Button> 
                        </FormItem>
                    </Col>
                </Row>
            </Form>    
        </Card> 
        <Modal
            v-model="flagMod"
            title="费用详情"
             width="700"
            @on-ok="asyncOK"
            @on-cancel="asyncCancel">
                <Form  :label-width="80">
                    <Row :gutter="8">
                          <Col span="12">
                            <FormItem label="前往日期">
                                <DatePicker :value="dataCost[edictIndex].OccurDate" type="date" @on-change="subOccurDate" show-week-numbers placeholder="请选择前往日期" style="width:100%;"></DatePicker>
                            </FormItem>
                          </Col> 
                          <Col span="12">
                            <FormItem label="返回日期">
                                <DatePicker :value="dataCost[edictIndex].ReturnDate" type="date" @on-change="subReturnDate" show-week-numbers placeholder="请选择返回日期" style="width:100%;"></DatePicker>
                            </FormItem>
                          </Col>  
                        <Col span="12">
                            <FormItem label="出发地">
                                <Input v-model="dataCost[edictIndex].FromCity" placeholder="请输入出发地"></Input>
                            </FormItem>
                          </Col>
                         
                          <Col span="12">
                            <FormItem label="到达地">
                                <Input v-model="dataCost[edictIndex].ToCity"   placeholder="请输入到达地"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="天数">
                                <Input type="number" v-model="dataCost[edictIndex].TripDays" placeholder="请输入天数"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="机车船费">
                                <Input type="number" v-model="dataCost[edictIndex]['101']" @on-blur="sumCost"   placeholder="请输入机车船费"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="接驳费">
                                <Input type="number" v-model="dataCost[edictIndex]['102']" @on-blur="sumCost"  placeholder="请输入接驳费"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="市内交通">
                                <Input  type="number" v-model="dataCost[edictIndex]['103']" @on-blur="sumCost" placeholder="请输入市内交通"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="住宿费">
                                <Input type="number" v-model="dataCost[edictIndex]['104']" @on-blur="sumCost" placeholder="请输入住宿费"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="伙食补助">
                                <Input type="number" v-model="dataCost[edictIndex]['105']" @on-blur="sumCost" placeholder="请输入伙食补助"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="交通补助">
                                <Input type="number" v-model="dataCost[edictIndex]['106']" @on-blur="sumCost" placeholder="请输入交通补助"></Input>
                            </FormItem>
                          </Col>
                           <Col span="12">
                            <FormItem label="住宿补助">
                                <Input  type="number" v-model="dataCost[edictIndex]['107']" @on-blur="sumCost"  placeholder="请输入住宿补助"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="其他">
                                <Input type="number" v-model="dataCost[edictIndex]['108']" @on-blur="sumCost" placeholder="请输入其他"></Input>
                            </FormItem>
                          </Col>  
                          <Col span="12">
                            <FormItem label="合计">
                                <Input  type="number" readonly v-model="dataCost[edictIndex].total" placeholder="自动计算合计"></Input>
                            </FormItem>
                          </Col>  
                    </Row>
                   
                </Form>


        </Modal> 
        <upload-files ref="uploadModal"  @handleUploadFileEvent="handleUploadEvent"></upload-files>

    </div>
</template>
<script>
import uploadFiles from "@/view/components/upload_file/upload_file"
import {digitUppercase} from "@/libs/tools"
import {getIncoexpeTask} from "@/api/data"
import {deleteFile} from "@/api/user"
export default {
    name:'costTrain',
    components:{
       uploadFiles
    },
     props:{
        taskFlowID:String,
        taskID:String,
        taskTypeID:String

    },
    data(){
        return{
            edictIndex:0,
            flagMod:false,
            loading:false,
            loading1:false,
            loading2:false,
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
            columnsCost:[
                {title: '前往日期', key: 'OccurDate',width:100},
                {title: '返回日期', key: 'ReturnDate',width:100},
                {title: '出发地', key: 'FromCity'},
                {title: '到达地', key: 'ToCity'},
                {title: '天数', key: 'TripDays'},
                {title: '机车船费', key: '101'},
                {title: '接驳费', key: '102'},
                {title: '市内交通', key: '103'},
                {title: '住宿费', key: '104'},
                {title: '伙食补助', key: '105'},
                {title: '交通补助', key: '106'},
                {title: '住宿补助', key: '107'},
                {title: '其他', key: '108'},
                {title: '合计', key: 'total',render:(h,params)=>{
                    if(params.row.FromCity=="合计"){
                        return h('')
                    }else{
                        return h('span',params.row['total'])
                    }
                }},
                {title: '操作', key: 'deal',render:(h,params)=>{
                        if(params.row.FromCity=="合计"){
                            return h('')
                        }else{
                            return h('div',[
                            h('span',{
                                    style:{color:"#2d8cf0",cursor:"pointer",marginRight:"8px"},
                                    on:{
                                        click:()=>{
                                            this.flagMod=true;
                                            this.edictIndex=params.index;
                                           
                                        }
                                    }
                                },'编辑'),
                                h('span',{
                                    style:{color:"#ed4014",cursor:"pointer"},
                                    on:{
                                        click:()=>{
                                            // console.log(params);
                                            this.$Modal.warning({
                                                title:"删除",
                                                content:"确定删除此项？",
                                                onOk:()=>{
                                                    this.dataCost.splice(params.index,1)
                                                    this.loadAllSum()
                                                }
                                            })
                                            
                                        }
                                    }
                                },'删除')
                            ])
                        }
                    }
                },

            ],
     
            dataCost:[
                {OccurDate:'', ReturnDate:'',FromCity:'合计',ToCity:'',TripDays:'','101':0,'102':0,'103':0,'104':0,'105':0,'106':0,'107':0,'108':0,total:0}
           
            ],
            postdata:{
                TaskTypeId:'',
                TaskName: '',//任务名（UI中的报销单据要点）
                TaskSummary: '',//任务概要（UI中的备注）
                TaskOwner: '',//任务申请人ID，与User表的UserID对应，取自当前登录用户
                ProjectID:0,//项目ID 
                TaskFiles:[],
                IncoExpe: {//费用收入信息
                    IncoExpeID:0,//费用收入信息ID
                    IncoExpeType:100,//费用收入类别，100差旅费/200招待费/300一般费用/400外勤费用/500项目收入
                    PayeeID: '',//收款人ID，与用户表UserID对应，项目收入报告时为空
                    PayeeName: '',//收款人姓名（根据所选收款人自动获取）/收款单位（项目收入报告时使用）
                    PayeeBank: '',//收款银行（项目收入报告时使用）
                    PayeeAccount: '',//收款账号
                    TotalAmount: 0,//费用收入总金额
                    TotalAmountCN: '零',//费用收入总金额的中文表述
                    InvoicePages: 0,//单据附件张数
                    Details: [
                    ]
                }
            }
        }
    },mounted(){
        this.gettaskDetail();
       
        // this.getUserList()
    },methods:{
         gettaskDetail(){
             getIncoexpeTask({TaskID:this.taskID}).then(res=>{
                 if(res.data.code==2503){
                     console.log(res)
                     this.postdata={
                        TaskTypeId:res.data.taskTypeID,
                        TaskName: res.data.taskName,//任务名（UI中的报销单据要点）
                        TaskSummary: res.data.taskSummary,//任务概要（UI中的备注）
                        TaskOwner:res.data.taskOwner,//任务申请人ID，与User表的UserID对应，取自当前登录用户
                        ProjectID:0,//项目ID 
                        TaskOwnerName:res.data.taskOwnerName,
                        TaskFiles:res.data.taskFiles,
                        TaskFlows:res.data.taskFlows,
                        TaskNumber:res.data.taskNumber,
                        IncoExpe: {//费用收入信息
                            IncoExpeID:res.data.incoExpe.incoExpeID,//费用收入信息ID
                            IncoExpeType:100,//费用收入类别，100差旅费/200招待费/300一般费用/400外勤费用/500项目收入
                            PayeeID: res.data.incoExpe.payeeID,//收款人ID，与用户表UserID对应，项目收入报告时为空
                            PayeeName: res.data.incoExpe.payeeName,//收款人姓名（根据所选收款人自动获取）/收款单位（项目收入报告时使用）
                            PayeeBank: res.data.incoExpe.payeeBank,//收款银行（项目收入报告时使用）
                            PayeeAccount:res.data.incoExpe.payeeAccount,//收款账号
                            TotalAmount: res.data.incoExpe.totalAmount,//费用收入总金额
                            TotalAmountCN: res.data.incoExpe.totalAmountCN,//费用收入总金额的中文表述
                            InvoicePages: res.data.incoExpe.invoicePages,//单据附件张数
                            Details:res.data.incoExpe.details
                        }
                     }
                     this.loadcostdata(res.data.incoExpe.details)
                 }else{
                       this.$Message.error({
                        content:'获取任务信息失败：'+res.data.message
                    })
                 }
             })
         },
         loadcostdata(data){
            //根据去往时间来进行划分
            if(data.lenght<=0) return;


            let m=0,temp_child=[];
            temp_child[m]=[];
            temp_child[0].push(data[0]);
            
            for(var i=1;i<data.length;i++){
                if(data[i].occurDate==temp_child[m][0].occurDate&&data[i].returnDate==temp_child[m][0].returnDate){
                    m=m;
                }else{
                    m++;
                    temp_child[m]=[];
                }
                temp_child[m].push(data[i])
            }
            console.log(temp_child)
            temp_child.forEach((ele,index)=>{
                let obj={
                    OccurDate:ele[0].occurDate.substr(0,10), 
                    ReturnDate:ele[0].returnDate.substr(0,10),
                    FromCity:ele[0].fromCity,
                    ToCity:ele[0].toCity,
                    TripDays:ele[0].tripDays,
                    '101':0,'102':0,'103':0,'104':0,
                    '105':0,'106':0,'107':0,'108':0,
                    total:0
                }
                ele.forEach(element=>{
                    obj[element.type]=element.amount
                    obj.total+=element.amount||0;
                })
                this.dataCost.unshift(obj)

            })

            //{OccurDate:'', ReturnDate:'',FromCity:'合计',ToCity:'',TripDays:'','101':0,'102':0,'103':0,'104':0,'105':0,'106':0,'107':0,'108':0,total:0}
            // console.log(JSON.stringify(element) )

            //  dataCost
            this.loadAllSum()
        },loadAllSum(){
           var lg=this.dataCost.length;
            var arr=this.dataCost[lg-1];
            for (const key in arr) {
                if (arr.hasOwnProperty(key)&&key!="OccurDate"&&key!="ReturnDate"&&key!="FromCity"&&key!="ToCity"&&key!="TripDays") {
                    arr[key]=0;
                    this.dataCost.forEach((element,index)=>{
                        if(index!=lg-1){
                            arr[key]+=parseFloat(element[key])||0
                        }
                    })
                }
            }
            this.postdata.IncoExpe.TotalAmount=arr['total'];
            this.postdata.IncoExpe.TotalAmountCN=digitUppercase(arr['total'])

        },
        asyncOK(){
            //modal确定

        },
        asyncCancel(){
            //modal取消
        },
        sumCost(){
            //计算modal
        },
        subOccurDate(){
            //改变日期
        },subReturnDate(){
            //改变日期
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
        }
    }
}
</script>