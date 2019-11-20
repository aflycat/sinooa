<template>
    <div class="neadDealDetail">
        <opra-tem :taskFlowID="taskFlowID.toString()"      v-if="typeStr=='opra'" :taskID="taskID.toString()"></opra-tem>
        <fundedict-tem :taskFlowID="taskFlowID.toString()" v-if="typeStr=='fundedic'" :taskID="taskID.toString()"></fundedict-tem>
        <fundshow-tem :taskFlowID="taskFlowID.toString()"  v-if="typeStr=='fundshow'" :taskID="taskID.toString()"></fundshow-tem>

        <progedict-tem :taskFlowID="taskFlowID.toString()" v-if="typeStr=='progedict'" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"></progedict-tem>
        <progshow-tem :taskFlowID="taskFlowID.toString()"  v-if="typeStr=='progshow'" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"></progshow-tem>
        

        <!-- <defin-excel></defin-excel> -->
        

    </div>
</template>
<script>
import {getTaskDetail} from "@/api/data"
import opraTem from "@/view/components/template_show/opra"
import fundedictTem from "@/view/components/template_show/fund_edict"
import fundshowTem from "@/view/components/template_show/fund_show"
import progedictTem from "@/view/components/template_show/prog_edict"
import progshowTem from "@/view/components/template_show/prog_show"

import definExcel from "@/view/components/template_show/defin_excel"
import {TaskTypeID} from "@/libs/data"
export default {
    components:{
        opraTem,
        fundedictTem,
        progedictTem,
        progshowTem,
        fundshowTem,
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
              'progshow':[
                   TaskTypeID.itemProcess,
                   TaskTypeID.itemInvestment,
                   TaskTypeID.itemSummary,
                   TaskTypeID.itemProfile,
                   TaskTypeID.itemAgreement,
                //    TaskTypeID.itemAgreement其他事宜
              ],
              'progedict':[
                   TaskTypeID.itemDevelop,
                   TaskTypeID.itemProjectApproval,
                   TaskTypeID.itemChange,
              ],
              'fundshow':[
                  TaskTypeID.fundAffairs,
                  TaskTypeID.fundVote,
                  TaskTypeID.fundPartnership
              ],
              'fundedic':[
                  TaskTypeID.fundDevelop,
                  TaskTypeID.fundProjects,
                  TaskTypeID.fundChanges,
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
            console.log(1)
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
            }else if(this.typeIdObj.progshow.indexOf(this.taskTypeID)!=-1){
                this.typeStr='progshow'
            }else if(this.typeIdObj.progedict.indexOf(this.taskTypeID)!=-1){
                this.typeStr='progedict'
            }else if(this.typeIdObj.fundshow.indexOf(this.taskTypeID)!=-1){
                this.typeStr='fundshow'   
            }else{
                this.typeStr='fundedic'
            }
        }
    }
}
</script>
<style lang="less" scoped>

</style>