<template>
    <div class="department_app">
         <Card  class="itemCard">
            <p slot="title">报送人信息</p>
             <Form class="formWrap"  :label-width="110">
                 <Row>
                    <Col span="12">
                        <FormItem label="报送人">
                            <Input v-model="name" disabled placeholder="填写报送人"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="联系电话">
                            <Input v-model="phone"  type="number" placeholder="联系电话"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Card>
        <Card class="itemCard">
            <p slot="title">部门信息</p>
            <Form class="formWrap"  :label-width="110">
                <FormItem  label="部门全称">
                    <Input v-model="postData.Department.DeptName"  placeholder="部门全称"></Input>
                </FormItem>
                <Row>
                    <Col span="12">
                        <FormItem  label="权属平台">
                            <Select  placeholder="请选择权属平台" v-model="postData.Department.PlatformID" filterable>
                                <Option v-for="item in platList.platList" :key="item.platformID" :value="item.platformID">{{item.platName}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                
                    <Col span="12">
                        <FormItem label="部门代码">
                        <Input v-model="postData.Department.DeptCode"  placeholder="请输入部门代码"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem  label="部门经理">
                            <Select v-model="manager" placeholder="请选择部门经理" label-in-value  filterable @on-change="setManager">
                                <Option v-for="item in memberArr" :key="item.value" :value="item.value">{{item.label}}</Option>
                            </Select>
                            
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem   label="部门副经理">
                            <Select v-model="deputyManager"  placeholder="请选择部门副经理" label-in-value  filterable @on-change="setDeputyManager">
                                <Option v-for="item in memberArr" :key="item.value" :value="item.value">{{item.label}}</Option>
                            </Select>
                            
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem   label="部门员工">
                            <Select v-model="member"  placeholder="请选择部门员工"  label-in-value  multiple @on-change="setMember">
                                <Option v-for="item in memberArr" :key="item.value" :value="item.value">{{item.label}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    
                    <Col span="12">
                        <FormItem   label="成立时间">
                            <DatePicker :value="postData.Department.OpenDate" type="date" placeholder="请选择成立时间" @on-change="setOpenDate" style="width:100%;"></DatePicker>
                        </FormItem>
                    </Col>
                     <Col span="12">
                        <FormItem   label="撤销时间">
                            <DatePicker :value="postData.Department.CloseDate" type="date" placeholder="请选择撤销时间" @on-change="setCloseDate" style="width:100%;"></DatePicker>
                        </FormItem>
                    </Col>
                    
                </Row>
                 </Form>
        </Card>
        <Card  class="itemCard">
                <p slot="title">请示信息</p>
                <Form :label-width="80">
                    <FormItem label="事项要点" >
                        <Input  placeholder="请输入事项要点" v-model="postData.TaskName"></Input>
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
            <upload-files ref="uploadModal"  @handleUploadFileEvent="handleUploadEvent"></upload-files>

    </div>
</template>

<script>
import UploadFiles from "@/view/components/upload_file/upload_file"
import {getPlatform,getAllUserList,upDepartment} from "@/api/data"
export default {
    components:{
        UploadFiles
    },
    mounted(){
        this.name=JSON.parse(localStorage.getItem("userName"));
        this.phone=JSON.parse(localStorage.getItem("phone"));
        this.postData.TaskOwner=JSON.parse(localStorage.getItem("userId"))
        this.getuserList();
        this.getPlatform();
    },
    data(){
        return{
            fileName:[],
            fileWrap:[],//用来保存要上传的文件，方便进行删除操作
            fileForm:new FormData(),
            loading:false,//提交
            name:"",
            phone:"",
            manager:'',//经理
            managerName:'',
            deputyManager:'',//副经理
            deputyManagerName:'',
            member:[],//成员
            memberArr:[],
            platList:[],

            memWrap:[],//成员专门的数组
            managerWrap:[],

            postData:{
                TaskTypeID:40,
                TaskName:"",
                TaskSummary:"",
                TaskOwner:"",
                Department:{
                    DepartmentID:0,
                    PlatformID:"",
                    DeptName:"",
                    OpenDate:"",
                    CloseDate:"",
                    DeptStatus:1,
                    DeptCode:"",
                    DeptStatus:1,
                    Members:[]

                }
            }

        }
    },methods:{
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
        },
        getPlatform(){
            getPlatform({PlatStatus:1,UserID:JSON.parse(localStorage.getItem("userId"))}).then(res=>{
                if(res.data.code==2105){
                    if(res.data.platList.length==0){
                        this.$Message.warning("该账号下没有相关权属平台")
                    }else{
                        this.platList=res.data;
                    }
                }else{
                    this.$Message.error("权属平台列表查询失败:"+res.data.message)
                }
            })
        },
        setManager(dat){
            //设置经理
            this.manager=dat.value;
            this.managerName=dat.label;
            this.managerWrap[0]={
                    ID:0,
                    DepartmentID:0,
                    MemberID:dat.value,
                    MemberName:dat.label,
                    MemberType:21,//21经理22副经理23员工
                    MemberStatus:1
            }
        },
        setDeputyManager(dat){
            //设置副经理
            this.deputyManager=dat.value;
            this.deputyManagerName=dat.label;
            this.managerWrap[1]={
                 ID:0,
                DepartmentID:0,
                MemberID:dat.value,
                MemberName:dat.label,
                MemberType:22,//21经理22副经理23员工
                MemberStatus:1
            }
        },
        setMember(dat){
            //设置员工
           this.memWrap=[];
           
           dat.forEach(element=>{
               this.memWrap.push({
                   ID:0,
                    DepartmentID:0,
                    MemberID:element.value,
                    MemberName:element.label,
                    MemberType:23,//21经理22副经理23员工
                    MemberStatus:1
               })
           })
        },
        setOpenDate(value){
            this.postData.Department.OpenDate=value;
        },
        setCloseDate(value){
            this.postData.Department.CloseDate=value;
        },
        handleSubmit(){
            // console.log(this.managerWrap.concat(this.memWrap))
            this.postData.Department.Members=this.managerWrap.concat(this.memWrap);
            console.log(this.postData);
            // console.log(this.postData.Department.Members.concat(this.memWrap))
            upDepartment(this.postData).then(res=>{
                if(res.data.code=2201){
                    this.$Message.success({
                        content:"操作成功"
                    })
                }else{
                    this.$Message.error({
                        content:"操作失败:"+res.data.message
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
        }
    }
}
</script>
<style lang="less" scoped>
.department_app{
    width: 100%;
    height: 100%;
}
</style>