
<template>
<!-- 项目收入费用-->
    <div class="cost_program">
            <Card class="itemCard">
                <p slot="title">报销人信息</p>
                <Form :label-width="80">
                    <Row>
                        <Col span="8">
                            <FormItem label="报销人" prop="name">
                                {{name}}
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="联系电话" prop="phone">
                                {{phone}}
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="承担项目" prop="phone">
                                <Select v-model="postdata.ProjectID" filterable  >
                                    <Option v-for="item in ProjectData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>     
                        </Col>
                       
                     
                    </Row>
                   
                </Form>
            </Card>
             <Card class="itemCard">
                <p slot="title">收款人信息</p>
                <Form :label-width="80">
                    <Row>
                        <Col span="8">
                            <FormItem label="收款单位" prop="name">
                                <Input v-model="postdata.IncoExpe.PayeeName" placeholder="请输入收款单位"></Input>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="收款账号" prop="phone">
                                <Input v-model="postdata.IncoExpe.PayeeAccount" placeholder="请输入收款账号"></Input>
                            </FormItem>   
                        </Col>

                         <Col span="8">
                             <FormItem label="开户行" prop="phone">
                                <Input v-model="postdata.IncoExpe.PayeeBank" placeholder="请输入开户行"></Input>
                            </FormItem>   
                        </Col>
                    </Row>
                   
                </Form>
            </Card>
            <Card class="itemCard" >
                <p slot="title">收入详情</p>
                 <Form :label-width="100">
                    <Row>
                        <Col span="8">
                            <FormItem label="发生日期" >
                             <DatePicker type="date" @on-change="setDate" :value='postdata.IncoExpe.Details[0].OccurDate' placeholder="请选择发生日期" style="width:100%;"></DatePicker>   
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="收入性质" prop="phone">
                                <Input v-model="postdata.IncoExpe.Details[0].IncomeNature" placeholder="请输入收入性质"></Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                        
                            <FormItem label="发票金额" prop="name">
                                <Input @on-blur="getTotalAmountCn" v-model="postdata.IncoExpe.Details[0].Amount" placeholder="请输入收入性质"></Input>
                            </FormItem>
                        </Col>
                        

                         <Col span="8">
                             <FormItem label="发票金额(大写)" prop="phone">
                                 <Input v-model="postdata.IncoExpe.TotalAmountCN" placeholder="请输入收入性质"></Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="附件张数" prop="phone">
                                <Input v-model="postdata.IncoExpe.InvoicePages" type="number" placeholder="请输入附件张数"></Input>
                            </FormItem>   
                        </Col>
                        
                    </Row>
                   
                </Form>

              
            </Card>
           <Card  class="itemCard">
                <p slot="title">请示信息</p>
                <Form :label-width="80">
                    <FormItem label="事项要点" >
                        <Input  placeholder="请输入事项要点" v-model="postdata.TaskName"></Input>
                    </FormItem>
                    <FormItem label="具体内容" >
                        <Input  type="textarea" v-model="postdata.TaskSummary" :autosize="{minRows: 10,maxRows: 15}" placeholder="请输入事项的具体内容"></Input>
                    </FormItem>
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
                     <FormItem>
                       <Button type="primary" :loading="loading" @click="handleSubmit()">
                             <span v-if="!loading">提交</span>
                            <span v-else>提交中...</span>
                        </Button>
                    </FormItem>
                </Form>   

            </Card>

    </div>
</template>
<script>
import {getProjectList,getAllUserList,setIncoexpeTask} from "@/api/data"
import {digitUppercase} from "@/libs/tools"
import {TaskTypeID} from "@/libs/data"

export default {
     components:{
    },
    data(){
        return{
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
            name:'',
            loading:false,
            phone:'',
            userList:[],
            ProjectData:[],
            postdata:{
                    TaskTypeId:TaskTypeID.ProjectIncome,
                    TaskName: '',//任务名（UI中的报销单据要点）
                    TaskSummary: '',//任务概要（UI中的备注）
                    TaskOwner: '',//任务申请人ID，与User表的UserID对应，取自当前登录用户
                    ProjectID:0,//项目ID 
                    IncoExpe: {//费用收入信息
                        IncoExpeID:0,//费用收入信息ID
                        IncoExpeType:500,//费用收入类别，100差旅费/200招待费/300一般费用/400外勤费用/500项目收入
                        PayeeID: '',//收款人ID，与用户表UserID对应，项目收入报告时为空
                        PayeeName: '',//收款人姓名（根据所选收款人自动获取）/收款单位（项目收入报告时使用）
                        PayeeBank: '',//收款银行（项目收入报告时使用）
                        PayeeAccount: '',//收款账号
                        TotalAmount: 0,//费用收入总金额
                        TotalAmountCN: '零',//费用收入总金额的中文表述
                        InvoicePages: 0,//单据附件张数
                        Details: [
                            { "ID":0,"IncoExpeID":"0","Type":501,"OccurDate":"","Amount":0,"IncomeNature":"" }
                        ]
                    }
            }
        }
    },
    mounted(){
        this.name=JSON.parse(localStorage.getItem("userName"));
        this.phone=JSON.parse(localStorage.getItem("phone"));
         this.postdata.TaskOwner=JSON.parse(localStorage.getItem("userId"));
        this.getProList(1);

        
    },
    methods:{
         getProList(status){
            //获取项目列表
            getProjectList({"ProjectStatus":1,"USerID":JSON.parse(localStorage.getItem("userId"))}).then(res=>{
                if(res.data.code==2307){
                    res.data.projectList.forEach(element => {
                        this.ProjectData.push({
                            label:element.clientCode+'--'+element.projectType+'--'+element.projectRole,
                            value:element.projectID
                        })
                    });
                    
                }else{
                    this.$Message.error({
                        content:'项目列表数据加载失败：'+res.data.message
                    })
                }
            })
        },getAllUserList(){
            getAllUserList({"Status":1}).then(res=>{
                if(res.data.code==0){
                    res.data.userList.forEach(element=>{
                        this.userList.push({
                            value:element.userId,
                            label:element.userName
                        })
                    })
                }else{
                    this.$Message.error({
                        content:"收款人信息查询失败:"+res.data.message
                    })
                }
            })
        },setDate(value){
            console.log(value)
            this.postdata.IncoExpe.Details[0].OccurDate=value;
        },  
        getTotalAmountCn(){
            this.postdata.IncoExpe.TotalAmount=this.postdata.IncoExpe.Details[0].Amount;
            this.postdata.IncoExpe.TotalAmountCN=digitUppercase(this.postdata.IncoExpe.TotalAmount);

        },handleSubmit(){
             setIncoexpeTask(this.postdata).then(res=>{
                if(res.data.code==2501){
                    this.$Message.success({
                        content:"操作成功"
                    })
                }else{
                    this.$Message.error({
                        content:"操作失败:"+res.data.message
                    })
                }
            })


        },
        setPayeeName(val){
            this.postdata.IncoExpe.PayeeID=val.value;
            this.postdata.IncoExpe.PayeeName=val.label;
        },handleUploadEvent(flag,filename,fileWrap){
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
        },setPayeeName(val){
            this.postdata.IncoExpe.PayeeID=val.value;
            this.postdata.IncoExpe.PayeeName=val.label;
        }
        
    }
}
</script>
<style lang='less' scoped>
    .cost_program{
        width: 100%;
        height:100%;
        .itemCard{
            margin-bottom: 20px;
        }
    }
</style>