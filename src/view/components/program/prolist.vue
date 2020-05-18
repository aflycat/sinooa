<template>
    <div class="program_list">
        <Row :gutter="16" style="height:100%;">
            <Col span="6" style="height:100%;overflow:hidden;">
                <Card class="pla_wrap" >
                    <p slot="title">项目列表</p>
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
                    <p slot="title">项目信息</p>
                    <Form class="formWrap"  :label-width="120">
                        <Row>
                       <Col span="8">
                            <FormItem label="权属平台：" >
                                 <b>{{platformName}}</b>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="所属部门：" >
                                 <b>{{departmentName}}</b>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="所属基金：" >
                                 <b>{{foundName||'基金接口尚未开发'}}</b>
                            </FormItem>
                        </Col>
                       <Col span="8">
                            <FormItem label="项目品种:" prop="ProjectType">
                                 
                                 <b>{{TypeObj[postdata.Project.ProjectType]}}</b>
                                
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="项目角色:" prop="ProjectRole">
                                 <b>{{RoleObj[postdata.Project.ProjectRole]}}</b>
                            </FormItem>   
                        </Col>

                           <Col span="8">
                            <FormItem label="项目经理：" prop="Manager">
                                <b> {{ManagerVlaue}}</b>
                            </FormItem>  
                        </Col>
                        <Col span="8">
                            <FormItem label="项目主办：" prop="Owner"> 
                              <b> {{OwnerVlaue}}</b>
                            </FormItem>
                        </Col>
                         <Col span="16">
                            <FormItem label="项目成员：" prop="Member">
                               <b> {{MemberData.toString()}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="24">
                            <FormItem label="项目内容：" prop="phone">
                                <b>{{postdata.Project.Summary}}</b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="项目来源：" prop="phone">
                                <b>{{postdata.Project.Source}}</b>
                            </FormItem>   
                        </Col>
                        <Col span="8">
                            <FormItem label="预计开始日期：" prop="ProjectStartDate">
                                <b>{{postdata.Project.EstStartDate.replace("T"," ").substr(0,10)}}</b>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="预计结束日期：" prop="name">
                                <b>{{postdata.Project.EstEndDate.replace("T"," ").substr(0,10)}}</b>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="实际开始日期：" >
                                <b>{{postdata.Project.RealStartDate.replace("T"," ").substr(0,10)}}</b>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="实际结束日期：" >
                                <b>{{postdata.Project.RealEndDate.replace("T"," ").substr(0,10)}}</b>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="预计工时费用：" prop="ProjectEstimatedHourCost">
                                <b>{{postdata.Project.ProjectEstimatedHourCost||0}}万元</b>
                            </FormItem>   
                        </Col>
                         <Col span="8">
                            <FormItem label="预计总收入：" >
                                <b>{{postdata.Project.EstIncome}}万元</b>
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="预计直接费用：" prop="ProjectEstimatedFeeCost">
                                <b>{{postdata.Project.EstimatedFeeCost||0}}万元</b>
                            </FormItem>   
                        </Col>
                    </Row>
                    </Form>
                </Card>
                <Card  class="itemCard">
                <p slot="title">项目进度</p>
                <Table max-height='300' :columns="progress" :data="progressData"></Table>                
            </Card>               
            </Col>
        </Row>
    </div>
</template>
<script>
import {programListQuery,programListQueryDetail,getprogectRole,getprogectType,geAllPlatformDetail,getDepartmentDetail} from "@/api/data"
export default {
    mounted(){
        this.programListQuery()
        this.getprogectType();//获取项目类型
        this.getprogectRole();//获取项目角色
    },
    data(){
        return{
            ManagerVlaue:'',
            OwnerVlaue:'',
            TypeObj:{},
            RoleObj:{},
            MemberData:[],
            projectList:[],
            platformName:'',
            departmentName:'',
            foundName:'',
             progress:[
                {title:'序号',key:'ScheduleID',width:100},
                {title:'进度名',key:'ScheduleName'},
                {title:'预计开始时间',key:'EstStartDate'},
                {title:'预计结束时间',key:'EstEndDate'},
                {title:'实际开始时间',key:'RealStartDate'},
                {title:'实际结束时间',key:'RealEndDate'},
                {title:'说明',key:'Summary'},
            
            ],
            progressData:[],
            postdata:{
                    Project:{
                        ProjectID:0,//项目ID，开发/立项（未选已有项目）/立项（选已有项目）报告：0，提交后新增项目信息，变动报告：为选中的项目ID，提交后保存项目历史信息（ProjectStatus设为0）并新增最新信息
                        ClientID:0,//客户ID 
                        ClientCode:'',//客户代码，不同项目使用“客户代码 + 项目品种 + 项目角色”唯一区分
                        ProjectType:'',//项目品种，下拉表，从后台字典表中获取
                        ProjectRole:'',//项目角色，下拉表，从后台字典表中获取
                        Source:'',//项目来源--**
                        EstimatedFeeCost:0,//预计直接费用
                        EstimatedHourCost:0,//预计工时费用
                        ProjectStatus:1,//状态，默认为1，0表示历史信息，2表示开发报告审批完的项目，3表示立项报告审批完的项目，4表示总结报告审批完的项目,5终止报告审批完的项目
                        Members:[],

                        PlatformID:'',//权属平台id
                        RealStartDate:'',//实际项目开始日期
                        RealEndDate:'',//实际项目结束日期
                        PlatCode:'',//权属平台代码
                        DepartmentID:'',//部门id
                        DeptCode:'',//部门代码
                        FundCode:'暂时未有',//基金代码
                        FundID:123,//基金id
                        RelatedClient:'',//相关其他客户代码
                        ProjectLabel:'',//项目标签
                        EstIncome:'',//预计总收入
                        Schedules:[],//项目进度
                        Summary:'',//项目概要
                        EstStartDate:'',//预计项目开始日期
                        EstEndDate:''//预计项目结束日期
                    }
            },
          
        }
    },
    methods:{
        programListQuery(){
            programListQuery({	"ProjectStatus":"2","USerID":JSON.parse(localStorage.getItem('userId'))}).then(res=>{
                if(res.data.code==2307){
                    this.projectList=res.data.projectList
                }else{
                    this.$Message.error({
                        content:'项目列表加载失败:'+res.data.message
                    })
                }
            })
        },
        setPlatform(id){
            programListQueryDetail({ProjectID:id}).then(res=>{
                if(res.data.code==2308){
                    this.postdata={
                        Project:{
                            ProjectID:res.data.project.projectID,//项目ID，开发/立项（未选已有项目）/立项（选已有项目）报告：0，提交后新增项目信息，变动报告：为选中的项目ID，提交后保存项目历史信息（ProjectStatus设为0）并新增最新信息
                            ClientID:res.data.client.clientID,//客户ID 
                            ClientCode:res.data.project.clientCode,//客户代码，不同项目使用“客户代码 + 项目品种 + 项目角色”唯一区分
                            ProjectType:res.data.project.projectType,//项目品种，下拉表，从后台字典表中获取
                            ProjectRole:res.data.project.projectRole,//项目角色，下拉表，从后台字典表中获取
                            ProjectSummary:res.data.project.projectSummary,//项目概要
                            Source:res.data.project.source,//项目来源
                            // ProjectStartDate:res.data.project.projectStartDate,//项目开始日期
                            // ProjectEndDate:res.data.project.projectEndDate,//项目结束日期
                            EstimatedFeeCost:res.data.project.estimatedFeeCost,//预计直接费用
                            EstimatedHourCost:res.data.project.estimatedHourCost,//预计工时费用
                            ProjectStatus:res.data.project.projectStatus,//状态，默认为1，0表示历史信息，2表示开发报告审批完的项目，3表示立项报告审批完的项目，4表示总结报告审批完的项目
                            
                            PlatformID:res.data.project.platformID,//权属平台id
                            RealStartDate:res.data.project.realStartDate,//实际项目开始日期
                            RealEndDate:res.data.project.realEndDate,//实际项目结束日期
                            PlatCode:res.data.project.platCode,//权属平台代码
                            DepartmentID:res.data.project.departmentID,//部门id
                            DeptCode:res.data.project.deptCode,//部门代码
                            FundCode:res.data.project.fundCode,//基金代码
                            FundID:res.data.project.fundID,//基金id
                            RelatedClient:res.data.project.relatedClient,//相关其他客户代码
                            ProjectLabel:res.data.project.projectLabel,//项目标签
                            EstIncome:res.data.project.estIncome,//预计总收入
                            Schedules:res.data.project.schedules,//项目进度
                            Summary:res.data.project.summary,//项目概要
                            EstStartDate:res.data.project.estStartDate,//预计项目开始日期
                            EstEndDate:res.data.project.estEndDate//预计项目结束日期
                        }
                    };
                    this.loadMember(res.data.project.members);//加载人员信息
                    this.geAllPlatformDetail(res.data.project.platformID);//获取平台信息
                    this.getDepartmentDetail(res.data.project.departmentID);//获取部门信息
                    this.loadProcess(res.data.project.schedules)//加载项目进度
                }
            })
        },
         loadProcess(obj){
                this.progressData=[];
                obj.forEach(element=>{
                    this.progressData.push({
                        ID:element.iD,
                        ProjectID:element.projectID,
                        RealStartDate:element.realStartDate.substr(0,10),
                        RealEndDate:element.realEndDate.substr(0,10),
                        ScheduleID:element.scheduleID,
                        ScheduleName:element.scheduleName,
                        EstStartDate:element.realStartDate.substr(0,10),
                        EstEndDate:element.estEndDate.substr(0,10),
                        Summary:element.summary,
                        Status:element.status
                    })
                })
            },
        geAllPlatformDetail(id){
            geAllPlatformDetail({PlatformID:id}).then(res=>{
                if(res.data.code==2106){
                    this.platformName=res.data.platform.shortName;
                }else{
                    this.$Message.error("平台信息查询失败:"+res.data.message)
                }
            })
        },
        getDepartmentDetail(id){
            getDepartmentDetail({DepartmentID:id}).then(res=>{
                if(res.data.code==2206){
                    this.departmentName=res.data.department.deptName;
                }else{
                    this.$Message.error("部门信息查询失败:"+res.data.message)
                }
            })
        },
        loadMember(obj){
            this.MemberData=[]
            obj.map(item=>{
                switch (item.memberType){
                    case 91:
                        //项目经理
                        this.ManagerVlaue=item.memberName;
                    break;
                     case 92:
                         //项目主办
                        this.OwnerVlaue=item.memberName;
                    break;
                     case 93:
                         //项目成员
                        this.MemberData.push(item.memberName);
                    break;
                }              
            })
        },getprogectType(){

            getprogectType({"PageIndex":1,"PageSize":1000}).then(res=>{
                 if(res.data.code==0){
                    res.data.projectTypeList.forEach(element => {
                        this.TypeObj[element.projectTypeId]=element.projectTypeName
                        
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
                        this.RoleObj[element.projectRoleId]=element.projectRoleName
                        
                    });
                }else{
                    this.$Message.error({
                        content:"项目角色信息加载失败:"+res.data.message
                    })
                }
            })
        },

    }

}
</script>
<style lang="less" >
    .program_list{
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