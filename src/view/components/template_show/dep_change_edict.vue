<template>
    <div class="department_change">
         <Card  class="itemCard">
            <p slot="title">报送人信息</p>
             <Form class="formWrap"  :label-width="110">
                <Row>
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
                </Row>
                

            </Form>
        </Card>
        <Card class="itemCard">
            <p slot="title">部门信息</p>
            <Form class="formWrap"  :label-width="110">
                <FormItem  label="部门选择">
                    <b>{{departList[postData.Department.DepartmentID]}}</b>
                   
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
                        <Input v-model="postData.Department.DeptCode"  placeholder="请输入部门代码"></Input>
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
        <task-file :fileList='postData.TaskFiles' :flowRequire='flowRequire'></task-file>
        <task-flows :taskFlows='postData.TaskFlows' :taskFlowID='taskFlowID'></task-flows>
        <edict-button @handle-submit-agree='handleSubmitAgree' :TaskID='taskID' 
                :TaskFlowID='taskFlowID' :TaskStr='postData' 
                >
            </edict-button>

    </div>
</template>

<script>
import taskFile from "@/view/components/template/task_file_show"
import taskFlows from "@/view/components/template/approval_process"
import edictButton from "@/view/components/template/return_edict_button"
import {getPlatform,getAllUserList,upDepartment,getAllDepartment,
getDepartmentDetail,getDepartmentTaskInfor,taskFlowAgree,
    setDepartment

} from "@/api/data"
export default {
    components:{
        taskFile,taskFlows,edictButton
    },
     props:{
        taskFlowID:String,
        taskID:String,
         flowRequire:String,
        taskTypeID:String
    },
    mounted(){
     
        this.getuserList();
        this.getPlatform();
        this.getAllDepartment();
        this.getDepartmentTaskInfor()
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
            stanManager:'',
            managerName:'',
            deputyManager:'',//副经理
            deputyManagerName:'',
            deputyManagerName:'',
            member:[],//成员
            standMember:[],
            memberArr:[],
            platList:[],
            departList:{},
            memWrap:[],//成员专门的数组
            managerWrap:[],
            deputyManageWrap:[],
            postData:{
                TaskTypeID:41,
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
                    Members:[]

                }
            },
            TaskName:'',
            TaskSummary:''

             
        }
    },methods:{
        handleSubmitAgree(TaskName,TaskSummary){
            var postInfor=JSON.stringify(this.postData.Department);
            var memberflag=false,
                flag=TaskName==this.TaskName&&TaskSummary==this.TaskSummary;

            if((this.manager==this.stanManager)&&(this.deputyManager==this.stanDeput)&&(this.member.toString()==this.standMember.toString())){
                memberflag=false;
            }else{
                memberflag=true;
            }

            if((postInfor==this.standDepartInfor)&&(!memberflag)&&flag){
                  this.taskFlowAgree()
            }else{

                this.postData.TaskID=this.taskID;
                this.postData.TaskFlowID=this.taskFlowID;
                this.postData.Department.Members=this.managerWrap.concat(this.memWrap);
                let inforflag=(postInfor==this.standDepartInfor)&&(!memberflag)
                if(inforflag){
                      this.postData.Department.DepartmentID=0;
                }
                this.setDepartment()
            }
          

        },taskFlowAgree(){
            taskFlowAgree({TaskID:this.taskID,TaskFlowID:this.taskFlowID}).then(res=>{
                if(res.data.code==2022){
                    this.$Message.success({
                        content:"操作成功"
                    })
                }else{
                    this.$Message.error({
                        content:"操作成功"+res.data.message
                    })
                }
            })
        },setDepartment(){
            setDepartment(this.postData).then(res=>{
                if(res.data.code==2204){
                    this.$Message.success({
                        content:"操作成功"
                    })
                }else{
                    this.$Message.error({
                        content:"操作成功"+res.data.message
                    })
                }
            })
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
                            Members:[]
                        }
                     }
                      this.TaskName=res.data.taskName;
                     this.TaskSummary=res.data.taskSummary;
                     this.standDepartInfor=JSON.stringify(this.postData.Department); 
                     res.data.department.members.forEach(element => {
                        switch (element.memberType){
                            case 21:
                                //部门经理
                                this.manager=element.memberID;
                                this.stanManager=element.memberID;
                                this.managerWrap[0]={
                                    ID:0,
                                    DepartmentID:element.departmentID,
                                    MemberID:element.memberID,
                                    MemberName:element.memberName,
                                    MemberType:21,//21经理22副经理23员工
                                    MemberStatus:1
                                }                   

                            break;
                            case 22:
                                //部门副经理
                                this.deputyManager=element.memberID
                                this.stanDeput=element.memberID
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
                                this.standMember.push(element.memberID);
                                this.memWrap.push({
                                    ID:0,
                                    DepartmentID:element.departmentID,
                                    MemberID:element.memberID,
                                    MemberName:element.memberName,
                                    MemberType:23,//21经理22副经理23员工
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
        getAllDepartment(){
            getAllDepartment({DeptStatus:"1",USerID:JSON.parse(localStorage.getItem("userId"))}).then(res=>{
                if(res.data.code==2205){
                    res.data.deptList.forEach(element=>{
                        this.departList[element.departmentID]=element.deptName
                    })
                }else{
                    this.$Message.error({
                        content:"部门信息加载失败:"+res.data.message
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
        selectDepartment(value){
            getDepartmentDetail({DepartmentID:value}).then(res=>{
                if(res.data.code==2206){
                    this.postData={
                        TaskTypeID:41,
                        TaskName:"",
                        TaskSummary:"",
                        TaskOwner:JSON.parse(localStorage.getItem("userId")),
                        Department:{
                            DepartmentID:res.data.department.departmentID,
                            PlatformID:res.data.department.platformID,
                            DeptName:res.data.department.deptName,
                            OpenDate:res.data.department.openDate,
                            CloseDate:res.data.department.closeDate,
                            DeptStatus:1,
                            DeptCode:res.data.department.deptCode,
                            Members:res.data.department.members
                        }
                    }
                    this.setMemberInfor(res.data.department.members)

                }else{
                    this.$Message.error({
                        content:"部门数据加载失败:"+res.data.message
                    })
                }
            })
        },
        setMemberInfor(dat){
            this.member=[];
            dat.forEach(element=>{
                if(element.memberType==21){
                    this.manager=element.memberID
                    this.managerWrap.push({
                            ID:0,
                            DepartmentID:element.departmentID,
                            MemberID:element.memberID,
                            MemberName:element.memberName,
                            MemberType:21,//21经理22副经理23员工
                            MemberStatus:1
                    })  
                }else if(element.memberType==22){
                    this.deputyManager=element.memberID
                    this.deputyManageWrap.push({
                            ID:0,
                            DepartmentID:element.departmentID,
                            MemberID:element.memberID,
                            MemberName:element.memberName,
                            MemberType:22,//21经理22副经理23员工
                            MemberStatus:1
                    })

                }else{
                    this.member.push(element.memberID)
                    this.memWrap.push({
                            ID:0,
                            DepartmentID:element.departmentID,
                             MemberID:element.memberID,
                            MemberName:element.memberName,
                            MemberType:23,//21经理22副经理23员工
                            MemberStatus:1
                    })
                }
            })
        },
        setManager(dat){
            //设置经理
            this.manager=dat.value;
            this.managerName=dat.label;
            this.managerWrap[0]={
                    ID:0,
                    DepartmentID:this.postData.Department.DepartmentID,
                    MemberID:dat.value,
                    MemberName:dat.label,
                    MemberType:21,//21经理22副经理23员工
                    MemberStatus:1
            }
        },
        setDeputyManager(dat){
            //设置副经理
            this.deputyManager=dat.value;
            this.deputyManagerName=dat.label;
           this.managerWrap[1]={
                ID:0,
                 DepartmentID:this.postData.Department.DepartmentID,
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
                    DepartmentID:this.postData.Department.DepartmentID,
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
        handleSubmit(){
            this.postData.Department.Members=this.managerWrap.concat(this.deputyManageWrap).concat(this.memWrap);
            upDepartment(this.postData).then(res=>{
                if(res.data.code=2201){
                    this.$Message.success({
                        content:"操作成功"
                    })
                }else{
                    this.$Message.error({
                        content:"操作失败:"+res.data.message
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
            this.showFile=true;
            if(filename){
                    this.fileName=filename;
            }
            if(fileWrap){
                this.fileWrap=fileWrap;
            }
            
        },downloadFile(dateFolder,fileName){
            window.open('http://120.78.154.66:8089/taskfiles/'+dateFolder+'/'+fileName)
        }, 
        showUploadFile(){
            //显示modal
            this.$refs["uploadModal"].showModal(true);
        }
    }
}
</script>
<style lang="less" scoped>
.department_change{
    width: 100%;
    height: 100%;
}
</style>