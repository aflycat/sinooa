<template>
    <div class="custom_list">
        <Row :gutter="16" style="height:100%;">
            <Col span="6" style="height:100%;overflow:hidden;">
                <Card class="pla_wrap" >
                    <p slot="title">客户列表</p>
                     <Menu theme="light" active-name="1" class="pla_menu" @on-select="setPlatform">
                         <MenuGroup  >
                            <MenuItem v-for="item in projectList" :key="item.projectID" :name="item.projectID">
                                {{item.projectID}}
                            </MenuItem>
                        </MenuGroup>
                     </Menu>
                </Card>
            </Col>
            <Col span="18">
                <Card class="itemCard">
                    <p slot="title">公司信息</p>
                    <Form class="formWrap"  :label-width="120">
                        <Row>
                          <Col span="8">
                            <FormItem label="公司全称：" prop="ClientName">
                                <b>{{postdata.Client.ClientName}}</b>
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="公司简称：" prop="ClientShortName">
                                <b>{{postdata.Client.ShortName}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="统一社会代码" >
                                <b>{{postdata.Client.CodsCode}}</b>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="所在国家" >
                                <b>{{postdata.Client.Country}}</b>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="所在省市：" prop="ClientRegion">
                                <!-- <b>{{cityData[postdata.Client.Region]}}</b> -->
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="所属行业：" prop="ClientIndustry">
                               <!-- <b>{{IndustryData[postdata.Client.Industry]}}</b> -->
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="经营范围：" prop="ClientShortName">
                                <b>{{postdata.Client.Scope}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="客户代码：" prop="ClientCode">
                                <b>{{postdata.Client.ClientCode}}</b>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="相关客户代码:" >
                                <b>{{postdata.Project.RelatedClient}}</b>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="代表法人：" prop="ClientLegalPerson">
                                <b>{{postdata.Client.LegalPerson}}</b>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="总经理：" prop="ClientManager">
                                <b>{{postdata.Client.Manager}}</b>
                            </FormItem>   
                        </Col>

                        <Col span="8">
                            <FormItem label="成立日期：" prop="ClientOpenDate">
                                <!-- <b>{{postdata.Client.OpenDate.replace("T"," ").substr(0,10)}}</b> -->
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="注册地址：" prop="ClientAddress">
                                <b>{{postdata.Client.Address}}</b>
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="邮政编码：" prop="ClientShortName">
                                <b>{{postdata.Client.Zip}}</b>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="联系人员：" prop="ClientContact">
                                <b>{{postdata.Client.Contact}}</b>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="联系电邮：" prop="ClientContactEmail">
                                <b>{{postdata.Client.ContactEmail}}</b>
                            </FormItem>   
                        </Col>

                         <Col span="8">
                            <FormItem label="联系电话：" prop="ClientContactPhone">
                                <b>{{postdata.Client.ContactPhone}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="联系传真：" prop="ClientContactFax">
                                <b>{{postdata.Client.ContactFax}}</b>
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
                                <b>{{postdata.Client.RegisteredCapital||0}}万元</b>
                               
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="总资产：" prop="ClientTotalAssets">
                                <b>{{postdata.Client.TotalAssets||0}}万元</b>
                              
                            </FormItem>   
                        </Col>

                         <Col span="8">
                            <FormItem label="净资产：" prop="ClientNetAssets">
                                <b>{{postdata.Client.NetAssets||0}}万元</b>
                              
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="净利润：" prop="NetAssets">
                               <b> {{postdata.Client.NetProfit||0}}万元</b>
                               
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="营业收入：" prop="ClientIncome">
                                <b>{{postdata.Client.Income||0}}万元</b>
                               
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="营业利润：" prop="ClientProfit">
                                <b>{{postdata.Client.Profit||0}}万元</b>
                               
                            </FormItem>   
                        </Col>

                         <Col span="8">
                            <FormItem label="财务年度：" prop="ClientFinancialYear">
                                <b>{{postdata.Client.FinancialYear||0}}万元</b>
                               
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="财务季度：" prop="ClientFinancialQuarter">
                                <b>{{postdata.Client.FinancialQuarter||0}}万元</b>
                               
                            </FormItem>
                        </Col>
                        
                     
                    </Row>

                </Form>
            </Card>
            </Col>
        </Row>
        
    </div>
</template>
<script>
import {clientListQuery,clientListQueryDetail} from "@/api/data"
export default {
    mounted(){
        this.clientListQuery()
    },
    data(){
        return{
            projectList:[],
            postdata:{
                TaskFiles:[],
                TaskTypeID:'',//任务类别ID，与TaskTypes表的TaskTypeID对应（开发3/立项4/变动5），取自对应的菜单项
                TaskName:'',//任务名（UI中的请示事项要点）
                TaskSummary:'',//任务概要（UI中的请示事项具体内容）
                TaskOwner:'',//任务申请人ID，与User表的UserID对应，取自当前登录用户
                TaskFlows:[],
               
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
                    Members:[]//1表示项目经理，2表示项目主办，3表示项目成员，4基金合伙人，5基金投决会，6基金成员，与角色表对应
                }
            },
          
        }
    },
    methods:{
        clientListQuery(){
            clientListQuery({"ClientStatus":"2","USerID":JSON.parse(localStorage.getItem('userId'))}).then(res=>{
                if(res.data.code==2306){
                    // this.projectList=res.data.projectList
                }else{
                    this.$Message.error({
                        content:'项目列表加载失败:'+res.data.message
                    })
                }
            })
        },
        setPlatform(){

        }
    }

}
</script>
<style lang="less" >
    .custom_list{
        width: 100%;
        height: 100%;
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