
<template>
<!-- 人员管理-->
    <div class="progress">
         <Row >
            <Col span="24" style="background:#fff;margin:15px 0;padding:15px 0;">
                <!-- <Button type="primary" style="margin-left:20px;">新增页签</Button> -->
                <Button type="primary" style="margin-left:20px;" @click="flagMod=true">新增模板</Button>
                <Button type="error" style="margin-left:20px;" @click="deleteTep()">删除模板</Button>
            </Col>
        </Row>
         <Row :gutter="16">
              <Col span="4" >
                    <Menu theme="light"   :open-names="['1']" style="width:100%;">
                         <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-paper" />
                                模板列表
                            </template>
                            <MenuItem name="1-1">模板1</MenuItem>
                            <MenuItem name="1-2">模板2</MenuItem>
                            <MenuItem name="1-3">模板3</MenuItem>
                         </Submenu>
                    </Menu>     
              </Col>
              <Col span="20" >
                     <Row >
                        <Col span="24" style="background:#fff;margin:15px 0;padding:15px 0;">
                            <Button type="primary" style="margin-left:20px;" @click="showProcess()">新增流程</Button>
                        </Col>
                    </Row>
                    <Table :columns="columns_mem" :data="data_mem"></Table>
                
              </Col>
         </Row>        
            <Modal
            v-model="flagMod"
            title="名称"
            
            @on-ok="asyncOK">
             <Form class="formWrap"  :label-width="80" >
                  <FormItem label="模板名称" prop="name">
                        <Input placeholder="模板名称"></Input>
                </FormItem>
            </Form>
        </Modal> 
           
            <process-basic ref="processBasic"></process-basic> 
    </div>
</template>
<script>
import processBasic from "@/view/components/template/process_basic"

export default {
      components:{
      
        processBasic,
      
    },
    data(){
        return{
            name:'',
            phone:'',
            flagMod:false,
            data_mem:[
                {id:0,des:"公司经理助理审批",req:"项目组内部审批",time:"1",mem:"测试用户1",team:""},
                {id:0,des:"公司经理助理审批",req:"项目组内部审批",time:"1",mem:"测试用户1",team:""},
                {id:0,des:"公司经理助理审批",req:"项目组内部审批",time:"1",mem:"测试用户1",team:""},
               
            ],
            columns_mem:[
                // {type: 'selection',width: 60, align: 'center'},
                {title: '序号', align: 'center',key:'id'},
                {title: '描述', key: 'des'},
                {title: '处理要求', key: 'req'}, 
                {title: '时间', key: 'time'}, 
                {title: '处理人', key: 'mem'}, 
                {title: '处理组', key: 'team'}, 
                {title: '操作', key: 'deal',render:(h,params)=>{
                    return h('div',[ 
                         h('span',{
                            style:{
                                color:'#2d8cf0',
                                cursor:'pointer',
                                marginRight:"8px"
                            },on:{
                                click:()=>{
                                   this.$refs["processBasic"].showModal(true);
                                }
                            }
                        },'编辑'),
                         h('span',{
                            style:{
                                color:'#ed4014',
                                cursor:'pointer'
                            },on:{
                                click:()=>{
                                   this.deleteTap();
                                }
                            }
                        },'删除')
                    ])
                }},
              

            ],
           
            
        }
    },
    methods:{
         filterMethod (value, option) {
             console.log(value,option)
                return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
            },showProcess(){
             this.$refs["processBasic"].showModal(true);
        },deleteTap(){
            this.$Modal.warning({
                title:"删除流程",
                content:"确定删除该流程?",
                onOk(){
                    console.log("删除")
                }

            })
        },deleteTep(){
             this.$Modal.warning({
                title:"删除模板",
                content:"确定删除该模板?",
                onOk(){
                    console.log("删除")
                }

            })
        },asyncOK(){

        }
    }
}
</script>
<style lang='less' scoped>
    .progress{
        width: 100%;
        height:100%;
        .itemCard{
            margin-bottom: 20px;
        }
        
    }
</style>