<template>
<!-- 董事会事宜报告 -->
    <div class="director">
        <Form class="formWrap" :model="formdata" ref="formdata" :label-width="80" :rules="ruleValidate">
           <Row>
               <Col span="12">
                <FormItem label="事项要点" prop="TaskName">
                        <Input v-model="formdata.TaskName" placeholder='请输入事项要点'></Input>
                </FormItem>
               </Col>
               
           </Row>
           <change-tap @getValue="getTapValue"></change-tap>
             <FormItem label="报送人" prop="name">
                <Input v-model="name" disabled placeholder="请输入报送人"></Input>
           </FormItem>
             <FormItem label="联系电话" prop="phone">
                <Input v-model="formdata.phone" placeholder="请输入联系电话"></Input>
           </FormItem>
             <FormItem label="具体内容" prop="TaskSummary">
                <Input v-model="formdata.TaskSummary" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入具体内容"></Input>
           </FormItem>
             <FormItem label="文件列表" v-if="fileName.length>0&&showFile">
                    <p class="fileName" v-for="(item,index) in fileName" >
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

            <FormItem>
               <Button @click="showUploadFile()" style="margin-right: 8px">添加附件</Button>
                 <Button type="primary" :loading="loading" @click="handleSubmit()">
                    <span v-if="!loading">提交</span>
                    <span v-else>提交...</span>
                    
                    
                </Button>
                
        
           </FormItem>

       </Form>

                <upload-files ref="uploadModal"  @handleUploadFileEvent="handleUploadEvent"></upload-files>
    </div>
</template>
<script>
import {operationTaskAdd} from "@/api/user"
import UploadFiles from "@/view/components/upload_file/upload_file"
import changeTap from "@/view/components/template/change_tap.vue"


export default {
    components:{
        UploadFiles,
        changeTap
    },
    mounted(){
        this.formdata.phone=JSON.parse(localStorage.getItem("phone"));
        this.name=JSON.parse(localStorage.getItem("userName"));
        this.formdata.TaskOWner=JSON.parse(localStorage.getItem("userId"));
    },
    data(){
        return{
            formdata:{
                TaskName:'',
                TaskSummary:'',
                TaskTypeID:19,
                phone:'',
                TaskOWner:''
            },
            name:'',
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
            loading:false,
            ruleValidate:{
               TaskName:[
                   { required: true, message: '内容不能为空', trigger: 'blur' }
               ],
               
                phone:[
                   { required: true, message: '内容不能为空', trigger: 'blur' }
               ],
                TaskSummary:[
                   { required: true, message: '内容不能为空', trigger: 'blur' }
               ]
            
            },
            fileModal:false
        }
    },
    methods:{
        handleSubmit(){
            this.$refs["formdata"].validate((val)=>{
                if(val){
                    this.loading=true;
                    operationTaskAdd(this.formdata).then(res=>{
                        setTimeout(()=>{
                            this.loading=false;
                        },2000)
                        if(res.data.code==2001){
                            this.$Message.success("操作成功");
                            this.handleReset();
                        }else{
                            this.$Message.error("操作失败："+res.data.message)
                        }
                    })
                }else{
                    this.$Message.warning("请按照要求填写数据！")
                }
            })
        },
        handleReset(){
             this.formdata["TaskName"]="";
            this.formdata["TaskSummary"]="";
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
        },getTapValue(tap,tapDet){
            console.log(tap,tapDet)
        }

    }
    
}
</script>
<style lang="less" scoped>
    .director{
        background: #fff;
        width: 100%;
        overflow: hidden;
        height: 100%;
        .formWrap{
            width: 90%;
            margin: 30px auto;
        }
    }
</style>