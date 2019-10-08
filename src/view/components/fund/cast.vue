<template>
<!-- 基金投决会 -->
    <div class="cast">
            <Card class="itemCard">
                <p slot="title">报送人信息</p>
                <Form :label-width="80">
                    <Row>
                        <Col span="8">
                            <FormItem label="报送人" prop="name">
                                <Input disabled v-model="name" placeholder="请输入报送人姓名"></Input>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="联系电话" prop="phone">
                                <Input v-model="phone" placeholder="请输入报送人联系电话"></Input>
                            </FormItem>   
                        </Col>

                         <Col span="8">

                        </Col>
                    </Row>
                   
                </Form>
            </Card>
           </Card>
              <Card class="itemCard">
                <p slot="title">基金选择</p>
                <Form :label-width="80">
                    <Row>
                           <Col span="8">
                            <FormItem label="基金简称" prop="ProjectType">
                                <AutoComplete v-model="ProjectVlaue" :data="ProjectData" :filter-method="filterMethod" placeholder="请选择项目"></AutoComplete>

                                <!-- <Input v-model="postdata.Project.ProjectType" placeholder="请选择项目品种"></Input> -->
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
                            <FormItem label="基金合伙人" prop="ClientRegisteredCapital">
                                <Input   placeholder="请选择基金合伙人"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="投决会委员" prop="ClientRegisteredCapital">
                                <Input      placeholder="请选择投决会委员"></Input>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="合伙人数量" prop="ClientRegisteredCapital">
                                <Input  type="number" placeholder="请输入合伙人数量">
                                <span slot="append">个</span>
                                </Input>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="普通合伙人数量" prop="ClientRegisteredCapital">
                                <Input   type="number"   placeholder="请输入普通合伙人数量">
                                <span slot="append">个</span>
                                </Input>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="有限合伙人数量" prop="ClientRegisteredCapital">
                                <Input   type="number"   placeholder="请输入有限合伙人数量">
                                <span slot="append">个</span>
                                </Input>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="管理人" prop="ClientRegisteredCapital">
                                <Input   placeholder="请输入管理人"></Input>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="普通合伙人" prop="ClientRegisteredCapital">
                                <Input      placeholder="请输入普通合伙人"></Input>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="执行事务合伙人" prop="ClientRegisteredCapital">
                                <Input     placeholder="请输入执行事务合伙人"></Input>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="执行事务合伙人委派代表" prop="ClientRegisteredCapital">
                                <Input     placeholder="请输入执行事务合伙人委派代表"></Input>
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
                            <FormItem label="项目品种" prop="ProjectType">
                                <AutoComplete v-model="TypeVlaue" :data="TypeData" :filter-method="filterMethod" placeholder="请选择项目品种"></AutoComplete>

                                <!-- <Input v-model="postdata.Project.ProjectType" placeholder="请选择项目品种"></Input> -->
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="项目角色" prop="ProjectRole">
                                 <AutoComplete v-model="RoleVlaue" :data="RoleData" :filter-method="filterMethod" placeholder="请选择项目角色"></AutoComplete>
                                <!-- <Input v-model="postdata.Project.ProjectRole" placeholder="请选择项目角色"></Input> -->
                            </FormItem>   
                        </Col>

                         <Col span="8">
                            <FormItem label="项目经理" prop="Manager">
                                 <AutoComplete v-model="ManagerVlaue" :data="ManagerData" :filter-method="filterMethod" placeholder="请选择项目经理"></AutoComplete>
                                <!-- <Input  placeholder="请选择项目经理"></Input> -->
                            </FormItem>  
                        </Col>
                        <Col span="8">
                            <FormItem label="项目主办" prop="Owner">
                                 <AutoComplete v-model="OwnerVlaue" :data="OwnerData" :filter-method="filterMethod" placeholder="请选择项目主办"></AutoComplete>
                                <!-- <Input  placeholder="请选择项目主办"></Input> -->
                            </FormItem>
                        </Col>
                         <Col span="16">
                            <FormItem label="项目成员" prop="Member">
                                <Select v-model="MemberData" multiple style="width:100%;">
                                    <Option v-for="item in MemberList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <!-- <Input  placeholder="请选择项目成员"></Input> -->
                            </FormItem>   
                        </Col>
                        
                        <Col span="8">
                            <FormItem label="工时费用" prop="ProjectEstimatedHourCost">
                                <Input v-model="postdata.Project.ProjectEstimatedHourCost" type="number" placeholder="请输入工时费">
                                      <span slot="append">万元</span>
                                </Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="直接费用" prop="ProjectEstimatedFeeCost">
                                <Input v-model="postdata.Project.ProjectEstimatedFeeCost" type="number" placeholder="请输入直接费用">
                                      <span slot="append">万元</span>
                                </Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="项目内容" prop="phone">
                                <Input v-model="postdata.Project.ProjectSummary" placeholder="请输入项目内容"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="项目来源" prop="phone">
                                <Input v-model="postdata.Project.ProjectSource" placeholder="请输入项目来源"></Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="开始日期" prop="ProjectStartDate">
                                  <DatePicker type="date" placeholder="请选择开始日期" style="width: 100%;"></DatePicker>
                                <!-- <Input v-model="postdata.Project.ProjectStartDate" placeholder="请选择预计周期"></Input> -->
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="结束日期" prop="name">
                                  <DatePicker type="date" placeholder="请选择结束日期" style="width: 100%;"></DatePicker>
                                <!-- <Input v-model="postdata.Project.ProjectEndDate" placeholder="请选择预计周期"></Input> -->
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
                     <FormItem label="文件列表" v-if="fileName.length>0&&showFile">
                            <p class="fileName" v-for="(item,index) in fileName" >
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
                       <Button @click="showUploadFile()" style="margin-right: 8px">添加附件</Button>
                        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                       
                    </FormItem>
                </Form>   

            </Card>
        <upload-files ref="uploadModal"  @handleUploadFileEvent="handleUploadEvent"></upload-files>

    </div>
</template>
<script>

import UploadFiles from "@/view/components/upload_file/upload_file"

export default {    
    components:{
        UploadFiles
    },
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
             fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
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
<style lang='less' scoped>
    .cast{
        width: 100%;
        height:100%;
        .itemCard{
            margin-bottom: 20px;
        }
    }
</style>