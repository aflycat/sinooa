<template>
    <div class="cost_wage_show">
        <Card  class="itemCard">
            <p slot="title">任务明细</p>
            <Form :label-width="80">
                <Row>
                     <Col span="12">
                        <FormItem label="任务编号：">
                            <b> {{postdata.TaskNumber}}</b>
                        </FormItem>
                    </Col>
                     <Col span="12">
                        <FormItem label="发放月份：" >
                           <b>{{postdata.PayDetails[0].payMonth.substr(0,7)}}</b>
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
            <p slot="title">人员列表</p>
            <Table border stripe   height="600" ref="selection"  :columns="wagecolumns" :data="wagedata"></Table>
            <p style="margin-top:20px;">
                <Button type="primary" style="margin-right:15px;" @click="downloadWageTable()">导出</Button>
            </p>
            
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
        <!-- <upload-files ref="uploadModal"  @handleUploadFileEvent="handleUploadEvent"></upload-files> -->


    </div>
</template>
<script>
// import uploadFiles from "@/view/components/upload_file/upload_file"
import {deleteFile} from "@/api/user"
import {getPayDetail} from "@/api/data"
export default {
    name:'costWageShow',
    components:{
    //    uploadFiles
    },
    props:{
       taskFlowID:String,
        taskID:String,
        taskTypeID:String
    },
    data(){
        return{
            loading:false,
            loading1:false,
            showReturnModal:false,
            FlowComment:'',
            loading2:false,
             wagecolumns:[
                 {title: '姓名', align: 'center',key:'PayeeName',fixed:'left',width:100},
                {title: '基本工资', key: 'PayBase',fixed:'left',width:85},
                {title: '考勤补贴', key: 'PayAttendance',fixed:'left',width:85},
                {title: '养老-个人', key: 'Pension_e',width:85},
                {title: '养老-单位', key: 'Pension_c',width:85}, 
                {title: '住房-个人', key: 'Housing_e',width:85},
                {title: '住房-单位', key: 'Housing_c',width:85}, 
                {title: '医疗-个人', key: 'Medical_e',width:85},
                {title: '医疗-单位', key: 'Medical_c',width:85}, 
                {title: '工伤-个人', key: 'Injury_e',width:85},
                {title: '工伤-单位', key: 'Injury_c',width:85}, 
                {title: '失业-个人', key: 'Unemploy_e',width:85},
                {title: '失业-单位', key: 'Unemploy_c',width:85},
                {title: '生育-个人', key: 'Maternity_e',width:85},
                {title: '生育-单位', key: 'Maternity_c',width:85},
                {title: '所得税', key: 'Tax',width:85},
                {title: '考勤扣款', key: 'Absence',width:85,fixed:'right'},
                {title: '实发工资', key: 'PayReal',width:85,fixed:'right'},
                {title: '外勤费用', key: 'FieldCost',width:85,fixed:'right'},
                {title: '现金工资', key: 'PayCash',width:85,fixed:'right'},
                {title: '人力成本', key: 'PayHrcost',width:85,fixed:'right'}
                
            ],
            wagedata:[
                {
                    PayeeName:'合计',
                    PayBase:0,
                    PayAttendance:0,
                    Pension_e:0,
                    Pension_c:0,
                    Housing_e:0,
                    Housing_c:0,
                    Medical_e:0,
                    Medical_c:0,
                    Injury_e:0,
                    Injury_c:0,
                    Unemploy_e:0,
                    Unemploy_c:0,
                    Maternity_e:0,
                    Maternity_c:0,
                    Tax:0,
                    Absence:0,
                    PayReal:0,
                    FieldCost:0,
                    PayCash:0,
                    PayHrcost:0
                }
            ],
            postdata:{
                TaskFiles:[],
                TaskTypeId:'',
                TaskName: '',//任务名（UI中的报销单据要点）
                TaskSummary: '',//任务概要（UI中的备注）
                TaskOwner: '',//任务申请人ID，与User表的UserID对应，取自当前登录用户
                TaskFlows: '',
                TaskFiles:'',
                TaskNumber: '',
                TaskOwnerName:'',
                TaskOwnerPhone:'',
                PayDetails:[]
            }

        }
    },mounted(){
        this.getTaskDetail()
    },methods:{
        handleSubmitAgree(){

        },
        handleSubmitDisgree(){

        },
        getTaskDetail(){
             getPayDetail({TaskID:this.taskID}).then(res=>{
                 if(res.data.code==2602){
                    this.postdata={
                        TaskTypeId: res.data.taskTypeID,
                        TaskName: res.data.taskName,//任务名（UI中的报销单据要点）
                        TaskSummary: res.data.taskSummary,//任务概要（UI中的备注）
                        TaskOwner: res.data.taskOwner,//任务申请人ID，与User表的UserID对应，取自当前登录用户
                        TaskFlows: res.data.taskFlows,
                        TaskFiles: res.data.taskFiles,
                        TaskNumber: res.data.taskNumber,
                        TaskOwnerName: res.data.taskOwnerName,
                        TaskOwnerPhone:res.data.taskOwnerPhone,
                        PayDetails:res.data.payDetails
                    }
                    this.loadTableData(res.data.payDetails)
                 }else{
                     this.$Message.error({
                        content:'获取任务信息失败：'+res.data.message
                     })
                 }
             })
        },
        loadTableData(dat){
            let temp=this.wagedata[this.wagedata.length-1];
            dat.forEach(element => {
                let obj={
                    PayeeName:element.payeeName,
                    PayBase:element.payBase,
                    PayAttendance:element.payAttendance,
                    Pension_e:element.pension_e,
                    Pension_c:element.pension_c,
                    Housing_e:element.housing_e,
                    Housing_c:element.housing_c,
                    Medical_e:element.medical_e,
                    Medical_c:element.medical_c,
                    Injury_e:element.injury_e,
                    Injury_c:element.injury_c,
                    Unemploy_e:element.unemploy_e,
                    Unemploy_c:element.unemploy_c,
                    Maternity_e:element.maternity_e,
                    Maternity_c:element.maternity_c,
                    Tax:element.tax,
                    Absence:element.absence,
                    PayReal:element.payReal,
                    FieldCost:element.fieldCost,
                    PayCash:element.payCash,
                    PayHrcost:element.payHrcost
                }
                this.wagedata.unshift(obj)
            });

            for (const key in temp) {
                if (temp.hasOwnProperty(key)&&key!="PayeeName") {
                    this.wagedata.forEach((element,index)=>{
                        if(index!=this.wagedata.length-1){
                            temp[key]+=element[key]||0
                        }
                    })
                    
                }
            }
      
        },
        downloadWageTable(){
            this.$refs.selection.exportCsv({
                filename:"工资表格导出",
            })
        },easzyInput(val){
            this.FlowComment=val;
        }
    }
}
</script>
<style >
    .tableLast{
       color: #2d8cf0;
    }
</style>