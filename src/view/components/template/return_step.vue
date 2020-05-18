<template>
    <div class="returnStep">
         <Modal
            v-model="flag"
            title="节点选择"
            @on-ok="handleOk"
           >
            <Form :label-width="80">
                <FormItem label="修改意见">
                     <Input v-model="content" placeholder="请输入修改意见"></Input>
                </FormItem>
                <FormItem label="节点">
                    <Select v-model="backId" >
                        <Option v-for="(item,index) in stepList" :value="item.value" :key="index">{{ item.label }}</Option>
                    </Select>
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
        // taskFlows:Array,
        taskFlowID:String,
        taskID:String
    },
    data(){
        return{
            flag:false,
            backId:'',
            stepList:[],
            content:''

        }
    },
    
    methods:{
        handleOk(){
            
            taskFlowReturn({
                TaskID:this.taskID,
                TaskFlowID:this.taskFlowID,
                FlowComment:this.content,
                ReturnFlowID:this.backId
            }).then(res=>{
                if(res.data.code==2023){
                     this.$Message.success({content:'操作成功'})
                }else{
                     this.$Message.success({content:'操作失败:'+res.data.message})
                }
            })  
        
           
           
        },
        showModal(flag,data){
            this.flag=flag;
            let hasDat=[]
            data.forEach(element=>{
                if(hasDat.indexOf(element.flowID)==-1){
                     this.stepList.push({
                        value:element.flowID,
                        label:element.flowSummary
                    })    
                }
                hasDat.push(element.flowID)
            })
        }
    }
}
</script>
<style lang="less" scoped>

</style>