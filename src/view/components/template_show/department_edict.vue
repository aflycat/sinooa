<template>
    <div class="dep_edic">
         <Card  class="itemCard">
            <p slot="title">任务明细</p>
            <Form :label-width="80">
                <Row>
                     <Col span="24">
                        <FormItem label="任务编号：">
                            <b>{{postData.TaskNumber}}</b>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="事项要点：">
                            <b>{{postData.TaskName}}</b>
                        </FormItem>
                    </Col>
                   
                    <Col span="12">
                        <FormItem label="报送人：">
                           <b> {{postData.TaskOwnerName}}</b>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="联系电话：">
                          <b> {{ postData.TaskOwnerPhone}}</b>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="报送内容：">
                           <b> {{postData.TaskSummary}}</b>
                        </FormItem>
                    </Col>
                    <Col span="24" v-if="postData.TaskFiles.length>0" >
                        <FormItem label="报送文件：" >
                            <p  v-for="(item,index) in postData.TaskFiles" :key='index'>
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
            <p slot="title">部门信息</p>
            <Form class="formWrap"  :label-width="110">
                <FormItem  label="部门全称">
                    <Input v-model="postData.Department.DeptName"  placeholder="部门全称"></Input>
                </FormItem>
                <Row>
                    <Col span="12">
                        <FormItem  label="权属平台">
                            <Select  placeholder="请选择权属平台" v-model="postData.Department.PlatformID" filterable>
                                <Option v-for="item in platList.platList" :key="item.platformID" :value="item.platformID">{{item.platName}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                
                    <Col span="12">
                        <FormItem label="部门代码">
                        <Input disabled v-model="postData.Department.DeptCode"  placeholder="请输入部门代码"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem  label="部门经理">
                            <Select v-model="manager" placeholder="请选择部门经理" label-in-value  filterable @on-change="setManager">
                                <Option v-for="item in memberArr" :key="item.value" :value="item.value">{{item.label}}</Option>
                            </Select>
                            
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem   label="部门副经理">
                            <Select v-model="deputyManager"  placeholder="请选择部门副经理" label-in-value  filterable @on-change="setDeputyManager">
                                <Option v-for="item in memberArr" :key="item.value" :value="item.value">{{item.label}}</Option>
                            </Select>
                            
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem   label="部门员工">
                            <Select v-model="member"  placeholder="请选择部门员工"  label-in-value  multiple @on-change="setMember">
                                <Option v-for="item in memberArr" :key="item.value" :value="item.value">{{item.label}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    
                    <Col span="12">
                        <FormItem   label="成立时间">
                            <DatePicker :value="postData.Department.OpenDate" type="date" placeholder="请选择成立时间" @on-change="setOpenDate" style="width:100%;"></DatePicker>
                        </FormItem>
                    </Col>
                     <Col span="12">
                        <FormItem   label="撤销时间">
                            <DatePicker :value="postData.Department.CloseDate" type="date" placeholder="请选择撤销时间" @on-change="setCloseDate" style="width:100%;"></DatePicker>
                        </FormItem>
                    </Col>
                    
                </Row>
                 </Form>
        </Card>
        <Card  class="itemCard">
            <p slot="title">审批进度</p>
            <Form :label-width="80">
                <Timeline>
                   
                    <template v-for="(item,index) in postData.TaskFlows">

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
                    <FormItem label="具体内容" >
                        <Input  type="textarea" v-model="postData.TaskSummary" :autosize="{minRows: 10,maxRows: 15}" placeholder="请输入事项的具体内容"></Input>
                    </FormItem>
                     <FormItem>
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
    </div>
</template>
<script>
import {getPlatform,getAllUserList,upDepartment,getDepartmentTaskInfor} from "@/api/data"
export default {
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
            loading:false,//提交
            loading2:false,//提交
            name:"",
            phone:"",
            manager:'',//经理
            managerName:'',
            deputyManager:'',//副经理
            deputyManagerName:'',
            member:[],//成员
            memberArr:[],
            platList:[],
            memWrap:[],//成员专门的数组
            managerWrap:[],
            postData:{
                TaskNumber:"",
                TaskFlows:[],
                TaskOwnerName:"",
                TaskName:"",
                TaskSummary:"",
                TaskFiles:[],
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
        this.getuserList();
        this.getPlatform();
        this.getDepartmentTaskInfor()
    },
    methods:{
        handleSubmitAgree(){
             this.postData.Department.Members=this.managerWrap.concat(this.memWrap);
            
            console.log(this.postData)
        },
         getDepartmentTaskInfor(){
             getDepartmentTaskInfor({TaskID:this.taskID}).then(res=>{
                 if(res.data.code==2203){
                     this.postData={
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
                                this.manager=element.memberID;
                                this.managerWrap[0]={
                                    ID:0,
                                    DepartmentID:element.departmentID,
                                    MemberID:element.memberID,
                                    MemberName:element.memberName,
                                    MemberType:22,//21经理22副经理23员工
                                    MemberStatus:1
                                }
                                
                               
                            break;
                            case 22:
                                //部门副经理
                                this.deputyManager=element.memberID
                                this.managerWrap[1]={
                                     ID:0,
                                    DepartmentID:element.departmentID,
                                    MemberID:element.memberID,
                                    MemberName:element.memberName,
                                    MemberType:22,//21经理22副经理23员工
                                    MemberStatus:1
                                }

                            break;
                            case 23:
                                //成员
                                this.member.push(element.memberID);
                                this.memWrap.push({
                                     ID:0,
                                    DepartmentID:element.departmentID,
                                    MemberID:element.memberID,
                                    MemberName:element.memberName,
                                    MemberType:22,//21经理22副经理23员工
                                    MemberStatus:1
                                })
                            break;

                        }
                    });

                 }else{
                    this.$Message.error({
                        content:'数据加载失败:'+res.data.message
                    })
                 }
             })
         },   
          getuserList(){
            getAllUserList({"Status":1}).then(res=>{
                if(res.data.code==0){
                    res.data.userList.forEach(element => {
                        this.memberArr.push({
                            value:element.userId,
                            label:element.userName
                        })
                    });
                }else{
                    this.$Message.error("人员信息获取失败:"+res.data.message)
                }
            })
        },
        getPlatform(){
            getPlatform({PlatStatus:1,UserID:JSON.parse(localStorage.getItem("userId"))}).then(res=>{
                if(res.data.code==2105){
                    if(res.data.platList.length==0){
                        this.$Message.warning("该账号下没有相关权属平台")
                    }else{
                        this.platList=res.data;
                    }
                }else{
                    this.$Message.error("权属平台列表查询失败:"+res.data.message)
                }
            })
        },
        setManager(dat){
            //设置经理
          
            this.manager=dat.value;
            this.managerName=dat.label;
            this.managerWrap[0]={
                    ID:0,
                    DepartmentID:0,
                    MemberID:dat.value,
                    MemberName:dat.label,
                    MemberType:21,//21经理22副经理23员工
                    MemberStatus:1
            }
              console.log( this.managerWrap)
        },
        setDeputyManager(dat){
            //设置副经理
            this.deputyManager=dat.value;
            this.deputyManagerName=dat.label;
            this.managerWrap[1]={
                 ID:0,
                DepartmentID:0,
                MemberID:dat.value,
                MemberName:dat.label,
                MemberType:22,//21经理22副经理23员工
                MemberStatus:1
            }
        },
        setMember(dat){
            //设置员工
           this.memWrap=[];
           
           dat.forEach(element=>{
               this.memWrap.push({
                   ID:0,
                    DepartmentID:0,
                    MemberID:element.value,
                    MemberName:element.label,
                    MemberType:23,//21经理22副经理23员工
                    MemberStatus:1
               })
           })
        },
        setOpenDate(value){
            this.postData.Department.OpenDate=value;
        },
        setCloseDate(value){
            this.postData.Department.CloseDate=value;
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
<style scoped lang="less">

</style>