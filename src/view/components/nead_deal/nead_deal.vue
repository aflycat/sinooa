<template>
    <div class="nead_deal">
        <Card class="itemCard">
           <p slot="title">任务列表</p>
            <!-- <Page style="margin-bottom:20px;" :total="1000"  show-elevator show-sizer /> -->
           <Row type="flex" justify="center" align="middle" v-for="item in taskList" :key="item.taskNumber">
               <Col span="8">
                    <h4>{{item.taskName}}</h4>
                    <p>{{item.taskNumber}}</p>
               </col>
               <Col  span="4">
                    <p>申请人</p>
                    <p>{{item.taskOwnerName}}</p>
               </col>
               <Col  span="6">
                    <p>申请时间</p>
                    <p>{{item.taskDate.replace("T"," ").substr(0,16)}}</p>
               </col>
               <Col span="6">
                    <!-- <ul>
                        <li>已阅</li><Divider type="vertical" />
                        <li>删除</li>
                    </ul> -->
                    <!-- <Button type="text">已阅</Button ><Divider type="vertical" /> -->
                    <!-- <Button type="text" >删除</Button ><Divider type="vertical" /> -->
                    <!-- <Button type="text" >驳回</Button ><Divider type="vertical" /> -->
                                                       <!-- 任务id，任务类型，待处理步骤id -->
                    <Button type="text" @click="lookTask(item.taskID,item.taskTypeID,item.taskFlowID)">查看</Button >
               </col>
               <Divider />
          </Row>

            <Page :total="1000"  show-elevator show-sizer />
        </Card>
     
    </div>
</template>
<script>
import {getDealTask} from "@/api/data"
export default {
     mounted(){
          let taskOwner=JSON.parse(localStorage.getItem("userId"));
          getDealTask({FlowOwner:taskOwner}).then(res=>{
               console.log(res)
               if(res.data.code==2101){
                    this.taskList=res.data.dealTaskList
               }else{
                    this.$Message.warning("数据加载失败："+res.data.message)
               }
          })
     },
    data (){
        return{
           taskList:[]
        }
    },
    methods:{
         lookTask(taskID,taskTypeID,taskFlowID){
              this.$router.push({
                   name:'deal_detail',
                   query:{
                        taskID,
                        taskTypeID,
                        taskFlowID
                   }
              })
         }
    }
}
</script>
<style lang="less" scoped>
    .nead_deal{
        width: 100%;
        height: 100%;
       
        .itemCard{
            margin-bottom: 25px;

        }

    }
</style>