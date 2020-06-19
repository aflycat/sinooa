<template>
    <div class="returnStep">
         <Modal
            v-model="flag"
            title="审批意见"
            @on-ok="handleOk"
           >
            <Form :label-width="80">
                <FormItem label="修改意见">
                     <Input v-model="postdata.FlowComment" placeholder="请输入修改意见"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
import {taskFlowReturn} from "@/api/data"
export default {
    name:'returnStep',
    props:{
        TaskFlowID:String,
        taskID:String,
        taskFlows:Array
    },
    data(){
        return{
            flag:false,         
            postdata:{
                TaskID:'',
                TaskFlowID:'',
                FlowComment:'',
                ReturnFlowID:''
            }
        }
    },mounted(){
    },
    methods:{
        handleOk(){
            var that=this;
            this.taskFlows.forEach(element=>{
                
                if(element.flowRequire==0){
                    this.postdata['TaskID']=element.taskID;
                    this.postdata['TaskFlowID']=that.TaskFlowID;
                    this.postdata['ReturnFlowID']=element.flowID;
                }
            })
            taskFlowReturn(this.postdata).then(res=>{
                if(res.data.code==2023){
                     this.$Message.success({content:'操作成功'})
                }else{
                     this.$Message.success({content:'操作失败:'+res.data.message})
                }
            })  
        },
        showModal(flag,data){
            this.flag=flag;
        }
    }
}
</script>
<style lang="less" scoped>

</style>