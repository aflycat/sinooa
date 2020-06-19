<template>
    <Card  class="itemCard">
            <p slot="title">审批进度</p>
            <Form :label-width="80">
                <Timeline>
                    <!--  -->
                    <template v-for="(item,index) in taskFlows">
                        <TimelineItem  :color="item.flowStatus==1?'#19be6b':taskFlowID==item.taskFlowID?'#ff9900':'#515a6e'"  :key="index" >
                            <p >
                                {{item.flowDoneDate.replace("T"," ").substr(0,16)}}<Divider type="vertical" />
                                {{item.flowSummary}}<Divider type="vertical" />
                                {{item.flowOwnerName||item.flowGroupName}}<Divider type="vertical" />
                                {{item.flowEmail}}
                            </p>
                            <p class="content">{{item.flowComment||''}}</p>
                        </TimelineItem>
                    </template>
                </Timeline>
            </Form>    
    </Card>
</template>
<script>
export default {
    props:{
        taskFlows:Array,
        taskFlowID:String
    }
}
</script>
<style lang="less" scoped>

</style>