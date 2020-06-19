<template>
    <div class="nead_deal">
        <Card class="itemCard">
           <p slot="title">任务列表</p>
            <!-- <Page style="margin-bottom:20px;" :total="1000"  show-elevator show-sizer /> -->
           <Row type="flex" justify="center" align="middle">
               <Col span="5">
                    <p>名称</p>
               </col>
               <Col  span="5">
                    <p>申请人</p>
               </col>
               <Col  span="5">
                    <p>申请时间</p>
               </col>
               <Col  span="5">
                    <p>类型</p>
               </col>
               <Col span="4">
                   <p>操作</p>
               </col>
               <Divider />
          </Row>
           <Row type="flex" justify="center" align="middle" v-for="(item,index) in taskList" :key="index">
               <Col span="5">
                    <h4>{{item.taskName}}</h4>
                    <p>{{item.taskNumber}}</p>
               </col>
               <Col  span="5">
                    <p>{{item.taskOwnerName}}</p>
               </col>
               <Col  span="5">
                    <p>{{item.taskDate.replace("T"," ").substr(0,16)}}</p>
               </col>
               <Col  span="5">
                    <p>{{TaskIDType[item.taskTypeID]}}</p>
               </col>
               <Col span="4">
                    <Button style="padding:0;" type="text" @click="lookTask(item.taskID,item.taskTypeID,item.taskFlowID,item.flowRequire)">查看</Button >
               </col>
               <Divider />
          </Row>
        </Card>
     
    </div>
</template>
<script>
import {getDealTask} from "@/api/data"
import {TaskIDType} from "@/libs/data"
export default {
     mounted(){
          let taskOwner=JSON.parse(localStorage.getItem("userId"));
          getDealTask({FlowOwner:taskOwner}).then(res=>{
               if(res.data.code==2021){
                    this.taskList=res.data.dealTaskList
               }else{
                    this.$Message.warning("数据加载失败："+res.data.message)
               }
          })
     },
    data (){
        return{
           taskList:[],
           TaskIDType:TaskIDType
        }
    },
    methods:{
         lookTask(taskID,taskTypeID,taskFlowID,flowRequire){
              this.$router.push({
                   name:'deal_detail',
                   query:{
                        taskID,
                        taskTypeID,
                        taskFlowID,
                        flowRequire
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