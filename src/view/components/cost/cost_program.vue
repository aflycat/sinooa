
<template>
<!-- 项目收入费用-->
    <div class="cost_program">
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
                                <Input v-model="phone" placeholder="请选择承担项目"></Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                             <FormItem label="项目经理" prop="phone">
                                <Input v-model="phone" placeholder="请选择项目经理"></Input>
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
                                <Input  v-model="name" placeholder="请输入收款单位"></Input>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="收款账号" prop="phone">
                                <Input v-model="phone" placeholder="请输入收款账号"></Input>
                            </FormItem>   
                        </Col>

                         <Col span="8">
                             <FormItem label="收款银行" prop="phone">
                                <Input v-model="phone" placeholder="请输入收款银行"></Input>
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
                            <FormItem label="收入性质" prop="phone">
                                <Input v-model="phone" placeholder="请输入收入性质"></Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                        
                            <FormItem label="发票金额" prop="name">
                                <Input  v-model="name" type="number" placeholder="请输入发票金额"></Input>
                            </FormItem>
                        </Col>
                        

                         <Col span="8">
                             <FormItem label="发票金额(大写)" prop="phone">
                                <Input v-model="phone" type="number" placeholder="请输入发票金额(大写)"></Input>
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
                        
                        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                       
                    </FormItem>
                </Form>   

            </Card>
    </div>
</template>
<script>
export default {
    data(){
        return{
            name:'',
            phone:'',
            cityData:['a', 'b', 'c'],
            cityVlaue:'',
            IndustryData:['a', 'b', 'c'],
            DataVlaue:'',
            TypeVlaue:'',
            TypeData:['a', 'b', 'c'],
            RoleVlaue:'',
            RoleData:['a', 'b', 'c'],
            ManagerVlaue:'',
            ManagerData:['a', 'b', 'c'],
            OwnerVlaue:'',
            OwnerData:['a', 'b', 'c'],
            MemberData:[],
            MemberList:[
                {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
            ],
            
            postdata:{
                    TaskTypeID:3,//任务类别ID，与TaskTypes表的TaskTypeID对应（开发3/立项4/变动5），取自对应的菜单项
                    TaskName:'',//任务名（UI中的请示事项要点）
                    TaskSummary:'',//任务概要（UI中的请示事项具体内容）
                    TaskOwner:'',//任务申请人ID，与User表的UserID对应，取自当前登录用户
                    Client:{
                        ClientID:0,//客户ID，开发/立项（未选已有项目）报告：为0，提交后新增客户信息，立项（选已有项目）/变动报告：为选中的项目的客户ID，提交后保存客户历史信息（ClientStatus设为0）并新增最新信息
                        ClientName:'',//公司全称
                        ClientRegion:'',//所在省市，下拉表，从后台字典表中获取
                        ClientShortName:'',//公司简称
                        ClientCode:'',//客户代码，不同客户使用该唯一的代码区分
                        ClientScope:'',//经营范围
                        ClientIndustry:'',//所属行业，下拉表，从后台字典表中获取
                        ClientLegalPerson:'',//法人代表
                        ClientManager:'',//总经理
                        ClientRegisteredCapital:0,//注册资本
                        ClientOpenDate:'',//成立日期
                        ClientAddress:'',//注册地址
                        ClientZip:'',//邮政编码
                        ClientContact:'',//联系人员
                        ClientContactEmail:'',//联系电邮
                        ClientContactPhone:'',//联系电话
                        ClientContactFax:'',//联系传真
                        ClientTotalAssets:0,//总资产
                        ClientNetAssets:0,//净资产
                        ClientIncome:0,//营业收入
                        ClientProfit:0,//营业利润
                        ClientNetProfit:0,//净利润
                        ClientFinancialYear:0,//财务年度
                        ClientFinancialQuarter:0,//财务季度
                        ClientStatus:1//状态，1表示最新信息，0表示历史信息
                    },
                    Project:{
                        ProjectID:0,//项目ID，开发/立项（未选已有项目）/立项（选已有项目）报告：0，提交后新增项目信息，变动报告：为选中的项目ID，提交后保存项目历史信息（ProjectStatus设为0）并新增最新信息
                        ClientID:0,//客户ID 
                        ClientCode:'',//客户代码，不同项目使用“客户代码 + 项目品种 + 项目角色”唯一区分
                        ProjectType:'',//项目品种，下拉表，从后台字典表中获取
                        ProjectRole:'',//项目角色，下拉表，从后台字典表中获取
                        ProjectSummary:'',//项目概要
                        ProjectSource:'',//项目来源
                        ProjectStartDate:'',//项目开始日期
                        ProjectEndDate:'',//项目结束日期
                        ProjectEstimatedFeeCost:0,//预计直接费用
                        ProjectEstimatedHourCost:0,//预计工时费用
                        ProjectStatus:1,//状态，默认为1，0表示历史信息，2表示开发报告审批完的项目，3表示立项报告审批完的项目，4表示总结报告审批完的项目
                        Members:[
                            {
                                ID:0,//数据ID (用默认值0)
                                ProjectID:0,//项目ID，开发/立项（未选已有项目）/立项（选已有项目）报告为0，变动报告为选中的项目ID
                                MemberID:'',//项目成员ID，与用户表UserID对应
                                MemberName:'',//项目成员的姓名
                                MemberType:1,//1表示项目经理，2表示项目主办，3表示项目成员，4基金合伙人，5基金投决会，6基金成员，与角色表对应
                                EstimatedHour:0,//预计投入工时，暂未使用
                                MemberStatus:1//1表示目前的成员，0表示过往的成员(用默认值1)
                            },
                            {
                                ID:0,//数据ID (用默认值0)
                                ProjectID:0,//项目ID，开发/立项（未选已有项目）/立项（选已有项目）报告为0，变动报告为选中的项目ID
                                MemberID:'',//项目成员ID，与用户表UserID对应
                                MemberName:'',//项目成员的姓名
                                MemberType:2,//1表示项目经理，2表示项目主办，3表示项目成员，4基金合伙人，5基金投决会，6基金成员，与角色表对应
                                EstimatedHour:0,//预计投入工时，暂未使用
                                MemberStatus:1//1表示目前的成员，0表示过往的成员(用默认值1)
                            }
                        ]
                    }
            }
        }
    },
    methods:{
         filterMethod (value, option) {
             console.log(value,option)
                return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
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