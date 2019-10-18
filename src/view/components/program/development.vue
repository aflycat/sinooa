<template>
<!-- 项目开发 -->
    <div class="development">
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
           
            <Card  class="itemCard">
                <p slot="title">公司基本信息</p>
                <Form :label-width="80">
                    <Row>
  
                         <Col span="8">
                            <FormItem label="公司全称" prop="ClientName">
                                <Input v-model="postdata.Client.ClientName" placeholder="请输入公司全称"></Input>
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="公司简称" prop="ClientShortName">
                                <Input v-model="postdata.Client.ClientShortName" placeholder="请输入公司简称"></Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="所在省市" prop="ClientRegion">
                                <Select v-model="postdata.Client.ClientRegion" filterable   placeholder="请选择所在省市">
                                    <Option v-for="item in cityData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col> 
                         <Col span="8">
                            <FormItem label="所属行业" prop="ClientIndustry">
                                 <Select v-model="postdata.Client.ClientIndustry" filterable   placeholder="请选择所属行业">
                                    <Option v-for="item in IndustryData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>

                            </FormItem>
                        </Col>
                         
                       
                        <Col span="8">
                            <FormItem label="经营范围" prop="ClientShortName">
                                <Input v-model="postdata.Client.ClientScope" placeholder="请输入经营范围"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="客户代码" prop="ClientCode">
                                <Input v-model="postdata.Client.ClientCode" placeholder="请输入客户代码"></Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="代表法人" prop="ClientLegalPerson">
                                <Input v-model="postdata.Client.ClientLegalPerson" placeholder="请输入代表法人"></Input>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="总经理" prop="ClientManager">
                                <Input v-model="postdata.Client.ClientManager" placeholder="请输入总经理"></Input>
                            </FormItem>   
                        </Col>

                         <Col span="8">
                            <FormItem label="成立日期" prop="ClientOpenDate">
                                 <DatePicker @on-change="getClientOpenDate"  type="date" placeholder="请选择成立日期" style="width: 100%;"></DatePicker>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="注册地址" prop="ClientAddress">
                                <Input v-model="postdata.Client.ClientAddress" placeholder="请输入注册地址"></Input>
                            </FormItem>   
                        </Col>
                          <Col span="8">
                            <FormItem label="邮政编码" prop="ClientShortName">
                                <Input v-model="postdata.Client.ClientZip" placeholder="请输入邮政编码"></Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="联系人员" prop="ClientContact">
                                <Input v-model="postdata.Client.ClientContact" placeholder="请输入联系人员"></Input>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="联系电邮" prop="ClientContactEmail">
                                <Input v-model="postdata.Client.ClientContactEmail" placeholder="请输入联系电邮"></Input>
                            </FormItem>   
                        </Col>

                         <Col span="8">
                            <FormItem label="联系电话" prop="ClientContactPhone">
                                <Input v-model="postdata.Client.ClientContactPhone" placeholder="请输入联系电话"></Input>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="联系传真" prop="ClientContactFax">
                                <Input v-model="postdata.Client.ClientContactFax" placeholder="请输入联系传真"></Input>
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
                            <FormItem label="注册资本" prop="ClientRegisteredCapital">
                                <Input v-model="postdata.Client.ClientRegisteredCapital" type="number" placeholder="请输入注册资本">
                                      <span slot="append">万元</span>
                                </Input>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="总资产" prop="ClientTotalAssets">
                                <Input v-model="postdata.Client.ClientTotalAssets" type="number" placeholder="请输入总资产">
                                  <span slot="append">万元</span>
                                </Input>
                            </FormItem>   
                        </Col>

                         <Col span="8">
                            <FormItem label="净资产" prop="ClientNetAssets">
                                <Input v-model="postdata.Client.ClientNetAssets" type="number" placeholder="请输入净资产">
                                      <span slot="append">万元</span>
                                </Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="营业收入" prop="ClientIncome">
                                <Input v-model="postdata.Client.ClientIncome" type="number" placeholder="请输入营业收入">
                                      <span slot="append">万元</span>
                                </Input>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="营业利润" prop="ClientProfit">
                                <Input v-model="postdata.Client.ClientProfit" type="number" placeholder="请输入营业利润">
                                      <span slot="append">万元</span>
                                </Input>
                            </FormItem>   
                        </Col>

                         <Col span="8">
                            <FormItem label="财务年度" prop="ClientFinancialYear">
                                <Input v-model="postdata.Client.ClientFinancialYear" type="number" placeholder="请输入财务年度">
                                  <span slot="append">万元</span>
                                </Input>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="财务季度" prop="ClientFinancialQuarter">
                                <Input v-model="postdata.Client.ClientFinancialQuarter" type="number" placeholder="请输入财务季度">
                                      <span slot="append">万元</span>
                                </Input>
                            </FormItem>
                        </Col>
                        
                     
                    </Row>

                </Form>
            </Card>
            <Card  class="itemCard">
                <p slot="title">项目信息</p>
                  <Form :label-width="80">
                    <Row>
                        <Col span="16">
                            <change-tap @getValue="getTapValue"></change-tap>
                        </Col>
                        <Col span="8">
                            <FormItem label="项目品种" prop="ProjectType">
                                <Select v-model="postdata.Project.ProjectType" filterable   placeholder="请选择项目品种">
                                    <Option v-for="item in TypeData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="项目角色" prop="ProjectRole">
                                 <Select v-model="postdata.Project.ProjectRole" filterable   placeholder="请选择项目角色">
                                    <Option v-for="item in RoleData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                
                            </FormItem>   
                        </Col>

                         <Col span="8">
                            <FormItem label="项目经理" prop="Manager">
                                 <Select v-model="ManagerVlaue" filterable @on-change="getManager" label-in-value  placeholder="请选择项目经理">
                                    <Option v-for="item in ManagerData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>  
                        </Col>
                        <Col span="8">
                            <FormItem label="项目主办" prop="Owner">
                                 <Select v-model="OwnerVlaue" filterable  @on-change="getOwner" label-in-value  placeholder="请选择项目主办">
                                    <Option v-for="item in ManagerData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                         <Col span="16">
                            <FormItem label="项目成员" prop="Member">
                                 <Select v-model="MemberData" filterable multiple @on-change="getMember" label-in-value placeholder="请选择项目成员">
                                    <Option v-for="item in ManagerData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                
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
                                  <DatePicker @on-change="getProjectStartDate" type="date" placeholder="请选择开始日期" style="width: 100%;"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="结束日期" prop="ProjectEndDate">
                                  <DatePicker  @on-change="getProjectEndDate"  type="date" placeholder="请选择结束日期" style="width: 100%;"></DatePicker>
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
                        <Button type="primary" :loading="loading" @click="handleSubmit('formValidate')" >
                            <span v-if="!loading">提交</span>
                            <span v-else>提交中...</span>
                            
                        </Button>
                       
                    </FormItem>
                </Form>   

            </Card>
          <upload-files ref="uploadModal"  @handleUploadFileEvent="handleUploadEvent"></upload-files>   
    </div>
</template>
<script>
import UploadFiles from "@/view/components/upload_file/upload_file"
import changeTap from "@/view/components/template/change_tap.vue"
import store from "@/store"
import {getprogectType,getprogectRole,getuserList,getCityList,getIndustryList} from "@/api/data"
import {projectAdd,projectAddFile} from "@/api/user"
export default {
    components:{
        UploadFiles,
        changeTap

    },
    mounted(){
        this.name=JSON.parse(localStorage.getItem("userName"));
        this.phone=JSON.parse(localStorage.getItem("phone"));
        this.postdata.TaskOwner=JSON.parse(localStorage.getItem("userId"))
        this.getCityList();
        this.getIndustryList();
        this.getprogectType();
        this.getprogectRole();
        this.getuserList();
    },
    data(){
        return{
            loading:false,
            name:'',
            phone:'',
            cityData:[],
            cityVlaue:'',
            IndustryData:[],
            IndustryVlaue:'',
            DataVlaue:'',
            TypeVlaue:'',
            TypeData:[],
            RoleVlaue:'',
            RoleData:[],
            ManagerVlaue:'',
            ManagerData:[],
            OwnerVlaue:'',
            OwnerData:[],
            MemberData:[],
            MemberList:[],
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
                        Members:[]
                    }
            }
        }
    },
    methods:{
        handleSubmit(){
            console.log(this.postdata);
            this.postdata.Project.ClientCode= this.postdata.Client.ClientCode;
            this.loading=true;

            console.log(this.postdata.Project.Members)
            if(this.fileWrap.length==0){//没有文件上传
                
            }else{//有文件上传

            }
            



        },
        getManager(value){
            this.postdata.Project.Members[0]={
                
                    ID:0,//数据ID (用默认值0)
                    ProjectID:0,//项目ID，开发/立项（未选已有项目）/立项（选已有项目）报告为0，变动报告为选中的项目ID
                    MemberID:value.value,//项目成员ID，与用户表UserID对应
                    MemberName:value.label,//项目成员的姓名
                    MemberType:1,//1表示项目经理，2表示项目主办，3表示项目成员，4基金合伙人，5基金投决会，6基金成员，与角色表对应
                    EstimatedHour:0,//预计投入工时，暂未使用
                    MemberStatus:1//1表示目前的成员，0表示过往的成员(用默认值1)
                
            }
        },
        getOwner(value){
            this.postdata.Project.Members[1]={
                    ID:0,//数据ID (用默认值0)
                    ProjectID:0,//项目ID，开发/立项（未选已有项目）/立项（选已有项目）报告为0，变动报告为选中的项目ID
                    MemberID:value.value,//项目成员ID，与用户表UserID对应
                    MemberName:value.label,//项目成员的姓名
                    MemberType:2,//1表示项目经理，2表示项目主办，3表示项目成员，4基金合伙人，5基金投决会，6基金成员，与角色表对应
                    EstimatedHour:0,//预计投入工时，暂未使用
                    MemberStatus:1//1表示目前的成员，0表示过往的成员(用默认值1)
            }
        },
        getMember(value){
            this.postdata.Project.Members.splice(2,this.postdata.Project.Members.length-1)
            value.forEach(element=>{
                 this.postdata.Project.Members.push({
                    ID:0,//数据ID (用默认值0)
                    ProjectID:0,//项目ID，开发/立项（未选已有项目）/立项（选已有项目）报告为0，变动报告为选中的项目ID
                    MemberID:element.value,//项目成员ID，与用户表UserID对应
                    MemberName:element.label,//项目成员的姓名
                    MemberType:3,//1表示项目经理，2表示项目主办，3表示项目成员，4基金合伙人，5基金投决会，6基金成员，与角色表对应
                    EstimatedHour:0,//预计投入工时，暂未使用
                    MemberStatus:1//1表示目前的成员，0表示过往的成员(用默认值1)
                 })
            })
        },
        getClientOpenDate(value){
            this.postdata.Client.ClientOpenDate=value;
        },
        getProjectStartDate(value){
            this.postdata.Project.ProjectStartDate=value;
        },
        getProjectEndDate(value){
            this.postdata.Project.ProjectEndDate=value;
        },
        getprogectType(){
            getprogectType({"PageIndex":1,"PageSize":1000}).then(res=>{
                 if(res.data.code==0){
                    res.data.projectTypeList.forEach(element => {
                        this.TypeData.push({
                            label:element.projectTypeName,
                            value:element.projectTypeId
                        })
                    });
                }else{
                    this.$Message.error({
                        content:"项目品种信息加载失败:"+res.data.message
                    })
                }
            })
        },
        getprogectRole(){
            getprogectRole({"PageIndex":1,"PageSize":1000}).then(res=>{
                 if(res.data.code==0){
                    res.data.projectRoleList.forEach(element => {
                        this.RoleData.push({
                            label:element.projectRoleName,
                            value:element.projectRoleId
                        })
                    });
                }else{
                    this.$Message.error({
                        content:"项目角色信息加载失败:"+res.data.message
                    })
                }
            })
        },
        getuserList(){
            getuserList({"PageIndex":1,"PageSize":1000}).then(res=>{
                if(res.data.code==0){
                    res.data.userList.forEach(element => {
                        this.ManagerData.push({
                            label:element.userName,
                            value:element.userId
                        })
                    });
                }else{
                    this.$Message.error({
                        content:"成员信息加载失败:"+res.data.message
                    })
                }
            })
        },
        getCityList(){
            getCityList({"PageIndex":1,"PageSize":500}).then(res=>{
                
                if(res.data.code==0){
                    res.data.regionList.forEach(element => {
                        this.cityData.push({
                            label:element.regionName,
                            value:element.regionId
                        })
                    });
                }else{
                    this.$Message.error({
                        content:"公司所在省市信息加载失败:"+res.data.message
                    })
                }
            })
        },
        getIndustryList(){
            getIndustryList({"PageIndex":1,"PageSize":500}).then(res=>{
                if(res.data.code==0){
                    
                    res.data.industryList.forEach(element => {
                        this.IndustryData.push({
                            label:element.industryName,
                            value:element.industryId
                        })
                    });
                }else{
                    this.$Message.error({
                        content:"公司所属行业信息加载失败:"+res.data.message
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
        },getTapValue(tap,tapDet){
            console.log(tap,tapDet)
        }
    }
}
</script>
<style lang='less' scoped>
    .development{
        width: 100%;
        height:100%;
        .itemCard{
            margin-bottom: 20px;
        }
    }
</style>