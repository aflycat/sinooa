
<template>
    <div class="file">
        <!-- 专业文件 -->
          <Card class="itemCard">
            <p slot="title">报送人信息</p>
            <Form :label-width="80">
                <Row>
                    <Col span="8">
                        <FormItem label="报送人" prop="name">
                            <Input disabled v-model="name" placeholder="请输入报送人姓名"></Input>
                        </FormItem>
                    </Col>
                        <Col span="8">
                        <FormItem label="联系电话" prop="phone">
                            <Input v-model="phone" placeholder="请输入报送人联系电话"></Input>
                        </FormItem>   
                    </Col>

                        <Col span="8">

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
                                 <Select v-model="submitData.ProjectID" filterable  @on-change="selectProDetail">
                                    <Option v-for="item in ProjectData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                      </Row>
                   
                </Form>
            </Card>
       <Card  class="itemCard">
                <p slot="title">项目信息</p>
                  <Form :label-width="80">
                     
                    <Row>
                         <Col span="8">
                            <FormItem label="事项页签：" prop="ProjectType">
                               
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="项目品种：" prop="ProjectType">
                                {{TypeData[postdata.Project.ProjectType]}}
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="项目角色：" prop="ProjectRole">
                                 {{TypeData[postdata.Project.ProjectRole]}}
                            </FormItem>   
                        </Col>

                        <Col span="8">
                            <FormItem label="工时费用：" prop="ProjectEstimatedHourCost">
                            {{postdata.Project.ProjectEstimatedHourCost||0}}万元
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="直接费用：" prop="ProjectEstimatedFeeCost">
                            {{postdata.Project.ProjectEstimatedFeeCost||0}}万元
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="项目内容：" prop="phone">
                                 {{postdata.Project.ProjectSummary}}
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="项目来源：" prop="phone">
                                {{postdata.Project.ProjectSource}}
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="开始日期：" prop="ProjectStartDate">
                                {{postdata.Project.ProjectStartDate}}
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="结束日期：" prop="name">
                                {{postdata.Project.ProjectEndDate}}
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="项目经理：" prop="Manager">
                                {{ManagerData}}
                            </FormItem>  
                        </Col>
                        <Col span="8">
                            <FormItem label="项目主办：" prop="Owner">
                                {{OwnerData}}
                            </FormItem>
                        </Col>
                        <Col span="16">
                            <FormItem label="项目成员：" prop="Member">
                                {{MemberData.toString()}}
                            </FormItem>   
                        </Col>
                    </Row>

                </Form>   
                
            </Card>
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
import store from "@/store"
import {getprogectType,getprogectRole,getuserList,getCityList,getIndustryList,getProjectList,getProjectDetail} from "@/api/data"

import UploadFiles from "@/view/components/upload_file/upload_file"

export default {
    components:{
        UploadFiles
    },
    data(){
        return{
            loading:false,
            name:'',
            phone:'',
            ProjectData:[],
            TypeData:{},
            RoleData:{},
            ManagerData:'',
            OwnerData:'',
            MemberData:[],
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
            submitData:{
                    TaskTypeID:8,//任务类别ID，与TaskTypes表的TaskTypeID对应（开发3/立项4/变动5），取自对应的菜单项
                    TaskName:'',//任务名（UI中的请示事项要点）
                    TaskSummary:'',//任务概要（UI中的请示事项具体内容）
                    TaskOwner:'',//任务申请人ID，与User表的UserID对应，取自当前登录用户
                    ProjectID:''
            },
            postdata:{
                Client:{
                    ClientCode:'',//客户代码，不同客户使用该唯一的代码区分
                },
                Project:{
                    ProjectType:'',//项目品种，下拉表，从后台字典表中获取
                    ProjectRole:'',//项目角色，下拉表，从后台字典表中获取
                    ProjectSummary:'',//项目概要
                    ProjectSource:'',//项目来源
                    ProjectStartDate:'',//项目开始日期
                    ProjectEndDate:'',//项目结束日期
                    ProjectEstimatedFeeCost:'',//预计直接费用
                    ProjectEstimatedHourCost:'',//预计工时费用
        //             Members:[{},{}]
                }
            }
        }
    },mounted(){
        this.name=JSON.parse(localStorage.getItem("userName"));
        this.phone=JSON.parse(localStorage.getItem("phone"));
        this.submitData.TaskOwner=JSON.parse(localStorage.getItem("userId"));
        this.getProList(2);
        this.getprogectType();
        this.getprogectRole();
    },
        methods:{
             handleSubmit(){
                console.log(this.submitData);
            },
            getProList(status){
                //获取项目列表
                getProjectList({"ProjectStatus":2,"USerID":JSON.parse(localStorage.getItem("userId"))}).then(res=>{
                    if(res.data.code==2306){
                        console.log(res)
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
                 getProjectDetail({ProjectID:this.submitData.ProjectID}).then(res=>{
                    if(res.data.code==2307){
                        console.log(res)
                        res=res.data;
                       
                        this.postdata={
                                Client:{
                                    ClientCode:res.client.clientCode,//客户代码，不同客户使用该唯一的代码区分
                                },
                                Project:{
                                    ProjectType:parseInt(res.project.projectType),//项目品种，下拉表，从后台字典表中获取
                                    ProjectRole:parseInt(res.project.projectRole),//项目角色，下拉表，从后台字典表中获取
                                    ProjectSummary:res.project.projectSummary,//项目概要
                                    ProjectSource:res.project.projectSource,//项目来源
                                    ProjectStartDate:res.project.projectStartDate.substr(0,10),//项目开始日期
                                    ProjectEndDate:res.project.projectEndDate.substr(0,10),//项目结束日期
                                    ProjectEstimatedFeeCost:res.project.projectEstimatedFeeCost,//预计直接费用
						            ProjectEstimatedHourCost:res.project.projectEstimatedHourCost,//预计工时费用
                        //             Members:[{},{}]
                                }
                        }
                        this.MemberData=[];
                        res.project.members.forEach(element=>{
                            if(element.memberType==1){
                                this.ManagerData=element.memberName;
                            }else if(element.memberType==2){
                               this.OwnerData=element.memberName;
                            }else{
                                // console.log(element.memberName)
                                this.MemberData.push(element.memberName);
                            }
                        })
                    }else{
                        this.$Message.error({
                            content:"获取项目详细信息失败："+res.data.message
                        })
                    }
                })
            },
             getprogectType(){
                getprogectType({"PageIndex":1,"PageSize":1000}).then(res=>{
                    if(res.data.code==0){
                        res.data.projectTypeList.forEach(element => {
                            this.TypeData[element.projectTypeId]=element.projectTypeName
                           
                        });
                        console.log(this.TypeData)

                    }else{
                        this.$Message.error({
                            content:"项目品种信息加载失败:"+res.data.message
                        })
                    }
                })
            },
            getprogectRole(){
                getprogectRole({"PageIndex":1,"PageSize":1000}).then(res=>{
                    if(res.data.code==0){
                        res.data.projectRoleList.forEach(element => {

                            this.RoleData[element.projectRoleId]=element.projectRoleName
                        });
                        console.log(this.RoleData)
                    }else{
                        this.$Message.error({
                            content:"项目角色信息加载失败:"+res.data.message
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
            }
        }
}
</script>
<style lang='less'  scoped>
     .file{
        width: 100%;
        height:100%;
        .itemCard{
            margin-bottom: 20px;
        }
    }
</style>