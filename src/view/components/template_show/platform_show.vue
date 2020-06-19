<template>
    <div class="plat_show">
        <approval-header :TaskNumber='postdata.TaskNumber' :TaskName='postdata.TaskName' :TaskOwnerName='postdata.TaskOwnerName' :TaskOwnerPhone='postdata.TaskOwnerPhone' :TaskSummary='postdata.TaskSummary'></approval-header>
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
          <task-file :fileList='postdata.TaskFiles' :flowRequire='flowRequire'></task-file>
         <task-flows :taskFlows='postdata.TaskFlows' :taskFlowID='taskFlowID'></task-flows>
       
        <approval-button  v-if='flowRequire<=1100' :TaskID='taskID'  :TaskFlowID='taskFlowID' 
            :flowRequire='flowRequire' :taskFlows='postdata.TaskFlows'>
        </approval-button>

    </div>
</template>
<script>
import {getPlatformTaskDetail} from "@/api/data"
import {platformMemberType,paltformMemberStatus} from "@/libs/data"
import taskFile from "@/view/components/template/task_file_show"
import taskFlows from "@/view/components/template/approval_process"
import approvalButton from "@/view/components/template/approval_button"
import approvalHeader from "@/view/components/template/approval_header"
export default {
    components:{
        taskFile,
        approvalButton,
        approvalHeader,
        taskFlows
    },props:{
        taskFlowID:String,
        taskID:String,
        taskTypeID:String,
        flowRequire:String
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
        
        
    }

}
</script>
<style scoped lang="less">

</style>