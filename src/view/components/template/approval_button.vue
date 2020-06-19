<template>
    <div>
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

                    <Col span="24">
                        <FormItem>
                            <Button v-if='flowRequire<1001' @click="showUploadFile()" style="margin-right: 8px">添加附件</Button>
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
                    </Col>
                    <Col span="24">
                        <FormItem label="文件列表" v-if="fileName.length>0">
                                <p class="fileName" v-for="(item,index) in fileName" :key='index'>
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
                </Row>
            </Form>    
        </Card>  
        <upload-files ref="uploadModal"  @handleUploadFileEvent="handleUploadEvent" :key='flag'></upload-files>
        <return-step  ref="stepModal" :taskFlows="taskFlows" :TaskFlowID="TaskFlowID"></return-step>
    </div>
</template>
<script>
import UploadFiles from "@/view/components/upload_file/upload_file"
import returnStep from  "@/view/components/template/return_step"
import {taskFlowAgree,taskFlowDisagree,uploadFile} from "@/api/data"

export default {
    components:{
        UploadFiles,
        returnStep 
    },
    props:{
        flowRequire:String,
        taskFlows:Array,
        TaskID:String,
        TaskFlowID:String,

    },watch:{
        fileName(){
            this.flag++
        }
    },
    data(){
        return{
            flag:0,
            loading:false,
            loading2:false,
            FlowComment:'',
             fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
        }
    },methods:{

        easzyInput(val){
            this.FlowComment=val;
        },handleSubmitAgree(){
            taskFlowAgree({TaskID:this.TaskID,TaskFlowID:this.TaskFlowID,FlowComment:this.FlowComment}).then(res=>{
                if(res.data.code==2022){
                    this.$Message.success({
                        content:'操作成功'
                    })

                    
                }else{
                    this.$Message.success({
                        content:'操作失败：'+res.data.message
                    })
                }
            })
            if(this.fileName.length>0){
                this.uploadFile();
            }



        },
        handleSubmitDisgree(){
            taskFlowDisagree({TaskID:this.TaskID,TaskFlowID:this.TaskFlowID,FlowComment:this.FlowComment}).then(res=>{
                if(res.data.code==2024){
                    this.$Message.success({
                        content:'操作成功'
                    })
                }else{
                    this.$Message.success({
                        content:'操作失败：'+res.data.message
                    })
                }
            })

        },uploadFile(){
            this.fileForm.append('TaskID',this.TaskID)
            this.fileForm.append('TaskFlowID',this.TaskFlowID)
            this.fileForm.append('FileTypeID',this.fileWrap[0].type) 
            this.fileWrap.forEach(element=>{
                this.fileForm.append('TaskFiles',element.file)
            })
            uploadFile(this.fileForm).then(res=>{
                if(res.data.code==2032&&res.data.taskFiles.length>0){
                    this.$Message.success({
                        content:'文件上传成功'
                    })
                }else{
                    this.$Message.error({
                        content:'文件上传失败:'+res.data.message
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
        },  
        showUploadFile(){
            this.$refs.uploadModal.showModal(true);
        },showReturnModal(){
            this.$refs['stepModal'].showModal(true)
        }
    }
}
</script>

