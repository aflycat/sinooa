
<template>
<!-- 招待 -->
    <div class="entertain">
            <Card class="itemCard">
                <p slot="title">报销人信息</p>
                <Form :label-width="80">
                    <Row>
                        <Col span="8">
                            <FormItem label="报销人" prop="name">
                                <Input disabled v-model="name" placeholder="请输入报销人姓名"></Input>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="联系电话" prop="phone">
                                <Input v-model="phone" placeholder="请输入报销人联系电话"></Input>
                            </FormItem>   
                        </Col>

                         <Col span="8">
                             <FormItem label="职级" prop="phone">
                                <Input placeholder="请输入报销人职级"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="承担项目" prop="phone">
                                <Select v-model="postdata.ProjectID" filterable  >
                                    <Option v-for="item in ProjectData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>     
                        </Col>
                        <Col span="16">
                            <change-tap @getValue="getTapValue"></change-tap>
                        </Col>
                    </Row>
                   
                </Form>
            </Card>
             <Card class="itemCard">
                <p slot="title">收款人信息</p>
                <Form :label-width="80">
                    <Row>
                        <Col span="8">
                            <FormItem label="收款人" prop="name">
                                <Input  v-model="postdata.IncoExpe.PayeeName" placeholder="请输入收款人姓名"></Input>
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
                <p slot="title">费用详情</p>
                 <Form :label-width="80">
                    <Row>
                        <Col span="8">
                            <FormItem label="招待人数" prop="name">
                                <Input @on-blur="subNum"  v-model="postdata.IncoExpe.Details[0].EntertainPersons" type="number" placeholder="请输入招待人数"></Input>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="招待时间" >
                                <DatePicker :value="postdata.IncoExpe.Details[0].OccurDate" type="date" @on-change="subReturnDate" show-week-numbers placeholder="请选择招待时间" style="width:100%;"></DatePicker>

                                
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="招待对象" prop="name">
                                <Input  @on-blur="subObj" v-model="postdata.IncoExpe.Details[0].EntertainTarget" placeholder="请输入招待对象"></Input>
                            </FormItem>
                        </Col>
                         <Col span="8">
                             <FormItem label="活动费用" prop="phone">
                                <Input @on-blur="subTotal" v-model="postdata.IncoExpe.Details[0].Amount" type="number" placeholder="请输活动费用"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="礼品费用" prop="phone">
                                <Input  @on-blur="subTotal" v-model="postdata.IncoExpe.Details[1].Amount" type="number" placeholder="请输入礼品费用"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="餐费" prop="phone">
                                <Input  @on-blur="subTotal" v-model="postdata.IncoExpe.Details[2].Amount" type="number" placeholder="请输入餐费"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="合计" prop="phone">
                                <Input v-model="postdata.IncoExpe.TotalAmount" readonly type="number" placeholder="请输入合计"></Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="总计(大写)	" prop="phone">
                                <Input v-model="postdata.IncoExpe.TotalAmountCN" readonly placeholder="请输入总计(大写)"></Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="附件张数" prop="phone">
                                <Input v-model="postdata.IncoExpe.InvoicePages"  type="number" placeholder="请输入附件张数"></Input>
                            </FormItem>   
                        </Col>
                    </Row>
                   
                </Form>

              
            </Card>
            <Card  class="itemCard">
                <p slot="title">请示信息</p>
                <Form :label-width="80">
                    <FormItem label="事项要点" prop="TaskName">
                        <Input v-model="postdata.TaskName" placeholder="请输入事项要点"></Input>
                    </FormItem>
                    <FormItem label="具体内容" prop="TaskSummary">
                        <Input v-model="postdata.TaskSummary" type="textarea" :autosize="{minRows: 10,maxRows: 15}" placeholder="请输入事项的具体内容"></Input>
                    </FormItem>
                     <FormItem>
                        
                       <Button type="primary" :loading="loading" @click="handleSubmit('formValidate')">
                            <span v-if="!loading">提交</span>
                            <span v-else>提交中...</span>
                        </Button>
                       
                    </FormItem>
                </Form>   

            </Card>
    </div>
</template>
<script>
import changeTap from "@/view/components/template/change_tap.vue"
import {getProjectList} from "@/api/data"
import {digitUppercase} from "@/libs/tools"

export default {
    components:{
        changeTap
    },
    data(){
        return{
            name:'',
            phone:'',
            loading:false,
            ProjectData:[],
            postdata:{
                    TaskTypeId:'' ,
                    TaskName: '',//任务名（UI中的报销单据要点）
                    TaskSummary: '',//任务概要（UI中的备注）
                    TaskOwner: '',//任务申请人ID，与User表的UserID对应，取自当前登录用户
                    ProjectID: -1,//项目ID 
                    IncoExpe: {//费用收入信息
                        IncoExpeID:0,//费用收入信息ID
                        IncoExpeType:200,//费用收入类别，100差旅费/200招待费/300一般费用/400外勤费用/500项目收入
                        PayeeID: '',//收款人ID，与用户表UserID对应，项目收入报告时为空
                        PayeeName: '',//收款人姓名（根据所选收款人自动获取）/收款单位（项目收入报告时使用）
                        PayeeBank: '',//收款银行（项目收入报告时使用）
                        PayeeAccount: '',//收款账号
                        TotalAmount: 0,//费用收入总金额
                        TotalAmountCN: '零',//费用收入总金额的中文表述
                        InvoicePages: 0,//单据附件张数
                        Details: [
                            { "ID":0,"IncoExpeID":"0","Type":201,"OccurDate":"","EntertainTarget":"","EntertainPersons":0,"Amount":0 } , 
                            { "ID":0,"IncoExpeID":"0","Type":202,"OccurDate":"","EntertainTarget":"","EntertainPersons":0,"Amount":0 } ,
                            { "ID":0,"IncoExpeID":"0","Type":203,"OccurDate":"","EntertainTarget":"","EntertainPersons":0,"Amount":0 } 
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
        handleSubmit(){
            console.log(this.postdata)
        },
        subTotal(){
            this.postdata.IncoExpe.TotalAmount=0;
            this.postdata.IncoExpe.Details.forEach(element=>{  
                this.postdata.IncoExpe.TotalAmount+=parseFloat(element.Amount)||0
               
            })
            this.postdata.IncoExpe.TotalAmountCN=digitUppercase(this.postdata.IncoExpe.TotalAmount);
        },
        getProList(status){
            //获取项目列表
            getProjectList({"ProjectStatus":1,"USerID":JSON.parse(localStorage.getItem("userId"))}).then(res=>{
                if(res.data.code==2306){
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
        },
        getTapValue(tap,tapDet){
            console.log(tap,tapDet)
        },
        subNum(){
           
            this.postdata.IncoExpe.Details[1].EntertainPersons=this.postdata.IncoExpe.Details[0].EntertainPersons;   
            this.postdata.IncoExpe.Details[2].EntertainPersons=this.postdata.IncoExpe.Details[0].EntertainPersons ; 
           
        },
        subObj(value){
  
           
            this.postdata.IncoExpe.Details[1].EntertainTarget=this.postdata.IncoExpe.Details[0].EntertainTarget;   
            this.postdata.IncoExpe.Details[2].EntertainTarget=this.postdata.IncoExpe.Details[0].EntertainTarget ; 
            
        },
        subReturnDate(value){
            
            this.postdata.IncoExpe.Details[0].OccurDate=value;  
            this.postdata.IncoExpe.Details[1].OccurDate=value;   
            this.postdata.IncoExpe.Details[2].OccurDate=value ;  
          
        }
    }
}
</script>
<style lang='less' scoped>
    .entertain{
        width: 100%;
        height:100%;
        .itemCard{
            margin-bottom: 20px;
        }
    }
</style>