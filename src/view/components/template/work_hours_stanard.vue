<template>
    <Modal
        v-model="modal1"
        title="标准工时参考标准"
        @on-ok="ok"
        
        width="700"
    >
        <Table stripe border  :columns="columns1" :data="data1"></Table>


    </Modal>
</template>
<script>
export default {
    name:"hoursStandard",
    data(){
        return{
            modal1:false,
            columns1:[
                { title:"角色安排", key:"plan" },
                { title:"工作分解", key:"part" ,render:(h,params)=>{
                        return h('div',{
                            attrs: {
                                    class:'subCol'
                                },
                        },[
                            h('ul', this.data1[params.index].part.map(item => {
                                
                                    return h('li', item)    
                                
                            }))
                        ])
                    } },
                { title:"预计工作量", key:"sum",render:(h,params)=>{
                        return h('div',{
                            attrs: {
                                    class:'subCol'
                                },
                        },[
                            h('ul', this.data1[params.index].sum.map(item => {
                                
                                    return h('li', item)    
                               
                            }))
                        ])
                    } 
                },
                { title:"标准工时", key:"hours",render:(h,params)=>{
                        return h('div',{
                            attrs: {
                                    class:'subCol'
                                },
                        },[
                            h('ul', this.data1[params.index].hours.map(item => {
                               
                                    return h('li', item)    
                                
                                
                            }))
                        ])
                    }  }
            ],
            data1:[
                { 
                  plan:"项目经理(合伙人)",
                  part:["项目承揽及其沟通","客户持续沟通","项目专题会议","报告审阅","其他工作"],
                  sum:[3,12,6,30,5],
                  hours:[16,8,4,2,4]
                },
                 { 
                  plan:"项目主办",
                  part:["项目建议书","项目协议","工作备忘录","项目专题会议","项目内部文件","行业研究报告","其他工作"],
                  sum:[2,1,12,6,10,2,5],
                  hours:[16,8,8,4,2,40,4]
                },
                 { 
                  plan:"辅助合伙人1",
                  part:["项目专题会议或沟通"],
                  sum:[6],
                  hours:[4]
                },
                 { 
                  plan:"辅助合伙人2",
                  part:["项目专题会议或沟通"],
                  sum:[6],
                  hours:[4]
                },
                 { 
                  plan:"后台支持人员",
                  part:["文件整理及支持"],
                  sum:[240],
                  hours:[1]
                }
            ]
        }

    },methods:{
        showModal(flag){
            this.modal1=flag
        },ok(){

        }
    }
}
</script>
<style >
    .subCol>ul>li{
      margin:0 -18px;
      list-style:none;
      text-Align: center;
      padding: 7px;
      border-bottom:1px solid #ccc;
      overflow-x: hidden;
      text-align: center;
}

.subCol>ul>li:last-child{
  border-bottom: none
}
</style>