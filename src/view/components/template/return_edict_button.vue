<template>
    <div>
        <Card  class="itemCard">
                <p slot="title">请示信息</p>
                <Form :label-width="80">
                        <FormItem label="事项要点">
                            <Input v-model="TaskStr.TaskName" placeholder="请输入事项要点"></Input>
                        </FormItem>
                        <FormItem label="具体内容">
                            <Input v-model="TaskStr.TaskSummary" type="textarea" :autosize="{minRows: 10,maxRows: 15}" placeholder="请输入事项的具体内容"></Input>
                        </FormItem>

                     <FormItem label="文件列表" v-if="fileList.length>0">
                                <p  v-for="(item,index) in fileList" :key='index'>
                                    <span class="download" style='color:#3498db;cursor:pointer;' @click='downloadFile(item.dateFolder,item.fileName)'>{{item.fileNumber}}&nbsp;&nbsp;{{item.oldFileName}}</span> 
                                    &nbsp;&nbsp;
                                    <a :href="'http://120.78.154.66:8189//onlinePreview?url=http://120.78.154.66:8089/taskfiles/'+item.dateFolder+'/'+item.fileName" target="_blank" style="color:#2d8cf0;">
                                        预览
                                    </a> 
                                   
                                    &nbsp;&nbsp;
                                    <span   style='color:#ed4014;cursor:pointer;'  @click="deleteOriginFile(item.taskFileID,item.oldFileName,index)">删除</span>
                                </p>
                    </FormItem>

                     <FormItem>
                         <Button @click="showUploadFile()" style="margin-right: 8px">添加附件</Button>
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
          <upload-files ref="uploadModal"  @handleUploadFileEvent="handleUploadEvent" :key='flag'></upload-files>
    </div>
</template>
<script>
import UploadFiles from "@/view/components/upload_file/upload_file"
import {deleteTaskFile,uploadFile,taskFlowDisagree} from "@/api/data"
export default {
    props:{
        TaskStr:Object,
        // TaskName:String,
        // TaskSummary:String,
        TaskID:String,
        TaskFlowID:String,
    },
    components:{
        UploadFiles
    },
    watch:{
        fileName(){
            this.flag++
        }
    },
    data(){
        return{
            loading:false,
            loading2:false,
            flag:0,
            fileList:[],
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
         

        }
    },
    methods:{

        handleSubmitAgree(){
          
            this.$emit('handle-submit-agree',this.TaskStr.TaskName,this.TaskStr.TaskSummary)

        },
        handleSubmitDisgree(){
            taskFlowDisagree({TaskID:this.TaskID, TaskFlowID:this.TaskFlowID, FlowComment:'放弃编辑'}).then(res=>{
                if(res.data.code==2024){
                    this.$Message.success({
                        content:'操作成功'
                    })
                }else{
                     this.$Message.success({
                        content:'操作失败:'+res.data.code
                    })
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
            this.uploadFile()
        },uploadFile(){
            this.fileForm.append('TaskID',this.TaskID);
            this.fileForm.append('TaskFlowID',this.TaskFlowID);
            this.fileForm.append('FileTypeID',this.fileWrap[0].type);
            this.fileWrap.forEach(element=>{
                this.fileForm.append('TaskFiles',element.file)
            })
            uploadFile(this.fileForm).then(res=>{
                if(res.data.code==2032&&res.data.taskFiles.length>0){
                    res.data.taskFiles.forEach(element=>{
                        this.fileList.push({
                            dateFolder:element.dateFolder,
                            fileName:element.fileName,
                            fileNumber:element.fileNumber,
                            oldFileName:element.oldFileName,
                            taskFileID:element.taskFileID,
                        })
                    })
                    
                    this.$Message.success({
                        content:'文件上传成功'
                    })

                }else{
                    this.$Message.error({
                        content:'文件上传失败:'+res.data.message
                    })
                }
            })
        },deleteOriginFile(taskFileID,oldFileName,index){
            this.$Modal.confirm({
                title:'删除',
                content:'是否删除文件：'+oldFileName,
                onOk:()=>{
                    deleteTaskFile({TaskFileID:taskFileID}).then(res=>{
                        if(res.data.code==2033){
                          
                            this.fileList.splice(index,1)
                           
                            this.$Message.success({
                                content:"删除成功"
                            })
                        }else{
                            this.$Message.error({
                                content:"删除失败："+res.data.message
                            })
                        }
                    })
                }
            })
        },
        showUploadFile(){
            //显示modal
            this.$refs["uploadModal"].showModal(true);
        }
    }
}
</script>
<style scoped>

</style>