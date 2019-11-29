<template>
    <div class="cost_wage">
        <Card  class="itemCard">
            <p slot="title">任务明细</p>
            <Form :label-width="80">
                <Row>
                     <Col span="24">
                        <FormItem label="任务编号：">
                            {{postdata.TaskNumber}}
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="事项要点：">
                             <Input v-model="postdata.TaskName" placeholder='请输入事项要点'></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="事项标签：">
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="申请人：">
                            {{postdata.TaskOwnerName}}
                        </FormItem>
                    </Col>
                    <!-- <Col span="12">
                        <FormItem label="联系电话：">
                             <Input v-model="postdata.TaskOwnerPhone" type="text"  placeholder="请输入联系电话："></Input>
                        </FormItem>
                    </Col> -->
                     <Col span="24">
                        <FormItem label="报送内容：">
                             <Input v-model="postdata.TaskSummary" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入具体内容"></Input>
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
         <Card class="itemCard">
                <p slot="title">人员列表</p>
                <p style="margin:10px 0;">
                    <Button type="primary" style="margin-right:8px;" @click="handleSubmit('formValidate')">导入</Button>
                    <Button type="primary" @click="handleSubmit('formValidate')">模板下载</Button>
                </p>
               

                <Table border ref="selection" :columns="wagecolumns" :data="wagedata"></Table>
                

                <p style="margin-top:20px;"><Button type="primary" @click="handleSubmit('formValidate')">导出</Button></p>
                
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
import uploadFiles from "@/view/components/upload_file/upload_file"
import {getIncoexpeTask} from "@/api/data"
export default {
    name:'costWage',
    components:{
       uploadFiles
    },
     props:{
       taskFlowID:String,
        taskID:String,
        taskTypeID:String

    },
    data(){
        return{

        }
    }
}
</script>