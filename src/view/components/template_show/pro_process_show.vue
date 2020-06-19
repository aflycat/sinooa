<template>
    <div class="pro_change"> 
        <approval-header :TaskNumber='postdata.TaskNumber' :TaskName='postdata.TaskName' :TaskOwnerName='postdata.TaskOwnerName' :TaskOwnerPhone='postdata.TaskOwnerPhone' :TaskSummary='postdata.TaskSummary'></approval-header>
        <pro-inform :objId="projectID" :flag="2"></pro-inform>
        <task-file :fileList='postdata.TaskFiles' :flowRequire='flowRequire'></task-file>
        <task-flows :taskFlows='postdata.TaskFlows' :taskFlowID='taskFlowID'></task-flows>
        <approval-button  v-if='flowRequire<=1100' :TaskID='taskID'  :TaskFlowID='taskFlowID' :flowRequire='flowRequire' :taskFlows='postdata.TaskFlows'></approval-button>
    </div>
</template>
<script>
import proInform from "@/view/components/template/pro_inform"

import taskFile from "@/view/components/template/task_file_show"
import taskFlows from "@/view/components/template/approval_process"
import approvalButton from "@/view/components/template/approval_button"
import approvalHeader from "@/view/components/template/approval_header"

import {getDealTaskDetail} from "@/api/data"
import {TaskIDType} from "@/libs/data"
import {toUpperCase} from "@/libs/tools"
export default {
    components:{
        proInform,
        taskFile,
        taskFlows,
        approvalButton,
        approvalHeader
    },
    props:{
        taskID:String,
        taskFlowID:String,
        flowRequire:String
        
    },
    data(){
        return{
           
            projectID:0,
          
            postdata:{
                TaskFiles:[],
                TaskNumber:'',
                TaskFlows:[],
            }
        }
    },
    mounted(){
        this.getDealTaskDetail()
    },
    methods:{
       
        getDealTaskDetail(){
            getDealTaskDetail({TaskID:this.taskID}).then(res=>{
                if(res.data.code==2303){
                    this.projectID= res.data.project.projectID;
                    this.postdata=toUpperCase(res.data)

                }else{
                    this.$Message.error({
                        content:'数据加载失败：'+res.data.message
                    })
                }
            })            
        },
    }
}
</script>