<template>
    <div class="excel">
        <div style="background:#fff;padding:15px 15px;margin-bottom:15px;">
             <Steps :current="current" style="margin:15px 0;">
                <Step title="自定义表单" ></Step>
                <Step title="自定义流程" ></Step>
                <Step title="提交" ></Step>
            </Steps>
            <p>
                <Button type="primary" :disabled="current==0" @click="previousStep"  style="margin-right:15px;">上一步</Button>

                <Button type="primary" :disabled="current==2" @click="nextStep">下一步</Button>
            </p>
            
        </div>
       
        <Row :gutter="16" v-if="current==0">
            <Col span="3">
                <Card>
                    <p slot="title">组件</p>
                    <Row type="flex" justify="center" align="middle" style="text-align:center;">
                        <Col span="12" >
                            <div class="comItem" @click="addCom('input')">
                                <Icon custom="iconfont icon-danhangshurukuang" />
                                <p>单行输入框</p>   
                            </div>
                        </Col>
                        <Col span="12">
                         <div class="comItem"  @click="addCom('textarea')">
                             <Icon custom="iconfont icon-duohangshurukuang" />
                            <p>多行输入框</p>
                            </div>
                        </Col>
                        <Col span="12" >
                         <div class="comItem"  @click="addCom('radio')">
                             <Icon custom="iconfont icon-danxuan" />
                            <p>单选</p>
                            </div>
                        </Col>
                        <Col span="12" >
                         <div class="comItem"  @click="addCom('checkbox')">
                             <Icon custom="iconfont icon-duoxuan" />
                            <p>多选</p>
                            </div>
                        </Col>
                        <Col span="12"  >
                         <div class="comItem"  @click="addCom('select')">
                             <Icon custom="iconfont icon-xiala" />
                            <p>下拉框</p>
                            </div>
                        </Col>
                        <Col span="12" >
                            <div class="comItem"  @click="addCom('email')">
                                <Icon custom="iconfont icon-youxiang" />
                                <p>邮箱</p>
                            </div>
                        </Col>
                        <Col span="12" >
                            <div class="comItem"  @click="addCom('timepicker')">
                                <Icon custom="iconfont icon-shijian" />
                                <p>时间选择</p>
                            </div>
                        </Col>
                        <Col span="12" >
                            <div class="comItem"  @click="addCom('number')">
                                <Icon custom="iconfont icon-shuzishurukuang" />
                                <p>数字</p>
                            </div>
                        </Col>
                         <Col span="12" >
                            <div class="comItem"  @click="addCom('member')">
                                <Icon type="md-person" />
                                <p>人员选择</p>
                            </div>
                        </Col>
                        <Col span="12" >
                            <div class="comItem"  @click="addCom('platform')">
                                <Icon type="md-flag" />
                                <p>权属平台</p>
                            </div>
                        </Col>
                        <Col span="12" >
                            <div class="comItem" @click="addCom('depart')">
                                <Icon type="ios-contacts" />
                                <p>部门</p>
                            </div>
                        </Col>
                        <Col span="12" >
                            <div class="comItem"  @click="addCom('fund')">
                                <Icon type="logo-buffer" />
                                <p>基金</p>
                            </div>
                        </Col>
                        <Col span="12" >
                            <div class="comItem"  @click="addCom('program')">
                                <Icon type="md-code" />
                                <p>项目</p>
                            </div>
                        </Col>
                        <Col span="12" >
                            <div class="comItem"  @click="addCom('table')">
                                <Icon type="md-menu" />
                                <p>多行表格</p>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Col>
            
            <Col span="16">
                 <Card style="overflow:auto;">
                    <p slot="title">流程详情</p>
                    <Form >
                        <FormItem label="流程标题" :label-width="80">
                            <Input v-model="title"  placeholder="请输入流程标题"></Input>
                        </FormItem>
                    </Form>
                    <Divider dashed/>
                    <form-component :class="checkIndex==index?'check':' '" @getIndex="getIndex"  v-for="(item,index) in tableData" :index="index" :obj="item" :key='index'></form-component>


                </Card>
            </Col>
            <Col span="5">
                 <Card>
                    <p slot="title">属性</p>
                    <form-attr @updateComponent='updateTable'  @deleteCom="deleteIndexCom" v-if="AttrData" :setAttrData="AttrData" :indexCom="indexAttr"></form-attr>
                </Card>
            </Col>


        </Row>
        <Row :gutter="16" v-if="current==1">
            <Card>
                <p slot="title">流程设置</p> 
                    <Table :columns="columnsProcess" :data="dataProcess"  >
                         <template slot-scope="{ row, index }" slot="action">
                            <span style="margin-right:8px;color:#2d8cf0;cursor:pointer;" @click='showProcess(row,index)'>编辑</span>
                            <span style="color:#ed4014;cursor:pointer;"  @click='deleteProcess(row,index)'>删除</span>
                        </template>
                    </Table>
                    <Button  style="margin-top: 24px" type="success" @click="showProcess('',-1)">新增流程</Button>
            </Card>
        </Row>
         <Row :gutter="16" v-if="current==2">
                <Card  class="itemCard" style="overflow:auto;">
                    <p slot="title">表格详情</p>
                    <Form >
                        <FormItem label="流程名称" :label-width="80">
                            <b>{{title}}</b>
                        </FormItem>
                    </Form>
                    <Divider dashed/>
                    <component-show   v-for="(item,index) in tableData" :index="index" :obj="item" :key="index"></component-show >
                </Card>
             <Card  class="itemCard">
                <p slot="title">流程设置</p> 
                <Table :columns="columnsProcessSub" :data="dataProcess" ></Table>
                <Button type="primary" style="margin-top:20px;" @click="submit()">提交</Button>
            </Card>
            
        </Row>
        
        <process-basic @recive-objData='getProcessData' :key='componentKey' ref="processBasic"></process-basic>
    </div>
</template>
<script>
import {component} from './conmonent'
import processBasic from "@/view/components/template/process_basic"
import formComponent from "@/view/components/define/component.vue"
import componentShow from "@/view/components/define/componentShow.vue"
import formAttr from "@/view/components/define/attr.vue"
import {addNewDefine} from "@/api/data"

export default {
    mounted(){
        // console.log(component)
    },
    components:{
        formComponent,
        componentShow,
        processBasic,
        formAttr
    },
    watch:{ 
        dataProcess(){
            this.componentKey+=1;
        }
    },
    data(){
        return{
            checkIndex:-1,
            AttrData:null,
            indexAttr:0,
            current:0,
            componentKey:0,
            title:'',
            postdata:{},
            columnsProcess:[
                {title:"序号",key:"FlowID"},
                {title:"任务流描述",key:"FlowSummary"},
                {title:"处理要求",key:"FlowRequireName" },
                {title:"时间",key:"FlowTimeLimit"},
                {title:"处理人",key:"FlowOwnerName"},
                {title:"处理组",key:"FlowGroupName",},
                {title:"操作",key:"deal",slot: 'action'}
            ],
            dataProcess:[

            ],
            columnsProcessSub:[
                {title:"序号",key:"FlowID"},
                {title:"任务流描述",key:"FlowSummary"},
                {title:"处理要求",key:"FlowRequireName" },
                {title:"时间",key:"FlowTimeLimit"},
                {title:"处理人",key:"FlowOwnerName"},
                {title:"处理组",key:"FlowGroupName",},
              
            ],
            tableData:[]
        }
    },
    methods:{
        
        getProcessData(dat,flag){
            if(flag){
                //新增
                 this.dataProcess.push(dat)
            }else{
                
                this.dataProcess[dat.EdictIndex]['FlowGroup']=dat.FlowGroup;
                this.dataProcess[dat.EdictIndex]['FlowGroupName']=dat.FlowGroupName
                this.dataProcess[dat.EdictIndex]['FlowID']=dat.FlowID
                this.dataProcess[dat.EdictIndex]['FlowOwner']=dat.FlowOwner
                this.dataProcess[dat.EdictIndex]['FlowOwnerName']=dat.FlowOwnerName
                this.dataProcess[dat.EdictIndex]['FlowRequire']=dat.FlowRequire
                this.dataProcess[dat.EdictIndex]['FlowRequireName']=dat.FlowRequireName
                this.dataProcess[dat.EdictIndex]['FlowSummary']=dat.FlowSummary
                this.dataProcess[dat.EdictIndex]['FlowTimeLimit']=dat.FlowTimeLimit
            }
           
        },
        addCom(type){
            this.tableData.push(JSON.parse(JSON.stringify(component[type])));
        },getIndex(index){
            this.checkIndex=index;
            this.AttrData=this.tableData[index];
            this.indexAttr=index;
        },
        deleteIndexCom(index){
            this.tableData.splice(index,1);
             this.checkIndex=-1;
             this.AttrData=null;
        },submit(){
            //提交新增自定义流程
            // this.postdata={
            //     title:this.title,
            //     tableData:this.tableData
            // }
            
            this.postdata={
                TaskTypeID:0,
                FatherTypeID:49,
                TypeName:this.title,
                NumberPrefix:'暂无',
                ApiAdd:'暂无',
                ApiAddtofile:'暂无',
                ApiQuery:'暂无',
                ApiModagree:'暂无',
                UI:'暂无',
                Metadata:JSON.stringify(this.tableData),
                CurYear:0,
                CurNumber:0,
                TypeStatus:1,
                FlowTemplates:this.dataProcess
            }

            addNewDefine(this.postdata).then(res=>{
                if(res.data.code==2002){
                     this.$Message.success({
                        content:'操作成功'
                    })    
                }else{
                    this.$Message.error({
                        content:'数据提交失败:'+res.data.message
                    })
                }
            })

            
        },nextStep(){
            this.current==2?this.current=this.current:this.current++
        },previousStep(){
            this.current==0?this.current=this.current:this.current--
        },deleteProcess(row,index){
            //删除该流程下的步骤
            this.$Modal.warning({
                title: '删除',
                content:'是否删除该流程步骤？',

                onOk:()=>{
                    this.dataProcess.splice(index,1)
                }

            })
        },
        showProcess(dat,type){
             this.$refs["processBasic"].showModal(dat,type);
        },updateTable(value){
            // this.tableData[this.checkIndex]=value;
        }
    }
}
</script>

<style lang="less" scoped>
    .check{
        background: #e8f3ff;
    }
    .ivu-card.ivu-card-bordered{
        overflow: visible;
    }
   .comItem{
       margin-top: 20px;
        cursor: pointer;
       &:hover {
          i,p{
              color:#2b85e4;
          } 

          
       }
       i{
           font-size: 2rem;
           margin-bottom: 8px;
       }
   }

</style>