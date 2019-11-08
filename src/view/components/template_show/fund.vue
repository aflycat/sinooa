<template>
    <div class="fundTem">
         <Card  class="itemCard">
            <p slot="title">任务明细</p>
            <Form :label-width="80">
                <Row>
                     <Col span="24">
                        <FormItem label="任务编号：">
                            {{getdata.taskNumber}}
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="事项要点：">
                            {{getdata.taskName}}
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="事项标签：">
                            <!-- {{getdata.}} -->
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="报送人：">
                            {{getdata.taskOwnerName}}
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="联系电话：">
                            {{getdata.taskOwnerPhone}}
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="报送内容：">
                            {{getdata.taskOwnerPhone}}
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="报送文件：">
                            <p  v-for="(item,index) in getdata.taskFiles" :key='index'>
                                <a href="#" style="color:#2d8cf0;">
                                    {{item.oldFileName}}
                                </a>
                            </p>
                        </FormItem>
                    </Col>
                </Row>
                
            </Form>    
        </Card>   
        <Card  class="itemCard">
                <p slot="title">基金基本信息</p>
                <Form :label-width="110">
                    <Row>
  
                         <Col span="8">
                            <FormItem label="基金全称：">
                                {{getdata.client.clientName}}
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="基金简称：">
                                {{getdata.client.clientShortName}}
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="所在省市：" >
                                {{cityObj[getdata.client.clientRegion]}}
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="注册地址：" >
                                {{getdata.client.clientAddress}}
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="注册日期：" >
                                {{getdata.client.clientOpenDate.replace("T"," ").substr(0,16)}}
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="成立日期：" >
                                <!-- {{getdata.client.}} -->
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="备案日期：" >
                                <!-- {{getdata.client.}} -->
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="终止日期：" >
                                <!-- {{getdata.client.}} -->
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="备案编码：" >
                                <!-- {{getdata.client.}} -->
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="存续期限：" >
                                <!-- {{getdata.client.}} -->
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="经营范围：" >
                                {{getdata.client.clientScope}}
                            </FormItem>   
                        </Col>
                        
                         <Col span="8">
                            <FormItem label="客户代码：" >
                                {{getdata.client.clientCode}}
                            </FormItem>   
                        </Col>
                      
                      
                        <Col span="8">
                            <FormItem label="联系人员：" >
                                {{getdata.client.clientContact}}
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="联系电邮：" >
                                {{getdata.client.clientContactEmail}}
                            </FormItem>   
                        </Col>

                         <Col span="8">
                            <FormItem label="联系电话：" >
                                {{getdata.client.clientContactPhone}}
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="联系传真：" >
                                {{getdata.client.clientContactFax}}
                            </FormItem>   
                        </Col>
                       <Col span="8">
                            <FormItem label="投资项目数量：" >
                               <!-- {{getdata.client.}}个 -->
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="退出项目数量："  >
                                <!-- {{getdata.client.}}个 -->
                            </FormItem>
                        </Col>
                    </Row>

                </Form>
            </Card>
               
            <Card  class="itemCard">
                <p slot="title">基金成员信息</p>
                 <Form :label-width="150">
                        <Row>
                         <Col span="12">
                            <FormItem label="基金合伙人：" >
                                <!-- {{getdata.}} -->
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="投决会委员：" >
                                <!-- {{getdata.}} -->
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="合伙人数量：" >
                                <!-- {{getdata.}}个 -->
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="普通合伙人数量：" >
                                <!-- {{getdata.}}个 -->
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="有限合伙人数量：" >
                                <!-- {{getdata.}}个 -->
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="管理人："  >
                                <!-- {{getdata.}} -->
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="普通合伙人：" >
                                <!-- {{getdata.}} -->
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="执行事务合伙人：" >
                                <!-- {{getdata.}} -->
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="执行事务合伙人委派代表：" >
                                <!-- {{getdata.}} -->
                            </FormItem>
                        </Col>
                    </Row>
                 </Form>
                  

            </Card>
            <Card  class="itemCard">
                <p slot="title">基金财务信息</p>
                <Form :label-width="120">
                    <Row>
                        <Col span="8">
                            <FormItem label="认缴规模："  >
                                {{getdata.client.clientRegisteredCapital||0}}万元
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="实缴规模："  >
                                {{getdata.client.clientTotalAssets||0}}万元
                            </FormItem>   
                        </Col>

                         <Col span="8">
                            <FormItem label="退资规模：" >
                               {{getdata.client.clientNetAssets||0}}万元
                            </FormItem>   
                        </Col>
                        <Col span="12">
                            <FormItem label="管理费计提标准：" >
                               {{getdata.client.clientIncome||0}}万元
                            </FormItem>
                        </Col>
                         <Col span="12">
                            <FormItem label="业绩报酬计提标准：" >
                               {{getdata.client.clientProfit||0}}万元
                            </FormItem>   
                        </Col>

                        
                        
                     
                    </Row>

                </Form>
            </Card>
            <Card  class="itemCard">
                <p slot="title">项目信息</p>
                  <Form :label-width="80">
                    <Row>
                        
                        <Col span="8">
                            <FormItem label="项目品种：" >
                                {{proTypeObj[getdata.project.projectType] }}
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="项目角色：" >
                                {{proRoleObj[getdata.project.projectRole] }}
                            </FormItem>   
                        </Col>

                         <Col span="8">
                            <FormItem label="项目经理：" >
                                {{proManage}}
                            </FormItem>  
                        </Col>
                        <Col span="8">
                            <FormItem label="项目主办：" >
                                {{proOwner}}
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="项目来源：" >
                                {{getdata.project.projectSource}}
                            </FormItem>   
                        </Col>
                          <Col span="16">
                            <FormItem label="项目成员：" >
                               {{proMember.toString()}}
                            </FormItem>   
                        </Col>
                        <Col span="24">
                            <FormItem label="项目内容：" >
                                {{getdata.project.projectSummary}}
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="开始日期：" >
                                {{getdata.project.projectStartDate.replace("T"," ").substr(0,16)}}
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="结束日期：" >
                                {{getdata.project.projectEndDate.replace("T"," ").substr(0,16)}}
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="工时费用：">
                              {{getdata.project.projectEstimatedHourCost||0}}万元
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="直接费用：">
                               {{getdata.project.projectEstimatedFeeCost||0}}万元
                            </FormItem>   
                        </Col>
                    </Row>

                </Form>   

            </Card>
             <Card  class="itemCard">
            <p slot="title">审批进度</p>
            <Form :label-width="80">
                <Timeline>
                    <template v-for="(item,index) in getdata.taskFlows">

                        <TimelineItem  :color="item.flowStatus==1?'#19be6b':'#515a6e'" v-if="item.flowComment||item.flowRequire==0" :key="index">
                            <p >{{item.flowDoneDate.replace("T"," ").substr(0,16)}}   <Divider type="vertical" />
                                {{item.flowSummary}}  <Divider type="vertical" />
                                {{item.flowOwnerName}} <Divider type="vertical" />
                                 {{item.flowEmail}}
                            </p>

                            <p class="content">{{item.flowComment||''}}</p>
                        </TimelineItem>
                    </template>
                </Timeline>
            </Form>    
        </Card>
            <Card  class="itemCard">
            <p slot="title">审批意见</p>
            <Form :label-width="80">
                  <Row>
                    <Col span="24">
                        <FormItem label="审批意见">
                            <Input  type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入具体内容"></Input>
                        </FormItem>
                    </Col>
                    <Col span="24">
                    <FormItem label="文件列表" v-if="fileName.length>0&&showFile">
                                <p class="fileName" v-for="(item,index) in fileName" :key="index">
                                    <Row >
                                        <Col span="20">
                                            <span style="color:#2b85e4;margin-right:8px;">{{item.name}}</span>
                                            <span style="color:#808695;font-size:12px;">{{item.file}}</span>
                                        </Col>
                                        <Col span="4" style="color:#ed4014;cursor:pointer;" >
                                        <span @click="deleteFile(index)">删除</span> 
                                        
                                        </Col>
                                    </Row>
                                </p>
                    </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label=" ">
                            <Button @click="showUploadFile()" style="margin-right: 8px">添加附件</Button>
                            <Button style="margin-right: 8px" type="primary" :loading="loading"  @click="handleSubmit()">
                                <span v-if="!loading">同意</span>
                                <span v-else>提交中...</span>
                            </Button> 
                            <Button  style="margin-right: 8px" type="warning">
                               修改
                                
                            </Button>  
                            <Button :loading="loading2"  style="margin-right: 8px" type="error">
                                <span v-if="!loading">驳回</span>
                                <span v-else>提交中...</span>
                                
                            </Button> 
                        </FormItem>
                    </Col>
                </Row>
            </Form>    
        </Card>
        <upload-files ref="uploadModal"  @handleUploadFileEvent="handleUploadEvent"></upload-files>
        <return-step ref='stepModal' :taskFlowID="taskFlowID" :taskFlows="taskFlows" :FlowComment="FlowComment" :taskID="taskID"></return-step>

    </div>
</template>
<script>
import {getDealTaskDetail,getCityList,getIndustryList,getprogectType,getprogectRole} from "@/api/data"
// import {} from "@/ap"
import UploadFiles from "@/view/components/upload_file/upload_file"
import returnStep from "@/view/components/template/return_step"

export default {
    components:{
        UploadFiles,
        returnStep
    },
     props:{
        taskID:String,
        taskFlowID:String
    },
    name:'fundTem',
    data(){
        return{
            loading:false,
            loading1:false,
            loading2:false,
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
            taskFlows:[],
            FlowComment:'',
            postdata:{},
            getdata:{},
            cityObj:{},
            industryObj:{},
            proTypeObj:{},
            proRoleObj:{},
            proManage:'',
            proOwner:'',
            proMember:[]
        }
    },mounted(){
        this.gettaskDetail();
        this.getCityList()
        // this.getIndustryList()
        this.getprogectType()
        this.getprogectRole()
    },
    methods:{
        gettaskDetail(){
            getDealTaskDetail({TaskID:this.taskID}).then(res=>{
                console.log(res)
                if(res.data.code==2303){
                    this.getdata=res.data;
                    this.taskFlows=res.data.taskFlows;
                    this.loadMember(res.data.project.members)
                   
                }else{
                    this.$Message.error({
                        content:'获取任务信息失败：'+res.data.message
                    })
                }
            })
        },
        deleteFile(index){
            this.fileName.splice(index,1);
            this.fileWrap.splice(index,1);

        },
        handleUploadEvent(flag,filename,fileWrap){
            this.fileModal=flag;
            if(filename){
                 this.fileName=filename;
            }
            if(fileWrap){
                this.fileWrap=fileWrap;
            }
            this.showFile=true;
        },showUploadFile(){
            //显示modal
            this.$refs["uploadModal"].showModal(true);
        },loadMember(obj){
            obj.map(item=>{
                switch (item.memberType){
                    case 1:
                        //项目经理
                        this.proManage=item.memberName;
                    break;
                     case 2:
                         //项目主办
                        this.proOwner=item.memberName;
                    break;
                     case 3:
                         //项目成员
                        this.proMember.push(item.memberName);
                    break;
                     case 4:
                         //基金合伙人

                    break;
                     case 5:
                         //基金投决会

                    break;
                     case 6:
                         //基金成员

                    break;
                }

               
            })
        },
        getCityList(){
            getCityList({"PageIndex":1,"PageSize":1000}).then(res=>{
               if(res.data.code==0){
                   res.data.regionList.forEach(element => {
                       this.cityObj[element.regionId.toString()]=element.regionName
                   });
               }else{
                   this.$Message.error({
                       content:'省市信息获取失败：'+res.data.message
                   })
               }
            })
        },getIndustryList(){
            getIndustryList({"PageIndex":1,"PageSize":1000}).then(res=>{
                if(res.data.code==0){
                    res.data.industryList.forEach(element => {
                       this.industryObj[element.industryId.toString()]=element.industryName
                   });
               }else{
                   this.$Message.error({
                       content:'所属行业信息获取失败：'+res.data.message
                   })
               }
            })
        },getprogectType(){
            getprogectType({"PageIndex":1,"PageSize":1000}).then(res=>{
                if(res.data.code==0){
                    res.data.projectTypeList.forEach(element => {
                       this.proTypeObj[element.projectTypeId.toString()]=element.projectTypeName
                   });
               }else{
                   this.$Message.error({
                       content:'项目品种信息获取失败：'+res.data.message
                   })
               }    
            })
        },getprogectRole(){
            getprogectRole({"PageIndex":1,"PageSize":1000}).then(res=>{
                if(res.data.code==0){
                    res.data.projectRoleList.forEach(element => {
                       this.proRoleObj[element.projectRoleId.toString()]=element.projectRoleName
                   });
               }else{
                   this.$Message.error({
                       content:'项目角色信息获取失败：'+res.data.message
                   })
               }
            })
        }

        
    }
}
</script>
<style lang="less" scoped>

</style>