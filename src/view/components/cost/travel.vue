
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
                                <Input v-model="phone" placeholder="请输入报销人职级"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                             <FormItem label="承担项目" prop="phone">
                                <Input v-model="phone" placeholder="请选择承担项目"></Input>
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
                                <Input  v-model="name" placeholder="请输入收款人姓名"></Input>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="收款账号" prop="phone">
                                <Input v-model="phone" placeholder="请输入收款账号"></Input>
                            </FormItem>   
                        </Col>

                         <Col span="8">
                             <FormItem label="开户行" prop="phone">
                                <Input v-model="phone" placeholder="请输入开户行"></Input>
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
                    <Button type="error">删除</Button> 
                </p>
                   
                
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
                                <DatePicker type="date" show-week-numbers placeholder="请选择前往日期" style="width:100%;"></DatePicker>
                            </FormItem>
                          </Col> 
                          <Col span="12">
                            <FormItem label="返回日期">
                                <DatePicker type="date" show-week-numbers placeholder="请选择返回日期" style="width:100%;"></DatePicker>
                            </FormItem>
                          </Col>  
                        <Col span="12">
                            <FormItem label="出发地">
                                <Input  placeholder="请输入出发地"></Input>
                            </FormItem>
                          </Col>
                         
                          <Col span="12">
                            <FormItem label="到达地">
                                <Input  placeholder="请输入到达地"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="天数">
                                <Input  placeholder="请输入天数"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="机车船费">
                                <Input  placeholder="请输入机车船费"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="接驳费">
                                <Input  placeholder="请输入接驳费"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="市内交通">
                                <Input  placeholder="请输入市内交通"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="住宿费">
                                <Input  placeholder="请输入住宿费"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="伙食补助">
                                <Input  placeholder="请输入伙食补助"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="交通补助">
                                <Input  placeholder="请输入交通补助"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="其他">
                                <Input  placeholder="请输入其他"></Input>
                            </FormItem>
                          </Col>  
                          <Col span="12">
                            <FormItem label="合计">
                                <Input  placeholder="请输入合计"></Input>
                            </FormItem>
                          </Col>  
                    </Row>
                   
                </Form>


        </Modal>
        
    </div>
</template>
<script>
export default {
    data(){
        return{
            flagMod:false,
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
            columnsCost:[
                {title: '前往日期', key: 'name'},
                {title: '返回日期', key: 'name'},
                {title: '出发地', key: 'name'},
                {title: '到达地', key: 'name'},
                {title: '天数', key: 'name'},
                {title: '机车船费', key: 'name'},
                {title: '接驳费', key: 'name'},
                {title: '市内交通', key: 'name'},
                {title: '住宿费', key: 'name'},
                {title: '伙食补助	', key: 'name'},
                {title: '交通补助', key: 'name'},
                {title: '其他', key: 'name'},
                {title: '合计', key: 'name'},
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
            dataCost:[
               {name:''}
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
            },
        asyncOK(){

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