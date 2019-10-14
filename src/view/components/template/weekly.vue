<template>
    <div class="weeklyCom" style="clear:both;">
        <!-- <Card class="itemCard">
           <p slot="title">基本信息</p>
           <Form :label-width="100">
               <Row>
                   <Col :span="16">
                        <FormItem label="标题:">
                            {{postData.title}}
                        </FormItem>
                   </Col>
                     <Col :span="8">
                        <FormItem label="任务编号:">
                            <h3> {{postData.taskNumber}}</h3>
                        </FormItem>
                   </Col>
               </Row>
                <Row>
                   <Col :span="16">
                        <FormItem label="填写人:">
                             {{postData.taskOwnerName}}
                        </FormItem>
                   </Col>
                   <Col :span="8">
                        <FormItem label="级别">
                             
                        </FormItem>
                   </Col>
                   <Col :span="8">
                        <FormItem label="周报期间:">
                            {{postData.startTime}}至{{postData.endTime}}
                        </FormItem>
                   </Col>
               </Row>
            </Form>  
        </Card> -->
          <Card  class="itemCard">
            <p slot="title">本周工作</p>
            <Form :label-width="100"  >
                    <FormItem label="本周工作:"  >
                        {{postData.thisEffect}}
                    </FormItem>
            </Form>  
            
        </Card> 
        <Card  class="itemCard">
            <p slot="title">下周工作</p>
            <Form :label-width="100"  >
                    <FormItem label="下周工作:" >
                        {{postData.nextPlan}}
                </FormItem>
            </Form>  
        </Card>
         <Card  class="itemCard">
            <p slot="title">工时填报</p>
            <a href="#" slot="extra" @click.prevent="exampleStandard">
               标准工时参考
            </a>
            <Table stripe :columns="columnsWork" :data="dataWork"></Table>
        </Card>  
        <hours-standard ref="hoursModal"></hours-standard>
    </div>
</template>
<script>
import hoursStandard from "@/view/components/template/work_hours_stanard.vue"
import {getProjectList} from "@/api/data"
import store from '@/store'

export default {
    name:"weeklyCom",
     components:{
      
        hoursStandard
    },
    props:{
        postData:Object,
    },
    mounted(){
        this.getProList()
       
    },
    watch:{
        postData(){
            this.dataWork=[];
            this.getProList()
        }
    },
    data (){
        return{
            proList:{},
            columnsWork:[
                {title:"工作事项",key:"Describe",width:200,render:(h,params)=>{
                    if(params.row.Describe=="合计"){
                        return h('div',[
                            h('span',{
                                style:{
                                    color:"#2b85e4"
                                }
                            },'合计')
                        ])
                    }else{
                         return h('div',[
                            h('span',{
                                
                            },params.row.Describe)
                        ])
                    }
                }},
                {title:"周一",key:"Time1"},
                {title:"周二",key:"Time2"},
                {title:"周三",key:"Time3"},
                {title:"周四",key:"Time4"},
                {title:"周五",key:"Time5"},
                {title:"周六",key:"Time6"},
                {title:"周日",key:"Time7"},
                {title:"合计",key:"TimeSum"},
                {title:"工时费用",key:"Fee"},
                {title:"客户简称",key:"ProjectId",width:150},
            ],
            dataWork:[]
        }
    },methods:{
      
        getProList(){
            getProjectList({"ProjectStatus":2,"USerID":JSON.parse(localStorage.getItem("userId"))}).then(res=>{
                res.data.projectList.forEach((element)=>{
                     this.proList[element.projectID]=element.projectSource
                })
                this.postData.items.forEach(element => {
                    this.dataWork.push({
                            Describe:element.describe,
                            Time1:element.time1,
                            Time2:element.time2,
                            Time3:element.time3,
                            Time4:element.time4,
                            Time5:element.time5,
                            Time6:element.time6,
                            Time7:element.time7,
                            TimeSum:element.timeSum,
                            Fee:element.fee,
                            ProjectId:this.proList[element.projectId] 
                    })
                    
                });
                 this.dataWork.push({Describe:"合计",Time1:0,Time2:0,Time3:0,Time4:0,Time5:0,Time6:0,Time7:0,TimeSum:0})
                
                this.dataWork.forEach((element)=>{
                    for (const key in element) {
                        if (element.hasOwnProperty(key)&&key!="Describe"&&key!="Fee"&&element.Describe!="合计"&&key!="ProjectId") {
                           this.dataWork[this.dataWork.length-1][key]+=parseInt(element[key]) 
                        }
                    }
                })
                
            })
        },exampleStandard(){
             this.$refs['hoursModal'].showModal(true)
        }
    }
}
</script>
<style lang="less" scoped>
    
</style>