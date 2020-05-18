
<template>
    <div class="agreement">
        <!-- 业务协议 -->
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
        </Card>
              <Card class="itemCard">
                <p slot="title">项目选择</p>
               <Form :label-width="80">
                    <Row>
                        <Col span="8">
                           <FormItem label="项目简称" prop="ProjectType">
                                <Select v-model="ProjectVlaue" filterable  @on-change="selectProDetail">
                                    <Option v-for="item in ProjectData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                      </Row>
                   
                </Form>
            </Card>
            <pro-inform :objId="objId" :flag="2"></pro-inform>
       
             <Card  class="itemCard">
                <p slot="title">请示信息</p>
                <Form :label-width="80">
                    <FormItem label="事项要点" prop="TaskName">
                        <Input v-model="submitData.TaskName" placeholder="请输入事项要点"></Input>
                    </FormItem>
                    <FormItem label="具体内容" prop="TaskSummary">
                        <Input v-model="submitData.TaskSummary" type="textarea" :autosize="{minRows: 10,maxRows: 15}" placeholder="请输入事项的具体内容"></Input>
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
import store from "@/store"
import {getprogectType,getprogectRole,getuserList,
getCityList,getIndustryList,
getProjectList,getProjectDetail,
addNewProTaskProcess
} from "@/api/data"
import {TaskTypeID} from "@/libs/data"

import UploadFiles from "@/view/components/upload_file/upload_file"
import proInform from "@/view/components/template/pro_inform"
export default {
    components:{
        UploadFiles,
        proInform
    },
    data(){
        return{
            loading:false,
            name:'',
            phone:'',
            ProjectData:[],
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
            ProjectVlaue:0,
            objId:0,
            postdata:{

            },
            submitData:{
                    TaskTypeID:TaskTypeID.itemAgreement,//任务类别ID，与TaskTypes表的TaskTypeID对应（开发3/立项4/变动5），取自对应的菜单项
                    TaskName:'',//任务名（UI中的请示事项要点）
                    TaskSummary:'',//任务概要（UI中的请示事项具体内容）
                    TaskOwner:'',//任务申请人ID，与User表的UserID对应，取自当前登录用户
                    ProjectID:''
            }
           
        }
    },mounted(){
        this.name=JSON.parse(localStorage.getItem("userName"));
        this.phone=JSON.parse(localStorage.getItem("phone"));
        this.submitData.TaskOwner=JSON.parse(localStorage.getItem("userId"));
        this.getProList(2);

    },
        methods:{
            handleSubmit(){
                addNewProTaskProcess(this.submitData).then(res=>{
                    if(res.data.code==2309){
                        this.$Message.success({
                            content:'操作成功'
                        })
                    }else{
                        this.$Message.error({
                            content:'操作失败:'+res.data.message
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
            selectProDetail(){
                // this.ProjectVlaue=this.submitData.ProjectID;
                // console.log(this.ProjectVlaue)
                // console.log(this.objId)

                this.objId=this.ProjectVlaue;
                this.submitData.ProjectID=this.ProjectVlaue;
                // console.log(this.ProjectVlaue)
               
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
            }
        }
}
</script>
<style lang='less'  scoped>
     .agreement{
        width: 100%;
        height:100%;
        .itemCard{
            margin-bottom: 20px;
        }
    }
</style>