<template>
    <div class="opraTem">
        <Card  class="itemCard">
            <p slot="title">任务明细</p>
            <Form :label-width="80">
                <Row>
                     <Col span="24">
                        <FormItem label="任务编号：">
                            <b> {{getdata.taskNumber||''}}</b>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="事项要点：">
                             <b>{{getdata.taskName}}</b>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="报送人：">
                            <b> {{getdata.taskOwnerName||''}}</b>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="联系电话：">
                            <b> {{getdata.taskOwnerPhone||''}}</b>
                        </FormItem>
                    </Col>
                     <Col span="8">
                        <FormItem label="权属平台：">
                            <b> {{platformName}}</b>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="报送内容：">
                            <b> {{getdata.taskSummary}}</b>
                        </FormItem>
                    </Col>
                </Row>
                
            </Form>    
        </Card>   
        <task-file :fileList='getdata.taskFiles' :flowRequire='flowRequire'></task-file>
        <task-flows :taskFlows='taskFlows' :taskFlowID='taskFlowID'></task-flows>
        <approval-button  v-if='flowRequire<=1100' :TaskID='taskID'  :TaskFlowID='taskFlowID' :flowRequire='flowRequire' :taskFlows='getdata.taskFlows'></approval-button>
    </div>
</template>
<script>
import {getPlatformTaskDetail,geAllPlatformDetail} from "@/api/data"
import taskFile from "@/view/components/template/task_file_show"
import taskFlows from "@/view/components/template/approval_process"
import approvalButton from "@/view/components/template/approval_button"
export default {
    components:{
        taskFile,
        taskFlows,
        approvalButton

    },
    props:{
        taskID:String,
        taskFlowID:String,
        flowRequire:String

    },
    name:'progedictTem',
    data(){
        return{
            loading:false,
            loading1:false,
            loading2:false,
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
            postdata:{},
            platformName:'',
            getdata:{
                taskFiles:[]
            },
            taskFlows:[],
            FlowComment:''
        }
    },
    mounted(){
        this.getPlatformTaskDetail()
    },
    methods:{
        getPlatformTaskDetail(){
            getPlatformTaskDetail({TaskID:this.taskID}).then(res=>{
                if(res.data.code==2103){
                    this.getdata=res.data;
                    this.taskFlows=res.data.taskFlows;
                    this.geAllPlatformDetail(res.data.platform.platformID);
                   
                }else{
                    this.$Message.error({
                        content:'获取任务信息失败：'+res.data.message
                    })
                }
            })
        },
          geAllPlatformDetail(id){
            geAllPlatformDetail({PlatformID:id}).then(res=>{
                if(res.data.code==2106){
                    this.platformName=res.data.platform.shortName;
                }else{
                    this.$Message.error("平台信息查询失败:"+res.data.message)
                }
            })
        }

        
    }
}
</script>
<style lang="less" scoped>
   
    .content{
   font-size: 14px;
        font-weight: bold;
    }
</style>