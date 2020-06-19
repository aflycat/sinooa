<template>
    <div class="pro_change">
         <Card class="itemCard">
                <p slot="title">报送人信息</p>
                <Form :label-width="80">
                    <Row>
                        <Col span="8">
                            <FormItem label="报送人：" >
                               <b> {{postdata.TaskOwnerName}}</b>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="联系电话：" >
                                <b>{{postdata.TaskOwnerPhone}}</b>
                            </FormItem>   
                        </Col>
                    </Row>
                </Form>
        </Card>
        <Card class="itemCard">
                <p slot="title">权属平台选择</p>
                <Form :label-width="100">
                    <Row>
                          <Col span="8">
                            <FormItem label="权属平台：" >
                               <b> {{platformName}}</b>
                            </FormItem>
                        </Col>
                      </Row>
                   
                </Form>
            </Card>
        <task-file :fileList='postdata.TaskFiles' :flowRequire='flowRequire'></task-file>
        <task-flows :taskFlows='taskFlows' :taskFlowID='taskFlowID'></task-flows>
        <edict-button @handle-submit-agree='handleSubmitAgree' :TaskID='taskID' 
                :TaskFlowID='taskFlowID' :TaskStr='postdata' 
                >
            </edict-button>
       
    </div>
</template>
<script>
import {getPlatformTaskDetail,geAllPlatformDetail,addNewPlatformMeetMod,taskFlowAgree} from "@/api/data"
import taskFile from "@/view/components/template/task_file_show"
import taskFlows from "@/view/components/template/approval_process"
import edictButton from "@/view/components/template/return_edict_button"
export default {
    components:{
        // UploadFiles
        taskFile,
        taskFlows,
        edictButton
    },
    props:{
        taskID:String,
        taskFlowID:String,
        flowRequire:String
    },
    data(){
        return{
            loading:false,
            loading2:false,
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
            platformName:'',
            postdata:{
                TaskTypeID:'',
                TaskName:'',
                TaskSummary:'',
                TaskOWner:'',
                PlatformID:''
            },
            postUnchange:{

            }
        }
    },
    mounted(){
        this.getPlatformTaskDetail()
    },
    methods:{
         handleSubmitAgree(TaskName,TaskSummary){
           
             if((this.postUnchange.TaskName==TaskName)&&(this.postUnchange.TaskSummary==TaskSummary)){
                  this.taskFlowAgree()
             }else{
                 this.addNewPlatformMeetMod(TaskName,TaskSummary)
             }
          
        },taskFlowAgree(){
            taskFlowAgree({TaskID:this.taskID,TaskFlowID:this.taskFlowID}).then(res=>{
                if(res.data.code==2022){
                    this.$Message.success({
                        content:"操作成功"
                    })
                }else{
                    this.$Message.error({
                        content:"操作成功"+res.data.message
                    })
                }
            })
        },
        addNewPlatformMeetMod(TaskName,TaskSummary){
            addNewPlatformMeetMod({
                TaskID:this.taskID,
                TaskName:TaskName,
                TaskSummary:TaskSummary,
                TaskFlowID:this.taskFlowID

            }).then(res=>{
                 if(res.data.code==2109){
                        this.$Message.success({
                            content:"操作成功"
                        })
                    }else{
                        this.$Message.error({
                            content:"操作成功"+res.data.message
                        })
                    }
            })
        },
        getPlatformTaskDetail(){
            getPlatformTaskDetail({TaskID:this.taskID}).then(res=>{
                if(res.data.code==2103){
                    this.postdata={
                        TaskOwnerName:res.data.taskOwnerName,
                        TaskOwnerPhone:res.data.taskOwnerPhone,
                        TaskName:res.data.taskName,
                        TaskSummary:res.data.taskSummary,
                        TaskFiles:res.data.taskFiles

                    };
                    this.postUnchange['TaskName']=res.data.taskName;
                     this.postUnchange['TaskSummary']=res.data.taskSummary;
                    this.taskFlows=res.data.taskFlows;
                    this.geAllPlatformDetail(res.data.platform.platformID);
                   
                }else{
                    this.$Message.error({
                        content:'获取任务信息失败：'+res.data.message
                    })
                }
            })
        }, geAllPlatformDetail(id){
            geAllPlatformDetail({PlatformID:id}).then(res=>{
                if(res.data.code==2106){
                    this.platformName=res.data.platform.shortName;
                }else{
                    this.$Message.error("平台信息查询失败:"+res.data.message)
                }
            })
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