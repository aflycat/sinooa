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
import {returnTaskFlow} from "@/api/user"
export default {
    name:'returnStep',
    props:{
        taskFlows:Array,
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
    watch:{
        taskFlows(){
            let hasDat=[]
            this.taskFlows.forEach(element=>{
                if(hasDat.indexOf(element.flowID)==-1){
                     this.stepList.push({
                        value:element.flowID,
                        label:element.flowSummary
                    })    
                }
                hasDat.push(element.flowID)
            })
        }
    },
    methods:{
        handleOk(){
            returnTaskFlow({
                TaskID:this.taskID,
                TaskFlowID:this.taskFlowID,
                FlowComment:this.content,
                ReturnFlowID:this.backId
            }).then(res=>{
                if(res.data.code==2103){
                    this.$Notice.success({
                        title:'修改节点成功'
                    })
                }else{
                    this.$Message.error({
                        content:'修改节点失败：'+res.data.message
                    })
                }
            })
           
        },
        showModal(flag){
            this.flag=flag
        }
    }
}
</script>
<style lang="less" scoped>

</style>