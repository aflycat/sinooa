<template>
    <div class="neadDealDetail">
        <opra-tem :taskFlowID="taskFlowID.toString()"      v-if="typeStr=='opra'" :taskID="taskID.toString()"></opra-tem>
        <fundedict-tem :taskFlowID="taskFlowID.toString()" v-if="typeStr=='fundedic'" :taskID="taskID.toString()"></fundedict-tem>
        <fundshow-tem :taskFlowID="taskFlowID.toString()"  v-if="typeStr=='fundshow'" :taskID="taskID.toString()"></fundshow-tem>
        <progedict-tem :taskFlowID="taskFlowID.toString()" v-if="typeStr=='progedict'" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"></progedict-tem>
        <progshow-tem :taskFlowID="taskFlowID.toString()"  v-if="typeStr=='progshow'" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"></progshow-tem>    

        <cost-field :taskFlowID="taskFlowID.toString()"      v-if="typeStr=='field'&&flowRequire<=100"     :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"></cost-field>
        <cost-entertain :taskFlowID="taskFlowID.toString()"  v-if="typeStr=='entertain'&&flowRequire<=100" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"></cost-entertain>
        <cost-wage :taskFlowID="taskFlowID.toString()"       v-if="typeStr=='wage'&&flowRequire<=100"      :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"></cost-wage>
        <cost-program :taskFlowID="taskFlowID.toString()"    v-if="typeStr=='program'&&flowRequire<=100"   :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"></cost-program>
        <cost-train :taskFlowID="taskFlowID.toString()"      v-if="typeStr=='train'&&flowRequire<=100"     :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"></cost-train>
        <cost-general :taskFlowID="taskFlowID.toString()"    v-if="typeStr=='general'&&flowRequire<=100"   :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"></cost-general>


        <cost-field-show :taskFlowID="taskFlowID.toString()"      v-if="typeStr=='field'&&flowRequire>100"     :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"></cost-field-show>
        <cost-entertain-show :taskFlowID="taskFlowID.toString()"  v-if="typeStr=='entertain'&&flowRequire>100" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"></cost-entertain-show>
        <cost-wage-show :taskFlowID="taskFlowID.toString()"       v-if="typeStr=='wage'&&flowRequire>100"      :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"></cost-wage-show>
        <cost-program-show :taskFlowID="taskFlowID.toString()"    v-if="typeStr=='program'&&flowRequire>100"   :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"></cost-program-show>
        <cost-train-show :taskFlowID="taskFlowID.toString()"      v-if="typeStr=='train'&&flowRequire>100"     :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"></cost-train-show>
        <cost-general-show :taskFlowID="taskFlowID.toString()"    v-if="typeStr=='general'&&flowRequire>100"   :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"></cost-general-show>

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

import costField from "@/view/components/template_show/cost_field" 
import costEntertain from "@/view/components/template_show/cost_entertain"
import costWage from "@/view/components/template_show/cost_wage" 
import costProgram from "@/view/components/template_show/cost_program" 
import costTrain from "@/view/components/template_show/cost_train" 
import costGeneral from "@/view/components/template_show/cost_general"

import costFieldShow from "@/view/components/template_show/cost_field_show" 
import costEntertainShow from "@/view/components/template_show/cost_entertain_show"
import costWageShow from "@/view/components/template_show/cost_wage_show" 
import costProgramShow from "@/view/components/template_show/cost_program_show" 
import costTrainShow from "@/view/components/template_show/cost_train_show" 
import costGeneralShow from "@/view/components/template_show/cost_general_show"

import definExcel from "@/view/components/template_show/defin_excel"
import {TaskTypeID} from "@/libs/data"
export default {
    components:{
        opraTem,
        fundedictTem,
        progedictTem,
        progshowTem,
        fundshowTem,
        definExcel,
        costField,
        costEntertain,
        costWage,
        costWageShow,
        costProgram,
        costTrain,
        costGeneral,
        costFieldShow,
        costEntertainShow,
        costProgramShow,
        costTrainShow,
        costGeneralShow

    },
    data(){
        return{
          taskID:'',
          taskTypeID:'',
          taskFlowID:'',
          typeStr:'',
          url:'',
          flowRequire:'',
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
              ],
              'field':[
                    TaskTypeID.FieldExpenses
              ],
              'entertain':[
                    TaskTypeID.HospitalityExpenses
              ],
              'wage':[
                    TaskTypeID.WageExpenses
              ],
              'program':[
                    TaskTypeID.ProjectIncome
              ],
              'train':[
                    TaskTypeID.TravelExpensesReport
              ],
              'general':[
                  TaskTypeID.GeneralExpenses
              ]

          }
        }
    },
    mounted(){
         this.edictFlag()
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
            this.flowRequire=this.$route.query.flowRequire;
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
            }else if(this.typeIdObj.field.indexOf(this.taskTypeID)!=-1){
                this.typeStr='field'   
            }else if(this.typeIdObj.entertain.indexOf(this.taskTypeID)!=-1){
                this.typeStr='entertain'   
            }else if(this.typeIdObj.wage.indexOf(this.taskTypeID)!=-1){
                this.typeStr='wage'   
            }else if(this.typeIdObj.program.indexOf(this.taskTypeID)!=-1){
                this.typeStr='program'   
            }else if(this.typeIdObj.train.indexOf(this.taskTypeID)!=-1){
                this.typeStr='train'   
            }else if(this.typeIdObj.general.indexOf(this.taskTypeID)!=-1){
                this.typeStr='general'   
            }else{
                this.typeStr='fundedic'
            }
        },
        edictFlag(){

        }
    }
}
</script>
<style lang="less" scoped>

</style>