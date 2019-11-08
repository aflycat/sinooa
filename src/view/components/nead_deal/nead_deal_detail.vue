<template>
    <div class="neadDealDetail">
        <opra-tem :taskFlowID="taskFlowID.toString()" v-if="typeStr=='opra'" :taskID="taskID.toString()"></opra-tem>
        <fund-tem :taskFlowID="taskFlowID.toString()" v-if="typeStr=='fund'" :taskID="taskID.toString()"></fund-tem>
        <prog-tem :taskFlowID="taskFlowID.toString()" v-if="typeStr=='prog'" :taskID="taskID.toString()"></prog-tem>
        <!-- <defin-excel></defin-excel> -->
        

    </div>
</template>
<script>
import {getTaskDetail} from "@/api/data"
import opraTem from "@/view/components/template_show/opra"
import fundTem from "@/view/components/template_show/fund"
import progTem from "@/view/components/template_show/prog"
import definExcel from "@/view/components/template_show/defin_excel"


import {TaskTypeID} from "@/libs/data"
export default {
    components:{
        opraTem,
        fundTem,
        progTem,
        definExcel
    },
    data(){
        return{
          taskID:'',
          taskTypeID:'',
          taskFlowID :'',
          typeStr:'',
          url:'',
          typeIdObj:{
              'opra':[
                  TaskTypeID.general,
                  TaskTypeID.partner,
                  TaskTypeID.share,
                  TaskTypeID.directorate,
                  TaskTypeID.supervisors
                //   TaskTypeID.自定义
              ],
              'prog':[
                   TaskTypeID.itemDevelop,
                   TaskTypeID.itemProjectApproval,
                   TaskTypeID.itemChange,
                   TaskTypeID.itemProcess,
                   TaskTypeID.itemInvestment,
                   TaskTypeID.itemSummary,
                   TaskTypeID.itemProfile,
                   TaskTypeID.itemAgreement,
                //    TaskTypeID.itemAgreement其他事宜
              ],
              'fund':[
                  TaskTypeID.fundDevelop,
                  TaskTypeID.fundProjects,
                  TaskTypeID.fundChanges,
                  TaskTypeID.fundAffairs,
                  TaskTypeID.fundVote,
                  TaskTypeID.fundPartnership
              ]

          }
        }
    },
   
    mounted(){
        this.getRouterParams()
        this.taskTypeID=parseInt(this.taskTypeID);
        this.getShowFlag();
        
    },
    watch:{
        '$route'(){
            this.getRouterParams()
            this.getShowFlag();
        }
    },
    methods:{
        getRouterParams(){
            this.taskID=this.$route.query.taskID;
            this.taskTypeID=this.$route.query.taskTypeID;
            this.taskFlowID=this.$route.query.taskFlowID;
           
        },
        
        getShowFlag(){
            if(this.typeIdObj.opra.indexOf(this.taskTypeID)!=-1){
                this.typeStr='opra'
            }else if(this.typeIdObj.prog.indexOf(this.taskTypeID)!=-1){
                this.typeStr='prog'
            }else{
                this.typeStr='fund'
            }
        }
    }
}
</script>
<style lang="less" scoped>

</style>