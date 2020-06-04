<template>
    <div class="neadDealDetail">
        <!-- 运营会议展示 -->
        <opra-tem           :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"     v-if="typeStr=='opra'&&flowRequire>100" ></opra-tem>
       <!-- 运营会议编辑 -->
        <opra-edict         :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"     v-if="typeStr=='opra'&&flowRequire<=100" ></opra-edict >
       <!-- 周报 -->
       <weekly-show         :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"     v-if="typeStr=='weekly'&&flowRequire>100"></weekly-show>
       <weekly-edict        :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"     v-if="typeStr=='weekly'&&flowRequire<=100"></weekly-edict>
       
<!-- 基金开发编辑 -->
        <fundedict-tem      :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"     v-if="typeStr=='funDevelop'&&flowRequire<100"></fundedict-tem>
<!-- 基金开发,立项，变动展示 -->
        <fundshow-tem       :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"     v-if="(typeStr=='funDevelop'||typeStr=='funChange')&&flowRequire>=100" ></fundshow-tem>
<!-- 基金退出 -->
        <fun-exit-edict     :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"  v-if="typeStr=='funExit'&&flowRequire<=100" >   </fun-exit-edict>
        <fun-exit-show      :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"  v-if="typeStr=='funExit'&&flowRequire>100" >   </fun-exit-show>
<!-- 基金投资 -->
        <fun-inves-edict    :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"  v-if="typeStr=='funInvest'&&flowRequire<=100" >   </fun-inves-edict>
        <fun-inves-show     :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"  v-if="typeStr=='funInvest'&&flowRequire>100" >   </fun-inves-show>
<!-- 基金会议3个 -->
        <fun-exe-edict      :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"  v-if="typeStr=='funExe'&&flowRequire<=100" >   </fun-exe-edict>
        <fun-exe-show       :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"  v-if="typeStr=='funExe'&&flowRequire>100" >   </fun-exe-show>
<!-- 基金变动,立项 -->
        <fun-change-edict   :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"  v-if="typeStr=='funChange'&&flowRequire<=100" >   </fun-change-edict>
        
      
      <!-- 项目开发 编辑 -->
        <progedict-tem      :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"     v-if="typeStr=='proDevelop'&&flowRequire<100"  ></progedict-tem>
      <!-- 项目开发，立项，变动展示 -->
        <progshow-tem       :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"     v-if="(typeStr=='proDevelop'||typeStr=='proChange')&&flowRequire>100"  ></progshow-tem>    
     
      <!-- 项目变动，立项编辑-->
        <pro-change-edict   :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"  v-if="typeStr=='proChange'&&flowRequire<=100" >   </pro-change-edict>
      <!-- 项目进展的几个 -->
        <pro-process-edict  :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"  v-if="typeStr=='proProcess'&&flowRequire<=100" >   </pro-process-edict>
        <pro-process-show   :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"  v-if="typeStr=='proProcess'&&flowRequire>100" >   </pro-process-show>
    
   
        
        <!-- 外勤费 编辑 -->
        <cost-field         :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"     v-if="typeStr=='field'&&flowRequire>100"      ></cost-field>
        <!-- 外勤费用展示 -->
        <cost-field-show    :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"      v-if="typeStr=='field'&&flowRequire<=100"      ></cost-field-show>
          
        <!-- 招待 -->
        <cost-entertain     :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"     v-if="typeStr=='entertain'&&flowRequire>100"  ></cost-entertain>
        <!-- 招待 展示 -->
        <cost-entertain-show :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"     v-if="typeStr=='entertain'&&flowRequire<=100"  ></cost-entertain-show>
          
        <!-- 工资 编辑 -->
        <cost-wage          :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"     v-if="typeStr=='wage'&&flowRequire>100"       ></cost-wage>
        <!-- 工资 展示 -->
        <cost-wage-show      :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"     v-if="typeStr=='wage'&&flowRequire<=100"       ></cost-wage-show>
             
        <!-- 项目收入编辑 -->
        <cost-program       :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"     v-if="typeStr=='program'&&flowRequire>100"    ></cost-program>
        <!-- 项目收入展示 -->
        <cost-program-show  :taskFlowID="taskFlowID.toString()"  :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"     v-if="typeStr=='program'&&flowRequire<=100"    ></cost-program-show>
           
        <!-- 差旅 编辑 -->
        <cost-train         :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"     v-if="typeStr=='train'&&flowRequire>100"      ></cost-train>
        <!-- 差旅展示 -->
        <cost-train-show    :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"      v-if="typeStr=='train'&&flowRequire<=100"      ></cost-train-show>
           
        <!-- 一般费用编辑 -->
        <cost-general       :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"     v-if="typeStr=='general'&&flowRequire<=100"    ></cost-general>
        <!-- 一般费用 展示 -->
        <cost-general-show  :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"      v-if="typeStr=='general'&&flowRequire>100"    ></cost-general-show>



        <!-- 部门新增编辑 -->
        <dep-edict          :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"      v-if="typeStr=='depApp'&&flowRequire>100"    ></dep-edict>
        <!-- 部门新增展示 -->
        <dep-show           :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"     v-if="typeStr=='depApp'&&flowRequire<=100"    ></dep-show>
               
        <!-- 平台新增 编辑     -->
        <plat-edict         :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"      v-if="typeStr=='platApp'&&flowRequire>100"    ></plat-edict>
        <!-- 平台新增展示      -->
       <plat-show          :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"     v-if="typeStr=='platApp'&&flowRequire<=100"    ></plat-show>




<!--还需项目立项，变动，（进展、总结、文件、业务协议、其他事宜)、动态模板、基金立项、变动、（执行、投决、合伙人）、投资、退出、部门变动、权属平台变动-->
        <!-- 平台修改 -->
        <plat-change-edict  :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"  v-if="typeStr=='platChange'&&flowRequire<=100" >   </plat-change-edict>
        <plat-change-show   :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"  v-if="typeStr=='platChange'&&flowRequire>100" >   </plat-change-show>

<!-- 部门修改 -->
        <dep-change-edict   :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"  v-if="typeStr=='depChange'&&flowRequire<=100" >   </dep-change-edict>
        <dep-change-show    :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"  v-if="typeStr=='depChange'&&flowRequire>100" >   </dep-change-show>

        <!-- <fun-change-show    :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"  v-if="typeStr=='funChange'&&flowRequire>100" >   </fun-change-show> -->
<!-- 动态模板 -->
        <pro-dynimic-edict  :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"  v-if="typeStr=='proDynimic'&&flowRequire<=100" >   </pro-dynimic-edict>
        <pro-dynimic-show   :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"  v-if="typeStr=='proDynimic'&&flowRequire>100" >   </pro-dynimic-show>

        <!-- <pro-change-show    :taskFlowID="taskFlowID.toString()" :taskID="taskID.toString()" :taskTypeID="taskTypeID.toString()"  v-if="typeStr=='proChange'&&flowRequire<=100" >   </pro-change-show> -->
<!-- 运营会议编辑 -->


<!-- 
  项目开发，立项，变动，审批不可编辑审批页面同一个
项目进展，投资，总结，专业文件，业务协议，其他事项不可编辑审批页面为同一个

基金开发，立项，变动，审批不可编辑页面同一个
基金执行事务，投决会，合伙人会，不可编辑审批页面为同一个


 -->


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

import depShow from "@/view/components/template_show/department_show"
import depEdict from "@/view/components/template_show/department_edict"

import platShow from "@/view/components/template_show/platform_show"
import platEdict from "@/view/components/template_show/platform_edict"


import definExcel from "@/view/components/template_show/defin_excel"


import platChangeEdict from "@/view/components/template_show/plat_change_edict"
import platChangeShow from "@/view/components/template_show/plat_change_show"

import depChangeEdict from "@/view/components/template_show/dep_change_edict"
import depChangeShow from "@/view/components/template_show/dep_change_show"

import funExitEdict from "@/view/components/template_show/fun_exit_edict"
import funExitShow from "@/view/components/template_show/fun_exit_show"

import funInvesEdict from "@/view/components/template_show/fun_inves_edict"
import funInvesShow from "@/view/components/template_show/fun_inves_show"

import funExeEdict from "@/view/components/template_show/fun_exe_edict"
import funExeShow from "@/view/components/template_show/fun_exe_show"

import funChangeEdict from "@/view/components/template_show/fun_change_edict"
import funChangeShow from "@/view/components/template_show/fun_change_show"

import proDynimicEdict from "@/view/components/template_show/pro_dynimic_edict"
import proDynimicShow from "@/view/components/template_show/pro_dynimic_show"

import proProcessEdict from "@/view/components/template_show/pro_process_edict"
import proProcessShow from "@/view/components/template_show/pro_process_show"

import proChangeEdict from "@/view/components/template_show/pro_change_edict"
import proChangeShow from "@/view/components/template_show/pro_change_show"

import weeklyShow from "@/view/components/template_show/weekly_show"
import weeklyEdict from "@/view/components/template_show/weekly_edict"
import opraEdict from "@/view/components/template_show/opra_edict"


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
        costGeneralShow,
        depShow,
        depEdict,
        platShow,
        platEdict,
        platChangeEdict,
        platChangeShow,
        depChangeEdict,
        depChangeShow,
        costTrainShow,
        funExitEdict,
        funExitShow,
        funInvesEdict,
        funInvesShow,
        funExeEdict,
        funExeShow,
        funChangeEdict,
        funChangeShow,
        proDynimicEdict,
        proDynimicShow,
        proProcessEdict,
        proProcessShow,
        proChangeEdict,
        proChangeShow,
        weeklyShow,
        weeklyEdict,
        opraEdict

    },
    data(){
        return{
          taskID:'',
          taskTypeID:'',
          taskFlowID:'',
          typeStr:'',
          url:'',
          flowRequire:'',
          taskTypeList:{
            3: "proDevelop",//项目开发
            4: "proChange",//项目立项
            5: "proChange", //项目变动
            6: "proProcess",//项目进展
            7: "proProcess",//项目总结
            8: "proProcess",//项目文件 
            9: "proProcess",//项目协议
            10:'proProcess',//其他事宜
            13: "train",//差旅费报
            14: "entertain", //招待费用
            15: "general",//一般费用
            16: "opra",//总经理会
            17: "opra",//合伙人会
            18: "opra",//股东会
            19: "opra",//董事会
            20: "opra",//监事会
            23: "weekly",//工时周报
            24: "field", //外勤费用
            25: "program",//项目收入
            26: "proProcess", //项目投资
            27: "funExe",//基金事务
            28: "funExe",//基金投决
            29: "funExe",//基金合伙
            30: "wage",//工资费用

            37: 'platApp',//权属平台新增
            38: 'platChange',//权属平台变动
            40: 'depApp',//部门新增
            41: 'depChange',//部门变动
            45: 'funDevelop',//基金开发
            46: 'funChange',//基金立项
            47: 'funChange',//基金变动
            54: 'funInvest',//基金投资
            55: 'funExit'//基金退出
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
            this.flowRequire=this.$route.query.flowRequire;
        },
        getShowFlag(){
            this.typeStr=this.taskTypeList[this.taskTypeID];
            console.log(this.typeStr)
        }
        
    }
}
</script>
<style lang="less" scoped>

</style>