<template>
    <div class="dep_show">
        <Card  class="itemCard">
            <p slot="title">任务明细</p>
            <Form :label-width="80">
                <Row>
                     <Col span="24">
                        <FormItem label="任务编号：">
                            <b> {{postdata.TaskNumber}}</b>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="事项要点：">
                            <b>{{postdata.TaskName}}</b>
                        </FormItem>
                    </Col>
                   
                    <Col span="12">
                        <FormItem label="报送人：">
                            <b>{{postdata.TaskOwnerName}}</b>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="联系电话：">
                           <b>{{ postdata.TaskOwnerPhone}}</b>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="报送内容：">
                           <b> {{postdata.TaskSummary}}</b>
                        </FormItem>
                    </Col>
                    <Col span="24" v-if="postdata.TaskFiles.length>0" >
                        <FormItem label="报送文件：" >
                            <p  v-for="(item,index) in postdata.TaskFiles" :key='index'>
                                <a :href="'http://120.78.154.66:8089/taskfiles/'+item.dateFolder+'/'+item.fileName" target="_blank" style="color:#2d8cf0;">
                                    {{item.oldFileName}}
                                </a> 
                                 <Button style="color:#ed4014;" type="text" @click="deleteOriginFile(item.taskFileID,item.oldFileName,index)">删除</Button>
                            </p>
                        </FormItem>
                    </Col>
                </Row>
                 </Form>    
        </Card>
        <Card  class="itemCard">
            <p slot="title">任务明细</p>
                <Form class="formWrap"  :label-width="120">
                    
                        <FormItem  label="部门全称:">
                           {{postdata.Department.DeptName}}
                        </FormItem>
                        <Row>
                            <Col span="12">
                                <FormItem  label="权属平台:">
                                   
                                </FormItem>
                            </Col>
                        
                            <Col span="12">
                                <FormItem label="部门代码:">
                                   {{postdata.Department.DeptCode}}
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem  label="部门经理:">
                                    {{mannager}}
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="部门副经理:">
                                    {{deputyManager}}
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem label="部门员工:">
                                    {{member.toString()}}
                                </FormItem>
                            </Col>
                            
                        </Row>
                    </Form>
                
         </Card>
         <Card  class="itemCard">
            <p slot="title">审批进度</p>
            <Form :label-width="80">
                <Timeline>
                   
                    <template v-for="(item,index) in postdata.TaskFlows">

                        <TimelineItem  :color="item.flowStatus==1?'#19be6b':'#515a6e'"  :key="index">
                            <p >{{item.flowDoneDate.replace("T"," ").substr(0,16)}}   <Divider type="vertical" />
                                {{item.flowSummary}}  <Divider type="vertical" />
                                {{item.flowOwnerName}} <Divider type="vertical" />
                                 {{item.flowEmail}}
                            </p>

                            <p class="content">{{item.flowComment||''}}</p>
                        </TimelineItem>
                    </template>
                    
                   
                </Timeline>
                
            </Form>    
        </Card>
        <Card  class="itemCard">
            <p slot="title">审批意见</p>
            <Form :label-width="80">
                  <Row>
                    <Col span="24">
                        <FormItem label="审批意见">
                            <Input  type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入具体内容"></Input>
                        </FormItem>
                    </Col>
                    <Col span="24">
                    <FormItem label="文件列表" v-if="fileName.length>0&&showFile">
                                <p class="fileName" v-for="(item,index) in fileName" :key="index">
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
                    <Col span="24">
                        <FormItem label=" ">
                            <Button @click="showUploadFile()" style="margin-right: 8px">添加附件</Button>
                            <Button style="margin-right: 8px" type="primary" :loading="loading"  @click="handleSubmit()">
                                <span v-if="!loading">同意</span>
                                <span v-else>提交中...</span>
                            </Button> 
                            <Button @click="showReturnModal"  style="margin-right: 8px" type="warning">修改</Button>  
                            <Button :loading="loading2"  style="margin-right: 8px" type="error">
                                <span v-if="!loading">驳回</span>
                                <span v-else>提交中...</span>
                                
                            </Button> 
                        </FormItem>
                    </Col>
                </Row>
            </Form>    
        </Card>    
        <upload-files ref="uploadModal"  @handleUploadFileEvent="handleUploadEvent"></upload-files>
    </div>
</template>
<script>
import UploadFiles from "@/view/components/upload_file/upload_file"
import {getDepartmentTaskInfor} from "@/api/data"

export default {
   components:{
        UploadFiles,
    },
    props:{
        taskFlowID:String,
        taskID:String,
        taskTypeID:String
    },
    data(){
        return{
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
            loading:false,
            loading2:false,
            mannager:'',
            deputyManager:'',
            member:[],
            postdata:{
                TaskFiles:[],
                TaskTypeID:'',
                TaskName:"",
                TaskSummary:"",
                TaskOwner:"",
                Department:{
                    DepartmentID:0,
                    PlatformID:"",
                    DeptName:"",
                    OpenDate:"",
                    CloseDate:"",
                    DeptStatus:1,
                    DeptCode:"",
                    DeptStatus:1,
                    Members:[]

                }
            }
        }
    },mounted(){
        this.getDepartmentTaskInfor()
    },methods:{
          getDepartmentTaskInfor(){
            getDepartmentTaskInfor({TaskID:this.taskID}).then(res=>{
                if(res.data.code==2203){
                    this.postdata={
                        TaskFiles:res.data.taskFiles,
                        TaskTypeID:res.data.taskTypeID,
                        TaskName:res.data.taskName,
                        TaskSummary:res.data.taskSummary,
                        TaskNumber:res.data.taskNumber,
                        TaskOwner:res.data.taskOwner,
                        TaskOwnerPhone:res.data.taskOwnerPhone,
                        TaskOwnerName:res.data.taskOwnerName,
                        TaskFlows:res.data.taskFlows,
                        Department:{
                            DepartmentID:res.data.department.departmentID,
                            PlatformID:res.data.department.platformID,
                            DeptName:res.data.department.deptName,
                            OpenDate:res.data.department.openDate,
                            CloseDate:res.data.department.closeDate,
                            DeptStatus:res.data.department.deptStatus,
                            DeptCode:res.data.department.deptCode,
                            DeptStatus:res.data.department.deptStatus,
                            Members:res.data.department.members
                        }
                    }
                      res.data.department.members.forEach(element => {
                        switch (element.memberType){
                            case 21:
                                //部门经理
                                this.mannager=element.memberName

                            break;
                            case 22:
                                //部门副经理
                                this.deputyManager=element.memberName
                            break;
                            case 23:
                                //成员
                                this.member.push(element.memberName)
                            break;


                        }
                    });
                    this.getPlatform(this.depDeatil.department.platformID)
                }else{
                    this.$Message.error({
                        content:'数据加载失败:'+res.data.message
                    })
                }
            })
        },
         getPlatform(id){
            geAllPlatformDetail({PlatformID:id}).then(res=>{
                
                if(res.data.code==2106){
                    this.platformName=res.data.platform.platName;

                }else{
                    this.$Message.error("权属平台信息查询失败:"+res.data.message)
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
        showReturnModal(){
            this.$refs['stepModal'].showModal(true)
        }
    }
}
</script>
<style scoped lang="less">

</style>