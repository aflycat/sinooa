<template>
    <div class="opraTem">
        <Card  class="itemCard">
            <p slot="title">任务明细</p>
            <Form :label-width="80">
                <Row>
                     <Col span="24">
                        <FormItem label="任务编号：">
                            {{getdata.taskNumber||''}}
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="事项要点：">
                            {{getdata.taskName||''}}
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="事项标签：">
                            <!-- {{getdata.taskNumber||''}} -->
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="报送人：">
                            {{getdata.taskOwnerName||''}}
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="联系电话：">
                            {{getdata.taskOwnerPhone||''}}
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="报送内容：">
                            {{getdata.taskSummary||''}}
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="报送文件：">
                          
                            <p  v-for="(item,index) in getdata.taskFiles" :key='index'>
                                <a href="#" style="color:#2d8cf0;">
                                    {{item.oldFileName}}
                                </a>
                            </p>
                        </FormItem>
                    </Col>
                </Row>
                
            </Form>    
        </Card>   
        <Card  class="itemCard">
            <p slot="title">审批进度</p>
            <Form :label-width="80">
                <Timeline>
                   
                    <template v-for="(item,index) in getdata.taskFlows">

                        <TimelineItem  :color="item.flowStatus==1?'#19be6b':'#515a6e'" v-if="item.flowComment||item.flowRequire==0" :key="index">
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
                            <Button @click="showReturnModal"  style="margin-right: 8px" type="warning">修改</Button>  
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
        <return-step ref='stepModal' :taskFlowID="taskFlowID" :taskFlows="taskFlows" :FlowComment="FlowComment" :taskID="taskID"></return-step>
    </div>
</template>
<script>
import {getTaskDetail} from "@/api/data"
import returnStep from "@/view/components/template/return_step"
import UploadFiles from "@/view/components/upload_file/upload_file"

export default {
    components:{
        UploadFiles,
        returnStep
    },
    props:{
        taskID:String,
        taskFlowID:String
    },
    name:'opraTem',
    data(){
        return{
            loading:false,
            loading1:false,
            loading2:false,
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
            postdata:{},
            getdata:{},
            taskFlows:[],
            FlowComment:''
        }
    },
    mounted(){
        console.log(this.taskID)
        this.gettaskDetail()
    },
    methods:{
        gettaskDetail(){
            getTaskDetail({TaskID:this.taskID}).then(res=>{
                console.log(res)
                if(res.data.code==2003){
                    this.getdata=res.data;
                    this.taskFlows=res.data.taskFlows;
                   
                }else{
                    this.$Message.error({
                        content:'获取任务信息失败：'+res.data.message
                    })
                }
            })
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
        },showReturnModal(){
            this.$refs['stepModal'].showModal(true)
        }

        
    }
}
</script>
<style lang="less" scoped>
   
    .content{
   font-size: 14px;
        font-weight: bold;
    }
</style>