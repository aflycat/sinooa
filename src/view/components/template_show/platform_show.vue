<template>
    <div class="plat_show">
        <Card  class="itemCard">
            <p slot="title">报送信息</p>
            <Form :label-width="80">
                <Row>
                     <Col span="24">
                        <FormItem label="任务编号：">
                            
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="事项要点：">
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="事项标签：">
                            <!-- {{getdata.taskNumber||''}} -->

                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="报送人：">
                          
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="联系电话：">
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="报送内容：">
                        </FormItem>
                    </Col>
                    <Col span="24" v-if="postdata.TaskFiles.length>0" >
                        <FormItem label="报送文件：" >
                            <!-- <p  v-for="(item,index) in postdata.TaskFiles" :key='index'>
                                <a :href="'http://120.78.154.66:8089/taskfiles/'+item.dateFolder+'/'+item.fileName" target="_blank" style="color:#2d8cf0;">
                                    {{item.oldFileName}}
                                </a> 
                                 <Button style="color:#ed4014;" type="text" @click="deleteOriginFile(item.taskFileID,item.oldFileName,index)">删除</Button>
                            </p> -->
                        </FormItem>
                    </Col>
                </Row>
                
            </Form>    
        </Card>   
        <Card  class="itemCard">
            <p slot="title">任务明细</p>
            <Form class="formWrap"  :label-width="120">
                <FormItem  label="权属平台全称:">
                    
                </FormItem>
                <Row>
                    <Col span="12">
                        <FormItem  label="权属平台简称:">
                        </FormItem>
                    </Col>
                
                    <Col span="12">
                        <FormItem label="权属平台代码:">
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem  label="统一社会信用代码:">
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="成立日期:">
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="注册地址:">
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="注册资本:">
                           万元
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="经营范围:">
                        </FormItem>
                    </Col>
                </Row>
                 </Form>
                 <Table :columns="member" :data="memberData">
                   
                </Table>
         </Card>
         <Card  class="itemCard">
            <p slot="title">审批进度</p>
            <Form :label-width="80">
                <!-- <Timeline>
                   
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
                    
                   
                </Timeline> -->
                
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
import returnStep from "@/view/components/template/return_step"
import UploadFiles from "@/view/components/upload_file/upload_file"
export default {
    components:{
        UploadFiles,
        returnStep
    },
    data(){
        return{
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
            loading:true,
            loading2:true,
             member:[
                {title:"人员类型",key:"kind"},
                {title:"人员姓名",key:"name"},
                {title:"持股比例(%)",key:"scale"},
                {title:"认缴金额(万元)",key:"money"},
                {title:"人员性质",key:"nature"},
            ],
            memberData:[],
            postdata:{
                TaskFiles:[]
            }
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
        },
        showReturnModal(){
            this.$refs['stepModal'].showModal(true)
        }
    }

}
</script>
<style scoped lang="less">

</style>