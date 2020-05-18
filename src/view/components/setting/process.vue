
<template>
<!-- 人员管理-->
    <div class="progress">
        <Row>
            <Col span="24" style="background:#fff;margin-bottom:15px;padding:15px 0;">
               <router-link to="/define_process/define_excel">
                <Button type="primary" style="margin-left:20px;" >新增模板</Button></router-link>
                <Button type="error" style="margin-left:20px;"  @click='deleteProcessTemplate'>删除模板</Button>
            </Col>
        </Row>
         <Row :gutter="16"  style="height:100%;">
              <Col span="4"   style="height:100%;overflow:hidden;">
                <Card class="pla_wrap" >
                    <p slot="title">流程模板</p>
                    <Menu theme="light" class="pla_menu"   @on-select="selectTemplate">
                        <template v-for="item in templateList">
                            <Submenu v-if="item.fatherTypeID==1" :key="item.taskTypeID"  :name="item.taskTypeID">
                                <template   slot="title">
                                    {{item.typeName}}
                                </template>
                                <template v-for="dat in templateList">
                                     <MenuItem   :name="dat.taskTypeID" v-if="(dat.fatherTypeID==item.taskTypeID)&&dat.typeLevel==2" :key="dat.taskTypeID">
                                        {{dat.typeName}}{{dat.taskTypeID}}
                                     </MenuItem>
                                    
                                </template>
                                
                            </Submenu>
                        </template>
                        
                    </Menu>     
                 </Card>
              </Col>
              <Col span="20" >
                    <Form :label-width="130" style="background:#fff;margin-bottom:15px;overflow:hidden;">

                        <Row  style="margin-top:15px;">
                            <Col span="12">
                                <FormItem label="类别名称：">
                                    <b> {{postdata.TypeName}}</b>
                                </FormItem>
                            </Col>

                            <Col span="12">
                                <FormItem label="编号前缀：">
                                    <b> {{postdata.NumberPrefix}}</b>
                                </FormItem>   
                            </Col>

                            <Col span="12">
                                <FormItem label="申请接口：">
                                   <b> {{postdata.ApiAdd}}</b>
                                </FormItem>   
                            </Col>

                            <Col span="12">
                                <FormItem label="申请接口(添加文件)：">
                                    <b> {{postdata.ApiAddtofile}}</b>
                                </FormItem>   
                            </Col>

                            <Col span="12">
                                <FormItem label="查询接口：">
                                    <b> {{postdata.ApiQuery}}</b>
                                </FormItem>   
                            </Col>
                            <Col span="12">
                                <FormItem label="修改并同意接口：">
                                    <b> {{postdata.ApiModagree}}</b>
                                </FormItem>   
                            </Col>
                            <Col span="24">
                                <FormItem label="UI：">
                                    <b> {{postdata.UI}}</b>
                                </FormItem>   
                            </Col>
                             <!-- <Col span="24">
                                <FormItem label="自定义表单内容">
                                    <Button type="primary" ghost style="margin-left:20px;border:none 0;">预览</Button>
                                    <Button type="primary" ghost style="margin-left:20px;border:none 0;">编辑</Button>
                                </FormItem>   
                            </Col> -->
                        </Row>
                    </Form>


                    <Table :columns="columns_mem" :data="data_mem">
                        <template slot-scope="{ row, index }" slot="action">
                            <span style="margin-right:8px;color:#2d8cf0;cursor:pointer;" @click='showProcess(row,index)'>编辑</span>
                            <span style="color:#ed4014;cursor:pointer;"  @click='deleteProcess(row,index)'>删除</span>
                        </template>
                    </Table>
                    <Row>
                        <Col span="24" style="background:#fff;margin:15px 0;padding:15px 0;">
                            <Button type="success" style="margin-left:20px;" @click="showProcess('',-1)">新增流程</Button>
                            <Button type="primary" style="margin-left:20px;" @click="submit">提交</Button>
                        </Col>
                    </Row>
              </Col>
         </Row>        
        <process-basic v-if='timeFlag' @recive-objData="reciveObj" ref="processBasic" :key="componentKey"></process-basic> 
    </div>
</template>
<script>
import processBasic from "@/view/components/template/process_basic"
import {
    getAllListquery,
    getListDetail,
    getRoleList,
    getAllUserList,
    deleteDefine,
    changeDefine

} from "@/api/data"
export default {
      components:{
        processBasic,
    },
    mounted(){
        this.getAllListquery();

        this.getRoleList();//获取处理组
        this.getAllUserList();//获取处理人
    },
    watch:{
        data_mem(){
            this.componentKey+=1;
        }
    },
    data(){
        return{
            name:'',
            phone:'',
            timeFlag:true,
        componentKey: 0,
            edictTypeId:'',
            edictTypeName:'',
            flagMod:false,
            templateList:'',
            data_mem:[],
            columns_mem:[
                {title: '步骤序号', align: 'center',key:'FlowID'},
                {title: '描述', key: 'FlowSummary'},
                {title: '处理要求', key: 'FlowRequireName'}, 
                {title: '时间(天)', key: 'FlowTimeLimit'}, 
                {title: '处理人', key: 'FlowOwnerName'}, 
                {title: '处理组', key: 'FlowGroupName'}, 
                {title:"操作",key:"deal",slot: 'action'}
            ],
            dealRequest:[
                {label:'审批',value:1},
                {label:'审批(只读)',value:101},
                {label:'协同审批',value:1001},
                {label:'传阅',value:10001}
            ],
            dealRequestReturn:{
                1:'审批',
                101:'审批(只读)',
                1001:'协同审批',
                10001:'传阅'

            },
            roleList:{},
            userList:{},
            addFlag:false,
            postdata:{
                TaskTypeID:'',
                FatherTypeID:'',
                TypeName:'',
                NumberPrefix:'',
                ApiAdd:'',
                ApiAddtofile:'',
                ApiQuery:'',
                ApiModagree:'',
                UI:'',
                Metadata:'',
                CurYear:'',
                CurNumber:'',
                TypeStatus:'',
                FlowTemplates:[]
            }
           
            
        }
    },
  
    methods:{
        getAllListquery(){
            //获取所有的流程目录
            getAllListquery({FatherTypeID:1}).then(res=>{
                if(res.data.code==2001){
                    this.templateList=res.data.taskTypeList
                }else{
                    this.$Message.error({
                        content:'流程目录数据加载失败:'+res.data.message
                    })
                }

            })
        },
        selectTemplate(name){
            //获取某个流程的详细信息
            this.edictTypeId=name;
            this.addFlag=true;
            getListDetail({TaskTypeID:name}).then(res=>{
                if(res.data.code==2003){
                    this.postdata={
                        TaskTypeID:res.data.taskTypeID,
                        FatherTypeID:res.data.fatherTypeID,
                        TypeName:res.data.typeName,
                        NumberPrefix:res.data.numberPrefix,
                        ApiAdd:res.data.apiAdd,
                        ApiAddtofile:res.data.apiAddtofile,
                        ApiQuery:res.data.apiAddtofile,
                        ApiModagree:res.data.apiModagree,
                        UI:res.data.ui,
                        Metadata:res.data.metadata,
                        CurYear:res.data.curYear,
                        CurNumber:res.data.curNumber,
                        TypeStatus:res.data.typeStatus,

                    }
                    this.edictTypeName=res.data.typeName;
                    this.loadProcessList(res.data.flowTemplates)
                }else{
                    this.$Message.error({
                        content:"流程详情获取失败:"+res.data.message
                    })
                }

            })

        },
        loadProcessList(dat){
            this.data_mem=[]
            dat.forEach(element => {
                this.data_mem.push({
                    FlowID:element.flowID,
                    FlowSummary:element.flowSummary,
                    FlowRequire:element.flowRequire,
                    FlowRequireName:this.dealRequestReturn[element.flowRequire],
                    FlowTimeLimit:element.flowTimeLimit,
                    FlowOwner:element.flowOwner,
                    FlowOwnerName:this.userList[element.flowOwner],
                    FlowGroup:element.flowGroup,
                    FlowGroupName:this.roleList[element.flowGroup] 
                })
            });
        },getRoleList(){
            getRoleList({"PageIndex":1,"PageSize":1000}).then(res=>{
                if(res.data.code==0){
                    // =;
                    res.data.roleList.forEach(element=>{
                        this.roleList[element.roleId]=element.roleName;
                        
                    })
                }else{
                    this.$Message.error({
                        content:'处理组数据加载失败:'+res.data.message
                    })
                }
            })
        },
        getAllUserList(){
            getAllUserList({"Status":1}).then(res=>{
                if(res.data.code==0){
                    // this.userList=res.data.userList;
                    res.data.userList.forEach(element=>{
                        this.userList[element.userId]=element.userName;
                    })
                }else{
                    this.$Message.error({
                        content:'处理人数据加载失败:'+res.data.message
                    })
                }
            })
        },
      
        reciveObj(msg,flag){
            
            // this.time+=1;
            //  obj,flag
            //获取组件传递的数据
            if(flag){
                this.data_mem.push(msg);
            }else{
                  // this.data_mem[obj.edictIndex]=obj
                this.data_mem[msg.EdictIndex].FlowID=msg.FlowID
                this.data_mem[msg.EdictIndex].FlowSummary=msg.FlowSummary
                this.data_mem[msg.EdictIndex].FlowRequire=msg.FlowRequire
                this.data_mem[msg.EdictIndex].FlowRequireName=msg.FlowRequireName
                this.data_mem[msg.EdictIndex].FlowTimeLimit=msg.FlowTimeLimit
                this.data_mem[msg.EdictIndex].FlowOwner=msg.FlowOwner
                this.data_mem[msg.EdictIndex].FlowOwnerName=msg.FlowOwnerName
                this.data_mem[msg.EdictIndex].FlowGroup=msg.FlowGroup
                this.data_mem[msg.EdictIndex].FlowGroupName=msg.FlowGroupName
                this.data_mem[msg.EdictIndex].EdictIndex=msg.EdictIndex

            }
            
        },deleteProcessTemplate(){
            //删除模板

            this.$Modal.confirm({
                title:"删除模板",
                content:"确定删除该模板:"+this.edictTypeName+"?",
                onOk:()=>{
                    this.deleteDefine()
                }

            })
        },
        showProcess(dat,type){
            // this.timeFlag+=1;
            // console.log( this.timeFlag)
             this.$refs["processBasic"].showModal(dat,type);
        },
        deleteProcess(row,index){
            //删除该流程下的步骤
            this.$Modal.warning({
                title: '删除',
                content:'是否删除该流程步骤？',

                onOk:()=>{
                    this.data_mem.splice(index,1)
                }

            })
        },deleteDefine(){
            //删除某个模板
            deleteDefine({TaskTypeID:this.edictTypeId}).then(res=>{
                if(res.data.code==2005){
                    this.$Message.success({
                        content:'操作成功'

                    })
                   this.getAllListquery();
                }else{
                    this.$Message.error({
                        content:'操作失败'+res.data.message
                    })
                }
            })
        },submit(){
            //修改某个模板
            this.postdata.FlowTemplates=this.data_mem;
            console.log(this.postdata)
            changeDefine(this.postdata).then(res=>{
                if(res.data.code==2004){
                    this.$Message.success({
                        content:'操作成功'
                    })
                }else{
                    this.$Message.error({
                        content:'操作失败：'+res.data.message
                    })
                }
            })
        }
    }
}
</script>
<style lang='less' >
    .progress{
        width: 100%;
        height:100%;
        .itemCard{
            margin-bottom: 20px;
        }
        .pla_wrap{
           height: 100%;
           .ivu-card-body{
               height: 100%;
               overflow: auto;
           }
           .ivu-menu-item-group-title{
               display: none;
           }
       }
       .pla_menu{
           width: 100% !important;
       }  
        
    }
</style>