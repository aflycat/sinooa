<template>
    <div class="platform_app">
        <Card  class="itemCard">
            <p slot="title">报送人信息</p>
             <Form class="formWrap"  :label-width="110">
           
               <Row>
                    <Col span="12">
                        <FormItem label="报送人">
                            {{name}}
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="联系电话">
                            {{phone}}
                        </FormItem>
                    </Col>
                </Row>

            </Form>
        </Card>
        <Card class="itemCard">
            <p slot="title">权属平台信息</p>
            <Form class="formWrap"  :label-width="110">
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
                           <DatePicker type="date" placeholder="选择成立日期" style="width:100%;" @on-change="setPlatOpenDate"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="注册地址">
                            <Input   placeholder="注册地址"  v-model="postData.Platform.Address"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="注册资本">
                            <Input  type="number" placeholder="注册资本"  v-model="postData.Platform.RegisteredCapital">
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
           
            <Button style="margin-top:20px;" type="primary"  @click="showEdict(1,0)">新增人员</Button>
        </Card>

         <Card  class="itemCard">
                <p slot="title">请示信息</p>
                <Form :label-width="80">
                    <FormItem label="事项要点" >
                        <Input v-model="postData.TaskName"  placeholder="请输入事项要点"></Input>
                    </FormItem>
                    <FormItem label="具体内容" >
                        <Input  type="textarea" v-model="postData.TaskSummary" :autosize="{minRows: 10,maxRows: 15}" placeholder="请输入事项的具体内容"></Input>
                    </FormItem>
                     <FormItem label="文件列表" v-if="fileName.length>0&&showFile">
                                <p class="fileName" v-for="(item,index) in fileName" :key="index">
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
                       <Button type="primary" :loading="loading" @click="handleSubmit('formValidate')">

                             <span v-if="!loading">提交</span>
                            <span v-else>提交中...</span>
                            
                        </Button>
                       
                    </FormItem>
                </Form>   

            </Card>
            <upload-files ref="uploadModal" @handleUploadFileEvent="handleUploadEvent"></upload-files>
            <!-- 平台人员选择对话框 -->
            <Modal v-model="memModal"  width='650' title="编辑人员信息" @on-ok="setMember">
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
                                         <Option v-for="item in platformList" :value="item.platformID" :key="item.platformID">{{ item.shortName }}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="12" v-if='inputMemberType==3'>
                                <FormItem label="客户选择">
                                    <Select  v-model="inputMemberId" label-in-value @on-change="getInputMemberId" placeholder="请选择客户">
                                        <Option v-for="item in clientListObj" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                       


                             <Col span="12">
                                <FormItem label="持股比例">
                                    <Input placeholder="持股比例" type="number" v-model="inputScale"><span slot="append">%</span></Input>
                                </FormItem>
                            </Col>
                             <Col span="12">
                                <FormItem label="认缴金额">
                                    <Input placeholder="认缴金额" type="number" v-model="inputMoney"><span slot="append">万元</span></Input>
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem label="人员性质">
                                    <Select label-in-value v-model="inputMemberStatus" @on-change="getInputMemberStatus">
                                        <Option value="1">目前人员</Option>
                                        <Option value="0">过往人员</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                </Form>

            </Modal>

    </div>
</template>
<script>
import UploadFiles from "@/view/components/upload_file/upload_file"

import {getAllUserList,upPlatform,upPlatformFile,uploadFile,
getPlatform,clientListQuery} from  "@/api/data"

import {TaskTypeID} from "@/libs/data"

export default {
    components:{
        UploadFiles
    },
    mounted(){
        this.name=JSON.parse(localStorage.getItem("userName"));
        this.phone=JSON.parse(localStorage.getItem("phone"));
        this.postData.TaskOwner=JSON.parse(localStorage.getItem("userId"));
        this.getuserList();
        this.getPlatform();
        this.clientListQuery();
    },
    data(){
        return{
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
            loading:false,//提交
            memModal:false,
            name:'',
            phone:'',
            memberId:"",
            memberType:"",
            memdeal:1,//1新增2修改
            memdealIndex:0,
            inputMemberType:0,
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
            memberData:[],
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
            memberArr:[],
            postData:{
                TaskTypeID:'',//任务类别id
                TaskName:'',//请示事项要点
                TaskSummary:'',//请示具体内容
                TaskOwner:'',//提交人id
                Platform:{
                    PlatformID:"0",//新增为0
                    PlatName:'',//全称
                    ShortName:'',//简称
                    PlatCode:'',//代码
                    CodsCode:'',//社会信用代码
                    OpenDate:'',//成立时间
                    Address:'',//注册地址
                    RegisteredCapital:0,//注册资本
                    OperateScope:'',//经营范围
                    PlatStatus:1,//1，0为历史2表示生效
                    Members:[]

                }
            },
            typeSelect:1,
            platformList:[],
            clientList:[]
            
        }
    },methods:{
        setMember(){
            //1新增2是修改

            
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
                
        },
        getInputMemberType(res){
            //设置人员类型
            this.inputMemberTypeName=res.label;
            this.inputMemberType=res.value;
        },
        getPlatform(){
            getPlatform({'PlatStatus':1,'USerID':JSON.parse(localStorage.getItem("userId"))}).then(res=>{
                if(res.data.code==2105){
                    this.platformList=res.data.platList;
                }else{
                     this.$Message.error({
                        content:"权属平台信息加载失败:"+res.data.message
                    })
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
        setPlatOpenDate(value){//设置平台成立时间
            this.postData.Platform.OpenDate=value
        },
        handleSubmit(formValidate){
            //提交数据
            this.postData.Platform.Members=[];
            this.postData.TaskTypeID=TaskTypeID.PlarformAdd;
            this.memberData.forEach(element=>{
                this.postData.Platform.Members.push({
                        ID:0,
                        PlatformID:0,
                        MemberID:element.userId,
                        MemberName:element.memberName,//用户姓名
                        MemberType:element.memberType,//用户类型
                        ShareRate:element.shareRate,//持股比例
                        Subscription:element.subscription,//认缴金额
                        MemberStatus:element.status,//1表示目前人员0过往人员
                })
            })
            if(this.fileName.length>0){
                //提交文件
                this.submitWithFile();    
            }else{
                //未提交文件
                this.submitWithoutFile();
            }



        },
        submitWithoutFile(){   
            //提交没有文件
            upPlatform(this.postData).then(res=>{
                if(res.data.code==2101){
                    this.$Message.success({
                        content:"任务创建成功"
                    })
                }else{
                     this.$Message.error({
                        content:"任务创建失败："+res.data.message
                    })
                }

            })
            
        },
        submitWithFile(){
            //提交有文件
            upPlatformFile(this.postData).then(res=>{
                if(res.data.code==2102){
                    this.uploadFile(res.data.taskID,res.data.taskFlowID);
                    this.$Message.success({
                        content:"任务创建成功"
                    })

                }else{
                     this.$Message.error({
                        content:"任务创建失败："+res.data.message
                    })
                }
            })
        },
        uploadFile(taskID,taskFlowID){
                this.fileForm.append('TaskID',taskID)
                this.fileForm.append('TaskFlowID',taskFlowID)
                this.fileForm.append('FileTypeID',this.fileWrap[0].type) 
                this.fileWrap.forEach(element=>{
                    this.fileForm.append('TaskFiles',element.file)
                })
                uploadFile(this.fileForm).then(res=>{
                    if(res.data.code==2032&&res.data.taskFiles.length>0){
                        this.$Message.success({
                            content:'文件上传成功'
                        })
                    }else{
                        this.$Message.error({
                            content:'文件上传失败:'+res.data.message
                        })
                    }
                })
        },
        showEdict(type,index){
            //type人员操作类型，index操作的人员序列
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
            //删除人员数据
            this.$Modal.error({
                title:"删除",
                content:"是否删除该成员:"+this.memberData[index]["memberName"]+"?",
                onOk:()=>{
                    this.memberData.splice(index,1);
                }
            })


        },
        deleteFile(index){
            this.fileName.splice(index,1);
            this.fileWrap.splice(index,1);

        },
        clearEdictMemInfor(){
            //清空人员信息
                this.inputMemberType=0;
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
            this.inputMemberType=this.memberData[this.memdealIndex]["memberType"];
            this.inputMemberName=this.memberData[this.memdealIndex]["memberName"];
            this.inputScale=this.memberData[this.memdealIndex]["shareRate"];
            this.inputMoney=this.memberData[this.memdealIndex]["subscription"];
            this.inputMemberStatus=this.memberData[this.memdealIndex]["status"];
            this.inputStatusName=this.memberData[this.memdealIndex]["statusName"];
            this.inputMemberId=this.memberData[this.memdealIndex]["userId"];
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

        },
        getuserList(){
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
   .platform_app{
       width: 100%;
       height: 100%;
    //    overflow: auto;
       .formWrap{
        width: 95%;
        height: 100%;
        margin: 30px auto;
        

       }
   }
</style>
