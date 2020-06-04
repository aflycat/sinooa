<template>
    <div class="dynamic">
        <Card class="itemCard">
            <p slot="title">报送人信息</p>
            <Form :label-width="80">
                <Row>
                    <Col span="8">
                        <FormItem label="报送人" prop="name">
                            {{name}}
                        </FormItem>
                    </Col>
                        <Col span="8">
                        <FormItem label="联系电话" prop="phone">
                             {{phone}}
                        </FormItem>   
                    </Col>
                </Row>
                
            </Form>
        </Card>
         <Card class="itemCard">
                <p slot="title">流程选择</p>
               <Form :label-width="80">
                    <Row>
                        <Col span="8">
                           <FormItem label="流程名称" prop="ProjectType">
                                <Select v-model="process" filterable  @on-change="selectProDetail">
                                    <Option v-for="item in processList" :value="item.taskTypeID" :key="item.taskTypeID">{{ item.typeName }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                      </Row>
                   
                </Form>
        </Card>
        <Card class="itemCard">
                <p slot="title">流程信息</p>
                <Row>
                    <component-show   v-for="(item,index) in tableData" :index="index" :obj="item" :key="index"></component-show >
                </Row>
        </Card>
        <Card  class="itemCard">
                <p slot="title">请示信息</p>
                <Form :label-width="80">
                    <FormItem label="事项要点" prop="TaskName">
                        <Input v-model="postdata.TaskName" placeholder="请输入事项要点"></Input>
                    </FormItem>
                    <FormItem label="具体内容" prop="TaskSummary">
                        <Input v-model="postdata.TaskSummary" type="textarea" :autosize="{minRows: 10,maxRows: 15}" placeholder="请输入事项的具体内容"></Input>
                    </FormItem>
                     <FormItem label="文件列表" v-if="fileName.length>0&&showFile">
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
                     <FormItem>
                        <Button @click="showUploadFile()" style="margin-right: 8px">添加附件</Button>
                       <Button type="primary" :loading="loading" @click="handleSubmit()">

                             <span v-if="!loading">提交</span>
                            <span v-else>提交中...</span>
                            
                        </Button>
                       
                    </FormItem>
                </Form>   

            </Card>
            <upload-files ref="uploadModal"  @handleUploadFileEvent="handleUploadEvent"></upload-files>

    </div>
</template>
<script>
import UploadFiles from "@/view/components/upload_file/upload_file"
import componentShow from "@/view/components/define/componentShow.vue"
import {
    getAllListquery,//获取该父节点下的所有节点
    getListDetail//获取该节点的详细信息
} from '@/api/data'
export default {
    components:{
        UploadFiles,
        componentShow
    },data(){
        return{
            loading:false,
            name:'',
            phone:'',
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
            tableData:[],
            processList:[],
            process:'',
            postdata:{
                TaskName:'',
                TaskSummary:''
            }
        }
    },mounted(){
        this.name=JSON.parse(localStorage.getItem("userName"));
        this.phone=JSON.parse(localStorage.getItem("phone"));
        this.getAllListquery();
    },
    methods:{
        handleSubmit(){
            console.log(this.tableData)
        },
        getAllListquery(){
            getAllListquery({'FatherTypeID':'49'}).then(res=>{
                if(res.data.code==2001){
                    this.processList=res.data.taskTypeList;
                }else{
                    this.$Message.error({
                        content:'流程列表获取失败：'+res.data.message
                    })
                }
            })
        },
        selectProDetail(){
            getListDetail({TaskTypeID:this.process}).then(res=>{
                if(res.data.code==2003){

                    this.tableData=JSON.parse(res.data.metadata)

                }else{
                    this.$Message.error({
                        content:'信息获取失败：'+res.data.message
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
                this.showFile=true;
            },showUploadFile(){
                //显示modal
                this.$refs["uploadModal"].showModal(true);
            }
    }
}
</script>