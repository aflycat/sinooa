<template>
    <div class="pro_change">
        <Card class="itemCard">
            <p slot="title">报送人信息</p>
            <Form :label-width="80">
                <Row>
                    <Col span="24">
                        <FormItem label="任务编号：">
                            <b>{{postUnchange.TaskNumber}}</b>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="报送人" prop="name">
                            {{postUnchange.TaskOwnerName}}
                        </FormItem>
                    </Col>
                        <Col span="8">
                        <FormItem label="联系电话" prop="phone">
                            {{postUnchange.TaskOwnerPhone}}
                        </FormItem>   
                    </Col>
                    <!-- <Col span="24" v-if="postdata.TaskFiles.length>0" >
                        <FormItem label="报送文件：" >
                            <p  v-for="(item,index) in postdata.TaskFiles" :key='index'>
                                <a :href="'http://120.78.154.66:8089/taskfiles/'+item.dateFolder+'/'+item.oldFileName" target="_blank" style="color:#2d8cf0;">
                                    {{item.oldFileName}}
                                </a> 
                                <Button style="color:#ed4014;" type="text" @click="deleteOriginFile(item.taskFileID,item.oldFileName,index)">删除</Button>
                            </p>
                        </FormItem>
                    </Col> -->
                </Row>
            </Form>
        </Card>
         </Card>
              <Card class="itemCard">
                <p slot="title">项目选择</p>
               <Form :label-width="80">
                    <Row>
                        <Col span="8">
                           <FormItem label="项目简称" prop="ProjectType">
                                <Select v-model="ProjectVlaue"  disabled>
                                    <Option v-for="item in ProjectData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                      </Row>
                   
                </Form>
            </Card>
            <pro-inform :objId="projectID" :flag="2"></pro-inform>
       
            <Card  class="itemCard">
            <p slot="title">审批意见</p>
            <Form :label-width="80">
                  <FormItem label="事项要点">
                            <Input v-model="postUnchange.TaskName" placeholder="请输入事项要点"></Input>
                        </FormItem>
                        <FormItem label="具体内容" prop="TaskSummary">
                            <Input v-model="postUnchange.TaskSummary" type="textarea" :autosize="{minRows: 10,maxRows: 15}" placeholder="请输入事项的具体内容"></Input>
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
            <upload-files ref="uploadModal"  @handleUploadFileEvent="handleUploadEvent"></upload-files>
   
    </div>
</template>
<script>
// tips
// 需要一个对象存储初始加载时的信息
// 在切换选择的项目简称是，任务编号，报送人，联系电话，事项要点，具体内容不变
// 当提交数据是有更改调用修改并同意
import UploadFiles from "@/view/components/upload_file/upload_file"
import proInform from "@/view/components/template/pro_inform"
import {getDealTaskDetail,getProjectList} from "@/api/data"
import {toUpperCase,orderObj} from "@/libs/tools"
export default {
    components:{
        UploadFiles,
        proInform
    },
    props:{
        taskID:String,
        taskFlowID:String
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
                TaskTypeID:this.taskTypeID,
                TaskName:'',
                TaskSummary:'',
                TaskNumber:'',
                TaskOwner:'',
                TaskOwnerPhone:'',
                TaskOwnerName:'',
            },
            postdata:{

            },
        }
    },
    mounted(){
         this.getProList(2);
         this.getDealTaskDetail()
    },
    
    methods:{
        handleSubmitAgree(){
            //有修改内容
            var obj={
                TaskTypeID:this.taskTypeID,
                TaskName: this.standPost.TaskName,//任务名（UI中的请示事项要点）
                TaskSummary: this.standPost.TaskSummary,//任务概要（UI中的请示事项具体内容）
                TaskNumber: this.standPost.TaskNumber,
                TaskOwnerName: this.standPost.TaskOwnerName,
                TaskOwnerPhone: this.standPost.TaskOwnerPhone,
                TaskOwner: this.standPost.TaskOwner,//
            }

            if(!(JSON.stringify(this.postUnchange)==JSON.stringify(obj))){
                    //普通信息有修改
                     alert('普通信息有修改')
            }else{
                
            }

        },
         getDealTaskDetail(){
            getDealTaskDetail({TaskID:this.taskID}).then(res=>{
                if(res.data.code==2303){
                    this.projectID= res.data.project.projectID;
                    this.postdata=toUpperCase(res.data);
                    this.standPost=toUpperCase(res.data);
                    this.postUnchange={
                        TaskTypeID:this.taskTypeID,//任务类别ID，与TaskTypes表的TaskTypeID对应（开发3/立项4/变动5），取自对应的菜单项
                        TaskName:res.data.taskName,//任务名（UI中的请示事项要点）
                        TaskSummary:res.data.taskSummary,//任务概要（UI中的请示事项具体内容）
                        TaskNumber:res.data.taskNumber,
                        TaskOwnerName:res.data.taskOwnerName,
                        TaskOwnerPhone:res.data.taskOwnerPhone,
                        TaskOwner:res.data.taskOwner,
                    }
                }else{
                    this.$Message.error({
                        content:'数据加载失败：'+res.data.message
                    })
                }
            })            
        },
         getProList(status){
                //获取项目列表
                getProjectList({"ProjectStatus":2,"USerID":JSON.parse(localStorage.getItem("userId"))}).then(res=>{
                    if(res.data.code==2307){
                        res.data.projectList.forEach(element => {
                            this.ProjectData.push({
                                label:element.clientCode+'--'+element.projectType+'--'+element.projectRole,
                                value:element.projectID
                            })
                        });
                    }else{
                        this.$Message.error({
                            content:'项目列表数据加载失败：'+res.data.message
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
        }
    }
}
</script>