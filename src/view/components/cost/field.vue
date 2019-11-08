 
<template>
<!-- 外勤费用-->
    <div class="field">
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
                                <Input v-model="phone" placeholder="请输入报销人职级"></Input>
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
                 <Form :label-width="90">
                    <Row>
                         <Col span="8">
                            <FormItem label="外勤时间" prop="phone">
                                <Input v-model="phone" placeholder="请输入外勤时间"></Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                        
                            <FormItem label="会议费用" prop="name">
                                <Input  v-model="name" type="number" placeholder="请输入会议费用"></Input>
                            </FormItem>
                        </Col>
                        

                         <Col span="8">
                             <FormItem label="宣传费用" prop="phone">
                                <Input v-model="phone" type="number" placeholder="请输入宣传费用"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="通讯费用" prop="phone">
                                <Input v-model="phone" type="number" placeholder="请输入通讯费用"></Input>
                            </FormItem>   
                        </Col>
                        
                         <Col span="8">
                            <FormItem label="物业租金" prop="phone">
                                <Input v-model="phone" type="number" placeholder="请输入物业租金"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                             <FormItem label="物业管理费" prop="phone">
                                <Input v-model="phone" type="number" placeholder="请输物业管理费"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="水电费" prop="phone">
                                <Input v-model="phone" type="number" placeholder="请输入水电费"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="资本支出" prop="phone">
                                <Input v-model="phone" type="number" placeholder="请输入资本支出"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="行政收费" prop="phone">
                                <Input v-model="phone" type="number" placeholder="请输入行政收费"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                             <FormItem label="办公费" prop="phone">
                                <Input v-model="phone" type="number" placeholder="请输入办公费"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="交通费" prop="phone">
                                <Input v-model="phone" type="number" placeholder="请输入交通费"></Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="邮政快递费" prop="phone">
                                <Input v-model="phone" type="number" placeholder="请输入邮政快递费"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                             <FormItem label="资本支出" prop="phone">
                                <Input v-model="phone" type="number" placeholder="请输入资本支出"></Input>
                            </FormItem>   
                        </Col>
                         
                         <Col span="8">
                            <FormItem label="其他费用" prop="phone">
                                <Input v-model="phone" type="number" placeholder="请输入其他费用"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="合计" prop="phone">
                                <Input v-model="phone" type="number" placeholder="请输入合计"></Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="总计(大写)	" prop="phone">
                                <Input v-model="phone" placeholder="请输入总计(大写)"></Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="附件张数" prop="phone">
                                <Input v-model="phone" type="number" placeholder="请输入附件张数"></Input>
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
import {TaskTypeID} from "@/libs/data"
export default {
     components:{
        changeTap
    },
    data(){
        return{
            name:'',
            loading:false,
            phone:'',
            ProjectData:[],
            postdata:{
                TaskTypeId: TaskTypeID.FieldExpenses,
                TaskName: '',//任务名（UI中的报销单据要点）
                TaskSummary: '',//任务概要（UI中的备注）
                TaskOwner: '',//任务申请人ID，与User表的UserID对应，取自当前登录用户
                ProjectID: -1,//项目ID 
                IncoExpe: {//费用收入信息
                    IncoExpeID:0,//费用收入信息ID
                    IncoExpeType:400,//费用收入类别，100差旅费/200招待费/300一般费用/400外勤费用/500项目收入
                    PayeeID: '',//收款人ID，与用户表UserID对应，项目收入报告时为空
                    PayeeName: '',//收款人姓名（根据所选收款人自动获取）/收款单位（项目收入报告时使用）
                    PayeeBank: '',//收款银行（项目收入报告时使用）
                    PayeeAccount: '',//收款账号
                    TotalAmount: 0,//费用收入总金额
                    TotalAmountCN: '零',//费用收入总金额的中文表述
                    InvoicePages: 0,//单据附件张数
                    Details: [
                            { "ID":0,"IncoExpeID":"0","Type":401,"OccurDate":"","Amount":0 } ,
                            { "ID":0,"IncoExpeID":"0","Type":402,"OccurDate":"","Amount":0 } ,
                            { "ID":0,"IncoExpeID":"0","Type":403,"OccurDate":"","Amount":0 } ,
                            { "ID":0,"IncoExpeID":"0","Type":404,"OccurDate":"","Amount":0 } ,
                            { "ID":0,"IncoExpeID":"0","Type":405,"OccurDate":"","Amount":0 } ,
                            { "ID":0,"IncoExpeID":"0","Type":406,"OccurDate":"","Amount":0 } ,
                            { "ID":0,"IncoExpeID":"0","Type":407,"OccurDate":"","Amount":0 } ,
                            { "ID":0,"IncoExpeID":"0","Type":408,"OccurDate":"","Amount":0 } ,
                            { "ID":0,"IncoExpeID":"0","Type":409,"OccurDate":"","Amount":0 }
                        ]
                }
            }
        }
    },mounted(){
        this.name=JSON.parse(localStorage.getItem("userName"));
        this.phone=JSON.parse(localStorage.getItem("phone"));
         this.postdata.TaskOwner=JSON.parse(localStorage.getItem("userId"));
        this.getProList(1);
    },
    methods:{
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
        },getTapValue(tap,tapDet){
            console.log(tap,tapDet)
        },
    }
}
</script>
<style lang='less' scoped>
    .field{
        width: 100%;
        height:100%;
        .itemCard{
            margin-bottom: 20px;
        }
    }
</style>