<template>
    <div class="platform_change">
        <Card  class="itemCard">
            <p slot="title">报送人信息</p>
              <Form class="formWrap"  :label-width="110">
                <Row>
                    <Col span="12">
                        <FormItem label="报送人">
                            <b>{{postData.TaskOwnerName}}</b>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="联系电话">
                              <b>{{postData.TaskOwnerPhone}}</b>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Card>
        <Card class="itemCard">
            <p slot="title">权属平台信息</p>
            <Form class="formWrap"  :label-width="110">
                <FormItem  label="权属平台选择">
                    <b>{{platArr[7]}}</b> 

                   
                </FormItem>
                <FormItem  label="权属平台全称">
                    <Input  placeholder="权属平台全称" v-model="postData.Platform.PlatName"></Input>
                </FormItem>
                <Row>
                    <Col span="12">
                        <FormItem  label="权属平台简称">
                            <Input  placeholder="权属平台简称" v-model="postData.Platform.ShortName"></Input>
                        </FormItem>
                    </Col>
                
                    <Col span="12">
                        <FormItem label="权属平台代码">
                            <Input  placeholder="权属平台代码" v-model="postData.Platform.PlatCode"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem  label="统一社会信用代码">
                            <Input  placeholder="统一社会信用代码" v-model="postData.Platform.CodsCode"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="成立日期">
                            <DatePicker :value="postData.Platform.OpenDate" type="date" placeholder="选择成立日期" style="width:100%;" @on-change="setPlatOpenDate"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="注册地址">
                            <Input  placeholder="注册地址"  v-model="postData.Platform.Address"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="注册资本">
                            <Input type="number"  v-model="postData.Platform.RegisteredCapital" placeholder="注册资本">
                                <span slot="append">万元</span>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="经营范围">
                            <Input  placeholder="经营范围" v-model="postData.Platform.OperateScope"></Input>
                        </FormItem>
                    </Col>
                </Row>
                 </Form>
        </Card>

         <Card class="itemCard">
            <p slot="title">权属平台人员信息</p>
            <Table :columns="member" :data="memberData">
                <template  slot-scope="{row, index}" slot="deal">
                    <span type="text" @click="showEdict(2,index)"  style="margin-right:5px;color:#3498db;cursor:pointer;">编辑</span>
                    <span type="text" @click="shoeDelete(index)"  style="margin-right:5px;color:#ed4014;cursor:pointer;">删除</span>
                </template>
            </Table>
           
            <Button style="margin-top:20px;" type="primary"  @click="showEdict(1)">新增人员</Button>
        </Card>

         <task-file :fileList='postData.TaskFiles' :flowRequire='flowRequire'></task-file>
        <task-flows :taskFlows='postData.TaskFlows' :taskFlowID='taskFlowID'></task-flows>
        <edict-button @handle-submit-agree='handleSubmitAgree' :TaskID='taskID' 
                :TaskFlowID='taskFlowID' :TaskStr='postData' 
                >
            </edict-button>
        <Modal v-model="memModal" title="编辑人员信息" @on-ok="setMember">
                <Form :label-width="100">
                         <Row >
                            <Col span="12">
                                <FormItem label="人员类型">
                                    <Select   v-model="inputMemberType" label-in-value @on-change="getInputMemberType">
                                        <Option v-for="item in kindArr" :key="item.value" :value="item.value">{{item.label}}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="12" v-if='inputMemberType==0'>
                                <FormItem label="人员选择">
                                    <Select  v-model="inputMemberId" label-in-value @on-change="getInputMemberId">
                                        <Option v-for="item in memberArr" :key="item.value" :value="item.value">{{item.label}}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                             <Col span="12" v-if='inputMemberType==1||inputMemberType==4||inputMemberType==5||inputMemberType==6||inputMemberType==7||inputMemberType==8||inputMemberType==9'>
                                <FormItem label="人员选择">
                                    <Select  v-model="inputMemberId" label-in-value @on-change="getInputMemberId">
                                        <Option v-for="item in memberArr" :key="item.value" :value="item.value">{{item.label}}</Option>
                                    </Select>
                                </FormItem>
                            </Col>

                            <Col span="12" v-if='inputMemberType==2'>
                                <FormItem label="平台选择">
                                    <Select  v-model="inputMemberId" label-in-value @on-change="getInputMemberId" placeholder="请选择平台">
                                         <Option v-for="item in platformList" :value="item.platformID.toString()" :key="item.platformID">{{ item.shortName }}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="12" v-if='inputMemberType==3'>
                                <FormItem label="客户选择">
                                    <Select  v-model="inputMemberId" label-in-value @on-change="getInputMemberId" placeholder="请选择客户">
                                        <Option v-for="item in clientListObj" :value="item.value.toString()" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                             <Col span="12">
                                <FormItem label="持股比例">
                                    <Input placeholder="持股比例"  type="number"  v-model="inputScale"><span slot="append">%</span></Input>
                                </FormItem>
                            </Col>
                             <Col span="12">
                                <FormItem label="认缴金额">
                                    <Input placeholder="认缴金额"  type="number"  v-model="inputMoney"><span slot="append">万元</span></Input>
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem label="人员性质">
                                    <Select label-in-value v-model="inputMemberStatus" @on-change="getInputMemberStatus">
                                        <Option :value="1">目前人员</Option>
                                        <Option :value="0">过往人员</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                </Form>

            </Modal>
    
    </div>
</template>
<script>
import taskFile from "@/view/components/template/task_file_show"
import taskFlows from "@/view/components/template/approval_process"
import edictButton from "@/view/components/template/return_edict_button"
import {
    geAllPlatformDetail,
    getPlatform,
    upPlatform,
    getAllUserList,
    getPlatformTaskDetail,
    taskFlowAgree,
    setPlatform,clientListQuery

} from "@/api/data"
import {platformMemberType,paltformMemberStatus} from "@/libs/data"

export default {
    components:{
        edictButton,taskFile,taskFlows
    }, props:{
        taskFlowID:String,
        taskID:String,
        taskTypeID:String,
        flowRequire:String
    },
    mounted(){
        this.getPlatformInfor();
        this.getuserList();
        this.getPlatformTaskDetail()
        this.clientListQuery();
    },
    data(){
        return{
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
            loading:false,//提交
             loading2:false,//提交
            memModal:false,
            plat_data:'',
            name:'',
            phone:'',
            platArr:{},

            memberId:"",
            memberType:"",
            memdeal:1,//1新增2修改
            memdealIndex:0,
            inputMemberType:"",
            inputMemberId:"",
            inputScale:"",
            inputMoney:"",
            inputMemberStatus:"",
            member:[
                {title:"人员类型",key:"memberTypeName"},
                {title:"人员姓名",key:"memberName"},
                {title:"持股比例(%)",key:"shareRate"},
                {title:"认缴金额(万元)",key:"subscription"},
                {title:"人员性质",key:"statusName"},
                {title:"操作",slot:"deal"}
            ],
            memberData:[
                
            ],
             memberArr:[],
            kindArr:[
                {value:'1',label:"股东-自然人"},
                {value:'2',label:"股东-机构内部"},
                {value:'3',label:"股东-机构外部"},
                {value:'4',label:"法人代表"},
                {value:'5',label:"董事长"},
                {value:'6',label:"董事"},
                {value:'7',label:"监事"},
                {value:'8',label:"总经理"},
                {value:'9',label:"合伙人"},
            ],
            postData:{
                TaskTypeID:38,//任务类别id
                TaskName:'',//请示事项要点
                TaskSummary:'',//请示具体内容
                TaskOwner:'',//提交人id
                Platform:{
                    PlatformID:0,//新增为0
                    PlatName:'',//全称
                    PlatShortName:'',//简称
                    PlatCode:'',//代码
                    PlatCodsCode:'',//社会信用代码
                    PlatOpenDate:'',//成立时间
                    PlatAddress:'',//注册地址
                    RegisteredCapital:0,//注册资本
                    OperateScope:'',//经营范围
                    PlatStatus:0,//1，0为历史2表示生效
                    Members:[
                        {
                            ID:'',//数据id
                            PlatformID:'',//平台id，新增为0
                            MemberID:'',//用户id
                            MemberName:'',//用户姓名
                            MemberType:'',//用户类型
                            ShareRate:'',//持股比例
                            Subscription:'',//认缴金额
                            MemberStatus:'',//1表示目前人员0过往人员
                        }
                    ]

                }
            },
            stanMem:[],
            standPlatformInfor:{

            },TaskName:'',
            TaskSummary:'',
              platformList:[],
            clientList:[]
            
        }
    },methods:{
         handleSubmitAgree(TaskName,TaskSummary){
            this.postData.Platform.Members=[];
            var postInfor=JSON.stringify(this.postData.Platform),
                postMem=JSON.stringify(this.memberData),
                inforFlag=(this.standPlatformInfor==postInfor)&&(this.stanMem==postMem),
                flag=TaskName==this.TaskName&&TaskSummary==this.TaskSummary;
            if(inforFlag&&flag){
               this.taskFlowAgree()
                //PlatformID（包括成员）设置为0
            }else{
                if(inforFlag){  
                    this.postData.Platform.PlatformID==0;
                }
                this.memberData.forEach(element=>{
                    this.postData.Platform.Members.push({
                            ID:0,
                            PlatformID:this.postData.Platform.PlatformID,
                            MemberID:element.userId,
                            MemberName:element.memberName,//用户姓名
                            MemberType:element.memberType,//用户类型
                            ShareRate:element.shareRate,//持股比例
                            Subscription:element.subscription,//认缴金额
                            MemberStatus:element.status,//1表示目前人员0过往人员
                    })
                })   
               this.setPlatform()
            }
           

        },
        taskFlowAgree(){
            taskFlowAgree({TaskID:this.taskID,TaskFlowID:this.taskFlowID}).then(res=>{
                if(res.data.code==2022){
                    this.$Message.success({
                        content:"操作成功"
                    })
                }else{
                    this.$Message.error({
                        content:"操作成功"+res.data.message
                    })
                }
            })

        },setPlatform(){
            this.postData.TaskID=this.taskID;
            this.postData.TaskFlowID=this.taskFlowID;
            setPlatform(this.postData).then(res=>{  
                if(res.data.code==2104){
                    this.$Message.success({
                        content:"操作成功"
                    })
                }else{
                    this.$Message.error({
                        content:"操作成功"+res.data.message
                    })
                }
            })
        },
        getPlatformTaskDetail(){
            getPlatformTaskDetail({TaskID:this.taskID}).then(res=>{
                if(res.data.code==2103){
                    this.postData={
                        TaskFiles:res.data.taskFiles,
                        TaskTypeID:res.data.taskTypeID,
                        TaskName:res.data.taskName,
                        TaskSummary:res.data.taskSummary,
                        TaskNumber:res.data.taskNumber,
                        TaskOwner:res.data.taskOwner,
                        TaskOwnerPhone:res.data.taskOwnerPhone,
                        TaskOwnerName:res.data.taskOwnerName,
                        TaskFlows:res.data.taskFlows,
                        Platform:{
                            PlatformID:res.data.platform.platformID,//新增为0
                            PlatName:res.data.platform.platName,//全称
                            ShortName:res.data.platform.shortName,//简称
                            PlatCode:res.data.platform.platCode,//代码
                            CodsCode:res.data.platform.codsCode,//社会信用代码
                            OpenDate:res.data.platform.openDate,//成立时间
                            Address:res.data.platform.address,//注册地址
                            RegisteredCapital:res.data.platform.registeredCapital,//注册资本
                            OperateScope:res.data.platform.operateScope,//经营范围
                            PlatStatus:res.data.platform.platStatus,
                            Members:[]
                        }
                    }
                    this.plat_data=res.data.platform.platformID
                     this.TaskName=res.data.taskName;
                    this.TaskSummary=res.data.taskSummary;
                    this.standPlatformInfor=JSON.stringify(this.postData.Platform) ;
                    this.loadMember(res.data.platform.members)
                }else{
                    this.$Message.error({
                        content:'数据加载失败'
                    })
                }
            })
        },
         loadMember(dat){
            dat.forEach(element => {
                this.memberData.push({
                    memberTypeName:platformMemberType[element.memberType],
                    memberType:element.memberType,
                    memberName:element.memberName,
                    shareRate:element.shareRate,
                    subscription:element.subscription,
                    status:element.status,
                    statusName:paltformMemberStatus[element.status],
                    userId:element.memberID
                })
            });
            this.stanMem=JSON.stringify(this.memberData);
        },
        getPlatformInfor(){
            //获取该用户名下的所有权属平台
             getPlatform({PlatStatus:"1","USerID":JSON.parse(localStorage.getItem("userId"))}).then(res=>{
                if(res.data.code==2105){
                    this.platformList=res.data.platList;
                    res.data.platList.forEach(element=>{
                         this.platArr[element.platformID]=element.shortName;
                    })
                }else{
                    this.$Message.error({content:"平台数据加载失败:"+res.data.message})
                }
            })
        },clientListQuery(){
            clientListQuery({ProjectStatus:0,UserID:JSON.parse(localStorage.getItem('userId'))}).then(res=>{
                if(res.data.code==2306){
                    res.data.clientList.forEach(element=>{
                        this.clientListObj.push({
                            label:element.ShortName,
                            value:element.ClientID
                        })
                    })
                  
                }else{
                    this.$Message.error({
                        content:"客户信息加载失败:"+res.data.message
                    })
                }
            })
        },
        getPlatformDetail(value){
            //选择平台查询该平台的信息
            geAllPlatformDetail({PlatformID:value}).then(res=>{
                if(res.data.code==2106){
                    let dat=res.data;
                    this.postData={
                        TaskTypeID:38,//任务类别id
                        TaskName:'',//请示事项要点
                        TaskSummary:'',//请示具体内容
                        TaskOwner:JSON.parse(localStorage.getItem("userId")),//提交人id
                        Platform:{
                            PlatformID:dat.platform.platformID,//新增为0
                            PlatName:dat.platform.platName,//全称
                            ShortName:dat.platform.shortName,//简称
                            PlatCode:dat.platform.platCode,//代码
                            CodsCode:dat.platform.codsCode,//社会信用代码
                            OpenDate:dat.platform.openDate.substr(0,10),//成立时间
                            Address:dat.platform.address,//注册地址
                            RegisteredCapital:dat.platform.registeredCapital,//注册资本
                            OperateScope:dat.platform.operateScope,//经营范围
                            PlatStatus:0,//1，0为历史2表示生效
                            Members:dat.platform.members
                        }
                    }
                    this.setTableInfor(dat.platform.members);
                }else{
                    this.$Message.error({content:"权属平台详细获取失败:"+res.data.message})
                }
            })

        },
        setTableInfor(dat){
            this.memberData=[]
            dat.forEach(element => {
                this.memberData.push({
                    memberTypeName:this.getMemberNameReturn(element.memberType),
                    memberType:element.memberType.toString(),
                    memberName:element.memberName,
                    shareRate:element.shareRate,
                    subscription:element.subscription,
                    status:element.status.toString(),
                    statusName:this.getStatusNameReturn(element.status),
                    userId:element.memberID,
                })
            });
        },
        getMemberNameReturn(id){
            let obj={
                "1":"股东-自然人",
                "2":"股东-机构内部",
                "3":"股东-机构外部",
                "4":"法人代表",
                "5":"董事长",
                "6":"董事",
                "7":"监事",
                "8":"总经理",
                "9":"合伙人",
            }
            // console.log(id)
            // console.log(id.toString())
            return obj[id.toString()]
        },
        getStatusNameReturn(id){
            let obj={
                "1":"目前的人员",
                "0":"过往的人员",
            }
            return obj[id.toString()]
        },
        setMember(){
            if( this.inputMemberType==''){
                return;
            }
            if( this.inputMemberId==''){
                return;
            }
          
            if(this.memdeal==1){
                this.memberData.push({
                    memberTypeName:this.inputMemberTypeName,
                    memberType:this.inputMemberType,
                    memberName:this.inputMemberName,
                    shareRate:this.inputScale,
                    subscription:this.inputMoney,
                    status:this.inputMemberStatus,
                    statusName:this.inputStatusName,
                    userId:this.inputMemberId,
                })
            }else{
                //修改人员数据 
                this.memberData[this.memdealIndex].memberTypeName=this.inputMemberTypeName;
                this.memberData[this.memdealIndex].memberType=this.inputMemberType;
                this.memberData[this.memdealIndex].memberName=this.inputMemberName;
                this.memberData[this.memdealIndex].shareRate=this.inputScale;
                this.memberData[this.memdealIndex].subscription=this.inputMoney;
                this.memberData[this.memdealIndex].status=this.inputMemberStatus;
                this.memberData[this.memdealIndex].statusName=this.inputStatusName;
                this.memberData[this.memdealIndex].userId=this.inputMemberId;
            }

        },getInputMemberType(res){
            //设置人员类型
            this.inputMemberTypeName=res.label;
            this.inputMemberType=res.value;
        },
        getInputMemberId(res){
            //设置人员姓名
            this.inputMemberId=res.value;
            this.inputMemberName=res.label;
        },
        getInputMemberStatus(res){
            //设置人员状态
            this.inputStatusName=res.label;
            this.inputMemberStatus=res.value;
        },
       
       
        submitWithoutFile(){
            //提交有文件
        },
        setPlatOpenDate(value){//设置平台成立时间
        
            this.postData.Platform.OpenDate=value
        },
          showEdict(type,index){
            this.memModal=true;
            this.memModal=true;
            this.memdeal=type;
            this.memdealIndex=index;//当前编辑的数据
            if(type==2){
                this.setEdictMemInfor();

            }else{
                this.clearEdictMemInfor();
            }
        },
        shoeDelete(index){
            this.$Modal.confirm({
                title:'删除成员',
                content:"是否删除该成员:"+this.memberData[index]["memberName"]+"?",
                onOk:()=>{
                    this.memberData.splice(index,1);
                }
            })

        },
        clearEdictMemInfor(){
            //清空人员信息
                this.inputMemberType='';
                this.inputMemberId='';
                this.inputScale="";
                this.inputMoney="",
                this.inputMemberStatus="";
                this.inputMemberTypeName="";
                this.inputMemberName="";
                this.inputStatusName="";
        },
        setEdictMemInfor(){
            //编辑信息设置信息memberTypeName 
            this.inputMemberTypeName=this.memberData[this.memdealIndex]["memberTypeName"];
            this.inputMemberType=this.memberData[this.memdealIndex]["memberType"].toString();
            this.inputMemberName=this.memberData[this.memdealIndex]["memberName"];
            this.inputScale=this.memberData[this.memdealIndex]["shareRate"];
            this.inputMoney=this.memberData[this.memdealIndex]["subscription"];
            this.inputMemberStatus=this.memberData[this.memdealIndex]["status"];
            this.inputStatusName=this.memberData[this.memdealIndex]["statusName"];
            this.inputMemberId=this.memberData[this.memdealIndex]["userId"];
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
        },getuserList(){
            getAllUserList({"Status":1}).then(res=>{
                if(res.data.code==0){
                    res.data.userList.forEach(element => {
                        this.memberArr.push({
                            value:element.userId,
                            label:element.userName
                        })
                       
                    });
                }else{
                    this.$Message.error("人员信息获取失败:"+res.data.message)
                }
            })
        }
       
    }
}
</script>
<style scoped lang="less">
   .platform_change{
       .formWrap{
        width: 95%;
        height: 100%;
        margin: 30px auto;
       }
       
   }
</style>
