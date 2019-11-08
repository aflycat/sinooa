<template>
    <div class="progTem">
        <Card  class="itemCard">
            <p slot="title">任务明细</p>
            <Form :label-width="80">
                <Row>
                     <Col span="24">
                        <FormItem label="任务编号：">

                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="事项要点：">

                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="事项标签：">

                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="报送人：">

                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="联系电话：">

                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="报送内容：">

                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="报送文件：">

                        </FormItem>
                    </Col>
                </Row>
                
            </Form>    
        </Card>   
        <Card  class="itemCard">
                <p slot="title">公司基本信息</p>
                <Form :label-width="80">
                    <Row>
  
                         <Col span="8">
                            <FormItem label="公司全称：" prop="ClientName">
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="公司简称：" prop="ClientShortName">
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="所在省市：" prop="ClientRegion">
                               
                            </FormItem>
                        </Col> 
                         <Col span="8">
                            <FormItem label="所属行业：" prop="ClientIndustry">
                                 

                            </FormItem>
                        </Col>
                         
                       
                        <Col span="8">
                            <FormItem label="经营范围：" prop="ClientShortName">
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="客户代码：" prop="ClientCode">
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="代表法人：" prop="ClientLegalPerson">
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="总经理：" prop="ClientManager">
                            </FormItem>   
                        </Col>

                         <Col span="8">
                            <FormItem label="成立日期：" prop="ClientOpenDate">
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="注册地址：" prop="ClientAddress">
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="邮政编码：" prop="ClientShortName">
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="联系人员：" prop="ClientContact">
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="联系电邮：" prop="ClientContactEmail">
                            </FormItem>   
                        </Col>

                         <Col span="8">
                            <FormItem label="联系电话：" prop="ClientContactPhone">
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="联系传真：" prop="ClientContactFax">
                            </FormItem>   
                        </Col>
                     
                    </Row>

                </Form>
            </Card>
            <Card  class="itemCard">
                <p slot="title">公司财务信息</p>
                <Form :label-width="80">
                    <Row>
                        <Col span="8">
                            <FormItem label="注册资本：" prop="ClientRegisteredCapital">
                              
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="总资产：" prop="ClientTotalAssets">
                               
                            </FormItem>   
                        </Col>

                         <Col span="8">
                            <FormItem label="净资产：" prop="ClientNetAssets">
                               
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="营业收入：" prop="ClientIncome">
                               
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="营业利润：" prop="ClientProfit">
                                
                            </FormItem>   
                        </Col>

                         <Col span="8">
                            <FormItem label="财务年度：" prop="ClientFinancialYear">
                                
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="财务季度：" prop="ClientFinancialQuarter">
                               
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
                            <FormItem label="项目品种：" prop="ProjectType">
                               
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="项目角色：" prop="ProjectRole">
                               
                                
                            </FormItem>   
                        </Col>

                         <Col span="8">
                            <FormItem label="项目经理：" prop="Manager">
                               
                            </FormItem>  
                        </Col>
                        <Col span="8">
                            <FormItem label="项目主办：" prop="Owner">
                               
                            </FormItem>
                        </Col>
                         <Col span="16">
                            <FormItem label="项目成员：" prop="Member">
                                
                                
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="项目内容：" prop="phone">
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="项目来源：" prop="phone">
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="开始日期：" prop="ProjectStartDate">
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="结束日期：" prop="ProjectEndDate">
                            </FormItem>
                        </Col>
                          <Col span="8">
                            <FormItem label="工时费用：" prop="ProjectEstimatedHourCost">
                             
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="直接费用：" prop="ProjectEstimatedFeeCost">
                                
                            </FormItem>   
                        </Col>
                    </Row>

                </Form>   

            </Card>  
             <Card  class="itemCard">
            <p slot="title">审批进度</p>
            <Form :label-width="80">
                <Timeline>
                    <TimelineItem>
                        <p class="time">1976年</p>
                        <p class="content">Apple I 问世</p>
                    </TimelineItem>
                    <TimelineItem>
                        <p class="time">1984年</p>
                        <p class="content">发布 Macintosh</p>
                    </TimelineItem>
                    <TimelineItem>
                        <p class="time">2007年</p>
                        <p class="content">发布 iPhone</p>
                    </TimelineItem>
                    <TimelineItem>
                        <p class="time">2010年</p>
                        <p class="content">发布 iPad</p>
                    </TimelineItem>
                    <TimelineItem>
                        <p class="time">2011年10月5日</p>
                        <p class="content">史蒂夫·乔布斯去世</p>
                    </TimelineItem>
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
                            <Button :loading="loading1"  style="margin-right: 8px" type="warning">
                                <span v-if="!loading">修改</span>
                                <span v-else>提交中...</span>
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

    </div>
</template>
<script>
import {getTaskDetail} from "@/api/data"
import UploadFiles from "@/view/components/upload_file/upload_file"


export default {
     components:{
        UploadFiles,
    },
     props:{
        taskID:String
    },
    name:'progTem',
    data(){
        return{
            loading:false,
            loading1:false,
            loading2:false,
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
        }
    },mounted(){
        console.log(this.taskID)
        this.gettaskDetail()
    },
    methods:{
        gettaskDetail(){
            getTaskDetail({TaskID:this.taskID}).then(res=>{
                console.log(res)
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
        }

        
    }
}
</script>
<style lang="less" scoped>

</style>