<template>
    <div class="plat_show">
        <Card  class="itemCard">
            <p slot="title">报送信息</p>
            <Form :label-width="80">
                <Row>
                     <Col span="24">
                        <FormItem label="任务编号：">
                           <b> {{postdata.TaskNumber}}</b>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="事项要点：">
                            <b> {{postdata.TaskName}}</b>
                        </FormItem>
                    </Col>
                  
                    <Col span="12">
                        <FormItem label="报送人：">
                          <b> {{postdata.TaskOwner}}</b>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="联系电话：">
                            <b> {{postdata.TaskOwnerPhone}}</b>
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
                <FormItem  label="权属平台全称:">
                     <b>{{postdata.Platform.PlatName}}</b>
                </FormItem>
                <Row>
                    <Col span="12">
                        <FormItem  label="权属平台简称:">
                            <b>{{postdata.Platform.ShortName}}</b>
                        </FormItem>
                    </Col>
                
                    <Col span="12">
                        <FormItem label="权属平台代码:">
                             <b>{{postdata.Platform.PlatCode}}</b>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem  label="统一社会信用代码:">
                             <b>{{postdata.Platform.CodsCode}}</b>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="成立日期:">
                             <b>{{postdata.Platform.OpenDate.substr(0,10)}}</b>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="注册地址:">
                             <b>{{postdata.Platform.Address}}</b>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="注册资本:">
                            <b>{{postdata.Platform.RegisteredCapital}}</b>万元
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="经营范围:">
                             <b>{{postdata.Platform.OperateScope}}</b>
                        </FormItem>
                    </Col>
                </Row>
                 </Form>
                 <Table :columns="member" :data="memberData"></Table>
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
        <!-- <return-step ref='stepModal' :taskFlowID="taskFlowID" :taskFlows="taskFlows" :FlowComment="FlowComment" :taskID="taskID"></return-step> -->
    </div>
</template>
<script>
import {getPlatformTaskDetail} from "@/api/data"
import returnStep from "@/view/components/template/return_step"
import UploadFiles from "@/view/components/upload_file/upload_file"
import {platformMemberType,paltformMemberStatus} from "@/libs/data"
export default {
    components:{
        UploadFiles,
        returnStep
    },props:{
        taskFlowID:String,
        taskID:String,
        taskTypeID:String
    },
    mounted(){
        this.getPlatformTaskDetail()
    },
    data(){
        return{
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
            loading:false,
            loading2:false,
             member:[
                {title:"人员类型",key:"kind"},
                {title:"人员姓名",key:"name"},
                {title:"持股比例(%)",key:"scale"},
                {title:"认缴金额(万元)",key:"money"},
                {title:"人员性质",key:"nature"},
            ],
            memberData:[],
            postdata:{
                TaskFiles:[],
                TaskNumber:'',
                TaskFlows:[],
                Platform:{
                  PlatformID:"0",//新增为0
                    PlatName:'',//全称
                    ShortName:'',//简称
                    PlatCode:'',//代码
                    CodsCode:'',//社会信用代码
                    OpenDate:'',//成立时间
                    Address:'',//注册地址
                    RegisteredCapital:0,//注册资本
                    OperateScope:'',//经营范围
                    PlatStatus:1,//1，0为历史2表示生效
                    Members:[ ]
                }

            }
        }
    },methods:{
        getPlatformTaskDetail(){
            getPlatformTaskDetail({TaskID:this.taskID}).then(res=>{
                if(res.data.code==2103){
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
                        Platform:{
                            PlatformID:res.data.platform.platformID,//新增为0
                            PlatName:res.data.platform.platName,//全称
                            ShortName:res.data.platform.shortName,//简称
                            PlatCode:res.data.platform.platCode,//代码
                            CodsCode:res.data.platform.codsCode,//社会信用代码
                            OpenDate:res.data.platform.openDate,//成立时间
                            Address:res.data.platform.address,//注册地址
                            RegisteredCapital:res.data.platform.registeredCapital,//注册资本
                            OperateScope:res.data.platform.operateScope,//经营范围
                            PlatStatus:res.data.platform.platStatus,
                            Members:res.data.platform.members
                        }
                    }
                    this.loadMember(res.data.platform.members)
                }else{
                    this.$Message.error({
                        content:'数据加载失败'
                    })
                }
            })
        },
        loadMember(dat){
            dat.forEach(element => {
                this.memberData.push({
                    kind:platformMemberType[element.memberType],
                    name:element.memberName,
                    scale:element.shareRate,
                    money:element.subscription,
                    nature:paltformMemberStatus[element.status] 
                })
            });
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
        },
        showUploadFile(){
            this.$refs.uploadModal.showModal(true);
        }
        
    }

}
</script>
<style scoped lang="less">

</style>