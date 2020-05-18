<template>
<div>
    <Modal v-model="flags"  title="流程编辑" @on-ok="handleOk()" @on-cancel="handleCancle"  width="750px">

         <Form :label-width="100">
            <Row :gutter="16">
                 <Col span="12">
                    <FormItem label="步骤序号">
                        <Input v-model="flowID"  placeholder="步骤序号" ></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="任务流描述">
                        <Input v-model="dealSummary"  placeholder="任务流描述" ></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="处理要求">
                        <Select v-model="dealRequest"  @on-change="setDealRequest" label-in-value>
                            <Option v-for="item in dealRequestList" :value="item.value" :key="item.value">{{item.label}}</Option>  
                        </Select> 
                    </FormItem>
                </Col>
                 <Col span="12">
                    <FormItem label="处理时间">
                       <Input v-model="dealTime" placeholder="处理时间(天)"></Input>
                    </FormItem>
                </Col>
               <Col span="12">
                    <FormItem label="处理类型">
                        <Select  v-model='edictType'     placeholder='请选择处理类型'>
                            <Option value='1'>处理人</Option>
                            <Option value='2'>处理组</Option>
                        </Select> 
                    </FormItem>
                </Col>
                <Col span="12" v-if='edictType==1'>
                    <FormItem  label="处理人"  >
                      <Select v-model="dealPerson"  @on-change="setDealPerson"    label-in-value placeholder='处理人和处理组二选一'>
                            <Option v-for="item in userList" :value="item.userId" :key="item.userId">{{item.userName}}</Option>
                        </Select> 
                    </FormItem>
                </Col>
                <Col span="12" v-if='edictType==2'>
                    <FormItem label="处理组">
                       <Select  v-model="dealGroup" @on-change="setDealGroup"      label-in-value  placeholder='处理人和处理组二选一'>
                            <Option v-for="item in roleList" :value="item.roleId" :key="item.roleId">{{item.roleName}}</Option>
                        </Select> 
                    </FormItem>
                </Col>
            </Row> 
        </Form>
    </Modal>
    </div>
</template>
<script>
import {getRoleList,getAllUserList} from "@/api/data"
export default {
    name:"processBasic",
    props:{
        'edictDatas':Object
    },
    data(){
        return{
            flags:false,
            dealRequestList:[
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
            dealPerson:'',//处理人
            dealPersonName:'',//处理人名字
            dealGroup:'',//处理组
            dealGroupName:'',//处理组id
            dealRequest:'',//处理要求id
            dealRequestName:'',//处理要求名字
            dealSummary:'',//任务流描述
            dealTime:'',//处理时间
            flowID:'',
            edictIndex:-1,
            isedict:false,//是否为编辑
            edictType:0//1是处理人2是处理组

            
        }
    },
    mounted(){
        this.getRoleList();//获取所有的角色
        this.getAllUserList();//获取所有的用户
       this.edictType=0;

    },
    methods:{
        getRoleList(){
            getRoleList({"PageIndex":1,"PageSize":1000}).then(res=>{
                if(res.data.code==0){
                    this.roleList=res.data.roleList;
                    
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
                    this.userList=res.data.userList;
                }else{
                    this.$Message.error({
                        content:'处理人数据加载失败:'+res.data.message
                    })
                }
            })
        },
        handleOk(){
            if(this.edictType==1){
                 let obj={
                    FlowID:this.flowID,
                    FlowSummary:this.dealSummary,
                    FlowRequire:this.dealRequest,
                    FlowRequireName:this.dealRequestName,
                    FlowTimeLimit:this.dealTime,
                    FlowOwner:this.dealPerson,
                    FlowOwnerName:this.dealPersonName,
                    FlowGroup:0,
                    FlowGroupName:null,
                    EdictIndex:this.edictIndex
                }
                this.$emit('recive-objData',obj,this.isedict)
            }else{
                 let obj={
                    FlowID:this.flowID,
                    FlowSummary:this.dealSummary,
                    FlowRequire:this.dealRequest,
                    FlowRequireName:this.dealRequestName,
                    FlowTimeLimit:this.dealTime,
                    FlowOwner:'',
                    FlowOwnerName:null,
                    FlowGroup:this.dealGroup,
                    FlowGroupName:this.dealGroupName,
                    EdictIndex:this.edictIndex//编辑的哪一个
                }
                this.$emit('recive-objData',obj,this.isedict)
            }
           
            
            
        },
        showModal(dat,edictFlag){
            //edictFlag -1是新增
             this.flags=true;
            if(edictFlag==-1){
                this.isedict=true;//新增
                this.flowID='';
                this.dealRequest='';
                this.dealRequestName='';
                this.dealSummary='';
                this.dealTime='';
                this.dealPerson='';
                this.dealPersonName='';
                this.dealGroup='';
                this.dealGroupName='';
                 this.edictIndex=edictFlag;
               
            }else{
                this.isedict=false;
                this.flowID=dat.FlowID;
                this.dealRequest=dat.FlowRequire;
                this.dealRequestName=dat.FlowRequireName;
                this.dealSummary=dat.FlowSummary;
                this.dealTime=dat.FlowTimeLimit;
                this.dealPerson=dat.FlowOwner||'';
                this.dealPersonName=dat.FlowOwnerName||'';
                this.dealGroup=dat.FlowGroup||'';
                this.dealGroupName=dat.FlowGroupName||'';
                this.edictIndex=edictFlag;

               
                if(!dat.FlowGroup){
                    this.edictType='1'
                }else{
                    this.edictType='2'
                }


            }
          
            
        },
        setDealRequest(dat){
            this.dealRequestName=dat.label;
        },
        setDealPerson(dat){
            // this.dealGroup=null;
            // this.dealGroupName=null;
            this.dealPersonName=dat.label;
            // this.dealPerson=dat.value;
            // this.edictType=1;
            // this.$refs.clearDealGroup.label=''

            // this.$refs['clearDealGroup'].clearSingleSelect();
           
        },
        setDealGroup(dat){
            // this.dealPerson=null;
            // this.dealPersonName=null;
            this.dealGroupName=dat.label;
            //  this.dealGroup=dat.value;
            // this.edictType=2;
            //  this.$refs.clearDealPerson.label=''

            // this.$refs['clearDealPerson'].clearSingleSelect();
       
           
            
        },
        handleCancle(){
            this.edictType=0
        }
    }
}
</script>
<style lang="less" scoped>

</style>