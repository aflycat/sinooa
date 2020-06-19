<template>
    <div class="pro_change">
            <Card class="itemCard">
                <p slot="title">报送人信息</p>
                <Form :label-width="80">
                    <Row>
                        <Col span="8">
                            <FormItem label="报送人" prop="name">
                                {{postdata.TaskOwnerName}}
                            </FormItem>
                        </Col>
                            <Col span="8">
                            <FormItem label="联系电话" prop="phone">
                                {{postdata.TaskOwnerPhone}}
                            </FormItem>   
                        </Col>
                    </Row>
                </Form>
            </Card>
            <pro-inform :objId="projectID" :flag="2"></pro-inform>
            <task-file :fileList='postdata.TaskFiles' :flowRequire='flowRequire'></task-file>
            <task-flows :taskFlows='postdata.TaskFlows' :taskFlowID='taskFlowID'></task-flows>
            <edict-button @handle-submit-agree='handleSubmitAgree' :TaskID='taskID' 
                :TaskFlowID='taskFlowID' :TaskStr='postdata' 
                >
            </edict-button>

            
            <!-- <upload-files ref="uploadModal"  @handleUploadFileEvent="handleUploadEvent"></upload-files> -->
   
    </div>
</template>
<script>
// tips
// 需要一个对象存储初始加载时的信息
// 在切换选择的项目简称是，任务编号，报送人，联系电话，事项要点，具体内容不变
// 当提交数据是有更改调用修改并同意
// import UploadFiles from "@/view/components/upload_file/upload_file"
import proInform from "@/view/components/template/pro_inform"
import taskFile from "@/view/components/template/task_file_show"
import taskFlows from "@/view/components/template/approval_process"
import {getDealTaskDetail,taskFlowAgree,addNewProTaskProcessMod} from "@/api/data"
import {toUpperCase,orderObj} from "@/libs/tools"
import edictButton from "@/view/components/template/return_edict_button"
export default {
    components:{
        // UploadFiles,
        edictButton,
        proInform,
        taskFile,
        taskFlows
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
            ProjectData:[],
            standPost:{},
            projectID:0,
            ProjectVlaue:0,
            postUnchange:{
                TaskID:'',
                TaskName:'',
                TaskSummary:'',
                TaskNumber:'',
                TaskOwner:'',
                TaskOwnerPhone:'',
                TaskOwnerName:'',
            },
            postdata:{}
        }
    },
    mounted(){
         this.getDealTaskDetail()
    },
    
    methods:{
        handleSubmitAgree(TaskName,TaskSummary){
            //有修改内容
            var obj={
                TaskID:this.taskID,
                TaskName: TaskName,//任务名（UI中的请示事项要点）
                TaskSummary: TaskSummary,//任务概要（UI中的请示事项具体内容）
            }

            if(!(JSON.stringify(this.postUnchange)==JSON.stringify(obj))){
                this.addNewProTaskProcessMod(TaskName,TaskSummary)
            }else{
                this.taskFlowAgree()
            }

        },addNewProTaskProcessMod(TaskName,TaskSummary){
            addNewProTaskProcessMod({
                TaskID:this.taskID,
                TaskName:TaskName,
                TaskSummary:TaskSummary,
                TaskFlowID:this.taskFlowID

            }).then(res=>{
                 if(res.data.code==2311){
                        this.$Message.success({
                            content:"操作成功"
                        })
                    }else{
                        this.$Message.error({
                            content:"操作成功"+res.data.message
                        })
                    }
            })
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
         getDealTaskDetail(){
            getDealTaskDetail({TaskID:this.taskID}).then(res=>{
                if(res.data.code==2303){
                    this.projectID= res.data.project.projectID;
                    this.postdata=toUpperCase(res.data);
                    // this.standPost=toUpperCase(res.data);
                    this.postUnchange={
                        TaskID:this.taskID,//任务类别ID，与TaskTypes表的TaskTypeID对应（开发3/立项4/变动5），取自对应的菜单项
                        TaskName:res.data.taskName,//任务名（UI中的请示事项要点）
                        TaskSummary:res.data.taskSummary,//任务概要（UI中的请示事项具体内容）
                    }
                }else{
                    this.$Message.error({
                        content:'数据加载失败：'+res.data.message
                    })
                }
            })            
        },
        
    }
}
</script>