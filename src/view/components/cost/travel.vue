
<template>
<!-- 基金执行会议 -->
    <div class="travel">
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
                                <Input  placeholder="请输入报销人职级"></Input>
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
                            <FormItem label="收款人" prop="name">
                                <Input v-model="postdata.IncoExpe.PayeeName"  placeholder="请输入收款人姓名"></Input>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="收款账号" prop="phone">
                                <Input v-model="postdata.IncoExpe.PayeeAccount"  placeholder="请输入收款账号"></Input>
                            </FormItem>   
                        </Col>

                         <Col span="8">
                             <FormItem label="开户行" prop="phone">
                                <Input v-model="postdata.IncoExpe.PayeeBank"  placeholder="请输入开户行"></Input>
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="附件张数" prop="phone">
                                <Input v-model="postdata.IncoExpe.InvoicePages"  placeholder="请输入附件张数"></Input>
                            </FormItem>   
                        </Col>
                    </Row>
                   
                </Form>
            </Card>
            <Card class="itemCard" >
                <p slot="title">费用列表</p>
                <Table  :columns="columnsCost" :data="dataCost"></Table>
                 
                <p style="margin-top:20px;">
                    <Button type="primary" style="margin-right:8px;" @click="flagMod=true">增加</Button>
                  
                </p>
                <Form :label-width="80" style="margin-top:10px;">
                    <Row>
                        <Col span="12">
                            <FormItem label="总计" prop="name">
                                <Input v-model="postdata.IncoExpe.TotalAmountCN"  placeholder="请输入合计大写"></Input>
                            </FormItem>
                        </Col>
                       
                    </Row>
                   
                </Form>
                
                <!-- <Table border ref="selection" :columns="travelColums" :data="travelData"></Table> -->
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
                       
                        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                       
                    </FormItem>
                </Form>   

            </Card>
        <Modal
            v-model="flagMod"
            title="费用详情"
             width="700"
            @on-ok="asyncOK">
                <Form  :label-width="80">
                    <Row :gutter="8">
                          <Col span="12">
                            <FormItem label="前往日期">
                                <DatePicker :value="costDetail[0].OccurDate" type="date" show-week-numbers placeholder="请选择前往日期" style="width:100%;"></DatePicker>
                            </FormItem>
                          </Col> 
                          <Col span="12">
                            <FormItem label="返回日期">
                                <DatePicker :value="costDetail[0].ReturnDate" type="date" show-week-numbers placeholder="请选择返回日期" style="width:100%;"></DatePicker>
                            </FormItem>
                          </Col>  
                        <Col span="12">
                            <FormItem label="出发地">
                                <Input v-model="costDetail[0].FromCity" placeholder="请输入出发地"></Input>
                            </FormItem>
                          </Col>
                         
                          <Col span="12">
                            <FormItem label="到达地">
                                <Input v-model="costDetail[0].ToCity"  placeholder="请输入到达地"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="天数">
                                <Input type="number" v-model="costDetail[0].TripDays"  placeholder="请输入天数"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="机车船费">
                                <Input type="number" v-model="costDetail[0].Amount"  placeholder="请输入机车船费"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="接驳费">
                                <Input type="number" v-model="costDetail[1].Amount"   placeholder="请输入接驳费"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="市内交通">
                                <Input  type="number" v-model="costDetail[2].Amount"  placeholder="请输入市内交通"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="住宿费">
                                <Input type="number" v-model="costDetail[3].Amount"  placeholder="请输入住宿费"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="伙食补助">
                                <Input type="number" v-model="costDetail[4].Amount"  placeholder="请输入伙食补助"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="交通补助">
                                <Input type="number" v-model="costDetail[5].Amount"  placeholder="请输入交通补助"></Input>
                            </FormItem>
                          </Col>
                           <Col span="12">
                            <FormItem label="住宿补助">
                                <Input  type="number" v-model="costDetail[6].Amount"  placeholder="请输入住宿补助"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="其他">
                                <Input type="number" v-model="costDetail[7].Amount"  placeholder="请输入其他"></Input>
                            </FormItem>
                          </Col>  
                          <Col span="12">
                            <FormItem label="合计">
                                <Input  type="number" v-model="costDetail[8].total" placeholder="请输入合计"></Input>
                            </FormItem>
                          </Col>  
                    </Row>
                   
                </Form>


        </Modal>
        
    </div>
</template>
<script>
import {getProjectList} from "@/api/data"

export default {
    data(){
        return{
            flagMod:false,
            name:'',
            phone:'',
            ProjectID:'',
            ProjectData:[],
            columnsCost:[
                {title: '前往日期', key: 'OccurDate'},
                {title: '返回日期', key: 'ReturnDate'},
                {title: '出发地', key: 'FromCity'},
                {title: '到达地', key: 'ToCity'},
                {title: '天数', key: 'TripDays'},
                {title: '机车船费', key: '101'},
                {title: '接驳费', key: '102'},
                {title: '市内交通', key: '103'},
                {title: '住宿费', key: '104'},
                {title: '伙食补助', key: '105'},
                {title: '交通补助', key: '106'},
                {title: '其他', key: '107'},
                {title: '合计', key: '108'},
                {title: '操作', key: 'deal',render:(h,params)=>{
                    return h('div',[
                         h('span',{
                                style:{color:"#2d8cf0",cursor:"pointer",marginRight:"8px"},
                                on:{
                                    click:()=>{
                                      this.flagMod=true;
                                    }
                                }
                            },'编辑'),
                            h('span',{
                                style:{color:"#ed4014",cursor:"pointer"},
                                on:{
                                    click:()=>{
                                        
                                    }
                                }
                            },'删除')
                        ])
                    
                }},

            ],
            costDetail:[
                { "ID":"0","IncoExpeID":"0","Type":"101","OccurDate":"","ReturnDate":"","FromCity":"","ToCity":"","TripDays":0,"Amount":0 } , 
		        { "ID":"0","IncoExpeID":"0","Type":"102","OccurDate":"","ReturnDate":"","FromCity":"","ToCity":"","TripDays":0,"Amount":0 } ,
                { "ID":"0","IncoExpeID":"0","Type":"103","OccurDate":"","ReturnDate":"","FromCity":"","ToCity":"","TripDays":0,"Amount":0 } ,
                { "ID":"0","IncoExpeID":"0","Type":"104","OccurDate":"","ReturnDate":"","FromCity":"","ToCity":"","TripDays":0,"Amount":0 } ,
                { "ID":"0","IncoExpeID":"0","Type":"105","OccurDate":"","ReturnDate":"","FromCity":"","ToCity":"","TripDays":0,"Amount":0 } ,
                { "ID":"0","IncoExpeID":"0","Type":"106","OccurDate":"","ReturnDate":"","FromCity":"","ToCity":"","TripDays":0,"Amount":0 } ,
                { "ID":"0","IncoExpeID":"0","Type":"107","OccurDate":"","ReturnDate":"","FromCity":"","ToCity":"","TripDays":0,"Amount":0 } ,
                { "ID":"0","IncoExpeID":"0","Type":"108","OccurDate":"","ReturnDate":"","FromCity":"","ToCity":"","TripDays":0,"Amount":0 } ,
                { "total": 0 }
           ],
            dataCost:[
                // {
                //     OccurDate:'0',
                //     ReturnDate :'',
                //     FromCity  :'',
                //     ToCity :'',
                //     TripDays:'',
                //     Amount:'',
                //     '101':'',
                //     '102':'',
                //     '103':'',
                //     '104':'',
                //     '105':'',
                //     '106':'',
                //     '107':'',
                //     '108':''

                // }
           
            ],
            postdata:{
                TaskTypeId: 13,
                TaskName: '',//任务名（UI中的报销单据要点）
                TaskSummary: '',//任务概要（UI中的备注）
                TaskOwner: '',//任务申请人ID，与User表的UserID对应，取自当前登录用户
                ProjectID: 0,//项目ID 
                IncoExpe: {//费用收入信息
                    IncoExpeID:0,//费用收入信息ID
                    IncoExpeType:100,//费用收入类别，100差旅费/200招待费/300一般费用/400外勤费用/500项目收入
                    PayeeID: '',//收款人ID，与用户表UserID对应，项目收入报告时为空
                    PayeeName: '',//收款人姓名（根据所选收款人自动获取）/收款单位（项目收入报告时使用）
                    PayeeBank: '',//收款银行（项目收入报告时使用）
                    PayeeAccount: '',//收款账号
                    TotalAmount: 0,//费用收入总金额
                    TotalAmountCN: '零',//费用收入总金额的中文表述
                    InvoicePages: 0,//单据附件张数
                    Details: [
                                                        // 类型    //出发日期   //返回日期          出发地      到达地      //  天数    //费用
                        { "ID":"0","IncoExpeID":"0","Type":"101","OccurDate":"","ReturnDate":"","FromCity":"","ToCity":"","TripDays":0,"Amount":0 } ,//机车船费
                        { "ID":"0","IncoExpeID":"0","Type":"102","OccurDate":"","ReturnDate":"","FromCity":"","ToCity":"","TripDays":0,"Amount":0 } ,//机场/码头/火车站往返费
                        { "ID":"0","IncoExpeID":"0","Type":"103","OccurDate":"","ReturnDate":"","FromCity":"","ToCity":"","TripDays":0,"Amount":0 } ,//市内交通
                        { "ID":"0","IncoExpeID":"0","Type":"104","OccurDate":"","ReturnDate":"","FromCity":"","ToCity":"","TripDays":0,"Amount":0 } ,//住宿费
                        { "ID":"0","IncoExpeID":"0","Type":"105","OccurDate":"","ReturnDate":"","FromCity":"","ToCity":"","TripDays":0,"Amount":0 } ,//伙食补助
                        { "ID":"0","IncoExpeID":"0","Type":"106","OccurDate":"","ReturnDate":"","FromCity":"","ToCity":"","TripDays":0,"Amount":0 } ,//交通补助
                        { "ID":"0","IncoExpeID":"0","Type":"107","OccurDate":"","ReturnDate":"","FromCity":"","ToCity":"","TripDays":0,"Amount":0 } ,//住宿补助
                        { "ID":"0","IncoExpeID":"0","Type":"108","OccurDate":"","ReturnDate":"","FromCity":"","ToCity":"","TripDays":0,"Amount":0 } ,//其他
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
                if(res.data.code==2306){
                    console.log(res)
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
        filterMethod (value, option) {
            console.log(value,option)
            return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
        },
        asyncOK(){
            this.dataCost.push({
                OccurDate:this.costDetail[0].OccurDate,
                ReturnDate :this.costDetail[0].ReturnDate,
                FromCity  :this.costDetail[0].FromCity,
                ToCity :this.costDetail[0].ToCity,
                TripDays:this.costDetail[0].TripDays,
                Amount:this.costDetail[8].total,
                '101':this.costDetail[0]['Amount'],
                '102':this.costDetail[1]['Amount'],
                '103':this.costDetail[2]['Amount'],
                '104':this.costDetail[3]['Amount'],
                '105':this.costDetail[4]['Amount'],
                '106':this.costDetail[5]['Amount'],
                '107':this.costDetail[6]['Amount'],
                '108':this.costDetail[7]['Amount']
            })
        }
    }
}
</script>
<style lang='less' scoped>
    .travel{
        width: 100%;
        height:100%;
        .itemCard{
            margin-bottom: 20px;
        }
    }
</style>