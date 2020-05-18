<template>
<!-- 总经理 -->
    <div class="manager">
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
                <p slot="title">权属平台选择</p>
                <Form :label-width="100">
                    <Row>
                          <Col span="8">
                            <FormItem label="权属平台" >
                                
                                <Select v-model="postdata.PlatformID"   filterable label-in-value  placeholder="请选择权属平台">
                                    <Option v-for="(item,index) in platformList"  :value="item.platformID" :key="index">{{ item.shortName }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                      </Row>
                   
                </Form>
            </Card>
        <Card  class="itemCard">
                <p slot="title">请示信息</p>
                <Form :label-width="80">
                    <FormItem label="事项要点">
                        <Input v-model="postdata.TaskName" placeholder="请输入事项要点"></Input>
                    </FormItem>
                    <FormItem label="具体内容" >
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
                        <Button type="primary" :loading="loading" @click="handleSubmit('formValidate')">

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
import store from '@/store'
// import {operationTaskAdd,uploadFile} from "@/api/user"
import {getPlatform,addNewPlatformMeet} from "@/api/data"
import UploadFiles from "@/view/components/upload_file/upload_file"

import {TaskTypeID} from "@/libs/data"
export default {
    name:'manager',
    components:{
        UploadFiles,
    },
    mounted(){
        // this.fileModal=true;
        this.name=JSON.parse(localStorage.getItem("userName"));
        this.phone=JSON.parse(localStorage.getItem("phone"));
        this.postdata.TaskOWner=JSON.parse(localStorage.getItem("userId"));
        this.getPlatform();
    },
    data(){
        return{
            loading:false,
            phone:'',
            name:'',
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
            showFile:false,
            fileModal:false,
            platformList:[],
            postdata:{
                TaskTypeID:TaskTypeID.general,
                TaskName:'',
                TaskSummary:'',
                TaskOWner:'',
                PlatformID:''
            }
        }
    },methods:{
        handleSubmit(){
            addNewPlatformMeet(this.postdata).then(res=>{
                if(res.data.code==2107){    
                    this.$Message.success({
                        content:'操作成功'
                    })
                }else{
                     this.$Message.error({
                        content:'操作失败:'+res.data.message
                    })
                }
            })
      
        },getPlatform(){
            getPlatform({'PlatStatus':1,'USerID':JSON.parse(localStorage.getItem("userId"))}).then(res=>{
                if(res.data.code==2105){
                    this.platformList=res.data.platList;
                }else{
                     this.$Message.error({
                        content:"权属平台信息加载失败:"+res.data.message
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
        },getTapValue(tap,tapDet){
            console.log(tap,tapDet)
        }
    }
}
</script>
<style lang="less" scoped>
  
    .fileList{
        margin-bottom: 25px !important;
    }
     .fileName{
        // padding-left: 20px;
        ivu-col{
            padding-left: 20px !important;
        }
     }
    .fileName:hover{
        background: #eee;
    }
</style>