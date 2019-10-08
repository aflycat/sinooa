<template>
<!-- 自设流程事宜报告 -->
    <div class="custom">
       <Form class="formWrap"  ref="formdata" :label-width="80" :rules="ruleValidate">
           <Row>
               <Col span="12">
                <FormItem label="事项要点" prop="TaskName">
                        <Input v-model="formdata.TaskName" placeholder='请输入事项要点'></Input>
                </FormItem>
               </Col>
               <Col span="12">
                <FormItem label="事项标签" >
                        <Input  placeholder='请选择事项标签'></Input>
                </FormItem>
               </Col>
           </Row>

             <FormItem label="报送人"  prop="name">
                <Input v-model="name" disabled placeholder="请输入报送人"></Input>
           </FormItem>

             <FormItem label="联系电话" prop="phone">
                <Input v-model="formdata.phone" placeholder="请输入联系电话"></Input>
           </FormItem>

             <FormItem label="具体内容" prop="TaskSummary">
                <Input v-model="formdata.TaskSummary" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入具体内容"></Input>
           </FormItem>
            
            <FormItem label="流程设置" >
                <Table :columns="columnsProcess" :data="dataProcess" style="overflow:visible;"></Table>
                <Button  style="margin-top: 24px" type="success" @click="showProcess()">新增流程</Button>
                <Button v-if="dataProcess.length!=0" style="margin-top: 24px;margin-left:8px;" type="primary" >存为模板</Button>
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
                <Button type="primary" @click="handleSubmit()">提交</Button>        
           </FormItem>
       </Form>
        <upload-files ref="uploadModal"  @handleUploadFileEvent="handleUploadEvent"></upload-files>
        <process-basic ref="processBasic"></process-basic>
    </div>
</template>
<script>
import UploadFiles from "@/view/components/upload_file/upload_file"
import processBasic from "@/view/components/template/process_basic"
export default {
     components:{
        UploadFiles,
        processBasic
    },
    data(){
        
      return{
            formdata:{
                TaskName:'',
                TaskSummary:'',
                TaskTypeID:16,
                TaskOWner:'',
                phone:"",
            },
            name:'',
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),

            columnsProcess:[
                {title:"序号",key:"name"},
                {title:"任务流描述",key:"name"},
                {title:"处理要求",key:"req" },
                {title:"时间",key:"time"},
                {title:"处理人",key:"man"},
                {title:"处理组",key:"team",},
                {title:"操作",key:"deal"}
            ],
            dataProcess:[],
            ruleValidate:{
               TaskName:[
                   { required: true, message: '内容不能为空', trigger: 'blur' }
               ],
                name:[
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

    },methods:{
        
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
        },showProcess(){
             this.$refs["processBasic"].showModal(true);
        }
    }
}
</script>
<style lang="less" scoped>
    .custom{
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