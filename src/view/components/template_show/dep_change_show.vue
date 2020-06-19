<template>
    <div class="dep_show">
       <approval-header :TaskNumber='postdata.TaskNumber' :TaskName='postdata.TaskName' :TaskOwnerName='postdata.TaskOwnerName' :TaskOwnerPhone='postdata.TaskOwnerPhone' :TaskSummary='postdata.TaskSummary'></approval-header>

        <Card  class="itemCard">
            <p slot="title">任务明细</p>
                <Form class="formWrap"  :label-width="120">
                    
                        <FormItem  label="部门全称:">
                           <b>{{postdata.Department.DeptName}}</b>
                        </FormItem>
                        <Row>
                            <Col span="12">
                                <FormItem  label="权属平台:">
                                  <b> {{platformName}}</b>
                                </FormItem>
                            </Col>
                        
                            <Col span="12">
                                <FormItem label="部门代码:">
                                  <b>  {{postdata.Department.DeptCode}}</b>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem  label="部门经理:">
                                   <b>  {{manager}}</b>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="部门副经理:">
                                   <b> {{deputyManager}}</b>
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem label="部门员工:">
                                   <b>  {{member.toString()}}</b>
                                </FormItem>
                            </Col>
                            
                        </Row>
                    </Form>
                
         </Card>
           <task-file :fileList='postdata.TaskFiles' :flowRequire='flowRequire'></task-file>
         <task-flows :taskFlows='postdata.TaskFlows' :taskFlowID='taskFlowID'></task-flows>
        <approval-button  v-if='flowRequire<=1100' :TaskID='taskID'  :TaskFlowID='taskFlowID' :flowRequire='flowRequire' :taskFlows='postdata.TaskFlows'></approval-button>
     
    </div>
</template>
<script>

import {getDepartmentTaskInfor,geAllPlatformDetail} from "@/api/data"
import taskFile from "@/view/components/template/task_file_show"
import taskFlows from "@/view/components/template/approval_process"
import approvalButton from "@/view/components/template/approval_button"
import approvalHeader from "@/view/components/template/approval_header"
export default {
   components:{
        taskFile,taskFlows,approvalButton,approvalHeader
    },
    props:{
        taskFlowID:String,
        taskID:String,
        taskTypeID:String,
        flowRequire:String
    },
    data(){
        return{
            platformName:'',
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
            loading:false,
            loading2:false,
            manager:'',
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
                                this.manager=element.memberName

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
                    this.geAllPlatformDetail(this.postdata.Department.PlatformID)
                }else{
                    this.$Message.error({
                        content:'数据加载失败:'+res.data.message
                    })
                }
            })
        },
         geAllPlatformDetail(id){
            geAllPlatformDetail({PlatformID:id}).then(res=>{
                
                if(res.data.code==2106){
                    this.platformName=res.data.platform.shortName;

                }else{
                    this.$Message.error("权属平台信息查询失败:"+res.data.message)
                }
            })
        }
    }
}
</script>
<style scoped lang="less">

</style>