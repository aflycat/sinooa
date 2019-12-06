<template>
    <div class="cost_wage_show">
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
                             {{postdata.TaskName}}
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
                             {{postdata.TaskSummary}}
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
            <p slot="title">人员列表</p>
           
            <Table stripe :row-class-name="lastClass" border ref="selection" :columns="wagecolumns" :data="wagedata"></Table>
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
                            <h3 class="content">{{item.flowComment||''}}</h3>
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
        <upload-files ref="uploadModal"  @handleUploadFileEvent="handleUploadEvent"></upload-files>


    </div>
</template>
<script>
import uploadFiles from "@/view/components/upload_file/upload_file"
import {deleteFile} from "@/api/user"
import {getPayDetail} from "@/api/data"
export default {
    name:'costWageShow',
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
            loading:false,
            loading1:false,
            loading2:false,
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
             wagecolumns:[
                {title: '姓名', align: 'center',key:'PayeeName',render:(h,param)=>{
                    if(param.row.PayeeName=="合计"){
                        return h('span',{
                            style:{
                                color:"#2d8cf0"
                            }
                        },param.row.PayeeName)
                    }else{
                        return h('span',param.row.PayeeName)
                    }
                }},
                {title: '基本工资', key: 'PayBase'},
                {title: '社保-个人', key: 'Social_e'},
                {title: '社保-单位', key: 'Social_c'},
                {title: '所得税', key: 'Tax'},
                {title: '考勤扣款', key: 'Absence'},
                {title: '实发工资', key: 'PayReal'},
                {title: '外勤费用', key: 'FieldCost'},
                {title: '现金工资', key: 'PayCash'},
                {title: '人力成本', key: 'PayHrcost'}

            ],
            wagedata:[
                {PayeeName:'合计',PayBase:0,Social_e:0,Social_c:0,Tax:0,Absence:0,PayReal:0,FieldCost:0,PayCash:0,PayHrcost:0}
            ],
            postdata:{
                TaskFiles:[],

            }

        }
    },mounted(){
        this.getTaskDetail()
    },methods:{
        getTaskDetail(){
             getPayDetail({TaskID:this.taskID}).then(res=>{
                 if(res.data.code==2602){
                 console.log(res)
                    this.postdata={
                        TaskTypeId: res.data.taskTypeID,
                        TaskName: res.data.taskName,//任务名（UI中的报销单据要点）
                        TaskSummary: res.data.taskSummary,//任务概要（UI中的备注）
                        TaskOwner: res.data.taskOwner,//任务申请人ID，与User表的UserID对应，取自当前登录用户
                        TaskFlows: res.data.taskFlows,
                        TaskFiles: res.data.taskFiles,
                        TaskNumber: res.data.taskNumber,
                        TaskOwnerName: res.data.taskOwnerName,
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
                    Social_e:0,
                    Social_c:0,
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



           
                // temp[PayBase]+=element.payBase
                // // temp[PayBase]+=element.payBase
                // // temp[PayBase]+=element.payBase
                // temp[Tax]+=element.tax||0;
                // temp[Absence]+=element.absence||0;
                // temp[PayReal]+=element.payReal||0;
                // temp[FieldCost]+=element.fieldCost||0;
                // temp[PayCash]+=element.payCash||0;
                // temp[PayHrcost]+=element.payHrcost||0;

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
        },lastClass(row,index){
            console.log(row,index)
            if(row.PayeeName=="合计"){
                return 'tableLast';
            }
        }
    }
}
</script>
<style >
    .tableLast{
       color: #2d8cf0;
    }
</style>