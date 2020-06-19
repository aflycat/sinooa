<template>
    <div  v-if="fileList.length>0">
        <Card  class="itemCard">
            <p slot="title">报送文件</p>
            <Form :label-width="80">
                
                <Row>
                    <Col span="24" >
                        <FormItem label="文件列表：" >
                            <p  v-for="(item,index) in fileList" :key='index'>
                                <span class="download" style='color:#3498db;cursor:pointer;' @click='downloadFile(item.dateFolder,item.fileName)'>{{item.fileNumber}}&nbsp;&nbsp;{{item.oldFileName}}</span> 
                                &nbsp;&nbsp;
                                <a :href="'http://120.78.154.66:8189//onlinePreview?url=http://120.78.154.66:8089/taskfiles/'+item.dateFolder+'/'+item.fileName" target="_blank" style="color:#2d8cf0;">
                                    预览
                                </a> 
                                &nbsp;&nbsp;
                                <span v-if='flowRequire<=100&&flowRequire>0'  style='color:#ff9900;cursor:pointer;'  @click="changeFile(index)">修改</span>
                                &nbsp;&nbsp;
                                <span v-if='flowRequire<=100'  style='color:#ed4014;cursor:pointer;'  @click="deleteOriginFile(item.taskFileID,item.oldFileName,index,0)">删除</span>
                            </p>
                        </FormItem>
                    </Col>
                    <Col span="24"   v-if="fileListChange.length>0">
                        <FormItem label="修改文件：">
                            <p  v-for="(item,index) in fileListChange" :key='index'>
                                <span class="download" style='color:#3498db;cursor:pointer;' @click='downloadFile(item.dateFolder,item.fileName)'>{{item.fileNumber}}&nbsp;&nbsp;{{item.oldFileName}}</span> 
                                &nbsp;&nbsp;
                                <a :href="'http://120.78.154.66:8189//onlinePreview?url=http://120.78.154.66:8089/taskfiles/'+item.dateFolder+'/'+item.fileName" target="_blank" style="color:#2d8cf0;">
                                    预览
                                </a> 
                                &nbsp;&nbsp;
                                <span  style='color:#ed4014;cursor:pointer;'  @click="deleteOriginFile(item.taskFileID,item.oldFileName,index,1)">删除</span>
                            </p>
                        </FormItem>
                    </Col>
                </Row>
            </Form>    
        </Card>
        <upload-files ref="uploadModal"  @handleUploadFileEvent="handleUploadEvent" :key='flag'></upload-files>
    </div>
</template>
<script>
import UploadFiles from "@/view/components/upload_file/upload_file"
import {deleteTaskFile,changeTaskFile,uploadFile} from "@/api/data"
import taskFile  from "@/view/components/template/task_file_show"
export default {
    components:{
        UploadFiles,
        taskFile
    },
    props:{
        fileList:{
            type:Array,
            default:function () {
                return []
            }
        },
        flowRequire:String
    },
    data(){
        return{
            flag:0,
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
            fileListChange:[],
            edictIndex:0
        }
    },watch:{
        fileName(){
            this.flag++
        }
    },
    methods:{
        deleteOriginFile(taskFileID,oldFileName,index,type){
            this.$Modal.confirm({
                title:'删除',
                content:'是否删除文件：'+oldFileName,
                onOk:()=>{
                    deleteTaskFile({TaskFileID:taskFileID}).then(res=>{
                        if(res.data.code==2033){
                            if(type==0){
                                 this.fileList.splice(index,1)
                            }else{
                                this.fileListChange.splice(index,1)
                            }
                           

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
        downloadFile(dateFolder,fileName){
             window.open('http://120.78.154.66:8089/taskfiles/'+dateFolder+'/'+fileName)
        },
        changeFile(index){
            this.edictIndex=index;
            this.$refs.uploadModal.showModal(true);
        },
        handleUploadEvent(flag,filename,fileWrap){
            // this.fileModal=flag;
            if(filename){
                 this.fileName=filename;
            }
            if(fileWrap){
                this.fileWrap=fileWrap;
            }
            this.changeTaskFile()
            // this.showFile=true;
        },
        changeTaskFile(){
            var dat=this.fileList[this.edictIndex]
            this.fileForm.append('TaskID',dat.taskID)
            this.fileForm.append('TaskFlowID',dat.taskFlowID)
            this.fileForm.append('TaskFileID',dat.taskFileID)
            this.fileForm.append('OldFileName',dat.oldFileName)
            this.fileWrap.forEach(element=>{
                this.fileForm.append('TaskFiles',element.file)
            })
            changeTaskFile(this.fileForm).then(res=>{
                if(res.data.code==2034){
                    this.$Message.success({
                        content:'文件上传成功'
                    })
                    this.fileListChange.push({
                        dateFolder:res.data.dateFolder,
                        fileName:res.data.fileName,
                        fileNumber:res.data.fileNumber,
                        oldFileName:res.data.oldFileName,
                        taskFileID:res.data.taskFileID,
                    })
                }else{
                    this.$Message.error({
                        content:'文件上传失败:'+res.data.message
                    })
                }
            })


        }

    }
}
</script>
<style  lang='less'>
    .download{
        &:hover{
           text-decoration:underline;
        }
    }
</style>